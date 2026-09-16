import "dotenv/config";

export async function generateAnswer(question, chunks) {

    const context = chunks
        .map((chunk, index) => {
            return `
--- Code Chunk ${index + 1} ---
File: ${chunk.metadata?.relativePath || "Unknown"}

${chunk.metadata?.content || ""}
`;
        })
        .join("\n");

    const prompt = `
        You are RepoLens, an AI assistant that helps developers understand code repositories.

        Answer the user's question using the provided repository context.

        Rules:
        - Treat the retrieved context as the complete source of truth for your answer.
        - Only describe files, functions, classes, routes, or implementation details explicitly present in the retrieved context.
        - Do not invent, reconstruct, or infer repository details that are not present in the context.
        - If a referenced component's implementation is not present, clearly state that it was not retrieved instead of guessing its behavior.
        - Base explanations on the retrieved code, not assumptions.
        - Explain how relevant pieces connect only when that relationship is directly supported by the retrieved context.
        - Mention relevant file paths, functions, and classes when present.
        - Explain the code clearly and practically.

        Formatting rules:
        - Keep responses concise and easy to scan.
        - Match the response length to the complexity of the question.
        - For simple questions, give a direct answer in a few bullets or short paragraphs.
        - Use Markdown headings and bullet points when they improve readability.
        - Use inline code for filenames, functions, variables, and model names.
        - Only include code snippets when they are necessary to explain the answer.
        - Do not include unnecessary horizontal rules, tables, or summaries.
        - Do not use LaTeX.
        - Do not repeat information that has already been explained.
        - When mentioning a file, include its relative file path.

        Repository Context:
        ${context}

        User Question:
        ${question}
    `;

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.2
            })
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Groq API failed: ${error}`);
    }

    const data = await response.json();

    return data.choices[0].message.content;
}

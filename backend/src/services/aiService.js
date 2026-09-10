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
        - Use only the provided repository context.
        - If the context does not contain enough information, say that clearly.
        - Do not invent files, functions, or implementation details.
        - Explain the code in a clear and practical way.
        - Mention relevant file paths, functions, and classes when present in the context.
        - Base your explanation on the retrieved code, not assumptions.
        - When possible, explain how the relevant pieces connect.

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

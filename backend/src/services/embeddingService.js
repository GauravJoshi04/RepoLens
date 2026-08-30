import "dotenv/config";

export async function generateEmbeddings(texts) {
    // every request to be send together
    const requests = texts.map(text => ({
        model: "models/gemini-embedding-2",
        content: {
            parts: [
                {
                    text
                }
            ]
        },
        outputDimensionality: 768
    }));
    //I have multiple pieces of content. Generate an embedding for each of them.
    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:batchEmbedContents",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": process.env.GEMINI_API_KEY
            },
            body: JSON.stringify({
                requests
            })
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Embedding API failed: ${error}`);
    }

    const data = await response.json();

    return data.embeddings;
}
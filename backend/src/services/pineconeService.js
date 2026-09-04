// Embeddings stored in PINECONE 
import { Pinecone } from "@pinecone-database/pinecone";

// pc is my pinecone instance
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

// index is our repolens 
const index = pc.index("repolens");

export async function storeVectors(chunks) {

    const vectors = chunks.map((chunk, index) => ({
        id: `chunk-${index}`,
        values: chunk.embedding,
        metadata: {
            content: chunk.content,
            relativePath: chunk.relativePath,
            type: chunk.type,
            startLine: chunk.startLine,
            endLine: chunk.endLine
        }
    }));

    await index.upsert(vectors);

    console.log(`Stored ${vectors.length} vectors in Pinecone`);
}
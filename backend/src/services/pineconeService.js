// Embeddings stored in PINECONE 
import { Pinecone } from "@pinecone-database/pinecone";

// pc is my pinecone instance
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

// index is our repolens 
const index = pc.index(process.env.PINECONE_INDEX);

export async function storeVectors(chunks, repoName){

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
    console.log("Vectors created:", vectors.length);
    await index.namespace(repoName).upsert({
    records: vectors
    });
    console.log(`Stored ${vectors.length} vectors in Pinecone`);

}
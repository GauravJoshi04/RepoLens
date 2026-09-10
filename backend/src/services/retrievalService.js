import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbedding } from "./embeddingService.js";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index(process.env.PINECONE_INDEX);

export async function retrieveChunks(question, namespace, topK = 5) {
    const queryEmbedding = await generateEmbedding(question);

    const results = await index.namespace(namespace).query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true
    });

    return results.matches;
}

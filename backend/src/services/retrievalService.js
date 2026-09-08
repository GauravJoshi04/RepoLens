import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbedding } from "./embeddingService.js";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index(process.env.PINECONE_INDEX);

export async function retrieveChunks(question , namespace ,topK = 5){
    
    // converting user question into embedding 
    const queryEmbedding = await generateEmbedding(question) ;

    console.log("QUERY EMBEDDING:");
    console.log("Type:", typeof queryEmbedding);
    console.log("Is Array:", Array.isArray(queryEmbedding));
    console.log("Length:", queryEmbedding?.length);
    console.log("First value:", queryEmbedding?.[0]);
    console.log("Full:", queryEmbedding);

    // search in repository namespace
    const results = await index
    .namespace(namespace)
    .query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true
    });
    console.log("Pinecone query completed!");

    return results.matches ;
}
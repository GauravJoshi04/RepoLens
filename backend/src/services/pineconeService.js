// Embeddings stored in PINECONE 

import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const indexes = await pc.listIndexes();

console.log(indexes);
import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbedding } from "./embeddingService.js";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pc.index(process.env.PINECONE_INDEX);
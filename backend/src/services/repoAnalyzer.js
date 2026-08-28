// just to build repository object 
// repoScanner is used to recursively scan files
// while repositoryAnalyzer.js tells me about the repository Structure

import { scanRepository } from "./repoScanner.js";

import {chunkCodeFile} from "./codeChunker.js";
import { generateEmbedding } from "./embeddingService.js";

export async function repoAnalyzer(repoPath) {
    const files = await scanRepository(repoPath , repoPath) ;
    
    const allChunks = [] ;
    // will call chunk function for each file
    for(const file of files){
        const chunks = chunkCodeFile(file);

        allChunks.push(...chunks) ;
    }


    // pushing all these chunks to embedding service
    
    const texts = allChunks.map(chunk => chunk.content) ;
    const embeddings = await generateEmbedding(texts) ;

    for(let i = 0 ; i< allChunks.length ; i++){
        allChunks[i].embedding = embeddings[i].values ;
    }
    //  embedding contains value property which has our [] dimensions
    
    console.log("Total chunks:", allChunks.length);
    console.log("Total embeddings:", embeddings.length);
    console.log("First vector length:", allChunks[0].embedding.length);

    return {
        repoPath,
        files,
        chunks: allChunks
    };
}
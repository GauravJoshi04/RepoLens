// just to build repository object 
// repoScanner is used to recursively scan files
// while repositoryAnalyzer.js tells me about the repository Structure

import { scanRepository } from "./repoScanner.js";

import {chunkCodeFile} from "./codeChunker.js";

export async function repoAnalyzer(repoPath) {
    const files = await scanRepository(repoPath , repoPath) ;
    
    const allChunks = [] ;
    // will call chunk function for each file
    for(const file of files){
        const chunks = chunkCodeFile(file);

        allChunks.push(...chunks) ;
    }
    console.log("Total Chunks are:" , allChunks.length ) ;
    console.log(allChunks[0])
    return {
        repoPath,
        files,
        chunks: allChunks
    };
}
// just to build repository object 
// repoScanner is used to recursively scan files
// while repositoryAnalyzer.js tells me about the repository Structure

import { scanRepository } from "./repoScanner.js";

export async function repoAnalyzer(repoPath) {
    const files = await scanRepository(repoPath , repoPath) ;

    return {
        repoPath,
        files
    };
}
import { cloneRepository } from "../services/cloneService.js";
import { repoAnalyzer } from "../services/repoAnalyzer.js";

export const analyzeRepository = async (req, res) => {

    const { repoUrl } = req.body || {};

    if (!repoUrl) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required."
        });
    }

    const result = await cloneRepository(repoUrl);

    //const files = await scanRepository(result.repoPath , result.repoPath);
    
    const repository = await repoAnalyzer(result.repoPath) ;
    //console.log("Repository:", repository);
    //console.log("FINAL FILES:", repository.files);

    

    return res.status(200).json({
    success: true,
    repoUrl,
    result,
    totalFiles: repository.files.length,
    totalChunks: repository.chunks.length,
    firstChunk: repository.chunks[0]
    });
};
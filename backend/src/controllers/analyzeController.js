import { cloneRepository } from "../services/cloneService.js";
import { scanRepository } from "../services/repoScanner.js";

export const analyzeRepository = async (req, res) => {

    const { repoUrl } = req.body || {};

    if (!repoUrl) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required."
        });
    }

    const result = await cloneRepository(repoUrl);

    await scanRepository(result.repoPath);

    return res.status(200).json({
        success: true,
        repoUrl,
        result
    });
};
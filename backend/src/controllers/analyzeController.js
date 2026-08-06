
export const analyzeRepository = (req , res)=> {

    const { repoUrl } = req.body || {}; // handles both unvalid json format or not json format
    // if empty url or no url sended
    if (!repoUrl) {
    return res.status(400).json({
        success: false,
        message: "Repository URL is required."
    });
    }
    return res.status(200).json({
        success: true,
        repoUrl
    });
}
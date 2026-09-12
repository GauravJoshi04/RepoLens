import { retrieveChunks } from "../services/retrievalService.js";
import { generateAnswer } from "../services/aiService.js";

export async function chatController(req, res) {
    try {
        const { question, namespace } = req.body;

        if (!question || !namespace) {
            return res.status(400).json({
                error: "Question and namespace are required"
            });
        }

        console.log(`Question: ${question}`);
        console.log(`Namespace: ${namespace}`);

        // 1. Retrieve relevant code
        const chunks = await retrieveChunks(
            question,
            namespace,
            5
        );

        console.log(`Retrieved ${chunks.length} chunks`);

        // 2. Generate answer using retrieved context
        const answer = await generateAnswer(
            question,
            chunks
        );
        // also sources
        const sources = chunks.map(chunk => ({
            file: chunk.metadata?.relativePath || "Unknown" ,
            score: chunk.score
        }))

        // 3. Send response
        return res.status(200).json({
            answer,
            sources
        });

    } catch (error) {
        console.error("Chat error:", error);

        return res.status(500).json({
            error: "Failed to process question"
        });
    }
}
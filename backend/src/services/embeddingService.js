// will embedd 1 chunk per time and use Gemini embedding model

import { GoogleGenAI } from '@google/genai' ;

const ai = new GoogleGenAI({
    vertexai: false,
    apiKey: process.env.GEMINI_API_KEY
})


export async function generateEmbedding(texts) {

    // console.log("TEXT:", texts);
    // console.log("TEXT TYPE:", typeof texts);

    const response = await ai.models.embedContent({
        model: "gemini-embedding-2",
        contents: texts,
        config: {
            outputDimensionality: 768
        }
    });
    
    console.log("GEMINI RESPONSE:", response);
    return response.embeddings ;
}
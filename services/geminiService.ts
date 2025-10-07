
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("A variável de ambiente API_KEY não está definida.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getTranscription = async (audioBase64: string, mimeType: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = "Transcreva este áudio em texto. Mantenha a formatação, pontuação e parágrafos como no áudio original. Responda apenas com o texto transcrito.";

    const audioPart = {
      inlineData: {
        mimeType,
        data: audioBase64,
      },
    };

    const textPart = {
      text: prompt
    };

    const response = await ai.models.generateContent({
        model: model,
        contents: { parts: [textPart, audioPart] },
    });

    const transcription = response.text;
    if (transcription) {
      return transcription;
    } else {
      throw new Error("A API não retornou uma transcrição. O áudio pode estar vazio ou ser inválido.");
    }
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    if (error instanceof Error) {
        if (error.message.includes('size limit')) {
            throw new Error("O arquivo de áudio é muito grande. Por favor, tente um arquivo menor.");
        }
        throw new Error(`Falha na transcrição: ${error.message}`);
    }
    throw new Error("Ocorreu um erro desconhecido durante a transcrição.");
  }
};

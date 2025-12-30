
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}. Only return the translation, no explanations: "${text}"`,
    });
    return response.text?.trim() || "Error in translation";
  } catch (error) {
    console.error("Translation Error:", error);
    return "Error connecting to AI service.";
  }
};

export const getBrainstormSuggestion = async (focusArea: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am currently focusing on: ${focusArea}. Give me one short, motivational and practical suggestion for a 5 minute break related to this.`,
    });
    return response.text?.trim() || "Take a deep breath and stretch!";
  } catch (error) {
    return "Time for a quick water break.";
  }
};

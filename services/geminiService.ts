import { GoogleGenAI, Type } from "@google/genai";
import { UCC_CONTEXT } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithAssistant = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct a history-aware prompt or use chat session
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: UCC_CONTEXT,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having trouble connecting to the shuttle network. Please try again.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Service temporarily unavailable.";
  }
};

export const analyzeReport = async (description: string): Promise<{ severity: 'low' | 'medium' | 'high'; category: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Analyze this shuttle service report: "${description}".
      Return a JSON object with:
      - severity: "low", "medium", or "high" (breakdowns or safety issues are high, minor delays are low).
      - category: One word summary (e.g., Delay, Breakdown, AC, Driver).
    `;

    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            severity: { type: Type.STRING, enum: ["low", "medium", "high"] },
            category: { type: Type.STRING }
          }
        }
      }
    });

    const jsonText = result.text;
    if (!jsonText) throw new Error("No response");
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { severity: 'medium', category: 'General' };
  }
};

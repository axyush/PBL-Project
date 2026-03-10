import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const agriAssistant = {
  async chat(message: string, history: any[] = []) {
    const model = "gemini-3-flash-preview";
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: `You are an expert Agricultural Advisor. Your goal is to help farmers with practical, scientific, and easy-to-understand advice. 
        Support both English and Hindi. If the user asks in Hindi, respond in Hindi.
        Provide advice on:
        - Crop selection based on season and location.
        - Fertilizer and pesticide usage.
        - Irrigation techniques.
        - Market trends.
        - Government schemes.
        Keep responses concise and actionable. Use bullet points for clarity.`,
      },
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  },

  async detectDisease(base64Image: string) {
    const model = "gemini-3-flash-preview";
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: "Analyze this image of a crop leaf. Identify the disease if any, provide a confidence score, cause, treatment, and preventive measures. Format the response as JSON." },
            { inlineData: { mimeType: "image/jpeg", data: base64Image } }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            cause: { type: Type.STRING },
            treatment: { type: Type.STRING },
            prevention: { type: Type.STRING },
          },
          required: ["diseaseName", "confidence", "cause", "treatment", "prevention"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  },

  async getCropRecommendation(data: { location: string; soil: string; season: string; water: string }) {
    const model = "gemini-3-flash-preview";
    const prompt = `Recommend the best crops for a farmer with the following conditions:
    Location: ${data.location}
    Soil Type: ${data.soil}
    Season: ${data.season}
    Water Availability: ${data.water}
    
    Provide recommendations including expected yield, fertilizer guidance, and irrigation advice. Format as JSON.`;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              crop: { type: Type.STRING },
              yield: { type: Type.STRING },
              fertilizer: { type: Type.STRING },
              irrigation: { type: Type.STRING },
              reason: { type: Type.STRING },
            },
            required: ["crop", "yield", "fertilizer", "irrigation", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  },

  async simulateScenario(scenario: string) {
    const model = "gemini-3-flash-preview";
    const prompt = `Simulate this farming scenario: "${scenario}". 
    Estimate expected yield, profit, water usage, and resource requirements. 
    Compare it with standard alternatives if applicable. Format as JSON.`;

    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            yield: { type: Type.STRING },
            profit: { type: Type.STRING },
            waterUsage: { type: Type.STRING },
            resources: { type: Type.ARRAY, items: { type: Type.STRING } },
            comparison: { type: Type.STRING }
          },
          required: ["yield", "profit", "waterUsage", "resources", "comparison"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }
};

import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA } from "../constants";

let chatSession: Chat | null = null;

const initializeChat = (): Chat => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an AI assistant for the portfolio of Ayushman Mishra, a Senior Frontend Engineer.
    Here is his data in JSON format: ${JSON.stringify(PORTFOLIO_DATA)}.
    
    Your goal is to answer questions about his experience, skills, and background based ONLY on this data.
    - Be professional, concise, and enthusiastic.
    - If a user asks for contact info, provide the email or LinkedIn from the data.
    - If a user asks about something not in the data, strictly say you don't have that information but they can contact him directly.
    - Highlight his key achievements like the revenue growth contribution and fast promotions when relevant.
  `;

  return ai.chats.create({
    model: 'gemini-2.0-flash',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      chatSession = initializeChat();
    }

    const response = await chatSession.sendMessage({ message });
    return response.text || "I didn't get a clear response. Please try again.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};

export const parseResume = async (resumeText: string): Promise<any> => {
  const apiKey = process.env.API_KEY || '';
  if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error("Invalid API Key. Please update .env.local");
  }

  // Models to try in order of preference/cost
  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-001',
    'gemini-1.5-flash-8b',
    'gemini-1.5-pro',
    'gemini-1.5-pro-001'
  ];

  const prompt = `
    You are a resume parser. Extract data from the following Resume text and format it EXACTLY according to this JSON schema.
    The output MUST be valid JSON.
    
    Resume text:
    ${resumeText}

    Schema reference (filling instructions):
    ${JSON.stringify(PORTFOLIO_DATA, (key, value) => {
    // Simple replacer to keep only keys/structure, removing long text to save tokens
    if (typeof value === 'string' && value.length > 50) return "";
    if (Array.isArray(value) && value.length > 0) return [value[0]]; // Keep one sample
    return value;
  })}

    INSTRUCTIONS:
    1. Map the resume data to the schema fields as accurately as possible.
    2. If a field is missing in the resume, leave it as an empty string or empty array.
    3. Return ONLY the JSON object. No markdown formatting.
  `;

  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`Attempting to parse resume with model: ${model}`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            generationConfig: {
              response_mime_type: "application/json",
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Model ${model} failed:`, errorData);

        // If 429 (Rate Limit), we shouldn't hammer other models immediately, but for now we might as well try others?
        // Actually 429 on one often means 429 on project. But 404 means model not found.
        if (response.status === 404) {
          lastError = new Error(`Model ${model} not found (404).`);
          continue; // Try next model
        }

        if (response.status === 429) {
          lastError = new Error("Rate limit exceeded. Please wait a moment.");
          // If we hit rate limit, maybe don't loop? Or assume other models might have different quotas? 
          // 1.5 Flash and Pro usually share some quotas but not all. Let's continue.
          continue;
        }

        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) throw new Error("No response content from AI");

      return JSON.parse(text);

    } catch (error: any) {
      console.warn(`Error with model ${model}:`, error);
      lastError = error;
      // Continue to next model
    }
  }

  // If we get here, all models failed
  console.error("All models failed to parse resume.");
  throw lastError || new Error("Failed to parse resume with any available model.");
};
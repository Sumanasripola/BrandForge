
import { GoogleGenAI, Type } from "@google/genai";
import { BrandInputs, BrandResult } from "../types";

export const generateBrandIdentity = async (inputs: BrandInputs): Promise<BrandResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const personalityContext = inputs.personalitySummary 
    ? inputs.personalitySummary 
    : 'infer a suitable personality from the business details';

  const prompt = `You are an expert brand strategist, marketing consultant, and creative director. 
  Based on the following business information, generate a complete professional brand identity, strategy, and starter marketing kit.
  
  Business Context:
  - Industry: ${inputs.industry}
  - Target Audience: ${inputs.targetAudience}
  - Requested Tone: ${inputs.tone}
  - Vision & Vision: ${inputs.businessDescription}
  - Brand Personality Traits: ${personalityContext}
  
  Provide a structured output including:
  1. Explanation of brand interpretation (personality, emotional appeal, market positioning).
  2. Brand personality profile (archetype and desired emotional response).
  3. Concise brand positioning statement.
  4. Detailed ideal customer persona (name, age, lifestyle, goals, pain points, discovery).
  5. Brand voice guidelines (style, words to use/avoid, rules).
  6. 5 unique brand names with meanings/justifications.
  7. 5 tagline options.
  8. Recommended color palette (hex codes and emotional reasoning).
  9. Visual style and moodboard direction.
  10. Social media starter kit (Instagram bio, launch post, engagement post, 10 hashtags).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          brandNames: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                meaning: { type: Type.STRING }
              },
              required: ["name", "meaning"]
            }
          },
          taglines: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          mission: { type: Type.STRING },
          vision: { type: Type.STRING },
          positioningStatement: { type: Type.STRING },
          justification: { type: Type.STRING },
          personalityProfile: {
            type: Type.OBJECT,
            properties: {
              archetype: { type: Type.STRING },
              emotionalResponse: { type: Type.STRING }
            },
            required: ["archetype", "emotionalResponse"]
          },
          customerPersona: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              ageRange: { type: Type.STRING },
              lifestyle: { type: Type.STRING },
              goals: { type: Type.ARRAY, items: { type: Type.STRING } },
              painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              discoveryChannels: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "ageRange", "lifestyle", "goals", "painPoints", "discoveryChannels"]
          },
          brandVoice: {
            type: Type.OBJECT,
            properties: {
              style: { type: Type.STRING },
              wordsToUse: { type: Type.ARRAY, items: { type: Type.STRING } },
              wordsToAvoid: { type: Type.ARRAY, items: { type: Type.STRING } },
              rules: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["style", "wordsToUse", "wordsToAvoid", "rules"]
          },
          colorPalette: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                hex: { type: Type.STRING },
                emotion: { type: Type.STRING }
              },
              required: ["name", "hex", "emotion"]
            }
          },
          visualMood: { type: Type.STRING },
          socialBio: {
            type: Type.OBJECT,
            properties: {
              instagram: { type: Type.STRING },
              twitter: { type: Type.STRING },
              linkedin: { type: Type.STRING }
            },
            required: ["instagram", "twitter", "linkedin"]
          },
          socialStarterKit: {
            type: Type.OBJECT,
            properties: {
              launchPost: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  type: { type: Type.STRING },
                  content: { type: Type.STRING },
                  caption: { type: Type.STRING }
                },
                required: ["platform", "type", "content", "caption"]
              },
              engagementPost: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  type: { type: Type.STRING },
                  content: { type: Type.STRING },
                  caption: { type: Type.STRING }
                },
                required: ["platform", "type", "content", "caption"]
              },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["launchPost", "engagementPost", "hashtags"]
          }
        },
        required: [
          "brandNames", "taglines", "description", "mission", "vision", "positioningStatement", 
          "justification", "personalityProfile", "customerPersona", "brandVoice", 
          "colorPalette", "visualMood", "socialBio", "socialStarterKit"
        ],
      },
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as BrandResult;
};

export const generateLogo = async (
  name: string,
  industry: string,
  tone: string
): Promise<string> => {
  try {
    const response = await fetch("http://localhost:3001/generate-logo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        industry,
        tone,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error || `Logo generation failed (${response.status})`
      );
    }

    const data = await response.json();

    if (!data?.image) {
      throw new Error("Invalid logo response from server");
    }

    return data.image;

  } catch (error: any) {
    console.error("Logo Generation Error:", error);
    throw new Error(error.message || "Logo generation failed");
  }
};




import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateRecipe(prompt: string, imageData?: string): Promise<Recipe> {
    const model = 'gemini-3-flash-preview';
    
    const recipeSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        readyInMinutes: { type: Type.NUMBER },
        servings: { type: Type.NUMBER },
        summary: { type: Type.STRING },
        ingredients: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        instructions: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        category: { type: Type.STRING, description: 'One of: Breakfast, Lunch, Dinner, Dessert, Snack' },
        difficulty: { type: Type.STRING, description: 'One of: Easy, Medium, Hard' }
      },
      required: ['title', 'ingredients', 'instructions', 'category', 'difficulty']
    };

    const parts: any[] = [{ text: `Generate a high-quality recipe based on this: ${prompt}. Return as JSON.` }];
    
    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData.split(',')[1] || imageData
        }
      });
    }

    const result = await this.ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      }
    });

    const data = JSON.parse(result.text || '{}');
    return {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      image: imageData || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800'
    };
  }

  async chat(message: string): Promise<string> {
    const model = 'gemini-3-flash-preview';
    const result = await this.ai.models.generateContent({
      model,
      contents: message,
      config: {
        systemInstruction: "You are a world-class professional chef named 'Chef Flavor'. You are friendly, helpful, and provide creative cooking tips. Keep responses concise but inspiring."
      }
    });
    return result.text || "Sorry, I couldn't cook up a response right now.";
  }
}

export const gemini = new GeminiService();

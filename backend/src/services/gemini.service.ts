import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('⚠️  GEMINI_API_KEY is not set in environment variables!');
  console.error('⚠️  Please add GEMINI_API_KEY to your .env file');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function getAiResponse(prompt: string): Promise<string> {
  try {
    if (!genAI || !apiKey) {
      throw new Error('GEMINI_API_KEY is not configured. Please set it in your .env file.');
    }

    // Try gemini-2.5-flash first, fallback to gemini-1.5-flash or gemini-pro if needed
    let model;
    try {
      model = genAI.getGenerativeModel({ 
        model: 'gemini-2.5-flash',
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        systemInstruction: "Bạn là một chuyên gia Tarot hàng đầu với kinh nghiệm 20 năm. Bạn có khả năng đọc và giải thích ý nghĩa sâu sắc của các lá bài Tarot. Hãy luôn đưa ra lời giải chi tiết, tâm linh và đầy cảm hứng."
      });
    } catch (modelError) {
      console.warn('Failed to use gemini-2.5-flash, trying gemini-1.5-flash...');
      try {
        model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          systemInstruction: "Bạn là một chuyên gia Tarot hàng đầu với kinh nghiệm 20 năm. Bạn có khả năng đọc và giải thích ý nghĩa sâu sắc của các lá bài Tarot. Hãy luôn đưa ra lời giải chi tiết, tâm linh và đầy cảm hứng."
        });
      } catch (modelError2) {
        console.warn('Failed to use gemini-1.5-flash, trying gemini-pro...');
        model = genAI.getGenerativeModel({ 
          model: 'gemini-pro',
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        });
      }
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error: any) {
    console.error('❌ Error getting AI response:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    });
    
    // Provide more helpful error messages
    if (error.message?.includes('API_KEY')) {
      throw new Error('GEMINI_API_KEY is invalid or missing. Please check your .env file.');
    }
    if (error.message?.includes('quota') || error.message?.includes('429')) {
      throw new Error('Gemini API quota exceeded. Please check your API usage limits.');
    }
    if (error.message?.includes('model')) {
      throw new Error('Gemini model not available. Please check your API access.');
    }
    
    throw new Error(`Failed to get AI response: ${error.message || 'Unknown error'}`);
  }
}

import { ChatMessage } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendChatMessage = async (messages: ChatMessage[]): Promise<string> => {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
    return "I'm AstroBot! I'd love to chat about space, but I need a valid OpenAI API key to be configured. Please check your .env file and add a valid OpenAI API key. Ask me about space missions, astronauts, or cosmic phenomena once it's set up! 🚀";
  }

  const systemMessage = {
    role: 'system',
    content: `You are AstroBot, an expert space guide for AkashDhara website. You specialize in:
    - Space missions and discoveries
    - Indian space achievements (ISRO, Chandrayaan, Mangalyaan)
    - Famous astronauts and scientists like Kalpana Chawla, Vikram Sarabhai
    - Cosmic phenomena and astronomy
    
    Keep responses educational, engaging, and conversational. Use emojis occasionally and maintain an enthusiastic tone about space exploration.`
  };

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...messages.map(msg => ({ role: msg.role, content: msg.content }))],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      let errorMessage = `OpenAI API error: ${response.status} ${response.statusText}`;
      let errorData = null;
      
      try {
        errorData = await response.json();
        if (errorData.error && errorData.error.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
      } catch (parseError) {
        // If we can't parse the error response, just use the status
      }
      
      console.error('OpenAI API Error Details:', errorMessage);
      
      // Provide user-friendly error messages based on status codes
      if (response.status === 401) {
        return "I'm having authentication issues with my AI service. Please check that your OpenAI API key is valid and has sufficient permissions. 🔑";
      } else if (response.status === 429) {
        // Check if this is specifically a quota exceeded error
        if (errorData && errorData.error && errorData.error.message && errorData.error.message.includes('quota')) {
          return "🚀 Houston, we have a quota problem! My OpenAI API key has exceeded its usage limits. To get me back online, please visit https://platform.openai.com/account/billing/overview to check your billing details and increase your quota. Once that's sorted, I'll be ready to explore the cosmos with you again! ⭐";
        }
        return "I'm receiving too many requests right now. Please wait a moment and try again! ⏰";
      } else if (response.status === 500) {
        return "The AI service is experiencing technical difficulties. Please try again in a few moments! 🛠️";
      } else {
        return `I'm having trouble connecting to my AI service (Error ${response.status}). Please try again later! 🚀`;
      }
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return "I'm having network connectivity issues. Please check your internet connection and try again! 🌐";
    }
    
    return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment! 🚀";
  }
};
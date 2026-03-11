import type { LLMProvider } from './types.js';

export class LocalLLMProvider implements LLMProvider {
  async generateCommitMessage(diff: string): Promise<string> {
    const prompt = `Analyze the following git changes and write a one-line commit message. Return only the message:\n\n${diff}`;

    try {
      const response = await fetch('http://127.0.0.1:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma3:4b', 
          prompt: prompt,
          stream: false, 
        }),
      });

      if (!response.ok) {
        throw new Error('Ollama sunucusu yanıt vermedi.');
      }

      const data = await response.json() as { response: string };
      return data.response.trim();
    } catch (error) {
      console.error('Ollama API bağlantı hatası. Ollama uygulaması açık mı?');
      throw error;
    }
  }
}
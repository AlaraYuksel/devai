import type { LLMProvider } from './types.ts';
import {model} from '../setup/geminiapisetup.js';

export class CloudLLMProvider implements LLMProvider {
  async generateCommitMessage(diff: string): Promise<string> {
    try {
        const cevap = await model.generateContent(`Analyze the following changes and write a one-line commit message. Return only the message:\n\n${diff}`);
        return cevap.response.text();
    }
    catch (error) {
        console.error('Error generating commit message:', error);
    }
    return 'Bu özellik henüz desteklenmiyor. Lütfen yerel bir LLM sağlayıcısı kullanın.';
  }
}
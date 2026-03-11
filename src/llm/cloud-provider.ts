import type { LLMProvider } from './types.ts';

export class CloudLLMProvider implements LLMProvider {
  async generateCommitMessage(diff: string): Promise<string> {
    
    
    return 'Bu özellik henüz desteklenmiyor. Lütfen yerel bir LLM sağlayıcısı kullanın.';
  }
}
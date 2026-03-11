// Bütün yapay zeka sağlayıcılarının uymak zorunda olduğu ortak kural (Arayüz)
export interface LLMProvider {
  generateCommitMessage(input: string): Promise<string>;
}
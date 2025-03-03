
export interface AGIModel {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  version: string;
  creator: string;
  type: 'text' | 'vision' | 'multimodal' | 'audio';
  parameters: string;
  contextWindow: string;
  costPerToken: number;
  inputCost?: number;
  image?: string;
  featured?: boolean;
  maxInputTokens?: string;
  maxOutputTokens?: string;
  tags?: string[];
  features?: string[];
  useCases?: string[];
  architecture?: string;
  trainingData?: string;
  cutoffDate?: string;
  quantization?: string;
  supportedLanguages?: string[];
}

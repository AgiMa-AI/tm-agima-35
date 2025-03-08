
export interface AGIModel {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  version: string;
  creator: string;
  type: 'text' | 'vision' | 'multimodal' | 'audio' | 'image';
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
  // 添加旧AGI模型类型中的字段
  status?: 'available' | 'beta' | 'deprecated';
  provider?: string;
  capabilities?: string[];
  license?: string;
  cost?: number;
  performance?: {
    speed: string;
    accuracy: string;
  };
}

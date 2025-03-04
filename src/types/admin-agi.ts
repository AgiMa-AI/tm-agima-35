
export interface AGIModel {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'beta' | 'deprecated';
  type: 'text' | 'image' | 'audio' | 'video';
  architecture: string;
  provider: string;
  capabilities: string[];
  license: string;
  cost: number;
  performance: {
    speed: string;
    accuracy: string;
  };
}

export interface AGIModelFilters extends Record<string, string[]> {
  status: string[];
  type: string[];
  architecture: string[];
  capabilities: string[];
}

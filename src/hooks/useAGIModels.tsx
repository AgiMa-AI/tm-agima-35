
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AGIModel } from '@/types/agi';

// 模拟的AGI模型数据
const mockAGIModels: AGIModel[] = [
  {
    id: 'agi-gpt4-pro',
    name: 'GPT-4 Pro',
    description: '强大的通用人工智能模型，适用于各种复杂任务，拥有卓越的推理和创意能力',
    version: '1.0',
    creator: 'OpenAI',
    type: 'text',
    parameters: '1.5万亿',
    contextWindow: '32K tokens',
    costPerToken: 0.45,
    inputCost: 0.15,
    image: 'https://cdn.example.com/agi/gpt4.jpg',
    featured: true,
    tags: ['GPT', '通用AI', '高性能', '企业级']
  },
  {
    id: 'agi-claude-3',
    name: 'Claude 3 Opus',
    description: '以深度理解和安全性为特色的对话型AI，适合需要深度知识的任务',
    version: '3.0',
    creator: 'Anthropic',
    type: 'multimodal',
    parameters: '1.3万亿',
    contextWindow: '100K tokens',
    costPerToken: 0.55,
    image: 'https://cdn.example.com/agi/claude3.jpg',
    featured: true,
    tags: ['Claude', '安全AI', '对话', '长上下文']
  },
  {
    id: 'agi-llama-3',
    name: 'Llama 3 70B',
    description: '开源大型语言模型，提供出色的性能和更广泛的定制能力',
    version: '3.0',
    creator: 'Meta AI',
    type: 'text',
    parameters: '700亿',
    contextWindow: '8K tokens',
    costPerToken: 0.25,
    image: 'https://cdn.example.com/agi/llama3.jpg',
    tags: ['Llama', '开源', '可定制']
  },
  {
    id: 'agi-gemini-pro',
    name: 'Gemini Pro',
    description: '多模态人工智能模型，能够理解和生成文本、图像和代码',
    version: '1.0',
    creator: 'Google DeepMind',
    type: 'multimodal',
    parameters: '1.2万亿',
    contextWindow: '16K tokens',
    costPerToken: 0.40,
    image: 'https://cdn.example.com/agi/gemini.jpg',
    tags: ['Gemini', '多模态', 'Google']
  },
  {
    id: 'agi-falcon-40b',
    name: 'Falcon 40B',
    description: '开源大型语言模型，专注于高效推理和准确回答',
    version: '1.5',
    creator: 'Technology Innovation Institute',
    type: 'text',
    parameters: '400亿',
    contextWindow: '4K tokens',
    costPerToken: 0.20,
    image: 'https://cdn.example.com/agi/falcon.jpg',
    tags: ['Falcon', '开源', '高效']
  },
  {
    id: 'agi-mistral-7b',
    name: 'Mistral 7B',
    description: '轻量级但高性能的语言模型，适合资源受限场景',
    version: '1.0',
    creator: 'Mistral AI',
    type: 'text',
    parameters: '70亿',
    contextWindow: '8K tokens',
    costPerToken: 0.15,
    image: 'https://cdn.example.com/agi/mistral.jpg',
    tags: ['Mistral', '轻量级', '高效']
  },
  {
    id: 'agi-vision-pro',
    name: 'Vision Pro',
    description: '专为图像理解和视觉任务优化的多模态人工智能',
    version: '2.0',
    creator: 'AI Vision Labs',
    type: 'vision',
    parameters: '800亿',
    contextWindow: '12K tokens',
    costPerToken: 0.50,
    image: 'https://cdn.example.com/agi/vision.jpg',
    tags: ['视觉', '图像', '多模态']
  },
  {
    id: 'agi-whisper-xl',
    name: 'Whisper XL',
    description: '先进的语音识别和转录模型，支持多种语言',
    version: '1.5',
    creator: 'Audio AI',
    type: 'audio',
    parameters: '200亿',
    contextWindow: '30分钟音频',
    costPerToken: 0.35,
    image: 'https://cdn.example.com/agi/whisper.jpg',
    tags: ['语音', '音频', '转录']
  }
];

interface AGIModelFilters {
  search?: string;
  type?: string[];
  creator?: string[];
  featured?: boolean;
  minCost?: number;
  maxCost?: number;
}

export const useAGIModels = () => {
  const [models, setModels] = useState<AGIModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<AGIModelFilters>({});
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  
  // 获取所有可用的筛选选项
  const filterOptions = {
    type: {
      label: '模型类型',
      options: [
        { value: 'text', label: '文本' },
        { value: 'vision', label: '视觉' },
        { value: 'multimodal', label: '多模态' },
        { value: 'audio', label: '音频' }
      ]
    },
    creator: {
      label: '开发者',
      options: [
        { value: 'OpenAI', label: 'OpenAI' },
        { value: 'Anthropic', label: 'Anthropic' },
        { value: 'Meta AI', label: 'Meta AI' },
        { value: 'Google DeepMind', label: 'Google DeepMind' },
        { value: 'Mistral AI', label: 'Mistral AI' },
        { value: 'AI Vision Labs', label: '视觉AI实验室' },
        { value: 'Audio AI', label: '音频AI' }
      ]
    }
  };
  
  // 加载模型数据
  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      try {
        // 在真实环境中，这里会是API调用
        await new Promise(resolve => setTimeout(resolve, 800)); // 模拟加载延迟
        setModels(mockAGIModels);
        setTotalCount(mockAGIModels.length);
        setFilteredCount(mockAGIModels.length);
      } catch (error) {
        console.error('Error loading AGI models:', error);
        toast({
          variant: "destructive",
          title: "加载失败",
          description: "无法加载AGI模型数据，请稍后再试",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadModels();
  }, []);
  
  // 应用筛选条件
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...mockAGIModels];
      
      // 搜索筛选
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(model => 
          model.name.toLowerCase().includes(searchLower) || 
          model.description.toLowerCase().includes(searchLower) ||
          (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchLower)))
        );
      }
      
      // 类型筛选
      if (filters.type && filters.type.length > 0) {
        filtered = filtered.filter(model => 
          filters.type?.includes(model.type)
        );
      }
      
      // 开发者筛选
      if (filters.creator && filters.creator.length > 0) {
        filtered = filtered.filter(model => 
          filters.creator?.includes(model.creator)
        );
      }
      
      // 特色筛选
      if (filters.featured) {
        filtered = filtered.filter(model => model.featured);
      }
      
      // 价格范围筛选
      if (filters.minCost !== undefined) {
        filtered = filtered.filter(model => model.costPerToken >= (filters.minCost || 0));
      }
      
      if (filters.maxCost !== undefined) {
        filtered = filtered.filter(model => model.costPerToken <= filters.maxCost!);
      }
      
      setModels(filtered);
      setFilteredCount(filtered.length);
    };
    
    applyFilters();
  }, [filters]);
  
  // 更新筛选条件
  const updateFilters = useCallback((newFilters: Partial<AGIModelFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);
  
  // 重置筛选条件
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  // 根据ID获取模型
  const getModelById = useCallback((id: string) => {
    return mockAGIModels.find(model => model.id === id);
  }, []);
  
  // 租赁模型
  const rentModel = useCallback(async (modelId: string) => {
    // 在实际应用中，这里将是API调用以处理租赁逻辑
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API调用延迟
    
    const model = getModelById(modelId);
    if (model) {
      toast({
        title: "租赁成功",
        description: `您已成功租赁 ${model.name} 模型`,
      });
      return true;
    } else {
      throw new Error("Model not found");
    }
  }, [getModelById]);
  
  return {
    models,
    loading,
    filters,
    updateFilters,
    resetFilters,
    totalCount,
    filteredCount,
    filterOptions,
    getModelById,
    rentModel
  };
};


import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AGIModel } from '@/types/agi';

// 模拟的AGI模型数据
const mockAGIModels: AGIModel[] = [
  {
    id: 'agi-compute-x9000',
    name: 'ComputeX 9000',
    description: '顶级算力解决方案，适用于最先进的AGI训练和推理任务，提供卓越的性能和可靠性',
    version: '1.0',
    creator: 'NeuralCore',
    type: 'text',
    parameters: '1.5万亿',
    contextWindow: '32K tokens',
    costPerToken: 0.45,
    inputCost: 0.15,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    featured: true,
    tags: ['高性能计算', '企业级', 'AGI研发'],
    features: ['超大规模数据处理能力', '分布式训练优化', '自适应资源分配'],
    useCases: ['大规模AGI训练', '复杂科学模拟', '实时决策分析']
  },
  {
    id: 'agi-neuronet-opus',
    name: 'NeuroNet Opus',
    description: '专为多模态AI研发定制的算力方案，平衡性能与能耗，适合长期研究项目',
    version: '3.0',
    creator: 'Cognisys',
    type: 'multimodal',
    parameters: '1.3万亿',
    contextWindow: '100K tokens',
    costPerToken: 0.55,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d2c6f44d',
    featured: true,
    tags: ['多模态', '研究', '能效优化'],
    features: ['多模态并行处理', '动态内存管理', '低能耗高性能'],
    useCases: ['多模态模型研发', '学术研究', '长期AI实验']
  },
  {
    id: 'agi-quantum-edge',
    name: 'Quantum Edge 70B',
    description: '结合量子计算优势的新一代算力方案，为复杂推理和优化问题提供突破性能力',
    version: '3.0',
    creator: 'QuantumAI',
    type: 'text',
    parameters: '700亿',
    contextWindow: '8K tokens',
    costPerToken: 0.25,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    tags: ['量子加速', '混合计算', '优化问题'],
    features: ['量子辅助计算加速', '复杂优化问题解决', '高效资源调度'],
    useCases: ['复杂优化问题', '金融模型', '科学计算']
  },
  {
    id: 'agi-fusion-pro',
    name: 'Fusion Pro',
    description: '融合计算架构算力套件，专为企业级多场景AI部署设计，确保稳定性和一致性',
    version: '1.0',
    creator: 'FusionTech',
    type: 'multimodal',
    parameters: '1.2万亿',
    contextWindow: '16K tokens',
    costPerToken: 0.40,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    tags: ['企业部署', '多架构融合', '稳定可靠'],
    features: ['多架构统一调度', '企业级资源隔离', '自动容错和恢复'],
    useCases: ['企业AI基础设施', '关键业务系统', '大规模部署']
  },
  {
    id: 'agi-thinker-cluster',
    name: 'Thinker Cluster',
    description: '专为分布式思维和推理设计的集群计算方案，优化大规模语言模型推理',
    version: '1.5',
    creator: 'CognitiveX',
    type: 'text',
    parameters: '400亿',
    contextWindow: '4K tokens',
    costPerToken: 0.20,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    tags: ['分布式计算', '推理优化', '集群部署'],
    features: ['低延迟推理优化', '动态集群扩展', '高吞吐量处理'],
    useCases: ['实时AI服务', '高并发应用', '边缘计算部署']
  },
  {
    id: 'agi-neural-lite',
    name: 'Neural Lite 7B',
    description: '轻量级算力解决方案，为边缘设备和资源受限环境提供AI能力，保持高效率',
    version: '1.0',
    creator: 'EdgeAI',
    type: 'text',
    parameters: '70亿',
    contextWindow: '8K tokens',
    costPerToken: 0.15,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d2c6f44d',
    tags: ['边缘计算', '轻量级', '资源节约'],
    features: ['边缘设备优化', '低功耗运行', '压缩计算技术'],
    useCases: ['IoT设备', '移动应用', '嵌入式系统']
  },
  {
    id: 'agi-percept-ultra',
    name: 'Percept Ultra',
    description: '专为视觉和空间感知AI定制的算力平台，优化大规模图像和视频处理',
    version: '2.0',
    creator: 'VisionCore',
    type: 'vision',
    parameters: '800亿',
    contextWindow: '12K tokens',
    costPerToken: 0.50,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    tags: ['视觉AI', '空间感知', '实时处理'],
    features: ['大规模视觉数据并行处理', '3D空间推理加速', '实时视觉分析'],
    useCases: ['自动驾驶', '工业视觉检测', '增强现实应用']
  },
  {
    id: 'agi-soundscape-xl',
    name: 'SoundScape XL',
    description: '音频和语音处理专用算力方案，支持高精度语音识别和音频生成模型',
    version: '1.5',
    creator: 'AudioTech',
    type: 'audio',
    parameters: '200亿',
    contextWindow: '30分钟音频',
    costPerToken: 0.35,
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    tags: ['音频处理', '语音识别', '声学模型'],
    features: ['高精度音频特征提取', '实时语音处理', '多语言音频分析'],
    useCases: ['语音助手', '音频内容创作', '音乐生成与分析']
  }
];

// Update the interface to be compatible with Record<string, string[]>
interface AGIModelFilters {
  search?: string[];
  type?: string[];
  creator?: string[];
  industry?: string[]; // 适用产业
  series?: string[]; // 系列选项
  featured?: boolean;
  minCost?: number;
  maxCost?: number;
}

// Define the type for filter record that matches what's expected in AGIModelFilters
type FilterRecord = Record<string, string[] | undefined>;

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
      label: '开发厂商',
      options: [
        { value: 'NeuralCore', label: 'NeuralCore' },
        { value: 'Cognisys', label: 'Cognisys' },
        { value: 'QuantumAI', label: 'QuantumAI' },
        { value: 'FusionTech', label: 'FusionTech' },
        { value: 'CognitiveX', label: 'CognitiveX' },
        { value: 'EdgeAI', label: 'EdgeAI' },
        { value: 'VisionCore', label: 'VisionCore' },
        { value: 'AudioTech', label: 'AudioTech' }
      ]
    },
    series: {
      label: '系列选项',
      options: [
        { value: '高性能计算', label: '高性能计算' },
        { value: '量子加速', label: '量子加速' },
        { value: '分布式计算', label: '分布式计算' },
        { value: '边缘计算', label: '边缘计算' },
        { value: '多架构融合', label: '多架构融合' }
      ]
    },
    industry: {
      label: '适用产业',
      options: [
        { value: '科学研究', label: '科学研究' },
        { value: '金融服务', label: '金融服务' },
        { value: '制造业', label: '制造业' },
        { value: '医疗健康', label: '医疗健康' },
        { value: '自动驾驶', label: '自动驾驶' },
        { value: '内容创作', label: '内容创作' },
        { value: '教育培训', label: '教育培训' }
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
      
      // 搜索筛选 - updated to handle string array
      if (filters.search && filters.search.length > 0) {
        const searchLower = filters.search[0].toLowerCase();
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
      
      // 系列选项筛选
      if (filters.series && filters.series.length > 0) {
        filtered = filtered.filter(model => 
          model.tags && model.tags.some(tag => filters.series?.includes(tag))
        );
      }
      
      // 适用产业筛选（基于useCases）
      if (filters.industry && filters.industry.length > 0) {
        filtered = filtered.filter(model => {
          if (!model.useCases) return false;
          
          // 将useCases字符串与产业关键词进行匹配
          return filters.industry?.some(industry => {
            const industryLower = industry.toLowerCase();
            return model.useCases?.some(useCase => 
              useCase.toLowerCase().includes(industryLower)
            );
          });
        });
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
  const updateFilters = useCallback((newFilters: Partial<FilterRecord>) => {
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
        description: `您已成功租赁 ${model.name} 算力方案`,
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

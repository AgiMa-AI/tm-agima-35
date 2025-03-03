import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AGIModel } from '@/types/agi';

// 模拟的AGI模型数据 - 更新为更具未来科技感的内容
const mockAGIModels: AGIModel[] = [
  {
    id: 'quantum-nexus-9000',
    name: 'Quantum Nexus 9000',
    description: '量子加速计算核心，支持超大规模并行处理，专为突破性AGI研究设计的尖端算力平台',
    longDescription: '量子加速计算核心平台采用突破性量子-经典混合架构，集成量子位处理单元与传统GPU加速器，在维持高能效的同时，实现复杂神经网络的超大规模并行计算。专为前沿AGI研究与大规模多智能体模拟设计，支持高维度量子态编码，极大提升复杂推理与优化任务的计算效率。其专有量子纠错算法确保高保真度计算，为AGI的安全性与可靠性奠定坚实基础。',
    version: '2.1',
    creator: 'QuantumAI Labs',
    type: 'multimodal',
    parameters: '5万亿',
    contextWindow: '512K tokens',
    costPerToken: 0.45,
    inputCost: 0.15,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    featured: true,
    maxInputTokens: '256K',
    maxOutputTokens: '128K',
    tags: ['量子加速', '混合计算', 'AGI优化', '超大规模'],
    features: [
      '量子-经典混合计算架构',
      '实时多智能体系统模拟',
      '高维度量子态自监督学习',
      'AGI安全保障框架'
    ],
    useCases: [
      '突破性AGI研发',
      '复杂系统模拟',
      '量子金融建模',
      '先进材料发现'
    ],
    architecture: '量子-经典混合架构',
    trainingData: '跨领域科学数据集',
    cutoffDate: '2024年6月',
    quantization: 'QLoRA',
    supportedLanguages: ['英语', '中文', '日语', '德语', '法语', '俄语', '阿拉伯语']
  },
  {
    id: 'neocortex-ultra',
    name: 'NeoCorteX Ultra',
    description: '仿生神经计算网络，模拟人类大脑皮层处理机制，实现超低能耗的高效智能推理与自我优化',
    longDescription: '仿生神经计算网络采用突破性神经形态芯片架构，模拟人类大脑皮层的信息处理机制，实现了能耗比传统GPU降低95%的同时，提供更高效的智能推理能力。其独特的脉冲神经网络设计支持连续学习与记忆巩固，使模型能够像人脑一样不断优化自身。平台集成了专有的神经可塑性算法，实现动态权重调整，为长期AGI研究提供了理想的低能耗计算平台。',
    version: '3.5',
    creator: 'Synapse Systems',
    type: 'text',
    parameters: '1.8万亿',
    contextWindow: '1M tokens',
    costPerToken: 0.55,
    image: 'https://images.unsplash.com/photo-1593349480506-8433634cdcbe',
    featured: true,
    maxInputTokens: '500K',
    maxOutputTokens: '200K',
    tags: ['神经形态计算', '仿生芯片', '低能耗', '连续学习'],
    features: [
      '神经形态计算架构',
      '脉冲神经网络处理',
      '自适应连续学习',
      '超低功耗设计'
    ],
    useCases: [
      '可解释AI研究',
      '认知科学研究',
      '边缘智能部署',
      '长期智能演化'
    ],
    architecture: '神经形态SNN',
    trainingData: '多模态认知语料库',
    cutoffDate: '2024年5月',
    quantization: 'SpikingQA',
    supportedLanguages: ['英语', '中文', '法语', '德语', '西班牙语', '葡萄牙语', '日语']
  },
  {
    id: 'fusion-tensor-x',
    name: 'Fusion Tensor X',
    description: '融合张量加速架构，动态分配计算资源，为大型多模态模型提供前所未有的并行处理能力',
    version: '4.0',
    creator: 'TensorWave',
    type: 'multimodal',
    parameters: '2.2万亿',
    contextWindow: '256K tokens',
    costPerToken: 0.35,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
    tags: ['分布式计算', '多模态', '动态资源分配'],
    features: [
      '自适应计算资源分配',
      '多模态跨域理解',
      '大规模分布式训练',
      '实时模型协同'
    ],
    useCases: [
      '超大规模多模态模型',
      '复杂系统模拟',
      '创意内容生成',
      '科学发现'
    ],
    architecture: '融合张量处理器',
    trainingData: '跨模态知识图谱',
    cutoffDate: '2024年4月',
    quantization: 'DynamicTQ'
  },
  {
    id: 'hyperdrive-matrix',
    name: 'HyperDrive Matrix',
    description: '矩阵超速计算引擎，专为时空数据分析和预测性AGI任务设计，支持极速推理和全域优化',
    version: '2.0',
    creator: 'Chronos AI',
    type: 'text',
    parameters: '1.2万亿',
    contextWindow: '128K tokens',
    costPerToken: 0.30,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    tags: ['时空分析', '预测建模', '高速推理'],
    features: [
      '时空数据超并行处理',
      '预测性智能优化',
      '多维时序建模',
      '全域搜索加速'
    ],
    useCases: [
      '金融预测模型',
      '气候变化分析',
      '复杂系统预测',
      '全域优化问题'
    ],
    architecture: '矩阵加速计算',
    trainingData: '时空序列数据集',
    cutoffDate: '2024年3月',
    quantization: 'TensorHQ'
  },
  {
    id: 'biomimetic-cognition',
    name: 'Biomimetic Cognition',
    description: '生物仿生认知平台，融合神经科学与计算机科学前沿技术，支持类人思维过程模拟与研究',
    version: '1.5',
    creator: 'NeuraSci',
    type: 'text',
    parameters: '3.5万亿',
    contextWindow: '384K tokens',
    costPerToken: 0.60,
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519',
    tags: ['仿生认知', '类脑计算', '神经科学'],
    features: [
      '类脑认知过程模拟',
      '情感智能与意识研究',
      '神经符号推理',
      '自监督学习框架'
    ],
    useCases: [
      'AGI认知架构研究',
      '意识与情感模拟',
      '类人决策系统',
      '神经科学研究'
    ],
    architecture: '仿生神经网络',
    trainingData: '认知神经科学数据',
    cutoffDate: '2024年5月',
    quantization: 'NeuroQ'
  },
  {
    id: 'edge-neural-compact',
    name: 'Edge Neural Compact',
    description: '边缘智能优化解决方案，为资源受限环境提供高能效AI处理能力，实现本地化AGI部署',
    version: '2.0',
    creator: 'EdgeMind',
    type: 'vision',
    parameters: '350亿',
    contextWindow: '16K tokens',
    costPerToken: 0.15,
    image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450',
    tags: ['边缘计算', '轻量级', '低能耗'],
    features: [
      '边缘设备优化架构',
      '动态精度调整',
      '模型适应性压缩',
      '超低功耗推理'
    ],
    useCases: [
      '智能物联网设备',
      '自主机器人',
      '移动AI应用',
      '远程感知系统'
    ],
    architecture: '高效边缘神经处理器',
    trainingData: '边缘场景数据集',
    cutoffDate: '2024年2月',
    quantization: 'INT4/INT8混合'
  },
  {
    id: 'holographic-vision',
    name: 'Holographic Vision',
    description: '全息视觉计算平台，实现突破性的3D空间理解与建模，为元宇宙与空间智能提供算力支持',
    version: '1.0',
    creator: 'MetaVision',
    type: 'vision',
    parameters: '900亿',
    contextWindow: '24K tokens',
    costPerToken: 0.40,
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
    tags: ['全息视觉', '3D理解', '空间智能'],
    features: [
      '全息3D场景理解',
      '多视角空间建模',
      '动态物体追踪与预测',
      '实时空间语义分析'
    ],
    useCases: [
      '元宇宙内容创建',
      '增强现实应用',
      '自动驾驶感知',
      '智能机器人导航'
    ],
    architecture: '空间视觉处理器',
    trainingData: '3D场景与全息数据',
    cutoffDate: '2024年4月',
    quantization: 'SpatialQ'
  },
  {
    id: 'sonic-intelligence',
    name: 'Sonic Intelligence',
    description: '声学智能处理平台，专为高保真音频分析与生成设计，支持前沿音频AGI研究与应用',
    version: '3.0',
    creator: 'AudioNexus',
    type: 'audio',
    parameters: '500亿',
    contextWindow: '60分钟音频',
    costPerToken: 0.25,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    tags: ['声学处理', '音频分析', '语音技术'],
    features: [
      '高保真声学特征提取',
      '多层次音频语义理解',
      '情感与语调分析',
      '实时音频合成'
    ],
    useCases: [
      '音乐创作辅助',
      '高级语音识别',
      '音频环境理解',
      '声音仿真与重构'
    ],
    architecture: '神经声学处理器',
    trainingData: '多语言音频语料库',
    cutoffDate: '2024年3月',
    quantization: 'AudioHQ'
  }
];

// Define the type for filter record that matches what's expected in components
export type FilterRecord = Record<string, string[] | undefined | boolean | number>;

// 修复类型问题：为特殊过滤器创建单独的接口
interface AGIModelFilters {
  search?: string[];
  type?: string[];
  creator?: string[];
  series?: string[];
  industry?: string[];
  // 特殊过滤器，不遵循string[]类型
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
      
      // 搜索筛选
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
  
  // 更新筛选条件 - 修复类型问题
  const updateFilters = useCallback((newFilters: Partial<FilterRecord | AGIModelFilters>) => {
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

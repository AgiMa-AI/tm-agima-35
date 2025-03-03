
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAGIModels } from '@/hooks/useAGIModels';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BarChart3, 
  Bot, 
  Braces,
  Check, 
  ChevronRight, 
  Code, 
  CreditCard, 
  Server, 
  Settings, 
  Sparkles, 
  Star, 
  Trophy,
  MessageSquare,
  Layers,
  Cpu,
  Brain,
  Zap,
  Database,
  Network,
  CircuitBoard,
  LucideIcon
} from 'lucide-react';

const AGIDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getModelById, rentModel } = useAGIModels();
  const [isRenting, setIsRenting] = useState(false);
  
  const model = getModelById(id || '');
  
  if (!model) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12">
          <Bot className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h2 className="text-xl font-medium mb-2">模型未找到</h2>
          <p className="text-muted-foreground mb-6">
            找不到该模型，它可能已被删除或您输入了错误的链接
          </p>
          <Button onClick={() => navigate('/agi-models')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回模型列表
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleRentModel = async () => {
    setIsRenting(true);
    try {
      await rentModel(model.id);
      navigate('/account/my-models');
    } catch (error) {
      console.error('Rent model error:', error);
    } finally {
      setIsRenting(false);
    }
  };
  
  const getModelTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-indigo-500';
      case 'vision':
        return 'bg-violet-500';
      case 'multimodal':
        return 'bg-fuchsia-500';
      case 'audio':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFeatureIcon = (index: number): LucideIcon => {
    const icons = [Brain, Cpu, Network, Database, CircuitBoard, Zap];
    return icons[index % icons.length];
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* 返回按钮和导航路径 */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Button variant="ghost" size="sm" className="p-0 mr-2" onClick={() => navigate('/agi-models')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
          <span>AGI模型</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-foreground font-medium">{model.name}</span>
        </div>
        
        {/* 模型头部信息 - 更现代科技感设计 */}
        <div className="rounded-xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-indigo-800/90 z-10"></div>
            <div className="absolute inset-0 bg-grid-white/[0.05] z-20"></div>
            
            <div className="relative z-30 p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 lg:w-1/4">
                  {model.image ? (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <img 
                        src={model.image} 
                        alt={model.name}
                        className="w-full aspect-square object-cover rounded-lg border border-indigo-300/20 shadow-xl shadow-indigo-900/20 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex gap-2">
                          <Badge className={`${getModelTypeBadgeColor(model.type)} text-white`}>{model.type}</Badge>
                          {model.featured && (
                            <Badge className="bg-amber-500">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              推荐
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gradient-to-br from-indigo-800/50 to-purple-900/50 rounded-lg flex items-center justify-center border border-indigo-300/20 shadow-xl">
                      <Cpu className="h-24 w-24 text-indigo-300/50" />
                    </div>
                  )}
                </div>
                
                <div className="md:w-2/3 lg:w-3/4 space-y-4 text-white">
                  <div className="flex items-start justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-100">
                          {model.name}
                        </h1>
                      </div>
                      <p className="text-indigo-200/80 mt-1">
                        {model.creator} · 版本 {model.version}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-indigo-200/80">租赁价格</p>
                        <p className="text-xl font-bold text-white">
                          ¥{model.costPerToken} 
                          <span className="text-sm font-normal text-indigo-200/70">/1K tokens</span>
                        </p>
                      </div>
                      <Button 
                        onClick={handleRentModel} 
                        disabled={isRenting}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg shadow-indigo-900/30"
                      >
                        {isRenting ? '处理中...' : '立即租赁'}
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-base text-indigo-100/90">{model.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <p className="text-xs text-indigo-100/70">上下文窗口</p>
                      <p className="font-medium text-white">{model.contextWindow}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <p className="text-xs text-indigo-100/70">参数规模</p>
                      <p className="font-medium text-white">{model.parameters}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <p className="text-xs text-indigo-100/70">最大输入</p>
                      <p className="font-medium text-white">{model.maxInputTokens || '-'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <p className="text-xs text-indigo-100/70">最大输出</p>
                      <p className="font-medium text-white">{model.maxOutputTokens || '-'}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {model.tags?.map(tag => (
                      <Badge key={tag} variant="outline" className="bg-white/10 border-indigo-300/30 text-indigo-100">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 模型详细信息标签页 - 更现代科技感设计 */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="w-full sm:w-auto flex bg-muted/70 backdrop-blur-sm border border-indigo-200/10 p-1">
            <TabsTrigger value="overview" className="flex-1 sm:flex-initial">概览</TabsTrigger>
            <TabsTrigger value="specifications" className="flex-1 sm:flex-initial">技术规格</TabsTrigger>
            <TabsTrigger value="examples" className="flex-1 sm:flex-initial">示例和用例</TabsTrigger>
            <TabsTrigger value="requirements" className="flex-1 sm:flex-initial">算力需求</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Brain className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">关于此模型</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {model.longDescription || model.description}
                  </p>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">主要功能</span>
                  </h3>
                  <ul className="space-y-2">
                    {(model.features || ['高级自然语言处理能力', '支持多种语言和任务', '优化的响应速度和准确性', '支持复杂推理和创意生成', '高度适应不同场景的通用智能']).map((feature, index) => {
                      const IconComponent = getFeatureIcon(index);
                      return (
                        <li key={index} className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center mr-3 flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="pt-1">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <CircuitBoard className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">最适合的使用场景</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(model.useCases || [
                      '高级智能对话系统与虚拟助手',
                      '复杂内容创作与创意生成',
                      '多模态数据分析与理解',
                      '跨领域知识推理与问题解决'
                    ]).map((useCase, index) => (
                      <div key={index} className="flex items-center bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 p-4 rounded-lg border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                        <Sparkles className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm overflow-hidden relative">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="font-medium mb-4 flex items-center relative z-10">
                    <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">性能评估</span>
                  </h3>
                  <div className="space-y-4 relative z-10">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>推理速度</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">很快</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>准确性</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">高</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>创造性</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">中等</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="font-medium mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 text-indigo-500 mr-2" />
                    支持语言
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(model.supportedLanguages || ['英语', '中文', '日语', '德语', '法语', '西班牙语', '俄语', '韩语']).map((language, index) => (
                      <Badge key={index} variant="outline" className="border-indigo-200/30 bg-indigo-50/50 dark:bg-indigo-950/30">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 bottom-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
                  <h3 className="font-medium mb-3 flex items-center relative z-10">
                    <Bot className="h-5 w-5 text-indigo-500 mr-2" />
                    相关模型
                  </h3>
                  <div className="space-y-1 relative z-10">
                    {['星脑 - Quantum', 'NeuralNexus Pro', 'Mindforge AGI'].map((relatedModel, index) => (
                      <div key={index} className="flex items-center p-2 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/30 rounded-md cursor-pointer group">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-3 flex-shrink-0">
                          {index === 0 ? (
                            <Brain className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          ) : index === 1 ? (
                            <Network className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          ) : (
                            <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </div>
                        <span className="group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">{relatedModel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-indigo-200/20 shadow-sm overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-200/20">
                    <h3 className="text-lg font-medium flex items-center">
                      <CircuitBoard className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">技术规格</span>
                    </h3>
                  </div>
                  <div className="divide-y divide-indigo-200/20">
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">模型架构</span>
                      <span className="w-1/2 font-medium">{model.architecture || 'Transformer MoE'}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">参数规模</span>
                      <span className="w-1/2 font-medium">{model.parameters}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">上下文窗口</span>
                      <span className="w-1/2 font-medium">{model.contextWindow}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">训练数据集</span>
                      <span className="w-1/2 font-medium">{model.trainingData || '多源混合数据集 + 知识增强'}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">训练截止日期</span>
                      <span className="w-1/2 font-medium">{model.cutoffDate || '2023年12月'}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">量化技术</span>
                      <span className="w-1/2 font-medium">{model.quantization || 'GPTQ/AWQ/量子优化'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">性能基准测试</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>MMLU</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">78.5%</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '78.5%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>HellaSwag</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">83.2%</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '83.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>TruthfulQA</span>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">62.1%</span>
                      </div>
                      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '62.1%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-indigo-200/20 shadow-sm overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-200/20">
                    <h3 className="text-lg font-medium flex items-center">
                      <Braces className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">API参数</span>
                    </h3>
                  </div>
                  <div className="divide-y divide-indigo-200/20">
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">最大输入tokens</span>
                      <span className="w-1/2 font-medium">{model.maxInputTokens || model.contextWindow}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">最大输出tokens</span>
                      <span className="w-1/2 font-medium">{model.maxOutputTokens || '4,096'}</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">支持的采样方法</span>
                      <span className="w-1/2 font-medium">温度, Top P, Top K, 核采样</span>
                    </div>
                    <div className="flex py-3.5 px-4">
                      <span className="w-1/2 text-muted-foreground">支持流式响应</span>
                      <span className="w-1/2 font-medium">是</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mb-20"></div>
                  <h3 className="text-lg font-medium mb-3 flex items-center relative z-10">
                    <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">集成和兼容性</span>
                  </h3>
                  <div className="space-y-2.5 relative z-10">
                    <div className="flex items-start p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>标准OpenAI兼容API</span>
                    </div>
                    <div className="flex items-start p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>支持常见开发框架和SDK</span>
                    </div>
                    <div className="flex items-start p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>支持函数调用和工具使用</span>
                    </div>
                    <div className="flex items-start p-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>支持系统提示和角色定义</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Code className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">示例代码</span>
                  </h3>
                  <div className="bg-muted/80 p-4 rounded-md text-sm font-mono overflow-x-auto">
                    <pre className="text-xs sm:text-sm">
{`// 使用Fetch API调用模型
fetch('https://api.example.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    model: "${model.id}",
    messages: [
      {role: "system", content: "你是一个有用的助手"},
      {role: "user", content: "你好，请介绍一下自己"}
    ],
    temperature: 0.7,
    max_tokens: 500
  })
})`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">对话示例</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted/80 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">用户</p>
                        <div className="mt-1 p-3 rounded-lg bg-muted/40">
                          <p>请解释人工智能中的大型语言模型是如何工作的，并举一个实际应用的例子。</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">模型 ({model.name})</p>
                        <div className="mt-1 p-3 rounded-lg border border-indigo-100/30 dark:border-indigo-800/30 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                          <div className="space-y-2">
                            <p>大型语言模型（LLM）是基于深度学习的神经网络，主要使用Transformer架构，通过自监督学习从大量文本数据中学习语言模式和知识。它们的工作原理可以概括为以下几个步骤：</p>
                            <ol className="list-decimal pl-5 space-y-1">
                              <li>预训练：模型在海量文本数据上进行训练，学习词汇、语法、常识等基础知识</li>
                              <li>编码表示：将输入文本转换为向量表示（嵌入）</li>
                              <li>注意力机制：使用自注意力机制捕捉文本中的远距离依赖关系</li>
                              <li>预测生成：基于上下文预测下一个最可能的词或标记</li>
                            </ol>
                            <p>实际应用例子：在医疗领域，LLM已被用于帮助医生分析患者病历和医学文献。例如，一些医院使用LLM辅助诊断系统，医生可以用自然语言询问关于罕见症状的问题，模型会分析大量医学文献并提供可能的诊断建议和相关研究参考，帮助医生做出更准确的决策。这不仅提高了诊断效率，还使专科医生的专业知识能够间接惠及更多患者。</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">推荐提示词模板</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-indigo-100/30 dark:border-indigo-800/30 rounded-lg overflow-hidden">
                      <div className="p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-100/30 dark:border-indigo-800/30">
                        <h4 className="font-medium flex items-center">
                          <Brain className="h-4 w-4 text-indigo-500 mr-2" />
                          学术写作助手
                        </h4>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">
                          帮助撰写和完善学术论文的提示词
                        </p>
                        <div className="bg-muted/50 p-3 rounded-md text-sm font-mono">
                          我需要你作为一名学术写作助手。请帮我完善以下段落，确保使用学术语言，逻辑清晰，并加入相关研究支持。主题是：[您的主题]。以下是我的初稿：[您的初稿]
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-indigo-100/30 dark:border-indigo-800/30 rounded-lg overflow-hidden">
                      <div className="p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-indigo-100/30 dark:border-indigo-800/30">
                        <h4 className="font-medium flex items-center">
                          <Code className="h-4 w-4 text-indigo-500 mr-2" />
                          代码优化器
                        </h4>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground mb-2">
                          优化和改进代码的提示词
                        </p>
                        <div className="bg-muted/50 p-3 rounded-md text-sm font-mono">
                          请作为一名高级软件工程师，审查并优化以下[编程语言]代码。重点关注性能优化、代码可读性和最佳实践。如果发现任何潜在的安全问题，也请指出。代码如下：[您的代码]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Layers className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">适用场景</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
                        内容创作
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        生成高质量文章、报告、营销文案和创意内容
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Database className="h-4 w-4 text-indigo-500 mr-2" />
                        知识提取
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        从长文档中提取关键信息和洞见
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Code className="h-4 w-4 text-indigo-500 mr-2" />
                        代码开发
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        生成、解释和调试代码，提供编程建议
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Brain className="h-4 w-4 text-indigo-500 mr-2" />
                        教育辅助
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        制作教育内容、解答问题和辅导学习
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <h3 className="text-lg font-medium mb-4 flex items-center relative z-10">
                    <Server className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">算力需求</span>
                  </h3>
                  <p className="text-muted-foreground mb-4 relative z-10">
                    要运行{model.name}模型，您需要以下硬件资源：
                  </p>
                  
                  <div className="border border-indigo-100/30 dark:border-indigo-800/30 rounded-lg overflow-hidden relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-indigo-100/30 dark:divide-indigo-800/30">
                      <div className="p-4 bg-gradient-to-r from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent">
                        <div className="flex items-center mb-2">
                          <Cpu className="h-5 w-5 text-indigo-500 mr-2" />
                          <h4 className="font-medium">GPU需求</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-muted-foreground">最低：</span>
                            <span className="ml-1 font-medium">NVIDIA RTX 4080 16GB</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-muted-foreground">推荐：</span>
                            <span className="ml-1 font-medium">NVIDIA RTX 4090 24GB</span>
                          </li>
                        </ul>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <Server className="h-5 w-5 text-indigo-500 mr-2" />
                          <h4 className="font-medium">系统需求</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-muted-foreground">内存：</span>
                            <span className="ml-1 font-medium">32GB RAM</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-muted-foreground">存储：</span>
                            <span className="ml-1 font-medium">50GB可用空间</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-muted-foreground">CPU：</span>
                            <span className="ml-1 font-medium">8核现代处理器</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <BarChart3 className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">性能指标</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30">
                      <h4 className="font-medium mb-3">推理速度</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                              <span>RTX 4090</span>
                            </div>
                            <span className="font-medium">30 tokens/sec</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></div>
                              <span>RTX 4080</span>
                            </div>
                            <span className="font-medium">20 tokens/sec</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
                              <span>RTX 3090</span>
                            </div>
                            <span className="font-medium">15 tokens/sec</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30">
                      <h4 className="font-medium mb-3">内存使用</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                              <span>4K上下文</span>
                            </div>
                            <span className="font-medium">8GB VRAM</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></div>
                              <span>8K上下文</span>
                            </div>
                            <span className="font-medium">12GB VRAM</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1.5">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
                              <span>16K上下文</span>
                            </div>
                            <span className="font-medium">16GB VRAM</span>
                          </div>
                          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Server className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">托管解决方案</span>
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    如果您没有足够的算力资源，可以通过以下方式使用{model.name}模型：
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <Server className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">云端API访问</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            通过我们的API访问模型，无需本地部署，按使用量付费
                          </p>
                          <Button size="sm" className="mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                            查看API计划
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-indigo-100/30 dark:border-indigo-800/30 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <Settings className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">托管服务</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            我们提供完全托管的专用实例，确保性能和安全性
                          </p>
                          <Button size="sm" className="mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                            了解托管选项
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4 space-y-6">
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm sticky top-20">
                  <h3 className="font-medium mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">定价与使用</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-indigo-100/20 dark:border-indigo-800/20">
                      <span className="text-muted-foreground">输入价格</span>
                      <span className="font-medium">¥{model.inputCost || '0.15'}/1K tokens</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-indigo-100/20 dark:border-indigo-800/20">
                      <span className="text-muted-foreground">输出价格</span>
                      <span className="font-medium">¥{model.costPerToken}/1K tokens</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-indigo-100/20 dark:border-indigo-800/20">
                      <span className="text-muted-foreground">批量折扣</span>
                      <span className="font-medium">可用</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">最低消费</span>
                      <span className="font-medium">无</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
                      onClick={handleRentModel} 
                      disabled={isRenting}
                    >
                      {isRenting ? '处理中...' : '立即租赁'}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-6 border border-indigo-200/20 shadow-sm overflow-hidden relative">
                  <div className="absolute left-0 bottom-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
                  <h3 className="font-medium mb-3 flex items-center relative z-10">
                    <Cpu className="h-5 w-5 text-indigo-500 mr-2" />
                    <span>我们可以提供算力支持</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 relative z-10">
                    通过我们的算力托管服务，您可以获得最优性能的{model.name}模型体验
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full relative z-10 border-indigo-200/30 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300" 
                    onClick={() => navigate('/agi-hosting')}
                  >
                    <Server className="h-4 w-4 mr-2" />
                    查看算力方案
                  </Button>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-indigo-200/20 shadow-sm">
                  <h3 className="font-medium mb-3 flex items-center">
                    <MessageSquare className="h-5 w-5 text-indigo-500 mr-2" />
                    需要帮助？
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    如果您对模型租赁或算力需求有任何疑问，请联系我们的技术支持团队
                  </p>
                  <Button variant="ghost" className="text-indigo-600 dark:text-indigo-400 p-0 h-auto hover:bg-transparent hover:text-indigo-700 dark:hover:text-indigo-300">
                    联系支持
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AGIDetails;

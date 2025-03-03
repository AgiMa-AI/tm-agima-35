
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
  Check, 
  ChevronRight, 
  Code, 
  CreditCard, 
  Server, 
  Settings, 
  Sparkles, 
  Star, 
  Trophy,
  MessageSquare
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
        return 'bg-blue-500';
      case 'vision':
        return 'bg-purple-500';
      case 'multimodal':
        return 'bg-indigo-500';
      case 'audio':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
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
          <span className="text-foreground">{model.name}</span>
        </div>
        
        {/* 模型头部信息 */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 lg:w-1/4">
            {model.image ? (
              <img 
                src={model.image} 
                alt={model.name}
                className="w-full aspect-square object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Bot className="h-24 w-24 text-muted-foreground/30" />
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 lg:w-3/4 space-y-4">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl font-bold font-display">{model.name}</h1>
                  {model.featured && (
                    <Badge className="bg-amber-500">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      推荐
                    </Badge>
                  )}
                  <Badge className={getModelTypeBadgeColor(model.type)}>
                    {model.type}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {model.creator} · 版本 {model.version}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">租赁价格</p>
                  <p className="text-xl font-bold">¥{model.costPerToken} <span className="text-sm font-normal text-muted-foreground">/1K tokens</span></p>
                </div>
                <Button onClick={handleRentModel} disabled={isRenting}>
                  {isRenting ? '处理中...' : '立即租赁'}
                </Button>
              </div>
            </div>
            
            <p className="text-base">{model.description}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-muted/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">上下文窗口</p>
                <p className="font-medium">{model.contextWindow}</p>
              </div>
              <div className="bg-muted/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">参数规模</p>
                <p className="font-medium">{model.parameters}</p>
              </div>
              <div className="bg-muted/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">最大输入</p>
                <p className="font-medium">{model.maxInputTokens || '-'}</p>
              </div>
              <div className="bg-muted/40 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">最大输出</p>
                <p className="font-medium">{model.maxOutputTokens || '-'}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {model.tags?.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* 模型详细信息标签页 */}
        <Tabs defaultValue="overview" className="mt-8">
          <TabsList>
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="specifications">技术规格</TabsTrigger>
            <TabsTrigger value="examples">示例和用例</TabsTrigger>
            <TabsTrigger value="requirements">算力需求</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">关于此模型</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {model.longDescription || model.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">主要功能</h3>
                  <ul className="space-y-2">
                    {(model.features || ['高级自然语言处理能力', '支持多种语言和任务', '优化的响应速度和准确性']).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">最适合的使用场景</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(model.useCases || [
                      '智能客服和聊天机器人',
                      '内容生成和创作辅助',
                      '数据分析和信息提取',
                      '教育和学习辅助工具'
                    ]).map((useCase, index) => (
                      <div key={index} className="flex items-center bg-muted/40 p-3 rounded-lg">
                        <Sparkles className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                    性能评估
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>推理速度</span>
                        <span className="font-medium">很快</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>准确性</span>
                        <span className="font-medium">高</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>创造性</span>
                        <span className="font-medium">中等</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">支持语言</h3>
                  <div className="flex flex-wrap gap-2">
                    {(model.supportedLanguages || ['英语', '中文', '日语', '德语', '法语', '西班牙语']).map((language, index) => (
                      <Badge key={index} variant="outline">{language}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">相关模型</h3>
                  <div className="space-y-2">
                    {['GPT-4 Turbo', 'Claude 3 Opus', 'Llama 3'].map((relatedModel, index) => (
                      <div key={index} className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                        <Bot className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{relatedModel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">技术规格</h3>
                  <div className="border rounded-lg divide-y">
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">模型架构</span>
                      <span className="w-1/2 font-medium">{model.architecture || 'Transformer'}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">参数规模</span>
                      <span className="w-1/2 font-medium">{model.parameters}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">上下文窗口</span>
                      <span className="w-1/2 font-medium">{model.contextWindow}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">训练数据集</span>
                      <span className="w-1/2 font-medium">{model.trainingData || '多源混合数据集'}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">训练截止日期</span>
                      <span className="w-1/2 font-medium">{model.cutoffDate || '2023年12月'}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">量化技术</span>
                      <span className="w-1/2 font-medium">{model.quantization || 'GPTQ/AWQ'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">性能基准测试</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>MMLU</span>
                          <span className="font-medium">78.5%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '78.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>HellaSwag</span>
                          <span className="font-medium">83.2%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '83.2%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>TruthfulQA</span>
                          <span className="font-medium">62.1%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: '62.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API参数</h3>
                  <div className="border rounded-lg divide-y">
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">最大输入tokens</span>
                      <span className="w-1/2 font-medium">{model.maxInputTokens || model.contextWindow}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">最大输出tokens</span>
                      <span className="w-1/2 font-medium">{model.maxOutputTokens || '4,096'}</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">支持的采样方法</span>
                      <span className="w-1/2 font-medium">温度, Top P, Top K</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">支持流式响应</span>
                      <span className="w-1/2 font-medium">是</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">集成和兼容性</h3>
                  <div className="border rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>标准OpenAI兼容API</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>支持常见开发框架</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>支持函数调用和工具使用</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>支持系统提示和角色定义</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Code className="h-5 w-5 text-primary mr-2" />
                    示例代码
                  </h3>
                  <div className="bg-muted/50 p-3 rounded-md text-sm font-mono overflow-x-auto">
                    <pre>
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
          
          <TabsContent value="examples" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">对话示例</h3>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted/70 p-2 rounded-full">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">用户</p>
                      <p>请解释人工智能中的大型语言模型是如何工作的，并举一个实际应用的例子。</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">模型 ({model.name})</p>
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
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">推荐提示词模板</h3>
                  <div className="border rounded-lg divide-y">
                    <div className="p-4">
                      <h4 className="font-medium mb-2">学术写作助手</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        帮助撰写和完善学术论文的提示词
                      </p>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        我需要你作为一名学术写作助手。请帮我完善以下段落，确保使用学术语言，逻辑清晰，并加入相关研究支持。主题是：[您的主题]。以下是我的初稿：[您的初稿]
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-2">代码优化器</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        优化和改进代码的提示词
                      </p>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        请作为一名高级软件工程师，审查并优化以下[编程语言]代码。重点关注性能优化、代码可读性和最佳实践。如果发现任何潜在的安全问题，也请指出。代码如下：[您的代码]
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">适用场景</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        内容创作
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        生成高质量文章、报告、营销文案和创意内容
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        知识提取
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        从长文档中提取关键信息和洞见
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
                        代码开发
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        生成、解释和调试代码，提供编程建议
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Sparkles className="h-4 w-4 text-primary mr-2" />
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
          
          <TabsContent value="requirements" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">算力需求</h3>
                  <p className="text-muted-foreground mb-4">
                    要运行{model.name}模型，您需要以下硬件资源：
                  </p>
                  
                  <div className="border rounded-lg divide-y">
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">最低GPU需求</span>
                      <span className="w-1/2 font-medium">NVIDIA RTX 4080 16GB或同等性能</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">推荐GPU配置</span>
                      <span className="w-1/2 font-medium">NVIDIA RTX 4090 24GB</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">最低内存要求</span>
                      <span className="w-1/2 font-medium">32GB RAM</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">存储需求</span>
                      <span className="w-1/2 font-medium">50GB可用空间</span>
                    </div>
                    <div className="flex py-3 px-4">
                      <span className="w-1/2 text-muted-foreground">推荐CPU</span>
                      <span className="w-1/2 font-medium">8核现代处理器</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">性能指标</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">推理速度</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>RTX 4090</span>
                            <span className="font-medium">30 tokens/sec</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>RTX 4080</span>
                            <span className="font-medium">20 tokens/sec</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>RTX 3090</span>
                            <span className="font-medium">15 tokens/sec</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">内存使用</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>4K上下文</span>
                            <span className="font-medium">8GB VRAM</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>8K上下文</span>
                            <span className="font-medium">12GB VRAM</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>16K上下文</span>
                            <span className="font-medium">16GB VRAM</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">托管解决方案</h3>
                  <p className="text-muted-foreground mb-4">
                    如果您没有足够的算力资源，可以通过以下方式使用{model.name}模型：
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <Server className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium">云端API访问</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            通过我们的API访问模型，无需本地部署，按使用量付费
                          </p>
                          <Button size="sm" className="mt-3">
                            查看API计划
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <Settings className="h-5 w-5 text-primary mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium">托管服务</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            我们提供完全托管的专用实例，确保性能和安全性
                          </p>
                          <Button size="sm" className="mt-3">
                            了解托管选项
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-4 space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                    定价与使用
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">输入价格</span>
                      <span className="font-medium">¥{model.inputCost || '0.15'}/1K tokens</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">输出价格</span>
                      <span className="font-medium">¥{model.costPerToken}/1K tokens</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">批量折扣</span>
                      <span className="font-medium">可用</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">最低消费</span>
                      <span className="font-medium">无</span>
                    </div>
                    
                    <Button className="w-full mt-2" onClick={handleRentModel} disabled={isRenting}>
                      {isRenting ? '处理中...' : '立即租赁'}
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">我们可以提供算力支持</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    通过我们的算力托管服务，您可以获得最优性能的{model.name}模型体验
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/agi-hosting')}>
                    <Server className="h-4 w-4 mr-2" />
                    查看算力方案
                  </Button>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <h3 className="font-medium mb-2">需要帮助？</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    如果您对模型租赁或算力需求有任何疑问，请联系我们的技术支持团队
                  </p>
                  <Button variant="ghost" className="text-primary p-0 h-auto">
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

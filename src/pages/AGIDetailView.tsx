
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bot,
  Cpu,
  Smartphone,
  Server,
  ArrowLeft,
  ChevronRight,
  Layers,
  Code,
  BarChart,
  Globe
} from 'lucide-react';
import { useAGIModels } from '@/hooks/useAGIModels';

const AGIDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { getModelById } = useAGIModels();
  const [activeTab, setActiveTab] = useState('overview');
  
  const model = getModelById(id || '');

  if (!model) {
    return (
      <Layout>
        <div className="container py-6">
          <div className="flex items-center mb-6">
            <Link to="/agi-models">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回模型列表
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p>未找到此模型信息</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleConnectMobile = () => {
    toast({
      title: "开始接入",
      description: `您正在将移动设备接入 ${model.name} 算力网络`,
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Link to="/agi-models">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回模型列表
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{model.name}</CardTitle>
                    <CardDescription className="mt-2">{model.description}</CardDescription>
                  </div>
                  <Badge variant={model.type === 'text' ? 'default' : model.type === 'image' ? 'secondary' : model.type === 'audio' ? 'destructive' : 'outline'}>
                    {model.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.capabilities && model.capabilities.map((capability) => (
                    <Badge key={capability} variant="secondary" className="mr-1">{capability}</Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">架构</div>
                    <div className="font-medium">{model.architecture}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">提供商</div>
                    <div className="font-medium">{model.provider}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">许可证</div>
                    <div className="font-medium">{model.license}</div>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">使用成本</div>
                    <div className="font-medium">${model.cost}/次</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">接入我的设备</CardTitle>
                <CardDescription>
                  贡献您的移动设备算力，参与AI模型训练，每天获得稳定收益
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-background/80 rounded-md p-4 mb-4">
                  <div className="flex items-center justify-center mb-4">
                    <Smartphone className="h-12 w-12 text-primary opacity-80" />
                  </div>
                  <h3 className="text-center font-medium mb-1">移动设备算力共享</h3>
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    利用手机闲置算力，安全稳定地为AI模型提供计算能力
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>低能耗，不影响日常使用</span>
                  </div>
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>高度优化的任务分配</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>实时收益统计</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/mobile-computing" className="w-full">
                  <Button className="w-full">
                    接入我的设备
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">模型概览</TabsTrigger>
            <TabsTrigger value="specs">技术规格</TabsTrigger>
            <TabsTrigger value="applications">应用场景</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">模型概览</CardTitle>
                <CardDescription>详细了解模型的核心能力和特点</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-md text-center">
                    <Layers className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium mb-1">架构优势</h3>
                    <p className="text-sm text-muted-foreground">
                      {model.architecture} 架构设计，平衡性能与效率
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-md text-center">
                    <Code className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium mb-1">核心能力</h3>
                    <p className="text-sm text-muted-foreground">
                      {model.capabilities && model.capabilities.slice(0, 2).join('、')} 等多种能力
                    </p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-md text-center">
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium mb-1">适用领域</h3>
                    <p className="text-sm text-muted-foreground">
                      广泛应用于科研、内容创作、商业分析等场景
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">性能评估</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">速度</span>
                        <span className="text-sm font-medium">{model.performance?.speed}</span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        model.performance?.speed === 'fast' ? 'bg-green-500' :
                        model.performance?.speed === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">准确率</span>
                        <span className="text-sm font-medium">{model.performance?.accuracy}</span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        model.performance?.accuracy === 'high' ? 'bg-green-500' :
                        model.performance?.accuracy === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">技术规格</CardTitle>
                <CardDescription>详细的模型技术参数与规格</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-2">基础参数</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">模型类型</span>
                        <span>{model.type}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">架构</span>
                        <span>{model.architecture}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">提供商</span>
                        <span>{model.provider}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">许可证</span>
                        <span>{model.license}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-2">性能指标</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">处理速度</span>
                        <span>{model.performance?.speed}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">准确率</span>
                        <span>{model.performance?.accuracy}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">每次调用成本</span>
                        <span>${model.cost}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">计算资源需求</h3>
                  <div className="bg-muted/30 p-4 rounded-md">
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">最小GPU内存</span>
                        <span>8 GB</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">推荐GPU型号</span>
                        <span>NVIDIA A10 或更高</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">批处理能力</span>
                        <span>16-32 请求/秒</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">分布式训练</span>
                        <span>支持</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">应用场景</CardTitle>
                <CardDescription>了解模型在不同领域的应用案例</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-3">科研应用</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      在科学研究领域，该模型能够加速数据分析、辅助文献综述、提供复杂问题的解决方案。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">数据分析</Badge>
                      <Badge variant="outline">模式识别</Badge>
                      <Badge variant="outline">自动化研究</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-3">商业应用</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      在商业环境中，模型可以提供市场分析、客户洞察、自动化报告生成等多种功能。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">市场分析</Badge>
                      <Badge variant="outline">客户洞察</Badge>
                      <Badge variant="outline">自动化报告</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">成功案例</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">医疗健康领域</h4>
                      <p className="text-sm text-muted-foreground">
                        某医疗研究机构利用该模型处理大量医学文献，显著提高了疾病诊断效率，并发现了新的治疗方案关联。
                      </p>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium mb-1">金融分析领域</h4>
                      <p className="text-sm text-muted-foreground">
                        金融科技公司通过该模型实现了更精准的市场预测，风险评估准确率提升了28%。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/mobile-computing" className="w-full">
                  <Button variant="outline" className="w-full">
                    接入我的设备贡献算力
                    <Smartphone className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AGIDetailView;

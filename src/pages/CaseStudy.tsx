
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  BrainCircuit, 
  BarChart, 
  Building, 
  Factory, 
  GraduationCap, 
  HeartPulse, 
  LandPlot, 
  Microscope, 
  Shield, 
  ShoppingBag, 
  Truck, 
  Wifi,
  Zap,
  Globe,
  CheckCircle,
  Server,
  Layers,
  Calendar,
  Clock,
  Users,
  Cpu
} from 'lucide-react';

// 模拟企业客户数据 - 同样的数据结构，但有更多详细信息
interface EnterpriseClient {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  country: string;
  usageType: string[];
  deploymentType: 'cloud' | 'hybrid' | 'on-premise' | 'edge';
  modelCount: number;
  firstDeployed: string;
  // 详细案例研究数据
  caseStudy?: {
    challenge: string;
    solution: string;
    results: string[];
    quote?: {
      text: string;
      author: string;
      position: string;
    };
    businessValue: {
      efficiency: number;
      cost: number;
      quality: number;
    };
    implementationTime: string;
    teamSize: number;
    technicalSpecs: {
      models: string[];
      apiCalls: number;
      dataProcessed: string;
    };
    futureExpansion?: string;
  };
}

// 详细的客户数据，包括案例研究
const mockEnterpriseClientsDetails: Record<string, EnterpriseClient> = {
  'aitech-01': {
    id: 'aitech-01',
    name: '智联科技',
    logo: '/logos/aitech.svg',
    industry: '金融科技',
    location: '上海',
    country: '中国',
    usageType: ['NLP', '风险分析', '客户服务'],
    deploymentType: 'hybrid',
    modelCount: 8,
    firstDeployed: '2024-09',
    caseStudy: {
      challenge: '智联科技面临大量客户查询和交易风险评估的挑战，传统人工处理方式效率低下且容易出错。',
      solution: '我们为智联科技定制了金融NLP模型和风险评估模型，通过混合部署方式保障数据安全的同时实现了高效处理。',
      results: [
        '客户服务响应时间减少80%',
        '风险评估准确率提升至97%',
        '每月处理超过50万次客户查询'
      ],
      quote: {
        text: '这套AGI解决方案彻底改变了我们的运营方式，不仅提高了效率，更为我们创造了新的业务增长点。',
        author: '李明',
        position: '智联科技CTO'
      },
      businessValue: {
        efficiency: 85,
        cost: 65,
        quality: 90
      },
      implementationTime: '3个月',
      teamSize: 12,
      technicalSpecs: {
        models: ['金融NLP-Plus', '风险预测Pro', '客户行为分析'],
        apiCalls: 1500000,
        dataProcessed: '2.5TB/月'
      },
      futureExpansion: '计划在未来6个月内扩展到智能投顾和市场预测领域'
    }
  },
  'quantum-02': {
    id: 'quantum-02',
    name: '量子网络',
    logo: '/logos/quantum.svg',
    industry: '电信',
    location: '北京',
    country: '中国',
    usageType: ['网络优化', '预测维护'],
    deploymentType: 'cloud',
    modelCount: 5,
    firstDeployed: '2024-10',
    caseStudy: {
      challenge: '量子网络需要优化其大规模网络基础设施，减少故障停机时间并提高服务质量。',
      solution: '我们部署了云端网络优化模型和预测性维护AI系统，实时监控和优化网络性能。',
      results: [
        '网络故障预警准确率达95%',
        '网络性能提升30%',
        '维护成本降低40%'
      ],
      quote: {
        text: '预测性维护模型帮助我们将网络故障提前识别，极大减少了客户投诉和维修成本。',
        author: '张华',
        position: '量子网络网络运维总监'
      },
      businessValue: {
        efficiency: 75,
        cost: 80,
        quality: 85
      },
      implementationTime: '4个月',
      teamSize: 8,
      technicalSpecs: {
        models: ['网络流量分析', '设备故障预测', '智能资源分配'],
        apiCalls: 3000000,
        dataProcessed: '8TB/月'
      }
    }
  },
  'medai-03': {
    id: 'medai-03',
    name: '医智云',
    logo: '/logos/medai.svg',
    industry: '医疗健康',
    location: '广州',
    country: '中国',
    usageType: ['医学影像分析', '健康预测'],
    deploymentType: 'on-premise',
    modelCount: 3,
    firstDeployed: '2024-11',
    caseStudy: {
      challenge: '医智云需要高精度的医学影像分析技术，同时严格保障患者数据隐私和安全。',
      solution: '我们提供了本地部署的医学影像分析模型和健康预测系统，确保数据不出院内网络。',
      results: [
        '诊断辅助正确率提高40%',
        '医生工作效率提升60%',
        '患者等待时间减少50%'
      ],
      quote: {
        text: '这套系统不仅提高了诊断准确率，还让我们的医生能够处理更多病例，真正实现了医疗资源的优化配置。',
        author: '王医生',
        position: '医智云首席医疗官'
      },
      businessValue: {
        efficiency: 92,
        cost: 60,
        quality: 95
      },
      implementationTime: '6个月',
      teamSize: 15,
      technicalSpecs: {
        models: ['CT影像分析', 'MRI智能诊断', '健康风险评估'],
        apiCalls: 500000,
        dataProcessed: '12TB/月'
      },
      futureExpansion: '正在开发个性化治疗方案推荐系统'
    }
  },
  'edutech-04': {
    id: 'edutech-04',
    name: '教育智能',
    logo: '/logos/edutech.svg',
    industry: '教育科技',
    location: '深圳',
    country: '中国',
    usageType: ['个性化学习', '评估系统'],
    deploymentType: 'cloud',
    modelCount: 4,
    firstDeployed: '2024-08',
    caseStudy: {
      challenge: '教育智能希望为学生提供真正个性化的学习体验，同时帮助教师更精准地评估学生能力。',
      solution: '我们开发了基于云的自适应学习系统和智能评估工具，能够根据学生表现实时调整学习内容。',
      results: [
        '学生学习效率提升45%',
        '教师工作量减少30%',
        '学生参与度增加50%'
      ],
      quote: {
        text: '这套系统让每个学生都能获得近似于一对一辅导的体验，同时大大减轻了教师的负担。',
        author: '陈教授',
        position: '教育智能教学总监'
      },
      businessValue: {
        efficiency: 80,
        cost: 70,
        quality: 85
      },
      implementationTime: '3个月',
      teamSize: 10,
      technicalSpecs: {
        models: ['学习路径优化', '能力水平评估', '内容推荐'],
        apiCalls: 1200000,
        dataProcessed: '1.8TB/月'
      }
    }
  },
  'retailai-05': {
    id: 'retailai-05',
    name: '零售智能',
    logo: '/logos/retailai.svg',
    industry: '零售',
    location: '杭州',
    country: '中国',
    usageType: ['需求预测', '库存优化', '个性化推荐'],
    deploymentType: 'hybrid',
    modelCount: 7,
    firstDeployed: '2024-07',
    caseStudy: {
      challenge: '零售智能面临库存管理效率低下、客户个性化体验不足以及需求预测不准确的多重挑战。',
      solution: '我们为其定制了需求预测、库存优化和个性化推荐三套模型系统，通过混合部署方式实现线上线下数据融合。',
      results: [
        '库存周转率提升35%',
        '产品推荐点击率提高60%',
        '库存成本降低25%'
      ],
      quote: {
        text: '这套AI系统让我们能够提前预测消费者需求，优化库存管理的同时提供个性化的购物体验，显著提升了我们的竞争力。',
        author: '林总',
        position: '零售智能CEO'
      },
      businessValue: {
        efficiency: 88,
        cost: 75,
        quality: 85
      },
      implementationTime: '5个月',
      teamSize: 12,
      technicalSpecs: {
        models: ['需求预测引擎', '库存优化器', '个性化推荐系统', '消费者洞察'],
        apiCalls: 2000000,
        dataProcessed: '4TB/月'
      },
      futureExpansion: '计划拓展到智能定价和供应链优化领域'
    }
  },
  'indai-06': {
    id: 'indai-06',
    name: '工业智脑',
    logo: '/logos/indai.svg',
    industry: '制造业',
    location: '苏州',
    country: '中国',
    usageType: ['预测性维护', '质量控制', '供应链优化'],
    deploymentType: 'edge',
    modelCount: 12,
    firstDeployed: '2024-06',
    caseStudy: {
      challenge: '工业智脑需要提高生产线效率、减少停机时间并提高产品质量，同时应对工业环境中的网络限制。',
      solution: '我们部署了边缘计算模式的预测性维护、质量控制和供应链优化AI模型，实现实时响应和决策。',
      results: [
        '设备停机时间减少70%',
        '产品缺陷率下降45%',
        '生产效率提高30%'
      ],
      quote: {
        text: '边缘部署的模型让我们能够在几毫秒内做出决策，完美解决了工厂网络限制和实时性需求的挑战。',
        author: '周工',
        position: '工业智脑技术总监'
      },
      businessValue: {
        efficiency: 90,
        cost: 85,
        quality: 92
      },
      implementationTime: '8个月',
      teamSize: 20,
      technicalSpecs: {
        models: ['设备健康监测', '质量检测', '生产计划优化', '供应链管理'],
        apiCalls: 5000000,
        dataProcessed: '15TB/月'
      },
      futureExpansion: '正在开发全自动化生产线适应系统'
    }
  },
  'agroai-07': {
    id: 'agroai-07',
    name: '农智科技',
    logo: '/logos/agroai.svg',
    industry: '农业',
    location: '成都',
    country: '中国',
    usageType: ['作物监测', '收成预测'],
    deploymentType: 'hybrid',
    modelCount: 3,
    firstDeployed: '2024-10',
    caseStudy: {
      challenge: '农智科技需要准确监测大面积农田作物生长状况并预测产量，同时需要应对农村地区网络不稳定的情况。',
      solution: '我们提供了混合部署的作物监测和收成预测系统，结合卫星图像和地面传感器数据进行分析。',
      results: [
        '产量预测准确率达90%',
        '灌溉用水减少30%',
        '农药使用减少25%'
      ],
      businessValue: {
        efficiency: 75,
        cost: 70,
        quality: 80
      },
      implementationTime: '4个月',
      teamSize: 8,
      technicalSpecs: {
        models: ['作物健康分析', '产量预测', '病虫害检测'],
        apiCalls: 300000,
        dataProcessed: '2TB/月'
      }
    }
  },
  'secureai-08': {
    id: 'secureai-08',
    name: '安全卫士',
    logo: '/logos/secureai.svg',
    industry: '网络安全',
    location: '武汉',
    country: '中国',
    usageType: ['威胁检测', '异常识别'],
    deploymentType: 'on-premise',
    modelCount: 6,
    firstDeployed: '2024-09',
    caseStudy: {
      challenge: '安全卫士需要应对日益复杂的网络安全威胁，提高威胁检测速度和准确率，同时确保客户数据安全。',
      solution: '我们为其开发了本地部署的威胁检测和异常识别系统，能够实时分析网络流量和用户行为。',
      results: [
        '威胁检测速度提高200倍',
        '误报率降低60%',
        '安全事件响应时间减少75%'
      ],
      quote: {
        text: '这套系统彻底改变了我们的安全运营中心工作方式，让我们能够在威胁造成损害前识别并拦截。',
        author: '刘总',
        position: '安全卫士首席安全官'
      },
      businessValue: {
        efficiency: 95,
        cost: 75,
        quality: 95
      },
      implementationTime: '6个月',
      teamSize: 18,
      technicalSpecs: {
        models: ['行为异常检测', '恶意代码识别', '高级持续性威胁分析'],
        apiCalls: 8000000,
        dataProcessed: '20TB/月'
      }
    }
  },
  'smartcity-09': {
    id: 'smartcity-09',
    name: '智慧城市',
    logo: '/logos/smartcity.svg',
    industry: '政府',
    location: '南京',
    country: '中国',
    usageType: ['交通管理', '能源优化', '安全监控'],
    deploymentType: 'hybrid',
    modelCount: 9,
    firstDeployed: '2024-05',
    caseStudy: {
      challenge: '智慧城市项目面临复杂的城市管理挑战，包括交通拥堵、能源浪费和公共安全问题。',
      solution: '我们提供了混合部署的智慧城市解决方案，包括交通管理、能源优化和安全监控系统。',
      results: [
        '交通拥堵减少35%',
        '能源使用效率提高25%',
        '公共安全事件响应时间减少40%'
      ],
      businessValue: {
        efficiency: 85,
        cost: 65,
        quality: 90
      },
      implementationTime: '12个月',
      teamSize: 25,
      technicalSpecs: {
        models: ['智能交通系统', '能源分配优化', '视频分析', '应急响应'],
        apiCalls: 10000000,
        dataProcessed: '30TB/月'
      },
      futureExpansion: '规划拓展到环境监测和公共服务优化领域'
    }
  }
};

// 获取行业图标
const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case '金融科技':
      return <BarChart className="h-6 w-6" />;
    case '电信':
      return <Wifi className="h-6 w-6" />;
    case '医疗健康':
      return <HeartPulse className="h-6 w-6" />;
    case '教育科技':
      return <GraduationCap className="h-6 w-6" />;
    case '零售':
      return <ShoppingBag className="h-6 w-6" />;
    case '制造业':
      return <Factory className="h-6 w-6" />;
    case '农业':
      return <LandPlot className="h-6 w-6" />;
    case '网络安全':
      return <Shield className="h-6 w-6" />;
    case '政府':
      return <Building className="h-6 w-6" />;
    case '物流运输':
      return <Truck className="h-6 w-6" />;
    case '科研':
      return <Microscope className="h-6 w-6" />;
    case '能源':
      return <Zap className="h-6 w-6" />;
    default:
      return <BrainCircuit className="h-6 w-6" />;
  }
};

// 获取部署类型徽章
const getDeploymentBadge = (type: string) => {
  switch (type) {
    case 'cloud':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">云端部署</Badge>;
    case 'hybrid':
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">混合部署</Badge>;
    case 'on-premise':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">本地部署</Badge>;
    case 'edge':
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">边缘部署</Badge>;
    default:
      return <Badge variant="outline">未知</Badge>;
  }
};

// 进度条组件
const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-primary h-2.5 rounded-full" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<EnterpriseClient | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  
  useEffect(() => {
    // 根据ID从模拟数据中获取客户信息
    if (id && mockEnterpriseClientsDetails[id]) {
      setClient(mockEnterpriseClientsDetails[id]);
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/service-distribution');
  };

  if (!client) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">未找到企业案例</h2>
          <p className="text-muted-foreground mb-6">
            您查找的企业案例不存在或已被移除。
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回企业列表
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={handleGoBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回企业列表
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* 企业基本信息卡片 */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={client.logo} alt={client.name} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {client.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <div className="flex items-center justify-center mt-2">
                {getIndustryIcon(client.industry)}
                <span className="ml-2 text-lg">{client.industry}</span>
              </div>
              <div className="mt-2">
                {getDeploymentBadge(client.deploymentType)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">地区</div>
                    <div>{client.location}，{client.country}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Layers className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">部署模型</div>
                    <div>{client.modelCount}个模型</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">首次部署</div>
                    <div>{client.firstDeployed}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">应用场景</div>
                  <div className="flex flex-wrap gap-2">
                    {client.usageType.map((usage, idx) => (
                      <Badge key={idx} variant="outline" className="bg-muted/50">
                        {usage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 案例研究主要内容 */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">案例研究</CardTitle>
              <CardDescription>
                AGI模型如何为{client.name}创造商业价值
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {client.caseStudy && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">挑战</h3>
                    <p className="text-muted-foreground">{client.caseStudy.challenge}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">解决方案</h3>
                    <p className="text-muted-foreground">{client.caseStudy.solution}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">成果</h3>
                    <ul className="space-y-2">
                      {client.caseStudy.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {client.caseStudy.quote && (
                    <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                      <p className="italic mb-2">"{client.caseStudy.quote.text}"</p>
                      <div className="text-sm font-medium">
                        — {client.caseStudy.quote.author}，{client.caseStudy.quote.position}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* 业务价值和技术细节 */}
        {client.caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>商业价值</CardTitle>
                <CardDescription>
                  AGI模型在各个业务维度的提升效果
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>效率提升</span>
                    <span className="font-medium">{client.caseStudy.businessValue.efficiency}%</span>
                  </div>
                  <ProgressBar value={client.caseStudy.businessValue.efficiency} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>成本降低</span>
                    <span className="font-medium">{client.caseStudy.businessValue.cost}%</span>
                  </div>
                  <ProgressBar value={client.caseStudy.businessValue.cost} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>质量改善</span>
                    <span className="font-medium">{client.caseStudy.businessValue.quality}%</span>
                  </div>
                  <ProgressBar value={client.caseStudy.businessValue.quality} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-8 w-8 text-primary/70 mb-2" />
                    <div className="text-sm text-center">实施周期</div>
                    <div className="font-semibold">{client.caseStudy.implementationTime}</div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
                    <Users className="h-8 w-8 text-primary/70 mb-2" />
                    <div className="text-sm text-center">项目团队</div>
                    <div className="font-semibold">{client.caseStudy.teamSize}人</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>技术规格</CardTitle>
                <CardDescription>
                  部署的AGI模型技术参数与规格
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">部署模型</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {client.caseStudy.technicalSpecs.models.map((model, idx) => (
                      <div key={idx} className="flex items-center bg-muted/30 p-2 rounded-md">
                        <BrainCircuit className="h-4 w-4 mr-2 text-primary/70" />
                        <span className="text-sm">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <div className="text-sm font-medium">月均API调用</div>
                    <div className="flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary/70" />
                      <span className="font-semibold">{client.caseStudy.technicalSpecs.apiCalls.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <div className="text-sm font-medium">月均数据处理量</div>
                    <div className="flex items-center">
                      <Cpu className="h-5 w-5 mr-2 text-primary/70" />
                      <span className="font-semibold">{client.caseStudy.technicalSpecs.dataProcessed}</span>
                    </div>
                  </div>
                </div>
                
                {client.caseStudy.futureExpansion && (
                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">未来扩展计划</h3>
                    <p className="text-sm text-muted-foreground">{client.caseStudy.futureExpansion}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* 相关企业案例 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>相关企业案例</CardTitle>
            <CardDescription>
              浏览同行业或使用相似模型的其他企业
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.values(mockEnterpriseClientsDetails)
                .filter(otherClient => otherClient.id !== client.id && 
                        (otherClient.industry === client.industry || 
                         otherClient.deploymentType === client.deploymentType))
                .slice(0, 3)
                .map(relatedClient => (
                  <Link 
                    key={relatedClient.id} 
                    to={`/case-studies/${relatedClient.id}`}
                    className="flex items-center p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={relatedClient.logo} alt={relatedClient.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {relatedClient.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{relatedClient.name}</div>
                      <div className="text-sm text-muted-foreground">{relatedClient.industry}</div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-primary/10 to-indigo-500/10 border-primary/20">
          <CardHeader>
            <CardTitle>希望了解更多？</CardTitle>
            <CardDescription>
              我们可以为您的企业定制专属AGI解决方案
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-center sm:text-left mb-4 sm:mb-0 sm:mr-4">
              了解我们如何将AGI模型应用到您的业务场景中，创造真正的商业价值
            </p>
            <Button className="whitespace-nowrap">
              联系解决方案专家
            </Button>
          </CardContent>
        </Card>
        
        {/* 图片查看对话框 */}
        <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{client.name} 案例分析</DialogTitle>
              <DialogDescription>
                详细的实施过程与成果展示
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <div className="w-full h-80 bg-muted flex items-center justify-center">
                <BrainCircuit className="h-20 w-20 text-muted-foreground/40" />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CaseStudy;

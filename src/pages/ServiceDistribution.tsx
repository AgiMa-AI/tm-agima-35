import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Globe, Cpu, Wifi, Server, Building, ChevronRight, Network, 
  Smartphone, Factory, ShoppingBag, BrainCircuit, Activity, FileSearch, 
  Microscope, LandPlot, HeartPulse, GraduationCap, BarChart, 
  Shield, Truck, Zap
} from 'lucide-react';

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
}

const mockEnterpriseClients: EnterpriseClient[] = [
  {
    id: 'aitech-01',
    name: '智联科技',
    logo: '/logos/aitech.svg',
    industry: '金融科技',
    location: '上海',
    country: '中国',
    usageType: ['NLP', '风险分析', '客户服务'],
    deploymentType: 'hybrid',
    modelCount: 8,
    firstDeployed: '2024-09'
  },
  {
    id: 'quantum-02',
    name: '量子网络',
    logo: '/logos/quantum.svg',
    industry: '电信',
    location: '北京',
    country: '中国',
    usageType: ['网络优化', '预测维护'],
    deploymentType: 'cloud',
    modelCount: 5,
    firstDeployed: '2024-10'
  },
  {
    id: 'medai-03',
    name: '医智云',
    logo: '/logos/medai.svg',
    industry: '医疗健康',
    location: '广州',
    country: '中国',
    usageType: ['医学影像分析', '健康预测'],
    deploymentType: 'on-premise',
    modelCount: 3,
    firstDeployed: '2024-11'
  },
  {
    id: 'edutech-04',
    name: '教育智能',
    logo: '/logos/edutech.svg',
    industry: '教育科技',
    location: '深圳',
    country: '中国',
    usageType: ['个性化学习', '评估系统'],
    deploymentType: 'cloud',
    modelCount: 4,
    firstDeployed: '2024-08'
  },
  {
    id: 'retailai-05',
    name: '零售智能',
    logo: '/logos/retailai.svg',
    industry: '零售',
    location: '杭州',
    country: '中国',
    usageType: ['需求预测', '库存优化', '个性化推荐'],
    deploymentType: 'hybrid',
    modelCount: 7,
    firstDeployed: '2024-07'
  },
  {
    id: 'indai-06',
    name: '工业智脑',
    logo: '/logos/indai.svg',
    industry: '制造业',
    location: '苏州',
    country: '中国',
    usageType: ['预测性维护', '质量控制', '供应链优化'],
    deploymentType: 'edge',
    modelCount: 12,
    firstDeployed: '2024-06'
  },
  {
    id: 'agroai-07',
    name: '农智科技',
    logo: '/logos/agroai.svg',
    industry: '农业',
    location: '成都',
    country: '中国',
    usageType: ['作物监测', '收成预测'],
    deploymentType: 'hybrid',
    modelCount: 3,
    firstDeployed: '2024-10'
  },
  {
    id: 'secureai-08',
    name: '安全卫士',
    logo: '/logos/secureai.svg',
    industry: '网络安全',
    location: '武汉',
    country: '中国',
    usageType: ['威胁检测', '异常识别'],
    deploymentType: 'on-premise',
    modelCount: 6,
    firstDeployed: '2024-09'
  },
  {
    id: 'smartcity-09',
    name: '智慧城市',
    logo: '/logos/smartcity.svg',
    industry: '政府',
    location: '南京',
    country: '中国',
    usageType: ['交通管理', '能源优化', '安全监控'],
    deploymentType: 'hybrid',
    modelCount: 9,
    firstDeployed: '2024-05'
  },
  {
    id: 'transportai-10',
    name: '运智科技',
    logo: '/logos/transportai.svg',
    industry: '物流运输',
    location: '重庆',
    country: '中国',
    usageType: ['路线优化', '车队管理'],
    deploymentType: 'cloud',
    modelCount: 5,
    firstDeployed: '2024-08'
  },
  {
    id: 'researchai-11',
    name: '研智实验室',
    logo: '/logos/researchai.svg',
    industry: '科研',
    location: '西安',
    country: '中国',
    usageType: ['数据分析', '模型训练'],
    deploymentType: 'on-premise',
    modelCount: 14,
    firstDeployed: '2024-04'
  },
  {
    id: 'energyai-12',
    name: '能智科技',
    logo: '/logos/energyai.svg',
    industry: '能源',
    location: '天津',
    country: '中国',
    usageType: ['能源分配', '负载预测'],
    deploymentType: 'hybrid',
    modelCount: 6,
    firstDeployed: '2024-07'
  }
];

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case '金融科技':
      return <BarChart className="h-4 w-4" />;
    case '电信':
      return <Wifi className="h-4 w-4" />;
    case '医疗健康':
      return <HeartPulse className="h-4 w-4" />;
    case '教育科技':
      return <GraduationCap className="h-4 w-4" />;
    case '零售':
      return <ShoppingBag className="h-4 w-4" />;
    case '制造业':
      return <Factory className="h-4 w-4" />;
    case '农业':
      return <LandPlot className="h-4 w-4" />;
    case '网络安全':
      return <Shield className="h-4 w-4" />;
    case '政府':
      return <Building className="h-4 w-4" />;
    case '物流运输':
      return <Truck className="h-4 w-4" />;
    case '科研':
      return <Microscope className="h-4 w-4" />;
    case '能源':
      return <Zap className="h-4 w-4" />;
    default:
      return <BrainCircuit className="h-4 w-4" />;
  }
};

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

const ServiceDistribution = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  
  const industries = [...new Set(mockEnterpriseClients.map(client => client.industry))];
  
  const filteredClients = mockEnterpriseClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         client.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter ? client.industry === industryFilter : true;
    return matchesSearch && matchesIndustry;
  });

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">服务分布</h1>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>AGI模型服务企业分布</CardTitle>
              <CardDescription>
                查看我们的AGI模型在各行业下游企业的部署与应用情况
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Building className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">企业伙伴</h3>
                  <p className="text-sm text-center text-muted-foreground">支持各行业的数智化转型</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <BrainCircuit className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">模型定制</h3>
                  <p className="text-sm text-center text-muted-foreground">根据行业需求定制专属模型</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Network className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">全面覆盖</h3>
                  <p className="text-sm text-center text-muted-foreground">遍布全国的服务网络</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Activity className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">实时监控</h3>
                  <p className="text-sm text-center text-muted-foreground">对模型部署与运行进行实时监控</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <FileSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索企业或行业..."
              className="pl-9 pr-4 py-2 w-full border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={industryFilter === null ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setIndustryFilter(null)}
            >
              全部
            </Button>
            {industries.map(industry => (
              <Button 
                key={industry}
                variant={industryFilter === industry ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setIndustryFilter(industry)}
              >
                {industry}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3 rounded-md">
                      <AvatarImage src={client.logo} alt={client.name} />
                      <AvatarFallback className="bg-primary/10 text-primary rounded-md">
                        {client.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        {getIndustryIcon(client.industry)}
                        <span className="ml-1">{client.industry}</span>
                      </div>
                    </div>
                  </div>
                  {getDeploymentBadge(client.deploymentType)}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">地区</span>
                    <span>{client.location}，{client.country}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">部署模型</span>
                    <span>{client.modelCount}个</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">首次部署</span>
                    <span>{client.firstDeployed}</span>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm text-muted-foreground mb-2">应用场景</div>
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
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full flex items-center justify-center" asChild>
                  <Link to={`/case-studies/${client.id}`}>
                    查看详情
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2">寻找行业解决方案？</h3>
              <p className="text-muted-foreground mb-4">
                我们的AI赋能服务已覆盖多个行业，为企业提供定制化的智能解决方案。了解我们如何为您的行业带来创新与效率。
              </p>
              <Button>
                联系解决方案专家
              </Button>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <BrainCircuit className="h-32 w-32 text-indigo-500 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Factory className="h-12 w-12 text-indigo-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>成为我们的合作伙伴</CardTitle>
            <CardDescription>
              加入我们的企业合作网络，共同探索AI赋能的无限可能
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">模型定制</h3>
                <p className="text-sm text-muted-foreground">
                  根据您的业务需求，提供专属定制的AGI模型，满足特定场景的应用需求。
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">专属部署</h3>
                <p className="text-sm text-muted-foreground">
                  灵活的部署选项，包括云端、混合、本地和边缘部署，满足不同安全与性能需求。
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">持续优化</h3>
                <p className="text-sm text-muted-foreground">
                  基于业务反馈持续优化模型性能，定期更新迭代，确保模型始终保持高效能。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ServiceDistribution;

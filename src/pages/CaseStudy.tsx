
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Building, ChevronRight, FileText, Globe, Lightbulb,
  MessageSquare, Share2, Users, BrainCircuit, BarChart 
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
  description?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  testimonal?: {
    quote: string;
    author: string;
    position: string;
  };
}

// 简单的模拟数据，根据ID返回具体信息
const getCaseStudyById = (id: string): EnterpriseClient => {
  const defaultData: EnterpriseClient = {
    id: id,
    name: '智联科技',
    logo: '/logos/aitech.svg',
    industry: '金融科技',
    location: '上海',
    country: '中国',
    usageType: ['NLP', '风险分析', '客户服务'],
    deploymentType: 'hybrid',
    modelCount: 8,
    firstDeployed: '2024-09',
    description: '智联科技是中国领先的金融科技解决方案提供商，专注于为银行、保险和投资机构提供智能化服务平台。',
    challenge: '随着业务规模的扩大，智联科技面临着客户服务压力增大、风险评估需要更高精度以及数据处理量急剧增加的挑战。传统的人工处理模式已无法满足需求。',
    solution: '我们为智联科技部署了一套定制化的AGI解决方案，包含风险评估模型、自然语言处理服务和智能客服系统。采用混合部署方式，敏感数据在本地处理，通用服务则使用云端资源。',
    results: '部署后，智联科技的客户服务响应时间减少了65%，风险评估准确率提升了23%，数据处理效率提高了3倍。同时，运营成本降低了约30%。',
    testimonal: {
      quote: '引入这套AGI解决方案是我们数字化转型的关键一步。它不仅提升了我们的运营效率，还为客户带来了全新的体验。',
      author: '张明',
      position: '智联科技 CTO'
    }
  };

  // 在实际应用中，这里应该是根据ID从API获取数据
  return defaultData;
};

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = getCaseStudyById(id || '');

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

  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link to="/service-distribution">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回服务分布
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{caseStudy.name} 案例研究</h1>
          <p className="text-muted-foreground mt-1">
            查看我们AGI模型如何帮助{caseStudy.name}实现业务创新
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>企业简介</CardTitle>
                  {getDeploymentBadge(caseStudy.deploymentType)}
                </div>
                <CardDescription>企业背景与挑战</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-md">
                    <AvatarImage src={caseStudy.logo} alt={caseStudy.name} />
                    <AvatarFallback className="bg-primary/10 text-primary rounded-md">
                      {caseStudy.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-medium">{caseStudy.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{caseStudy.industry}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Globe className="h-4 w-4 mr-1" />
                        <span>{caseStudy.location}，{caseStudy.country}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2">企业描述</h4>
                  <p className="text-muted-foreground">{caseStudy.description}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">挑战</h4>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>解决方案</CardTitle>
                <CardDescription>我们为{caseStudy.name}提供的AGI解决方案</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>{caseStudy.solution}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
                      部署AGI模型数量
                    </h5>
                    <p className="text-2xl font-bold">{caseStudy.modelCount}个</p>
                    <p className="text-sm text-muted-foreground">首次部署时间：{caseStudy.firstDeployed}</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-primary" />
                      应用场景
                    </h5>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {caseStudy.usageType.map((usage, idx) => (
                        <Badge key={idx} variant="outline" className="bg-muted/50">
                          {usage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>成果与收益</CardTitle>
                <CardDescription>实施后取得的成效</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-lg">
                  <p>{caseStudy.results}</p>
                </div>
                
                {caseStudy.testimonal && (
                  <div className="border-l-4 border-primary pl-4 py-2">
                    <p className="italic mb-2">"{caseStudy.testimonal.quote}"</p>
                    <p className="font-medium">{caseStudy.testimonal.author}</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.testimonal.position}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">联系我们</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">想了解我们如何为您的企业提供类似的AGI模型解决方案？</p>
                <Button className="w-full mb-3">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  预约咨询
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  分享案例
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">相关资源</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link to="#">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      AGI在金融领域的应用白皮书
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link to="#">
                    <div className="flex items-center">
                      <BarChart className="mr-2 h-4 w-4" />
                      行业分析报告
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-between" asChild>
                  <Link to="#">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      客户成功案例
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudy;

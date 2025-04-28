import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, BarChart3, Cpu, CreditCard, DollarSign, Download, HelpCircle, Plus, Server, Settings, CheckCircle2, TrendingUp, Shield, Globe, Lock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import MetricCard from '@/components/ui/MetricCard';

const AGIHosting = () => {
  const {
    user
  } = useAuth();
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const earnings = {
    daily: 78.25,
    weekly: 547.80,
    monthly: 2350.45,
    pending: 125.60
  };
  const hardwareOptions = [{
    id: 'model-basic',
    name: 'AGI 基础模型',
    specs: '4GB 参数规模',
    price: 1200,
    earnings: '每月 ¥550-750'
  }, {
    id: 'model-pro',
    name: 'AGI 专业模型',
    specs: '16GB 参数规模',
    price: 2400,
    earnings: '每月 ¥1100-1500'
  }, {
    id: 'model-enterprise',
    name: 'AGI 企业模型',
    specs: '64GB 参数规模',
    price: 4800,
    earnings: '每月 ¥2200-3000'
  }];
  const hostingHistory = [{
    id: 1,
    hardware: 'AGI 专业模型',
    startDate: '2023-11-15',
    status: 'active',
    earnings: 1285.50
  }, {
    id: 2,
    hardware: 'AGI 基础模型',
    startDate: '2023-10-01',
    endDate: '2023-11-01',
    status: 'completed',
    earnings: 650.75
  }];

  const benefits = [{
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "最大化闲置算力价值",
    description: "通过我们的平台，您可以轻松将闲置的高性能GPU/CPU资源转化为稳定的被动收入来源。"
  }, {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "安全可靠的资源管理",
    description: "我们采用企业级安全措施和先进的隔离技术，确保您的硬件资源得到安全、高效的使用。"
  }, {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "加入全球AGI网络",
    description: "您的算力将支持全球研究者和开发者推动AI技术的发展，成为AGI技术进步的重要一环。"
  }, {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: "灵活的控制与透明度",
    description: "随时查看您的算力使用情况、收益数据和性能指标，完全掌控您的托管体验。"
  }];

  const pricingComparison = [{
    provider: "传统云服务",
    pricePerDay: "¥2400",
    utilization: "60%",
    monthlyRevenue: "不适用"
  }, {
    provider: "我们的平台",
    pricePerDay: "¥980",
    utilization: "95%",
    monthlyRevenue: "¥27,930"
  }];

  const switchToHardwareTab = () => {
    const hardwareTab = document.querySelector('button[value="hardware"]') as HTMLButtonElement;
    if (hardwareTab) {
      hardwareTab.click();
    }
  };

  return <Layout>
      <div className="space-y-6">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-4 sm:p-8 shadow-lg overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            </svg>
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight font-display mb-2 sm:mb-3">
              让闲置算力创造价值
            </h1>
            <p className="text-base sm:text-lg opacity-90 mb-4 sm:mb-6 max-w-2xl">
              托管您的高性能GPU和CPU资源，支持全球AGI模型运行，获取长期稳定的被动收入。
              我们的平台提供高达95%的资源利用率，为您带来最大化的收益。
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button size={isMobile ? "sm" : "lg"} className="bg-white text-blue-700 hover:bg-blue-50 touch-friendly press-effect">
                立即开始托管
              </Button>
              
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="font-bold text-xl sm:text-3xl">95%</div>
                <div className="text-xs sm:text-sm opacity-80">平均资源利用率</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="font-bold text-xl sm:text-3xl">¥28K+</div>
                <div className="text-xs sm:text-sm opacity-80">单GPU月均收益</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <div className="font-bold text-xl sm:text-3xl">5000+</div>
                <div className="text-xs sm:text-sm opacity-80">全球托管节点</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <MetricCard title="今日收益" value={`¥${earnings.daily.toFixed(2)}`} tooltip="过去24小时内的算力托管收益" />
          
          <MetricCard title="本周收益" value={`¥${earnings.weekly.toFixed(2)}`} tooltip="过去7天的算力托管累计收益" />
          
          <MetricCard title="本月收益" value={`¥${earnings.monthly.toFixed(2)}`} tooltip="当月累计算力托管收益" />
          
          <MetricCard title="待结算" value={`¥${earnings.pending.toFixed(2)}`} icon={<HelpCircle className="h-4 w-4" />} tooltip="已确认但尚未结算的收益，每月15日统一结算" />
        </div>
        
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/70 dark:to-slate-900 border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-2xl">为什么选择我们的算力托管平台？</CardTitle>
            <CardDescription className="text-center">最大化您的硬件投资回报，同时为AGI技术发展做出贡献</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => <div key={index} className="bg-background rounded-lg p-4 sm:p-6 border shadow-sm hover:shadow-md transition-shadow press-effect">
                  <div className="mb-3 sm:mb-4">{benefit.icon}</div>
                  <h3 className="text-base sm:text-lg font-medium mb-2">{benefit.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{benefit.description}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>收益比较</CardTitle>
            <CardDescription>与传统云服务提供商相比，我们的平台能为您提供更高的收益</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[600px] px-4 sm:px-0 sm:min-w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">平台</TableHead>
                      <TableHead>价格/天</TableHead>
                      <TableHead>平均利用率</TableHead>
                      <TableHead>月度收益（单GPU）</TableHead>
                      <TableHead>对比</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricingComparison.map((pricing, index) => <TableRow key={index}>
                        <TableCell className="font-medium">{pricing.provider}</TableCell>
                        <TableCell>{pricing.pricePerDay}</TableCell>
                        <TableCell>{pricing.utilization}</TableCell>
                        <TableCell>{pricing.monthlyRevenue}</TableCell>
                        <TableCell>
                          {index === 1 && <Badge className="bg-green-500">推荐</Badge>}
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-6 p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
              <div className="flex">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-green-800 dark:text-green-300">
                  通过我们的平台，同样的硬件资源可以获得<span className="font-bold">多达2倍</span>的收益，归功于我们优化的利用率和智能任务调度。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="overview" className="py-3">概览</TabsTrigger>
            <TabsTrigger value="hardware" className="py-3">选择模型</TabsTrigger>
            <TabsTrigger value="history" className="py-3">托管记录</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>算力托管概览</CardTitle>
                <CardDescription>您当前的算力托管状态和收益分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hostingHistory.some(h => h.status === 'active') ? <>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        当前活跃的托管
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hostingHistory.filter(h => h.status === 'active').map(hosting => <div key={hosting.id} className="bg-muted/50 p-4 rounded-lg">
                              <p className="font-medium">{hosting.hardware}</p>
                              <p className="text-sm text-muted-foreground">启动时间: {hosting.startDate}</p>
                              <p className="text-sm font-medium mt-2">已获收益: ¥{hosting.earnings.toFixed(2)}</p>
                              <div className="mt-3 flex justify-between">
                                <Badge>运行中</Badge>
                                <Button variant="outline" size="sm" className="touch-friendly">
                                  <Settings className="h-4 w-4 mr-1" />
                                  管理
                                </Button>
                              </div>
                            </div>)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">算力使用率</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[160px] sm:h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="h-5 w-5" />
                            <span>使用率图表将在这里显示</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">收益分析</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[160px] sm:h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="h-5 w-5" />
                            <span>收益分析图表将在这里显示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </> : <div className="text-center py-8 sm:py-12">
                    <Cpu className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg sm:text-xl font-medium mb-2">您还没有活跃的算力托管</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6 text-sm sm:text-base">
                      通过提供您的硬件资源来支持AGI模型运行，并获取稳定的被动收益
                    </p>
                    <Button onClick={switchToHardwareTab} className="touch-friendly press-effect">
                      <Plus className="h-4 w-4 mr-2" />
                      开始托管
                    </Button>
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hardware" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>选择托管模型</CardTitle>
                <CardDescription>选择您想要托管的AGI模型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hardwareOptions.map(option => <div key={option.id} className={`border rounded-lg p-4 cursor-pointer transition-all press-effect active:scale-[0.98] ${selectedHardware === option.id ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'}`} onClick={() => setSelectedHardware(option.id)}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{option.name}</h3>
                        {selectedHardware === option.id && <Badge className="bg-primary">已选择</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.specs}</p>
                      <Separator className="my-3" />
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold">¥{option.price}/月</p>
                        <p className="text-sm text-green-600">{option.earnings}</p>
                      </div>
                    </div>)}
                </div>
                
                {selectedHardware && <div className="mt-6 space-y-4 border-t pt-6">
                    <h3 className="font-medium">填写托管信息</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="host-name">托管名称</Label>
                        <Input id="host-name" placeholder="为您的托管取个名字" className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">托管时长</Label>
                        <select id="duration" className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          <option value="1">1个月</option>
                          <option value="3">3个月（享9.5折）</option>
                          <option value="6">6个月（享9折）</option>
                          <option value="12">12个月（享8.5折）</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payment-method">支付方式</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer press-effect hover:bg-muted/50">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">信用卡</p>
                            <p className="text-xs text-muted-foreground">Visa/Mastercard</p>
                          </div>
                        </div>
                        <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer press-effect hover:bg-muted/50">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">余额支付</p>
                            <p className="text-xs text-muted-foreground">账户余额: ¥348.75</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-yellow-800 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">请注意</p>
                          <p className="text-xs text-yellow-700 mt-1">
                            托管期间我们会对您的AGI模型进行远程管理，确保安全稳定运行。收益将根据实际使用率按日结算，每月15日发放上月收益。
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex flex-col sm:flex-row sm:justify-end gap-2">
                      <Button variant="outline" className="w-full sm:w-auto touch-friendly press-effect">取消</Button>
                      <Button className="w-full sm:w-auto touch-friendly press-effect">确认托管</Button>
                    </div>
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle>托管记录</CardTitle>
                    <CardDescription>您的历史托管记录与收益明细</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="touch-friendly self-start">
                    <Download className="h-4 w-4 mr-2" />
                    导出记录
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[600px] px-4 sm:px-0 sm:min-w-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>硬件套餐</TableHead>
                          <TableHead>开始日期</TableHead>
                          <TableHead>结束日期</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead className="text-right">总收益</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hostingHistory.map(hosting => <TableRow key={hosting.id}>
                            <TableCell>{hosting.hardware}</TableCell>
                            <TableCell>{hosting.startDate}</TableCell>
                            <TableCell>{hosting.endDate || '-'}</TableCell>
                            <TableCell>
                              <Badge className={hosting.status === 'active' ? 'bg-green-500' : 'bg-muted'}>
                                {hosting.status === 'active' ? '运行中' : '已完成'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">¥{hosting.earnings.toFixed(2)}</TableCell>
                          </TableRow>)}
                        {hostingHistory.length === 0 && <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                              暂无托管记录
                            </TableCell>
                          </TableRow>}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="sm:hidden mt-4 space-y-4">
                  {hostingHistory.map(hosting => <div key={hosting.id} className="border rounded-lg p-4 press-effect">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{hosting.hardware}</h3>
                        <Badge className={hosting.status === 'active' ? 'bg-green-500' : 'bg-muted'}>
                          {hosting.status === 'active' ? '运行中' : '已完成'}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">开始日期:</span>
                          <span>{hosting.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">结束日期:</span>
                          <span>{hosting.endDate || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">总收益:</span>
                          <span className="font-medium">¥{hosting.earnings.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>)}
                  {hostingHistory.length === 0 && <div className="text-center py-10 text-muted-foreground">
                      暂无托管记录
                    </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>;
};

export default AGIHosting;

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
import { 
  AlertCircle, 
  BarChart3, 
  Cpu, 
  CreditCard, 
  DollarSign, 
  Download, 
  HelpCircle, 
  Plus, 
  Server, 
  Settings
} from 'lucide-react';

const AGIHosting = () => {
  const { user } = useAuth();
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null);
  
  // 模拟的赚取收益数据
  const earnings = {
    daily: 78.25,
    weekly: 547.80,
    monthly: 2350.45,
    pending: 125.60
  };
  
  // 模拟的硬件选项
  const hardwareOptions = [
    { id: 'gpu-basic', name: 'GPU 基础套餐', specs: '4x NVIDIA RTX 4080', price: 1200, earnings: '每月 ¥550-750' },
    { id: 'gpu-pro', name: 'GPU 专业套餐', specs: '2x NVIDIA RTX 4090', price: 2400, earnings: '每月 ¥1100-1500' },
    { id: 'gpu-enterprise', name: 'GPU 企业套餐', specs: '4x NVIDIA RTX 4090', price: 4800, earnings: '每月 ¥2200-3000' }
  ];
  
  // 模拟的托管记录
  const hostingHistory = [
    { id: 1, hardware: 'GPU 专业套餐', startDate: '2023-11-15', status: 'active', earnings: 1285.50 },
    { id: 2, hardware: 'GPU 基础套餐', startDate: '2023-10-01', endDate: '2023-11-01', status: 'completed', earnings: 650.75 }
  ];
  
  // Fix the type error by using a different approach to handle tab switching
  const switchToHardwareTab = () => {
    const hardwareTab = document.querySelector('button[value="hardware"]') as HTMLButtonElement;
    if (hardwareTab) {
      hardwareTab.click();
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">AGI 算力托管</h1>
          <p className="text-muted-foreground mt-1">
            提供您的算力资源，支持AGI模型运行，获取稳定收益
          </p>
        </div>
        
        {/* 收益概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">今日收益</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">¥{earnings.daily.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">本周收益</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">¥{earnings.weekly.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">本月收益</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">¥{earnings.monthly.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">待结算</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">¥{earnings.pending.toFixed(2)}</p>
                <Button variant="ghost" size="sm" className="ml-2">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="hardware">选择硬件</TabsTrigger>
            <TabsTrigger value="history">托管记录</TabsTrigger>
          </TabsList>
          
          {/* 概览标签页 */}
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>算力托管概览</CardTitle>
                <CardDescription>您当前的算力托管状态和收益分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {hostingHistory.some(h => h.status === 'active') ? (
                  <>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Server className="h-5 w-5 mr-2 text-primary" />
                        当前活跃的托管
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hostingHistory
                          .filter(h => h.status === 'active')
                          .map(hosting => (
                            <div key={hosting.id} className="bg-muted/50 p-4 rounded-lg">
                              <p className="font-medium">{hosting.hardware}</p>
                              <p className="text-sm text-muted-foreground">启动时间: {hosting.startDate}</p>
                              <p className="text-sm font-medium mt-2">已获收益: ¥{hosting.earnings.toFixed(2)}</p>
                              <div className="mt-3 flex justify-between">
                                <Badge>运行中</Badge>
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-1" />
                                  管理
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">算力使用率</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
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
                        <CardContent className="h-[200px] flex items-center justify-center bg-muted/50 rounded-md">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <BarChart3 className="h-5 w-5" />
                            <span>收益分析图表将在这里显示</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Cpu className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-xl font-medium mb-2">您还没有活跃的算力托管</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      通过提供您的硬件资源来支持AGI模型运行，并获取稳定的被动收益
                    </p>
                    <Button onClick={switchToHardwareTab}>
                      <Plus className="h-4 w-4 mr-2" />
                      开始托管
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 选择硬件标签页 */}
          <TabsContent value="hardware" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>选择托管硬件</CardTitle>
                <CardDescription>选择您想要托管的算力硬件套餐</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hardwareOptions.map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedHardware === option.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-muted-foreground/50'
                      }`}
                      onClick={() => setSelectedHardware(option.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{option.name}</h3>
                        {selectedHardware === option.id && (
                          <Badge className="bg-primary">已选择</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.specs}</p>
                      <Separator className="my-3" />
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold">¥{option.price}/月</p>
                        <p className="text-sm text-green-600">{option.earnings}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedHardware && (
                  <div className="mt-6 space-y-4 border-t pt-6">
                    <h3 className="font-medium">填写托管信息</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="host-name">托管名称</Label>
                        <Input id="host-name" placeholder="为您的托管取个名字" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">托管时长</Label>
                        <select 
                          id="duration"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
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
                        <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted/50">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">信用卡</p>
                            <p className="text-xs text-muted-foreground">Visa/Mastercard</p>
                          </div>
                        </div>
                        <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer hover:bg-muted/50">
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
                            托管期间我们会对您的硬件进行远程管理，确保安全稳定运行。收益将根据实际使用率按日结算，每月15日发放上月收益。
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button variant="outline" className="mr-2">取消</Button>
                      <Button>确认托管</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 托管记录标签页 */}
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>托管记录</CardTitle>
                    <CardDescription>您的历史托管记录与收益明细</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    导出记录
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
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
                    {hostingHistory.map(hosting => (
                      <TableRow key={hosting.id}>
                        <TableCell>{hosting.hardware}</TableCell>
                        <TableCell>{hosting.startDate}</TableCell>
                        <TableCell>{hosting.endDate || '-'}</TableCell>
                        <TableCell>
                          <Badge className={hosting.status === 'active' ? 'bg-green-500' : 'bg-muted'}>
                            {hosting.status === 'active' ? '运行中' : '已完成'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">¥{hosting.earnings.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    {hostingHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          暂无托管记录
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AGIHosting;

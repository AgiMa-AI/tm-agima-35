
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Server, Clock, CreditCard, Calendar, Cpu, LineChart, Shield, Key, Gpu } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const AGILeasing = () => {
  const [selectedResourceType, setSelectedResourceType] = useState<string>('gpu');
  const [selectedPlan, setSelectedPlan] = useState<string>('daily');
  const [selectedGpuCount, setSelectedGpuCount] = useState<string>('1');
  const [selectedCpuCount, setSelectedCpuCount] = useState<string>('32');
  const [selectedTask, setSelectedTask] = useState<string>('training');
  const [leaseDays, setLeaseDays] = useState<string>('1');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wechat');
  
  const handleLease = () => {
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    setIsPaymentDialogOpen(false);
    toast({
      title: "租赁申请已提交",
      description: "我们将很快联系您提供SSH密钥和使用指南"
    });
  };
  
  const calculateGpuCost = () => {
    const baseDailyPrice = 980;
    const days = parseInt(leaseDays) || 1;
    const gpuCount = parseInt(selectedGpuCount) || 1;
    
    let discount = 1.0;
    if (days >= 7) {
      discount = 0.85;
    } else if (days >= 3) {
      discount = 0.95;
    }
    
    return (baseDailyPrice * days * gpuCount * discount).toFixed(0);
  };

  const calculateCpuCost = () => {
    const baseDailyPrice = 120;
    const days = parseInt(leaseDays) || 1;
    const cpuCount = parseInt(selectedCpuCount) || 32;
    const cpuMultiplier = cpuCount / 32; // Base is 32 cores
    
    let discount = 1.0;
    if (days >= 7) {
      discount = 0.85;
    } else if (days >= 3) {
      discount = 0.95;
    }
    
    return (baseDailyPrice * days * cpuMultiplier * discount).toFixed(0);
  };

  const calculateCost = () => {
    return selectedResourceType === 'gpu' ? calculateGpuCost() : calculateCpuCost();
  };

  const paymentMethods = [
    {
      id: 'wechat',
      name: '微信支付',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" /><path d="M17 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" /><path d="M15 8c2.7 0 5.5 2.5 2.5 5.5a4 4 0 0 1-2.15 1.61A3 3 0 0 1 12 17.98V21" /><path d="M8 11c-2.5 0-5-3-3-6.5a4 4 0 0 1 1.9-1.64A3 3 0 0 1 10 1" /></svg>,
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 9.5C22 5.36 18.64 2 14.5 2h-5C5.36 2 2 5.36 2 9.5v5c0 4.14 3.36 7.5 7.5 7.5h5c4.14 0 7.5-3.36 7.5-7.5v-5Z"/><path d="M18.5 4.5c-1 0-1.5.5-1.5 1.5v4.53L9.5 9M16.53 12h-4.17c-2.95 4.61-4.87 5.5-4.87 5.5h7.04c4 0 5.47-.54 5.47-2.5 0-1.96-1.97-3-3.47-3Z"/></svg>,
    },
    {
      id: 'bank',
      name: '公户转账',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 9h12M6 13h2M6 17h6"/></svg>,
    },
    {
      id: 'unionpay',
      name: '云闪付',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    },
    {
      id: 'quickpay',
      name: '银联快捷',
      icon: <CreditCard className="h-4 w-4" />,
    },
  ];
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-background p-4 rounded-md shadow-sm">
          <h1 className="text-2xl font-medium">算力资源租赁</h1>
          <p className="text-muted-foreground mt-1">
            为您的AI项目租赁高性能GPU或CPU计算资源
          </p>
        </div>

        {/* Resource Type Selection */}
        <Tabs 
          defaultValue="gpu" 
          value={selectedResourceType}
          onValueChange={setSelectedResourceType}
          className="mb-4"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gpu" className="flex items-center gap-2">
              <Gpu className="h-4 w-4" /> GPU 租赁
            </TabsTrigger>
            <TabsTrigger value="cpu" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" /> CPU 租赁
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  租赁选项
                </CardTitle>
                <CardDescription>
                  根据您的需求选择合适的租赁方案
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Tabs defaultValue="daily" onValueChange={setSelectedPlan}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="daily">按天租赁</TabsTrigger>
                    <TabsTrigger value="weekly">按周租赁</TabsTrigger>
                    <TabsTrigger value="task">按任务租赁</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily">
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedResourceType === 'gpu' ? (
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">GPU 数量</label>
                              <Select defaultValue="1" value={selectedGpuCount} onValueChange={setSelectedGpuCount}>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择GPU数量" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 GPU</SelectItem>
                                  <SelectItem value="2">2 GPU</SelectItem>
                                  <SelectItem value="4">4 GPU</SelectItem>
                                  <SelectItem value="8">8 GPU</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">CPU 核心数</label>
                              <Select defaultValue="32" value={selectedCpuCount} onValueChange={setSelectedCpuCount}>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择CPU核心数" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16">16 核心</SelectItem>
                                  <SelectItem value="32">32 核心</SelectItem>
                                  <SelectItem value="64">64 核心</SelectItem>
                                  <SelectItem value="128">128 核心</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">租赁天数</label>
                            <Input 
                              type="number" 
                              min="1" 
                              max="30" 
                              defaultValue="1"
                              value={leaseDays}
                              onChange={(e) => setLeaseDays(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">任务类型</label>
                          <Select defaultValue="training" value={selectedTask} onValueChange={setSelectedTask}>
                            <SelectTrigger>
                              <SelectValue placeholder="选择任务类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="training">模型训练</SelectItem>
                              <SelectItem value="inference">模型推理</SelectItem>
                              <SelectItem value="dataprocessing">数据处理</SelectItem>
                              <SelectItem value="custom">自定义任务</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                        <h3 className="font-medium">计算资源配置</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedResourceType === 'gpu' ? (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">GPU 型号</span>
                                <span className="font-medium">NVIDIA A100</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">单GPU内存</span>
                                <span className="font-medium">80GB HBM2e</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">CPU 配置</span>
                                <span className="font-medium">64核 AMD EPYC</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">系统内存</span>
                                <span className="font-medium">512GB DDR4</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">CPU 型号</span>
                                <span className="font-medium">AMD EPYC 7763</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">单核频率</span>
                                <span className="font-medium">2.45 GHz (3.5 GHz加速)</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">系统内存</span>
                                <span className="font-medium">256GB DDR4</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">存储配置</span>
                                <span className="font-medium">2TB NVMe SSD</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-sm text-primary font-medium">按天租赁，超过3天享受优惠折扣</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="weekly">
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedResourceType === 'gpu' ? (
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">GPU 数量</label>
                              <Select defaultValue="1">
                                <SelectTrigger>
                                  <SelectValue placeholder="选择GPU数量" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 GPU</SelectItem>
                                  <SelectItem value="2">2 GPU</SelectItem>
                                  <SelectItem value="4">4 GPU</SelectItem>
                                  <SelectItem value="8">8 GPU</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">CPU 核心数</label>
                              <Select defaultValue="32">
                                <SelectTrigger>
                                  <SelectValue placeholder="选择CPU核心数" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16">16 核心</SelectItem>
                                  <SelectItem value="32">32 核心</SelectItem>
                                  <SelectItem value="64">64 核心</SelectItem>
                                  <SelectItem value="128">128 核心</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">租赁周数</label>
                            <Input type="number" min="1" max="4" defaultValue="1" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">任务类型</label>
                          <Select defaultValue="training">
                            <SelectTrigger>
                              <SelectValue placeholder="选择任务类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="training">模型训练</SelectItem>
                              <SelectItem value="inference">模型推理</SelectItem>
                              <SelectItem value="dataprocessing">数据处理</SelectItem>
                              <SelectItem value="custom">自定义任务</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                        <h3 className="font-medium">计算资源配置</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedResourceType === 'gpu' ? (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">GPU 型号</span>
                                <span className="font-medium">NVIDIA A100</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">单GPU内存</span>
                                <span className="font-medium">80GB HBM2e</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">CPU 配置</span>
                                <span className="font-medium">64核 AMD EPYC</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">系统内存</span>
                                <span className="font-medium">512GB DDR4</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">CPU 型号</span>
                                <span className="font-medium">AMD EPYC 7763</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">单核频率</span>
                                <span className="font-medium">2.45 GHz (3.5 GHz加速)</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">系统内存</span>
                                <span className="font-medium">256GB DDR4</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">存储配置</span>
                                <span className="font-medium">2TB NVMe SSD</span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-sm text-primary font-medium">周付方案享受85折优惠</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="task">
                    <div className="grid gap-6">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">任务类型</label>
                          <Select defaultValue="finetuning">
                            <SelectTrigger>
                              <SelectValue placeholder="选择任务类型" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="finetuning">大模型微调</SelectItem>
                              <SelectItem value="training">从头训练</SelectItem>
                              <SelectItem value="rendering">3D渲染</SelectItem>
                              <SelectItem value="dataprocessing">大规模数据处理</SelectItem>
                              <SelectItem value="custom">自定义任务</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">估计运行时间</label>
                          <div className="grid grid-cols-2 gap-4">
                            <Select defaultValue="24">
                              <SelectTrigger>
                                <SelectValue placeholder="估计小时" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12">12小时</SelectItem>
                                <SelectItem value="24">24小时</SelectItem>
                                <SelectItem value="36">36小时</SelectItem>
                                <SelectItem value="48">48小时</SelectItem>
                                <SelectItem value="72">72小时</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Select defaultValue="high">
                              <SelectTrigger>
                                <SelectValue placeholder="优先级" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">低优先级</SelectItem>
                                <SelectItem value="medium">中优先级</SelectItem>
                                <SelectItem value="high">高优先级</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg space-y-3">
                        <h3 className="font-medium">任务资源配置</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedResourceType === 'gpu' ? (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">自动分配GPU</span>
                                <span className="font-medium">最高8个 A100/H100</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">存储空间</span>
                                <span className="font-medium">2TB NVMe SSD</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">自动分配CPU</span>
                                <span className="font-medium">最高128核 EPYC</span>
                              </div>
                              <div className="bg-background rounded p-3 flex flex-col">
                                <span className="text-xs text-muted-foreground">存储空间</span>
                                <span className="font-medium">2TB NVMe SSD</span>
                              </div>
                            </>
                          )}
                          <div className="bg-background rounded p-3 flex flex-col">
                            <span className="text-xs text-muted-foreground">网络带宽</span>
                            <span className="font-medium">10Gbps专线</span>
                          </div>
                          <div className="bg-background rounded p-3 flex flex-col">
                            <span className="text-xs text-muted-foreground">任务优先级</span>
                            <span className="font-medium">高优先级</span>
                          </div>
                        </div>
                        <div className="mt-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-sm text-primary font-medium">任务完成时间根据系统负载可能有所浮动</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  任务管理
                </CardTitle>
                <CardDescription>
                  查看和管理您的计算任务状态
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-primary" /> 
                        <span className="font-medium">BERT 模型微调</span>
                      </div>
                      <Badge className="bg-amber-500">进行中</Badge>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">开始时间</p>
                          <p>2023-05-10 10:30</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">预计完成</p>
                          <p>2023-05-12 10:30</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">已用算力</p>
                          <p>24.5 小时</p>
                        </div>
                      </div>
                      
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span>进度: 45%</span>
                        <span>预计剩余: 32 小时</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border overflow-hidden">
                    <div className="bg-muted/30 p-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-primary" /> 
                        <span className="font-medium">LLaMa 模型推理</span>
                      </div>
                      <Badge className="bg-green-500">已完成</Badge>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">开始时间</p>
                          <p>2023-05-07 14:15</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">完成时间</p>
                          <p>2023-05-09 06:22</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">总算力</p>
                          <p>40.1 小时</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          查看报告
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  费用预估
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">租赁方案</span>
                      <span className="font-medium">按天租赁</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      {selectedResourceType === 'gpu' ? (
                        <>
                          <span className="text-sm font-medium">GPU 数量</span>
                          <span className="font-medium">{selectedGpuCount} × A100 80GB</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium">CPU 核心数</span>
                          <span className="font-medium">{selectedCpuCount} 核心</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">租赁时长</span>
                      <span className="font-medium">{leaseDays} 天</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">单价</span>
                      {selectedResourceType === 'gpu' ? (
                        <span className="font-medium">¥980 / 天</span>
                      ) : (
                        <span className="font-medium">¥120 / 天</span>
                      )}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium">总计费用</span>
                      <span className="text-xl font-bold text-primary">¥{calculateCost()}</span>
                    </div>
                  </div>
                  
                  <Button onClick={handleLease} className="w-full">
                    确认租赁
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">点击确认后将引导您完成支付流程。支付完成后，我们会通过您的注册邮箱发送SSH密钥和使用说明。</p>
                    <p>如有任何问题，请联系我们的客服团队获取支持。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  租赁保障
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">1</span>
                    </div>
                    <p className="text-sm">实时监控，确保算力稳定可靠</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">2</span>
                    </div>
                    <p className="text-sm">任务异常自动恢复，无需人工干预</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">3</span>
                    </div>
                    <p className="text-sm">算力未正常提供时自动延长等效时间</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">4</span>
                    </div>
                    <p className="text-sm">24/7 专业技术支持</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>请选择支付方式</DialogTitle>
              <DialogDescription>
                选择您偏好的支付方式完成订单
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="rounded-md border p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">
                      {selectedResourceType === 'gpu' ? 'GPU租赁订单' : 'CPU租赁订单'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedResourceType === 'gpu' 
                        ? `${selectedGpuCount} × A100 80GB - ${leaseDays}天` 
                        : `${selectedCpuCount}核心 - ${leaseDays}天`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">¥{calculateCost()}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <RadioGroup 
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={method.id} id={`list-${method.id}`} />
                      <Label htmlFor={`list-${method.id}`} className="flex items-center cursor-pointer">
                        <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted mr-2">
                          {method.icon}
                        </span>
                        {method.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                variant="outline" 
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                返回
              </Button>
              <Button onClick={handlePayment}>
                确认支付
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AGILeasing;

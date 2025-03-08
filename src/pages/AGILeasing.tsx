import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Server, Clock, CreditCard, Calendar, Cpu, LineChart, Shield, Key, HardDrive } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import LeaseOptions from '@/components/leasing/LeaseOptions';
import TaskManagement from '@/components/leasing/TaskManagement';
import CostEstimate from '@/components/leasing/CostEstimate';
import LeaseGuarantee from '@/components/leasing/LeaseGuarantee';
import PaymentDialog from '@/components/leasing/PaymentDialog';
import ResourceConfiguration from '@/components/leasing/ResourceConfiguration';

const AGILeasing = () => {
  const [selectedResourceType, setSelectedResourceType] = useState<string>('gpu');
  const [selectedPlan, setSelectedPlan] = useState<string>('daily');
  const [selectedGpuCount, setSelectedGpuCount] = useState<string>('1');
  const [selectedCpuCount, setSelectedCpuCount] = useState<string>('32');
  const [selectedTask, setSelectedTask] = useState<string>('training');
  const [leaseDays, setLeaseDays] = useState<string>('1');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-primary/80 to-primary rounded-xl shadow-md p-6 text-white">
          <h1 className="text-2xl font-medium mb-2">算力资源租赁</h1>
          <p className="text-white/90 text-sm">
            为您的AI项目租赁高性能GPU或CPU计算资源
          </p>
        </div>

        <div className="bg-background rounded-xl shadow-sm p-4 overflow-hidden">
          <Tabs 
            defaultValue="gpu" 
            value={selectedResourceType}
            onValueChange={setSelectedResourceType}
            className="mb-4"
          >
            <TabsList className={`grid w-full grid-cols-2 mb-6 rounded-full bg-muted/50 p-1 ${isMobile ? 'text-sm' : ''}`}>
              <TabsTrigger value="gpu" className="flex items-center gap-2 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <HardDrive className="h-4 w-4" /> GPU 租赁 
              </TabsTrigger>
              <TabsTrigger value="cpu" className="flex items-center gap-2 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Cpu className="h-4 w-4" /> CPU 租赁 
              </TabsTrigger>
            </TabsList>
          </Tabs>
        
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-3 gap-6'}`}>
            <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-4`}>
              <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-background pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <LineChart className="h-5 w-5 mr-2 text-primary" />
                    租赁选项
                  </CardTitle>
                  <CardDescription>
                    根据您的需求选择合适的租赁方案
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <Tabs defaultValue="daily" onValueChange={setSelectedPlan} className="w-full">
                    <TabsList className={`grid grid-cols-3 mb-6 ${isMobile ? 'text-xs' : ''} rounded-full bg-muted/50 p-1`}>
                      <TabsTrigger value="daily" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">按天租赁</TabsTrigger>
                      <TabsTrigger value="weekly" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">按周租赁</TabsTrigger>
                      <TabsTrigger value="task" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">按任务租赁</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="daily">
                      <LeaseOptions 
                        resourceType={selectedResourceType}
                        gpuCount={selectedGpuCount}
                        setGpuCount={setSelectedGpuCount}
                        cpuCount={selectedCpuCount}
                        setCpuCount={setSelectedCpuCount}
                        leaseDays={leaseDays}
                        setLeaseDays={setLeaseDays}
                        taskType={selectedTask}
                        setTaskType={setSelectedTask}
                      />
                      <ResourceConfiguration resourceType={selectedResourceType} />
                    </TabsContent>
                    
                    <TabsContent value="weekly">
                      <LeaseOptions 
                        resourceType={selectedResourceType}
                        gpuCount={selectedGpuCount}
                        setGpuCount={setSelectedGpuCount}
                        cpuCount={selectedCpuCount}
                        setCpuCount={setSelectedCpuCount}
                        leaseDays={leaseDays}
                        setLeaseDays={setLeaseDays}
                        taskType={selectedTask}
                        setTaskType={setSelectedTask}
                      />
                      <ResourceConfiguration resourceType={selectedResourceType} />
                    </TabsContent>
                    
                    <TabsContent value="task">
                      <div className="grid gap-6">
                        <div className="grid gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">任务类型</label>
                            <Tabs defaultValue="finetuning">
                              <TabsList className="w-full">
                                <TabsTrigger value="finetuning">大模型微调</TabsTrigger>
                                <TabsTrigger value="training">从头训练</TabsTrigger>
                                <TabsTrigger value="rendering">3D渲染</TabsTrigger>
                              </TabsList>
                            </Tabs>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <div className={`${isMobile ? 'mt-4' : ''}`}>
                <TaskManagement />
              </div>
            </div>
            
            <div className="space-y-4">
              <CostEstimate 
                resourceType={selectedResourceType}
                resourceCount={selectedResourceType === 'gpu' ? selectedGpuCount : selectedCpuCount}
                leaseDays={leaseDays}
                totalCost={calculateCost()}
                onLease={handleLease}
              />
              
              <LeaseGuarantee />
            </div>
          </div>
        </div>

        {isMobile && (
          <Card className="border-0 shadow-md rounded-xl overflow-hidden mt-6">
            <CardHeader className="bg-background pb-3">
              <CardTitle className="flex items-center text-lg">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                常见问题
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">如何获取SSH密钥?</h3>
                <p className="text-sm text-muted-foreground">租赁成功后，系统将自动生成SSH密钥并发送到您的邮箱，通常在10分钟内到达。</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium text-sm">如何选择合适的配置?</h3>
                <p className="text-sm text-muted-foreground">对于大模型训练，建议选择多张GPU；对于推理任务，单GPU通常足够；数据处理任务则可考虑CPU资源。</p>
              </div>
            </CardContent>
          </Card>
        )}

        <PaymentDialog 
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          onPayment={handlePayment}
          selectedResourceType={selectedResourceType}
          totalCost={calculateCost()}
          resourceCount={selectedResourceType === 'gpu' ? selectedGpuCount : selectedCpuCount}
          leaseDays={leaseDays}
        />
      </div>
    </Layout>
  );
};

export default AGILeasing;

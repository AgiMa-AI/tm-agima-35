
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
              <HardDrive className="h-4 w-4" /> GPU 租赁 
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
            
            <TaskManagement />
          </div>
          
          <div className="space-y-6">
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

        {/* Payment Dialog */}
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

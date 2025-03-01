
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // Fixed import casing
import { Button } from '@/components/ui/button';
import { GPUInstance } from '@/data/instances';
import { Server, Clock, Database, CreditCard, Download, BarChart, Shield, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstanceDetailsProps {
  instance: GPUInstance;
}

const InstanceDetails = ({ instance }: InstanceDetailsProps) => {
  const [rentalPeriod, setRentalPeriod] = useState(1);
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  
  // Define badge styles based on availability
  const availabilityBadge = {
    available: <Badge className="bg-green-500 hover:bg-green-600">可用</Badge>,
    rented: <Badge className="bg-yellow-500 hover:bg-yellow-600">使用中</Badge>,
    offline: <Badge className="bg-red-500 hover:bg-red-600">离线</Badge>,
  };
  
  const handleRentNow = () => {
    // Here we would handle the rental process
    setIsRentDialogOpen(false);
    // In a real app, you would call an API to initiate the rental
    console.log(`租用实例 ${instance.id}，时长 ${rentalPeriod} 小时，价格 ¥${(instance.price * rentalPeriod).toFixed(2)}`);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between flex-col sm:flex-row gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold">{instance.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    {availabilityBadge[instance.availability]}
                    <span className="text-muted-foreground">{instance.location}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">¥{instance.price}</p>
                    <p className="text-sm text-muted-foreground">每小时</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">概览</TabsTrigger>
                  <TabsTrigger value="specifications">规格</TabsTrigger>
                  <TabsTrigger value="performance">性能</TabsTrigger>
                  <TabsTrigger value="usage">使用方法</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">GPU</p>
                          <p className="text-muted-foreground">{instance.gpuModel} - {instance.gpuMemory} GB 显存</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">内存 & 存储</p>
                          <p className="text-muted-foreground">
                            {instance.ramSize} GB 内存, {instance.storageSize} GB SSD
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">CPU</p>
                          <p className="text-muted-foreground">{instance.cpuCores} 核心</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        性能得分
                      </p>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full"
                          style={{ width: `${instance.performance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">0</span>
                        <span className="text-xs font-medium">{instance.performance}/100</span>
                      </div>
                      
                      <p className="text-sm mt-6 mb-2">
                        这款 {instance.gpuModel} 实例适用于:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>机器学习 & AI 训练</li>
                        <li>高性能计算</li>
                        <li>数据处理 & 分析</li>
                        <li>渲染 & 科学可视化</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="specifications" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">详细规格</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(instance.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b">
                            <span className="text-muted-foreground">{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">配置</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">实例类型</span>
                          <span className="font-medium">GPU 优化型</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">操作系统</span>
                          <span className="font-medium">{instance.specs.OS || 'Ubuntu 20.04'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">网络</span>
                          <span className="font-medium">{instance.specs.Bandwidth || '10 Gbps'}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">功率消耗</span>
                          <span className="font-medium">{instance.specs['Power Usage'] || 'N/A'} W</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">性能指标</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">GPU 性能</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span>CUDA 速度</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>张量运算</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 5, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>内存带宽</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 10, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">系统性能</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <span>CPU 速度</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 15, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>磁盘 I/O</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 8, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span>网络</span>
                              <div className="w-32 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${Math.min(instance.performance - 3, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">基准测试结果</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">TensorFlow</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 1.2)} FPS
                            </p>
                            <p className="text-xs text-muted-foreground">ResNet-50</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">PyTorch</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 1.1)} FPS
                            </p>
                            <p className="text-xs text-muted-foreground">BERT-Large</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-sm font-semibold">CUDA</p>
                            <p className="text-2xl font-bold mt-1">
                              {Math.floor(instance.performance * 0.8)} TFLOPS
                            </p>
                            <p className="text-xs text-muted-foreground">FP16 性能</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">快速开始指南</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium shrink-0">1</div>
                          <div>
                            <p className="font-medium">租用实例</p>
                            <p className="text-sm text-muted-foreground">完成租用流程并等待实例启动</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium shrink-0">2</div>
                          <div>
                            <p className="font-medium">连接到实例</p>
                            <p className="text-sm text-muted-foreground">使用SSH或Web终端连接到您的实例</p>
                            <div className="mt-2 p-2 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                              ssh root@{instance.id}.vastai.com
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium shrink-0">3</div>
                          <div>
                            <p className="font-medium">安装您的环境</p>
                            <p className="text-sm text-muted-foreground">安装所需的深度学习框架和依赖</p>
                            <div className="mt-2 p-2 bg-muted rounded-md font-mono text-xs overflow-x-auto">
                              conda create -n myenv python=3.9<br />
                              conda activate myenv<br />
                              pip install tensorflow torch
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-sm font-medium shrink-0">4</div>
                          <div>
                            <p className="font-medium">开始使用</p>
                            <p className="text-sm text-muted-foreground">上传数据并开始您的工作</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">常用命令</h3>
                      <div className="space-y-3">
                        <Card>
                          <CardHeader className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <Terminal className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">检查GPU状态</p>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2 px-4 bg-muted">
                            <pre className="font-mono text-xs">nvidia-smi</pre>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">下载数据</p>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2 px-4 bg-muted">
                            <pre className="font-mono text-xs">wget https://example.com/dataset.zip</pre>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <BarChart className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">运行基准测试</p>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2 px-4 bg-muted">
                            <pre className="font-mono text-xs">python -c "import torch; print(torch.cuda.get_device_name(0))"</pre>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-medium">安全关闭</p>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2 px-4 bg-muted">
                            <pre className="font-mono text-xs">sudo shutdown -h now</pre>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>租用选项</CardTitle>
              <CardDescription>配置并租用这个实例</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {instance.availability === 'available' ? (
                <>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">价格</p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-primary">¥{instance.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">每小时</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      预估月费: ¥{(instance.price * 24 * 30).toFixed(2)}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">可用性</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>可立即部署</span>
                    </div>
                  </div>
                  
                  <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">立即租用</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>租用 {instance.name}</DialogTitle>
                        <DialogDescription>
                          配置您的租用时长和付款方式。
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rental-period">租用时长（小时）</Label>
                          <Input
                            id="rental-period"
                            type="number"
                            min="1"
                            value={rentalPeriod}
                            onChange={(e) => setRentalPeriod(parseInt(e.target.value))}
                          />
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm font-medium">费用摘要</p>
                          <div className="flex justify-between mt-2">
                            <span className="text-muted-foreground">
                              {rentalPeriod} {rentalPeriod === 1 ? '小时' : '小时'} @ ¥{instance.price}/小时
                            </span>
                            <span className="font-medium">
                              ¥{(instance.price * rentalPeriod).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRentDialogOpen(false)}>
                          取消
                        </Button>
                        <Button onClick={handleRentNow}>
                          确认租用
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 font-medium">
                      {instance.availability === 'rented' 
                        ? '此实例当前正在使用中。' 
                        : '此实例当前处于离线状态。'}
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      {instance.availability === 'rented'
                        ? '您可以设置提醒，在可用时获得通知。'
                        : '它可能正在维护或暂时不可用。'}
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    {instance.availability === 'rented' ? '可用时通知我' : '查看类似实例'}
                  </Button>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">需要帮助？</p>
                <p className="text-sm text-muted-foreground">
                  我们的支持团队全天候为您提供有关此实例的任何问题的帮助。
                </p>
                <Button variant="link" className="h-auto p-0">联系支持</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstanceDetails;

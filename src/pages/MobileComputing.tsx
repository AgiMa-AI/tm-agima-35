
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/components/ui/use-toast';
import { Smartphone, ChevronRight, Clock, CreditCard, TrendingUp, Award, Battery, Cpu, Wifi } from 'lucide-react';
import { useAGIModels } from '@/hooks/useAGIModels';

// Interface for mobile device
interface MobileDevice {
  id: string;
  name: string;
  model: string;
  cpuCores: number;
  gpu: string;
  ram: string;
  status: 'connected' | 'disconnected';
  batteryLevel: number;
  earningsToday: number;
  earningsTotal: number;
  computePower: number;
}

// Mock data for user's mobile devices
const mockMobileDevices: MobileDevice[] = [
  {
    id: 'dev-1',
    name: '我的手机',
    model: '小米13 Pro',
    cpuCores: 8,
    gpu: 'Adreno 740',
    ram: '12GB',
    status: 'connected',
    batteryLevel: 85,
    earningsToday: 2.35,
    earningsTotal: 42.18,
    computePower: 70
  },
  {
    id: 'dev-2',
    name: '平板设备',
    model: '华为 MatePad Pro',
    cpuCores: 6,
    gpu: 'Mali-G78',
    ram: '8GB',
    status: 'disconnected',
    batteryLevel: 62,
    earningsToday: 0,
    earningsTotal: 15.22,
    computePower: 50
  }
];

// Weekly earnings data for chart
const weeklyEarnings = [1.85, 2.12, 1.98, 2.35, 2.04, 2.15, 0];

const MobileComputing = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>(mockMobileDevices[0].id);
  const [computeAllocation, setComputeAllocation] = useState<number>(70);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const { models, loading } = useAGIModels();
  
  const device = mockMobileDevices.find(d => d.id === selectedDevice);
  
  const handleDeviceChange = (value: string) => {
    setSelectedDevice(value);
    const newDevice = mockMobileDevices.find(d => d.id === value);
    if (newDevice) {
      setComputeAllocation(newDevice.computePower);
    }
  };
  
  const handleAllocationChange = (value: number[]) => {
    setComputeAllocation(value[0]);
  };
  
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };
  
  const handleConnect = () => {
    if (!selectedModel) {
      toast({
        title: "请选择模型",
        description: "您需要先选择一个要贡献算力的AGI模型",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "连接成功",
      description: `您的设备已成功连接到算力网络，贡献算力给 ${models.find(m => m.id === selectedModel)?.name || selectedModel}`,
    });
  };
  
  const handleDisconnect = () => {
    toast({
      title: "已断开连接",
      description: "您的设备已断开与算力网络的连接",
    });
  };

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">移动设备算力接入</h1>
        <p className="text-muted-foreground mb-6">
          将您的闲置手机、平板电脑贡献给AGI模型训练和推理，每天获得稳定收益
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                今日收益
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">¥ {device?.earningsToday.toFixed(2) || '0.00'}</div>
              <p className="text-sm text-muted-foreground">较昨日 +5.2%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-primary" />
                累计收益
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">¥ {device?.earningsTotal.toFixed(2) || '0.00'}</div>
              <p className="text-sm text-muted-foreground">30天内 +36.8%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" />
                贡献等级
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">白银贡献者</div>
              <p className="text-sm text-muted-foreground">距金牌贡献者还需23天</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>我的设备</CardTitle>
                <CardDescription>管理您的移动设备算力贡献</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">选择设备</label>
                  <Select value={selectedDevice} onValueChange={handleDeviceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择设备" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMobileDevices.map(device => (
                        <SelectItem key={device.id} value={device.id}>
                          <span className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            {device.name} ({device.model})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {device && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">设备型号:</span>
                        <span className="font-medium">{device.model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">CPU核心:</span>
                        <span className="font-medium">{device.cpuCores}核</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">GPU:</span>
                        <span className="font-medium">{device.gpu}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">内存:</span>
                        <span className="font-medium">{device.ram}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">状态</span>
                        <Badge variant={device.status === 'connected' ? 'success' : 'secondary'}>
                          {device.status === 'connected' ? '已连接' : '未连接'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">电池电量</span>
                        <span>{device.batteryLevel}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-muted-foreground" />
                        <Progress value={device.batteryLevel} className="h-2" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>算力贡献</CardTitle>
                <CardDescription>选择AGI模型并设置算力贡献量</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">选择AGI模型</label>
                  <Select value={selectedModel} onValueChange={handleModelChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择要贡献算力的模型" />
                    </SelectTrigger>
                    <SelectContent>
                      {loading ? (
                        <SelectItem value="loading" disabled>加载中...</SelectItem>
                      ) : (
                        models.map(model => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                            {model.featured && <Badge variant="mobile" className="ml-2">热门</Badge>}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  
                  {selectedModel && models.find(m => m.id === selectedModel) && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-md text-sm">
                      <h4 className="font-medium mb-1">{models.find(m => m.id === selectedModel)?.name}</h4>
                      <p className="text-muted-foreground mb-2">{models.find(m => m.id === selectedModel)?.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {models.find(m => m.id === selectedModel)?.tags?.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">算力贡献量</label>
                    <span className="text-sm font-medium">{computeAllocation}%</span>
                  </div>
                  <Slider
                    defaultValue={[computeAllocation]}
                    max={100}
                    step={5}
                    value={[computeAllocation]}
                    onValueChange={handleAllocationChange}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>较低 (性能优先)</span>
                    <span>较高 (收益优先)</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-muted/30 p-3 rounded-md flex flex-col items-center text-center">
                      <Cpu className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs font-medium">预计每日收益</span>
                      <span className="text-lg font-bold">¥{((computeAllocation/100) * 3.25).toFixed(2)}</span>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md flex flex-col items-center text-center">
                      <Battery className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs font-medium">额外耗电</span>
                      <span className="text-lg font-bold">+{Math.round(computeAllocation * 0.15)}%</span>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md flex flex-col items-center text-center">
                      <Wifi className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs font-medium">每日流量</span>
                      <span className="text-lg font-bold">{Math.round(computeAllocation * 0.5)}MB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={handleDisconnect}>
                  断开连接
                </Button>
                <Button onClick={handleConnect}>
                  连接并开始贡献
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">常见问题</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">如何保证我的设备安全?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  我们采用沙箱隔离技术，确保AI模型运行在安全的环境中，不会访问您的个人数据。
                  同时，我们通过智能调度系统，确保您的设备不会过热或电量耗尽。您可以随时设置电量阈值，
                  当电量低于设定值时，系统会自动暂停算力贡献。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">我的收益如何计算?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  收益基于您设备的算力、贡献时长和当前市场需求综合计算。高性能设备和稳定长时间的贡献将获得更高收益。
                  系统每小时结算一次收益，您可以在"收益明细"页面查看详细的收益记录。达到100元后可申请提现至您的银行账户。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">对我的手机使用有何影响?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  我们的应用会智能监测您的设备使用状态，仅在设备闲置、充电状态下全功率运行。当您使用手机时，
                  应用会自动降低算力贡献或暂停，确保不影响您的正常使用体验。您也可以手动调整算力贡献比例，
                  平衡性能与收益。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">如何提高我的收益?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  连接更多设备、选择热门AGI模型、提高设备在线时长都能增加您的收益。此外，通过邀请好友加入平台，
                  您还能获得好友贡献算力收益的10%作为推广奖励。升级到金牌贡献者后，您还将获得额外的收益倍率。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MobileComputing;

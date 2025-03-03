
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Terminal, Key, Code, CloudCog, Cpu, LineChart, Shield, Lock, Copy, Eye, EyeOff, Server, Globe, Activity, Wifi } from 'lucide-react';

// 服务器数据模型
interface ComputingServer {
  id: string;
  location: string;
  country: string;
  city: string;
  provider: string;
  serverType: 'GPU' | 'CPU' | 'TPU' | 'ASIC';
  specs: {
    model: string;
    cores: number;
    memory: string;
    bandwidth: string;
  };
  status: 'online' | 'busy' | 'maintenance';
  load: number; // 0-100
  ping: number; // in ms
  owner: string;
  available: boolean;
}

// 模拟服务器数据
const mockServers: ComputingServer[] = [
  {
    id: 'sv-001',
    location: 'Asia',
    country: '中国',
    city: '上海',
    provider: '阿里云',
    serverType: 'GPU',
    specs: {
      model: 'NVIDIA RTX A6000',
      cores: 10752,
      memory: '48GB GDDR6',
      bandwidth: '10 Gbps'
    },
    status: 'online',
    load: 42,
    ping: 15,
    owner: '算力平台',
    available: true
  },
  {
    id: 'sv-002',
    location: 'Asia',
    country: '中国',
    city: '北京',
    provider: '腾讯云',
    serverType: 'GPU',
    specs: {
      model: 'NVIDIA A100',
      cores: 6912,
      memory: '80GB HBM2',
      bandwidth: '25 Gbps'
    },
    status: 'busy',
    load: 87,
    ping: 23,
    owner: '算力平台',
    available: true
  },
  {
    id: 'sv-003',
    location: 'Asia',
    country: '中国',
    city: '深圳',
    provider: '华为云',
    serverType: 'GPU',
    specs: {
      model: 'NVIDIA Tesla V100',
      cores: 5120,
      memory: '32GB HBM2',
      bandwidth: '15 Gbps'
    },
    status: 'online',
    load: 28,
    ping: 30,
    owner: '企业用户',
    available: true
  },
  {
    id: 'sv-004',
    location: 'Americas',
    country: '美国',
    city: '西雅图',
    provider: 'AWS',
    serverType: 'GPU',
    specs: {
      model: 'NVIDIA A10G',
      cores: 9216,
      memory: '24GB GDDR6',
      bandwidth: '20 Gbps'
    },
    status: 'online',
    load: 15,
    ping: 150,
    owner: '算力平台',
    available: true
  },
  {
    id: 'sv-005',
    location: 'Europe',
    country: '德国',
    city: '法兰克福',
    provider: 'Hetzner',
    serverType: 'CPU',
    specs: {
      model: 'AMD EPYC 7763',
      cores: 128,
      memory: '512GB DDR4',
      bandwidth: '40 Gbps'
    },
    status: 'maintenance',
    load: 0,
    ping: 210,
    owner: '算力平台',
    available: false
  },
  {
    id: 'sv-006',
    location: 'Europe',
    country: '英国',
    city: '伦敦',
    provider: 'OVH',
    serverType: 'GPU',
    specs: {
      model: 'NVIDIA RTX 4090',
      cores: 16384,
      memory: '24GB GDDR6X',
      bandwidth: '12 Gbps'
    },
    status: 'online',
    load: 65,
    ping: 195,
    owner: '企业用户',
    available: true
  },
  {
    id: 'sv-007',
    location: 'Asia',
    country: '中国',
    city: '杭州',
    provider: '阿里云',
    serverType: 'TPU',
    specs: {
      model: 'Google TPU v4',
      cores: 4096,
      memory: '128GB HBM',
      bandwidth: '30 Gbps'
    },
    status: 'online',
    load: 52,
    ping: 26,
    owner: '算力平台',
    available: true
  },
  {
    id: 'sv-008',
    location: 'Americas',
    country: '美国',
    city: '旧金山',
    provider: 'Google Cloud',
    serverType: 'TPU',
    specs: {
      model: 'Google TPU v3',
      cores: 2048,
      memory: '64GB HBM',
      bandwidth: '20 Gbps'
    },
    status: 'busy',
    load: 93,
    ping: 168,
    owner: '算力平台',
    available: true
  }
];

const ComputingAccess = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [serverFilter, setServerFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk-1234567890abcdefghijklmnopqrstuvwxyz');
    toast.success('API密钥已复制到剪贴板');
  };
  
  const handleGenerateNewKey = () => {
    toast.success('新的API密钥已生成', {
      description: '新密钥已复制到剪贴板并发送到您的邮箱'
    });
  };

  // 过滤服务器列表
  const filteredServers = mockServers.filter(server => {
    if (serverFilter !== 'all' && server.serverType !== serverFilter) return false;
    if (locationFilter !== 'all' && server.location !== locationFilter) return false;
    if (statusFilter !== 'all') {
      if (statusFilter === 'online' && server.status !== 'online') return false;
      if (statusFilter === 'busy' && server.status !== 'busy') return false;
      if (statusFilter === 'maintenance' && server.status !== 'maintenance') return false;
    }
    return true;
  });
  
  // 服务器状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500 text-white';
      case 'busy': return 'bg-amber-500 text-white';
      case 'maintenance': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  // 获取负载颜色
  const getLoadColor = (load: number) => {
    if (load < 30) return 'bg-green-500';
    if (load < 70) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-background p-4 rounded-md shadow-sm">
          <h1 className="text-2xl font-medium">算力接入</h1>
          <p className="text-muted-foreground mt-1">
            通过API和SDK灵活调用全球分布式算力资源
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  全球算力服务器
                </CardTitle>
                <CardDescription>
                  查看和接入全球分布式计算资源
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">服务器类型</div>
                    <Select value={serverFilter} onValueChange={setServerFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="全部服务器类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部类型</SelectItem>
                        <SelectItem value="GPU">GPU 服务器</SelectItem>
                        <SelectItem value="CPU">CPU 服务器</SelectItem>
                        <SelectItem value="TPU">TPU 服务器</SelectItem>
                        <SelectItem value="ASIC">ASIC 专用芯片</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">地理位置</div>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="全部地区" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部地区</SelectItem>
                        <SelectItem value="Asia">亚洲</SelectItem>
                        <SelectItem value="Europe">欧洲</SelectItem>
                        <SelectItem value="Americas">美洲</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">服务器状态</div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="全部状态" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部状态</SelectItem>
                        <SelectItem value="online">在线可用</SelectItem>
                        <SelectItem value="busy">高负载</SelectItem>
                        <SelectItem value="maintenance">维护中</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader className="bg-muted/20">
                      <TableRow>
                        <TableHead className="w-[180px]">位置</TableHead>
                        <TableHead>服务器类型</TableHead>
                        <TableHead>规格</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead>负载</TableHead>
                        <TableHead>延迟</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServers.map(server => (
                        <TableRow key={server.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{server.city}</div>
                                <div className="text-xs text-muted-foreground">{server.country} · {server.provider}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {server.serverType === 'GPU' && <Cpu className="h-4 w-4 mr-1.5 text-purple-500" />}
                              {server.serverType === 'CPU' && <Cpu className="h-4 w-4 mr-1.5 text-blue-500" />}
                              {server.serverType === 'TPU' && <Cpu className="h-4 w-4 mr-1.5 text-green-500" />}
                              {server.serverType === 'ASIC' && <Cpu className="h-4 w-4 mr-1.5 text-amber-500" />}
                              <span>{server.serverType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{server.specs.model}</div>
                              <div className="text-xs text-muted-foreground">
                                {server.specs.cores} 核心 · {server.specs.memory} · {server.specs.bandwidth}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(server.status)}>
                              {server.status === 'online' && '在线可用'}
                              {server.status === 'busy' && '高负载'}
                              {server.status === 'maintenance' && '维护中'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="w-full flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${getLoadColor(server.load)}`} 
                                  style={{ width: `${server.load}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{server.load}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Activity className="h-3 w-3 mr-1.5 text-muted-foreground" />
                              <span>{server.ping} ms</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm"
                              disabled={!server.available || server.status === 'maintenance'}
                            >
                              接入
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
                  <div>显示 {filteredServers.length} 个服务器，共 {mockServers.length} 个</div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>低负载</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span>中负载</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>高负载</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2 text-primary" />
                  API 访问凭证
                </CardTitle>
                <CardDescription>
                  管理您的API密钥以访问平台算力资源
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">您的API密钥</h3>
                      <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showApiKey ? '隐藏' : '显示'}
                      </Button>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-grow relative">
                        <Input 
                          value={showApiKey ? 'sk-1234567890abcdefghijklmnopqrstuvwxyz' : '•••••••••••••••••••••••••••••••••••••••'} 
                          readOnly
                          className="font-mono text-sm h-9"
                        />
                      </div>
                      <Button variant="outline" className="ml-2 h-9" onClick={handleCopyApiKey}>
                        <Copy className="h-4 w-4 mr-1" />
                        复制
                      </Button>
                      <Button variant="default" className="ml-2 h-9" onClick={handleGenerateNewKey}>
                        <Key className="h-4 w-4 mr-1" />
                        生成新密钥
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      注意：API密钥具有访问您账户的权限。请不要分享或在公共场所暴露您的API密钥。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">API 使用情况</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>时间</TableHead>
                          <TableHead>API端点</TableHead>
                          <TableHead>使用量</TableHead>
                          <TableHead className="text-right">费用</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-05-10</TableCell>
                          <TableCell>/v1/compute/gpu</TableCell>
                          <TableCell>125次调用</TableCell>
                          <TableCell className="text-right">¥12.50</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-10</TableCell>
                          <TableCell>/v1/models/inference</TableCell>
                          <TableCell>1,205次调用</TableCell>
                          <TableCell className="text-right">¥36.15</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-09</TableCell>
                          <TableCell>/v1/compute/batch</TableCell>
                          <TableCell>5次调用</TableCell>
                          <TableCell className="text-right">¥125.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  API 示例
                </CardTitle>
                <CardDescription>
                  快速上手API使用
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList className="mb-4">
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="python" className="space-y-4">
                    <div className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code>{`import requests

# 设置API密钥
api_key = "sk-1234567890abcdefghijklmnopqrstuvwxyz"

# 请求GPU计算资源
response = requests.post(
    "https://api.tengu.ai/v1/compute/gpu",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    },
    json={
        "model": "nvidia-a100",
        "task_type": "training",
        "duration_hours": 24,
        "priority": "high"
    }
)

# 解析响应
if response.status_code == 200:
    result = response.json()
    task_id = result["task_id"]
    print(f"任务已创建，ID: {task_id}")
    print(f"状态: {result['status']}")
    print(f"估计完成时间: {result['estimated_completion']}")
else:
    print(f"错误: {response.status_code}")
    print(response.text)`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="nodejs" className="space-y-4">
                    <div className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code>{`const axios = require('axios');

// 设置API密钥
const apiKey = 'sk-1234567890abcdefghijklmnopqrstuvwxyz';

// 请求GPU计算资源
async function requestGpuCompute() {
  try {
    const response = await axios.post(
      'https://api.tengu.ai/v1/compute/gpu',
      {
        model: 'nvidia-a100',
        task_type: 'training',
        duration_hours: 24,
        priority: 'high'
      },
      {
        headers: {
          'Authorization': \`Bearer \${apiKey}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = response.data;
    console.log(\`任务已创建，ID: \${result.task_id}\`);
    console.log(\`状态: \${result.status}\`);
    console.log(\`估计完成时间: \${result.estimated_completion}\`);
    
    return result.task_id;
  } catch (error) {
    console.error('请求失败:', error.response ? error.response.data : error.message);
  }
}`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curl" className="space-y-4">
                    <div className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code>{`# 请求GPU计算资源
curl -X POST \\
  https://api.tengu.ai/v1/compute/gpu \\
  -H "Authorization: Bearer sk-1234567890abcdefghijklmnopqrstuvwxyz" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "nvidia-a100",
    "task_type": "training",
    "duration_hours": 24,
    "priority": "high"
  }'`}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-lg">
                  <CloudCog className="h-5 w-5 mr-2 text-primary" />
                  SDK 集成
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-md overflow-hidden border">
                    <div className="bg-muted/30 p-3">
                      <h3 className="font-medium">官方SDK</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold">Py</span>
                          </div>
                          <span>Python SDK</span>
                        </div>
                        <Button variant="outline" size="sm">
                          下载
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <span className="text-green-600 font-bold">Js</span>
                          </div>
                          <span>Node.js SDK</span>
                        </div>
                        <Button variant="outline" size="sm">
                          下载
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                            <span className="text-orange-600 font-bold">Go</span>
                          </div>
                          <span>Golang SDK</span>
                        </div>
                        <Button variant="outline" size="sm">
                          下载
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Lock className="h-5 w-5 mr-2 text-primary" />
                  API 访问限制
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API请求速率</span>
                    <Badge>300次/分钟</Badge>
                  </div>
                  
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>当前使用：35%</span>
                    <span>重置时间：60秒</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">并发计算任务</span>
                    <Badge>5个</Badge>
                  </div>
                  
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>当前使用：3/5</span>
                    <span>状态：正常</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      申请提升限制
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComputingAccess;

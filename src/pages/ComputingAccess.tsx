
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, Cpu, Wifi, Server, Clock } from 'lucide-react';

interface ServerNode {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  type: 'CPU' | 'GPU' | 'TPU' | 'Mobile';
  specs: string;
  status: 'online' | 'offline' | 'maintenance';
  load: number;
  ping: number;
  provider: string;
}

const mockServerNodes: ServerNode[] = [
  {
    id: 'sgp-01',
    city: '新加坡',
    country: '新加坡',
    countryCode: 'SG',
    type: 'GPU',
    specs: 'NVIDIA A100 80GB x4',
    status: 'online',
    load: 65,
    ping: 42,
    provider: 'AlphaNode'
  },
  {
    id: 'hkg-02',
    city: '香港',
    country: '中国',
    countryCode: 'HK',
    type: 'GPU',
    specs: 'NVIDIA A100 40GB x8',
    status: 'online',
    load: 78,
    ping: 36,
    provider: 'QuantumCore'
  },
  {
    id: 'tyo-01',
    city: '东京',
    country: '日本',
    countryCode: 'JP',
    type: 'GPU',
    specs: 'NVIDIA H100 80GB x2',
    status: 'online',
    load: 42,
    ping: 58,
    provider: 'CloudFusion'
  },
  {
    id: 'sfo-03',
    city: '旧金山',
    country: '美国',
    countryCode: 'US',
    type: 'TPU',
    specs: 'TPU v4 x16',
    status: 'online',
    load: 30,
    ping: 135,
    provider: 'QuantumCore'
  },
  {
    id: 'fra-01',
    city: '法兰克福',
    country: '德国',
    countryCode: 'DE',
    type: 'GPU',
    specs: 'AMD MI250 x4',
    status: 'maintenance',
    load: 5,
    ping: 168,
    provider: 'EuroCompute'
  },
  {
    id: 'lon-02',
    city: '伦敦',
    country: '英国',
    countryCode: 'GB',
    type: 'GPU',
    specs: 'NVIDIA A10 x12',
    status: 'online',
    load: 88,
    ping: 152,
    provider: 'AlphaNode'
  },
  {
    id: 'blr-01',
    city: '班加罗尔',
    country: '印度',
    countryCode: 'IN',
    type: 'GPU',
    specs: 'NVIDIA A100 40GB x4',
    status: 'online',
    load: 25,
    ping: 112,
    provider: 'AsiaCloud'
  },
  {
    id: 'syd-01',
    city: '悉尼',
    country: '澳大利亚',
    countryCode: 'AU',
    type: 'GPU',
    specs: 'NVIDIA A10 x8',
    status: 'online',
    load: 55,
    ping: 176,
    provider: 'CloudFusion'
  },
  {
    id: 'par-02',
    city: '巴黎',
    country: '法国',
    countryCode: 'FR',
    type: 'CPU',
    specs: 'AMD EPYC 7763 x8',
    status: 'offline',
    load: 0,
    ping: 145,
    provider: 'EuroCompute'
  },
  {
    id: 'mob-cluster',
    city: '分布式',
    country: '全球',
    countryCode: 'WW',
    type: 'Mobile',
    specs: '智能手机集群 1000+',
    status: 'online',
    load: 32,
    ping: 86,
    provider: 'MobiCompute'
  }
];

const ComputingAccess = () => {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">算力接入</h1>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>算力接入概述</CardTitle>
              <CardDescription>
                通过我们的平台接入全球高性能计算资源，为您的AI模型训练、科学计算和数据处理提供强大支持
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">全球覆盖</h3>
                  <p className="text-sm text-center text-muted-foreground">连接遍布全球的高性能计算节点</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Server className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">多样硬件</h3>
                  <p className="text-sm text-center text-muted-foreground">支持GPU、TPU和分布式移动设备集群</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Cpu className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">高性能保障</h3>
                  <p className="text-sm text-center text-muted-foreground">企业级SLA保障，确保算力稳定可靠</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <Wifi className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-medium text-lg">简易接入</h3>
                  <p className="text-sm text-center text-muted-foreground">REST API和SDK支持多语言快速集成</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">可用算力节点</h2>
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">位置</th>
                  <th className="px-4 py-3 text-left font-medium">类型</th>
                  <th className="px-4 py-3 text-left font-medium">规格</th>
                  <th className="px-4 py-3 text-left font-medium">状态</th>
                  <th className="px-4 py-3 text-left font-medium">负载</th>
                  <th className="px-4 py-3 text-left font-medium">延迟</th>
                  <th className="px-4 py-3 text-left font-medium">提供商</th>
                </tr>
              </thead>
              <tbody>
                {mockServerNodes.map((node) => (
                  <tr key={node.id} className="border-t hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span className="font-medium">{node.city}</span>
                        <span className="ml-2 text-muted-foreground text-sm">{node.country}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        node.type === 'GPU' ? 'default' : 
                        node.type === 'TPU' ? 'destructive' : 
                        node.type === 'CPU' ? 'secondary' : 'outline'
                      }>
                        {node.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm">{node.specs}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          node.status === 'online' ? 'bg-green-500' :
                          node.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span className="capitalize">{node.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <Progress value={node.load} className="h-2" />
                        <span className="text-xs text-muted-foreground">{node.load}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-sm">{node.ping} ms</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{node.provider}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API接入</CardTitle>
              <CardDescription>通过REST API接入我们的算力网络</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">我们提供简单易用的REST API，支持多种语言调用，快速接入全球算力资源。</p>
              <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                curl -X POST https://api.computing.example.com/v1/tasks \<br />
                {'  '}-H "Authorization: Bearer YOUR_API_KEY" \<br />
                {'  '}-H "Content-Type: application/json" \<br />
                {'  '}-d '{"model": "gpt-4", "task_type": "inference", ...}'
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SDK集成</CardTitle>
              <CardDescription>使用我们的SDK快速集成</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">提供Python、JavaScript、Go和Java等多语言SDK，简化开发流程。</p>
              <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                # Python示例<br />
                from computing_sdk import ComputingClient<br /><br />
                client = ComputingClient(api_key="YOUR_API_KEY")<br />
                task = client.create_task(<br />
                {'  '}model="stable-diffusion",<br />
                {'  '}params={"prompt": "未来城市", ...}<br />
                )
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>企业定制</CardTitle>
              <CardDescription>为企业客户提供定制化算力解决方案</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">根据您的业务需求，定制专属算力方案，包括专用节点、私有部署等高级选项。</p>
              <ul className="list-disc list-inside text-sm space-y-2">
                <li>专属硬件资源，确保性能稳定</li>
                <li>私有化部署，满足数据安全需求</li>
                <li>定制化API接口，无缝集成现有系统</li>
                <li>7x24技术支持，确保业务连续性</li>
                <li>弹性计算资源，按需扩展</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ComputingAccess;

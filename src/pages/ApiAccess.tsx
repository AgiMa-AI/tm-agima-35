
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
import { Terminal, Key, Code, CloudCog, Cpu, LineChart, Shield, Lock, Copy, Eye, EyeOff } from 'lucide-react';

const ApiAccess = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk-1234567890abcdefghijklmnopqrstuvwxyz');
    toast.success('API密钥已复制到剪贴板');
  };
  
  const handleGenerateNewKey = () => {
    toast.success('新的API密钥已生成', {
      description: '新密钥已复制到剪贴板并发送到您的邮箱'
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-background p-4 rounded-md shadow-sm">
          <h1 className="text-2xl font-medium">API & SDK 接入</h1>
          <p className="text-muted-foreground mt-1">
            通过API和SDK灵活调用算力资源
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <Terminal className="h-5 w-5 mr-2 text-primary" />
                  API 访问凭证
                </CardTitle>
                <CardDescription>
                  管理您的API密钥以访问平台功能
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
                        <TableRow>
                          <TableCell>2023-05-09</TableCell>
                          <TableCell>/v1/models/inference</TableCell>
                          <TableCell>952次调用</TableCell>
                          <TableCell className="text-right">¥28.56</TableCell>
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
                    
                    <div className="bg-zinc-950 text-zinc-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code>{`# 检查任务状态
task_id = "task_12345"
response = requests.get(
    f"https://api.tengu.ai/v1/compute/tasks/{task_id}",
    headers={
        "Authorization": f"Bearer {api_key}"
    }
)

if response.status_code == 200:
    task_info = response.json()
    print(f"任务状态: {task_info['status']}")
    print(f"进度: {task_info['progress']}%")
    print(f"已用算力: {task_info['compute_used']} 小时")
    
    # 下载任务结果（如果已完成）
    if task_info['status'] == 'completed':
        result_url = task_info['result_url']
        print(f"结果下载链接: {result_url}")
`}</code>
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
  }'

# 响应示例:
# {
#   "task_id": "task_12345",
#   "status": "queued",
#   "estimated_completion": "2023-05-12T10:30:00Z"
# }

# 检查任务状态
curl -X GET \\
  https://api.tengu.ai/v1/compute/tasks/task_12345 \\
  -H "Authorization: Bearer sk-1234567890abcdefghijklmnopqrstuvwxyz"

# 响应示例:
# {
#   "task_id": "task_12345",
#   "status": "running",
#   "progress": 45,
#   "compute_used": "10.5",
#   "estimated_completion": "2023-05-12T10:30:00Z"
# }`}</code>
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
                  
                  <div className="rounded-md overflow-hidden border">
                    <div className="bg-muted/30 p-3">
                      <h3 className="font-medium">集成示例</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center mr-3">
                            <Code className="h-5 w-5" />
                          </div>
                          <span>企业集成方案</span>
                        </div>
                        <Button variant="outline" size="sm">
                          详情
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center mr-3">
                            <Terminal className="h-5 w-5" />
                          </div>
                          <span>命令行工具</span>
                        </div>
                        <Button variant="outline" size="sm">
                          安装
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-1.5 text-primary" />
                      企业级支持
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      提供专属技术支持和定制化SDK解决方案，满足企业特定需求。
                    </p>
                    <Button variant="default" className="w-full">
                      申请企业支持
                    </Button>
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

export default ApiAccess;

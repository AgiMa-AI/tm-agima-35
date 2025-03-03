
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Search, Key, MoreVertical, Copy, EyeOff, Eye, 
  ShieldAlert, Clock, Plus, Trash2, RefreshCw, Shield
} from 'lucide-react';

const AdminApiKeys = () => {
  // Mock API keys data
  const [apiKeys] = useState([
    { 
      id: 'key_1', 
      name: "生产环境API", 
      key: "sk_prod_T9qLm5KcE7nJ2sX1vB3pR8aZ", 
      status: "active", 
      owner: "系统管理员", 
      createdAt: "2025-01-15", 
      expiresAt: "2026-01-15",
      permissions: ["读取", "写入", "删除"]
    },
    { 
      id: 'key_2', 
      name: "测试环境API", 
      key: "sk_test_H4rW9sB2xK7yP6vL1mD5nG3z", 
      status: "active", 
      owner: "开发团队", 
      createdAt: "2025-02-01", 
      expiresAt: "2025-05-01",
      permissions: ["读取", "写入"]
    },
    { 
      id: 'key_3', 
      name: "数据分析API", 
      key: "sk_data_F2qS5vX8cT3rY7mN1pB9zL6k", 
      status: "expired", 
      owner: "数据团队", 
      createdAt: "2024-10-10", 
      expiresAt: "2025-02-10",
      permissions: ["读取"]
    },
    { 
      id: 'key_4', 
      name: "企业客户API", 
      key: "sk_ent_J7bN3kR9sL2mP5vX8cT1qF6z", 
      status: "revoked", 
      owner: "企业销售", 
      createdAt: "2025-01-30", 
      expiresAt: "已撤销",
      permissions: ["读取", "写入", "删除", "管理"]
    },
    { 
      id: 'key_5', 
      name: "移动应用API", 
      key: "sk_mob_X3qP7vR2sT9mL5nB8cF1kJ6z", 
      status: "active", 
      owner: "移动团队", 
      createdAt: "2025-02-15", 
      expiresAt: "2025-08-15",
      permissions: ["读取", "写入"]
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">活跃</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-amber-500 border-amber-500 flex items-center gap-1">
          <Clock className="h-3 w-3" /> 已过期
        </Badge>;
      case 'revoked':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <ShieldAlert className="h-3 w-3" /> 已撤销
        </Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You would normally use toast here
    alert("API密钥已复制到剪贴板");
  };
  
  const maskApiKey = (key: string) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  };
  
  const filteredKeys = apiKeys.filter(apiKey => 
    apiKey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apiKey.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center">
            <Key className="mr-2 h-6 w-6" />
            API密钥管理
          </h1>
          <p className="mt-2 text-indigo-100">
            创建、管理和监控API密钥的访问权限和使用情况
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索API密钥..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 ml-auto">
                <Plus className="h-4 w-4 mr-1" />
                创建API密钥
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>创建新API密钥</DialogTitle>
                <DialogDescription>
                  创建一个新的API密钥以访问系统API。请确保安全存储密钥，它只会显示一次。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="key-name">API密钥名称</Label>
                  <Input id="key-name" placeholder="例如：生产环境API" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key-owner">API密钥所有者</Label>
                  <Input id="key-owner" placeholder="例如：系统管理员" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key-expiry">过期时间</Label>
                  <Input id="key-expiry" type="date" />
                </div>
                <div className="space-y-3">
                  <Label>权限</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="read" />
                      <Label htmlFor="read">读取</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="write" />
                      <Label htmlFor="write">写入</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="delete" />
                      <Label htmlFor="delete">删除</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="manage" />
                      <Label htmlFor="manage">管理</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">取消</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">创建密钥</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all-keys">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-keys">所有密钥</TabsTrigger>
            <TabsTrigger value="active">活跃密钥</TabsTrigger>
            <TabsTrigger value="expired">过期密钥</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-keys" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>API密钥列表</CardTitle>
                <CardDescription>
                  管理所有API密钥及其访问权限
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-8 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">名称/所有者</div>
                    <div className="col-span-3">API密钥</div>
                    <div>状态</div>
                    <div>创建日期</div>
                    <div className="text-right">操作</div>
                  </div>
                  
                  {filteredKeys.length > 0 ? (
                    <div className="divide-y">
                      {filteredKeys.map(apiKey => (
                        <div key={apiKey.id} className="grid grid-cols-8 items-center p-3">
                          <div className="col-span-2">
                            <div className="font-medium">{apiKey.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {apiKey.owner}
                            </div>
                          </div>
                          <div className="col-span-3 font-mono text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0" 
                                onClick={() => toggleShowKey(apiKey.id)}
                              >
                                {showKeys[apiKey.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0" 
                                onClick={() => copyToClipboard(apiKey.key)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {apiKey.permissions.map((perm, idx) => (
                                <Badge key={idx} variant="outline" className="text-[10px] py-0 px-1">
                                  {perm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>{getStatusBadge(apiKey.status)}</div>
                          <div className="text-xs">{apiKey.createdAt}</div>
                          <div className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>密钥操作</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Copy className="h-4 w-4" />
                                  复制密钥
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Shield className="h-4 w-4" />
                                  修改权限
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <RefreshCw className="h-4 w-4" />
                                  续期
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                  撤销密钥
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Key className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">未找到匹配API密钥</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        尝试调整搜索条件或创建新的API密钥
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  <p>API密钥应安全存储，避免泄露。定期轮换密钥以提高安全性。</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>活跃密钥</CardTitle>
                <CardDescription>
                  当前有效的API密钥
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">活跃API密钥列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expired" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>过期密钥</CardTitle>
                <CardDescription>
                  已过期或撤销的API密钥
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">过期API密钥列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminApiKeys;

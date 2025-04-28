
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, CreditCard, Key, Lock, Shield, User, Wallet } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  const handleSaveAPIKey = () => {
    if (apiKey.trim() === "") {
      toast({
        title: "错误",
        description: "请输入有效的 API 密钥",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "成功",
      description: "API 密钥已保存",
      variant: "default",
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">设置</h1>
          <p className="text-muted-foreground mt-1">
            管理您的账户设置和偏好
          </p>
        </div>
        
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">账户</TabsTrigger>
            <TabsTrigger value="billing">支付</TabsTrigger>
            <TabsTrigger value="api">API 访问</TabsTrigger>
            <TabsTrigger value="preferences">系统偏好</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>用户资料（User Profile）</CardTitle>
                <CardDescription>更新您的账户信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input id="name" defaultValue="张三" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">电子邮件</Label>
                    <Input id="email" type="email" defaultValue="zhang@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">电话号码</Label>
                    <Input id="phone" defaultValue="13800138000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center">
                      公司
                      <Lock className="ml-1 h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input 
                      id="company" 
                      defaultValue="腾目科技有限公司" 
                      disabled={true}
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>
                <Button>保存更改</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>管理您的密码和安全选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">当前密码</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">新密码</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认新密码</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>更新密码</Button>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">双因素认证</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        启用两步验证以增强账户安全性
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      启用
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>支付方式</CardTitle>
                <CardDescription>管理您的支付方式和账单</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">**** **** **** 4242</p>
                        <p className="text-xs text-muted-foreground">
                          有效期至 12/25
                        </p>
                      </div>
                    </div>
                    <Badge>默认</Badge>
                  </div>
                </div>
                
                <Button variant="outline">添加支付方式</Button>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">账单历史</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年11月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-11-30
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥258.00</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年10月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-10-31
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥312.50</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年9月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-09-30
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥186.25</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>账户配额</CardTitle>
                <CardDescription>管理您的计算资源限制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">GPU 实例 (10/20)</p>
                      <p className="text-sm text-muted-foreground">50%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">存储空间 (78/100 GB)</p>
                      <p className="text-sm text-muted-foreground">78%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[78%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">网络带宽 (120/1000 GB)</p>
                      <p className="text-sm text-muted-foreground">12%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[12%]"></div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">申请提高限额</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API 访问</CardTitle>
                <CardDescription>管理您的 API 密钥和权限</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API 密钥</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="api-key" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="输入您的 API 密钥" 
                    />
                    <Button onClick={handleSaveAPIKey}>保存</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    此密钥用于访问 API 和进行程序化操作
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">访问权限</h3>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>实例管理</span>
                    </div>
                    <Switch defaultChecked id="instance-management" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>用户数据访问</span>
                    </div>
                    <Switch id="user-data-access" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>支付操作</span>
                    </div>
                    <Switch id="payment-operations" />
                  </div>
                </div>
                
                <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-yellow-800 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        安全提示
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        请勿共享您的 API 密钥。如果您认为密钥已泄露，请立即重新生成密钥。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>系统偏好</CardTitle>
                <CardDescription>自定义您的使用体验</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">深色模式</p>
                    <p className="text-sm text-muted-foreground">
                      启用深色主题
                    </p>
                  </div>
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={setIsDarkMode} 
                    id="dark-mode"
                  />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">通知</p>
                    <p className="text-sm text-muted-foreground">
                      接收有关您的实例和账户的通知
                    </p>
                  </div>
                  <Switch 
                    checked={isNotificationsEnabled}
                    onCheckedChange={setIsNotificationsEnabled}
                    id="notifications"
                  />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="language">语言</Label>
                  <select 
                    id="language" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="zh-CN"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                    <option value="ko-KR">한국어</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">时区</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Asia/Shanghai"
                  >
                    <option value="Asia/Shanghai">中国标准时间 (GMT+8)</option>
                    <option value="America/New_York">东部标准时间 (GMT-5)</option>
                    <option value="Europe/London">格林威治标准时间 (GMT)</option>
                    <option value="Asia/Tokyo">日本标准时间 (GMT+9)</option>
                  </select>
                </div>
                
                <Button>保存偏好设置</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

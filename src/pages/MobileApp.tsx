
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Server, Database, Download, ExternalLink, Activity, Shield, Moon, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MobileApp = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">移动应用</h1>
          <p className="text-muted-foreground mt-1">
            在移动设备上随时随地管理您的 GPU 实例
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-7">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl flex items-center">
                  <Smartphone className="mr-2 h-5 w-5" />
                  移动客户端
                </CardTitle>
                <Badge variant="outline" className="bg-green-500 text-white hover:bg-green-600">最新版本</Badge>
              </div>
              <CardDescription>支持iOS和安卓系统的原生应用程序，提供完整的GPU实例管理体验</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                通过我们的移动应用，您可以随时随地管理、监控和控制您的GPU实例。无论您身在何处，都能保持对云GPU资源的掌控。
              </p>
              
              <Tabs defaultValue="android" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="android">安卓版</TabsTrigger>
                  <TabsTrigger value="ios">iOS版</TabsTrigger>
                </TabsList>
                <TabsContent value="android" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex justify-center">
                      <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300" 
                           alt="Android App" 
                           className="rounded-lg w-40 h-auto" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-lg mb-1">安卓版 GPU云平台</h3>
                        <p className="text-sm text-muted-foreground mb-2">版本 2.3.1 | 大小 24.5 MB</p>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                          <span className="text-xs text-muted-foreground">(653)</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        下载安卓应用
                      </Button>
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          支持安卓 8.0 及以上版本
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="ios" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex justify-center">
                      <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300" 
                           alt="iOS App" 
                           className="rounded-lg w-40 h-auto" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-lg mb-1">iOS版 GPU云平台</h3>
                        <p className="text-sm text-muted-foreground mb-2">版本 2.3.0 | 大小 28.2 MB</p>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                          <span className="text-xs text-muted-foreground">(421)</span>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        下载iOS应用
                      </Button>
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          支持iOS 14.0及以上版本
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="md:col-span-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Server className="mr-2 h-5 w-5" />
                核心功能
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">实时监控</h3>
                  <p className="text-sm text-muted-foreground">随时查看您的GPU实例运行状态及实时性能数据</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">安全管理</h3>
                  <p className="text-sm text-muted-foreground">通过生物识别和双重身份验证确保账户安全</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <Moon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">深色模式</h3>
                  <p className="text-sm text-muted-foreground">支持系统深色模式，呵护您的眼睛健康</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <GitBranch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">离线功能</h3>
                  <p className="text-sm text-muted-foreground">在无网络环境下浏览历史数据和报告</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">查看完整功能列表</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>扫码下载</CardTitle>
              <CardDescription>使用手机扫描下方二维码直接下载应用</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cloudgpu.app/mobile" 
                  alt="Mobile App QR Code" 
                  className="w-40 h-40" 
                />
              </div>
              <p className="text-center text-muted-foreground">
                扫描上方二维码直接在您的移动设备上下载我们的应用
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>主要特点</CardTitle>
              <CardDescription>移动应用专为GPU云用户优化设计</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">省电设计</h4>
                    <p className="text-sm text-muted-foreground">优化的后台处理减少电池消耗，延长使用时间</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">推送通知</h4>
                    <p className="text-sm text-muted-foreground">接收实时的租用状态变更、账单和性能警报通知</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">数据同步</h4>
                    <p className="text-sm text-muted-foreground">跨设备同步您的设置和偏好</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">本地化支持</h4>
                    <p className="text-sm text-muted-foreground">支持多种语言，包括英文、中文、日文和韩文</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>使用教程</CardTitle>
            <CardDescription>了解如何充分利用移动应用的功能</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <h3 className="font-medium mb-2">下载安装</h3>
                  <p className="text-sm text-muted-foreground">从应用商店或通过官网下载安装应用</p>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <h3 className="font-medium mb-2">登录账户</h3>
                  <p className="text-sm text-muted-foreground">使用您的GPU云账户凭证登录</p>
                </div>
                <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <h3 className="font-medium mb-2">开始使用</h3>
                  <p className="text-sm text-muted-foreground">探索仪表盘、管理实例、查看账单和性能数据</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  观看视频教程
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MobileApp;

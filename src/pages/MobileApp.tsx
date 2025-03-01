
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Server, Database, Download, ExternalLink } from 'lucide-react';

const MobileApp = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">移动应用</h1>
          <p className="text-muted-foreground mt-1">
            在移动设备上管理您的 GPU 实例
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                移动客户端
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                下载我们的移动应用程序，随时随地管理您的 GPU 实例。支持安卓和 iOS 设备。
              </p>
              
              <Tabs defaultValue="android" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="android">安卓版</TabsTrigger>
                  <TabsTrigger value="ios">iOS版</TabsTrigger>
                </TabsList>
                <TabsContent value="android" className="space-y-4 mt-4">
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300" 
                         alt="Android App" 
                         className="mx-auto rounded-lg w-40 h-auto mb-4" />
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      下载安卓应用
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="ios" className="space-y-4 mt-4">
                  <div className="text-center">
                    <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=300" 
                         alt="iOS App" 
                         className="mx-auto rounded-lg w-40 h-auto mb-4" />
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      下载iOS应用
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Server className="mr-2 h-5 w-5" />
                移动功能
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">实例管理</h3>
                  <p className="text-sm text-muted-foreground">远程监控和管理您的所有 GPU 实例</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">实时数据</h3>
                  <p className="text-sm text-muted-foreground">查看实例的实时性能和使用数据</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 bg-primary/10 p-2 rounded-full">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">远程操作</h3>
                  <p className="text-sm text-muted-foreground">远程启动、停止和重启您的实例</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">了解更多功能</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>二维码快速访问</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg mb-4">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cloudgpu.app" 
                alt="Mobile App QR Code" 
                className="w-40 h-40" 
              />
            </div>
            <p className="text-center text-muted-foreground">
              扫描上方二维码直接在您的移动设备上访问我们的网页应用
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MobileApp;

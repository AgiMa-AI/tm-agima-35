
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserPlus, Users, Gift, Award, Copy, Share2, ChevronRight, Sparkles } from 'lucide-react';

const Invitation = () => {
  // Mock invitation data
  const myInviteCode = "AGI-COMPUTE-42X9Z";
  const invitedUsers = [
    { id: 1, name: "张明", joinDate: "2025-02-15", contribution: 1280, status: "active" },
    { id: 2, name: "李小华", joinDate: "2025-02-20", contribution: 895, status: "active" },
    { id: 3, name: "王大力", joinDate: "2025-02-28", contribution: 450, status: "pending" },
  ];
  
  const copyInviteCode = () => {
    navigator.clipboard.writeText(myInviteCode);
    // You would normally use toast here
    alert("邀请码已复制到剪贴板");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,#fff)]"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <UserPlus className="h-6 w-6 text-purple-300" />
                  <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                    邀请计划
                  </h1>
                </div>
                <p className="text-purple-200/90 mt-1 text-sm sm:text-base max-w-xl">
                  邀请用户加入平台，共享算力价值，携手构建分布式计算生态
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-indigo-500" />
                我的邀请码
              </CardTitle>
              <CardDescription>
                分享此邀请码给朋友，他们加入后您将获得其算力贡献15%的收益分成
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-lg px-4 py-3 flex-1 text-center">
                  <span className="font-mono font-bold text-lg tracking-wider text-indigo-700 dark:text-indigo-300">
                    {myInviteCode}
                  </span>
                </div>
                <Button onClick={copyInviteCode} variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Share2 className="h-4 w-4" />
                  分享邀请码
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                我的奖励
              </CardTitle>
              <CardDescription>
                基于您邀请用户的算力贡献
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 rounded-lg p-4">
                  <div className="text-sm text-amber-800 dark:text-amber-300">总收益</div>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">¥ 394.75</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">邀请人数</div>
                    <div className="text-xl font-semibold">3</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">算力贡献</div>
                    <div className="text-xl font-semibold">2,625 <span className="text-xs">单位</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invited-users">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="invited-users" className="gap-2">
              <Users className="h-4 w-4" />
              我邀请的用户
            </TabsTrigger>
            <TabsTrigger value="rewards-history" className="gap-2">
              <Sparkles className="h-4 w-4" />
              奖励历史
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="invited-users">
            <Card>
              <CardHeader>
                <CardTitle>我邀请的用户</CardTitle>
                <CardDescription>
                  查看所有通过您的邀请码注册的用户及其贡献
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invitedUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
                            {user.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">加入时间: {user.joinDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {user.contribution} <span className="text-xs text-muted-foreground">算力单位</span>
                          </div>
                          <Badge variant={user.status === "active" ? "default" : "outline"} className="mt-1">
                            {user.status === "active" ? "活跃中" : "待授权"}
                          </Badge>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewards-history">
            <Card>
              <CardHeader>
                <CardTitle>奖励历史</CardTitle>
                <CardDescription>
                  查看您从邀请用户中获得的所有奖励记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                      <Sparkles className="h-6 w-6 text-indigo-500" />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg">暂无奖励记录</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                    当您邀请的用户开始贡献算力后，您将开始获得奖励，所有记录将显示在这里
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Invitation;

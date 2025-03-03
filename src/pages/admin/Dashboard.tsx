
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, Server, CreditCard, Clock, TrendingUp, AlarmClock } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data for charts
  const systemData = [
    { name: '1月', active: 120, completed: 80, canceled: 10 },
    { name: '2月', active: 180, completed: 110, canceled: 15 },
    { name: '3月', active: 220, completed: 170, canceled: 20 },
    { name: '4月', active: 300, completed: 250, canceled: 10 },
    { name: '5月', active: 390, completed: 310, canceled: 20 },
    { name: '6月', active: 450, completed: 380, canceled: 25 },
  ];

  const pieData = [
    { name: 'GPU任务', value: 55 },
    { name: 'CPU任务', value: 25 },
    { name: '移动设备', value: 15 },
    { name: '其他', value: 5 },
  ];
  
  const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#6b7280'];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center">
            <Activity className="mr-2 h-6 w-6" />
            管理员控制台
          </h1>
          <p className="mt-2 text-indigo-100">
            监控和管理系统数据、用户、任务和API密钥
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-indigo-600">
                <Users className="mr-2 h-4 w-4" />
                活跃用户
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,284</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1 text-emerald-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                较上周增长 12%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-violet-600">
                <Server className="mr-2 h-4 w-4" />
                活跃计算节点
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,845</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1 text-emerald-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                较上周增长 8%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-emerald-600">
                <CreditCard className="mr-2 h-4 w-4" />
                本月收入
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥284,391</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1 text-emerald-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                较上月增长 15%
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-amber-600">
                <Clock className="mr-2 h-4 w-4" />
                平均响应时间
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42ms</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1 text-emerald-600">
                <AlarmClock className="mr-1 h-3 w-3" />
                较上周减少 5ms
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">系统概览</TabsTrigger>
            <TabsTrigger value="tasks">任务流量</TabsTrigger>
            <TabsTrigger value="distribution">计算分布</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>系统活动趋势</CardTitle>
                <CardDescription>
                  过去6个月任务状态概览
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={systemData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="active" stroke="#4f46e5" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="completed" stroke="#10b981" />
                      <Line type="monotone" dataKey="canceled" stroke="#f43f5e" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>任务流量分析</CardTitle>
                <CardDescription>
                  各月份任务执行数据
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={systemData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="active" fill="#4f46e5" />
                      <Bar dataKey="completed" fill="#10b981" />
                      <Bar dataKey="canceled" fill="#f43f5e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>计算资源分布</CardTitle>
                <CardDescription>
                  当前平台计算资源类型分布
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex justify-center items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;


import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart as BarChartIcon, LineChart, PieChart, ArrowUpRight, DollarSign, Clock, Calendar, TrendingUp, Zap, CreditCard, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const earningsData = [
  { date: '05-01', amount: 320 },
  { date: '05-02', amount: 350 },
  { date: '05-03', amount: 410 },
  { date: '05-04', amount: 490 },
  { date: '05-05', amount: 470 },
  { date: '05-06', amount: 520 },
  { date: '05-07', amount: 550 },
  { date: '05-08', amount: 590 },
  { date: '05-09', amount: 610 },
  { date: '05-10', amount: 670 },
];

const deviceEarningsData = [
  { name: '手机', value: 15 },
  { name: 'CPU服务器', value: 25 },
  { name: 'GPU服务器', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const taskData = [
  { 
    id: 'TASK-1234', 
    time: '2023-05-10 14:30', 
    duration: '6小时', 
    computeType: 'GPU', 
    amount: 120 
  },
  { 
    id: 'TASK-1235', 
    time: '2023-05-10 08:15', 
    duration: '4小时', 
    computeType: 'GPU', 
    amount: 80 
  },
  { 
    id: 'TASK-1236', 
    time: '2023-05-09 22:45', 
    duration: '12小时', 
    computeType: 'GPU', 
    amount: 240 
  },
  { 
    id: 'TASK-1237', 
    time: '2023-05-09 16:20', 
    duration: '2小时', 
    computeType: 'CPU', 
    amount: 20 
  },
  { 
    id: 'TASK-1238', 
    time: '2023-05-08 10:10', 
    duration: '8小时', 
    computeType: 'GPU', 
    amount: 160 
  },
];

const withdrawalData = [
  { 
    id: 'WD-5678', 
    time: '2023-05-05 14:30', 
    amount: 500, 
    status: 'completed', 
    method: '支付宝' 
  },
  { 
    id: 'WD-5679', 
    time: '2023-05-01 08:15', 
    amount: 1000, 
    status: 'completed', 
    method: '银行卡' 
  },
  { 
    id: 'WD-5680', 
    time: '2023-04-25 22:45', 
    amount: 300, 
    status: 'completed', 
    method: '微信' 
  },
];

const Earnings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-background p-4 rounded-md shadow-sm">
          <h1 className="text-2xl font-medium">收益管理</h1>
          <p className="text-muted-foreground mt-1">
            查看并管理您的算力出租收益
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">总收益 (本月)</p>
                  <h3 className="text-2xl font-bold">¥4,980</h3>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>较上月 +15%</span>
                  </div>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">贡献算力 (小时)</p>
                  <h3 className="text-2xl font-bold">248.5</h3>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>较上月 +8%</span>
                  </div>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">可提现余额</p>
                  <h3 className="text-2xl font-bold">¥2,350</h3>
                  <div className="flex items-center text-xs text-amber-600 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>下次结算 3天后</span>
                  </div>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  收益趋势
                </CardTitle>
                <CardDescription>
                  查看您的算力收益变化趋势
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Tabs defaultValue="daily">
                  <TabsList className="mb-4">
                    <TabsTrigger value="daily">日视图</TabsTrigger>
                    <TabsTrigger value="weekly">周视图</TabsTrigger>
                    <TabsTrigger value="monthly">月视图</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earningsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                          <XAxis dataKey="date" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip 
                            formatter={(value) => [`¥${value}`, '收益']} 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                          />
                          <Legend />
                          <Bar dataKey="amount" name="日收益" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="weekly">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={[
                          { week: '第1周', amount: 1800 },
                          { week: '第2周', amount: 2200 },
                          { week: '第3周', amount: 1950 },
                          { week: '第4周', amount: 2400 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                          <XAxis dataKey="week" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip 
                            formatter={(value) => [`¥${value}`, '收益']} 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="amount" name="周收益" stroke="#8884d8" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="monthly">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { month: '1月', amount: 5800 },
                          { month: '2月', amount: 6200 },
                          { month: '3月', amount: 7500 },
                          { month: '4月', amount: 7800 },
                          { month: '5月', amount: 4980 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                          <XAxis dataKey="month" stroke="#8884d8" />
                          <YAxis stroke="#8884d8" />
                          <Tooltip 
                            formatter={(value) => [`¥${value}`, '收益']} 
                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                          />
                          <Legend />
                          <Bar dataKey="amount" name="月收益" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  算力任务记录
                </CardTitle>
                <CardDescription>
                  您的设备参与的计算任务明细
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>任务ID</TableHead>
                      <TableHead>时间</TableHead>
                      <TableHead>时长</TableHead>
                      <TableHead>类型</TableHead>
                      <TableHead className="text-right">收益(¥)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taskData.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.id}</TableCell>
                        <TableCell>{task.time}</TableCell>
                        <TableCell>{task.duration}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={task.computeType === 'GPU' ? 'border-primary/30 bg-primary/5' : 'border-blue-300/30 bg-blue-50/50'}>
                            {task.computeType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{task.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    查看更多
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="bg-muted/30">
                <CardTitle className="flex items-center text-lg">
                  <BarChartIcon className="h-5 w-5 mr-2 text-primary" />
                  设备收益分布
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={deviceEarningsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceEarningsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '占比']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  {deviceEarningsData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">{entry.name}</span>
                      </div>
                      <span className="text-sm font-medium">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  提现记录
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {withdrawalData.map((withdrawal) => (
                    <div key={withdrawal.id} className="flex justify-between items-center p-3 bg-muted/10 rounded-lg border">
                      <div>
                        <p className="font-medium">{withdrawal.id}</p>
                        <p className="text-xs text-muted-foreground">{withdrawal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">¥{withdrawal.amount}</p>
                        <p className="text-xs">{withdrawal.method}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-2">
                    申请提现
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Download className="h-5 w-5 mr-2 text-primary" />
                  账单下载
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    <span>2023年5月账单</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <span>2023年4月账单</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    <span>2023年3月账单</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Earnings;

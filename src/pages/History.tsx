
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, CalendarDays, Clock, Download, Filter, RefreshCw, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HistoryItem {
  id: string;
  instanceId: string;
  instanceName: string;
  startTime: string;
  endTime: string | null;
  duration: string;
  cost: number;
  status: 'running' | 'completed' | 'terminated' | 'failed';
}

const mockHistoryItems: HistoryItem[] = [
  {
    id: 'job-1',
    instanceId: 'inst-1',
    instanceName: 'High-Performance RTX Node',
    startTime: '2023-12-20 09:30',
    endTime: '2023-12-20 12:30',
    duration: '3h 0m',
    cost: 2.85,
    status: 'completed'
  },
  {
    id: 'job-2',
    instanceId: 'inst-4',
    instanceName: 'Multi-GPU Workstation',
    startTime: '2023-12-18 14:15',
    endTime: '2023-12-18 17:45',
    duration: '3h 30m',
    cost: 6.48,
    status: 'completed'
  },
  {
    id: 'job-3',
    instanceId: 'inst-2',
    instanceName: 'ML Optimized Server',
    startTime: '2023-12-15 10:00',
    endTime: null,
    duration: '37h 15m',
    cost: 102.47,
    status: 'running'
  },
  {
    id: 'job-4',
    instanceId: 'inst-5',
    instanceName: 'Entry Level Node',
    startTime: '2023-12-10 08:30',
    endTime: '2023-12-10 09:45',
    duration: '1h 15m',
    cost: 0.29,
    status: 'completed'
  },
  {
    id: 'job-5',
    instanceId: 'inst-6',
    instanceName: 'Professional Inference Server',
    startTime: '2023-12-05 13:20',
    endTime: '2023-12-05 14:10',
    duration: '0h 50m',
    cost: 0.43,
    status: 'completed'
  },
  {
    id: 'job-6',
    instanceId: 'inst-1',
    instanceName: 'High-Performance RTX Node',
    startTime: '2023-12-01 16:45',
    endTime: '2023-12-01 17:30',
    duration: '0h 45m',
    cost: 0.71,
    status: 'terminated'
  },
  {
    id: 'job-7',
    instanceId: 'inst-3',
    instanceName: 'Budget Training Node',
    startTime: '2023-11-28 11:15',
    endTime: '2023-11-28 11:25',
    duration: '0h 10m',
    cost: 0.07,
    status: 'failed'
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'running':
      return <Badge className="bg-blue-500">运行中</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">已完成</Badge>;
    case 'terminated':
      return <Badge className="bg-yellow-500">已终止</Badge>;
    case 'failed':
      return <Badge className="bg-red-500">失败</Badge>;
    default:
      return <Badge>未知</Badge>;
  }
};

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const filteredHistory = mockHistoryItems.filter(item => {
    const matchesSearch = item.instanceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.instanceId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const totalCost = filteredHistory.reduce((sum, item) => sum + item.cost, 0);
  const activeJobs = filteredHistory.filter(item => item.status === 'running').length;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">使用历史</h1>
          <p className="text-muted-foreground mt-1">
            查看您的 GPU 实例使用记录和费用
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">总费用</CardTitle>
              <CardDescription>本月消费</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">¥{totalCost.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground ml-2">CNY</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">有效时间</CardTitle>
              <CardDescription>计算时间总计</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                <p className="text-3xl font-bold">46.75</p>
                <p className="text-sm text-muted-foreground ml-2">小时</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">活跃任务</CardTitle>
              <CardDescription>当前运行中</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">{activeJobs}</p>
                <p className="text-sm text-muted-foreground ml-2">实例</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>实例使用历史</CardTitle>
                <CardDescription>您的 GPU 实例使用记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="搜索实例..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="状态筛选" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">所有状态</SelectItem>
                        <SelectItem value="running">运行中</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="terminated">已终止</SelectItem>
                        <SelectItem value="failed">失败</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      导出 CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      刷新
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>实例</TableHead>
                        <TableHead>开始时间</TableHead>
                        <TableHead>持续时间</TableHead>
                        <TableHead>费用 (¥)</TableHead>
                        <TableHead>状态</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              <div>
                                <p>{item.instanceName}</p>
                                <p className="text-xs text-muted-foreground">{item.instanceId}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{item.startTime}</p>
                                {item.endTime && <p className="text-xs text-muted-foreground">结束: {item.endTime}</p>}
                              </div>
                            </TableCell>
                            <TableCell>{item.duration}</TableCell>
                            <TableCell>{item.cost.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <p>没有找到匹配的历史记录</p>
                              <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                                setSearchQuery('');
                                setStatusFilter('all');
                              }}>
                                <Filter className="h-4 w-4 mr-2" />
                                清除筛选器
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>使用统计</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Tabs defaultValue="weekly">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly">周</TabsTrigger>
                    <TabsTrigger value="monthly">月</TabsTrigger>
                    <TabsTrigger value="yearly">年</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="weekly" className="pt-4">
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-5 w-5" />
                        <span>周使用统计图表</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="pt-4">
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-5 w-5" />
                        <span>月使用统计图表</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="yearly" className="pt-4">
                    <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-5 w-5" />
                        <span>年使用统计图表</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>日历</CardTitle>
                  <Button variant="ghost" size="sm">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    今天
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;

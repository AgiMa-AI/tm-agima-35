
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Search, Filter, MoreVertical, Play, Pause, RefreshCw, XCircle, 
  Clock, CheckCircle, AlertCircle, RotateCcw, ListChecks
} from 'lucide-react';

const AdminTasks = () => {
  // Mock tasks data
  const [tasks] = useState([
    { 
      id: 'TASK-4321', 
      name: "大型语言模型训练", 
      status: "running", 
      progress: 68, 
      user: "李小华", 
      startTime: "2025-03-02 08:30", 
      estimatedCompletion: "2025-03-03 16:45",
      computeUnits: 128,
      priority: "high"
    },
    { 
      id: 'TASK-4322', 
      name: "物联网数据分析", 
      status: "queued", 
      progress: 0, 
      user: "张明", 
      startTime: "等待中", 
      estimatedCompletion: "预计12小时",
      computeUnits: 32,
      priority: "medium"
    },
    { 
      id: 'TASK-4323', 
      name: "图像识别模型测试", 
      status: "completed", 
      progress: 100, 
      user: "王大力", 
      startTime: "2025-03-01 14:20", 
      estimatedCompletion: "已完成",
      computeUnits: 64,
      priority: "medium"
    },
    { 
      id: 'TASK-4324', 
      name: "金融数据预测", 
      status: "failed", 
      progress: 45, 
      user: "赵云", 
      startTime: "2025-03-02 10:15", 
      estimatedCompletion: "失败",
      computeUnits: 48,
      priority: "high"
    },
    { 
      id: 'TASK-4325', 
      name: "视频转码处理", 
      status: "paused", 
      progress: 72, 
      user: "孙尚香", 
      startTime: "2025-03-02 09:00", 
      estimatedCompletion: "已暂停",
      computeUnits: 16,
      priority: "low"
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-green-500 flex items-center gap-1"><Play className="h-3 w-3" /> 运行中</Badge>;
      case 'queued':
        return <Badge variant="outline" className="text-amber-500 border-amber-500 flex items-center gap-1"><Clock className="h-3 w-3" /> 队列中</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> 已完成</Badge>;
      case 'failed':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> 失败</Badge>;
      case 'paused':
        return <Badge variant="outline" className="flex items-center gap-1"><Pause className="h-3 w-3" /> 已暂停</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'queued':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      case 'paused':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">高</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">中</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">低</Badge>;
      default:
        return <Badge variant="outline">标准</Badge>;
    }
  };
  
  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center">
            <ListChecks className="mr-2 h-6 w-6" />
            任务管理
          </h1>
          <p className="mt-2 text-indigo-100">
            监控和管理所有计算任务的状态和进度
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索任务..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
            <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 ml-auto">
              刷新
              <RefreshCw className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-tasks">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-tasks">所有任务</TabsTrigger>
            <TabsTrigger value="running">运行中</TabsTrigger>
            <TabsTrigger value="queued">队列中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-tasks" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>任务列表</CardTitle>
                <CardDescription>
                  管理所有计算任务及其状态
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">任务</div>
                    <div>状态</div>
                    <div>进度</div>
                    <div>优先级</div>
                    <div>计算单位</div>
                    <div className="text-right">操作</div>
                  </div>
                  
                  {filteredTasks.length > 0 ? (
                    <div className="divide-y">
                      {filteredTasks.map(task => (
                        <div key={task.id} className="grid grid-cols-7 items-center p-3">
                          <div className="col-span-2">
                            <div className="font-medium">{task.name}</div>
                            <div className="text-xs text-muted-foreground flex flex-col xs:flex-row gap-1 xs:gap-3">
                              <span>{task.id}</span>
                              <span>用户: {task.user}</span>
                            </div>
                          </div>
                          <div>{getStatusBadge(task.status)}</div>
                          <div className="pr-4">
                            <div className="flex items-center gap-2">
                              <Progress value={task.progress} className={getProgressColor(task.status)} />
                              <span className="text-xs whitespace-nowrap">{task.progress}%</span>
                            </div>
                          </div>
                          <div>{getPriorityBadge(task.priority)}</div>
                          <div className="text-sm">{task.computeUnits}</div>
                          <div className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>任务操作</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Play className="h-4 w-4" />
                                  启动
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Pause className="h-4 w-4" />
                                  暂停
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <RotateCcw className="h-4 w-4" />
                                  重启
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  取消任务
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
                        <ListChecks className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">未找到匹配任务</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        尝试调整搜索条件或筛选器
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="running" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>运行中的任务</CardTitle>
                <CardDescription>
                  当前正在执行的所有计算任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">运行中任务列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="queued" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>队列中的任务</CardTitle>
                <CardDescription>
                  等待执行的计算任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">队列中任务列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>已完成的任务</CardTitle>
                <CardDescription>
                  成功完成的计算任务历史记录
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">已完成任务列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminTasks;


import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, Search, Filter, CheckCircle, Clock, XCircle, 
  AlertCircle, MoreVertical, Play, Pause, RotateCcw, Trash2, Filter as FilterIcon
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, Outlet, useLocation } from 'react-router-dom';

// 模拟任务数据
const mockTasks = [
  { id: 'task-001', name: '系统备份', type: 'system', status: 'running', priority: 'high', created: '2025-03-02 09:15:00', progress: 45 },
  { id: 'task-002', name: '数据同步', type: 'data', status: 'completed', priority: 'medium', created: '2025-03-01 14:30:00', progress: 100 },
  { id: 'task-003', name: '用户清理', type: 'user', status: 'failed', priority: 'low', created: '2025-03-01 10:45:00', progress: 67 },
  { id: 'task-004', name: '日志分析', type: 'system', status: 'pending', priority: 'high', created: '2025-03-02 16:20:00', progress: 0 },
  { id: 'task-005', name: '安全扫描', type: 'security', status: 'running', priority: 'high', created: '2025-03-02 11:30:00', progress: 78 },
  { id: 'task-006', name: '资源优化', type: 'system', status: 'completed', priority: 'medium', created: '2025-02-28 09:45:00', progress: 100 },
  { id: 'task-007', name: '索引重建', type: 'data', status: 'pending', priority: 'low', created: '2025-03-03 08:15:00', progress: 0 },
  { id: 'task-008', name: '邮件通知', type: 'notification', status: 'completed', priority: 'medium', created: '2025-03-01 12:30:00', progress: 100 },
];

const AdminTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  
  // 检查当前是否在二级页面
  const isTaskSubpage = location.pathname !== '/admin/tasks';
  
  // 如果是二级页面，只显示Outlet
  if (isTaskSubpage) {
    return <Outlet />;
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-blue-500">运行中</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">已完成</Badge>;
      case 'failed':
        return <Badge variant="destructive">失败</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">等待中</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="border-red-500 text-red-500">高</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">中</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-green-500 text-green-500">低</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  const filteredTasks = mockTasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center">
            <ClipboardList className="mr-2 h-6 w-6" />
            任务管理
          </h1>
          <p className="mt-2 text-indigo-100">
            创建、监控和管理系统任务
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
              <FilterIcon className="h-4 w-4" />
              筛选
            </Button>
            <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 ml-auto">
              创建任务
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-tasks">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-tasks">所有任务</TabsTrigger>
            <TabsTrigger value="running">运行中</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="failed">失败</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-tasks" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>系统任务</CardTitle>
                <CardDescription>
                  管理所有系统自动化任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2">任务名称</div>
                    <div>类型</div>
                    <div>状态</div>
                    <div>优先级</div>
                    <div>进度</div>
                    <div className="text-right">操作</div>
                  </div>
                  
                  <div className="divide-y">
                    {filteredTasks.map(task => (
                      <div key={task.id} className="grid grid-cols-7 items-center p-3">
                        <div className="col-span-2">
                          <div className="font-medium">
                            <Link 
                              to={`/admin/tasks/${task.id}`}
                              className="hover:text-primary transition-colors"
                            >
                              {task.name}
                            </Link>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {task.created}
                          </div>
                        </div>
                        <div className="text-sm capitalize">{task.type}</div>
                        <div>{getStatusBadge(task.status)}</div>
                        <div>{getPriorityBadge(task.priority)}</div>
                        <div className="w-24">
                          <div className="bg-muted rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${
                                task.status === 'failed' 
                                  ? 'bg-red-500' 
                                  : task.status === 'completed' 
                                    ? 'bg-green-500' 
                                    : 'bg-blue-500'
                              }`}
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
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
                                重试
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Trash2 className="h-4 w-4" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="running" className="pt-4">
            {/* 筛选出运行中的任务 */}
            <Card>
              <CardHeader>
                <CardTitle>运行中的任务</CardTitle>
                <CardDescription>
                  当前正在执行的系统任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">运行中任务列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="pt-4">
            {/* 筛选出已完成的任务 */}
            <Card>
              <CardHeader>
                <CardTitle>已完成的任务</CardTitle>
                <CardDescription>
                  成功完成的历史任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">已完成任务列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="failed" className="pt-4">
            {/* 筛选出失败的任务 */}
            <Card>
              <CardHeader>
                <CardTitle>失败的任务</CardTitle>
                <CardDescription>
                  执行失败需要处理的任务
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">失败任务列表</p>
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

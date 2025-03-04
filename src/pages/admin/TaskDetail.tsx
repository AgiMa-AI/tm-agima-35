
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, CheckCircle, Clock, XCircle, 
  Play, Pause, RotateCcw, Trash2, AlertCircle, 
  MonitorPlay, FileText, Settings, Clock3
} from 'lucide-react';

// 模拟任务数据
const mockTasks = [
  { id: 'task-001', name: '系统备份', type: 'system', status: 'running', priority: 'high', created: '2025-03-02 09:15:00', progress: 45, description: '执行全系统自动备份任务，包括用户数据、配置文件和系统日志。', logs: ['09:15:00 - 任务启动', '09:15:05 - 开始备份用户数据', '09:20:10 - 用户数据备份完成', '09:20:15 - 开始备份配置文件', '09:25:30 - 配置文件备份完成', '09:25:35 - 开始备份系统日志'] },
  { id: 'task-002', name: '数据同步', type: 'data', status: 'completed', priority: 'medium', created: '2025-03-01 14:30:00', progress: 100, description: '将主数据库与备份数据库进行数据同步，确保数据一致性。', logs: ['14:30:00 - 任务启动', '14:30:10 - 开始数据同步', '14:35:20 - 同步用户表完成', '14:40:15 - 同步订单表完成', '14:45:30 - 同步产品表完成', '14:50:00 - 数据同步完成', '14:50:05 - 任务结束'] },
  { id: 'task-003', name: '用户清理', type: 'user', status: 'failed', priority: 'low', created: '2025-03-01 10:45:00', progress: 67, description: '清理长期未活跃用户账户，释放系统资源。', logs: ['10:45:00 - 任务启动', '10:45:10 - 开始清理未活跃用户', '10:50:20 - 清理30天未登录用户', '10:55:30 - 清理60天未登录用户', '11:00:40 - 错误: 数据库连接中断', '11:00:45 - 任务失败'] },
  { id: 'task-004', name: '日志分析', type: 'system', status: 'pending', priority: 'high', created: '2025-03-02 16:20:00', progress: 0, description: '分析系统日志，识别潜在安全威胁和性能问题。', logs: [] },
  { id: 'task-005', name: '安全扫描', type: 'security', status: 'running', priority: 'high', created: '2025-03-02 11:30:00', progress: 78, description: '执行全面安全扫描，检查系统漏洞和潜在威胁。', logs: ['11:30:00 - 任务启动', '11:30:05 - 开始安全扫描', '11:35:10 - 完成端口扫描', '11:40:15 - 完成漏洞检测', '11:45:20 - 开始恶意软件扫描', '11:50:25 - 发现3个潜在威胁'] },
  { id: 'task-006', name: '资源优化', type: 'system', status: 'completed', priority: 'medium', created: '2025-02-28 09:45:00', progress: 100, description: '优化系统资源使用，提高服务器性能。', logs: ['09:45:00 - 任务启动', '09:45:05 - 开始资源分析', '09:50:10 - 完成内存优化', '09:55:15 - 完成CPU优化', '10:00:20 - 完成存储优化', '10:05:25 - 资源优化完成', '10:05:30 - 任务结束'] },
  { id: 'task-007', name: '索引重建', type: 'data', status: 'pending', priority: 'low', created: '2025-03-03 08:15:00', progress: 0, description: '重建数据库索引，提高查询性能。', logs: [] },
  { id: 'task-008', name: '邮件通知', type: 'notification', status: 'completed', priority: 'medium', created: '2025-03-01 12:30:00', progress: 100, description: '向所有用户发送系统维护通知邮件。', logs: ['12:30:00 - 任务启动', '12:30:05 - 准备邮件内容', '12:35:10 - 开始发送邮件', '12:45:15 - 发送完成', '12:45:20 - 任务结束'] },
];

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);
  
  useEffect(() => {
    // 模拟从API获取任务详情
    const foundTask = mockTasks.find(t => t.id === id);
    setTask(foundTask || null);
  }, [id]);

  if (!task) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">任务未找到</h2>
          <p className="text-muted-foreground mb-6">无法找到ID为 {id} 的任务</p>
          <Button onClick={() => navigate('/admin/tasks')}>
            返回任务列表
          </Button>
        </div>
      </Layout>
    );
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock3 className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/admin/tasks')}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            返回任务列表
          </Button>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {task.name}
              </h1>
              <p className="mt-2 text-indigo-100">
                {task.description}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                <Play className="h-4 w-4 mr-2" />
                启动
              </Button>
              {task.status === 'running' && (
                <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                  <Pause className="h-4 w-4 mr-2" />
                  暂停
                </Button>
              )}
              {task.status === 'failed' && (
                <Button variant="outline" className="text-white border-white hover:bg-white/20 hover:text-white">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重试
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">任务状态</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {getStatusIcon(task.status)}
                <span className="ml-2">{getStatusBadge(task.status)}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">任务类型</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="capitalize font-medium">{task.type}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">优先级</CardTitle>
            </CardHeader>
            <CardContent>
              <div>{getPriorityBadge(task.priority)}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              详细信息
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center">
              <MonitorPlay className="h-4 w-4 mr-2" />
              执行日志
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              任务设置
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>任务详情</CardTitle>
                <CardDescription>查看任务的详细信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">任务描述</h3>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">创建时间</h3>
                  <p className="text-muted-foreground">{task.created}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">执行进度</h3>
                  <div className="bg-muted rounded-full h-2.5 mb-1">
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
                  <p className="text-sm text-muted-foreground">{task.progress}% 完成</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>执行日志</CardTitle>
                <CardDescription>查看任务的执行历史记录</CardDescription>
              </CardHeader>
              <CardContent>
                {task.logs && task.logs.length > 0 ? (
                  <div className="border rounded-md p-4 bg-muted/10 font-mono text-sm">
                    {task.logs.map((log: string, index: number) => (
                      <div key={index} className="py-1 border-b last:border-0">
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">暂无执行日志</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>任务设置</CardTitle>
                <CardDescription>管理任务的执行设置</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">任务设置功能尚未实现</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button variant="destructive" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            删除任务
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TaskDetail;

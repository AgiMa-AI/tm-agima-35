
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Clock } from 'lucide-react';

const TaskManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          任务管理
        </CardTitle>
        <CardDescription>
          查看和管理您的计算任务状态
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/30 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-primary" /> 
                <span className="font-medium">BERT 模型微调</span>
              </div>
              <Badge className="bg-amber-500">进行中</Badge>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">开始时间</p>
                  <p>2023-05-10 10:30</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">预计完成</p>
                  <p>2023-05-12 10:30</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">已用算力</p>
                  <p>24.5 小时</p>
                </div>
              </div>
              
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '45%' }}></div>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span>进度: 45%</span>
                <span>预计剩余: 32 小时</span>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border overflow-hidden">
            <div className="bg-muted/30 p-3 flex justify-between items-center">
              <div className="flex items-center">
                <Cpu className="h-4 w-4 mr-2 text-primary" /> 
                <span className="font-medium">LLaMa 模型推理</span>
              </div>
              <Badge className="bg-green-500">已完成</Badge>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">开始时间</p>
                  <p>2023-05-07 14:15</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">完成时间</p>
                  <p>2023-05-09 06:22</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">总算力</p>
                  <p>40.1 小时</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  查看报告
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskManagement;

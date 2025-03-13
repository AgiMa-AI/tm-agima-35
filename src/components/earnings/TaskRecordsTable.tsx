
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

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

const TaskRecordsTable = () => {
  return (
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
  );
};

export default TaskRecordsTable;

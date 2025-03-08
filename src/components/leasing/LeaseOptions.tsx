
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ResourceConfiguration from './ResourceConfiguration';

interface LeaseOptionsProps {
  resourceType: string;
  gpuCount: string;
  setGpuCount: (value: string) => void;
  cpuCount: string;
  setCpuCount: (value: string) => void;
  leaseDays: string;
  setLeaseDays: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
}

const LeaseOptions = ({
  resourceType,
  gpuCount,
  setGpuCount,
  cpuCount,
  setCpuCount,
  leaseDays,
  setLeaseDays,
  taskType,
  setTaskType
}: LeaseOptionsProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-4'}`}>
          {resourceType === 'gpu' ? (
            <div>
              <label className="text-sm font-medium mb-2 block">GPU 数量</label>
              <Select value={gpuCount} onValueChange={setGpuCount}>
                <SelectTrigger className="rounded-lg bg-background border border-input hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="选择GPU数量" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 GPU</SelectItem>
                  <SelectItem value="2">2 GPU</SelectItem>
                  <SelectItem value="4">4 GPU</SelectItem>
                  <SelectItem value="8">8 GPU</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium mb-2 block">CPU 核心数</label>
              <Select value={cpuCount} onValueChange={setCpuCount}>
                <SelectTrigger className="rounded-lg bg-background border border-input hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="选择CPU核心数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16">16 核心</SelectItem>
                  <SelectItem value="32">32 核心</SelectItem>
                  <SelectItem value="64">64 核心</SelectItem>
                  <SelectItem value="128">128 核心</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium mb-2 block">租赁天数</label>
            <Input 
              type="number" 
              min="1" 
              max="30" 
              value={leaseDays}
              onChange={(e) => setLeaseDays(e.target.value)}
              className="rounded-lg bg-background border border-input hover:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary transition-all"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">任务类型</label>
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger className="rounded-lg bg-background border border-input hover:border-primary/50 transition-colors">
              <SelectValue placeholder="选择任务类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="training">模型训练</SelectItem>
              <SelectItem value="inference">模型推理</SelectItem>
              <SelectItem value="dataprocessing">数据处理</SelectItem>
              <SelectItem value="custom">自定义任务</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ResourceConfiguration resourceType={resourceType} />
    </div>
  );
};

export default LeaseOptions;

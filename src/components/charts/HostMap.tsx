
import React, { useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Globe } from 'lucide-react';

interface HostMapProps {
  data: Array<{
    name: string;
    location: string;
    lat: number;
    lng: number;
    gpuCount: number;
    availableGpus: number;
    performance: number;
  }>;
  loading?: boolean;
}

const HostMap = ({ data, loading = false }: HostMapProps) => {
  const [mapMode, setMapMode] = useState<'gpu-count' | 'performance' | 'availability'>('gpu-count');
  
  // Calculate total GPUs and available GPUs
  const totalGpus = data.reduce((sum, host) => sum + host.gpuCount, 0);
  const availableGpus = data.reduce((sum, host) => sum + host.availableGpus, 0);
  const availabilityPercentage = totalGpus > 0 ? Math.round((availableGpus / totalGpus) * 100) : 0;
  
  // Get domain for the color scale based on selected mode
  const getZAxisRange = () => {
    switch (mapMode) {
      case 'gpu-count':
        return [20, 200];
      case 'performance':
        return [30, 100];
      case 'availability':
        return [10, 100];
      default:
        return [20, 200];
    }
  };
  
  // Get data key based on selected mode
  const getDataKey = () => {
    switch (mapMode) {
      case 'gpu-count':
        return 'gpuCount';
      case 'performance':
        return 'performance';
      case 'availability':
        return 'availableGpus';
      default:
        return 'gpuCount';
    }
  };
  
  // Get color based on selected mode
  const getColor = () => {
    switch (mapMode) {
      case 'gpu-count':
        return '#8884d8';
      case 'performance':
        return '#82ca9d';
      case 'availability':
        return '#ffc658';
      default:
        return '#8884d8';
    }
  };

  return (
    <Card className="w-full border-0 bg-background shadow-md">
      <CardHeader className="bg-muted/30 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Vast.ai 主机地理分布
          </CardTitle>
          <CardDescription>全球 GPU 实例分布及状态</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Select 
            defaultValue="gpu-count" 
            onValueChange={(value) => setMapMode(value as any)}
          >
            <SelectTrigger className="w-[150px] h-8">
              <SelectValue placeholder="显示模式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpu-count">GPU 数量</SelectItem>
              <SelectItem value="performance">性能评分</SelectItem>
              <SelectItem value="availability">可用率</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-muted/20 rounded-md p-3">
            <div className="text-sm text-muted-foreground">总 GPU 数量</div>
            <div className="text-2xl font-semibold mt-1">{totalGpus}</div>
          </div>
          <div className="bg-muted/20 rounded-md p-3">
            <div className="text-sm text-muted-foreground">可用 GPU 数量</div>
            <div className="text-2xl font-semibold mt-1">{availableGpus}</div>
          </div>
          <div className="bg-muted/20 rounded-md p-3">
            <div className="text-sm text-muted-foreground">资源利用率</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold mt-1">{availabilityPercentage}%</div>
              <Badge variant={availabilityPercentage > 50 ? "success" : "destructive"} className="mt-1">
                {availabilityPercentage > 50 ? "充足" : "紧张"}
              </Badge>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">加载数据中...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="h-[300px] w-full flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <div className="text-lg font-medium">无可用数据</div>
            <div className="text-sm text-muted-foreground">当前没有主机地理位置数据</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
              <XAxis 
                type="number" 
                dataKey="lng" 
                name="经度" 
                unit="°" 
                stroke="#8884d8" 
                tick={{ fill: '#8884d8' }} 
                domain={[-180, 180]}
              />
              <YAxis 
                type="number" 
                dataKey="lat" 
                name="纬度" 
                unit="°" 
                stroke="#8884d8" 
                tick={{ fill: '#8884d8' }} 
                domain={[-90, 90]}
              />
              <ZAxis 
                type="number" 
                dataKey={getDataKey()} 
                range={getZAxisRange()} 
                name={mapMode === 'gpu-count' ? "GPU 数量" : mapMode === 'performance' ? "性能评分" : "可用 GPU"} 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => {
                  if (name === 'lng') return [`${value}°`, '经度'];
                  if (name === 'lat') return [`${value}°`, '纬度'];
                  if (name === getDataKey()) {
                    if (mapMode === 'gpu-count') return [value, 'GPU 数量'];
                    if (mapMode === 'performance') return [value, '性能评分'];
                    if (mapMode === 'availability') return [value, '可用 GPU'];
                  }
                  return [value, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background/90 border rounded-md shadow-md p-3 text-xs">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-muted-foreground">{data.location}</p>
                        <div className="mt-1">
                          <p>GPU 总数: {data.gpuCount}</p>
                          <p>可用 GPU: {data.availableGpus}</p>
                          <p>使用率: {Math.round((data.availableGpus / data.gpuCount) * 100)}%</p>
                          <p>性能评分: {data.performance}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
                wrapperStyle={{ zIndex: 100 }}
              />
              <Legend />
              <Scatter 
                name={mapMode === 'gpu-count' ? "GPU 数量" : mapMode === 'performance' ? "性能评分" : "可用 GPU"} 
                data={data} 
                fill={getColor()} 
              />
            </ScatterChart>
          </ResponsiveContainer>
        )}
        
        <div className="text-xs text-muted-foreground text-center mt-4">
          数据点大小表示 {mapMode === 'gpu-count' ? "GPU 数量" : mapMode === 'performance' ? "性能评分" : "可用 GPU"}，颜色深浅表示值的大小
        </div>
      </CardContent>
    </Card>
  );
};

export default HostMap;

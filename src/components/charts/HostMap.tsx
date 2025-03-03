
import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>主机地理分布</CardTitle>
        <CardDescription>全球 GPU 实例分布图</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">加载数据中...</div>
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="lng" name="经度" unit="°" />
              <YAxis type="number" dataKey="lat" name="纬度" unit="°" />
              <ZAxis 
                type="number" 
                dataKey="gpuCount" 
                range={[20, 200]} 
                name="GPU 数量" 
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => {
                  if (name === 'lng') return [`${value}°`, '经度'];
                  if (name === 'lat') return [`${value}°`, '纬度'];
                  if (name === 'gpuCount') return [value, 'GPU 数量'];
                  return [value, name];
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-md shadow-md p-2 text-xs">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-muted-foreground">{data.location}</p>
                        <div className="mt-1">
                          <p>GPU 总数: {data.gpuCount}</p>
                          <p>可用 GPU: {data.availableGpus}</p>
                          <p>性能评分: {data.performance}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Scatter name="GPU 主机" data={data} fill="var(--primary)" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default HostMap;

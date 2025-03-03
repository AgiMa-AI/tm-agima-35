
import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StatsData {
  timestamp: string;
  gpuUtilization: number;
  memoryUsage: number;
  temperature: number;
  power: number;
  price: number;
}

interface StatsMultipleProps {
  data: StatsData[];
  loading?: boolean;
}

const StatsMultiple = ({ data, loading = false }: StatsMultipleProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vast.ai 性能统计</CardTitle>
        <CardDescription>GPU实例性能数据监控</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="utilization">
          <TabsList className="mb-4">
            <TabsTrigger value="utilization">使用率</TabsTrigger>
            <TabsTrigger value="memory">内存</TabsTrigger>
            <TabsTrigger value="temperature">温度</TabsTrigger>
            <TabsTrigger value="price">价格变化</TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div className="text-muted-foreground">加载数据中...</div>
            </div>
          ) : (
            <>
              <TabsContent value="utilization">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                    />
                    <YAxis yAxisId="left" unit="%" />
                    <YAxis yAxisId="right" orientation="right" unit="W" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'GPU使用率') return [`${value}%`, name];
                        if (name === '功率') return [`${value}W`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="gpuUtilization" name="GPU使用率" fill="var(--primary)" />
                    <Line yAxisId="right" type="monotone" dataKey="power" name="功率" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="memory">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                    />
                    <YAxis unit="%" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === '内存使用率') return [`${value}%`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="memoryUsage" name="内存使用率" fill="#8884d8" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="temperature">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                    />
                    <YAxis unit="°C" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'GPU温度') return [`${value}°C`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" name="GPU温度" stroke="#ff4d4f" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="price">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                    />
                    <YAxis unit="¥" />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === '价格') return [`¥${value}`, name];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="price" name="价格" stroke="#52c41a" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatsMultiple;


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
    <Card className="w-full border-0 bg-background shadow-md">
      <CardHeader className="bg-muted/30 pb-2">
        <CardTitle className="text-lg font-medium">性能统计</CardTitle>
        <CardDescription>GPU 实例性能数据监控</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <Tabs defaultValue="utilization">
          <TabsList className="mb-4 bg-muted/20">
            <TabsTrigger value="utilization" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">使用率</TabsTrigger>
            <TabsTrigger value="memory" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">内存</TabsTrigger>
            <TabsTrigger value="temperature" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">温度</TabsTrigger>
            <TabsTrigger value="price" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">价格变化</TabsTrigger>
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
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                      stroke="#8884d8"
                      tick={{ fill: '#8884d8' }}
                    />
                    <YAxis yAxisId="left" unit="%" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <YAxis yAxisId="right" orientation="right" unit="W" stroke="#ff7300" tick={{ fill: '#ff7300' }} />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'GPU使用率') return [`${value}%`, name];
                        if (name === '功率') return [`${value}W`, name];
                        return [value, name];
                      }}
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="gpuUtilization" name="GPU使用率" fill="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="power" name="功率" stroke="#ff7300" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="memory">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                      stroke="#8884d8"
                      tick={{ fill: '#8884d8' }}
                    />
                    <YAxis unit="%" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === '内存使用率') return [`${value}%`, name];
                        return [value, name];
                      }}
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Bar dataKey="memoryUsage" name="内存使用率" fill="#8884d8" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="temperature">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                      stroke="#8884d8"
                      tick={{ fill: '#8884d8' }}
                    />
                    <YAxis unit="°C" stroke="#ff4d4f" tick={{ fill: '#ff4d4f' }} />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === 'GPU温度') return [`${value}°C`, name];
                        return [value, name];
                      }}
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" name="GPU温度" stroke="#ff4d4f" />
                  </ComposedChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="price">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
                      }}
                      stroke="#8884d8"
                      tick={{ fill: '#8884d8' }}
                    />
                    <YAxis unit="¥" stroke="#52c41a" tick={{ fill: '#52c41a' }} />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === '价格') return [`¥${value}`, name];
                        return [value, name];
                      }}
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
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

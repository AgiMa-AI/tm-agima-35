
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GpuData {
  name: string;
  performance: number;
  price: number;
  efficiency: number;
  memory: number;
  power: number;
}

interface GpuComparisonProps {
  data: GpuData[];
  loading?: boolean;
}

const GpuComparison = ({ data, loading = false }: GpuComparisonProps) => {
  const normalizedData = data.map(item => ({
    ...item,
    // Normalize values for radar chart (0-100)
    normalizedPerformance: (item.performance / Math.max(...data.map(d => d.performance))) * 100,
    normalizedPrice: (1 - (item.price / Math.max(...data.map(d => d.price)))) * 100, // Inverted so lower is better
    normalizedEfficiency: (item.efficiency / Math.max(...data.map(d => d.efficiency))) * 100,
    normalizedMemory: (item.memory / Math.max(...data.map(d => d.memory))) * 100,
    normalizedPower: (1 - (item.power / Math.max(...data.map(d => d.power)))) * 100, // Inverted so lower is better
  }));

  return (
    <Card className="w-full border-0 bg-background shadow-md">
      <CardHeader className="bg-muted/30 pb-2">
        <CardTitle className="text-lg font-medium">GPU 对比分析</CardTitle>
        <CardDescription>不同 GPU 型号性能和价格对比</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <Tabs defaultValue="performance">
          <TabsList className="mb-4 bg-muted/20">
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">性能对比</TabsTrigger>
            <TabsTrigger value="price" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">价格对比</TabsTrigger>
            <TabsTrigger value="efficiency" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">效率对比</TabsTrigger>
            <TabsTrigger value="radar" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">雷达图</TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div className="text-muted-foreground">加载数据中...</div>
            </div>
          ) : (
            <>
              <TabsContent value="performance">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis type="number" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <YAxis type="category" dataKey="name" width={150} stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <Tooltip 
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Bar dataKey="performance" name="性能分数" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="price">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis type="number" stroke="#ff7300" tick={{ fill: '#ff7300' }} />
                    <YAxis type="category" dataKey="name" width={150} stroke="#ff7300" tick={{ fill: '#ff7300' }} />
                    <Tooltip 
                      formatter={(value) => [`¥${value}`, '每小时价格']} 
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Bar dataKey="price" name="每小时价格" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="efficiency">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                    <XAxis type="number" stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <YAxis type="category" dataKey="name" width={150} stroke="#8884d8" tick={{ fill: '#8884d8' }} />
                    <Tooltip 
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                    <Legend />
                    <Bar dataKey="efficiency" name="性能/价格比" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="radar">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={normalizedData}>
                    <PolarGrid stroke="rgba(140, 140, 140, 0.2)" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#8884d8' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#8884d8' }} />
                    {normalizedData.map((entry, index) => (
                      <Radar
                        key={entry.name}
                        name={entry.name}
                        dataKey={(prop) => {
                          const p = prop as any;
                          return [
                            p.normalizedPerformance,
                            p.normalizedPrice,
                            p.normalizedEfficiency,
                            p.normalizedMemory,
                            p.normalizedPower
                          ][index % 5];
                        }}
                        stroke={`hsl(${index * 45}, 70%, 50%)`}
                        fill={`hsl(${index * 45}, 70%, 50%)`}
                        fillOpacity={0.2}
                      />
                    ))}
                    <Legend />
                    <Tooltip 
                      wrapperStyle={{ zIndex: 100 }}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', border: '1px solid #555' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#aaa' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </TabsContent>
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GpuComparison;

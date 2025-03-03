
import React from 'react';
import Layout from '@/components/layout/Layout';
import HostMap from '@/components/charts/HostMap';
import StatsMultiple from '@/components/charts/StatsMultiple';
import GpuComparison from '@/components/charts/GpuComparison';
import { useChartData } from '@/hooks/useChartData';
import { BarChart, PieChart, LineChart, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Charts = () => {
  const { hostMapData, statsData, gpuComparisonData, loading, lastUpdated } = useChartData();

  // Function to format the last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return '未更新';
    
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    
    if (diffSeconds < 60) {
      return `${diffSeconds}秒前`;
    } else if (diffSeconds < 3600) {
      return `${Math.floor(diffSeconds / 60)}分钟前`;
    } else {
      return `${Math.floor(diffSeconds / 3600)}小时前`;
    }
  };

  // Force refresh data
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Vast.ai 数据分析中心</h1>
            <p className="text-muted-foreground mt-1">
              实时 GPU 实例数据监控和分析
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              最后更新: <span className="font-medium">{formatLastUpdated()}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              刷新数据
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="hostmap" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="hostmap" className="flex items-center gap-1.5">
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">主机地图</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-1.5">
                <LineChart className="h-4 w-4" />
                <span className="hidden sm:inline">性能统计</span>
              </TabsTrigger>
              <TabsTrigger value="gpucompare" className="flex items-center gap-1.5">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">GPU对比</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="hostmap" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <HostMap data={hostMapData} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <StatsMultiple data={statsData} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gpucompare" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <GpuComparison data={gpuComparisonData} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              全球主机分布
            </h2>
            <HostMap data={hostMapData} loading={loading} />
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              性能统计
            </h2>
            <StatsMultiple data={statsData} loading={loading} />
          </section>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            GPU 对比分析
          </h2>
          <GpuComparison data={gpuComparisonData} loading={loading} />
        </section>
      </div>
    </Layout>
  );
};

export default Charts;

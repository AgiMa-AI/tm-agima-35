
import React from 'react';
import Layout from '@/components/layout/Layout';
import HostMap from '@/components/charts/HostMap';
import StatsMultiple from '@/components/charts/StatsMultiple';
import GpuComparison from '@/components/charts/GpuComparison';
import { useChartData } from '@/hooks/useChartData';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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
      <div className="space-y-4 p-4 bg-muted/10">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-background p-4 rounded-md shadow-sm">
          <div>
            <h1 className="text-2xl font-medium">Vast.ai 数据分析</h1>
            <p className="text-muted-foreground mt-1">
              GPU 实例数据监控和分析
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              最后更新: <span className="font-medium">{formatLastUpdated()}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 h-8"
              onClick={handleRefresh}
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              刷新
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="hostmap" className="space-y-4">
          <div className="bg-background p-4 rounded-md shadow-sm">
            <TabsList className="w-full justify-start bg-muted/20 p-1">
              <TabsTrigger value="hostmap" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                主机地图
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                性能统计
              </TabsTrigger>
              <TabsTrigger value="gpucompare" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                GPU对比
              </TabsTrigger>
              <TabsTrigger value="table" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                数据表格
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="hostmap" className="mt-0">
            <HostMap data={hostMapData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <StatsMultiple data={statsData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="gpucompare" className="mt-0">
            <GpuComparison data={gpuComparisonData} loading={loading} />
          </TabsContent>
          
          <TabsContent value="table" className="mt-0">
            <div className="bg-background rounded-md shadow-md border-0">
              <div className="p-4 bg-muted/30">
                <h3 className="text-lg font-medium">GPU 数据表格</h3>
                <p className="text-sm text-muted-foreground">详细数据列表</p>
              </div>
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>GPU 型号</TableHead>
                      <TableHead>性能分数</TableHead>
                      <TableHead>价格 (¥/小时)</TableHead>
                      <TableHead>内存 (GB)</TableHead>
                      <TableHead>功率 (W)</TableHead>
                      <TableHead>效率比</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">加载数据中...</TableCell>
                      </TableRow>
                    ) : (
                      gpuComparisonData.map((gpu) => (
                        <TableRow key={gpu.name}>
                          <TableCell className="font-medium">{gpu.name}</TableCell>
                          <TableCell>{gpu.performance}</TableCell>
                          <TableCell>{gpu.price.toFixed(2)}</TableCell>
                          <TableCell>{gpu.memory}</TableCell>
                          <TableCell>{gpu.power}</TableCell>
                          <TableCell>{gpu.efficiency.toFixed(1)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HostMap data={hostMapData} loading={loading} />
          <StatsMultiple data={statsData} loading={loading} />
        </div>

        <GpuComparison data={gpuComparisonData} loading={loading} />
      </div>
    </Layout>
  );
};

export default Charts;

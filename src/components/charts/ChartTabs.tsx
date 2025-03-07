
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HostMap from '@/components/charts/HostMap';
import StatsMultiple from '@/components/charts/StatsMultiple';
import GpuComparison from '@/components/charts/GpuComparison';
import ChartDataTables from '@/components/charts/ChartDataTables';
import { HostMapData, StatsData, GpuData } from '@/types/chartData';

interface ChartTabsProps {
  hostMapData: HostMapData[];
  statsData: StatsData[];
  gpuComparisonData: GpuData[];
  loading: boolean;
}

const ChartTabs = ({ hostMapData, statsData, gpuComparisonData, loading }: ChartTabsProps) => {
  return (
    <Tabs defaultValue="table" className="space-y-4">
      <div className="bg-background p-4 rounded-md shadow-sm">
        <TabsList className="w-full justify-start bg-muted/20 p-1">
          <TabsTrigger value="table" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            数据表格
          </TabsTrigger>
          <TabsTrigger value="hostmap" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            主机地图
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            性能统计
          </TabsTrigger>
          <TabsTrigger value="gpucompare" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            GPU对比
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="table" className="mt-0">
        <ChartDataTables 
          gpuComparisonData={gpuComparisonData}
          hostMapData={hostMapData}
          statsData={statsData}
          loading={loading}
        />
      </TabsContent>
      
      <TabsContent value="hostmap" className="mt-0">
        <HostMap data={hostMapData} loading={loading} />
      </TabsContent>
      
      <TabsContent value="stats" className="mt-0">
        <StatsMultiple data={statsData} loading={loading} />
      </TabsContent>
      
      <TabsContent value="gpucompare" className="mt-0">
        <GpuComparison data={gpuComparisonData} loading={loading} />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;

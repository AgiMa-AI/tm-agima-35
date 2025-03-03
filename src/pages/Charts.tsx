
import React from 'react';
import Layout from '@/components/layout/Layout';
import HostMap from '@/components/charts/HostMap';
import StatsMultiple from '@/components/charts/StatsMultiple';
import GpuComparison from '@/components/charts/GpuComparison';
import { useChartData } from '@/hooks/useChartData';
import { BarChart, PieChart, LineChart } from 'lucide-react';

const Charts = () => {
  const { hostMapData, statsData, gpuComparisonData, loading } = useChartData();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">数据分析图表</h1>
          <p className="text-muted-foreground mt-1">
            Vast.ai GPU 实例的详细数据分析和可视化
          </p>
        </div>

        <div className="space-y-8">
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

          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              GPU 对比分析
            </h2>
            <GpuComparison data={gpuComparisonData} loading={loading} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Charts;

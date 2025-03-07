
import React from 'react';
import Layout from '@/components/layout/Layout';
import ChartHeader from '@/components/charts/ChartHeader';
import ChartTabs from '@/components/charts/ChartTabs';
import { useChartData } from '@/hooks/useChartData';

const Charts = () => {
  const { hostMapData, statsData, gpuComparisonData, loading, lastUpdated, dataMode } = useChartData();

  // Force refresh data
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <div className="space-y-4 p-4 bg-muted/10">
        <ChartHeader 
          dataMode={dataMode} 
          lastUpdated={lastUpdated} 
          onRefresh={handleRefresh} 
        />
        
        <ChartTabs 
          hostMapData={hostMapData}
          statsData={statsData}
          gpuComparisonData={gpuComparisonData}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default Charts;

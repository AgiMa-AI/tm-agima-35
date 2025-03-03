
import { useState, useEffect } from 'react';
import { HostMapData, StatsData, GpuData } from '@/types/chartData';
import { fetchAllChartData } from '@/services/chartDataService';

export type { HostMapData, StatsData, GpuData };

export const useChartData = () => {
  const [hostMapData, setHostMapData] = useState<HostMapData[]>([]);
  const [statsData, setStatsData] = useState<StatsData[]>([]);
  const [gpuComparisonData, setGpuComparisonData] = useState<GpuData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    // Function to refresh all data
    const refreshData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { hostMapData, statsData, gpuData } = await fetchAllChartData();
        
        setHostMapData(hostMapData);
        setStatsData(statsData);
        setGpuComparisonData(gpuData);
        setLastUpdated(new Date());
        
      } catch (error) {
        console.error("Error in useChartData:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    refreshData();
    
    // Set up polling for real-time data updates (every 15 seconds)
    const intervalId = setInterval(() => {
      console.log('Polling for new data...');
      refreshData();
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    hostMapData,
    statsData,
    gpuComparisonData,
    loading,
    error,
    lastUpdated
  };
};

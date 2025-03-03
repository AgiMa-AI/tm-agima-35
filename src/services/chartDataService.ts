
import { HostMapData, StatsData, GpuData } from '@/types/chartData';
import { mockHostMapData, generateMockStatsData, mockGpuData } from '@/data/mockChartData';
import { toast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from "sonner";

/**
 * Fetches all chart data
 * Note: Now always returns mock data as per user request
 */
export const fetchAllChartData = async () => {
  console.log('Using mock data as requested...');
  
  // Use mock data directly as requested by user
  return useMockData();
};

/**
 * Function to use mock data
 */
export const useMockData = () => {
  console.log('Using mock data');
  
  return {
    hostMapData: mockHostMapData,
    statsData: generateMockStatsData(),
    gpuData: mockGpuData
  };
};

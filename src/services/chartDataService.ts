
import { HostMapData, StatsData, GpuData } from '@/types/chartData';
import { mockHostMapData, generateMockStatsData, mockGpuData } from '@/data/mockChartData';
import { toast } from '@/components/ui/use-toast';
import { toast as sonnerToast } from "sonner";

const RAW_CONTENT_URL = 'https://raw.githubusercontent.com/500farm/prometheus-vastai/main';

/**
 * Fetches host map data from the GitHub repository
 */
export const fetchHostMapData = async (): Promise<HostMapData[]> => {
  const response = await fetch(`${RAW_CONTENT_URL}/data/hosts.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch host map data: ${response.statusText}`);
  }
  const rawData = await response.json();
  
  return rawData.map((host: any) => ({
    name: host.name || `Host ${host.id || 'Unknown'}`,
    location: host.location || 'Unknown',
    lat: host.latitude || 0,
    lng: host.longitude || 0,
    gpuCount: host.gpu_count || 0,
    availableGpus: host.available_gpus || 0,
    performance: host.performance || 0
  }));
};

/**
 * Fetches stats data from the GitHub repository
 */
export const fetchStatsData = async (): Promise<StatsData[]> => {
  const response = await fetch(`${RAW_CONTENT_URL}/data/stats.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stats data: ${response.statusText}`);
  }
  const rawData = await response.json();
  
  return rawData.map((stat: any) => ({
    timestamp: stat.timestamp || new Date().toISOString(),
    gpuUtilization: stat.gpu_utilization || 0,
    memoryUsage: stat.memory_usage || 0,
    temperature: stat.temperature || 0,
    power: stat.power || 0,
    price: stat.price || 0
  }));
};

/**
 * Fetches GPU comparison data from the GitHub repository
 */
export const fetchGpuData = async (): Promise<GpuData[]> => {
  const response = await fetch(`${RAW_CONTENT_URL}/data/gpus.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch GPU data: ${response.statusText}`);
  }
  const rawData = await response.json();
  
  return rawData.map((gpu: any) => ({
    name: gpu.name || 'Unknown GPU',
    performance: gpu.performance || 0,
    price: gpu.price || 0,
    efficiency: gpu.efficiency || 0,
    memory: gpu.memory || 0,
    power: gpu.power || 0
  }));
};

/**
 * Fetches all chart data from the GitHub repository
 */
export const fetchAllChartData = async () => {
  try {
    console.log('Fetching all data from GitHub repository...');
    
    const [hostMapData, statsData, gpuData] = await Promise.all([
      fetchHostMapData(),
      fetchStatsData(),
      fetchGpuData()
    ]);
    
    console.log('Data fetched successfully');
    return { hostMapData, statsData, gpuData };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    
    // Show error toast
    toast({
      variant: "destructive",
      title: "数据获取失败",
      description: "无法从GitHub仓库获取数据，请稍后再试",
    });
    
    // Use mock data as fallback
    return useMockData();
  }
};

/**
 * Fallback function to use mock data when API calls fail
 */
export const useMockData = () => {
  console.log('Using mock data as fallback');
  
  // Show toast notification
  sonnerToast("使用模拟数据", {
    description: "无法连接到实时数据源，已切换到模拟数据"
  });
  
  return {
    hostMapData: mockHostMapData,
    statsData: generateMockStatsData(),
    gpuData: mockGpuData
  };
};

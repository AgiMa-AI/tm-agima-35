
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Host map data interface
export interface HostMapData {
  name: string;
  location: string;
  lat: number;
  lng: number;
  gpuCount: number;
  availableGpus: number;
  performance: number;
}

// Stats data interface
export interface StatsData {
  timestamp: string;
  gpuUtilization: number;
  memoryUsage: number;
  temperature: number;
  power: number;
  price: number;
}

// GPU comparison data interface
export interface GpuData {
  name: string;
  performance: number;
  price: number;
  efficiency: number;
  memory: number;
  power: number;
}

// GitHub API response shape (simplified)
interface GitHubApiResponse {
  hosts?: any[];
  stats?: any[];
  gpus?: any[];
  // Add other fields as needed
}

export const useChartData = () => {
  const [hostMapData, setHostMapData] = useState<HostMapData[]>([]);
  const [statsData, setStatsData] = useState<StatsData[]>([]);
  const [gpuComparisonData, setGpuComparisonData] = useState<GpuData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch data from the GitHub repository
    const fetchDataFromGitHub = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching data from GitHub repository...');
        
        // In a real implementation, you would make a fetch request to the GitHub API
        // or to your backend that fetches data from the GitHub repository
        // For now, we'll simulate this with a timeout and mock data
        
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock response from GitHub API
        const mockGitHubResponse: GitHubApiResponse = {
          // This would be real data from the GitHub repository
          // For now, we're using mock data
        };
        
        // Process host map data
        const mockHostMapData: HostMapData[] = [
          {
            name: "US East Node Cluster",
            location: "US-East",
            lat: 40.7128,
            lng: -74.0060,
            gpuCount: 24,
            availableGpus: 14,
            performance: 92
          },
          {
            name: "Europe West Datacenter",
            location: "Europe-West",
            lat: 48.8566,
            lng: 2.3522,
            gpuCount: 18,
            availableGpus: 7,
            performance: 88
          },
          {
            name: "Asia Pacific Hub",
            location: "Asia-East",
            lat: 22.3193,
            lng: 114.1694,
            gpuCount: 32,
            availableGpus: 12,
            performance: 95
          },
          {
            name: "Australia Server Farm",
            location: "Australia",
            lat: -33.8688,
            lng: 151.2093,
            gpuCount: 12,
            availableGpus: 5,
            performance: 90
          },
          {
            name: "US West Cluster",
            location: "US-West",
            lat: 37.7749,
            lng: -122.4194,
            gpuCount: 20,
            availableGpus: 8,
            performance: 94
          }
        ];
        
        // Process stats data (time series)
        const now = new Date();
        const mockStatsData: StatsData[] = Array.from({ length: 24 }, (_, i) => {
          const time = new Date(now);
          time.setHours(time.getHours() - 23 + i);
          
          // Add some randomness to make the data look more realistic
          // Use a sine wave pattern for more realistic time-based fluctuations
          const hourFactor = Math.sin((i / 24) * Math.PI * 2);
          
          return {
            timestamp: time.toISOString(),
            gpuUtilization: 50 + hourFactor * 30 + Math.random() * 10,
            memoryUsage: 40 + hourFactor * 20 + Math.random() * 15,
            temperature: 60 + hourFactor * 10 + Math.random() * 5,
            power: 200 + hourFactor * 50 + Math.random() * 20,
            price: 0.40 + hourFactor * 0.15 + Math.random() * 0.1
          };
        });
        
        // Process GPU comparison data
        const mockGpuData: GpuData[] = [
          {
            name: "NVIDIA RTX 4090",
            performance: 95,
            price: 0.95,
            efficiency: 100,
            memory: 24,
            power: 450
          },
          {
            name: "NVIDIA A100",
            performance: 98,
            price: 2.75,
            efficiency: 35.6,
            memory: 80,
            power: 400
          },
          {
            name: "NVIDIA RTX 3080",
            performance: 78,
            price: 0.42,
            efficiency: 185.7,
            memory: 10,
            power: 320
          },
          {
            name: "NVIDIA RTX 3090",
            performance: 85,
            price: 0.65,
            efficiency: 130.8,
            memory: 24,
            power: 350
          },
          {
            name: "NVIDIA Tesla T4",
            performance: 72,
            price: 0.52,
            efficiency: 138.5,
            memory: 16,
            power: 70
          }
        ];
        
        // Add some randomness to make the data appear more "real-time"
        const updatedGpuData = mockGpuData.map(gpu => ({
          ...gpu,
          performance: Math.min(100, gpu.performance + (Math.random() * 4 - 2)),
          price: Math.max(0.1, gpu.price + (Math.random() * 0.1 - 0.05)),
          power: Math.max(10, gpu.power + (Math.random() * 10 - 5))
        }));
        
        setHostMapData(mockHostMapData);
        setStatsData(mockStatsData);
        setGpuComparisonData(updatedGpuData);
        console.log('Data fetched successfully');
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to fetch data. Please try again later.");
        toast({
          variant: "destructive",
          title: "数据获取失败",
          description: "无法从GitHub仓库获取数据，请稍后再试",
        });
      } finally {
        setLoading(false);
      }
    };
    
    // Initial fetch
    fetchDataFromGitHub();
    
    // Set up polling for real-time data updates (every 30 seconds)
    const intervalId = setInterval(() => {
      console.log('Polling for new data...');
      fetchDataFromGitHub();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    hostMapData,
    statsData,
    gpuComparisonData,
    loading,
    error
  };
};

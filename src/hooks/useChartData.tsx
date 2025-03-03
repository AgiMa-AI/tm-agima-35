
import { useState, useEffect } from 'react';

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

export const useChartData = () => {
  const [hostMapData, setHostMapData] = useState<HostMapData[]>([]);
  const [statsData, setStatsData] = useState<StatsData[]>([]);
  const [gpuComparisonData, setGpuComparisonData] = useState<GpuData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls to your backend
        // or directly to the GitHub repo you mentioned
        
        // Mock host map data
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
        
        // Mock stats data (time series)
        const now = new Date();
        const mockStatsData: StatsData[] = Array.from({ length: 24 }, (_, i) => {
          const time = new Date(now);
          time.setHours(time.getHours() - 23 + i);
          
          return {
            timestamp: time.toISOString(),
            gpuUtilization: 30 + Math.random() * 60,
            memoryUsage: 20 + Math.random() * 70,
            temperature: 50 + Math.random() * 20,
            power: 150 + Math.random() * 100,
            price: 0.25 + Math.random() * 0.5
          };
        });
        
        // Mock GPU comparison data
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
        
        setHostMapData(mockHostMapData);
        setStatsData(mockStatsData);
        setGpuComparisonData(mockGpuData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Set up polling for real-time data updates (every 1 minute)
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return {
    hostMapData,
    statsData,
    gpuComparisonData,
    loading
  };
};

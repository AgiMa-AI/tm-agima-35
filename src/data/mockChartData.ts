import { HostMapData, StatsData, GpuData } from '@/types/chartData';

// Mock host map data with more global distribution
export const mockHostMapData: HostMapData[] = [
  // 北美
  {
    name: "US East Node Cluster",
    location: "New York, USA",
    lat: 40.7128,
    lng: -74.0060,
    gpuCount: 24,
    availableGpus: 14,
    performance: 92
  },
  {
    name: "US West Datacenter",
    location: "San Francisco, USA",
    lat: 37.7749,
    lng: -122.4194,
    gpuCount: 20,
    availableGpus: 8,
    performance: 94
  },
  {
    name: "Canada Datacenter",
    location: "Toronto, Canada",
    lat: 43.6532,
    lng: -79.3832,
    gpuCount: 16,
    availableGpus: 6,
    performance: 89
  },
  
  // 欧洲
  {
    name: "Europe West Datacenter",
    location: "Paris, France",
    lat: 48.8566,
    lng: 2.3522,
    gpuCount: 18,
    availableGpus: 7,
    performance: 88
  },
  {
    name: "UK GPU Cluster",
    location: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    gpuCount: 15,
    availableGpus: 5,
    performance: 91
  },
  {
    name: "Germany Compute Center",
    location: "Berlin, Germany",
    lat: 52.5200,
    lng: 13.4050,
    gpuCount: 22,
    availableGpus: 9,
    performance: 93
  },
  
  // 亚洲
  {
    name: "Asia Pacific Hub",
    location: "Hong Kong",
    lat: 22.3193,
    lng: 114.1694,
    gpuCount: 32,
    availableGpus: 12,
    performance: 95
  },
  {
    name: "Japan Node Cluster",
    location: "Tokyo, Japan",
    lat: 35.6762,
    lng: 139.6503,
    gpuCount: 28,
    availableGpus: 10,
    performance: 97
  },
  {
    name: "Singapore GPU Farm",
    location: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    gpuCount: 26,
    availableGpus: 11,
    performance: 96
  },
  {
    name: "China Mainland Cluster",
    location: "Shanghai, China",
    lat: 31.2304,
    lng: 121.4737,
    gpuCount: 30,
    availableGpus: 6,
    performance: 94
  },
  
  // 大洋洲
  {
    name: "Australia Server Farm",
    location: "Sydney, Australia",
    lat: -33.8688,
    lng: 151.2093,
    gpuCount: 12,
    availableGpus: 5,
    performance: 90
  },
  
  // 南美
  {
    name: "Brazil Node Cluster",
    location: "São Paulo, Brazil",
    lat: -23.5505,
    lng: -46.6333,
    gpuCount: 14,
    availableGpus: 4,
    performance: 87
  },
  
  // 印度
  {
    name: "India Compute Farm",
    location: "Mumbai, India",
    lat: 19.0760,
    lng: 72.8777,
    gpuCount: 18,
    availableGpus: 7,
    performance: 89
  }
];

// Generate mock stats data (time series)
export const generateMockStatsData = (): StatsData[] => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const time = new Date(now);
    time.setHours(time.getHours() - 23 + i);
    
    // Add some randomness to make the data look more realistic
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
};

// Mock GPU comparison data
export const mockGpuData: GpuData[] = [
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

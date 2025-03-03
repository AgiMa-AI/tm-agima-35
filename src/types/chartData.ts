
// Chart data type definitions

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

// GitHub API response shape
export interface GitHubApiResponse {
  hosts?: any[];
  stats?: any[];
  gpus?: any[];
}


export interface GPUInstance {
  id: string;
  name: string;
  gpuModel: string;
  gpuMemory: number;
  cpuCores: number;
  ramSize: number;
  storageSize: number;
  price: number;
  location: string;
  availability: 'available' | 'rented' | 'offline';
  performance: number; // Performance score 1-100
  image: string;
  specs: {
    [key: string]: string | number;
  };
  // Add daily price for leasing by day
  dailyPrice?: number;
}

export const instances: GPUInstance[] = [
  {
    id: "inst-1",
    name: "High-Performance RTX Node",
    gpuModel: "NVIDIA RTX 4090",
    gpuMemory: 24,
    cpuCores: 24,
    ramSize: 128,
    storageSize: 2000,
    price: 0.95,
    dailyPrice: 21.5, // Daily price (hourly * 24 with some discount)
    location: "US-East",
    availability: "available",
    performance: 95,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 16384,
      "Tensor Cores": 512,
      "Base Clock": "2.23 GHz",
      "Boost Clock": "2.52 GHz",
      "Power Usage": 450,
      "OS": "Ubuntu 22.04",
      "Bandwidth": "10 Gbps"
    }
  },
  {
    id: "inst-2",
    name: "ML Optimized Server",
    gpuModel: "NVIDIA A100",
    gpuMemory: 80,
    cpuCores: 64,
    ramSize: 512,
    storageSize: 4000,
    price: 2.75,
    location: "US-West",
    availability: "available",
    performance: 98,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 6912,
      "Tensor Cores": 432,
      "Base Clock": "1.41 GHz",
      "Boost Clock": "1.73 GHz",
      "Power Usage": 400,
      "OS": "Ubuntu 20.04",
      "Bandwidth": "25 Gbps"
    }
  },
  {
    id: "inst-3",
    name: "Budget Training Node",
    gpuModel: "NVIDIA RTX 3080",
    gpuMemory: 10,
    cpuCores: 12,
    ramSize: 64,
    storageSize: 1000,
    price: 0.42,
    location: "Europe-West",
    availability: "rented",
    performance: 78,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 8704,
      "Tensor Cores": 272,
      "Base Clock": "1.44 GHz",
      "Boost Clock": "1.71 GHz",
      "Power Usage": 320,
      "OS": "Ubuntu 20.04",
      "Bandwidth": "5 Gbps"
    }
  },
  {
    id: "inst-4",
    name: "Multi-GPU Workstation",
    gpuModel: "2x NVIDIA RTX 3090",
    gpuMemory: 24,
    cpuCores: 32,
    ramSize: 256,
    storageSize: 2000,
    price: 1.85,
    location: "Asia-East",
    availability: "available",
    performance: 92,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 20480,
      "Tensor Cores": 640,
      "Base Clock": "1.70 GHz",
      "Boost Clock": "1.95 GHz",
      "Power Usage": 700,
      "OS": "Ubuntu 22.04",
      "Bandwidth": "20 Gbps"
    }
  },
  {
    id: "inst-5",
    name: "Entry Level Node",
    gpuModel: "NVIDIA RTX 3060",
    gpuMemory: 12,
    cpuCores: 8,
    ramSize: 32,
    storageSize: 500,
    price: 0.23,
    location: "US-Central",
    availability: "available",
    performance: 62,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 3584,
      "Tensor Cores": 112,
      "Base Clock": "1.32 GHz",
      "Boost Clock": "1.78 GHz",
      "Power Usage": 170,
      "OS": "Ubuntu 20.04",
      "Bandwidth": "2 Gbps"
    }
  },
  {
    id: "inst-6",
    name: "Professional Inference Server",
    gpuModel: "NVIDIA Tesla T4",
    gpuMemory: 16,
    cpuCores: 16,
    ramSize: 64,
    storageSize: 1000,
    price: 0.52,
    location: "Europe-North",
    availability: "available",
    performance: 72,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 2560,
      "Tensor Cores": 320,
      "Base Clock": "0.58 GHz",
      "Boost Clock": "1.59 GHz",
      "Power Usage": 70,
      "OS": "Ubuntu 20.04",
      "Bandwidth": "8 Gbps"
    }
  },
  {
    id: "inst-7",
    name: "Enterprise Cluster Node",
    gpuModel: "NVIDIA A10",
    gpuMemory: 24,
    cpuCores: 24,
    ramSize: 128,
    storageSize: 2000,
    price: 1.15,
    location: "Australia",
    availability: "offline",
    performance: 85,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 9216,
      "Tensor Cores": 288,
      "Base Clock": "1.20 GHz",
      "Boost Clock": "1.71 GHz",
      "Power Usage": 150,
      "OS": "Ubuntu 22.04",
      "Bandwidth": "15 Gbps"
    }
  },
  {
    id: "inst-8",
    name: "Research Compute Node",
    gpuModel: "4x NVIDIA A40",
    gpuMemory: 48,
    cpuCores: 128,
    ramSize: 1024,
    storageSize: 8000,
    price: 5.75,
    location: "US-East",
    availability: "available",
    performance: 99,
    image: "/placeholder.svg",
    specs: {
      "CUDA Cores": 40960,
      "Tensor Cores": 1280,
      "Base Clock": "1.74 GHz",
      "Boost Clock": "1.86 GHz",
      "Power Usage": 1200,
      "OS": "Ubuntu 22.04",
      "Bandwidth": "40 Gbps"
    }
  }
];

// Helper function to filter instances
export const filterInstances = (
  instances: GPUInstance[],
  filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    gpuModel?: string[];
    minGpuMemory?: number;
    minCpuCores?: number;
    minRamSize?: number;
    minStorageSize?: number;
    location?: string[];
    availability?: ('available' | 'rented' | 'offline')[];
    minPerformance?: number;
  }
) => {
  return instances.filter(instance => {
    // Search filter
    if (filters.search && !instance.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !instance.gpuModel.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice !== undefined && instance.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && instance.price > filters.maxPrice) return false;
    
    // GPU model filter
    if (filters.gpuModel && filters.gpuModel.length > 0 && 
        !filters.gpuModel.some(model => instance.gpuModel.includes(model))) {
      return false;
    }
    
    // Min GPU memory filter
    if (filters.minGpuMemory !== undefined && instance.gpuMemory < filters.minGpuMemory) return false;
    
    // Min CPU cores filter
    if (filters.minCpuCores !== undefined && instance.cpuCores < filters.minCpuCores) return false;
    
    // Min RAM size filter
    if (filters.minRamSize !== undefined && instance.ramSize < filters.minRamSize) return false;
    
    // Min storage size filter
    if (filters.minStorageSize !== undefined && instance.storageSize < filters.minStorageSize) return false;
    
    // Location filter
    if (filters.location && filters.location.length > 0 && 
        !filters.location.includes(instance.location)) {
      return false;
    }
    
    // Availability filter
    if (filters.availability && filters.availability.length > 0 && 
        !filters.availability.includes(instance.availability)) {
      return false;
    }
    
    // Min performance filter
    if (filters.minPerformance !== undefined && instance.performance < filters.minPerformance) return false;
    
    return true;
  });
};

// Get unique values for filters
export const getUniqueLocations = (instances: GPUInstance[]): string[] => {
  return [...new Set(instances.map(instance => instance.location))];
};

export const getUniqueGpuModels = (instances: GPUInstance[]): string[] => {
  return [...new Set(instances.map(instance => instance.gpuModel))];
};

export const getPriceRange = (instances: GPUInstance[]): [number, number] => {
  const prices = instances.map(instance => instance.price);
  return [Math.min(...prices), Math.max(...prices)];
};

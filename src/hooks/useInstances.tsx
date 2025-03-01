
import { useState, useEffect, useMemo } from 'react';
import { instances, filterInstances, GPUInstance } from '../data/instances';

interface InstanceFilters {
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

export const useInstances = (initialFilters: InstanceFilters = {}) => {
  const [filters, setFilters] = useState<InstanceFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply filters to instances
  const filteredInstances = useMemo(() => {
    return filterInstances(instances, filters);
  }, [filters]);
  
  // Get a specific instance by ID
  const getInstance = (id: string): GPUInstance | undefined => {
    return instances.find(instance => instance.id === id);
  };
  
  // Update filters
  const updateFilters = (newFilters: Partial<InstanceFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({});
  };
  
  // Get available filter options
  const filterOptions = useMemo(() => {
    return {
      locations: [...new Set(instances.map(instance => instance.location))],
      gpuModels: [...new Set(instances.map(instance => instance.gpuModel))],
      priceRange: [
        Math.min(...instances.map(instance => instance.price)),
        Math.max(...instances.map(instance => instance.price))
      ],
      availabilityOptions: ['available', 'rented', 'offline'] as const
    };
  }, []);
  
  return {
    instances: filteredInstances,
    filters,
    updateFilters,
    resetFilters,
    loading,
    getInstance,
    filterOptions,
    totalCount: instances.length,
    filteredCount: filteredInstances.length
  };
};

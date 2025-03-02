
import { useState, useEffect, useMemo } from 'react';
import { instances, filterInstances, GPUInstance } from '../data/instances';
import { toast } from '@/components/ui/use-toast';

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

interface RentalInfo {
  instanceId: string;
  startTime: Date;
  endTime?: Date;
  totalCost: number;
  status: 'active' | 'completed' | 'cancelled';
}

export const useInstances = (initialFilters: InstanceFilters = {}) => {
  const [filters, setFilters] = useState<InstanceFilters>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [rentedInstances, setRentedInstances] = useState<RentalInfo[]>([]);
  const [favoriteInstanceIds, setFavoriteInstanceIds] = useState<string[]>([]);
  
  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load from localStorage on init
  useEffect(() => {
    const loadedFavorites = localStorage.getItem('favoriteInstances');
    if (loadedFavorites) {
      try {
        setFavoriteInstanceIds(JSON.parse(loadedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites:', e);
      }
    }
    
    const loadedRentals = localStorage.getItem('rentedInstances');
    if (loadedRentals) {
      try {
        const parsedRentals = JSON.parse(loadedRentals);
        // Convert string dates back to Date objects
        const rentalsWithDates = parsedRentals.map((rental: any) => ({
          ...rental,
          startTime: new Date(rental.startTime),
          endTime: rental.endTime ? new Date(rental.endTime) : undefined
        }));
        setRentedInstances(rentalsWithDates);
      } catch (e) {
        console.error('Failed to parse rentals:', e);
      }
    }
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
  
  // Toggle favorite status for an instance
  const toggleFavorite = (instanceId: string) => {
    setFavoriteInstanceIds(prev => {
      const newFavorites = prev.includes(instanceId)
        ? prev.filter(id => id !== instanceId)
        : [...prev, instanceId];
      
      localStorage.setItem('favoriteInstances', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  
  // Check if an instance is favorited
  const isFavorite = (instanceId: string) => {
    return favoriteInstanceIds.includes(instanceId);
  };
  
  // Rent an instance
  const rentInstance = (instance: GPUInstance, hours: number = 1) => {
    if (instance.availability !== 'available') {
      toast({
        variant: "destructive",
        title: "租用失败",
        description: "该实例当前不可用"
      });
      return false;
    }
    
    const startTime = new Date();
    const totalCost = instance.price * hours;
    
    const rentalInfo: RentalInfo = {
      instanceId: instance.id,
      startTime,
      totalCost,
      status: 'active'
    };
    
    setRentedInstances(prev => {
      const updated = [...prev, rentalInfo];
      localStorage.setItem('rentedInstances', JSON.stringify(updated));
      return updated;
    });
    
    toast({
      title: "租用成功",
      description: `您已成功租用 ${instance.name}，费用 ¥${totalCost.toFixed(2)}`
    });
    
    return true;
  };
  
  // Get active rentals
  const getActiveRentals = () => {
    return rentedInstances.filter(rental => rental.status === 'active');
  };
  
  // Get rental history
  const getRentalHistory = () => {
    return rentedInstances.filter(rental => rental.status !== 'active');
  };
  
  // End a rental
  const endRental = (instanceId: string) => {
    setRentedInstances(prev => {
      const updated = prev.map(rental => 
        rental.instanceId === instanceId && rental.status === 'active' 
          ? {
              ...rental,
              endTime: new Date(),
              status: 'completed' as const
            }
          : rental
      );
      
      localStorage.setItem('rentedInstances', JSON.stringify(updated));
      return updated;
    });
    
    toast({
      title: "租用已结束",
      description: "实例已成功归还"
    });
  };
  
  // Get available filter options with priceRange as [number, number]
  const filterOptions = useMemo(() => {
    const minPrice = Math.min(...instances.map(instance => instance.price));
    const maxPrice = Math.max(...instances.map(instance => instance.price));
    
    return {
      locations: [...new Set(instances.map(instance => instance.location))],
      gpuModels: [...new Set(instances.map(instance => instance.gpuModel))],
      priceRange: [minPrice, maxPrice] as [number, number],
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
    filteredCount: filteredInstances.length,
    toggleFavorite,
    isFavorite,
    favoriteInstanceIds,
    rentInstance,
    rentedInstances,
    getActiveRentals,
    getRentalHistory,
    endRental
  };
};

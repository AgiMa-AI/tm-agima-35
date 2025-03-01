
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  availableFilters: {
    locations: string[];
    gpuModels: string[];
    priceRange: [number, number];
    availabilityOptions: readonly ['available', 'rented', 'offline'];
  };
  activeFilters: {
    minPrice?: number;
    maxPrice?: number;
    gpuModel?: string[];
    location?: string[];
    availability?: ('available' | 'rented' | 'offline')[];
    minPerformance?: number;
  };
  onFilterChange: (filters: any) => void;
  onFilterReset: () => void;
}

const FilterBar = ({
  availableFilters,
  activeFilters,
  onFilterChange,
  onFilterReset
}: FilterBarProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    activeFilters.minPrice || availableFilters.priceRange[0],
    activeFilters.maxPrice || availableFilters.priceRange[1]
  ]);
  
  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    onFilterChange({
      minPrice: newRange[0],
      maxPrice: newRange[1]
    });
  };
  
  const handleGpuModelChange = (value: string, checked: boolean) => {
    const currentModels = activeFilters.gpuModel || [];
    const newModels = checked
      ? [...currentModels, value]
      : currentModels.filter(model => model !== value);
    
    onFilterChange({ gpuModel: newModels.length > 0 ? newModels : undefined });
  };
  
  const handleLocationChange = (value: string, checked: boolean) => {
    const currentLocations = activeFilters.location || [];
    const newLocations = checked
      ? [...currentLocations, value]
      : currentLocations.filter(location => location !== value);
    
    onFilterChange({ location: newLocations.length > 0 ? newLocations : undefined });
  };
  
  const handleAvailabilityChange = (value: 'available' | 'rented' | 'offline', checked: boolean) => {
    const currentAvailability = activeFilters.availability || [];
    const newAvailability = checked
      ? [...currentAvailability, value]
      : currentAvailability.filter(status => status !== value);
    
    onFilterChange({ availability: newAvailability.length > 0 ? newAvailability : undefined });
  };
  
  const handlePerformanceChange = (value: number[]) => {
    onFilterChange({ minPerformance: value[0] });
  };
  
  const hasActiveFilters = () => {
    return (
      activeFilters.minPrice !== undefined ||
      activeFilters.maxPrice !== undefined ||
      (activeFilters.gpuModel && activeFilters.gpuModel.length > 0) ||
      (activeFilters.location && activeFilters.location.length > 0) ||
      (activeFilters.availability && activeFilters.availability.length > 0) ||
      activeFilters.minPerformance !== undefined
    );
  };
  
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 bg-white/50 backdrop-blur-sm p-4 rounded-lg border mb-6 animate-scale-in">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        <div className="flex items-center space-x-2 text-muted-foreground mb-2 md:mb-0">
          <Filter className="h-4 w-4" />
          <span className="text-sm">Filters</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Price Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Price
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Price Range</h4>
                <div className="space-y-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={availableFilters.priceRange[1] * 1.1}
                    min={availableFilters.priceRange[0]}
                    step={0.01}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm">${priceRange[0].toFixed(2)}</p>
                    <p className="text-sm">${priceRange[1].toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* GPU Model Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                GPU Model
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-medium">GPU Models</h4>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {availableFilters.gpuModels.map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <Checkbox
                        id={`gpu-${model}`}
                        checked={(activeFilters.gpuModel || []).includes(model)}
                        onCheckedChange={(checked) => 
                          handleGpuModelChange(model, checked === true)
                        }
                      />
                      <Label htmlFor={`gpu-${model}`}>{model}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Location Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Location
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Locations</h4>
                <div className="space-y-2">
                  {availableFilters.locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={(activeFilters.location || []).includes(location)}
                        onCheckedChange={(checked) => 
                          handleLocationChange(location, checked === true)
                        }
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Availability Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Availability
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Availability Status</h4>
                <div className="space-y-2">
                  {availableFilters.availabilityOptions.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={(activeFilters.availability || []).includes(status)}
                        onCheckedChange={(checked) => 
                          handleAvailabilityChange(status, checked === true)
                        }
                      />
                      <Label htmlFor={`status-${status}`} className="capitalize">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Performance Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Performance
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h4 className="font-medium">Minimum Performance</h4>
                <div className="space-y-2">
                  <Slider
                    defaultValue={[activeFilters.minPerformance || 0]}
                    max={100}
                    min={0}
                    step={1}
                    onValueChange={handlePerformanceChange}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Min: {activeFilters.minPerformance || 0}</p>
                    <p className="text-sm">Max: 100</p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {hasActiveFilters() && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 md:mt-0"
          onClick={onFilterReset}
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;

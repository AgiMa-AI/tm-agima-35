import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { FilterRecord } from '@/hooks/useAGIModels';

interface FilterOption {
  label: string;
  options: { value: string; label: string }[];
}

interface AGIFilterBarProps {
  availableFilters: Record<string, FilterOption>;
  activeFilters: Record<string, string[] | undefined>;
  onFilterChange: (filters: FilterRecord) => void;
  onFilterReset: () => void;
}

const AGIFilterBar = ({
  availableFilters,
  activeFilters,
  onFilterChange,
  onFilterReset
}: AGIFilterBarProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleToggleFilter = (category: string, value: string) => {
    const currentFilters = [...(activeFilters[category] || [])];
    const valueIndex = currentFilters.indexOf(value);
    
    if (valueIndex >= 0) {
      currentFilters.splice(valueIndex, 1);
    } else {
      currentFilters.push(value);
    }
    
    onFilterChange({
      ...activeFilters,
      [category]: currentFilters.length ? currentFilters : undefined
    });
  };
  
  const handleRemoveFilter = (category: string, value: string) => {
    const currentFilters = [...(activeFilters[category] || [])];
    const valueIndex = currentFilters.indexOf(value);
    
    if (valueIndex >= 0) {
      currentFilters.splice(valueIndex, 1);
      
      onFilterChange({
        ...activeFilters,
        [category]: currentFilters.length ? currentFilters : undefined
      });
    }
  };
  
  const activeFilterCount = Object.values(activeFilters)
    .filter(values => values && values.length)
    .flat().length;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => setExpanded(!expanded)}
        >
          <Filter className="w-4 h-4 mr-2" />
          筛选
          {activeFilterCount > 0 && (
            <Badge className="ml-2" variant="secondary">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilterReset}
            className="text-muted-foreground"
          >
            清除全部
          </Button>
        )}
        
        {/* 活跃筛选条件显示 */}
        <div className="flex flex-wrap gap-2 mt-2 w-full md:w-auto md:mt-0">
          {Object.entries(activeFilters).map(([category, values]) => 
            values && values.map(value => {
              const filterOption = availableFilters[category];
              const option = filterOption?.options.find(o => o.value === value);
              
              return (
                <Badge key={`${category}-${value}`} variant="outline" className="pl-2">
                  {filterOption?.label}: {option?.label || value}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1"
                    onClick={() => handleRemoveFilter(category, value)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              );
            })
          )}
        </div>
      </div>
      
      {expanded && (
        <Card className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(availableFilters).map(([category, { label, options }]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium">{label}</h3>
                <div className="flex flex-wrap gap-2">
                  {options.map(option => {
                    const isActive = activeFilters[category]?.includes(option.value);
                    
                    return (
                      <Badge
                        key={option.value}
                        variant={isActive ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleToggleFilter(category, option.value)}
                      >
                        {option.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AGIFilterBar;

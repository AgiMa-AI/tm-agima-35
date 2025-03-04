
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface AGIModelFiltersProps {
  availableFilters: Record<string, string[]>;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string, checked: boolean) => void;
}

const AGIModelFilters: React.FC<AGIModelFiltersProps> = ({
  availableFilters,
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>筛选条件</CardTitle>
        <CardDescription>选择您希望筛选的模型属性</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(availableFilters).map(([filterType, values]) => (
            <div key={filterType}>
              <h3 className="text-sm font-medium mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
              <div className="space-y-1">
                {values.map(value => (
                  <label key={value} className="flex items-center space-x-2">
                    <Input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={selectedFilters[filterType]?.includes(value) || false}
                      onChange={(e) => onFilterChange(filterType, value, e.target.checked)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AGIModelFilters;

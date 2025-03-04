
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

interface AGIModelToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterToggle: () => void;
}

const AGIModelToolbar: React.FC<AGIModelToolbarProps> = ({
  searchTerm,
  onSearchChange,
  onFilterToggle,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索模型..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Button variant="outline" className="mt-4 md:mt-0" onClick={onFilterToggle}>
        <Filter className="mr-2 h-4 w-4" />
        筛选
      </Button>
    </div>
  );
};

export default AGIModelToolbar;

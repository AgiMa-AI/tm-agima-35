
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { SortField, SortDirection } from './FileExplorer';
import { useIsMobile } from '@/hooks/use-mobile';

interface FileSortControlsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortFieldChange: (field: string) => void;
  onToggleSortDirection: () => void;
  className?: string;
}

const FileSortControls: React.FC<FileSortControlsProps> = ({
  sortField,
  sortDirection,
  onSortFieldChange,
  onToggleSortDirection,
  className = ''
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col w-full' : 'items-center'} gap-2 ${className}`}>
      <div className={`flex items-center ${isMobile ? 'w-full' : ''}`}>
        <span className="text-sm font-medium mr-2">排序方式：</span>
        <Select value={sortField} onValueChange={onSortFieldChange}>
          <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[180px]'} touch-friendly`}>
            <SelectValue placeholder="选择排序字段" />
          </SelectTrigger>
          <SelectContent className="touch-friendly">
            <SelectItem value="name">名称</SelectItem>
            <SelectItem value="size">大小</SelectItem>
            <SelectItem value="lastModified">修改日期</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">排序顺序：</span>
        <div className="flex gap-2">
          <Button
            variant={sortDirection === 'asc' ? 'default' : 'outline'}
            size="sm"
            className="touch-friendly"
            onClick={() => sortDirection !== 'asc' && onToggleSortDirection()}
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            升序
          </Button>
          <Button
            variant={sortDirection === 'desc' ? 'default' : 'outline'}
            size="sm"
            className="touch-friendly"
            onClick={() => sortDirection !== 'desc' && onToggleSortDirection()}
          >
            <ArrowDown className="h-4 w-4 mr-1" />
            降序
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileSortControls;

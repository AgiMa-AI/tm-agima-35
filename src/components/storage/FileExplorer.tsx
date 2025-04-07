
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import FileUploader from './FileUploader';
import FileTable from './FileTable';
import { StorageItem } from '@/types/storage';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface FileExplorerProps {
  currentPath: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItems: StorageItem[];
  navigateUp: () => void;
  navigateToFolder: (folderPath: string) => void;
  simulateUpload: () => void;
  isUploading: boolean;
  uploadProgress: number;
  formatFileSize: (bytes: number) => string;
}

export type SortField = 'name' | 'size' | 'lastModified';
export type SortDirection = 'asc' | 'desc';

const FileExplorer: React.FC<FileExplorerProps> = ({
  currentPath,
  searchQuery,
  setSearchQuery,
  filteredItems,
  navigateUp,
  navigateToFolder,
  simulateUpload,
  isUploading,
  uploadProgress,
  formatFileSize
}) => {
  const isMobile = useIsMobile();
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSortFieldChange = (value: string) => {
    const field = value as SortField;
    setSortField(field);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    // Always put folders first, regardless of sort field
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;

    // Then sort by the selected field
    switch (sortField) {
      case 'name':
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'size':
        return sortDirection === 'asc'
          ? a.size - b.size
          : b.size - a.size;
      case 'lastModified':
        return sortDirection === 'asc'
          ? new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
          : new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      default:
        return 0;
    }
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">文件存储</h2>
          <p className="text-sm text-muted-foreground">管理和组织您的文件</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={navigateUp} disabled={currentPath === '/'}>
            上级目录
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigateToFolder('/')}>
            根目录
          </Button>
          <Button size="sm" onClick={simulateUpload} disabled={isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            上传
          </Button>
        </div>
      </div>

      <FileUploader isUploading={isUploading} uploadProgress={uploadProgress} />
      
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'} mb-4 ${isMobile ? 'gap-3' : ''}`}>
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium">当前路径:</p>
          <p className="text-sm text-muted-foreground font-mono">{currentPath}</p>
        </div>
        <div className={`relative ${isMobile ? 'w-full' : 'w-64'}`}>
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文件..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-2 mb-4`}>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">排序方式：</span>
          <Select value={sortField} onValueChange={handleSortFieldChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择排序字段" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">名称</SelectItem>
              <SelectItem value="size">大小</SelectItem>
              <SelectItem value="lastModified">修改日期</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSortDirection}
          className="ml-1"
        >
          {sortDirection === 'asc' ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <FileTable 
        items={sortedItems}
        currentPath={currentPath}
        navigateToFolder={navigateToFolder}
        formatFileSize={formatFileSize}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortFieldChange={handleSortFieldChange}
        onToggleSortDirection={toggleSortDirection}
      />
    </div>
  );
};

export default FileExplorer;


import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload } from 'lucide-react';
import FileUploader from './FileUploader';
import FileTable from './FileTable';
import { StorageItem } from '@/types/storage';
import { useIsMobile } from '@/hooks/use-mobile';

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
      
      <FileTable 
        items={filteredItems}
        currentPath={currentPath}
        navigateToFolder={navigateToFolder}
        formatFileSize={formatFileSize}
      />
    </div>
  );
};

export default FileExplorer;


import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload, ArrowUp, ArrowDown, ChevronUp, Filter } from 'lucide-react';
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from '@/components/ui/badge';

export type SortField = 'name' | 'size' | 'lastModified';
export type SortDirection = 'asc' | 'desc';

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
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);
  
  // 当上传进度达到100%时，标记为完成
  useEffect(() => {
    if (uploadProgress >= 100 && isUploading) {
      const timer = setTimeout(() => {
        setIsUploadComplete(true);
        // 3秒后隐藏完成消息
        setTimeout(() => {
          setIsUploadComplete(false);
        }, 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [uploadProgress, isUploading]);

  const handleSortFieldChange = (value: string) => {
    const field = value as SortField;
    setSortField(field);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleUpload = () => {
    // 随机模拟失败情况（10%几率）
    if (Math.random() < 0.1) {
      setUploadError('上传失败: 网络连接问题，请重试');
      return;
    }
    simulateUpload();
    setUploadError(undefined);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  // 文件类型过滤（为移动端抽屉设计）
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const fileTypes = [
    { id: 'all', name: '全部类型' },
    { id: 'folder', name: '文件夹' },
    { id: 'image', name: '图像' },
    { id: 'document', name: '文档' },
    { id: 'data', name: '数据文件' },
  ];

  // 添加了排序项目（文件类型和修改日期范围的过滤将在实际实现中添加）
  const sortedItems = [...filteredItems].sort((a, b) => {
    // 始终将文件夹放在前面
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;

    // 根据选定的字段排序
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

  // 分隔路径以实现面包屑导航效果
  const pathParts = currentPath.split('/').filter(Boolean);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">文件存储</h2>
          <p className="text-sm text-muted-foreground">管理和组织您的文件</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={navigateUp} 
            disabled={currentPath === '/'} 
            className="touch-friendly press-effect transition-all duration-200 hover:bg-gray-100"
          >
            <ChevronUp className="h-4 w-4 mr-1" />
            上级目录
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigateToFolder('/')} 
            className={`touch-friendly press-effect transition-all duration-200 hover:bg-gray-100 ${currentPath === '/' ? 'bg-gray-100' : ''}`}
          >
            根目录
          </Button>
          <Button 
            size="sm" 
            onClick={handleUpload} 
            disabled={isUploading} 
            className="touch-friendly press-effect bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            上传
          </Button>
        </div>
      </div>

      <FileUploader 
        isUploading={isUploading} 
        uploadProgress={uploadProgress} 
        errorMessage={uploadError}
        isComplete={isUploadComplete && !isUploading}
      />
      
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'} mb-4 ${isMobile ? 'gap-3' : ''}`}>
        <div>
          <div className="flex flex-wrap items-center gap-1 mb-2">
            <span className="text-sm font-medium">当前位置:</span>
            <div className="flex items-center text-sm">
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-600" 
                onClick={() => navigateToFolder('/')}
              >
                根目录
              </Button>
              {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                  <span className="mx-1 text-muted-foreground">/</span>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600"
                    onClick={() => {
                      const path = '/' + pathParts.slice(0, index + 1).join('/');
                      navigateToFolder(path);
                    }}
                  >
                    {part}
                  </Button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className={`relative ${isMobile ? 'w-full' : 'w-64'}`}>
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索文件..."
            className="pl-8 no-tap-highlight touch-friendly pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1 h-8 w-8 p-0" 
              onClick={clearSearchQuery}
            >
              <span className="sr-only">清除</span>
              <ArrowUp className="h-4 w-4 rotate-45" />
            </Button>
          )}
        </div>
      </div>

      {/* 移动设备上使用抽屉组件进行排序和过滤 */}
      {isMobile ? (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {searchQuery && (
              <Badge variant="outline" className="rounded-full">
                搜索: {searchQuery}
              </Badge>
            )}
            {sortField !== 'name' && (
              <Badge variant="outline" className="rounded-full">
                排序: {sortField === 'lastModified' ? '日期' : '大小'} {sortDirection === 'asc' ? '升序' : '降序'}
              </Badge>
            )}
          </div>
          
          <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="touch-friendly">
                <Filter className="h-4 w-4 mr-2" />
                排序和过滤
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>文件排序与过滤</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">排序方式</h3>
                  <Select value={sortField} onValueChange={handleSortFieldChange}>
                    <SelectTrigger className="touch-friendly">
                      <SelectValue placeholder="选择排序字段" />
                    </SelectTrigger>
                    <SelectContent className="touch-friendly">
                      <SelectItem value="name">名称</SelectItem>
                      <SelectItem value="size">大小</SelectItem>
                      <SelectItem value="lastModified">修改日期</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">排序顺序</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={sortDirection === 'asc' ? 'default' : 'outline'}
                      className="flex-1 touch-friendly"
                      onClick={() => setSortDirection('asc')}
                    >
                      <ArrowUp className="h-4 w-4 mr-2" />
                      升序
                    </Button>
                    <Button
                      variant={sortDirection === 'desc' ? 'default' : 'outline'}
                      className="flex-1 touch-friendly"
                      onClick={() => setSortDirection('desc')}
                    >
                      <ArrowDown className="h-4 w-4 mr-2" />
                      降序
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">文件类型</h3>
                  <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                    <SelectTrigger className="touch-friendly">
                      <SelectValue placeholder="选择文件类型" />
                    </SelectTrigger>
                    <SelectContent className="touch-friendly">
                      {fileTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DrawerFooter>
                <Button onClick={() => setFilterDrawerOpen(false)}>应用</Button>
                <DrawerClose asChild>
                  <Button variant="outline">取消</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 mb-4">
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
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSortDirection}
              className="ml-1 transition-transform duration-200"
            >
              {sortDirection === 'asc' ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* 桌面端的额外过滤器选项可以在这里添加 */}
        </div>
      )}
      
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

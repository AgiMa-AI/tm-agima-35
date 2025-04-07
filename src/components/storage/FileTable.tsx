
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FolderOpen, File, FileText, Image, MoreVertical, Plus, ArrowUp, ArrowDown, Download, Edit2, Move, Trash2 } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { StorageItem } from '@/types/storage';
import { SortField, SortDirection } from './FileExplorer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FileTableProps {
  items: StorageItem[];
  currentPath: string;
  navigateToFolder: (folderPath: string) => void;
  formatFileSize: (bytes: number) => string;
  sortField: SortField;
  sortDirection: SortDirection;
  onSortFieldChange: (field: string) => void;
  onToggleSortDirection: () => void;
}

export const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <FolderOpen className="h-5 w-5 text-blue-500" />;
    case 'image':
      return <Image className="h-5 w-5 text-purple-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-yellow-500" />;
    case 'data':
      return <File className="h-5 w-5 text-green-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const FileTable: React.FC<FileTableProps> = ({ 
  items, 
  currentPath, 
  navigateToFolder,
  formatFileSize,
  sortField,
  sortDirection,
  onSortFieldChange,
  onToggleSortDirection
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4 ml-1 inline" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1 inline" />
    );
  };

  const handleHeaderClick = (field: SortField) => {
    if (sortField === field) {
      onToggleSortDirection();
    } else {
      onSortFieldChange(field);
    }
  };

  const handleActionClick = (action: string, item: StorageItem) => {
    // 演示用，实际操作需要实现相应功能
    const actions = {
      download: '下载',
      rename: '重命名',
      move: '移动',
      delete: '删除'
    };
    
    toast({
      title: `${actions[action as keyof typeof actions]}${item.type === 'folder' ? '文件夹' : '文件'}`,
      description: `已选择${actions[action as keyof typeof actions]} "${item.name}"`,
      duration: 3000
    });
  };

  // 针对移动设备优化的文件列表渲染
  const renderMobileFileList = () => {
    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-4">此文件夹为空或没有匹配的搜索结果</p>
          <Button variant="outline" size="sm" className="touch-friendly press-effect">
            <Plus className="h-4 w-4 mr-2" />
            创建文件夹
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4 bg-background border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 press-effect"
          >
            <div 
              className="flex items-center gap-3 flex-1"
              onClick={() => item.type === 'folder' && navigateToFolder(`${currentPath === '/' ? '' : currentPath}/${item.name}`)}
            >
              {getFileIcon(item.type)}
              <div>
                <p className={`font-medium ${item.type === 'folder' ? 'text-blue-600' : ''}`}>
                  {item.name}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{item.type === 'folder' ? '文件夹' : formatFileSize(item.size)}</span>
                  <span className="mx-1">•</span>
                  <span>{item.lastModified}</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="touch-friendly p-2">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="touch-friendly py-3" onClick={() => handleActionClick('download', item)}>
                  <Download className="h-4 w-4 mr-2" />下载
                </DropdownMenuItem>
                <DropdownMenuItem className="touch-friendly py-3" onClick={() => handleActionClick('rename', item)}>
                  <Edit2 className="h-4 w-4 mr-2" />重命名
                </DropdownMenuItem>
                <DropdownMenuItem className="touch-friendly py-3" onClick={() => handleActionClick('move', item)}>
                  <Move className="h-4 w-4 mr-2" />移动
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 touch-friendly py-3" onClick={() => handleActionClick('delete', item)}>
                  <Trash2 className="h-4 w-4 mr-2" />删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    );
  };

  // 桌面版标准表格视图，增强了交互性
  const renderDesktopTable = () => {
    return (
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="w-[400px] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleHeaderClick('name')}
              >
                <div className="flex items-center">
                  名称 {renderSortIcon('name')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleHeaderClick('size')}
              >
                <div className="flex items-center">
                  大小 {renderSortIcon('size')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleHeaderClick('lastModified')}
              >
                <div className="flex items-center">
                  修改日期 {renderSortIcon('lastModified')}
                </div>
              </TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id} className="group hover:bg-gray-50 transition-colors duration-200">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(item.type)}
                      {item.type === 'folder' ? (
                        <button 
                          className="hover:underline text-left hover:text-blue-600 transition-colors duration-200"
                          onClick={() => navigateToFolder(`${currentPath === '/' ? '' : currentPath}/${item.name}`)}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.type === 'folder' ? '-' : formatFileSize(item.size)}</TableCell>
                  <TableCell>{item.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <DropdownMenu>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">更多操作</p>
                          </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleActionClick('download', item)}>
                            <Download className="h-4 w-4 mr-2" />下载
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick('rename', item)}>
                            <Edit2 className="h-4 w-4 mr-2" />重命名
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick('move', item)}>
                            <Move className="h-4 w-4 mr-2" />移动
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleActionClick('delete', item)}>
                            <Trash2 className="h-4 w-4 mr-2" />删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FolderOpen className="h-10 w-10 mb-2" />
                    <p>此文件夹为空或没有匹配的搜索结果</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      创建文件夹
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <>
      {isMobile ? renderMobileFileList() : renderDesktopTable()}
    </>
  );
};

export default FileTable;


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FolderOpen, File, FileText, Image, MoreVertical, Plus } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { StorageItem } from '@/types/storage';

interface FileTableProps {
  items: StorageItem[];
  currentPath: string;
  navigateToFolder: (folderPath: string) => void;
  formatFileSize: (bytes: number) => string;
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
  formatFileSize
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">名称</TableHead>
            <TableHead>大小</TableHead>
            <TableHead>修改日期</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getFileIcon(item.type)}
                    {item.type === 'folder' ? (
                      <button 
                        className="hover:underline text-left"
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>下载</DropdownMenuItem>
                      <DropdownMenuItem>重命名</DropdownMenuItem>
                      <DropdownMenuItem>移动</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">删除</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

export default FileTable;

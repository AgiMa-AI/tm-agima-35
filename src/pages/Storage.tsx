
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertCircle, 
  File, 
  FileText, 
  FolderOpen, 
  HardDrive, 
  Image, 
  MoreVertical, 
  Plus, 
  RefreshCw, 
  Search, 
  Upload 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface StorageItem {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'document' | 'data';
  size: number;
  lastModified: string;
  path: string;
}

const mockStorageItems: StorageItem[] = [
  { 
    id: '1', 
    name: '训练数据', 
    type: 'folder', 
    size: 0, 
    lastModified: '2023-12-15 14:30', 
    path: '/训练数据' 
  },
  { 
    id: '2', 
    name: '模型权重', 
    type: 'folder', 
    size: 0, 
    lastModified: '2023-12-10 09:15', 
    path: '/模型权重' 
  },
  { 
    id: '3', 
    name: 'resnet50.pytorch', 
    type: 'data', 
    size: 97800000, 
    lastModified: '2023-12-05 11:45', 
    path: '/' 
  },
  { 
    id: '4', 
    name: '实验结果.docx', 
    type: 'document', 
    size: 2500000, 
    lastModified: '2023-12-01 16:20', 
    path: '/' 
  },
  { 
    id: '5', 
    name: '架构图.png', 
    type: 'image', 
    size: 3700000, 
    lastModified: '2023-11-28 13:10', 
    path: '/' 
  },
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string) => {
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

const Storage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const totalStorage = 100 * 1024 * 1024 * 1024; // 100 GB
  const usedStorage = 42 * 1024 * 1024 * 1024; // 42 GB
  const usedPercentage = (usedStorage / totalStorage) * 100;
  
  const filteredItems = mockStorageItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    item.path === currentPath
  );
  
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  const navigateToFolder = (folderPath: string) => {
    setCurrentPath(folderPath);
  };
  
  const navigateUp = () => {
    if (currentPath === '/') return;
    
    const pathParts = currentPath.split('/').filter(Boolean);
    pathParts.pop();
    const newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
    setCurrentPath(newPath);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">存储</h1>
          <p className="text-muted-foreground mt-1">
            管理您的数据和模型文件
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>文件存储</CardTitle>
                    <CardDescription>管理和组织您的文件</CardDescription>
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
              </CardHeader>
              <CardContent>
                {isUploading && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>正在上传文件...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium">当前路径:</p>
                    <p className="text-sm text-muted-foreground font-mono">{currentPath}</p>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索文件..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
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
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
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
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>存储概览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>已使用</span>
                    <span>{formatFileSize(usedStorage)} / {formatFileSize(totalStorage)}</span>
                  </div>
                  <Progress value={usedPercentage} />
                  <p className="text-xs text-muted-foreground text-right">
                    剩余 {formatFileSize(totalStorage - usedStorage)}
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  升级存储
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>快速访问</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  最近文件
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <HardDrive className="h-4 w-4 mr-2" />
                  大文件
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  图像
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  文档
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>存储提示</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-blue-50 p-3 border border-blue-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-blue-800 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        有效管理存储空间
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        为提高性能，建议定期清理不需要的数据，并使用压缩文件格式保存大型数据集。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Storage;

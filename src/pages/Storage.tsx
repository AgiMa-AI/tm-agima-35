
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FileExplorer from '@/components/storage/FileExplorer';
import StorageOverview from '@/components/storage/StorageOverview';
import { useIsMobile } from '@/hooks/use-mobile';
import { StorageItem } from '@/types/storage';

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

const Storage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const isMobile = useIsMobile();
  
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
              <CardHeader className="pb-3" />
              <CardContent>
                <FileExplorer
                  currentPath={currentPath}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredItems={filteredItems}
                  navigateUp={navigateUp}
                  navigateToFolder={navigateToFolder}
                  simulateUpload={simulateUpload}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                  formatFileSize={formatFileSize}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <StorageOverview 
              usedStorage={usedStorage}
              totalStorage={totalStorage}
              usedPercentage={usedPercentage}
              formatFileSize={formatFileSize}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Storage;

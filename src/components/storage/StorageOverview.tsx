
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, HardDrive, Image, FileText, AlertCircle } from 'lucide-react';

interface StorageOverviewProps {
  usedStorage: number;
  totalStorage: number;
  usedPercentage: number;
  formatFileSize: (bytes: number) => string;
}

const StorageOverview: React.FC<StorageOverviewProps> = ({ 
  usedStorage, 
  totalStorage, 
  usedPercentage,
  formatFileSize
}) => {
  return (
    <div className="space-y-6">
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
  );
};

export default StorageOverview;

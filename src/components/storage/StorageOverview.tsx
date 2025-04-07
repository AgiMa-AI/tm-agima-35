
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, HardDrive, Image, FileText, AlertCircle, InfoIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const isMobile = useIsMobile();
  
  // 存储空间使用状态的颜色动态变化
  const getStorageStatusColor = () => {
    if (usedPercentage >= 90) return 'bg-red-100';
    if (usedPercentage >= 70) return 'bg-yellow-100';
    return isMobile ? 'h-3 rounded-full' : '';
  };
  
  const getProgressIndicatorColor = () => {
    if (usedPercentage >= 90) return 'bg-red-500';
    if (usedPercentage >= 70) return 'bg-yellow-500';
    return undefined; // 使用默认颜色
  };
  
  return (
    <div className="space-y-6">
      <Card className={`${isMobile ? 'card-hover shadow-sm' : ''} transition-all duration-200`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>存储概览</CardTitle>
            {usedPercentage >= 80 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">存储空间即将用完，请考虑升级或清理</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>{usedPercentage >= 90 ? '存储空间危急' : usedPercentage >= 70 ? '存储空间不足' : '已使用'}</span>
              <span className={usedPercentage >= 90 ? 'text-red-600 font-medium' : ''}>
                {formatFileSize(usedStorage)} / {formatFileSize(totalStorage)}
              </span>
            </div>
            <Progress 
              value={usedPercentage}
              className={`transition-colors duration-300 ${getStorageStatusColor()}`}
              indicatorClassName={getProgressIndicatorColor()}
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                使用率: <span className={usedPercentage >= 90 ? 'text-red-600 font-medium' : ''}>{usedPercentage.toFixed(1)}%</span>
              </span>
              <span className="text-muted-foreground">
                剩余: {formatFileSize(totalStorage - usedStorage)}
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full touch-friendly press-effect transition-transform duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            升级存储
          </Button>
        </CardContent>
      </Card>
      
      <Card className={`${isMobile ? 'card-hover shadow-sm' : ''} transition-all duration-200`}>
        <CardHeader>
          <CardTitle>快速访问</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start touch-friendly h-12 hover:bg-blue-50 transition-colors duration-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            最近文件
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start touch-friendly h-12 hover:bg-blue-50 transition-colors duration-200"
          >
            <HardDrive className="h-4 w-4 mr-2" />
            大文件
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start touch-friendly h-12 hover:bg-blue-50 transition-colors duration-200"
          >
            <Image className="h-4 w-4 mr-2" />
            图像
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start touch-friendly h-12 hover:bg-blue-50 transition-colors duration-200"
          >
            <FileText className="h-4 w-4 mr-2" />
            文档
          </Button>
        </CardContent>
      </Card>
      
      <Card className={`${isMobile ? 'shadow-sm' : ''} transition-all duration-200 hover:shadow-md`}>
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <CardTitle>存储提示</CardTitle>
            <InfoIcon className="h-4 w-4 text-blue-600 ml-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-blue-50 p-3 border border-blue-200 transition-all duration-200 hover:bg-blue-100">
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

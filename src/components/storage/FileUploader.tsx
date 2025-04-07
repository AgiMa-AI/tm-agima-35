
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FileUploaderProps {
  isUploading: boolean;
  uploadProgress: number;
  errorMessage?: string;
  isComplete?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  isUploading,
  uploadProgress,
  errorMessage,
  isComplete
}) => {
  const isMobile = useIsMobile();
  
  if (!isUploading && !errorMessage && !isComplete) return null;

  const getProgressColor = () => {
    if (errorMessage) return 'bg-red-200';
    if (isComplete) return 'bg-green-100';
    return isMobile ? 'bg-blue-100' : '';
  };

  const getStatusColor = () => {
    if (errorMessage) return 'text-red-600';
    if (isComplete) return 'text-green-600';
    return 'text-blue-500';
  };

  const getIcon = () => {
    if (errorMessage) return <AlertCircle className={`h-4 w-4 ${getStatusColor()} mr-2`} />;
    if (isComplete) return <CheckCircle2 className={`h-4 w-4 ${getStatusColor()} mr-2`} />;
    return <Upload className={`h-4 w-4 ${getStatusColor()} mr-2`} />;
  };

  const getStatusText = () => {
    if (errorMessage) return errorMessage;
    if (isComplete) return '文件上传完成';
    return '正在上传文件...';
  };

  return (
    <div className={`mb-4 space-y-2 ${isMobile ? 'p-3 bg-background rounded-xl border shadow-sm' : ''}`}>
      <div className="flex justify-between text-sm items-center">
        <div className="flex items-center">
          {(isMobile || errorMessage || isComplete) && getIcon()}
          <span className={errorMessage ? 'text-red-600' : ''}>{getStatusText()}</span>
        </div>
        {!errorMessage && <span className="font-medium">{isComplete ? '100%' : `${uploadProgress}%`}</span>}
      </div>
      <Progress 
        value={errorMessage ? 100 : uploadProgress} 
        className={`h-2 ${getProgressColor()} transition-all duration-300`}
        indicatorClassName={errorMessage ? 'bg-red-500' : isComplete ? 'bg-green-500' : undefined}
      />
    </div>
  );
};

export default FileUploader;

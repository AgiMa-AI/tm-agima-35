
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FileUploaderProps {
  isUploading: boolean;
  uploadProgress: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ isUploading, uploadProgress }) => {
  const isMobile = useIsMobile();
  
  if (!isUploading) return null;

  return (
    <div className={`mb-4 space-y-2 ${isMobile ? 'p-3 bg-background rounded-xl border shadow-sm' : ''}`}>
      <div className="flex justify-between text-sm items-center">
        {isMobile && <Upload className="h-4 w-4 text-blue-500 mr-2" />}
        <span>正在上传文件...</span>
        <span className="font-medium">{uploadProgress}%</span>
      </div>
      <Progress 
        value={uploadProgress} 
        className={isMobile ? 'h-2 bg-blue-100' : ''} 
      />
    </div>
  );
};

export default FileUploader;

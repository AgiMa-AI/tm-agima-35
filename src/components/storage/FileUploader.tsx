
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface FileUploaderProps {
  isUploading: boolean;
  uploadProgress: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ isUploading, uploadProgress }) => {
  if (!isUploading) return null;

  return (
    <div className="mb-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span>正在上传文件...</span>
        <span>{uploadProgress}%</span>
      </div>
      <Progress value={uploadProgress} />
    </div>
  );
};

export default FileUploader;

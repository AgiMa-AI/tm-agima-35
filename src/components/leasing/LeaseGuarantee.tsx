
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const LeaseGuarantee = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          租赁保障
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">1</span>
            </div>
            <p className="text-sm">实时监控，确保算力稳定可靠</p>
          </div>
          
          <div className="flex items-start">
            <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">2</span>
            </div>
            <p className="text-sm">任务异常自动恢复，无需人工干预</p>
          </div>
          
          <div className="flex items-start">
            <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">3</span>
            </div>
            <p className="text-sm">算力未正常提供时自动延长等效时间</p>
          </div>
          
          <div className="flex items-start">
            <div className="mt-0.5 mr-2 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium text-primary">4</span>
            </div>
            <p className="text-sm">24/7 专业技术支持</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaseGuarantee;

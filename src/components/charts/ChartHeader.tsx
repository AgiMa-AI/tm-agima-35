import React from 'react';
import { RefreshCcw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
interface ChartHeaderProps {
  dataMode: 'live' | 'mock';
  lastUpdated: Date | null;
  onRefresh: () => void;
}
const ChartHeader = ({
  dataMode,
  lastUpdated,
  onRefresh
}: ChartHeaderProps) => {
  // Function to format the last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return '未更新';
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    if (diffSeconds < 60) {
      return `${diffSeconds}秒前`;
    } else if (diffSeconds < 3600) {
      return `${Math.floor(diffSeconds / 60)}分钟前`;
    } else {
      return `${Math.floor(diffSeconds / 3600)}小时前`;
    }
  };
  return <div className="flex flex-wrap items-center justify-between gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-border/30">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-medium">数据模式</h1>
        
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          最后更新: <span className="font-medium">{formatLastUpdated()}</span>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-8" onClick={onRefresh}>
          <RefreshCcw className="h-3.5 w-3.5" />
          刷新数据
        </Button>
      </div>
    </div>;
};
export default ChartHeader;
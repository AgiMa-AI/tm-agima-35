
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GPUInstance } from '@/data/instances';
import { Server, Database, CreditCard, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InstanceCardProps {
  instance: GPUInstance;
  className?: string;
  onRent?: (instance: GPUInstance) => void;
}

const InstanceCard = ({ instance, className, onRent }: InstanceCardProps) => {
  // Define badge styles based on availability
  const availabilityBadge = {
    available: <Badge variant="outline" className="bg-green-500 text-white hover:bg-green-600">可用</Badge>,
    rented: <Badge variant="outline" className="bg-yellow-500 text-white hover:bg-yellow-600">使用中</Badge>,
    offline: <Badge variant="outline" className="bg-red-500 text-white hover:bg-red-600">离线</Badge>,
  };

  const handleRentClick = () => {
    if (onRent && instance.availability === 'available') {
      onRent(instance);
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 h-full",
      "hover:shadow-md hover:border-primary/20",
      "flex flex-col touch-target",
      className
    )}>
      <CardContent className="p-3 sm:p-4 md:p-6 flex-1">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight mb-1 line-clamp-1">
              {instance.name}
            </h3>
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
              {availabilityBadge[instance.availability]}
              <span className="text-xs text-muted-foreground">
                {instance.location}
              </span>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-end">
                  <p className="text-base sm:text-lg font-bold text-primary whitespace-nowrap">
                    ¥{instance.price}<span className="text-xs text-muted-foreground">/小时</span>
                  </p>
                  {instance.dailyPrice && (
                    <p className="text-sm font-medium text-primary/80 whitespace-nowrap">
                      ¥{instance.dailyPrice}<span className="text-xs text-muted-foreground">/天</span>
                    </p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>按天租赁更优惠，约 ¥{instance.dailyPrice || (instance.price * 24).toFixed(2)}/天</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Server className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm font-medium">{instance.gpuModel}</p>
              <p className="text-xs text-muted-foreground">{instance.gpuMemory} GB 显存</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">CPU</span>
              <span>{instance.cpuCores} 核心</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">内存</span>
              <span>{instance.ramSize} GB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">存储</span>
              <span>{instance.storageSize} GB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">性能</span>
              <span className="flex items-center">
                <span className={cn(
                  "inline-block w-2 h-2 rounded-full mr-1",
                  instance.performance > 80 ? "bg-green-500" : 
                  instance.performance > 50 ? "bg-yellow-500" : "bg-red-500"
                )}></span>
                {instance.performance}/100
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0 border-t mt-3 sm:mt-4 flex justify-between gap-2 flex-wrap sm:flex-nowrap">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 min-w-[70px] h-9 text-xs sm:text-sm"
          asChild
        >
          <Link to={`/details/${instance.id}`}>详情</Link>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1 min-w-[70px] h-9 text-xs sm:text-sm"
          disabled={instance.availability !== 'available'}
          onClick={handleRentClick}
        >
          立即租用
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InstanceCard;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  tooltip?: string;
}

const MetricCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  tooltip
}: MetricCardProps) => {
  const isMobile = useIsMobile();
  
  const cardContent = (
    <Card className={cn(
      "h-full overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/30 bg-card/80 backdrop-blur-sm press-effect",
      isMobile ? "p-0" : "",
      className
    )}>
      <CardContent className={cn(
        "flex flex-col justify-between", 
        isMobile ? "p-3" : "p-6"
      )}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className={cn(
              "font-medium text-muted-foreground",
              isMobile ? "text-xs" : "text-sm"
            )}>{title}</p>
            <div className="flex items-baseline gap-1">
              <h3 className={cn(
                "font-bold tracking-tight",
                isMobile ? "text-xl" : "text-2xl"
              )}>{value}</h3>
              {trend && (
                <span className={cn(
                  "font-medium",
                  isMobile ? "text-xs" : "text-sm",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className={cn(
              "rounded-full p-2 bg-primary/10 text-primary",
              isMobile ? "scale-75" : ""
            )}>
              {icon}
            </div>
          )}
        </div>
        {description && (
          <p className={cn(
            "mt-2 text-muted-foreground",
            isMobile ? "text-xs" : "text-sm"
          )}>{description}</p>
        )}
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={isMobile ? 500 : 300}>
          <TooltipTrigger asChild className="w-full">
            {cardContent}
          </TooltipTrigger>
          <TooltipContent side={isMobile ? "bottom" : "top"} align="center">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
};

export default MetricCard;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
}

const MetricCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/30 bg-card/80 backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              {trend && (
                <span className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          {icon && (
            <div className="rounded-full p-2.5 bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
        {description && (
          <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;

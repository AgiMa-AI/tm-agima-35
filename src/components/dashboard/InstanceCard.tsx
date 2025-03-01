
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GPUInstance } from '@/data/instances';
import { Server, Database, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InstanceCardProps {
  instance: GPUInstance;
  className?: string;
}

const InstanceCard = ({ instance, className }: InstanceCardProps) => {
  // Define badge styles based on availability
  const availabilityBadge = {
    available: <Badge variant="success">Available</Badge>,
    rented: <Badge variant="warning">In Use</Badge>,
    offline: <Badge variant="danger">Offline</Badge>,
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 h-full",
      "hover:shadow-md hover:border-primary/20",
      "flex flex-col",
      className
    )}>
      <CardContent className="p-6 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold tracking-tight mb-1 line-clamp-1">
              {instance.name}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              {availabilityBadge[instance.availability]}
              <span className="text-xs text-muted-foreground">
                {instance.location}
              </span>
            </div>
          </div>
          <p className="text-lg font-bold text-primary">
            ${instance.price}<span className="text-xs text-muted-foreground">/hr</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{instance.gpuModel}</p>
              <p className="text-xs text-muted-foreground">{instance.gpuMemory} GB VRAM</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">CPU</span>
              <span>{instance.cpuCores} Cores</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">RAM</span>
              <span>{instance.ramSize} GB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Storage</span>
              <span>{instance.storageSize} GB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Performance</span>
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
      
      <CardFooter className="p-4 pt-0 border-t mt-4 flex justify-between gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link to={`/details/${instance.id}`}>Details</Link>
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          disabled={instance.availability !== 'available'}
        >
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InstanceCard;

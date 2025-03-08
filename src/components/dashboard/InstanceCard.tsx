
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GPUInstance } from '@/data/instances';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InstanceCardProps {
  instance: GPUInstance;
  onRent?: () => void; // Add optional onRent prop
}

const InstanceCard = ({ instance, onRent }: InstanceCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/details/${instance.id}`);
  };
  
  // Handle rent button click
  const handleRent = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to details
    if (onRent) onRent();
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={handleViewDetails}>
      <div className="relative">
        <img 
          src={instance.image || '/placeholder.svg'} 
          alt={instance.name}
          className="w-full h-32 sm:h-40 object-cover object-center"
        />
        <Badge className="absolute top-2 right-2" variant={
          instance.availability === 'available' ? 'default' : 
          instance.availability === 'rented' ? 'secondary' : 'destructive'
        }>
          {instance.availability === 'available' ? '可用' : 
           instance.availability === 'rented' ? '使用中' : '离线'}
        </Badge>
      </div>
      
      <CardContent className="py-4 flex-grow">
        <div className="mb-2">
          <h3 className="font-medium text-base line-clamp-1">{instance.name}</h3>
          <p className="text-xs text-muted-foreground">{instance.location}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs mb-3">
          <div>
            <p className="text-muted-foreground">GPU</p>
            <p className="font-medium line-clamp-1">{instance.gpuModel}</p>
          </div>
          <div>
            <p className="text-muted-foreground">显存</p>
            <p className="font-medium">{instance.gpuMemory}GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">存储</p>
            <p className="font-medium">{instance.storageSize}GB</p>
          </div>
          <div>
            <p className="text-muted-foreground">内存</p>
            <p className="font-medium">{instance.ramSize}GB</p>
          </div>
        </div>
        
        <div className="h-2 bg-secondary rounded-full">
          <div 
            className="h-2 bg-primary rounded-full" 
            style={{ width: `${instance.performance}%` }}
          ></div>
        </div>
        <p className="text-xs text-right mt-1">性能: {instance.performance}/100</p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex flex-col space-y-2">
        <div className="flex justify-between items-baseline w-full">
          <span className="font-bold text-primary text-lg">¥{instance.dailyPrice || (instance.price * 24).toFixed(2)}</span>
          <span className="text-xs text-muted-foreground">每天</span>
        </div>
        
        {instance.availability === 'available' && (
          <div className="flex gap-2 w-full">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
              详情
            </Button>
            <Button size="sm" className="flex-1" onClick={handleRent}>
              租用
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
        
        {instance.availability !== 'available' && (
          <Button variant="outline" size="sm" className="w-full" onClick={handleViewDetails}>
            查看详情
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default InstanceCard;

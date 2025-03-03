
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AGIModel } from '@/types/agi';
import { Bot, ExternalLink, Star } from 'lucide-react';

interface AGIModelCardProps {
  model: AGIModel;
}

const AGIModelCard = ({ model }: AGIModelCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/agi/${model.id}`);
  };
  
  const getModelTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-blue-500';
      case 'vision':
        return 'bg-purple-500';
      case 'multimodal':
        return 'bg-indigo-500';
      case 'audio':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:border-primary/50 hover:shadow-md">
      <div className="relative">
        {model.image ? (
          <img 
            src={model.image} 
            alt={model.name}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-muted flex items-center justify-center">
            <Bot className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
        
        {model.featured && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            <Star className="h-3 w-3 mr-1 fill-current" />
            推荐
          </Badge>
        )}
      </div>
      
      <CardContent className="py-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{model.name}</h3>
          <Badge className={getModelTypeBadgeColor(model.type)}>
            {model.type}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {model.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-muted/60 p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">上下文窗口</p>
            <p className="font-medium text-sm">{model.contextWindow}</p>
          </div>
          <div className="bg-muted/60 p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">参数规模</p>
            <p className="font-medium text-sm">{model.parameters}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-4 flex justify-between items-center">
        <div className="text-sm">
          <span className="font-bold text-primary">¥{model.costPerToken}</span>
          <span className="text-xs text-muted-foreground">/1K tokens</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewDetails}>
          查看详情
          <ExternalLink className="ml-1 h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AGIModelCard;

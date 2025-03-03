
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AGIModel } from '@/types/agi';
import { Bot, ExternalLink, Star, Cpu, CheckCircle2, Sparkles, Zap, Server, Layers } from 'lucide-react';

interface AGIModelCardProps {
  model: AGIModel;
}

const AGIModelCard = ({ model }: AGIModelCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/agi/${model.id}`);
  };
  
  const handleRent = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/agi-rental/${model.id}`);
  };
  
  const getModelTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'bg-indigo-500';
      case 'vision':
        return 'bg-violet-500';
      case 'multimodal':
        return 'bg-fuchsia-500';
      case 'audio':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:border-primary/50 hover:shadow-lg hover:scale-[1.01] duration-200">
      <div className="relative">
        {model.image ? (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-black/70 to-transparent">
            <img 
              src={model.image} 
              alt={model.name}
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center justify-between">
                <Badge className={`${getModelTypeBadgeColor(model.type)} text-white`}>
                  {model.type === 'multimodal' ? (
                    <Layers className="h-3 w-3 mr-1" />
                  ) : model.type === 'vision' ? (
                    <Sparkles className="h-3 w-3 mr-1" />
                  ) : model.type === 'audio' ? (
                    <Zap className="h-3 w-3 mr-1" />
                  ) : (
                    <Server className="h-3 w-3 mr-1" />
                  )}
                  {model.type}
                </Badge>
                {model.featured && (
                  <Badge className="bg-amber-500">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    推荐
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
            <Cpu className="h-16 w-16 text-gray-400/50" />
          </div>
        )}
      </div>
      
      <CardContent className="py-4 flex-grow">
        <h3 className="font-bold text-lg leading-tight mb-2">{model.name}</h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {model.description}
        </p>
        
        {model.features && model.features.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-medium flex items-center mb-1 text-indigo-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              核心能力
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {model.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-3 w-3 rounded-full bg-indigo-100 flex-shrink-0 mt-0.5 mr-2"></div>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {model.useCases && model.useCases.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-medium flex items-center mb-1 text-violet-500">
              <Sparkles className="h-3 w-3 mr-1" />
              应用场景
            </h4>
            <div className="flex flex-wrap gap-1">
              {model.useCases.slice(0, 2).map((useCase, index) => (
                <Badge key={index} variant="outline" className="text-[10px] px-1.5 py-0 border-violet-200 bg-violet-50/50">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">上下文窗口</p>
            <p className="font-bold text-sm">{model.contextWindow}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md text-center">
            <p className="text-xs text-muted-foreground">参数规模</p>
            <p className="font-bold text-sm">{model.parameters}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-4 flex justify-between items-center border-t">
        <div className="text-sm">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">¥{model.costPerToken}</span>
          <span className="text-xs text-muted-foreground">/1K tokens</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleViewDetails}
          >
            详情
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleRent}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            租赁
            <Zap className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AGIModelCard;

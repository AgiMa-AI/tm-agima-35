
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AGIModel {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'beta' | 'deprecated';
  type: 'text' | 'image' | 'audio' | 'video';
  architecture: string;
  provider: string;
  capabilities: string[];
  license: string;
  cost: number;
  performance: {
    speed: string;
    accuracy: string;
  };
}

interface AGIModelCardProps {
  model: AGIModel;
}

const AGIModelCard: React.FC<AGIModelCardProps> = ({ model }) => {
  return (
    <Card className="bg-card rounded-lg shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{model.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>类型: {model.type}</span>
          <span>架构: {model.architecture}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>提供商: {model.provider}</span>
          <span>成本: ${model.cost}/次</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>速度: {model.performance.speed}</span>
          <span>准确率: {model.performance.accuracy}</span>
        </div>
        <div className="mt-4">
          {model.capabilities.map((capability) => (
            <Badge key={capability} variant="secondary" className="mr-1">{capability}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AGIModelCard;

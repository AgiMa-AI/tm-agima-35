
import React from 'react';
import AGIModelCard from './AGIModelCard';

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

interface AGIModelListProps {
  models: AGIModel[];
}

const AGIModelList: React.FC<AGIModelListProps> = ({ models }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {models.map((model) => (
        <AGIModelCard key={model.id} model={model} />
      ))}
    </div>
  );
};

export default AGIModelList;

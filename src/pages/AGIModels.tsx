
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search, MoreVertical, Filter, Check, ArrowRight
} from 'lucide-react';

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

interface AGIModelFilters {
  [key: string]: string[];
  status: string[];
  type: string[];
  architecture: string[];
  capabilities: string[];
}

const mockAGIModels: AGIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'OpenAI’s flagship model, excels in complex reasoning.',
    status: 'available',
    type: 'text',
    architecture: 'Transformer',
    provider: 'OpenAI',
    capabilities: ['reasoning', 'coding', 'math'],
    license: 'Proprietary',
    cost: 0.03,
    performance: { speed: 'fast', accuracy: 'high' },
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    description: 'High-resolution image generation model.',
    status: 'available',
    type: 'image',
    architecture: 'Diffusion',
    provider: 'Stability AI',
    capabilities: ['image generation', 'style transfer'],
    license: 'OpenRAIL',
    cost: 0.01,
    performance: { speed: 'medium', accuracy: 'high' },
  },
  {
    id: 'whisper-v2',
    name: 'Whisper v2',
    description: 'Accurate speech-to-text model.',
    status: 'available',
    type: 'audio',
    architecture: 'Transformer',
    provider: 'OpenAI',
    capabilities: ['speech recognition', 'translation'],
    license: 'Proprietary',
    cost: 0.02,
    performance: { speed: 'fast', accuracy: 'high' },
  },
  {
    id: 'llama-2',
    name: 'LLaMA 2',
    description: 'Open-source language model by Meta.',
    status: 'available',
    type: 'text',
    architecture: 'Transformer',
    provider: 'Meta AI',
    capabilities: ['text generation', 'conversation'],
    license: 'Custom',
    cost: 0.0,
    performance: { speed: 'medium', accuracy: 'medium' },
  },
  {
    id: 'codellama',
    name: 'CodeLLaMA',
    description: 'Specialized for code generation tasks.',
    status: 'available',
    type: 'text',
    architecture: 'Transformer',
    provider: 'Meta AI',
    capabilities: ['code generation', 'code completion'],
    license: 'Custom',
    cost: 0.0,
    performance: { speed: 'fast', accuracy: 'high' },
  },
  {
    id: 'dalle-3',
    name: 'DALL·E 3',
    description: 'Advanced image generation with better prompt understanding.',
    status: 'available',
    type: 'image',
    architecture: 'Transformer',
    provider: 'OpenAI',
    capabilities: ['image generation', 'prompt interpretation'],
    license: 'Proprietary',
    cost: 0.04,
    performance: { speed: 'medium', accuracy: 'high' },
  },
  {
    id: 'claude-v2',
    name: 'Claude v2',
    description: 'Anthropic’s model focused on safety and reliability.',
    status: 'available',
    type: 'text',
    architecture: 'Transformer',
    provider: 'Anthropic',
    capabilities: ['reasoning', 'ethics'],
    license: 'Proprietary',
    cost: 0.035,
    performance: { speed: 'fast', accuracy: 'high' },
  },
  {
    id: 'j2-jumbo-1',
    name: 'j2-jumbo-1',
    description: 'Jurassic-2 Jumbo by AI21 Labs.',
    status: 'available',
    type: 'text',
    architecture: 'Transformer',
    provider: 'AI21 Labs',
    capabilities: ['text generation', 'summarization'],
    license: 'Proprietary',
    cost: 0.045,
    performance: { speed: 'fast', accuracy: 'high' },
  },
  {
    id: 'midjourney-v5',
    name: 'Midjourney v5',
    description: 'Generates highly detailed and artistic images.',
    status: 'available',
    type: 'image',
    architecture: 'Diffusion',
    provider: 'Midjourney',
    capabilities: ['image generation', 'artistic creation'],
    license: 'Proprietary',
    cost: 0.025,
    performance: { speed: 'medium', accuracy: 'high' },
  },
  {
    id: 'bark',
    name: 'Bark',
    description: 'Text-to-speech model capable of generating realistic voices.',
    status: 'available',
    type: 'audio',
    architecture: 'Transformer',
    provider: 'Suno AI',
    capabilities: ['speech synthesis', 'voice cloning'],
    license: 'MIT',
    cost: 0.015,
    performance: { speed: 'fast', accuracy: 'medium' },
  },
];

const AGIModels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [models, setModels] = useState<AGIModel[]>(mockAGIModels);
  const [selectedFilters, setSelectedFilters] = useState<AGIModelFilters>({
    status: [],
    type: [],
    architecture: [],
    capabilities: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filteredModels = mockAGIModels;

    if (searchTerm) {
      filteredModels = filteredModels.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    for (const filterType in selectedFilters) {
      const selectedValues = selectedFilters[filterType];
      if (selectedValues && selectedValues.length > 0) {
        filteredModels = filteredModels.filter(model => {
          if (filterType === 'capabilities') {
            return selectedValues.every(value => model.capabilities.includes(value));
          } else {
            return selectedValues.includes(model[filterType as keyof AGIModel] as string);
          }
        });
      }
    }

    setModels(filteredModels);
  }, [searchTerm, selectedFilters]);

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (checked) {
        newFilters[filterType] = [...(newFilters[filterType] || []), value];
      } else {
        newFilters[filterType] = (newFilters[filterType] || []).filter(item => item !== value);
      }
      return newFilters;
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const availableFilters: Record<string, string[]> = {
    status: ['available', 'beta', 'deprecated'],
    type: ['text', 'image', 'audio', 'video'],
    architecture: ['Transformer', 'Diffusion'],
    capabilities: ['reasoning', 'coding', 'math', 'image generation', 'style transfer', 'speech recognition', 'translation', 'text generation', 'conversation', 'code generation', 'code completion', 'prompt interpretation', 'ethics', 'summarization', 'artistic creation', 'speech synthesis', 'voice cloning'],
  };

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">AGI 模型</h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索模型..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" className="mt-4 md:mt-0" onClick={toggleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>

        {isFilterOpen && (
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>筛选条件</CardTitle>
              <CardDescription>选择您希望筛选的模型属性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(availableFilters).map(([filterType, values]) => (
                  <div key={filterType}>
                    <h3 className="text-sm font-medium mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                    <div className="space-y-1">
                      {values.map(value => (
                        <label key={value} className="flex items-center space-x-2">
                          <Input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selectedFilters[filterType]?.includes(value) || false}
                            onChange={(e) => handleFilterChange(filterType, value, e.target.checked)}
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <Card key={model.id} className="bg-card rounded-lg shadow-md overflow-hidden">
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
              <CardFooter className="pt-0">
                <Link to={`/agi/${model.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    查看详情
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AGIModels;

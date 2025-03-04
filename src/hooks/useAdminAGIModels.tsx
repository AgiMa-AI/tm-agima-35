
import { useState, useEffect } from 'react';
import { AGIModel, AGIModelFilters } from '../types/admin-agi';

// Mock data
const mockAGIModels: AGIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'OpenAI's flagship model, excels in complex reasoning.',
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
    description: 'Anthropic's model focused on safety and reliability.',
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

export const useAdminAGIModels = () => {
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

  return {
    searchTerm,
    setSearchTerm,
    models,
    selectedFilters,
    handleFilterChange,
    isFilterOpen,
    toggleFilter,
    availableFilters,
  };
};


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search, Filter, ArrowRight, Bot, Cpu, Server
} from 'lucide-react';
import { useAGIModels, FilterRecord } from '@/hooks/useAGIModels';

const AGIModels = () => {
  const { 
    models, 
    loading, 
    filters, 
    updateFilters, 
    resetFilters,
    filteredCount,
    totalCount,
    filterOptions
  } = useAGIModels();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim()) {
      updateFilters({ search: [value] });
    } else {
      updateFilters({ search: undefined });
    }
  };

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    let currentFilters = filters[filterType as keyof typeof filters] as string[] || [];
    
    if (checked) {
      updateFilters({ 
        [filterType]: [...currentFilters, value] 
      } as FilterRecord);
    } else {
      updateFilters({ 
        [filterType]: currentFilters.filter(v => v !== value) 
      } as FilterRecord);
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">AGI 模型</h1>
          <Link to="/agi-hosting">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Server className="mr-2 h-4 w-4" />
              贡献你的算力
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索模型..."
              className="pl-9"
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {Object.keys(filters).length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-muted-foreground"
              >
                清除筛选
              </Button>
            )}
            <Button variant="outline" onClick={toggleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="text-muted-foreground">
            显示 {filteredCount} 个模型 {filteredCount !== totalCount && `(共 ${totalCount} 个)`}
          </div>
        </div>

        {isFilterOpen && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">筛选条件</CardTitle>
              <CardDescription>选择您希望筛选的模型属性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(filterOptions).map(([key, { label, options }]) => (
                  <div key={key}>
                    <h3 className="font-medium text-sm mb-3">{label}</h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${key}-${option.value}`}
                            checked={(filters[key as keyof typeof filters] as string[] || []).includes(option.value)}
                            onCheckedChange={(checked) => {
                              handleFilterChange(key, option.value, checked === true);
                            }}
                          />
                          <label 
                            htmlFor={`${key}-${option.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div>
                  <h3 className="font-medium text-sm mb-3">特殊筛选</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="featured"
                        checked={filters.featured as boolean || false}
                        onCheckedChange={(checked) => {
                          updateFilters({ featured: checked === true });
                        }}
                      />
                      <label 
                        htmlFor="featured"
                        className="text-sm font-normal cursor-pointer"
                      >
                        只显示精选模型
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-5 bg-primary/10 rounded-md mb-2"></div>
                  <div className="h-4 bg-primary/10 rounded-md w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-primary/10 rounded-md mb-3"></div>
                  <div className="h-3 bg-primary/10 rounded-md mb-3"></div>
                  <div className="h-3 bg-primary/10 rounded-md mb-3"></div>
                  <div className="flex gap-2 mt-4">
                    <div className="h-5 w-16 bg-primary/10 rounded-full"></div>
                    <div className="h-5 w-16 bg-primary/10 rounded-full"></div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="h-9 bg-primary/10 rounded-md w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {models.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的模型</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    尝试调整筛选条件或搜索关键词，以查找其他AI模型。
                  </p>
                  <Button variant="outline" onClick={resetFilters}>清除所有筛选</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                  <Card key={model.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
                        <Badge variant={
                          model.type === 'text' ? 'default' : 
                          model.type === 'image' ? 'secondary' : 
                          model.type === 'audio' ? 'destructive' : 'outline'
                        }>
                          {model.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground line-clamp-2 h-10">
                        {model.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{model.architecture || model.creator || "通用架构"}</span>
                        <span>${model.cost || model.costPerToken || "0.00"}/次</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4 mt-3">
                        {model.capabilities && model.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">{capability}</Badge>
                        ))}
                        {model.tags && model.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={`tag-${index}`} variant="outline" className="text-xs">{tag}</Badge>
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
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AGIModels;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Filter, ArrowRight, Bot, Cpu, Server, MessageCircle, Users, HelpCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useAGIModels, FilterRecord } from '@/hooks/useAGIModels';
import { toast } from '@/components/ui/use-toast';
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
  const [consultFormOpen, setConsultFormOpen] = useState(false);
  const [consultType, setConsultType] = useState('general');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim()) {
      updateFilters({
        search: [value]
      });
    } else {
      updateFilters({
        search: undefined
      });
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
  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "咨询请求已提交",
      description: "我们的专家团队将在24小时内与您联系"
    });
    setConsultFormOpen(false);
  };
  return <Layout>
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
            <Input placeholder="搜索模型..." className="pl-9" onChange={handleSearchChange} />
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {Object.keys(filters).length > 0 && <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground">
                清除筛选
              </Button>}
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

        {isFilterOpen && <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">筛选条件</CardTitle>
              <CardDescription>选择您希望筛选的模型属性</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(filterOptions).map(([key, {
              label,
              options
            }]) => <div key={key}>
                    <h3 className="font-medium text-sm mb-3">{label}</h3>
                    <div className="space-y-2">
                      {options.map(option => <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox id={`${key}-${option.value}`} checked={(filters[key as keyof typeof filters] as string[] || []).includes(option.value)} onCheckedChange={checked => {
                    handleFilterChange(key, option.value, checked === true);
                  }} />
                          <label htmlFor={`${key}-${option.value}`} className="text-sm font-normal cursor-pointer">
                            {option.label}
                          </label>
                        </div>)}
                    </div>
                  </div>)}
                
                <div>
                  <h3 className="font-medium text-sm mb-3">特殊筛选</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" checked={filters.featured as boolean || false} onCheckedChange={checked => {
                    updateFilters({
                      featured: checked === true
                    });
                  }} />
                      <label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                        只显示精选模型
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>}

        <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 border-0 shadow-md overflow-hidden">
          <div className="md:grid md:grid-cols-5 items-stretch">
            <div className="p-6 md:col-span-3 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2">不确定选择哪个模型？</h2>
              <p className="text-muted-foreground mb-4">
                我们的AGI专家团队可以为您提供定制化的模型推荐和实施方案，满足您的特定需求。
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">专家团队支持</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">定制化解决方案</span>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">全程技术指导</span>
                </div>
              </div>
              
              {consultFormOpen ? <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">咨询类型</label>
                      <select className="w-full rounded-md border border-input p-2 text-sm" value={consultType} onChange={e => setConsultType(e.target.value)}>
                        <option value="general">通用咨询</option>
                        <option value="technical">技术实施</option>
                        <option value="pricing">定价与方案</option>
                        <option value="enterprise">企业定制</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">联系方式</label>
                      <Input placeholder="电话 / 邮箱" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">简要描述您的需求</label>
                    <Textarea placeholder="请描述您的项目需求和目标..." rows={3} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setConsultFormOpen(false)}>取消</Button>
                    <Button type="submit">提交咨询</Button>
                  </div>
                </form> : <div className="flex gap-4">
                  <Button onClick={() => setConsultFormOpen(true)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    在线咨询
                  </Button>
                  
                </div>}
            </div>
            
            <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-blue-500 to-indigo-600">
              <div className="h-full flex items-center justify-center p-6">
                <div className="max-w-xs">
                  <div className="text-white mb-4">
                    <Users className="h-12 w-12 mb-3" />
                    <h3 className="text-xl font-bold mb-2">专业顾问团队</h3>
                    <p className="opacity-90 text-sm">
                      我们的团队由AGI领域资深专家组成，拥有丰富的行业经验，能够帮助您选择最适合的模型和解决方案。
                    </p>
                  </div>
                  <div className="p-4 bg-white bg-opacity-10 rounded-lg text-white text-sm">
                    <p className="italic">"通过定制模型咨询，我们成功将模型性能提升了40%，同时降低了30%的运行成本。"</p>
                    <p className="mt-2 font-semibold">— 某科技公司CTO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {loading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({
          length: 6
        }).map((_, index) => <Card key={index} className="bg-card rounded-lg shadow-md overflow-hidden animate-pulse">
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
              </Card>)}
          </div> : <>
            {models.length === 0 ? <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">未找到匹配的模型</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    尝试调整筛选条件或搜索关键词，以查找其他AI模型。
                  </p>
                  <Button variant="outline" onClick={resetFilters}>清除所有筛选</Button>
                </CardContent>
              </Card> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map(model => <Card key={model.id} className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{model.name}</CardTitle>
                        <Badge variant={model.type === 'text' ? 'default' : model.type === 'image' ? 'secondary' : model.type === 'audio' ? 'destructive' : 'outline'}>
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
                        {model.capabilities && model.capabilities.slice(0, 3).map((capability, index) => <Badge key={index} variant="secondary" className="text-xs">{capability}</Badge>)}
                        {model.tags && model.tags.slice(0, 3).map((tag, index) => <Badge key={`tag-${index}`} variant="outline" className="text-xs">{tag}</Badge>)}
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
                  </Card>)}
              </div>}
          </>}
      </div>
    </Layout>;
};
export default AGIModels;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAGIModels } from '@/hooks/useAGIModels';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Check, CreditCard, Server, Zap, Clock, Calendar, Brain } from 'lucide-react';

const AGIRental = () => {
  const { id } = useParams<{ id: string }>();
  const { getModelById, rentModel } = useAGIModels();
  const [model, setModel] = useState(id ? getModelById(id) : null);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [computeUnits, setComputeUnits] = useState('10');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const planOptions = [
    { id: 'hourly', name: '按需计费', priceMultiplier: 1, description: '按小时计费，随时可停止' },
    { id: 'daily', name: '每日计划', priceMultiplier: 0.95, description: '日租更优惠，适合短期项目' },
    { id: 'weekly', name: '每周计划', priceMultiplier: 0.9, description: '周租享受9折优惠' },
    { id: 'monthly', name: '每月计划', priceMultiplier: 0.8, description: '月租享受8折优惠，最受欢迎' },
    { id: 'quarterly', name: '季度计划', priceMultiplier: 0.7, description: '季度租赁享7折，长期项目首选' }
  ];
  
  const calculateTotalPrice = () => {
    if (!model) return 0;
    
    const basePrice = model.costPerToken * 1000; // 基础价格，每千tokens
    const selectedPlanMultiplier = planOptions.find(plan => plan.id === selectedPlan)?.priceMultiplier || 1;
    const units = parseInt(computeUnits) || 10;
    
    return basePrice * selectedPlanMultiplier * units;
  };
  
  useEffect(() => {
    if (id && !model) {
      const fetchedModel = getModelById(id);
      setModel(fetchedModel || null);
      
      if (!fetchedModel) {
        toast({
          variant: "destructive",
          title: "无法找到模型",
          description: "请返回算力列表选择可用的AGI模型"
        });
        navigate('/agi-models');
      }
    }
  }, [id, getModelById, model, navigate, toast]);
  
  const handleRent = async () => {
    if (!model || !id) return;
    
    setLoading(true);
    try {
      await rentModel(id);
      toast({
        title: "租赁成功",
        description: `您已成功租赁 ${model.name} 算力资源`,
      });
      
      // 租赁成功后延迟1秒跳转，让用户看到成功提示
      setTimeout(() => {
        navigate('/agi-hosting');
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "租赁失败",
        description: "处理您的请求时发生错误，请稍后再试"
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!model) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Skeleton className="h-[400px] w-full max-w-3xl rounded-xl" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">租赁确认</h1>
          </div>
          <p className="text-muted-foreground">
            确认您的AGI算力租赁订单
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 左侧订单信息 */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">租赁详情</CardTitle>
                <CardDescription>自定义您的算力需求和租赁计划</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 模型信息摘要 */}
                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {model.image ? (
                      <img src={model.image} alt={model.name} className="h-full w-full object-cover" />
                    ) : (
                      <Server className="h-8 w-8 text-primary/70" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{model.name}</h3>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {model.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">参数量:</span> <span className="font-medium">{model.parameters}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">上下文窗口:</span> <span className="font-medium">{model.contextWindow}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 计划选择 */}
                <div>
                  <h3 className="text-sm font-medium mb-3">选择计费方式</h3>
                  <RadioGroup 
                    value={selectedPlan} 
                    onValueChange={setSelectedPlan}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {planOptions.map(plan => (
                      <div key={plan.id} className="relative">
                        <RadioGroupItem 
                          value={plan.id} 
                          id={plan.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={plan.id}
                          className="flex flex-col h-full p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-xs text-emerald-600 font-medium">
                              {plan.priceMultiplier < 1 ? `${(1 - plan.priceMultiplier) * 100}%折扣` : '标准价格'}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground mt-1">{plan.description}</span>
                        </Label>
                        {selectedPlan === plan.id && (
                          <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                {/* 计算单元 */}
                <div>
                  <h3 className="text-sm font-medium mb-3">计算单元数量</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="compute-units">计算单元 (1-100)</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="compute-units"
                          type="number"
                          min="1"
                          max="100"
                          value={computeUnits}
                          onChange={(e) => setComputeUnits(e.target.value)}
                          className="w-full"
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">单元</span>
                      </div>
                      <p className="text-xs text-muted-foreground">每个计算单元对应1000个令牌的处理能力</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">使用时长</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="选择时长" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1天</SelectItem>
                          <SelectItem value="7">7天</SelectItem>
                          <SelectItem value="30">30天</SelectItem>
                          <SelectItem value="90">90天</SelectItem>
                          <SelectItem value="180">180天</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">根据您选择的计费方式决定总周期</p>
                    </div>
                  </div>
                </div>
                
                {/* 支付方式 */}
                <div>
                  <h3 className="text-sm font-medium mb-3">选择支付方式</h3>
                  <RadioGroup 
                    value={selectedPayment} 
                    onValueChange={setSelectedPayment} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    <div className="relative">
                      <RadioGroupItem value="credit" id="credit" className="peer sr-only" />
                      <Label
                        htmlFor="credit"
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50"
                      >
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">信用卡支付</p>
                          <p className="text-xs text-muted-foreground">支持大多数银行卡</p>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="relative">
                      <RadioGroupItem value="balance" id="balance" className="peer sr-only" />
                      <Label
                        htmlFor="balance"
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted/50"
                      >
                        <Zap className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">账户余额</p>
                          <p className="text-xs text-muted-foreground">当前余额: ¥1,250.00</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 右侧订单摘要 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>订单摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">算力方案</span>
                  <span className="font-medium">{model.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">单价</span>
                  <span className="font-medium">¥{model.costPerToken.toFixed(2)}/1K tokens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">计算单元</span>
                  <span className="font-medium">{computeUnits} 单元</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">计费方式</span>
                  <Badge variant="outline" className="font-normal">
                    {planOptions.find(plan => plan.id === selectedPlan)?.name || '按需计费'}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">折扣</span>
                  <span className="text-emerald-600 font-medium">
                    {(1 - (planOptions.find(plan => plan.id === selectedPlan)?.priceMultiplier || 1)) * 100}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium">总价</span>
                  <span className="font-bold">¥{calculateTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-lg text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">预计激活时间</p>
                      <p className="text-muted-foreground">支付完成后立即激活</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleRent}
                  disabled={loading}
                >
                  {loading ? (
                    <>处理中...</>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> 确认租赁
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground px-6">
                  点击"确认租赁"，即表示您同意我们的服务条款和算力使用政策
                </p>
              </CardFooter>
            </Card>
            
            {/* 帮助卡片 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">需要帮助？</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    如有任何问题，请联系我们的客户支持团队或查阅帮助文档。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AGIRental;

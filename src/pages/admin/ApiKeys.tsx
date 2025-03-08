
import React, { useState, useCallback, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, CardContent, CardDescription, CardHeader, 
  CardTitle, CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { 
  Search, Key, MoreVertical, Copy, EyeOff, Eye, 
  ShieldAlert, Clock, Plus, Trash2, RefreshCw, Shield,
  CheckCircle2, AlertTriangle, AlertCircle, CalendarIcon,
  UserCircle, Tag, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminApiKeys = () => {
  // 减少初始渲染负担，使用更简洁的数据结构
  const [apiKeys] = useState([
    { 
      id: 'key_1', 
      name: "生产环境API", 
      key: "sk_prod_T9qLm5KcE7nJ2sX1vB3pR8aZ", 
      status: "active", 
      owner: "系统管理员", 
      createdAt: "2025-01-15", 
      expiresAt: "2026-01-15",
      permissions: ["读取", "写入", "删除"]
    },
    { 
      id: 'key_2', 
      name: "测试环境API", 
      key: "sk_test_H4rW9sB2xK7yP6vL1mD5nG3z", 
      status: "active", 
      owner: "开发团队", 
      createdAt: "2025-02-01", 
      expiresAt: "2025-05-01",
      permissions: ["读取", "写入"]
    },
    { 
      id: 'key_3', 
      name: "数据分析API", 
      key: "sk_data_F2qS5vX8cT3rY7mN1pB9zL6k", 
      status: "expired", 
      owner: "数据团队", 
      createdAt: "2024-10-10", 
      expiresAt: "2025-02-10",
      permissions: ["读取"]
    },
    { 
      id: 'key_4', 
      name: "企业客户API", 
      key: "sk_ent_J7bN3kR9sL2mP5vX8cT1qF6z", 
      status: "revoked", 
      owner: "企业销售", 
      createdAt: "2025-01-30", 
      expiresAt: "已撤销",
      permissions: ["读取", "写入", "删除", "管理"]
    },
    { 
      id: 'key_5', 
      name: "移动应用API", 
      key: "sk_mob_X3qP7vR2sT9mL5nB8cF1kJ6z", 
      status: "active", 
      owner: "移动团队", 
      createdAt: "2025-02-15", 
      expiresAt: "2025-08-15",
      permissions: ["读取", "写入"]
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('all-keys');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测设备类型
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // 使用useCallback优化频繁渲染的函数
  const getStatusBadge = useCallback((status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 text-white flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <span>活跃</span>
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>已过期</span>
          </Badge>
        );
      case 'revoked':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            <span>已撤销</span>
          </Badge>
        );
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  }, []);
  
  const toggleShowKey = useCallback((id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);
  
  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "成功复制",
      description: "API密钥已复制到剪贴板",
      variant: "default",
    });
  }, []);
  
  const maskApiKey = useCallback((key: string) => {
    return `${key.substring(0, 8)}...${key.substring(key.length - 4)}`;
  }, []);
  
  // 对搜索过滤进行优化，减少重新计算
  const filteredKeys = React.useMemo(() => {
    if (!searchTerm.trim()) return apiKeys;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return apiKeys.filter(apiKey => 
      apiKey.name.toLowerCase().includes(lowerSearchTerm) ||
      apiKey.owner.toLowerCase().includes(lowerSearchTerm)
    );
  }, [apiKeys, searchTerm]);

  // 根据活跃标签过滤密钥
  const displayedKeys = React.useMemo(() => {
    if (activeTab === 'all-keys') return filteredKeys;
    if (activeTab === 'active') return filteredKeys.filter(key => key.status === 'active');
    if (activeTab === 'expired') return filteredKeys.filter(key => key.status === 'expired' || key.status === 'revoked');
    return filteredKeys;
  }, [filteredKeys, activeTab]);

  // 查看密钥详情
  const viewKeyDetails = (apiKey: any) => {
    setSelectedKey(apiKey);
    setIsDialogOpen(true);
  };

  // 移动端列表项
  const renderMobileKeyItem = (apiKey: any) => (
    <motion.div
      key={apiKey.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg overflow-hidden bg-white shadow-sm mb-3 border border-border"
      onClick={() => viewKeyDetails(apiKey)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="font-medium text-base">{apiKey.name}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <UserCircle className="h-3.5 w-3.5 mr-1" />
              {apiKey.owner}
            </div>
          </div>
          {getStatusBadge(apiKey.status)}
        </div>
        
        <div className="flex items-center mt-3 font-mono text-xs bg-muted/30 p-2 rounded">
          {showKeys[apiKey.id] ? (
            <span className="flex-1 truncate">{apiKey.key}</span>
          ) : (
            <span className="flex-1 truncate">{maskApiKey(apiKey.key)}</span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 ml-1" 
            onClick={(e) => {
              e.stopPropagation();
              toggleShowKey(apiKey.id);
            }}
          >
            {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(apiKey.key);
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {apiKey.permissions.map((perm: string, idx: number) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {perm}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-3 pt-2 border-t text-xs text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            <span>{apiKey.createdAt}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );

  // 桌面端详细视图
  const renderDesktopKeysList = () => (
    <div className="rounded-md border hidden sm:block">
      <div className="grid grid-cols-8 bg-muted/50 p-3 text-sm font-medium">
        <div className="col-span-2">名称/所有者</div>
        <div className="col-span-3">API密钥</div>
        <div>状态</div>
        <div>创建日期</div>
        <div className="text-right">操作</div>
      </div>
      
      <AnimatePresence>
        {displayedKeys.length > 0 ? (
          <div className="divide-y">
            {displayedKeys.map(apiKey => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-8 items-center p-3 hover:bg-muted/20 transition-colors"
              >
                <div className="col-span-2">
                  <div className="font-medium">{apiKey.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <UserCircle className="h-3 w-3" />
                    {apiKey.owner}
                  </div>
                </div>
                <div className="col-span-3 font-mono text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={() => toggleShowKey(apiKey.id)}
                    >
                      {showKeys[apiKey.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0" 
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {apiKey.permissions.map((perm: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-[10px] py-0 px-1">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>{getStatusBadge(apiKey.status)}</div>
                <div className="text-xs flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {apiKey.createdAt}
                </div>
                <div className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>密钥操作</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => viewKeyDetails(apiKey)}>
                        <Search className="h-4 w-4" />
                        查看详情
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={() => copyToClipboard(apiKey.key)}>
                        <Copy className="h-4 w-4" />
                        复制密钥
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <Shield className="h-4 w-4" />
                        修改权限
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                        <RefreshCw className="h-4 w-4" />
                        续期
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                        撤销密钥
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 text-center"
          >
            <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              <Key className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">未找到匹配API密钥</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              尝试调整搜索条件或创建新的API密钥
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // 密钥详情对话框
  const renderKeyDetailDialog = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md w-full max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            密钥详情
          </DialogTitle>
          <DialogDescription>
            API密钥详细信息及操作选项
          </DialogDescription>
        </DialogHeader>
        
        {selectedKey && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>API密钥名称</Label>
              <div className="flex items-center gap-2 font-medium text-base">
                <Tag className="h-4 w-4 text-primary" />
                {selectedKey.name}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>API密钥</Label>
              <div className="flex items-center justify-between bg-muted/30 p-2 rounded font-mono">
                <span className="text-sm break-all">
                  {showKeys[selectedKey.id] ? selectedKey.key : maskApiKey(selectedKey.key)}
                </span>
                <div className="flex">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => toggleShowKey(selectedKey.id)}
                  >
                    {showKeys[selectedKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => copyToClipboard(selectedKey.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>状态</Label>
                <div>{getStatusBadge(selectedKey.status)}</div>
              </div>
              <div className="space-y-2">
                <Label>所有者</Label>
                <div className="flex items-center text-sm">
                  <UserCircle className="h-4 w-4 mr-1" />
                  {selectedKey.owner}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>创建日期</Label>
                <div className="flex items-center text-sm">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {selectedKey.createdAt}
                </div>
              </div>
              <div className="space-y-2">
                <Label>过期日期</Label>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedKey.expiresAt}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>权限</Label>
              <div className="flex flex-wrap gap-2">
                {selectedKey.permissions.map((perm: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {perm}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>备注</Label>
              <Textarea placeholder="添加API密钥使用备注..." className="resize-none h-20" />
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsDialogOpen(false)}>关闭</Button>
          <Button className="bg-primary w-full sm:w-auto">更新密钥</Button>
          {selectedKey?.status === 'active' && (
            <Button variant="destructive" className="w-full sm:w-auto">撤销密钥</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // 创建新API密钥对话框
  const renderCreateKeyDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 ml-auto min-h-[44px]">
          <Plus className="h-4 w-4 mr-1" />
          创建API密钥
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            创建新API密钥
          </DialogTitle>
          <DialogDescription>
            创建一个新的API密钥以访问系统API。请确保安全存储密钥，它只会显示一次。
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 sm:py-4">
          <div className="space-y-2">
            <Label htmlFor="key-name">API密钥名称</Label>
            <Input id="key-name" placeholder="例如：生产环境API" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key-owner">API密钥所有者</Label>
            <Input id="key-owner" placeholder="例如：系统管理员" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key-expiry">过期时间</Label>
            <Input id="key-expiry" type="date" />
          </div>
          <div className="space-y-2">
            <Label>权限</Label>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex items-center space-x-2 min-h-[44px]">
                <Switch id="read" />
                <Label htmlFor="read" className="cursor-pointer">读取</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <Switch id="write" />
                <Label htmlFor="write" className="cursor-pointer">写入</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <Switch id="delete" />
                <Label htmlFor="delete" className="cursor-pointer">删除</Label>
              </div>
              <div className="flex items-center space-x-2 min-h-[44px]">
                <Switch id="manage" />
                <Label htmlFor="manage" className="cursor-pointer">管理</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key-notes">备注（可选）</Label>
            <Textarea id="key-notes" placeholder="添加API密钥使用备注..." className="resize-none h-20" />
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" className="w-full sm:w-auto">取消</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">创建密钥</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // 移动端空状态
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 text-center border rounded-lg"
    >
      <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Key className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-medium">未找到匹配API密钥</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        尝试调整搜索条件或创建新的API密钥
      </p>
    </motion.div>
  );

  return (
    <Layout>
      <div className="space-y-5 animate-fade-in">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <Key className="mr-2 h-5 sm:h-6 w-5 sm:w-6" />
            API密钥管理
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-indigo-100">
            创建、管理和监控API密钥的访问权限和使用情况
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索API密钥..."
              className="pl-9 min-h-[44px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {renderCreateKeyDialog()}
        </div>

        <Tabs defaultValue="all-keys" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all-keys" className="min-h-[44px]">
              所有密钥
            </TabsTrigger>
            <TabsTrigger value="active" className="min-h-[44px]">
              活跃密钥
            </TabsTrigger>
            <TabsTrigger value="expired" className="min-h-[44px]">
              过期密钥
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-keys" className="pt-3 sm:pt-4">
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API密钥列表
                </CardTitle>
                <CardDescription>
                  管理所有API密钥及其访问权限
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderDesktopKeysList()}
                <div className="sm:hidden space-y-3">
                  <AnimatePresence>
                    {displayedKeys.length > 0 ? (
                      displayedKeys.map(renderMobileKeyItem)
                    ) : (
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {renderEmptyState()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 sm:pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-amber-500" />
                  <p>API密钥应安全存储，避免泄露。定期轮换密钥以提高安全性。</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="active" className="pt-3 sm:pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  活跃密钥
                </CardTitle>
                <CardDescription>
                  当前有效的API密钥
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderDesktopKeysList()}
                <div className="sm:hidden space-y-3">
                  <AnimatePresence>
                    {displayedKeys.length > 0 ? (
                      displayedKeys.map(renderMobileKeyItem)
                    ) : (
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {renderEmptyState()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="expired" className="pt-3 sm:pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  过期密钥
                </CardTitle>
                <CardDescription>
                  已过期或撤销的API密钥
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderDesktopKeysList()}
                <div className="sm:hidden space-y-3">
                  <AnimatePresence>
                    {displayedKeys.length > 0 ? (
                      displayedKeys.map(renderMobileKeyItem)
                    ) : (
                      <motion.div
                        key="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {renderEmptyState()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 密钥详情对话框 */}
        {renderKeyDetailDialog()}
      </div>
    </Layout>
  );
};

export default AdminApiKeys;


import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Check, CreditCard, Key, Lock, Moon, Shield, Sun, User, Wallet } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from '@/providers/ThemeProvider';
import { useLanguage } from '@/providers/LanguageProvider';

const Settings = () => {
  const [apiKey, setApiKey] = useState("");
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  const handleSaveAPIKey = () => {
    if (apiKey.trim() === "") {
      toast({
        title: t("error"),
        description: t("api_key_error"),
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: t("success"),
      description: t("api_key_saved"),
      variant: "default",
    });
  };
  
  const handleSavePreferences = () => {
    toast({
      title: t("success"),
      description: t("preferences_saved"),
      variant: "default",
    });
  };

  useEffect(() => {
    // Apply the theme whenever it changes
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("manage_account_preferences")}
          </p>
        </div>
        
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">{t("account")}</TabsTrigger>
            <TabsTrigger value="billing">{t("billing")}</TabsTrigger>
            <TabsTrigger value="api">{t("api_access")}</TabsTrigger>
            <TabsTrigger value="preferences">{t("system_preferences")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("user_profile")}</CardTitle>
                <CardDescription>{t("update_account_info")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input id="name" defaultValue="张三" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input id="email" type="email" defaultValue="zhang@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input id="phone" defaultValue="13800138000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center">
                      {t("company")}
                      <Lock className="ml-1 h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Input 
                      id="company" 
                      defaultValue="腾目科技有限公司" 
                      disabled={true}
                      className="bg-muted cursor-not-allowed"
                    />
                  </div>
                </div>
                <Button>{t("save_changes")}</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("security_settings")}</CardTitle>
                <CardDescription>{t("manage_password_security")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">{t("current_password")}</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t("new_password")}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Button>{t("update_password")}</Button>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm font-medium">{t("two_factor")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t("enable_two_factor")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {t("enable")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("payment_methods")}</CardTitle>
                <CardDescription>{t("manage_payment_billing")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">**** **** **** 4242</p>
                        <p className="text-xs text-muted-foreground">
                          有效期至 12/25
                        </p>
                      </div>
                    </div>
                    <Badge>默认</Badge>
                  </div>
                </div>
                
                <Button variant="outline">{t("add_payment")}</Button>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">{t("billing_history")}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年11月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-11-30
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥258.00</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年10月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-10-31
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥312.50</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">2023年9月账单</p>
                        <p className="text-sm text-muted-foreground">
                          2023-09-30
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="font-medium mr-4">¥186.25</p>
                        <Badge className="bg-green-500">已支付</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("account_quotas")}</CardTitle>
                <CardDescription>{t("manage_resource_limits")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">GPU 实例 (10/20)</p>
                      <p className="text-sm text-muted-foreground">50%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">存储空间 (78/100 GB)</p>
                      <p className="text-sm text-muted-foreground">78%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[78%]"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">网络带宽 (120/1000 GB)</p>
                      <p className="text-sm text-muted-foreground">12%</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[12%]"></div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline">{t("request_increase")}</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("api_access")}</CardTitle>
                <CardDescription>{t("manage_account_preferences")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">{t("api_key")}</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="api-key" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder={language === 'zh-CN' ? "输入您的 API 密钥" : "Enter your API key"} 
                    />
                    <Button onClick={handleSaveAPIKey}>{t("save")}</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'zh-CN' ? "此密钥用于访问 API 和进行程序化操作" : "This key is used to access the API and perform programmatic operations"}
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t("access_permissions")}</h3>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("instance_management")}</span>
                    </div>
                    <Switch defaultChecked id="instance-management" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("user_data_access")}</span>
                    </div>
                    <Switch id="user-data-access" />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("payment_operations")}</span>
                    </div>
                    <Switch id="payment-operations" />
                  </div>
                </div>
                
                <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-yellow-800 dark:text-yellow-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-500">
                        {t("security_tip")}
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                        {t("api_security_warning")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("system_preferences")}</CardTitle>
                <CardDescription>{language === 'zh-CN' ? "自定义您的使用体验" : "Customize your experience"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{t("dark_mode")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("enable_dark_theme")}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                      id="dark-mode"
                    />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{t("notifications")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("receive_notifications")}
                    </p>
                  </div>
                  <Switch 
                    checked={isNotificationsEnabled}
                    onCheckedChange={setIsNotificationsEnabled}
                    id="notifications"
                  />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label htmlFor="language">{t("language")}</Label>
                  <Select 
                    value={language} 
                    onValueChange={(value) => setLanguage(value as "zh-CN" | "en-US")}
                  >
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder={t("select_language")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-CN">{t("simplified_chinese")}</SelectItem>
                      <SelectItem value="en-US">{t("english")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t("timezone")}</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    defaultValue="Asia/Shanghai"
                  >
                    <option value="Asia/Shanghai">{t("china_time")}</option>
                    <option value="America/New_York">{t("eastern_time")}</option>
                    <option value="Europe/London">{t("gmt")}</option>
                  </select>
                </div>
                
                <Button onClick={handleSavePreferences}>{t("save_preferences")}</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;

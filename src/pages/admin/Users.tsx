
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Users as UsersIcon, Filter, MoreVertical, Edit, UserX, Key, Shield, ArrowUpDown } from 'lucide-react';

const AdminUsers = () => {
  // Mock users data
  const [users] = useState([
    { id: 1, name: "张明", email: "zhangming@example.com", status: "active", role: "user", joinDate: "2025-01-15", computeUnits: 1280 },
    { id: 2, name: "李小华", email: "lixiaohua@example.com", status: "active", role: "provider", joinDate: "2025-01-20", computeUnits: 2895 },
    { id: 3, name: "王大力", email: "wangdali@example.com", status: "suspended", role: "admin", joinDate: "2025-01-05", computeUnits: 450 },
    { id: 4, name: "赵云", email: "zhaoyun@example.com", status: "active", role: "user", joinDate: "2025-02-10", computeUnits: 320 },
    { id: 5, name: "刘备", email: "liubei@example.com", status: "pending", role: "provider", joinDate: "2025-02-15", computeUnits: 0 },
    { id: 6, name: "孙尚香", email: "sunshangxiang@example.com", status: "active", role: "user", joinDate: "2025-02-18", computeUnits: 780 },
    { id: 7, name: "诸葛亮", email: "zhugeliang@example.com", status: "active", role: "admin", joinDate: "2024-12-20", computeUnits: 3450 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">活跃</Badge>;
      case 'suspended':
        return <Badge variant="destructive">已停用</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">待验证</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-500">管理员</Badge>;
      case 'provider':
        return <Badge className="bg-blue-500">提供者</Badge>;
      case 'user':
        return <Badge variant="outline">普通用户</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-4 sm:p-6 text-white shadow-md transition-all hover:shadow-lg">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center">
            <UsersIcon className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            用户管理
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-indigo-100">
            管理所有用户账户、权限和计算资源分配
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="pl-9 h-10 w-full touch-target transition-all focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Button variant="outline" className="gap-1 h-10 touch-target flex-1 sm:flex-none transition-all">
              <Filter className="h-4 w-4" />
              筛选
            </Button>
            <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 h-10 touch-target ml-auto flex-1 sm:flex-none transition-colors shadow-sm hover:shadow">
              添加用户
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-users" className="animate-scale-in">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="all-users" className="py-2 touch-target text-sm">所有用户</TabsTrigger>
            <TabsTrigger value="compute-providers" className="py-2 touch-target text-sm">算力提供者</TabsTrigger>
            <TabsTrigger value="administrators" className="py-2 touch-target text-sm">管理员</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-users" className="pt-4">
            <Card className="shadow-sm hover:shadow transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl">用户列表</CardTitle>
                <CardDescription>
                  管理平台上的所有用户账户
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  {/* Table Header - Hidden on xs screens */}
                  <div className="hidden sm:grid grid-cols-7 bg-muted/50 p-3 text-sm font-medium">
                    <div className="col-span-2 flex items-center gap-2">
                      用户信息
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>角色</div>
                    <div>状态</div>
                    <div>注册日期</div>
                    <div>计算单位</div>
                    <div className="text-right">操作</div>
                  </div>
                  
                  {filteredUsers.length > 0 ? (
                    <div className="divide-y">
                      {filteredUsers.map(user => (
                        <div key={user.id} className="grid grid-cols-1 sm:grid-cols-7 items-center p-3 hover:bg-muted/20 transition-colors">
                          {/* Mobile Layout */}
                          <div className="sm:hidden space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
                                    {user.name.charAt(0)}
                                  </div>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.email}</div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0 touch-target">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuLabel>用户操作</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="flex items-center gap-2 touch-target h-10">
                                    <Edit className="h-4 w-4" />
                                    编辑用户
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 touch-target h-10">
                                    <Key className="h-4 w-4" />
                                    重置密码
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="flex items-center gap-2 touch-target h-10">
                                    <Shield className="h-4 w-4" />
                                    修改权限
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="flex items-center gap-2 text-red-600 touch-target h-10">
                                    <UserX className="h-4 w-4" />
                                    停用账户
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getRoleBadge(user.role)}
                              {getStatusBadge(user.status)}
                            </div>
                            <div className="grid grid-cols-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">注册日期:</span> {user.joinDate}
                              </div>
                              <div>
                                <span className="text-muted-foreground">计算单位:</span> <span className="font-medium">{user.computeUnits}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Desktop Layout */}
                          <div className="hidden sm:flex col-span-2 items-center gap-3">
                            <Avatar>
                              <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
                                {user.name.charAt(0)}
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                          <div className="hidden sm:block">{getRoleBadge(user.role)}</div>
                          <div className="hidden sm:block">{getStatusBadge(user.status)}</div>
                          <div className="hidden sm:block text-sm">{user.joinDate}</div>
                          <div className="hidden sm:block font-medium">{user.computeUnits}</div>
                          <div className="hidden sm:block text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>用户操作</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  编辑用户
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Key className="h-4 w-4" />
                                  重置密码
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Shield className="h-4 w-4" />
                                  修改权限
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                  <UserX className="h-4 w-4" />
                                  停用账户
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <UsersIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">未找到匹配用户</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        尝试调整搜索条件或筛选器
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compute-providers" className="pt-4">
            {/* Similar to all-users tab, but filtered for compute providers */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle>算力提供者</CardTitle>
                <CardDescription>
                  管理所有提供计算资源的用户
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">算力提供者详细列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="administrators" className="pt-4">
            {/* Similar to all-users tab, but filtered for admins */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardHeader>
                <CardTitle>管理员账户</CardTitle>
                <CardDescription>
                  查看和管理有管理权限的用户账户
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">管理员账户列表</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminUsers;

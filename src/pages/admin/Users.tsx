
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UsersIcon } from 'lucide-react';
import UserList from './components/users/UserList';
import UserSearch from './components/users/UserSearch';
import { User } from '@/types/auth';

const AdminUsers = () => {
  // Mock users data
  const [users] = useState<User[]>([
    { id: '1', username: "张明", email: "zhangming@example.com", status: "active", role: "renter", joinDate: "2025-01-15", computeUnits: 1280 },
    { id: '2', username: "李小华", email: "lixiaohua@example.com", status: "active", role: "provider", joinDate: "2025-01-20", computeUnits: 2895 },
    { id: '3', username: "王大力", email: "wangdali@example.com", status: "suspended", role: "admin", joinDate: "2025-01-05", computeUnits: 450 },
    { id: '4', username: "赵云", email: "zhaoyun@example.com", status: "active", role: "renter", joinDate: "2025-02-10", computeUnits: 320 },
    { id: '5', username: "刘备", email: "liubei@example.com", status: "pending", role: "provider", joinDate: "2025-02-15", computeUnits: 0 },
    { id: '6', username: "孙尚香", email: "sunshangxiang@example.com", status: "active", role: "renter", joinDate: "2025-02-18", computeUnits: 780 },
    { id: '7', username: "诸葛亮", email: "zhugeliang@example.com", status: "active", role: "admin", joinDate: "2024-12-20", computeUnits: 3450 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
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

        <UserSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Tabs defaultValue="all-users" className="animate-scale-in">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="all-users" className="py-2 touch-target text-sm">所有用户</TabsTrigger>
            <TabsTrigger value="compute-providers" className="py-2 touch-target text-sm">算力提供者</TabsTrigger>
            <TabsTrigger value="administrators" className="py-2 touch-target text-sm">管理员</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-users" className="pt-4">
            <UserList users={users} searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="compute-providers" className="pt-4">
            <Card className="shadow-sm hover:shadow transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl">算力提供者</CardTitle>
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

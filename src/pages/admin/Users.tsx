
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Users as UsersIcon, Filter, MoreVertical, Edit, UserX, Key, Shield, ArrowUpDown, ChevronRight, ChevronDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// User interface for the tree structure
interface UserNode {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  role: 'user' | 'provider' | 'admin';
  joinDate: string;
  computeUnits: number;
  department?: string;
  children?: UserNode[];
  expanded?: boolean;
}

const AdminUsers = () => {
  // Mock hierarchical users data with parent-child relationships
  const [usersTree, setUsersTree] = useState<UserNode[]>([
    { 
      id: 7, 
      name: "诸葛亮", 
      email: "zhugeliang@example.com", 
      status: "active", 
      role: "admin", 
      joinDate: "2024-12-20", 
      computeUnits: 3450,
      department: "管理部门",
      expanded: true,
      children: [
        { 
          id: 3, 
          name: "王大力", 
          email: "wangdali@example.com", 
          status: "suspended", 
          role: "admin", 
          joinDate: "2025-01-05", 
          computeUnits: 450,
          department: "管理部门",
        }
      ] 
    },
    { 
      id: 2, 
      name: "李小华", 
      email: "lixiaohua@example.com", 
      status: "active", 
      role: "provider", 
      joinDate: "2025-01-20", 
      computeUnits: 2895,
      department: "算力部门",
      expanded: true,
      children: [
        { 
          id: 5, 
          name: "刘备", 
          email: "liubei@example.com", 
          status: "pending", 
          role: "provider", 
          joinDate: "2025-02-15", 
          computeUnits: 0,
          department: "算力部门",
        }
      ]
    },
    { 
      id: 1, 
      name: "张明", 
      email: "zhangming@example.com", 
      status: "active", 
      role: "user", 
      joinDate: "2025-01-15", 
      computeUnits: 1280,
      department: "用户部门",
      expanded: true,
      children: [
        { 
          id: 4, 
          name: "赵云", 
          email: "zhaoyun@example.com", 
          status: "active", 
          role: "user", 
          joinDate: "2025-02-10", 
          computeUnits: 320,
          department: "用户部门",
          children: [
            { 
              id: 6, 
              name: "孙尚香", 
              email: "sunshangxiang@example.com", 
              status: "active", 
              role: "user", 
              joinDate: "2025-02-18", 
              computeUnits: 780,
              department: "用户部门",
            }
          ]
        }
      ]
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedView, setExpandedView] = useState(true);
  
  // Toggle expanded state for a user node
  const toggleExpand = (nodeId: number) => {
    const updateNodes = (nodes: UserNode[]): UserNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, expanded: !node.expanded };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    
    setUsersTree(updateNodes(usersTree));
  };
  
  // Toggle expand all nodes
  const toggleExpandAll = () => {
    const updateAllNodes = (nodes: UserNode[]): UserNode[] => {
      return nodes.map(node => {
        const newNode = { ...node, expanded: expandedView ? false : true };
        if (node.children) {
          newNode.children = updateAllNodes(node.children);
        }
        return newNode;
      });
    };
    
    setUsersTree(updateAllNodes(usersTree));
    setExpandedView(!expandedView);
  };
  
  // Function to render user rows recursively with proper indentation
  const renderUserRows = (users: UserNode[], level = 0) => {
    let rows: React.ReactNode[] = [];
    
    users.forEach(user => {
      // Filter based on search term
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Include this row if it matches search or if we're not searching
      if (!searchTerm || matchesSearch) {
        rows.push(
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center">
                <div style={{ width: `${level * 24}px` }} />
                {user.children && user.children.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 mr-1"
                    onClick={() => toggleExpand(user.id)}
                  >
                    {user.expanded ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </Button>
                )}
                {!user.children && <div className="w-8" />}
                <Avatar className="mr-2">
                  <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
                    {user.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.department || '-'}</TableCell>
            <TableCell>
              {user.role === 'admin' && <Badge className="bg-purple-500">管理员</Badge>}
              {user.role === 'provider' && <Badge className="bg-blue-500">提供者</Badge>}
              {user.role === 'user' && <Badge variant="outline">普通用户</Badge>}
            </TableCell>
            <TableCell>
              {user.status === 'active' && <Badge className="bg-green-500">活跃</Badge>}
              {user.status === 'suspended' && <Badge variant="destructive">已停用</Badge>}
              {user.status === 'pending' && <Badge variant="outline" className="text-amber-500 border-amber-500">待验证</Badge>}
            </TableCell>
            <TableCell>{user.joinDate}</TableCell>
            <TableCell className="font-medium">{user.computeUnits}</TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        );
      }
      
      // If this node is expanded, also render its children
      if (user.expanded && user.children && user.children.length > 0) {
        rows = rows.concat(renderUserRows(user.children, level + 1));
      }
    });
    
    return rows;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center">
            <UsersIcon className="mr-2 h-6 w-6" />
            用户管理
          </h1>
          <p className="mt-2 text-indigo-100">
            管理所有用户账户、权限和计算资源分配
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索用户..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="gap-1"
              onClick={toggleExpandAll}
            >
              {expandedView ? '折叠全部' : '展开全部'}
            </Button>
            <Button className="gap-1 bg-indigo-600 hover:bg-indigo-700 ml-auto">
              添加用户
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>用户列表</CardTitle>
            <CardDescription>
              管理平台上的所有用户账户（树形结构展示）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">
                      <div className="flex items-center">
                        用户信息
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableHead>
                    <TableHead>部门</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>注册日期</TableHead>
                    <TableHead>计算单位</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderUserRows(usersTree).length > 0 ? (
                    renderUserRows(usersTree)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <UsersIcon className="h-8 w-8 text-muted-foreground mb-2" />
                          <div className="text-lg font-medium">未找到匹配用户</div>
                          <p className="text-sm text-muted-foreground">
                            尝试调整搜索条件或筛选器
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminUsers;

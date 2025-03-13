
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, UserX, Key, Shield } from 'lucide-react';

const UserActions = () => {
  return (
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
  );
};

export default UserActions;

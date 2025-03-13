
import React from 'react';
import { User } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit, UserX, Key, Shield, ArrowUpDown, UsersIcon } from 'lucide-react';
import UserTableRow from './UserTableRow';

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <>
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
      
      {users.length > 0 ? (
        <div className="divide-y">
          {users.map(user => (
            <UserTableRow key={user.id} user={user} />
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
    </>
  );
};

export default UserTable;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserTable from './UserTable';
import { User } from '@/types/auth';

interface UserListProps {
  users: User[];
  searchTerm: string;
}

const UserList = ({ users, searchTerm }: UserListProps) => {
  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm hover:shadow transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl">用户列表</CardTitle>
        <CardDescription>
          管理平台上的所有用户账户
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <UserTable users={filteredUsers} />
        </div>
      </CardContent>
    </Card>
  );
};

export default UserList;


import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role?: string;
}

export const UserRoleBadge = ({ role }: UserRoleBadgeProps) => {
  switch (role) {
    case 'admin':
      return <Badge className="bg-purple-500">管理员</Badge>;
    case 'provider':
      return <Badge className="bg-blue-500">提供者</Badge>;
    case 'renter':
      return <Badge variant="outline">普通用户</Badge>;
    default:
      return <Badge variant="outline">未知</Badge>;
  }
};

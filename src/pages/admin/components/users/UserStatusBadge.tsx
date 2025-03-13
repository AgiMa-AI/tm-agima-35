
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UserStatusBadgeProps {
  status?: string;
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
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

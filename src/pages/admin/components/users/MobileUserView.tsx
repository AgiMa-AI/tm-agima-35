
import React from 'react';
import { User } from '@/types/auth';
import { Avatar } from '@/components/ui/avatar';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import UserActions from './UserActions';
import { cn } from '@/lib/utils';

interface MobileUserViewProps {
  user: User;
}

const MobileUserView = ({ user }: MobileUserViewProps) => {
  return (
    <div className="sm:hidden space-y-2 mobile-spacing no-tap-highlight">
      <div className="flex items-center justify-between press-effect">
        <div className="flex items-center gap-2 touch-target">
          <Avatar className="touch-friendly">
            <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
              {user.username?.charAt(0)}
            </div>
          </Avatar>
          <div className="mobile-active-state px-2 py-1 rounded-md">
            <div className="font-medium responsive-text">{user.username}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <div className="touch-target">
          <UserActions />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <UserRoleBadge role={user.role} />
        <UserStatusBadge status={user.status} />
      </div>
      <div className={cn(
        "grid grid-cols-2 text-sm",
        "touch-target mobile-active-state rounded-md p-2"
      )}>
        <div>
          <span className="text-muted-foreground">注册日期:</span> {user.joinDate}
        </div>
        <div>
          <span className="text-muted-foreground">计算单位:</span> <span className="font-medium">{user.computeUnits}</span>
        </div>
      </div>
    </div>
  );
};

export default MobileUserView;

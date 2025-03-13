
import React from 'react';
import { User } from '@/types/auth';
import { Avatar } from '@/components/ui/avatar';
import { UserRoleBadge } from './UserRoleBadge';
import { UserStatusBadge } from './UserStatusBadge';
import UserActions from './UserActions';

interface DesktopUserViewProps {
  user: User;
}

const DesktopUserView = ({ user }: DesktopUserViewProps) => {
  return (
    <>
      <div className="hidden sm:flex col-span-2 items-center gap-3">
        <Avatar>
          <div className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 font-semibold">
            {user.username?.charAt(0)}
          </div>
        </Avatar>
        <div>
          <div className="font-medium">{user.username}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
        </div>
      </div>
      <div className="hidden sm:block"><UserRoleBadge role={user.role} /></div>
      <div className="hidden sm:block"><UserStatusBadge status={user.status} /></div>
      <div className="hidden sm:block text-sm">{user.joinDate}</div>
      <div className="hidden sm:block font-medium">{user.computeUnits}</div>
      <div className="hidden sm:block text-right">
        <UserActions />
      </div>
    </>
  );
};

export default DesktopUserView;

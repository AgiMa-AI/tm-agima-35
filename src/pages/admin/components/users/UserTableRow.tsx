
import React from 'react';
import { User } from '@/types/auth';
import MobileUserView from './MobileUserView';
import DesktopUserView from './DesktopUserView';

interface UserTableRowProps {
  user: User;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-7 items-center p-3 hover:bg-muted/20 transition-colors">
      {/* Mobile Layout */}
      <MobileUserView user={user} />
      
      {/* Desktop Layout */}
      <DesktopUserView user={user} />
    </div>
  );
};

export default UserTableRow;

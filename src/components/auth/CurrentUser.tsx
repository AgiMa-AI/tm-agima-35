
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from '@/types/auth';

interface CurrentUserProps {
  user: User;
  onSwitchAccount: () => void;
}

const CurrentUser = ({ user, onSwitchAccount }: CurrentUserProps) => {
  return (
    <div className="space-y-3 sm:space-y-4 py-1 sm:py-2">
      <div className="text-center mb-1 sm:mb-2">
        <h3 className="text-base sm:text-lg font-medium">当前登录账号</h3>
        <p className="text-sm text-muted-foreground">{user.username}</p>
      </div>
      <Button 
        onClick={onSwitchAccount}
        className="w-full h-10 sm:h-12 rounded-xl touch-target"
      >
        切换账号
      </Button>
    </div>
  );
};

export default CurrentUser;

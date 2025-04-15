
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  LineChart, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth'; // Changed from '@/hooks/use-auth'
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileSidebarProps {
  onClose: () => void;
}

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: LayoutDashboard, label: '实例', path: '/instances' },
    { icon: LineChart, label: '图表', path: '/charts' },
    ...(user?.role === 'admin' ? [
      { icon: Users, label: '用户管理', path: '/admin/users' }
    ] : []),
    { icon: Settings, label: '设置', path: '/settings' },
  ];

  return (
    <div className="h-full py-6 flex flex-col">
      <div className="px-6 pb-6 border-b">
        <h2 className="text-lg font-semibold">算力市场</h2>
      </div>

      <ScrollArea className="flex-1 px-6">
        <nav className="space-y-2 py-6">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start h-12"
              asChild
              onClick={onClose}
            >
              <Link to={item.path}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>

      <div className="px-6 pt-6 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start h-12 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => {
            logout();
            onClose();
          }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default MobileSidebar;

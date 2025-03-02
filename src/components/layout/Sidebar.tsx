
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Server, CreditCard, Clock, Settings, Plus, Database, Smartphone } from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  className?: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon, title, href, isActive }: NavItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        size="sm"
        className={cn(
          'w-full justify-start gap-2 mb-1',
          isActive ? 'bg-secondary font-medium' : 'font-normal'
        )}
      >
        {icon}
        <span>{title}</span>
      </Button>
    </Link>
  );
};

const Sidebar = ({ collapsed, className }: SidebarProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={cn(
      'border-r bg-background transition-all duration-300 ease-in-out',
      collapsed ? 'w-[70px]' : 'w-[240px]',
      'lg:block',
      className
    )}>
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            {!collapsed && <span className="text-xl">GPU 云平台</span>}
            {collapsed && <Server className="h-6 w-6" />}
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            <div className="grid gap-1 px-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                概览
              </h3>
              <NavItem 
                href="/" 
                icon={<Home className="h-4 w-4" />}
                title="控制面板"
                isActive={isActive('/')}
              />
              <NavItem 
                href="/instances" 
                icon={<Server className="h-4 w-4" />}
                title="所有实例"
                isActive={isActive('/instances')}
              />
              <NavItem 
                href="/billing" 
                icon={<CreditCard className="h-4 w-4" />}
                title="账单"
                isActive={isActive('/billing')}
              />
              <NavItem 
                href="/history" 
                icon={<Clock className="h-4 w-4" />}
                title="使用历史"
                isActive={isActive('/history')}
              />
            </div>
            
            {!collapsed && <Separator className="my-4" />}
            
            <div className="grid gap-1 px-2 pt-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                管理
              </h3>
              <NavItem 
                href="/storage" 
                icon={<Database className="h-4 w-4" />}
                title="存储"
                isActive={isActive('/storage')}
              />
              <NavItem 
                href="/mobile-app" 
                icon={<Smartphone className="h-4 w-4" />}
                title="移动应用"
                isActive={isActive('/mobile-app')}
              />
              <NavItem 
                href="/settings" 
                icon={<Settings className="h-4 w-4" />}
                title="设置"
                isActive={isActive('/settings')}
              />
            </div>
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          <Button className="w-full justify-center" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {!collapsed ? "新建实例" : null}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

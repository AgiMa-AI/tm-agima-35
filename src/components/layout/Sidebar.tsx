
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, Server, CreditCard, Clock, Settings, Plus, Database } from 'lucide-react';

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
      className
    )}>
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            {!collapsed && <span className="text-xl">Cloud GPU</span>}
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-2 px-2">
            <div className="grid gap-1 px-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                Overview
              </h3>
              <NavItem 
                href="/" 
                icon={<Home className="h-4 w-4" />}
                title="Dashboard"
                isActive={isActive('/')}
              />
              <NavItem 
                href="/instances" 
                icon={<Server className="h-4 w-4" />}
                title="All Instances"
                isActive={isActive('/instances')}
              />
              <NavItem 
                href="/billing" 
                icon={<CreditCard className="h-4 w-4" />}
                title="Billing"
                isActive={isActive('/billing')}
              />
              <NavItem 
                href="/history" 
                icon={<Clock className="h-4 w-4" />}
                title="Usage History"
                isActive={isActive('/history')}
              />
            </div>
            
            {!collapsed && <Separator className="my-4" />}
            
            <div className="grid gap-1 px-2 pt-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                Management
              </h3>
              <NavItem 
                href="/storage" 
                icon={<Database className="h-4 w-4" />}
                title="Storage"
                isActive={isActive('/storage')}
              />
              <NavItem 
                href="/settings" 
                icon={<Settings className="h-4 w-4" />}
                title="Settings"
                isActive={isActive('/settings')}
              />
            </div>
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            {!collapsed && "New Instance"}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

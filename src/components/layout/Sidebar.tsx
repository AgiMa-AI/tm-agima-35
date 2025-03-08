
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, Server, CreditCard, Clock, Settings, Database, 
  Smartphone, BarChart, Bot, Cpu, Globe, Users, Key, 
  Puzzle, Shield, LineChart, PieChart, Share2, Wifi, Zap,
  Network
} from 'lucide-react';

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
            {!collapsed && <span className="text-xl">算力云平台</span>}
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
                数据概览
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
                title="主机实例"
                isActive={isActive('/instances')}
              />
              <NavItem 
                href="/agi-models" 
                icon={<Bot className="h-4 w-4" />}
                title="AGI 模型"
                isActive={isActive('/agi-models') || location.pathname.startsWith('/agi/')}
              />
              <NavItem 
                href="/charts" 
                icon={<BarChart className="h-4 w-4" />}
                title="市场数据"
                isActive={isActive('/charts')}
              />
            </div>
            
            <div className="grid gap-1 px-2 pt-4">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                算力业务
              </h3>
              <NavItem 
                href="/agi-hosting" 
                icon={<Cpu className="h-4 w-4" />}
                title="算力出租"
                isActive={isActive('/agi-hosting')}
              />
              <NavItem 
                href="/agi-leasing" 
                icon={<LineChart className="h-4 w-4" />}
                title="按天租赁"
                isActive={isActive('/agi-leasing')}
              />
              <NavItem 
                href="/service-distribution" 
                icon={<Network className="h-4 w-4" />}
                title="服务分布"
                isActive={isActive('/service-distribution')}
              />
              <NavItem 
                href="/mobile-computing" 
                icon={<Smartphone className="h-4 w-4" />}
                title="移动算力"
                isActive={isActive('/mobile-computing')}
              />
              <NavItem 
                href="/earnings" 
                icon={<PieChart className="h-4 w-4" />}
                title="收益明细"
                isActive={isActive('/earnings')}
              />
            </div>
            
            {!collapsed && <Separator className="my-4" />}
            
            <div className="grid gap-1 px-2 pt-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground",
                collapsed && "sr-only"
              )}>
                用户中心
              </h3>
              <NavItem 
                href="/invitation" 
                icon={<Share2 className="h-4 w-4" />}
                title="邀请管理"
                isActive={isActive('/invitation')}
              />
              <NavItem 
                href="/storage" 
                icon={<Database className="h-4 w-4" />}
                title="存储管理"
                isActive={isActive('/storage')}
              />
              <NavItem 
                href="/mobile-app" 
                icon={<Zap className="h-4 w-4" />}
                title="移动应用"
                isActive={isActive('/mobile-app')}
              />
              <NavItem 
                href="/settings" 
                icon={<Settings className="h-4 w-4" />}
                title="账户设置"
                isActive={isActive('/settings')}
              />
            </div>
            
            {!collapsed && <Separator className="my-4" />}
            
            <div className="grid gap-1 px-2 pt-2">
              <h3 className={cn(
                "mb-1 text-xs font-medium text-muted-foreground bg-primary/5 px-2 py-1 rounded-sm",
                collapsed && "sr-only"
              )}>
                后台管理
              </h3>
              <NavItem 
                href="/admin/dashboard" 
                icon={<Shield className="h-4 w-4" />}
                title="管理控制台"
                isActive={isActive('/admin/dashboard')}
              />
              <NavItem 
                href="/admin/users" 
                icon={<Users className="h-4 w-4" />}
                title="用户管理"
                isActive={isActive('/admin/users')}
              />
              <NavItem 
                href="/admin/tasks" 
                icon={<Clock className="h-4 w-4" />}
                title="任务调度"
                isActive={isActive('/admin/tasks')}
              />
              <NavItem 
                href="/admin/api-keys" 
                icon={<Key className="h-4 w-4" />}
                title="API 密钥"
                isActive={isActive('/admin/api-keys')}
              />
            </div>
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-center bg-primary/5 hover:bg-primary/10 text-primary" 
            asChild
          >
            <Link to="/admin/dashboard">
              <Shield className="h-4 w-4 mr-2" />
              {!collapsed ? "后台管理" : null}
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

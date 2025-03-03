
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, Server, Settings, Shield, Users, Key, 
  Clock, Bot, PieChart, LineChart
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
  const isAdminRoute = location.pathname.startsWith('/admin');

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
            {/* 只在管理员路由中显示管理菜单 */}
            {isAdminRoute ? (
              <>
                <div className="grid gap-1 px-2">
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
                  <NavItem 
                    href="/admin/agi-models" 
                    icon={<Bot className="h-4 w-4" />}
                    title="AGI 模型"
                    isActive={isActive('/admin/agi-models')}
                  />
                </div>
                
                <div className="grid gap-1 px-2 pt-4">
                  <h3 className={cn(
                    "mb-1 text-xs font-medium text-muted-foreground",
                    collapsed && "sr-only"
                  )}>
                    业务数据
                  </h3>
                  <NavItem 
                    href="/admin/analytics" 
                    icon={<LineChart className="h-4 w-4" />}
                    title="数据分析"
                    isActive={isActive('/admin/analytics')}
                  />
                  <NavItem 
                    href="/admin/revenue" 
                    icon={<PieChart className="h-4 w-4" />}
                    title="收益报表"
                    isActive={isActive('/admin/revenue')}
                  />
                </div>
              </>
            ) : (
              <>
                {/* 前端用户导航菜单 */}
                <div className="grid gap-1 px-2">
                  <h3 className={cn(
                    "mb-1 text-xs font-medium text-muted-foreground",
                    collapsed && "sr-only"
                  )}>
                    主菜单
                  </h3>
                  <NavItem 
                    href="/" 
                    icon={<Home className="h-4 w-4" />}
                    title="首页"
                    isActive={isActive('/')}
                  />
                  <NavItem 
                    href="/settings" 
                    icon={<Settings className="h-4 w-4" />}
                    title="设置"
                    isActive={isActive('/settings')}
                  />
                </div>
              </>
            )}
          </nav>
        </ScrollArea>
        <div className="mt-auto p-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-center bg-primary/5 hover:bg-primary/10 text-primary" 
            asChild
          >
            {isAdminRoute ? (
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                {!collapsed ? "返回前台" : null}
              </Link>
            ) : (
              <Link to="/admin/dashboard">
                <Shield className="h-4 w-4 mr-2" />
                {!collapsed ? "进入后台" : null}
              </Link>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

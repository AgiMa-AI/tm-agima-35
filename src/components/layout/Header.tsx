
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, LogOut, Search, Settings, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-16 md:h-20 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="flex items-center space-x-2 font-display font-semibold text-xl transition-colors hover:text-primary text-tiffany-gradient"
          >
            <span className="hidden sm:inline-block">腾目科技</span>
            <span className="sm:hidden">腾目</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索GPU实例..."
              className="w-full pl-10 bg-background border-muted rounded-full"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground"
            aria-label="搜索"
          >
            <Search className="h-5 w-5 sm:hidden" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hidden md:flex"
            aria-label="通知"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border hover:bg-primary/10"
                  aria-label="用户菜单"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="用户头像" />
                    <AvatarFallback className="bg-tiffany-gradient text-white">
                      {user?.username.slice(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg border-primary/10">
                <DropdownMenuLabel className="font-display">我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-tiffany-gradient focus:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/billing')} className="cursor-pointer rounded-lg focus:bg-tiffany-gradient focus:text-white">
                  <span>账单管理</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer rounded-lg focus:bg-tiffany-gradient focus:text-white">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>设置</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer rounded-lg focus:bg-tiffany-gradient focus:text-white">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-1 bg-tiffany-gradient hover:opacity-90 transition-opacity duration-200 rounded-full px-5"
              onClick={handleLogin}
            >
              登录
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens */}
      <div className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索GPU实例..."
            className="w-full pl-10 bg-background border-muted rounded-full"
            onChange={handleSearch}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideSidebar?: boolean;
  searchHandler?: (query: string) => void;
}

const Layout = ({ 
  children, 
  hideHeader = false, 
  hideSidebar = false,
  searchHandler
}: LayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-full flex-col">
      {!hideHeader && <Header onSearch={searchHandler} />}
      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && (
          <>
            <Sidebar collapsed={sidebarCollapsed} />
            <Button 
              variant="outline" 
              size="icon" 
              className="fixed bottom-4 left-4 z-50 rounded-full shadow-md lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </>
        )}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          !hideSidebar && !sidebarCollapsed && !isMobile ? 'ml-[240px]' : 'ml-0'
        )}>
          <div className="container mx-auto py-8 px-4 md:px-8 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

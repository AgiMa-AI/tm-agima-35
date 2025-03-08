
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
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

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-full flex-col bg-white-tiffany">
      {!hideHeader && <Header onSearch={searchHandler} />}
      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            <div 
              className={cn(
                "fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden",
                sidebarCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
              onClick={() => setSidebarCollapsed(true)}
            />
            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed} className={cn(
              "absolute z-50 h-full lg:relative transition-all duration-300 ease-in-out",
              sidebarCollapsed && isMobile ? "-translate-x-full" : "translate-x-0",
              "shadow-lg lg:shadow-none"
            )} />
            {/* Mobile toggle buttons */}
            <Button 
              variant="tiffany" 
              size="icon" 
              className={cn(
                "fixed bottom-4 left-4 z-50 rounded-full shadow-md lg:hidden transition-opacity duration-300",
                !sidebarCollapsed && "opacity-0 pointer-events-none"
              )}
              onClick={toggleSidebar}
            >
              <Menu className="h-4 w-4" />
            </Button>
            {/* Close button - visible when sidebar is open on mobile */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "fixed top-4 left-[260px] z-50 rounded-full shadow-md lg:hidden transition-opacity duration-300 bg-white border-tiffany-light",
                sidebarCollapsed && "opacity-0 pointer-events-none"
              )}
              onClick={() => setSidebarCollapsed(true)}
            >
              <X className="h-4 w-4 text-tiffany-dark" />
            </Button>
          </>
        )}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
          !hideSidebar && !sidebarCollapsed && !isMobile ? 'lg:ml-[240px]' : 'ml-0'
        )}>
          <div className="container mx-auto py-4 sm:py-6 px-3 sm:px-4 md:px-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

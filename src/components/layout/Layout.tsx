
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [scale, setScale] = useState(1);
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
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

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.8));
  };

  const resetZoom = () => {
    setScale(1);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {!hideHeader && <Header onSearch={searchHandler} />}
      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && (
          <>
            {/* Mobile sidebar overlay */}
            <div 
              className={cn(
                "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden",
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
              variant="outline" 
              size="icon" 
              className={cn(
                "fixed bottom-4 left-4 z-50 rounded-full shadow-md lg:hidden transition-opacity duration-300 h-14 w-14 tiffany-shadow touch-friendly",
                !sidebarCollapsed && "opacity-0 pointer-events-none"
              )}
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">打开菜单</span>
            </Button>
            {/* Close button - visible when sidebar is open on mobile */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "fixed top-4 left-[260px] z-50 rounded-full shadow-md lg:hidden transition-opacity duration-300 touch-friendly",
                sidebarCollapsed && "opacity-0 pointer-events-none"
              )}
              onClick={() => setSidebarCollapsed(true)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">关闭菜单</span>
            </Button>
          </>
        )}
        <main className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 ease-in-out scroll-container",
          !hideSidebar && !sidebarCollapsed && !isMobile ? 'lg:ml-[240px]' : 'ml-0'
        )}>
          <div 
            className="container mx-auto py-4 sm:py-6 px-3 sm:px-4 md:px-6 animate-fade-in"
            style={isMobile ? { transform: `scale(${scale})`, transformOrigin: 'top center' } : undefined}
          >
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile zoom controls - improved positioning */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full shadow-md h-12 w-12 touch-friendly" 
            onClick={zoomIn}
            title="放大"
          >
            <ZoomIn className="h-5 w-5" />
            <span className="sr-only">放大</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full shadow-md h-12 w-12 touch-friendly" 
            onClick={zoomOut}
            title="缩小"
          >
            <ZoomOut className="h-5 w-5" />
            <span className="sr-only">缩小</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md h-12 w-12 touch-friendly"
            onClick={resetZoom}
            title="重置大小"
          >
            <span className="text-xs font-medium">100%</span>
            <span className="sr-only">重置大小</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Layout;

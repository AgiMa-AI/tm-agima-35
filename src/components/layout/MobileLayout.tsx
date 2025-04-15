
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Drawer } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import MobileSidebar from './MobileSidebar';
import MobileHeader from './MobileHeader';

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  // 当路由变化时关闭抽屉
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />
      
      {/* 移动端菜单按钮 */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full shadow-md lg:hidden h-14 w-14"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* 移动端导航抽屉 */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <MobileSidebar onClose={() => setIsOpen(false)} />
      </Drawer>

      {/* 主要内容区域 */}
      <main className="pb-20 pt-16">
        <div className="container px-4 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MobileLayout;

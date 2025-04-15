import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const MobileHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canGoBack = window.history.length > 1;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b">
      <div className="container h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {canGoBack && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {user && (
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Bell className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;


import React from 'react';
import { Card } from '@/components/ui/card';
import PaymentMethods from './PaymentMethods';
import AutoRecharge from './AutoRecharge';
import PromoCode from './PromoCode';
import HelpSection from './HelpSection';
import { useIsMobile } from '@/hooks/use-mobile';

const SidebarTools = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`space-y-${isMobile ? '4' : '6'} mobile-spacing`}>
      <div className="no-tap-highlight card-hover">
        <PaymentMethods />
      </div>
      <div className="no-tap-highlight card-hover">
        <AutoRecharge />
      </div>
      <div className="no-tap-highlight card-hover">
        <PromoCode />
      </div>
      <div className="no-tap-highlight card-hover">
        <HelpSection />
      </div>
    </div>
  );
};

export default SidebarTools;

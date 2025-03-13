
import React from 'react';
import { Card } from '@/components/ui/card';
import PaymentMethods from './PaymentMethods';
import AutoRecharge from './AutoRecharge';
import PromoCode from './PromoCode';
import HelpSection from './HelpSection';

const SidebarTools = () => {
  return (
    <div className="space-y-6">
      <PaymentMethods />
      <AutoRecharge />
      <PromoCode />
      <HelpSection />
    </div>
  );
};

export default SidebarTools;

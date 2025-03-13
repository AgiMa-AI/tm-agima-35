
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Clock, Calendar, CreditCard } from 'lucide-react';

const EarningsSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">总收益 (本月)</p>
              <h3 className="text-2xl font-bold">¥4,980</h3>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>较上月 +15%</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">贡献算力 (小时)</p>
              <h3 className="text-2xl font-bold">248.5</h3>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>较上月 +8%</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">可提现余额</p>
              <h3 className="text-2xl font-bold">¥2,350</h3>
              <div className="flex items-center text-xs text-amber-600 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>下次结算 3天后</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSummaryCards;

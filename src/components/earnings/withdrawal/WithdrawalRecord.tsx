
import React from 'react';

interface WithdrawalRecordProps {
  id: string;
  time: string;
  amount: number;
  status: string;
  method: string;
}

const WithdrawalRecord = ({ id, time, amount, status, method }: WithdrawalRecordProps) => {
  return (
    <div className="flex justify-between items-center p-2 sm:p-3 bg-muted/10 rounded-lg border">
      <div>
        <p className="font-medium text-sm">{id}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary text-sm">¥{amount}</p>
        <p className="text-xs">{method}</p>
      </div>
    </div>
  );
};

export default WithdrawalRecord;

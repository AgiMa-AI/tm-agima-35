
import React from 'react';
import WithdrawalRecord from './WithdrawalRecord';

interface WithdrawalData {
  id: string;
  time: string;
  amount: number;
  status: string;
  method: string;
}

interface WithdrawalListProps {
  withdrawals: WithdrawalData[];
}

const WithdrawalList = ({ withdrawals }: WithdrawalListProps) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      {withdrawals.map((withdrawal) => (
        <WithdrawalRecord 
          key={withdrawal.id}
          id={withdrawal.id}
          time={withdrawal.time}
          amount={withdrawal.amount}
          status={withdrawal.status}
          method={withdrawal.method}
        />
      ))}
    </div>
  );
};

export default WithdrawalList;


import { User, TransferResult } from "@/types/auth";
import { mockUsers } from "@/data/mockUsers";

// 转账手续费率 (当没有足够能量时)
const TRANSFER_FEE_RATE = 0.01; // 1%
// 每次转账消耗的能量值
const ENERGY_COST_PER_TRANSFER = 1;

// 查找用户通过用户名
export const findUserByUsername = async (username: string): Promise<User | null> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = mockUsers.find(u => u.username === username);
  
  if (!user) return null;
  
  // 不返回密码等敏感信息
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// 用户间转账功能
export const transferFunds = async (
  senderId: string,
  recipientId: string,
  amount: number
): Promise<TransferResult> => {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 验证数据
  if (!senderId || !recipientId) {
    return { success: false, message: "发送者或接收者信息缺失" };
  }
  
  if (senderId === recipientId) {
    return { success: false, message: "不能给自己转账" };
  }
  
  if (amount <= 0) {
    return { success: false, message: "转账金额必须大于0" };
  }
  
  // 查找发送方和接收方
  const senderIndex = mockUsers.findIndex(u => u.id === senderId);
  const recipientIndex = mockUsers.findIndex(u => u.id === recipientId);
  
  if (senderIndex === -1) {
    return { success: false, message: "发送方用户不存在" };
  }
  
  if (recipientIndex === -1) {
    return { success: false, message: "接收方用户不存在" };
  }
  
  const sender = mockUsers[senderIndex];
  
  // 检查余额是否足够
  if (!sender.balance || sender.balance < amount) {
    return { success: false, message: "余额不足" };
  }
  
  // 计算手续费
  let transferFee = 0;
  let energyUsed = false;
  
  // 检查是否有足够的能量值
  if (sender.energy && sender.energy >= ENERGY_COST_PER_TRANSFER) {
    // 使用能量进行免费转账
    mockUsers[senderIndex].energy! -= ENERGY_COST_PER_TRANSFER;
    energyUsed = true;
  } else {
    // 收取手续费
    transferFee = amount * TRANSFER_FEE_RATE;
  }
  
  // 执行转账
  const actualTransferAmount = amount - transferFee;
  
  // 更新发送方余额
  mockUsers[senderIndex].balance! -= amount;
  
  // 更新接收方余额
  if (!mockUsers[recipientIndex].balance) {
    mockUsers[recipientIndex].balance = 0;
  }
  mockUsers[recipientIndex].balance! += actualTransferAmount;
  
  return { 
    success: true, 
    message: `转账成功${transferFee > 0 ? '，已收取手续费' : ''}`,
    transferFee: transferFee > 0 ? transferFee : undefined,
    energyUsed: energyUsed
  };
};

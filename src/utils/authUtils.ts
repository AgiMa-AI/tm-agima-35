
import { mockUsers } from "@/data/mockUsers";
import { User, UserWithPassword } from "@/types/auth";

// 生成唯一邀请码
export const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'AGI-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// 查找用户通过邀请码
export const findUserByInviteCode = (inviteCode: string): UserWithPassword | undefined => {
  return mockUsers.find(user => user.inviteCode === inviteCode);
};

// 获取用户邀请树
export const getUserInviteTree = (userId: string): string[] => {
  const foundUser = mockUsers.find(u => u.id === userId);
  return foundUser?.inviteTree || [];
};

// 创建新用户 (返回不含密码的用户对象)
export const createUser = (
  username: string,
  email: string,
  password: string,
  role: 'renter' | 'provider',
  inviteCode?: string
): { newUser: User; success: boolean; message?: string } => {
  
  // 检查用户是否已存在
  const userExists = mockUsers.some(
    u => u.username === username || u.email === email
  );
  
  if (userExists) {
    return { 
      newUser: {} as User, 
      success: false, 
      message: "用户名或邮箱已被使用" 
    };
  }
  
  // 检查邀请码是否有效
  let inviterUser = null;
  let inviteTree: string[] = [];
  
  if (inviteCode) {
    // 使用根邀请码时的特殊处理
    if (inviteCode === "agi1a01") { // ROOT_INVITE_CODE
      // 用户使用根邀请码注册，将其视为平台直接邀请
      inviteTree = ['3']; // 设置agima为上级
    } else {
      inviterUser = findUserByInviteCode(inviteCode);
      if (!inviterUser) {
        return { 
          newUser: {} as User, 
          success: false, 
          message: "邀请码无效" 
        };
      }
      
      // 复制邀请人的邀请树，并添加新用户
      inviteTree = [...inviterUser.inviteTree];
    }
  } else {
    // 没有邀请码时，默认使用根邀请码作为邀请源
    inviteTree = ['3']; // 默认设置agima为上级
  }
  
  // 生成新用户ID
  const newUserId = `${mockUsers.length + 1}`;
  
  // 生成用户的邀请码
  const userInviteCode = generateInviteCode();
  
  // 如果没有邀请人，创建新的邀请树以自己为根
  if (!inviteTree.length) {
    inviteTree = [newUserId];
  } else {
    inviteTree.push(newUserId);
  }
  
  // 创建新用户对象
  const newUser = {
    id: newUserId,
    username,
    email,
    role,
    avatar: '',
    balance: 0,
    credits: 10,
    inviteCode: userInviteCode,
    invitedBy: inviteCode === "agi1a01" ? '3' : (inviterUser ? inviterUser.id : '3'),
    inviteTree
  };
  
  // 添加用户到模拟数据库
  mockUsers.push({...newUser, password});
  
  return { newUser, success: true };
};


import { UserWithPassword } from "@/types/auth";

// 根邀请码，用于标识原始邀请
export const ROOT_INVITE_CODE = "agi1a01";

// Mock user data - replace with real API calls in your implementation
export const mockUsers: UserWithPassword[] = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123',
    role: 'renter' as const,
    status: 'active',
    joinDate: '2023-05-15',
    computeUnits: 50,
    avatar: '',
    balance: 100,
    credits: 50,
    energy: 5, // 添加能量值
    inviteCode: 'DEMO123',
    inviteTree: ['1'] // 自己是根节点
  },
  {
    id: '2',
    username: 'provider',
    email: 'provider@example.com',
    password: 'password123',
    role: 'provider' as const,
    status: 'active',
    joinDate: '2023-06-20',
    computeUnits: 200,
    avatar: '',
    balance: 5000,
    credits: 200,
    energy: 10, // 添加能量值
    inviteCode: 'PROV456',
    invitedBy: '1',
    inviteTree: ['1', '2'] // demo邀请了provider
  },
  // 添加腾目科技/Agi-Ma的演示账户
  {
    id: '3',
    username: 'agima',
    email: 'admin@agima.io',
    password: 'agima123',
    role: 'admin' as const,
    status: 'active',
    joinDate: '2023-01-01',
    computeUnits: 1000,
    avatar: '',
    balance: 10000,
    credits: 1000,
    energy: 100, // 添加能量值
    inviteCode: ROOT_INVITE_CODE, // 将agima账户的邀请码设为根邀请码
    inviteTree: ['3'] // 自己是根节点
  }
];


export interface User {
  id: string;
  username: string;
  email: string;
  role: 'renter' | 'provider' | 'admin';
  status?: 'active' | 'suspended' | 'pending';
  joinDate?: string;
  computeUnits?: number;
  avatar?: string;
  balance?: number;
  credits?: number;
  energy?: number; // 新增能量值字段
  invitedBy?: string; // 邀请人ID
  inviteCode?: string; // 用户自己的邀请码
  inviteTree?: string[]; // 邀请链路径，从根到当前用户
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role: 'renter' | 'provider', inviteCode?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  getUserInviteTree: (userId: string) => string[];
  transferFunds: (recipientId: string, amount: number) => Promise<{success: boolean; message: string;}>;
  findUserByUsername: (username: string) => Promise<User | null>;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface TransferResult {
  success: boolean;
  message: string;
  transferFee?: number;
  energyUsed?: boolean;
}

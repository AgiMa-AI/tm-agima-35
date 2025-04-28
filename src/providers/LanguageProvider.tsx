
import React, { createContext, useContext, useEffect, useState } from "react";

type LanguageType = "zh-CN" | "en-US";

type LanguageProviderProps = {
  children: React.ReactNode;
};

type LanguageContextType = {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
};

// Translation dictionary
const translations: Record<LanguageType, Record<string, string>> = {
  "zh-CN": {
    "settings": "设置",
    "manage_account_preferences": "管理您的账户设置和偏好",
    "account": "账户",
    "billing": "支付",
    "api_access": "API 访问",
    "system_preferences": "系统偏好",
    "user_profile": "用户资料",
    "update_account_info": "更新您的账户信息",
    "name": "姓名",
    "email": "电子邮件",
    "phone": "电话号码",
    "company": "公司",
    "save_changes": "保存更改",
    "security_settings": "安全设置",
    "manage_password_security": "管理您的密码和安全选项",
    "current_password": "当前密码",
    "new_password": "新密码",
    "confirm_password": "确认新密码",
    "update_password": "更新密码",
    "two_factor": "双因素认证",
    "enable_two_factor": "启用两步验证以增强账户安全性",
    "enable": "启用",
    "payment_methods": "支付方式",
    "manage_payment_billing": "管理您的支付方式和账单",
    "add_payment": "添加支付方式",
    "billing_history": "账单历史",
    "account_quotas": "账户配额",
    "manage_resource_limits": "管理您的计算资源限制",
    "request_increase": "申请提高限额",
    "api_key": "API 密钥",
    "save": "保存",
    "access_permissions": "访问权限",
    "instance_management": "实例管理",
    "user_data_access": "用户数据访问",
    "payment_operations": "支付操作",
    "security_tip": "安全提示",
    "api_security_warning": "请勿共享您的 API 密钥。如果您认为密钥已泄露，请立即重新生成密钥。",
    "dark_mode": "深色模式",
    "enable_dark_theme": "启用深色主题",
    "notifications": "通知",
    "receive_notifications": "接收有关您的实例和账户的通知",
    "language": "语言",
    "select_language": "选择语言",
    "simplified_chinese": "简体中文",
    "english": "English",
    "timezone": "时区",
    "china_time": "中国标准时间 (GMT+8)",
    "eastern_time": "东部标准时间 (GMT-5)",
    "gmt": "格林威治标准时间 (GMT)",
    "save_preferences": "保存偏好设置",
    "success": "成功",
    "preferences_saved": "偏好设置已保存",
    "error": "错误",
    "api_key_error": "请输入有效的 API 密钥",
    "api_key_saved": "API 密钥已保存"
  },
  "en-US": {
    "settings": "Settings",
    "manage_account_preferences": "Manage your account settings and preferences",
    "account": "Account",
    "billing": "Billing",
    "api_access": "API Access",
    "system_preferences": "Preferences",
    "user_profile": "User Profile",
    "update_account_info": "Update your account information",
    "name": "Name",
    "email": "Email",
    "phone": "Phone Number",
    "company": "Company",
    "save_changes": "Save Changes",
    "security_settings": "Security Settings",
    "manage_password_security": "Manage your password and security options",
    "current_password": "Current Password",
    "new_password": "New Password",
    "confirm_password": "Confirm New Password",
    "update_password": "Update Password",
    "two_factor": "Two-Factor Authentication",
    "enable_two_factor": "Enable two-factor verification to enhance account security",
    "enable": "Enable",
    "payment_methods": "Payment Methods",
    "manage_payment_billing": "Manage your payment methods and billing",
    "add_payment": "Add Payment Method",
    "billing_history": "Billing History",
    "account_quotas": "Account Quotas",
    "manage_resource_limits": "Manage your computational resource limits",
    "request_increase": "Request Quota Increase",
    "api_key": "API Key",
    "save": "Save",
    "access_permissions": "Access Permissions",
    "instance_management": "Instance Management",
    "user_data_access": "User Data Access",
    "payment_operations": "Payment Operations",
    "security_tip": "Security Tip",
    "api_security_warning": "Do not share your API key. If you believe your key has been compromised, regenerate it immediately.",
    "dark_mode": "Dark Mode",
    "enable_dark_theme": "Enable dark theme",
    "notifications": "Notifications",
    "receive_notifications": "Receive notifications about your instances and account",
    "language": "Language",
    "select_language": "Select Language",
    "simplified_chinese": "简体中文",
    "english": "English",
    "timezone": "Timezone",
    "china_time": "China Standard Time (GMT+8)",
    "eastern_time": "Eastern Standard Time (GMT-5)",
    "gmt": "Greenwich Mean Time (GMT)",
    "save_preferences": "Save Preferences",
    "success": "Success",
    "preferences_saved": "Preferences saved successfully",
    "error": "Error",
    "api_key_error": "Please enter a valid API key",
    "api_key_saved": "API key saved successfully"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem("language") as LanguageType;
    return savedLanguage || "zh-CN";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

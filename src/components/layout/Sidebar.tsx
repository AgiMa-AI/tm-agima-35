
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  LayoutDashboard, Server, Clock, CreditCard, 
  FileText, Settings, Puzzle, Package, Upload,
  Shield, Users, Key, ListTodo, ChevronDown, ChevronUp
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  children?: React.ReactNode;
}

function SidebarLink({ to, icon, label, isActive }: SidebarLinkProps) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start text-sm font-medium h-10",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Link to={to} className="flex items-center w-full">
        {icon}
        <span className="ml-2">{label}</span>
      </Link>
    </Button>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export function Sidebar({ className, collapsed }: SidebarProps) {
  const location = useLocation();
  const [openAdmin, setOpenAdmin] = useState(false);
  
  const mainLinks = [
    { to: "/", label: "首页", icon: <LayoutDashboard className="h-4 w-4" /> },
    { to: "/instances", label: "算力实例", icon: <Server className="h-4 w-4" /> },
    { to: "/billing", label: "账单", icon: <CreditCard className="h-4 w-4" /> },
    { to: "/history", label: "历史", icon: <Clock className="h-4 w-4" /> },
    { to: "/agi-models", label: "AGI 模型", icon: <Puzzle className="h-4 w-4" /> },
    { to: "/agi-leasing", label: "AGI 租赁", icon: <Package className="h-4 w-4" /> },
    { to: "/service-distribution", label: "服务分发", icon: <Upload className="h-4 w-4" /> },
  ];
  
  // Admin links with icons
  const adminLinks = [
    { to: "/admin/dashboard", label: "管理控制台", icon: <Shield className="h-4 w-4" /> },
    { to: "/admin/users", label: "用户管理", icon: <Users className="h-4 w-4" /> },
    { to: "/admin/tasks", label: "任务调度", icon: <ListTodo className="h-4 w-4" /> },
    { to: "/admin/api-keys", label: "API 密钥", icon: <Key className="h-4 w-4" /> },
  ];
  
  const servicesLinks = [
    { to: "/storage", label: "存储服务", icon: <FileText className="h-4 w-4" /> },
    { to: "/settings", label: "设置", icon: <Settings className="h-4 w-4" /> },
  ];
  
  return (
    <div className={cn("pb-12 bg-white dark:bg-gray-950 border-r w-[240px]", className)}>
      <ScrollArea className="h-full">
        <div className="space-y-1 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {/* Main links */}
              {mainLinks.map((link) => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  isActive={location.pathname === link.to}
                />
              ))}
            </div>
          </div>
          
          {/* New Admin Section with Collapsible */}
          <div className="px-3 py-2">
            <Collapsible
              open={openAdmin}
              onOpenChange={setOpenAdmin}
              className="space-y-1"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-between text-sm font-medium h-10",
                    adminLinks.some(link => location.pathname.startsWith(link.to)) 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>管理后台</span>
                  </div>
                  {openAdmin ? 
                    <ChevronUp className="h-4 w-4" /> : 
                    <ChevronDown className="h-4 w-4" />
                  }
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 pt-1 pl-6">
                {adminLinks.map((link) => (
                  <SidebarLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                    isActive={location.pathname === link.to}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* Services links */}
          <div className="px-3 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              服务
            </h2>
            <div className="space-y-1">
              {servicesLinks.map((link) => (
                <SidebarLink
                  key={link.to}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  isActive={location.pathname === link.to}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Instances from "./pages/Instances";
import Details from "./pages/Details";
import History from "./pages/History";
import Billing from "./pages/Billing";
import Storage from "./pages/Storage";
import Settings from "./pages/Settings";
import MobileApp from "./pages/MobileApp";
import Charts from "./pages/Charts";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./providers/AuthProvider";
import AGIModels from "./pages/AGIModels";
import AGIDetailView from "./pages/AGIDetailView";
import AGIHosting from "./pages/AGIHosting";
import AGIRental from "./pages/AGIRental";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

// New pages for the updated business logic
import AGILeasing from "./pages/AGILeasing";
import ServiceDistribution from "./pages/ServiceDistribution";
import CaseStudy from "./pages/CaseStudy";
import MobileComputing from "./pages/MobileComputing";
import Earnings from "./pages/Earnings";
import Invitation from "./pages/Invitation";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminTasks from "./pages/admin/Tasks";
import TaskDetail from "./pages/admin/TaskDetail";
import AdminApiKeys from "./pages/admin/ApiKeys";

// Create a new QueryClient instance with extended caching for our chart data
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/instances" element={<Instances />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/history" element={<History />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mobile-app" element={<MobileApp />} />
            <Route path="/charts" element={<Charts />} />
            
            {/* 服务条款和隐私政策路由 */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* AGI模型相关路由 */}
            <Route path="/agi-models" element={<AGIModels />} />
            <Route path="/agi/:id" element={<AGIDetailView />} />
            <Route path="/agi-hosting" element={<AGIHosting />} />
            <Route path="/agi-rental/:id" element={<AGIRental />} />
            
            {/* 新增业务路由 */}
            <Route path="/agi-leasing" element={<AGILeasing />} />
            <Route path="/service-distribution" element={<ServiceDistribution />} />
            <Route path="/case-studies/:id" element={<CaseStudy />} />
            <Route path="/mobile-computing" element={<MobileComputing />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/invitation" element={<Invitation />} />
            
            {/* 管理后台路由 */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            
            {/* 任务管理路由 - 使用嵌套路由结构 */}
            <Route path="/admin/tasks" element={<AdminTasks />}>
              <Route path=":id" element={<TaskDetail />} />
            </Route>
            
            <Route path="/admin/api-keys" element={<AdminApiKeys />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

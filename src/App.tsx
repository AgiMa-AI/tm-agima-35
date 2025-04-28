
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
import AGIRental from "./pages/AGIRental";
import AGIHosting from "./pages/AGIHosting";
import MobileComputing from "./pages/MobileComputing";
import Earnings from "./pages/Earnings";
import Invitation from "./pages/Invitation";
import ServiceDistribution from "./pages/ServiceDistribution";
import AGILeasing from "./pages/AGILeasing";

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
            <Route path="/agi-models" element={<AGIModels />} />
            <Route path="/agi-rental/:id" element={<AGIRental />} />
            <Route path="/agi-hosting" element={<AGIHosting />} />
            <Route path="/mobile-computing" element={<MobileComputing />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/invitation" element={<Invitation />} />
            <Route path="/service-distribution" element={<ServiceDistribution />} />
            <Route path="/agi-leasing" element={<AGILeasing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

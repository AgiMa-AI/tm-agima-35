
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileLayout from '@/components/layout/MobileLayout';
import Layout from '@/components/layout/Layout';
import Home from './pages/Index';  // Changed from './pages/Home' to './pages/Index'
import Instances from './pages/Instances';
import Charts from './pages/Charts';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import AdminUsers from './pages/admin/Users';
import { AuthProvider } from './providers/AuthProvider'; // Changed from './context/AuthContext'
import Login from './pages/Login';
import Storage from './pages/Storage';

const App = () => {
  const isMobile = useIsMobile();
  const LayoutComponent = isMobile ? MobileLayout : Layout;

  return (
    <Router>
      <AuthProvider>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instances" element={<Instances />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/transfer" element={<Storage />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutComponent>
      </AuthProvider>
    </Router>
  );
};

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileLayout from '@/components/layout/MobileLayout';
import Layout from '@/components/layout/Layout';
import { AuthProvider } from '@/context/AuthContext';

// Update import paths to use index.tsx or create index files for these components
import Home from '@/pages/index';
import Instances from '@/pages/Instances';
import Charts from '@/pages/Charts';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import AdminUsers from '@/pages/admin/Users';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Transfer from '@/pages/Transfer';
import Storage from '@/pages/Storage';

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
            <Route path="/register" element={<Register />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutComponent>
      </AuthProvider>
    </Router>
  );
};

export default App;


import React from 'react';
import { Navigate, Outlet, Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from '../../pages/AdminDashboard';
import { Toaster } from "@/components/ui/toaster";

// In a real application, this would check for actual authentication
// This is just a placeholder for demonstration purposes
const isAuthenticated = () => {
  // In a production app, this would check for an auth token, user session, etc.
  return localStorage.getItem('adminAuthenticated') === 'true';
};

const AdminLayout = () => {
  const [activeTab, setActiveTab] = React.useState("content");
  
  // Redirect unauthenticated users
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-grow">
        {/* Admin Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 p-6 ml-0 md:ml-64 pt-20">
          <Toaster />
          
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/dashboard" element={<AdminDashboard activeTab={activeTab} />} />
            <Route path="*" element={<AdminDashboard activeTab={activeTab} />} />
          </Routes>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

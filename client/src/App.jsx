import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Layouts & Auth
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OTPVerify from './pages/auth/OTPVerify';
import Profile from './pages/settings/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OTPVerify />} />

          {/* Protected Routes (USER, MERCHANT) */}
          <Route element={<ProtectedRoute allowedRoles={['USER', 'MERCHANT', 'ADMIN', 'SUPER_ADMIN']} />}>
            <Route 
              path="/" 
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <MainLayout>
                  <Profile />
                </MainLayout>
              } 
            />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
            <Route 
              path="/admin" 
              element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <AdminLayout>
                  <Users />
                </AdminLayout>
              } 
            />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

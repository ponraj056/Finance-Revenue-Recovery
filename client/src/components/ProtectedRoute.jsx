import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = ['USER', 'MERCHANT', 'ADMIN'] }) => {
  // Mock role fetching. In reality, get this from Context/Redux via JWT
  const userRole = localStorage.getItem('user_role') || 'MERCHANT';
  const isAuthenticated = true; // Mock true for now

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // If not authorized, redirect to dashboard or login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

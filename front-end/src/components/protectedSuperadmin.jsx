import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedSuperAdmin({ isAuthenticated, IsAdmin, isSuperAdmin }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated && !IsAdmin) {
    return <Navigate to="/pharmapage" />;
  }
  if (isAuthenticated && IsAdmin && !isSuperAdmin) {
    return <Navigate to="/adminPage" />;
  }
  if (isAuthenticated && IsAdmin && isSuperAdmin) {
    return <Navigate to="/createadmin" />;
  }
  return <Outlet />;
}

export default ProtectedSuperAdmin;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({
  isAuthenticated,
  isAdmin,
  adminRoute,
  superadminRoute,
  isSuperAdmin,
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to="/pharmapage" />;
  }

  if (!adminRoute && isAdmin) {
    return <Navigate to="/adminPage" />;
  }
  if (superadminRoute && !isSuperAdmin) {
    return <Navigate to="/pharmapage" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

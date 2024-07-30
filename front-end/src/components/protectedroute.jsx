import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, isAdmin, adminRoute }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to="/pharmapage" />;
  }

  if (!adminRoute && isAdmin) {
    return <Navigate to="/adminPage" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

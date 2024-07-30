import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdmin({ isAuthenticated, isAdmin }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/pharmapage" />;
  }
  return <Outlet />;
}

export default ProtectedAdmin;

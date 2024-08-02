import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdmin({
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
  adminRoute,
  superadminRoute,
}) {
  console.log("ProtectedAdmin", {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    adminRoute,
    superadminRoute,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminRoute && !(isAdmin || isSuperAdmin)) {
    return <Navigate to="/pharmapage" />;
  }

  if (superadminRoute && !isSuperAdmin) {
    return <Navigate to="/pharmapage" />;
  }

  return <Outlet />;
}

export default ProtectedAdmin;

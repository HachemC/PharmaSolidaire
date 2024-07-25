import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoute({ isAuthenticated }) {
  return isAuthenticated ? <Navigate to="/pharmapage" /> : <Outlet />;
}

export default PublicRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authentication/auth";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;

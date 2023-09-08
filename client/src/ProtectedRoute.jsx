import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./UserContext/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

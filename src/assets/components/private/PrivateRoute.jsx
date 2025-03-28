import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

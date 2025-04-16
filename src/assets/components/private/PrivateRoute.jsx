import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

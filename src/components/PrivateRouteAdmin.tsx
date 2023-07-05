import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const PrivateRouteAdmin = () => {
  const role = useSelector((state: RootState) => state.user.role);
  return role !== "admin" || role === undefined ? (
    <Navigate to="/sessionExpired" />
  ) : (
    <Outlet />
  );
};

export default PrivateRouteAdmin;

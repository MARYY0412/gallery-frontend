import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const PrivateRoute = () => {
  const username = useSelector((state: RootState) => state.user.username);
  console.log(username);
  return username === "" || username === undefined ? (
    <Navigate to="/sessionExpired" />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;

import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const ChefRoute = ({ role, children }) => {
  const authData = useAuthSelector();
  const location = useLocation();
  const { pathname } = location;

  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated &&
    ((role === "chef" &&
      authData?.userInfo?.role === "chef" &&
      authData?.userInfo?.chefInfo?.documentVerified) ||
      (role === "chef" &&
        authData?.userInfo?.role === "chef" &&
        pathname == "/setup-profile") ||
      pathname == "/request") ? (
    children
  ) : (role === "chef" &&
      isAuthenticated &&
      authData?.userInfo?.role === "chef" &&
      !authData?.userInfo?.chefInfo?.documentVerified) ||
    (role === "chef" &&
      isAuthenticated &&
      authData?.userInfo?.role === "chef" &&
      !authData?.userInfo?.chefInfo?.documentVerified &&
      pathname === "/setup-profile") ? (
    <Navigate to="/setup-profile" />
  ) : (
    <Navigate to="/" />
  );
};

export default ChefRoute;

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const UserRoute = ({ role, children }) => {
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated &&
    role === "user" &&
    authData?.userInfo?.role === "user" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default UserRoute;

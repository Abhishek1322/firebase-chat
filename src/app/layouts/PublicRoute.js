import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const   PublicRoute = ({ children }) => {
  const authData = useAuthSelector();
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = [
    "/",
    "/choose-roles",
    "/verification",
    "/create-account/:role",
    "/forgot-password",
    "/recover-password",
    "/enter-otp",
    "/create-account/chef",
    "/create-account/user",
  ];
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
 
  if (!isAuthenticated && authRoutes.includes(pathName)) {
    return children;
  } else if (
    (isAuthenticated &&
      authData?.userInfo?.role === "chef" &&
      authRoutes.includes(pathName) &&
      pathName !== "/" &&
      !authData?.userInfo?.chefInfo?.documentVerified) ||
    (isAuthenticated &&
      authData?.userInfo?.role === "chef" &&
      authRoutes.includes(pathName) &&
      !authData?.userInfo?.chefInfo?.documentVerified)
  ) {
    return <Navigate to="/setup-profile" />;
  } else if (
    isAuthenticated &&
    authData?.userInfo?.role === "chef" &&
    pathName === "/" &&
    !authData?.userInfo?.chefInfo?.documentVerified
  ) {
    return children;
  } else if (
    isAuthenticated &&
    authData?.userInfo?.role === "chef" &&
    authRoutes.includes(pathName) &&
    authData?.userInfo?.chefInfo?.documentVerified
  ) {
    return <Navigate to="/home" />;
  } else if (
    isAuthenticated &&
    authData?.userInfo?.role === "user" &&
    authRoutes.includes(pathName)
  ) {
    return <Navigate to="/home-user" />;
  }
};

export default PublicRoute;

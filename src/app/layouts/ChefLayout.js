import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Chef_Sidebar from "../components/common/chefSidebar";
import Chef_Navbar from "../components/common/chefNavbar";
import { useAuthSelector } from "../../redux/selector/auth";

const Chef_Layout = ({ role, children }) => {
  const location = useLocation();
  const { pathname } = location;
  const checkRoutes = ["/chef-profile", "/edit-chef-profile"];
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {isAuthenticated &&
      authData?.userInfo?.chefInfo?.documentVerified &&
      authData?.userInfo?.role === "chef" ? (
        <>
          {checkRoutes.includes(pathname) ? (
            <main className="main">
              <Chef_Navbar />
              <Outlet />
            </main>
          ) : (
            <div className="mainBox">
              <Chef_Sidebar />
              <main className="main chefmain">
                <Chef_Navbar />
                <Outlet />
              </main>
            </div>
          )}
        </>
      ) : isAuthenticated && authData?.userInfo?.role === "user" ? (
        <Navigate to="/home-user" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Chef_Layout;

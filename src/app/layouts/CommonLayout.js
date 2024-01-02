import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const CommonLayout = () => {
  return (
    <>
      <main className="main" id="main">
        <Outlet />
      </main>
    </>
  );
};

export default CommonLayout;

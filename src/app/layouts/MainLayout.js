

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar'
import MainNav from '../components/common/mainNav'

const MainLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ['/',];

  return (
    <>
      {/* <AuthNav /> */}
      {authRoutes.includes(pathName) ?
        <>
          <main className='main'>
            <Outlet />
          </main>
        </>
        :
        <>
          <div className="mainBox">
            <Sidebar />
            <main className='main'>
              <MainNav /> 
              <Outlet />
            </main>
          </div>

          {/* <MainFooter/> */}
        </>
      }
      {/* <AuthFooter /> */}
    </>
  );
};

export default MainLayout;
import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import { Link, useLocation } from "react-router-dom";
import { useWebSelector } from "../../../redux/selector/web";

const Chef_Sidebar = () => {
  const location = useLocation();
  const webData = useWebSelector();
  const [chefProfile, setChefProfile] = useState("");

  useEffect(() => {
    if (webData) {
      setChefProfile(webData?.chefProfileDetails?.data?.userInfo?.profilePhoto);
    }
  }, [webData]);

  return (
    <>
      <div className="sideBar chefsideBar ">
        <div className="sidebarlogo">
          <Link to="/home">
            <img src={Images.Logo} alt="logo" className="img-fluid" />
          </Link>
        </div>
        <div className="sidelist">
          <ul>
            <li
              className={
                location.pathname === "/home"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/home" className="sidebarItems">
                <img
                  src={Images.homeOrange}
                  className="imgHide"
                  alt="homeImg"
                />
                <img src={Images.Home} className="imgShow" alt="homeImg" />
                <span className="d-block">Home</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/menu"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/menu" className="sidebarItems">
                <img
                  src={Images.chefmenuOrange}
                  className="imgHide"
                  alt="menuImg"
                />
                <img
                  src={Images.chefsideMenu}
                  className="imgShow"
                  alt="menuImg"
                />
                <span className="d-block">Menu</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/new-booking"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/new-booking" className="sidebarItems">
                <img
                  src={Images.myorderorange}
                  className="imgHide"
                  alt="BookingImg"
                />
                <img
                  src={Images.myorder}
                  className="imgShow"
                  alt="BookingImg"
                />
                <span className="d-block">Bookings</span>
              </Link>
            </li>

            <li
              className={
                location.pathname === "/setting"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/setting" className=" sidebarItems">
                <img
                  src={Images.setting}
                  className="imgHide"
                  alt="settingImg"
                />
                <img
                  src={Images.settingGray}
                  className="imgShow"
                  alt="settingImg"
                />
                <span className="d-block">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarProfile">
          <Link to="/chef-profile">
            <img
              src={chefProfile ? chefProfile : Images.dummyProfile}
              alt="logo"
              className="userprofile"
            />
          </Link>
          Profile
        </div>
      </div>
    </>
  );
};

export default Chef_Sidebar;

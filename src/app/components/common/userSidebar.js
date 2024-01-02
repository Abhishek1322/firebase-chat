import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import { Link, useLocation } from "react-router-dom";
import { useWebSelector } from "../../../redux/selector/web";

const User_Sidebar = () => {
  const location = useLocation();

  const webData = useWebSelector();
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    if (webData) {
      setUserProfile(webData?.userProfileDetails?.data?.userInfo?.profilePhoto);
    }
  }, [webData]);

  return (
    <>
      <div className="sideBar userSidebar">
        <div className="sidebarlogo ">
          <Link to="/home-user">
            <img src={Images.Logo} alt="logo" className="img-fluid" />
          </Link>
        </div>
        <div className="sidelist">
          <ul>
            <li
              className={
                location.pathname === "/home-user"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/home-user" className="sidebarItems">
                <img src={Images.homeOrange} className="imgHide" />
                <img src={Images.Home} className="imgShow" />
                <span className="d-block">Home</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/user-chef-home"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/user-chef-home" className="sidebarItems">
                <img src={Images.sidebarchefOrange} className="imgHide" />
                <img src={Images.sidebarchef} className="imgShow" />
                <span className="d-block">Chefs</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/user-order-home"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/user-order-home" className="sidebarItems">
                <img src={Images.myorderorange} className="imgHide" />
                <img src={Images.myorder} className="imgShow" />
                <span className="d-block">My Orders</span>
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
                <img src={Images.setting} className="imgHide" />
                <img src={Images.settingGray} className="imgShow" />
                <span className="d-block">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarProfile ">
          <Link to="/user-myprofile">
            <img
              src={userProfile ? userProfile : Images.dummyProfile}
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

export default User_Sidebar;

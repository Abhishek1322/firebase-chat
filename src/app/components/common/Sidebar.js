import React from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div className="sideBar">
        <div className="sidebarlogo ">
          <img src={Images.Logo} alt="logo" className="img-fluid" />
        </div>
        <div className="sidelist">
          <ul>
            <li className="sidebarLinks  ">
              <Link to="#" className="sidebarItems">
                <img src={Images.homeOrange} className="imgHide" />
                <img src={Images.Home} className="imgShow" />
                <span className="d-block">Home</span>
              </Link>
            </li>
            <li className="sidebarLinks">
              <Link to="#" className="sidebarItems">
                <img src={Images.sidebarchefOrange} className="imgHide" />
                <img src={Images.sidebarchef} className="imgShow" />
                <span className="d-block">Chefs</span>
              </Link>
            </li>
            <li className="sidebarLinks">
              <Link to="#" className="sidebarItems">
                <img src={Images.myorderorange} className="imgHide" />
                <img src={Images.myorder} className="imgShow" />
                <span className="d-block">My Orders</span>
              </Link>
            </li>

            <li className="sidebarLinks active">
              <Link to="#" className=" sidebarItems">
                <img src={Images.setting} className="imgHide" />
                <img src={Images.settingGray} className="imgShow" />
                <span className="d-block">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarProfile ">
          <img src={Images.userProfile} alt="logo" className="userprofile" />
          Profile
        </div>
      </div>
    </>
  );
};

export default Sidebar;

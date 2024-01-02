import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link, useNavigate } from "react-router-dom";

const ChooseRoles = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(false);

  // getting roles
  const handleGetRole = (flag) => {
    setRole(flag);
    if (flag === "user") {
      setTimeout(() => {
        navigate("/create-account/user");
      }, 100);
    } else if (flag === "chef") {
      setTimeout(() => {
        navigate("/create-account/chef");
      }, 100);
    }
  };

  // Update the toggle state
  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
    const routeToNavigate = isToggleOn ? "/choose-roles" : "/";
    setTimeout(() => {
      navigate(routeToNavigate);
    }, 400);
  };

  return (
    <>
      <div className="Login">
        <div className="container-fluid">
          <div className="flexBox justify-content-between pt-4">
            <figure>
              <img
                src={Images.Logo}
                alt="logo"
                className="img-fluid logo m-0"
              />
            </figure>
            <div className="flexBox justify-content-end">
              <h3 className="smallSubheading">Already have an a account?</h3>
              <div className="form-group">
                <label className="toggle">
                  <input
                    onChange={handleToggleChange}
                    checked={isToggleOn}
                    type="checkbox"
                  />
                  <span className="slider"></span>
                  <span
                    className="labels"
                    data-on="Sign Up"
                    data-off="Login"
                  ></span>
                </label>
              </div>
            </div>
          </div>
          <div className="chooseroleBox">
            <div className={role === "user" ? "roleBox active" : "roleBox"}>
              <figure>
                <img
                  src={Images.RoleUser}
                  alt="RoleChef"
                  className="img-fluid RoleChef"
                />
              </figure>
              <h5 className="roleHeading">Continue As a User</h5>
              <figure>
                <img
                  onClick={() => handleGetRole("user")}
                  src={Images.ChooseRoleIcon}
                  alt="ChooseRoleIcon"
                  className="img-fluid ChooseRoleIcon mt-2"
                />
              </figure>
            </div>
            <div className={role === "chef" ? "roleBox active" : "roleBox"}>
              <figure>
                <img
                  src={Images.RoleChef}
                  alt="RoleChef"
                  className="img-fluid RoleChef"
                />
              </figure>
              <h5 className="roleHeading">Continue As a Chef</h5>
              <figure>
                <img
                  onClick={() => handleGetRole("chef")}
                  src={Images.ChooseRoleIcon}
                  alt="ChooseRoleIcon"
                  className="img-fluid ChooseRoleIcon mt-2"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseRoles;

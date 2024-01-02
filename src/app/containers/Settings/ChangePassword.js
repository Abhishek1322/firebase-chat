import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createNewPassword, onErrorStopLoad } from "../../../redux/slices/auth";
import Loading from "./Loading";
import { useAuthSelector } from "../../../redux/selector/auth";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const authData = useAuthSelector();

  const [showPassword, setShowPassword] = useState("false");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword) {
      showToast("Please enter old password");
      return;
    } else if (!newPassword) {
      showToast("Please enter new password");
      return;
    } else if (!confirmNewPassword) {
      showToast("Please enter confirm new password");
      return;
    }

    let params = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };

    dispatch(
      createNewPassword({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/setting");
          }
        },
      })
    );
  };

  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
    {authData.loading && <Loading />}
      <div className="changePaasword_">
        <div className="container-fluid">
          <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3 ">
            <Link to="/setting">
              <img
                src={Images.backArrowpassword}
                alt="headerarrowImg"
                className="img-fluid  innerHeaderArrow"
              />
            </Link>
            <h1 className="settingMainHeading text-align-center">
              Change Password
            </h1>
          </div>
          <div className="changepassword">
            <div className="changepasswordForm">
              <div className="settingsheader d-flex justify-content-center">
                <img
                  src={Images.ChangepasswordImg}
                  alt="logo"
                  className="img-fluid "
                />
              </div>
              <h2 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                Create your new password.
              </h2>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container mt-5">
                  <input
                    className="border-input"
                    type={showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <label className="border-label">Old Password</label>
                  <p
                    onClick={togglePasswordVisibility}
                    className="password-button"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </p>
                </div>
                <div className="input-container mt-5">
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="text"
                    className="border-input"
                  />
                  <label className="border-label">New Password</label>
                </div>
                <div className="input-container mt-5">
                  <input
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    type="text"
                    className="border-input"
                  />
                  <label className="border-label">Confirm Password</label>
                </div>
                <div className="buttonBox mt-5 d-flex  justify-content-center">
                  <button type="submit" className="smallBtn">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

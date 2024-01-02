import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword, onErrorStopLoad } from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";
import Loading from "../Settings/Loading";

const Recoverpassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const authData = useAuthSelector();

  const [showPassword, setShowPassword] = useState("false");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const userId = localStorage.getItem("userId");

  //show hide password
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
    if (!newPassword) {
      showToast("Please enter new password");
      return;
    } else if (!confirmNewPassword) {
      showToast("Please enter confirmation password");
      return;
    }

    let params = {
      new_password: newPassword,
      confirm_password: confirmNewPassword,
      user_id: userId,
    };

    dispatch(
      resetPassword({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (res.data.data.role === "chef") {
              navigate("/setup-profile");
            } else {
              navigate("/home-user");
            }
          }
        },
      })
    );
  };

  // stop loader on page refresh
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      {authData.loading && <Loading />}
      <div className="Login">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="logleft forgotIcon">
                <figure>
                  <img
                    src={Images.Logo}
                    alt="logo"
                    className="img-fluid logo"
                  />
                </figure>
                <figure className="ChefMain">
                  <img
                    src={Images.Chef}
                    alt="Chef"
                    className="img-fluid Chef"
                  />
                </figure>
                <figure className="foodBox">
                  <img
                    src={Images.logFoodone}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <img
                    src={Images.logFoodtwo}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <img
                    src={Images.logFoodthree}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <span className="logFood">More...</span>
                </figure>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="logRight mt-5">
                <div className="toggleButtonMain">
                  <div className="buttonBox">
                    <Link to="/">
                      <button type="submit" role="button" className="backBtn">
                        <i class="las la-angle-left"></i> Back to Login
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Recover Password</h6>
                  <p className="subHeading">Create your new password here.</p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container mt-5">
                      <input
                        className="border-input"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label className="border-label">New Password </label>
                      <p
                        onClick={togglePasswordVisibility}
                        className="password-button"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </p>
                    </div>
                    <div className="input-container mt-5">
                      <input
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        type="text"
                        value={confirmNewPassword}
                        className="border-input"
                      />
                      <label className="border-label">Confirm Password</label>
                    </div>
                    <div className="buttonBox mt-5">
                      <button type="submit" className="smallBtn">
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Recoverpassword;

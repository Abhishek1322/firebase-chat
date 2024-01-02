import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword,onErrorStopLoad } from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";
import Loading from "../Settings/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useAuthSelector();
  const toastId = useRef(null);
  const [email, setEmail] = useState("");

  
  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email");
      return;
    }
    let params = {
      email: email,
    };
    dispatch(
      forgotPassword({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/enter-otp");
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
                      <button type="button" role="button" className="backBtn">
                        <i className="las la-angle-left"></i> Back to Login
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Forgot password</h6>
                  <p className="subHeading">
                    Enter the email address that associated with your account
                    for Verify.
                  </p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container mt-5">
                      <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-input"
                        placeholder=""
                      />
                      <label className="border-label">Email</label>
                    </div>
                    <div className="buttonBox mt-5">
                      <button type="submit" className="smallBtn">
                        Continue
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
export default ForgotPassword;

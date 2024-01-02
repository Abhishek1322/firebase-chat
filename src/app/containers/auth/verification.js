import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  verifyOtp,
  onErrorStopLoad,
  resendVerifyOtp,
} from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";
import Loading from "../Settings/Loading";

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const authData = useAuthSelector();

  const [otp, setOtp] = useState("");
  const userEmail = localStorage.getItem("userEmail");

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      showToast("Please enter verify OTP");
      return;
    }
    let params = {
      email: userEmail,
      otp: otp,
    };
    dispatch(
      verifyOtp({
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

  // function for resend otp
  const handleResendOtp = (e) => {
    e.preventDefault();

    let params = {
      type: "verify",
      email: userEmail,
    };

    dispatch(
      resendVerifyOtp({
        ...params,
        cb(res) {},
      })
    );
  };

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
              <div className="logleft verifyIcon">
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
                    <Link to="/create-account/:user">
                      <button type="submit" role="button" className="backBtn">
                        <i className="las la-angle-left"></i> Back
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Verify Email</h6>
                  <p className="subHeading mb-4">
                    Enter the verification Code that we just sent your on your
                    email address.
                  </p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderInput={(props) => (
                        <input {...props} className="enterOtp" />
                      )}
                    />

                    <p className="mb-3 mt-3">
                      Don’t Received{" "}
                      <a
                        onClick={(e) => handleResendOtp(e)}
                        className="resendLink"
                        href="/auth/otp"
                      >
                        Resend
                      </a>{" "}
                    </p>

                    <div className="buttonBox mt-2 m-0">
                      <button type="submit" className="smallBtn">
                        {" "}
                        Verify
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

export default Verification;

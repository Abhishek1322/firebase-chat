import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  onErrorStopLoad,
  addContactUsDetail,
} from "../../../redux/slices/user";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../redux/selector/user";
import Loading from "./Loading";
import { getUserProfileDetails } from "../../../redux/slices/web";

const ContactUs = () => {
  const dispatch = useDispatch();
  const userSelector = useUserSelector();
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  //onChange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // submit contact details
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName) {
      toast.error("Please enter first name");
      return;
    } else if (!formData.lastName) {
      toast.error("Please enter last name");
      return;
    } else if (!formData.email) {
      toast.error("Please enter email");
      return;
    } else if (
      formData.email &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      toast.error("Please enter valid email address");
      return;
    } else if (!formData.message) {
      toast.error("Please enter your message");
      return;
    }

    let params = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    dispatch(
      addContactUsDetail({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFormData({
              message: "",
            });
          }
        },
      })
    );
  };

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFormData({
              firstName: res?.data?.data?.userInfo?.firstName,
              lastName: res?.data?.data?.userInfo?.lastName,
              email: res?.data?.data?.email,
              message: "",
            });
          }
        },
      })
    );
  }, []);

  return (
    <>
      {userSelector.loading && <Loading />}
      <div className="contactUs">
        <div className="container-fluid">
          <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
            <Link to="/setting">
              <img
                src={Images.backArrowpassword}
                alt="arrowImg"
                className="img-fluid  innerHeaderArrow"
              />
            </Link>
            <h1 className="settingMainHeading text-align-center ">
              Contact Us
            </h1>
          </div>
          <div className="changepassword">
            <div className="logRight mt-5">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="changepasswordForm">
                  <div className="changepasswordImg d-flex justify-content-center">
                    <img
                      src={Images.contactUs}
                      alt="contactUs"
                      className="img-fluid  contactusImg"
                    />
                  </div>
                  <h2 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                    We will answer your questions & problems
                  </h2>

                  <div className="topInputfields">
                    <div className="container p-0">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              placeholder="Enter your first name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={(e) => handleChange(e)}
                            />
                            <label className="border-label">First Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              placeholder="Enter your last name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={(e) => handleChange(e)}
                            />
                            <label className="border-label">Last Name</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-container mt-5">
                      <input
                        readOnly
                        type="text"
                        className="border-input"
                        placeholder="Enter your last email address"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                      />
                      <label className="border-label">Email</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-container mt-5">
                      <textarea
                        rows="3"
                        placeholder="Write message..."
                        name="message"
                        onChange={(e) => handleChange(e)}
                        type="text"
                        value={formData.message}
                        className="border-input"
                      />
                      <label className="border-label">Your Message</label>
                    </div>
                  </div>
                  <div className="buttonBox mt-5 d-flex  justify-content-center">
                    <button type="submit" role="button" className="smallBtn">
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;

import React, { useState } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "../../components/common/shared/CustomModal";
import { useAuthSelector } from "../../../redux/selector/auth";
import LogoutModal from "../../components/common/shared/logoutModal";

const SettingMain = () => {
  const authData = useAuthSelector();
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleUserProfile = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  return (
    <>
      <div className="settingMain">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 ">
              <Link to="/change-password">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center">
                    <img
                      src={Images.password}
                      alt="passwordImg"
                      className="img-fluid settingIcon"
                    />
                    <h2 className="settingBoxtxt ms-3 mb-0">Change Password</h2>
                  </div>
                  <div className="iconImg">
                    <img
                      src={Images.nextIcon}
                      alt="nexticonImg"
                      className="img-fluid nextIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6">
              <Link to="/delete-account">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center">
                    <img
                      src={Images.DeleteSetting}
                      alt="DeleteSetting"
                      className="img-fluid settingIcon"
                    />

                    <h2 className="settingBoxtxt ms-3 mb-0">Delete Account</h2>
                  </div>
                  <div className="iconImg">
                    <img
                      src={Images.nextIcon}
                      alt="nextIcon"
                      className="img-fluid nextIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6 ">
              <Link to="/term-condition">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center">
                    <img
                      src={Images.termconditions}
                      alt="termconditions"
                      className="img-fluid settingIcon"
                    />
                    <p className="settingBoxtxt ms-3 mb-0">
                      Terms & Conditions
                    </p>
                  </div>
                  <div className="iconImg">
                    <img
                      src={Images.nextIcon}
                      alt="nextIcon"
                      className="img-fluid nextIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6">
              <Link to="/privacy-policy">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center">
                    <img
                      src={Images.privacypolicy}
                      alt="privacypolicy"
                      className="img-fluid settingIcon"
                    />
                    <h2 className="settingBoxtxt ms-3 mb-0">Privacy Policy</h2>
                  </div>
                  <div className="iconImg">
                    <img
                      src={Images.nextIcon}
                      alt="nextIcon"
                      className="img-fluid nextIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-6 ">
              <Link to="/contactu-us">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center">
                    <img
                      src={Images.settingcontactus}
                      alt="settingcontactus"
                      className="img-fluid settingIcon "
                    />
                    <h2 className="settingBoxtxt ms-3 mb-0">Contact Us</h2>
                  </div>
                  <div className="iconImg">
                    <img
                      src={Images.nextIcon}
                      alt="nextIcon"
                      className="img-fluid nextIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {authData?.userInfo?.role === "user" && (
              <div className="col-lg-6">
                <div className="leftbox">
                  <div className="settingBox d-flex align-items-center ">
                    <img
                      src={Images.addressicon}
                      alt="logout"
                      className="img-fluid settingIcon "
                    />

                    <h2 className="settingBoxtxt ms-3 mb-0">Manage Address</h2>
                  </div>
                  <div className="iconImg">
                    <Link to="/user-manageaddress">
                      <img
                        src={Images.nextIcon}
                        alt="nextIcon"
                        className="img-fluid nextIcon"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div
              className="settingBox d-flex align-items-center justify-content-center cursorPoint"
              onClick={() => {
                handleUserProfile("logOutModal");
              }}
            >
              <img
                src={Images.logout}
                alt="logo"
                className="img-fluid settingIcon "
              />
              <h2 className="settingBoxtxt ms-3 mb-0">Logout</h2>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "logOutModal" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "logOutModal" ? "logout" : ""}
        child={
          modalDetail.flag === "logOutModal" ? (
            <LogoutModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};
export default SettingMain;

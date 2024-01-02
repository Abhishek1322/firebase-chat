import React, { useState } from "react";
import * as Images from "../../../utilities/images";
import LogoutModal from "../../components/common/shared/logoutModal";
import CustomModal from "../../components/common/shared/CustomModal";

const RequestPage = () => {
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

  // open modal
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  return (
    <>
      <div className="accountDelete_">
        <div className="container-fluid">
          <div className="changepassword loadingpage">
            <div className="changepasswordForm">
              <div className="changepasswordImg d-flex justify-content-center">
                <img
                  src={Images.accountDeleted}
                  alt="accountDeletedImg"
                  className="img-fluid innerHeaderArrow "
                />
              </div>
              <h6 className="accountDeleted mb-3 d-flex  justify-content-center mt-3">
                Account request has been <br /> summited successfully
              </h6>
              <p className="accountdeletetxt mb-3 d-flex  justify-content-center mt-3">
                Your Account request is in under process.
                <br /> It will take some time.
              </p>
              <div className="settingBox d-flex align-items-center justify-content-center">
                <div
                  className="settingBox d-flex align-items-center justify-content-center"
                  onClick={() => {
                    handleOpenModal("logOutModal");
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

export default RequestPage;

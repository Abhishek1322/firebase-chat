import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Images from "../../../utilities/images";
import CustomModal from "../../components/common/shared/CustomModal";
import BellModal from "./shared/bellModal";
import Notification from "./shared/notification";
import CartModal from "./shared/cartModal";

const Resources = () => {
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

  return (
    <>
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid p-0">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-12">
                <p className="settingtxt">Setting</p>
              </div>
              <div className="col-lg-6 col-sm-12 text-end">
                <div className="flexBox">
                  <div className="headermenu">
                    <figure className="menuBox">
                      <img
                        src={Images.chat}
                        alt="chatImg"
                        className="img-fluid chatIconImage"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "chatBox" });
                          setKey(Math.random());
                        }}
                      />
                    </figure>
                  </div>
                  <div className="headeritem">
                    <figure
                      className="menuBox"
                      onClick={() => {
                        setModalDetail({ show: true, flag: "Notification" });
                        setKey(Math.random());
                      }}
                    >
                      <img
                        src={Images.bellImage}
                        alt="bellImg"
                        className="img-fluid chatIconImage"
                      />
                    </figure>
                  </div>
                  <div className="menuBox cart">
                    <img
                      src={Images.basketImg}
                      alt="basketImg"
                      className="img-fluid basketImg"
                      onClick={() => {
                        setModalDetail({ show: true, flag: "CartModal" });
                        setKey(Math.random());
                      }}
                    />
                    <span className="cartItems">0</span>
                  </div>
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
          modalDetail.flag === "chatBox" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "chatBox"
            ? "chatBox"
            : modalDetail.flag === "Notification"
            ? "Notification"
            : modalDetail.flag === "CartModal"
            ? "CartModal"
            : "CartModal"
        }
        child={
          modalDetail.flag === "chatBox" ? (
            <BellModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "Notification" ? (
            <Notification close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "CartModal" ? (
            <CartModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatBox" ? (
            <>
              <h2 className="modal_Heading">Chat</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" alt="modalcancelimg" />
              </p>
            </>
          ) : modalDetail.flag === "Notification" ? (
            <>
              <h2 className="modal_Heading">Notification</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel"alt="modalcancelimg"  />
              </p>
            </>
          ) : modalDetail.flag === "CartModal" ? (
            <>
              <h2 className="modal_Heading">Cart</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" alt="modalcancelimg"  />
              </p>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default Resources;

import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import OrderCancelModal from "./OrderCancelModal";
import {
  cancelOrder,
  onErrorStopLoad,
  cancelChefBooking,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";

const YourOrderModal = (props) => {
  const { close, closeModal, orderId, flag } = props;
  const dispatch = useDispatch();
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

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // Cancel Order
  const handleCancelOrder = () => {
    if (flag === "booking") {
      let params = {
        status: "cancelled",
        id: orderId,
      };
      dispatch(
        cancelChefBooking({
          ...params,
          cb(res) {
            if (res.status === 200) {
              handleOpenModal("ordercancel");
            }
          },
        })
      );
    } else {
      let params = {
        status: "cancelled",
        id: orderId,
      };
      dispatch(
        cancelOrder({
          ...params,
          cb(res) {
            if (res.status === 200) {
              handleOpenModal("ordercancel");
            }
          },
        })
      );
    }
  };

  return (
    <>
      <div className="yourordersection paymentdonesection">
        <img
          src={Images.OrderPlace}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3">
          {" "}
          Are You Sure You Want to Cancel Your Order.
        </h1>
        <p className="accountdeletetxt mt-2 ">Cancellation charges apply.</p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              onClick={closeModal}
              className="settingBoxtxt"
              type="button"
            >
              No, don’t{" "}
            </button>
            <button
              className="foodmodalbtn"
              type="button"
              onClick={() => {
                handleCancelOrder();
              }}
            >
              Yes, Cancel
            </button>
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
          modalDetail.flag === "ordercancel" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "ordercancel" ? "ordermodalcancel" : ""}
        child={
          modalDetail.flag === "ordercancel" ? (
            <OrderCancelModal
              close={() => {
                close();
                handleOnCloseModal();
              }}
            />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default YourOrderModal;

import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Progress } from "antd";
import CustomModal from "./CustomModal";
import YourOrderModal from "./YourOrderModal";

const ChefBookingDone = ({ close, secondChefBook, orderId }) => {
  const [key, setKey] = useState(Math.random());
  const [countDown, setCountDown] = useState(60);
  const [barPercentage, setBarPercentage] = useState();
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

  // run timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // close existing modal
  useEffect(() => {
    if (countDown === 0) {
      secondChefBook();
    }
  }, [countDown]);

  // set percentage
  useEffect(() => {
    const getPercent = (countDown / 60) * 100;
    const getTotalPercent = 100 - getPercent;
    setBarPercentage(getTotalPercent);
  }, [countDown]);

  return (
    <>
      <div className="orderplacesection paymentdonesection">
        <img
          src={Images.accountDeleted}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3"> Order Placed</h1>
        <p className="accountdeletetxt mt-2 ">
          Your order has been successfully placed.
        </p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className="foodmodalbtn"
              type="button"
              onClick={() => {
                secondChefBook();
              }}
            >
              Okay
            </button>
          </div>
          <Progress
            className="cancelProgressBar"
            showInfo={false}
            percent={barPercentage}
            status="active"
          />

          <p className="progressheading">{countDown} Sec</p>
          <button
            onClick={() => handleOpenModal("wantCancelOrder")}
            className="itemsQuantity"
            type="button"
          >
            Cancel Order
          </button>
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
          modalDetail.flag === "wantCancelOrder"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "wantCancelOrder" ? "yourordermodalplace" : ""
        }
        child={
          modalDetail.flag === "wantCancelOrder" ? (
            <YourOrderModal
              orderId={orderId}
              close={() => {
                secondChefBook();
              }}
              flag={"booking"}
              closeModal={() => handleOnCloseModal()}
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

export default ChefBookingDone;

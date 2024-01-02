import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChefBookingDone from "./ChefBookingDone";

const ChefPaymentDone = ({ secondChefBook, orderId, orderNumber }) => {
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

  useEffect(() => {
    setTimeout(() => {
      handleOpenModal("bookingdone");
    }, 2500);
  }, []);

  return (
    <>
      <div className="paymentdonesection">
        <img
          src={Images.accountDeleted}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3"> Payment Done</h1>
        <p className="accountdeletetxt mt-2 ">
          Your payment has been successfully done for order no. #{orderNumber}
        </p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className="foodmodalbtn"
              type="button"
              onClick={() => {
                handleOpenModal("bookingdone");
              }}
            >
              Order Placed
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
          modalDetail.flag === "bookingdone" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "bookingdone" ? "bookdonemodal" : ""}
        child={
          modalDetail.flag === "bookingdone" ? (
            <ChefBookingDone
              orderId={orderId}
              secondChefBook={secondChefBook}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={modalDetail.flag === "bookingdone" ? <></> : ""}
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default ChefPaymentDone;

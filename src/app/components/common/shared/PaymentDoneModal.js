import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import OrderPlaceModal from "./OrderPlaceModal";

const PaymentDoneModal = (props) => {
  const { close, orderId, orderNumber } = props;
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
  const handleOpneModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  useEffect(() => {
    setTimeout(() => {
      handleOpneModal("orderplace");
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
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "orderplace" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "orderplace" ? "ordermodalplace" : ""}
        child={
          modalDetail.flag === "orderplace" ? (
            <OrderPlaceModal
              orderId={orderId}
              close={() => {
                handleOnCloseModal();
                close();
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

export default PaymentDoneModal;

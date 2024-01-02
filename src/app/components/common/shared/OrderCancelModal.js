import React from "react";
import * as Images from "../../../../utilities/images";

const OrderCancelModal = (props) => {
    const {close} = props;
  return (
    <>
      <div className="ordercancelsection paymentdonesection">
        <img
          src={Images.OrderPlace}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3">Order Canceled</h1>
        <p className="accountdeletetxt mt-2 ">
          Your amount will be refund Within 1 hour.
        </p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button onClick={close} className="foodmodalbtn" type="button">
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCancelModal;

import React, { useEffect, useState, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import { deleteAddress, onErrorStopLoad } from "../../../../redux/slices/user";

const DeleteAddressModal = (props) => {
  const { close, addressId, handleGetUserAddress } = props;
  const dispatch = useDispatch();

  // delete address
  const hanldeDeleteAddress = () => {
    let params = {
      id: addressId,
    };
    dispatch(
      deleteAddress({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetUserAddress();
            close();
          }
        },
      })
    );
  };

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);
  return (
    <>
      <div className="DeleteMenuModal paymentdonesection userDelete">
        <img
          src={Images.deleteMenuImg}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <p className="accountDeleted mt-3">Delete Address</p>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to delete this address?
        </p>
        <div className="modalfooterbtn mb-4">
          <div className="orderItems_ flexBox ">
            <button onClick={() => close()} className="cancelOrder_ me-4">
              Cancel
            </button>
            <button onClick={hanldeDeleteAddress} className="submitOrder_">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAddressModal;

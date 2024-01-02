import React, { useEffect, useState, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import { deleteMenuItem, onErrorStopLoad } from "../../../../redux/slices/web";

const DeleteMenuModal = (props) => {
  const { menuId, close, menuListAll } = props;
  const dispatch = useDispatch();

  // delete menu item
  const hanldeDeleteMenuItem = () => {
    let params = {
      id: menuId,
    };
    dispatch(
      deleteMenuItem({
        ...params,
        cb(res) {
          if (res.status === 200) {
            menuListAll();
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
        <p className="accountDeleted mt-3">Delete Item</p>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to delete this menu item?
        </p>
        <div className="modalfooterbtn mb-4">
          <div className="orderItems_ flexBox ">
            <button onClick={() => close()} className="cancelOrder_ me-4">
              Cancel
            </button>
            <button onClick={hanldeDeleteMenuItem} className="submitOrder_">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteMenuModal;

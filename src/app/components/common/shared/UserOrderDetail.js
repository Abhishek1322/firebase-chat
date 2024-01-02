import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import { getSingleOrder, onErrorStopLoad } from "../../../../redux/slices/user";

const UserOrderDetail = (props) => {
  const { foodOrderId, setOrderDetail } = props;
  const dispatch = useDispatch();
  const [foodDetail, setFoodDetail] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get order details
  useEffect(() => {
    let params = {
      id: foodOrderId,
    };
    dispatch(
      getSingleOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFoodDetail(res?.data?.data);
            setOrderDetail(res?.data?.data);
            setTotalAmount(res?.data?.data);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="Userordersection">
        {foodDetail?.items?.map((item, index) => (
          <div key={index} className="modalDetail usermodaldetail">
            <div className="usercartDetail">
              <img src={item?.image} className="userprofile" alt="cartImg" />
              <div className="insideModal">
                <p className="foodtext">{item?.category}</p>
                <p className="foodItem">{item?.name}</p>
                <p className="foodPrice">£{item?.netPrice}.00</p>
              </div>
            </div>
            <p className="fooodquantity_">{item?.quantity}X</p>
          </div>
        ))}

        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className={
                foodDetail?.status === "delivered"
                  ? "foodmodalbtn foodmodalbtnDeliver modalfooddelivery"
                  : "foodmodalbtn modalfooddelivery"
              }
              type="button"
            >
              <p className="orderfooterbtn">Total Paid</p>
              <p className="orderfooterprice">£{totalAmount?.total}.00</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetail;

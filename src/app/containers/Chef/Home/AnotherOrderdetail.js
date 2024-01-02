import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  getSingleOrderDetail,
  onErrorStopLoadChef,
  acceptOrder,
} from "../../../../redux/slices/chef";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import CustomModal from "../../../components/common/shared/CustomModal";
import VerifyorderDetailsModal from "../../../components/common/shared/verifyorderDetailsModal";
import { useChefSelector } from "../../../../redux/selector/chef";

const AnotherOrderdetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;
  const chefData = useChefSelector();
  const searchParams = new URLSearchParams(search);
  const recentOrderId = searchParams.get("recent-order");
  const [orderDetails, setOrderDetails] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // get order details

  useEffect(() => {
    handleGetOrderDetails();
  }, []);

  const handleGetOrderDetails = () => {
    let params = {
      id: recentOrderId,
    };
    dispatch(
      getSingleOrderDetail({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setOrderDetails(res?.data?.data);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // order ready for delivery
  const handleOrderReady = (status) => {
    let params = {
      id: recentOrderId,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetOrderDetails();
          }
        },
      })
    );
  };

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
      <div className="mainchef_ ">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="insideCommonHeader d-flex">
              <Link to="/home" className="d-flex">
                <img
                  src={Images.backArrowpassword}
                  className="innerHeaderArrow"
                  alt="arrowHeaderImg"
                />
                <h1 className="chefCommonHeader ps-2">Order Details</h1>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 d-flex justify-content-end">
            <div className="orderItems_ flexBox ">
              {orderDetails?.status === "accepted" ? (
                <button
                  onClick={() => handleOrderReady("readyForDelivery")}
                  className="chefRightHeader m-0 text-end d-flex align-items-center gap-2"
                >
                  {chefData?.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Order Ready for Delivery
                </button>
              ) : orderDetails?.status === "delivered" ? (
                ""
              ) : (
                <button
                  onClick={() => handleOpenModal("verifyOrder")}
                  className="chefRightHeader m-0 text-end"
                >
                  Order Delivered
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="orderDeatils">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="orderIdDetail">
                  <p className="orderId_">Order #{orderDetails?.orderId}</p>
                  {orderDetails?.status === "accepted" ? (
                    <p className="progress_">In-Progress</p>
                  ) : orderDetails?.status === "delivered" ? (
                    <p className="recentOrder deliver">Delivered</p>
                  ) : orderDetails?.status === "readyForDelivery" ? (
                    <p className="readyDeliver">Ready for Delivery</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="chefJohn">
                  <div className="chatWithChef">
                    <div className="chefjohnDetail">
                      <img
                        src={
                          orderDetails?.userId?.userInfo?.profilePhoto
                            ? orderDetails?.userId?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="homeProfileImg"
                        className="chefJohnImg"
                      />
                      <div className="chefinfo">
                        <h2 className="johnExplorer">
                          {orderDetails?.userId?.userInfo?.firstName}{" "}
                          {orderDetails?.userId?.userInfo?.lastName}
                        </h2>
                        <div className="johnChatTime">
                          <div className="chefInfo">
                            <img
                              src={Images.chefLocationImg}
                              alt="chefLocationImg"
                              className="chefLocation_"
                            />
                          </div>
                          <div className="johnchatdetail">
                            <p className="chatDates">
                              {moment(orderDetails?.updatedAt).format(
                                "MMM D, YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                        {orderDetails?.itemCount === "1" ? (
                          <p className="itemsQuantity">
                            {orderDetails?.itemCount} Item
                          </p>
                        ) : (
                          <p className="itemsQuantity">
                            {orderDetails?.itemCount} Items
                          </p>
                        )}
                        <p className="ordertimeaddress">
                          Order placed on{" "}
                          {moment(orderDetails?.updatedAt).format("hh:mm A")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="chefChat">
                    <div
                      className={
                        orderDetails?.status === "accepted" ||
                        orderDetails?.status === "readyForDelivery"
                          ? "chatwithjohn"
                          : "chatwithjohn johnchat"
                      }
                    >
                      <div
                        className={
                          orderDetails?.status === "accepted" ||
                          orderDetails?.status === "readyForDelivery"
                            ? "chatImg"
                            : "chatImg chaticon"
                        }
                      >
                        <i
                          className={
                            orderDetails?.status === "accepted" ||
                            orderDetails?.status === "readyForDelivery"
                              ? "fas fa-comment-dots chatImage chatbg"
                              : "fas fa-comment-dots chatImage chatbg"
                          }
                        ></i>
                      </div>
                      <div className="chatText">
                        <p className="chat">chat</p>
                      </div>
                    </div>
                    <div className="deliveryAddress">
                      <p className="deliveryinfo">Delivery Address</p>
                      <p className="orderAddress">
                        {orderDetails?.address?.city}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="orderId_">Ordered Items</h3>
                <div className="row align-items-center">
                  <div className="col-lg-10">
                    {orderDetails?.items?.map((item, index) => (
                      <div key={index} className="orderedFoodItems">
                        <div className="foodCategory flexBox">
                          <img
                            src={item?.image}
                            alt="foodItemsImg"
                            className="foodItemImg"
                          />
                          <div className="categoryinfo">
                            <h4 className="foodcategory_">{item?.category}</h4>
                            <h5 className="innerfood">{item?.name}</h5>
                            <p className="innePrice">£{item?.netPrice}.00</p>
                          </div>
                        </div>
                        <p className="fooodquantity_">{item?.quantity}X</p>
                      </div>
                    ))}
                  </div>
                  <div className="col-lg-2">
                    <div
                      className={
                        orderDetails?.status === "accepted" ||
                        orderDetails?.status === "readyForDelivery"
                          ? "paidAmmount"
                          : "paidAmmount totalAmmount"
                      }
                    >
                      <p className="totalPaid">Total paid</p>
                      <p className="foodBill"> £{orderDetails?.total}.00</p>
                    </div>
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
          modalDetail.flag === "verifyOrder" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "verifyOrder" ? "chatBox" : ""}
        child={
          modalDetail.flag === "verifyOrder" ? (
            <VerifyorderDetailsModal
              handleGetOrderDetails={handleGetOrderDetails}
              recentOrderId={recentOrderId}
              close={() => handleOnCloseModal()}
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

export default AnotherOrderdetail;

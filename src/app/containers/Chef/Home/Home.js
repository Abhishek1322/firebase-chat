import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  getRecentOrder,
  acceptOrder,
  getLatestOrder,
  onErrorStopLoadChef,
  getBookingRequests,
} from "../../../../redux/slices/chef";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useChefSelector } from "../../../../redux/selector/chef";

const HomeRequsest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chefData = useChefSelector();
  const [isLoading, setIsloading] = useState("");
  const [bookingRequest, setBookingRequest] = useState([]);
  const [recentOrders, setGetRecentOrders] = useState([]);

  // get recent order
  const handleRecentOrder = () => {
    let params = {
      status: "pending",
    };
    dispatch(
      getRecentOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setGetRecentOrders(res?.data?.data?.data);
            dispatch(getLatestOrder(false));
          }
        },
      })
    );
  };

  // get recent order
  useEffect(() => {
    handleRecentOrder();
  }, [chefData?.latestOrder]);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // navigate on recent order page
  const handleOpenRecentOder = (e, id) => {
    e.preventDefault();
    navigate(`/order-details?recent-order=${id}`);
  };

  //accept and reject order
  const handleAcceptOrder = (e, id, status) => {
    e.stopPropagation();
    setIsloading(status);
    let params = {
      id: id,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (status === "accepted") {
              navigate(`/anotherorder-detail?recent-order=${id}`);
            } else {
              handleRecentOrder();
            }
          }
        },
      })
    );
  };

  // get booking request
  useEffect(() => {
    let params = {
      limit: 15,
    };
    dispatch(
      getBookingRequests({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setBookingRequest(res?.data?.data?.data);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="mainchef_">
        <div className="homePage">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="innerhomeheader">
                  <h2 className="headerinnerheading">New Booking Requests</h2>
                  {bookingRequest && bookingRequest.length > 0 && (
                    <div className="seeAll">
                      <Link to="/new-booking">
                        <p className="headerinnertxt">See All</p>
                      </Link>
                      <img
                        src={Images.homeArow}
                        alt="homearrow"
                        className="seeArrow"
                      />
                    </div>
                  )}
                </div>
                <div className="profileDetail">
                  {bookingRequest && bookingRequest.length > 0 ? (
                    <>
                      {bookingRequest?.slice(0, 5)?.map((item, index) => (
                        <Link to={`/booking-details?id=${item?._id}`}>
                          <div key={index} className="homeProfileBox">
                            <div className="profileInfo">
                              {console.log("iteemsssssss", item)}
                              <img
                                src={
                                  item?.userId?.userInfo?.profilePhoto
                                    ? item?.userId?.userInfo?.profilePhoto
                                    : Images.dummyProfile
                                }
                                alt="profile"
                                className="homeprofile"
                              />
                              <div className="detailInfo">
                                <h3 className="userProfile">
                                  {item?.userId?.userInfo?.firstName}{" "}
                                  {item?.userId?.userInfo?.lastName}
                                </h3>
                                <h4 className="userInfo">
                                  {moment(item?.createdAt).format("hh:mm A")}
                                </h4>
                              </div>
                            </div>
                            <p className="userInfoTxt">{item?.description}</p>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <p>No data found</p>
                  )}
                </div>

                <div className="innerhomeheader">
                  <h3 className="headerinnerheading">Recent Orders</h3>
                  {recentOrders && recentOrders.length > 0 && (
                    <div className="seeAll">
                      <p className="headerinnertxt">See All</p>
                      <img
                        src={Images.homeArow}
                        alt="arrowImg"
                        className="seeArrow"
                      />
                    </div>
                  )}
                </div>
                <div className="profileDetail profileDetailNew">
                  {recentOrders && recentOrders.length > 0 ? (
                    <>
                      {recentOrders?.slice(0, 5)?.map((item, index) => (
                        <div
                          onClick={(e) => handleOpenRecentOder(e, item?._id)}
                          key={index}
                          className="orderDetailBox"
                        >
                          <div className="orderDetails">
                            <p className="orderId">#{item?.orderId}</p>
                          </div>
                          <div className="userOrderInfo">
                            <div className="orderRequest">
                              <div className="profileInfo">
                                <img
                                  src={
                                    item?.userId?.userInfo?.profilePhoto
                                      ? item?.userId?.userInfo?.profilePhoto
                                      : Images.dummyProfile
                                  }
                                  alt="profile"
                                  className="homeprofile"
                                />
                                <div className="detailInfo">
                                  <h3 className="userProfile">
                                    {item?.userId?.userInfo?.firstName}{" "}
                                    {item?.userId?.userInfo?.lastName}
                                  </h3>
                                  <h4 className="orderFrom">Order From</h4>
                                </div>
                              </div>
                              <div className="orderItems">
                                {item?.itemCount !== "1" ? (
                                  <p className="Items">
                                    {item?.itemCount} items
                                  </p>
                                ) : (
                                  <p className="Items">
                                    {item?.itemCount} item
                                  </p>
                                )}

                                <div className="showOrder">
                                  <p className="orderPrice">
                                    £{item?.total}.00
                                  </p>
                                </div>
                              </div>
                              <p className="orderTime">
                                Order placed on{" "}
                                {moment(item?.updatedAt).format("hh:mm A")}
                              </p>
                              <div className="ordered_">
                                <button
                                  onClick={(e) =>
                                    handleAcceptOrder(e, item?._id, "cancelled")
                                  }
                                  className="cancelOrder d-flex align-items-center gap-2"
                                >
                                  {chefData?.laoding &&
                                    isLoading === "cancelled" && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                  CANCEL
                                </button>
                                <button
                                  onClick={(e) =>
                                    handleAcceptOrder(e, item?._id, "accepted")
                                  }
                                  className="acceptOrder d-flex align-items-center gap-2"
                                >
                                  {chefData?.laoding &&
                                    isLoading === "accepted" && (
                                      <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                  ACCEPT
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No order found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeRequsest;

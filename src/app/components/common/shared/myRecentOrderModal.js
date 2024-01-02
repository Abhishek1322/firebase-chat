import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChatWithChefModal from "./chatWithChefModal";
import VerifyorderDetailsModal from "./verifyorderDetailsModal";
import {
  acceptOrder,
  getLatestOrder,
  getSingleOrderDetail,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useChefSelector } from "../../../../redux/selector/chef";
import ReportchatDropModal from "./reportchatDropModal";
import UserDeleteChat from "./UserDeleteChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";

const MyRecentOrderModal = (props) => {
  const { close, singleOrderId, setOrderId, handleGetRecenetOrders } = props;
  const dispatch = useDispatch();
  const chefData = useChefSelector();
  const authData = useAuthSelector();
  const [key, setKey] = useState(Math.random());
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [usersData, setUserData] = useState([]);
  const [allChats, setAllChats] = useState([]);
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

  // get single order detail
  useEffect(() => {
    const parentCollectionChat = query(collection(db, PARENTCOLLECTIONNAME));
    onSnapshot(parentCollectionChat, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const getMyChats = messagesList?.filter((item) => {
        return item?.id?.includes(authData?.userInfo?.id);
      });
      setAllChats(getMyChats);
    });
    handleGetSingleOrder();
  }, []);

  // get single order detail
  const handleGetSingleOrder = () => {
    let parmas = {
      id: singleOrderId,
    };
    dispatch(
      getSingleOrderDetail({
        ...parmas,
        cb(res) {
          if (res.status === 200) {
            setOrderDetail(res?.data?.data);
            setOrderId(res?.data?.data);
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
    setIsLoading(status);
    let params = {
      id: singleOrderId,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetSingleOrder();
            if (status === "cancelled") {
              close();
            }
            handleGetRecenetOrders();
          }
        },
      })
    );
  };

  // get user data
  const handleChefProfle = (data) => {
    setUserData(data);
  };

  return (
    <>
      <div className="myrecentOrders_ orderModalBtn">
        <div className="modalscroll">
          <div className="orderProfile">
            <div className="ordermenuProfile">
              <div className="orderprofile_ ">
                <img
                  src={
                    orderDetail?.userId?.userInfo?.profilePhoto
                      ? orderDetail?.userId?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="logo"
                  className="homeprofile"
                />
                <div className="detailInfo">
                  <p className="userProfile">
                    {orderDetail?.userId?.userInfo?.firstName}{" "}
                    {orderDetail?.userId?.userInfo?.lastName}
                  </p>
                  <p className="userInfo">Order From</p>
                </div>
              </div>
              <div className="chat_">
                <img
                  src={Images.orderMsgImg}
                  className="orderchat"
                  onClick={() => {
                    handleOpenModal("chatAboutOrder");
                  }}
                />
              </div>
            </div>
            <p className="notificationText pt-3">Delivery Address</p>
            <p className="timeOrder_">{orderDetail?.address?.city}</p>
            <div className="flexBox justify-content-between">
              <p className="Items">
                {" "}
                {orderDetail?.itemCount !== "1" ? (
                  <p className="Items">{orderDetail?.itemCount} items</p>
                ) : (
                  <p className="Items">{orderDetail?.itemCount} item</p>
                )}
              </p>
              <p className="timeOrder_ pb-2">
                Order placed on{" "}
                {moment(orderDetail?.updatedAt).format("hh:mm A")}
              </p>
            </div>
          </div>
          <div className="orderDetails_">
            <p className="reportText_ pt-3 pb-3">Ordered Items</p>
            {orderDetail?.items?.map((item, index) => (
              <div key={index} className="orderProfile">
                <div className="profileInfo">
                  <div className="orderprofile_ flexBox">
                    <img
                      src={item?.image}
                      alt="foodImtems"
                      className="homeprofile"
                    />
                    <div className="detailInfo">
                      <p className="userInfo">{item?.category}</p>
                      <p className="userProfile">{item?.name}</p>
                      <p className="orderPrice">£{item?.netPrice}.00</p>
                    </div>
                  </div>
                  <p className="cheftext">{item?.quantity}X</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modalfooterbtn">
          <div
            className={
              orderDetail?.status === "delivered"
                ? "totalAmmount flexBox justify-content-between"
                : "totalOrderAmount_ flexBox justify-content-between pb-4"
            }
          >
            <p className="chat_Text m-0 pb-0">Total paid</p>
            <p className="chat m-0">£{orderDetail?.total}.00</p>
          </div>
          {orderDetail?.status === "pending" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => handleOrderReady("cancelled")}
                className="cancelOrder_"
              >
                {chefData?.loading && isLoading === "cancelled" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Reject
              </button>
              <button
                onClick={() => handleOrderReady("accepted")}
                className="submitOrder_"
              >
                {chefData?.loading && isLoading === "accepted" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Accept
              </button>
            </div>
          ) : orderDetail?.status === "accepted" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => handleOrderReady("readyForDelivery")}
                className="cancelOrder_  w-100"
              >
                {chefData?.loading && isLoading === "readyForDelivery" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Order Ready for Delivery
              </button>
            </div>
          ) : orderDetail?.status === "readyForDelivery" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => {
                  handleOpenModal("orderDeliver");
                }}
                className="cancelOrder_  w-100"
              >
                Order Delivered
              </button>
            </div>
          ) : (
            ""
          )}
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
          modalDetail.flag === "chatAboutOrder"
            ? "commonWidth customContent"
            : modalDetail.flag === "orderDeliver"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "chatAboutOrder"
            ? "orderchat"
            : modalDetail.flag === "orderDeliver"
            ? "orderchat"
            : modalDetail.flag === "reportchatD"
            ? "orderchat"
            : modalDetail.flag === "clearchat"
            ? "orderchat"
            : ""
        }
        child={
          modalDetail.flag === "chatAboutOrder" ? (
            <ChatWithChefModal
              handleChefProfle={handleChefProfle}
              orderDetails={orderDetail}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "orderDeliver" ? (
            <VerifyorderDetailsModal
              handleGetOrderDetails={handleGetSingleOrder}
              recentOrderId={singleOrderId}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchatD" ? (
            <ReportchatDropModal
              id={usersData?.id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "clearchat" ? (
            <UserDeleteChat
              sender_id={orderDetail?.chefId?._id}
              allChats={allChats}
              sendRoomId={`${orderDetail?.userId?._id}-${orderDetail?.chefId?._id}`}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatAboutOrder" ? (
            <>
              <div className="Common_header">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
                <img
                  src={
                    usersData?.userInfo?.profilePhoto
                      ? usersData?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="userprofile"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <p className="headerTxt_">
                    {usersData?.userInfo?.firstName}{" "}
                    {usersData?.userInfo?.lastName}
                  </p>
                  <p className="headerInner_">Online</p>
                </div>
              </div>
              <div className="Dotsheader_">
                <div className="dropdown ">
                  <button
                    className="btn btn-secondary dropdown-toggle modalheaderDot_"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={Images.modalHeader}
                      className=" img-fluid chatreportIcon_"
                      alt="modalheaderimg"
                    />
                  </button>
                  <ul
                    className="dropdown-menu chatdrop"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("reportchatD");
                      }}
                    >
                      <img
                        src={Images.reportchatIcon}
                        className=" img-fluid reporticon_"
                        alt="reportchat"
                      />
                      <h1 className="reportchat m-0 ps-2">Report Chat</h1>
                    </li>
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("clearchat");
                      }}
                    >
                      <img
                        src={Images.ChatModal}
                        className=" img-fluid reporticon_"
                        alt="clearchat"
                      />
                      <p className="reportchat m-0 ps-2">Clear Chat</p>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "clearchat" ? (
            <>
              <div className="Common_header gap-2">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
              </div>
            </>
          ) : modalDetail.flag === "reportchatD" ? (
            <>
              <div className="Common_header gap-2">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
                <div className="headerProfile">
                  <h2 className="headerTxt_ mb-0">Report Chat</h2>
                </div>
              </div>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default MyRecentOrderModal;

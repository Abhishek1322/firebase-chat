import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Images from "../../../utilities/images";
import CustomModal from "./shared/CustomModal";
import BookNowModal from "./shared/BookNowModal";
import UserBellModal from "./shared/UserBellModal";
import UserNotification from "./shared/UserNotification";
import { useAuthSelector } from "../../../redux/selector/auth";
import { useDispatch } from "react-redux";
import { getUserProfileDetails } from "../../../redux/slices/web";
import { useUserSelector } from "../../../redux/selector/user";
import CartModal from "./shared/cartModal";
import { toggleSidebar } from "../../../redux/slices/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../config/firebase-config";
import { getLocationInfo, getNotification } from "../../../redux/slices/user";

const User_Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const { search } = location;
  const searchParams = new URLSearchParams(search);
  const chefId = searchParams.get("id");
  const authData = useAuthSelector();
  const allUserData = useUserSelector();
  const userId = localStorage.getItem("userId");
  const [key, setKey] = useState(Math.random());
  const [toggle, setToggle] = useState(true);
  const [currentLocation, setCurrentLocation] = useState("");
  const [userData, setUserData] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [notification, setNotification] = useState([]);
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

  // get let long
  function success(pos) {
    var crd = pos.coords;
    handleGetLocationInfo(crd.latitude, crd.longitude);
  }

  // call get location function
  useEffect(() => {
    if (
      allUserData?.currentLocation?.lat &&
      allUserData?.currentLocation?.lng
    ) {
      handleGetLocationInfo();
    }
  }, [allUserData?.currentLocation?.lat && allUserData?.currentLocation?.lng]);

  // getLocationInfo
  const handleGetLocationInfo = (lat, lng) => {
    let params = {
      lat: lat,
      lng: lng,
    };
    if (
      allUserData?.currentLocation?.lat &&
      allUserData?.currentLocation?.lng
    ) {
      params = {
        lat: allUserData?.currentLocation?.lat,
        lng: allUserData?.currentLocation?.lng,
      };
    }
    dispatch(
      getLocationInfo({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setCurrentLocation(res?.data?.display_name);
          }
        },
      })
    );
  };

  // handling error
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // hanldle location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };

    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setUserData(res.data.data);
          }
        },
      })
    );
    handleGetAllChats();
  }, []);

  // toggle SideBar
  useEffect(() => {
    dispatch(toggleSidebar(toggle));
  }, [toggle]);

  // get all chats
  const handleGetAllChats = () => {
    const allMessageQuery = query(collection(db, PARENTCOLLECTIONNAME));
    onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const reversedMessagesList = messagesList.slice().reverse();
      const getMyChats = reversedMessagesList?.filter((item, index) => {
        return item?.id?.includes(authData?.userInfo?.id);
      });
      const getUnseenMessages = getMyChats?.find((item) => {
        return (
          item?.unseenMessageCount > 0 &&
          item?.lastMessage?.senderId !== authData?.userInfo?.id
        );
      });
      setAllChats(getUnseenMessages);
    });
  };

  // get all notifications
  const handleGetAllNotifications = () => {
    dispatch(
      getNotification({
        cb(res) {
          if (res.status === 200) {
            setNotification(res?.data?.data);
          }
        },
      })
    );
  };

  // // get all notifications
  useEffect(() => {
    handleGetAllNotifications();
  }, []);

  return (
    <>
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid p-0">
            {pathname === "/home-user" ||
            pathname === "/user-chef-home" ||
            pathname === "/user-order-home" ||
            pathname === "/setting" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  {pathname === "/home-user" ? (
                    <>
                      <h1 className="chefCommonHeader">
                        Hello,{" "}
                        <span className="chefHeading">
                          {" "}
                          {userData?.userInfo?.firstName} !
                        </span>
                      </h1>
                      <Link to="choose-location">
                        <img
                          src={Images.HeaderLocation}
                          className="img-fluid"
                          alt="headerlocation"
                        />
                        {currentLocation ? (
                          <span className="ordertimeaddress ms-1">
                            {currentLocation}
                          </span>
                        ) : (
                          <span className="ordertimeaddress ms-1">
                            choose your location from map
                          </span>
                        )}
                      </Link>
                    </>
                  ) : pathname === "/user-chef-home" ? (
                    <h1 className="chefCommonHeader">Chefs</h1>
                  ) : pathname === "/user-order-home" ? (
                    <h1 className="chefCommonHeader">My Orders</h1>
                  ) : pathname === "/setting" ? (
                    <h1 className="chefCommonHeader">Settings</h1>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                  <div className="flexBox">
                    <div
                      className={
                        allChats && allChats !== undefined ? "headermenu" : ""
                      }
                    >
                      <figure className="menuBox">
                        <img
                          src={Images.chat}
                          alt="logo"
                          className="img-fluid chatIconImage"
                          onClick={() => {
                            handleOpenModal("chatmessage");
                          }}
                        />
                      </figure>
                    </div>
                    <div
                      className={
                        notification?.some((item) => !item.is_read)
                          ? "headeritem"
                          : ""
                      }
                    >
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({
                            show: true,
                            flag: "userNotification",
                          });
                          setKey(Math.random());
                        }}
                      >
                        <img
                          src={Images.bellImage}
                          alt="logo"
                          className="img-fluid chatIconImage"
                        />
                      </figure>
                    </div>
                    <div
                      onClick={() => {
                        setModalDetail({ show: true, flag: "cartModal" });
                        setKey(Math.random());
                      }}
                      className="menuBox cart"
                    >
                      <img
                        src={Images.basketImg}
                        alt="logo"
                        className="img-fluid basketImg"
                      />
                      <span className="cartItems">
                        {allUserData?.cartCount?.totalRecords
                          ? allUserData?.cartCount?.totalRecords
                          : 0}
                      </span>
                    </div>
                    <button
                      onClick={() => setToggle(!toggle)}
                      className="toggleSideBtn"
                    >
                      <i className="fas fa-bars"></i>
                    </button>

                    <button
                      className="sarahmessagebtn d-none"
                      onClick={() => {
                        handleOpenModal("bookchef");
                      }}
                    >
                      <div className="booknowimg">
                        <img
                          src={Images.lightcap}
                          alt="timesquareimage"
                          className="img-fluid"
                        />
                      </div>

                      <p className="availableheading">Book Now</p>
                    </button>
                  </div>
                </div>
              </div>
            ) : pathname === "/user-myprofile" ||
              pathname === "/user-editprofile" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <div className="insideCommonHeader">
                    <Link
                      to={
                        pathname === "/user-myprofile"
                          ? "/home-user"
                          : "/user-myprofile"
                      }
                    >
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                      />
                    </Link>

                    <h1 className="chefCommonHeader ps-2">
                      {pathname === "/user-myprofile"
                        ? "My Profile"
                        : "Edit Profile"}
                    </h1>
                  </div>
                </div>
              </div>
            ) : pathname === "/chef-details" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-6">
                  <div className="insideCommonHeader">
                    <Link to="/user-chef-home">
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                      />
                    </Link>
                    <h1 className="chefCommonHeader ps-2">Chef Details</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 text-end">
                  <div className="flexBox">
                    <div className="headerBook">
                      <button
                        className="sarahmessagebtn"
                        onClick={() => {
                          handleOpenModal("bookchef");
                        }}
                      >
                        <div className="booknowimg">
                          <img
                            src={Images.lightcap}
                            alt="timesquareimage"
                            className="img-fluid"
                          />
                        </div>

                        <p className="availableheading">Book Now</p>
                      </button>
                    </div>
                    <button
                      onClick={() => setToggle(!toggle)}
                      className="toggleSideBtn"
                    >
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
          modalDetail.flag === "chatmessage" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "chatmessage"
            ? "chatmessagemodal"
            : modalDetail.flag === "userNotification"
            ? "userNotificationModal"
            : modalDetail.flag === "cartModal"
            ? "usercartmodal"
            : modalDetail.flag === "bookchef"
            ? "bookchefmodal"
            : ""
        }
        child={
          modalDetail.flag === "chatmessage" ? (
            <UserBellModal
              id={authData?.userInfo?.id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "userNotification" ? (
            <UserNotification
              updateNotification={handleGetAllNotifications}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "cartModal" ? (
            <CartModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "bookchef" ? (
            <BookNowModal
              initClose={() => handleOnCloseModal()}
              chefId={chefId}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatmessage" ? (
            <>
              <h2 className="modal_Heading">Chat</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "userNotification" ? (
            <>
              <h2 className="modal_Heading">Notification</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "cartModal" ? (
            <>
              <h2 className="modal_Heading">Cart</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "bookchef" ? (
            <>
              <div className="edithead">
                <h2 className="modal_Heading">Hire Chef</h2>
                <p className="chatUser">Enter your venue details below.</p>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
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

export default User_Navbar;

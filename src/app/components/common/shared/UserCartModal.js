import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import {
  getAllCart,
  onErrorStopLoad,
  deleteCartItem,
  updateCartItem,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { getUserAddress } from "../../../../redux/slices/user";
import CustomModal from "./CustomModal";
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import DeleteAddressModal from "./DeleteAddressModal";
import { useNavigate } from "react-router-dom";
import PayNowModal from "./PayNowModal";
import { toast } from "react-toastify";

const UserCartModal = (props) => {
  const { close } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const toastId = useRef(null);
  const [chefId, setChefId] = useState("");
  const [key, setKey] = useState(Math.random());
  const [totalPrice, setTotalPrice] = useState([]);
  const [address, setAddress] = useState([]);
  const latestAddress =
    address && address.length > 0 ? [...address].reverse() : [];
  const [addressId, setAddressId] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //  get all cart data
  useEffect(() => {
    handleGetAllCart();
  }, []);

  //  get all cart data
  const handleGetAllCart = () => {
    dispatch(
      getAllCart({
        cb(res) {
          if (res.status === 200) {
            setAllCartItems(res?.data?.data?.data?.cartItems);
            setCartId(res?.data?.data?.data?._id);
            setChefId(res?.data?.data?.data?.chefId);
            const totalCartPrice = res?.data?.data?.data?.cartItems?.reduce(
              (previousValue, currentValue, index) =>
                previousValue + currentValue.itemTotalPrice,
              0
            );
            setTotalPrice(totalCartPrice);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // delete cart items
  const handleDeleteCartItem = (menuId) => {
    let params = {
      cartId: cartId,
      menuItemId: menuId,
    };
    dispatch(
      deleteCartItem({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetAllCart();
          }
        },
      })
    );
  };

// manage cart data e.g. quantity and price
const handleCartData = (type, menuId, quantity) => {
  let params = {
    cartId: cartId,
    menuItemId: menuId,
    quantity:
      type === "increase"
        ? quantity + 1
        : type === "decrease" && quantity > 1
        ? quantity - 1
        : 1,
  };
  dispatch(
    updateCartItem({
      ...params,
      cb(res) {
        if (res.status === 200) {
          handleGetAllCart();
        }
      },
    })
  );
};


  // getting user address
  useEffect(() => {
    handleGetUserAddress();
  }, []);

  // get user address
  const handleGetUserAddress = () => {
    dispatch(
      getUserAddress({
        cb(res) {
          if (res.status === 200) {
            setAddress(res.data.data);
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

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // open modal
  const handleOpenModal = (flag, id) => {
    if (flag === "payNow" && !selectedAddress) {
      showToast("Please select delivery address");
      return;
    }
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setAddressId(id);
  };

  // select address
  const handleSelectAddress = (e, id) => {
    setSelectedAddress(id);
  };

  // add more items
  const handleAddMoreItem = () => {
    close();
    navigate(`/chef-details?id=${chefId}`);
  };

  return (
    <>
      <div className="usercartcheck userCheckOutModal">
        {allCartItems && allCartItems?.length > 0 ? (
          <>
            {allCartItems?.map((item, index) => (
              <div key={index} className="modalDetail usermodaldetail">
                <div className="usercartDetail">
                  <img
                    src={
                      item?.menuItemId?.image
                        ? item?.menuItemId?.image
                        : Images.FoodIcon
                    }
                    className="userprofile"
                    alt="cartImg"
                  />
                  <div className="insideModal">
                    <h6 className="foodtext">{item?.menuItemId?.category}</h6>
                    <h5 className="foodItem">{item?.menuItemId?.name}</h5>
                    <h6 className="foodPrice">£{item?.netPrice}.00</h6>
                    <div className="quantity">
                      <div
                        onClick={() =>
                          handleCartData(
                            "decrease",
                            item?.menuItemId?._id,
                            item?.quantity
                          )
                        }
                        className="Quantiycheck"
                      >
                        <img
                          src={Images.minusModal}
                          className="calQuantity"
                          alt="minusModal"
                        />
                      </div>
                      <span className="number">{item?.quantity}</span>
                      <div
                        onClick={() =>
                          handleCartData(
                            "increase",
                            item?.menuItemId?._id,
                            item?.quantity
                          )
                        }
                        className="Quantiycheck"
                      >
                        <img
                          src={Images.plusModal}
                          className="calQuantity"
                          alt="minusModal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modalDelete_">
                  <img
                    onClick={() => handleDeleteCartItem(item?.menuItemId?._id)}
                    src={Images.cartDelete}
                    className="cartDelete_"
                    alt="cartcancel"
                  />
                </div>
              </div>
            ))}
            {allCartItems && allCartItems?.length > 0 && (
              <div className="cartdelivery">
                <div className="checkoutdelivery">
                  <div className="checkoutaddress">
                    <h6 className="venuInfo">Delivery Address</h6>
                  </div>
                  <div className="checkoutnewaddress">
                    <h6
                      onClick={() => {
                        handleOpenModal("ordereditmodal");
                      }}
                      className="headerinnertxt m-0"
                    >
                      + Add New Address
                    </h6>
                  </div>
                </div>

                <div className="checkouthomeoffice mt-3">
                  {latestAddress && latestAddress.length > 0 ? (
                    <>
                      {latestAddress?.slice(0, 2)?.map((item, index) => (
                        <div key={index} className="checkouthome">
                          <div className="homedropdown mt-2">
                            <h6 className="notificationText">{item?.type}</h6>
                            <div className="dropdown dropend">
                              <img
                                src={Images.chatsDots}
                                className="dropdown-toggle manageimg"
                                alt="cartcancel"
                                data-bs-toggle="dropdown"
                              />
                              <ul className="dropdown-menu">
                                <li
                                  onClick={() => {
                                    handleOpenModal("editaddress", item?._id);
                                  }}
                                >
                                  <img
                                    src={Images.EditImg}
                                    alt="editimage"
                                    className="img-fluid"
                                  />{" "}
                                  <span className="editdrop">Edit </span>
                                </li>
                                <li
                                  onClick={() => {
                                    handleOpenModal("deleteaddress", item?._id);
                                  }}
                                >
                                  <img
                                    src={Images.cartDelete}
                                    alt="editimage"
                                    className="img-fluid"
                                  />{" "}
                                  <span className="editdrop">Delete</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <p className="cheftext mt-2">{item?.streetAddress}</p>
                          <div className="round roundSelect">
                            <input
                              onClick={(e) => handleSelectAddress(e, item?._id)}
                              id=""
                              name=""
                              type="checkbox"
                              value=""
                              className="checkbx"
                              checked={item?._id === selectedAddress}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No address found</p>
                  )}
                </div>
              </div>
            )}

            <div className="modalfooterbtn">
              <div className="outeraddItem">
                <button
                  onClick={() => handleAddMoreItem()}
                  className="addItems"
                  type="button"
                >
                  + Add More Items
                </button>

                <div className="orderNow">
                  <div className="totalPrice">
                    <h6 className="totaltxt">Total</h6>
                    <p className="price">£{totalPrice}.00</p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("payNow")}
                    className="orderbutton"
                    type="button"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="noDataFoundImage">
            <img
              className="w-100"
              alt="no data found"
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
            />
          </div>
        )}
      </div>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "ordereditmodal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "ordereditmodal"
            ? "ordereditaddress"
            : modalDetail.flag === "editaddress"
            ? "ordereditaddress"
            : modalDetail.flag === "deleteaddress"
            ? "ordereditaddress"
            : modalDetail.flag === "payNow"
            ? "ordereditaddress"
            : ""
        }
        child={
          modalDetail.flag === "ordereditmodal" ? (
            <AddAddressModal
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "editaddress" ? (
            <EditAddressModal
              addressId={addressId}
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "deleteaddress" ? (
            <DeleteAddressModal
              addressId={addressId}
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "payNow" ? (
            <PayNowModal
              close={() => {
                close();
                handleOnCloseModal();
              }}
              cartId={cartId}
              selectedAddress={selectedAddress}
              orderPrice={totalPrice}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "ordereditmodal" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Add New Address</h2>
                  <p className="chatUser">Add Address below</p>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "editaddress" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Edit Address</h2>
                  <p className="chatUser">Edit Address below</p>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "deleteaddress" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Delete Address</h2>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "payNow" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={() => {
                    close();
                    handleOnCloseModal();
                  }}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Pay Now</h2>
                  <p className="chatUser">Debit/Credit cards acceptable</p>
                </div>
              </div>
              <p
                onClick={() => {
                  handleOnCloseModal();
                  close();
                }}
                className="modal_cancel"
              >
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

export default UserCartModal;

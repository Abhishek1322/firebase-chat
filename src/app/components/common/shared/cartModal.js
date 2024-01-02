import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import {
  getAllCart,
  onErrorStopLoad,
  deleteCartItem,
  updateCartItem,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import UserCartModal from "./UserCartModal";

const CartModal = (props) => {
  const { close } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const [chefId, setChefId] = useState("");
  const [key, setKey] = useState(Math.random());
  const [totalPrice, setTotalPrice] = useState([]);
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
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // add more items
  const handleAddMoreItem = () => {
    close();
    navigate(`/chef-details?id=${chefId}`);
  };

  return (
    <>
      <div className="usercartcheck">
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
                    onClick={() => handleOpenModal("checkOutModal")}
                    className="orderbutton"
                    type="button"
                  >
                    CheckOut
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
          modalDetail.flag === "checkOutModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={modalDetail.flag === "checkOutModal" ? "ordereditaddress" : ""}
        child={
          modalDetail.flag === "checkOutModal" ? (
            <UserCartModal
              close={() => {
                handleOnCloseModal();
                close();
              }}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "checkOutModal" ? (
            <>
              <h2 className="modal_Heading">CheckOut</h2>
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

export default CartModal;

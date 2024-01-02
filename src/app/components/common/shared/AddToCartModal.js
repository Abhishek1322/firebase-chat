import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getAllCart } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";
import MenuRating from "./MenuRating";
import CustomModal from "./CustomModal";

const AddToCartModal = (props) => {
  const { menuId, close } = props;
  const userData = useUserSelector();
  const [foodDetails, setFoodDetails] = useState([]);
  const [deliverFrom, setDeliverFrom] = useState("");
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get single menu item
  useEffect(() => {
    let params = {
      id: menuId,
    };
    dispatch(
      singleMenu({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFoodDetails(res.data.data.item);
            setDeliverFrom(res.data.data.address);
          }
        },
      })
    );
  }, []);

  // add menu item in cart
  const handleAddCart = () => {
    let params = {
      menuItemId: menuId,
      quantity: 1,
    };
    dispatch(
      addToCart({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            getLatestCart();
          }
        },
      })
    );
  };

  // get latest cart count
  const getLatestCart = () => {
    dispatch(
      getAllCart({
        cb(res) {},
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

  return (
    <>
      <div className="cartfoodsection addCartModal">
        <div className="foodmodal">
          <img
            src={foodDetails?.image ? foodDetails?.image : Images.CartFood}
            alt="saladimage"
            className="foodModalimg"
          />
          <h2 className="foodmodalheading mt-2">{foodDetails?.name}</h2>
          <div className="restroinfo">
            <Link to="#">
              <img
                src={Images.sarahcap}
                alt="sarahcapimage"
                className="img-fluid"
              />
            </Link>
            <div className="johnchatdetail">
              <Link to="#">
                <h6 className="chatDates">{foodDetails?.category}</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="deliverytimesheet">
          <div className="modalfooddelivery">
            <div className="foodeliverytime">
              <h6 className="chefName">Delivery Time</h6>
              <h6 className="chatSearchere_  mt-1">
                {foodDetails?.deliveryTime} mins
              </h6>
            </div>
            <div className="foodrating">
              <h6 className="chefName">Rating</h6>
              <div
                onClick={() => handleOpenModal("ratingmenu")}
                className="chefrating mt-1"
              >
                <i className="las la-star startIcon"></i>
                <p className="ratingheading">
                  {foodDetails?.averageRating} ({foodDetails?.totalReview} Reviews)
                </p>
              </div>
            </div>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Deliver From</h6>
            <p className="chatSearchere_  mt-1">{deliverFrom}</p>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Description</h6>
            <p className="chatSearchere_  mt-1 ">{foodDetails?.description}</p>
          </div>
        </div>
        <h4 className="foodamountmodal">£ {foodDetails?.price}.00</h4>

        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              disabled={userData?.loading}
              onClick={() => handleAddCart()}
              className="foodmodalbtn"
              type="button"
            >
              {userData?.loading && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
              Add to Cart
            </button>
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
          modalDetail.flag === "ratingmenu" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "ratingmenu" ? "availablebtnModal" : ""}
        child={
          modalDetail.flag === "ratingmenu" ? (
            <MenuRating menuId={menuId} close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "ratingmenu" ? (
            <>
              <h2 className="modal_Heading">Rating & Reviews</h2>
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

export default AddToCartModal;

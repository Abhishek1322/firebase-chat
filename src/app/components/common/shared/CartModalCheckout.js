import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import EditAddressModal from "./EditAddressModal";
import { Link } from "react-router-dom";

const CartModalCheckout = () => {
  const [key, setKey] = useState(Math.random());
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

  const handleUserProfile = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  return (
    <>
      <div className="cartcheckoutsection modalContent">
        <div className="modalDetail usermodaldetail ">
          <div className="usercartDetail">
            <img
              src={Images.userProfile}
              className="userprofile"
              alt="cartImg"
            />
            <div className="insideModal">
              <h6 className="foodtext">Food Category</h6>
              <h5 className="foodItem">Chicken Salad</h5>
              <h6 className="foodPrice">£22.00</h6>
              <div className="quantity">
                <div className="Quantiycheck">
                  <img
                    src={Images.minusModal}
                    className="calQuantity"
                    alt="minusModal"
                  />
                </div>
                <span className="number">01</span>
                <div className="Quantiycheck">
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
              src={Images.cartDelete}
              className="cartDelete_"
              alt="cartcancel"
            />
          </div>
        </div>
        <div className="modalDetail  usermodaldetail">
          <div className="usercartDetail">
            <img
              src={Images.userProfile}
              className="userprofile"
              alt="cartImg"
            />
            <div className="insideModal">
              <h6 className="foodtext">Food Category</h6>
              <h5 className="foodItem">Chicken Salad</h5>
              <h6 className="foodPrice">£22.00</h6>
              <div className="quantity">
                <div className="Quantiycheck">
                  <img
                    src={Images.minusModal}
                    className="calQuantity"
                    alt="minusModal"
                  />
                </div>
                <span className="number">01</span>
                <div className="Quantiycheck">
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
              src={Images.cartDelete}
              className="cartDelete_"
              alt="cartcancel"
            />
          </div>
        </div>
        <div className="cartdelivery">
          <div className="checkoutdelivery">
            <div className="checkoutaddress">
              <h6 className="venuInfo">Delivery Address</h6>
            </div>
            <div className="checkoutnewaddress">
              <h6 className="headerinnertxt m-0">+ Add New Address</h6>
            </div>
          </div>
          <div className="checkouthomeoffice mt-3">
            <div className="checkouthome">
              <div className="homedropdown mt-2">
                <h6 className="notificationText">Home</h6>
                <div className="dropdown dropend">
                  <img
                    src={Images.chatsDots}
                    className="dropdown-toggle manageimg"
                    alt="cartcancel"
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="#" className="dropdown-item">
                        <img
                          src={Images.EditImg}
                          alt="editimage"
                          className="img-fluid"
                        />{" "}
                        <span className="editdrop">Edit </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item">
                        <img
                          src={Images.cartDelete}
                          alt="editimage"
                          className="img-fluid"
                        />{" "}
                        <span className="editdrop">Delete</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="cheftext mt-2">New York, 10003, 2nd Street dorm</p>
              <div className="round">
                <input
                  id=""
                  name=""
                  type="checkbox"
                  value=""
                  className="checkbx"
                />
              </div>
            </div>
            <div className="checkouthome">
              <div className="homedropdown mt-2">
                <h6 className="notificationText">Office</h6>
                <div className="dropdown dropend">
                  <img
                    src={Images.chatsDots}
                    className="dropdown-toggle"
                    alt="cartcancel"
                    data-bs-toggle="dropdown"
                  />
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="#" className="dropdown-item">
                        <img
                          src={Images.EditImg}
                          alt="editimage"
                          className="img-fluid"
                        />{" "}
                        <span className="editdrop">Edit </span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item">
                        <img
                          src={Images.cartDelete}
                          alt="editimage"
                          className="img-fluid"
                        />{" "}
                        <span className="editdrop">Delete</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="cheftext mt-2">New York, 10003, 2nd Street dorm</p>
              <div className="round">
                <input
                  id=""
                  name=""
                  type="checkbox"
                  value=""
                  className="checkbx"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modalfooterbtn">
          <div className="outeraddItem">
            <button className="addItems" type="submit">
              + Add More Items
            </button>
            <div className="orderNow">
              <div className="totalPrice">
                <p className="totaltxt">Total</p>
                <p className="price">£44.00</p>
              </div>
              <button
                className="orderbutton"
                type="submit"
                onClick={() => {
                  handleUserProfile("editmodal");
                }}
              >
                Pay Now
              </button>
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
          modalDetail.flag === "editmodal" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "editmodal" ? "editaddress" : ""}
        child={
          modalDetail.flag === "editmodal" ? (
            <EditAddressModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "editmodal" ? (
            <>
              <div className="editadressheading">
                <img
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
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default CartModalCheckout;

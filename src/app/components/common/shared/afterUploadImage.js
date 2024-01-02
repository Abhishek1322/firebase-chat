import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import FoodDetailModal from "./foodDetailModal";

const AfterUploadImage = () => {
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
      <div className="menuModal_">
        <div className="input-container mt-5">
          <textarea
            type=""
            className=" menuReport_button"
            placeholder="Chicken Salad"
          />
          <img src={Images.categoryImg} className="cateofyImg_" alt=" categoryImg" />
          <label className="border-label">Item Name</label>
        </div>
        <div className="input-container mt-4">
          <textarea
            type=""
            className=" menuReport_button   "
            placeholder="Non-Veg"
          />
          <img src={Images.menuDishImg} className="cateofyImg_" alt="menuDishImg" />
          <label className="border-label">Category</label>
        </div>
        <div className="flexBox justify-content-between editMenuFields_ ">
          <div className="input-container mt-5">
            <textarea
              type=""
              className=" menuEditbuttom "
              placeholder="22.00"
            />
            <img src={Images.euroImg} className="cateofyImg_" alt="EuroImg" />
            <label className="border-label">Price</label>
          </div>
          <div className="input-container mt-5 pe-3 flexBox">
            <textarea type="" className=" menuEditbuttom " placeholder="45" />
            <p className="inneredittxt">MIN</p>
            <img src={Images.clockImg} className="cateofyImg_" alt="clcokImg" />
            <label className="border-label">Delivery Time</label>
          </div>
        </div>
      </div>
      <div className="input-container mt-4">
        <textarea
          type=""
          className=" menuReport_button  menuDescrition_  "
          placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
        />
        <label className="border-label">Description</label>
      </div>
      <div className="editImgBox_">
        <p className="chefName mt-4 pb-3">Upload Image </p>
        <img src={Images.editMenuImg} className="editFoodImg" alt="editmenu" />
        <span className="cancelEditImg">
          <i className="fas fa-times cancelEdit"></i>
        </span>
      </div>
      <button
        className="foodmodalbtn  modalfooterbtn"
        onClick={() => {
          handleUserProfile("foodDetailModal");
        }}
      >
        Save Changes
      </button>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "foodDetailModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "foodDetailModal"
            ? "foodDetail"
            : "editFoodDetailsModal"
              ? "editFoodDetail"
              : "clickDeletemenuModal"
                ? "clickDeleteMenu"
                : ""
        }
        child={
          modalDetail.flag === "foodDetailModal" ? (
            <FoodDetailModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "foodDetailModal" ? (
            <>
              <div className="foodDetailHeader_">
                <p onClick={handleOnCloseModal} className="modal_cancel">
                  <img src={Images.modalCancel} className="ModalCancel" alt="modalCancelImg" />
                </p>
              </div>
              {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' alt="modalcancel" />
                        </p> */}
            </>
          ) : modalDetail.flag === "editFoodDetailsModal" ? (
            <>
              <div className="editadressheading">
                <div className="edithead">
                  <p className="modal_Heading">Edit Item</p>
                  <p className="chatUser">Edit your menu items below.</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" alt="modalCancelImg" />
              </p>
            </>
          ) : modalDetail.flag === "clickDeletemenuModal" ? (
            <>
              <div className="editadressheading">
                <img
                  src={Images.backArrowpassword}
                  className="img-fluid arrowCommon_"
                  alt="modalCancelImg"
                />
              </div>
              {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' alt="modalCancel" />
            </p> */}
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

export default AfterUploadImage;

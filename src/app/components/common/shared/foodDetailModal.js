import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";

const FoodDetailModal = (props) => {
  const { menuId, close, handleOpenInnerModal } = props;
  const [foodDetails, setFoodDetails] = useState([]);
  const [deliverFrom, setDeliverFrom] = useState("");
  const dispatch = useDispatch();

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
            setDeliverFrom(res.data.data.address)
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="foodDetailModal_">
        <div className="cartfoodsection">
          <div className="topFoodmenu">
            <div className="Dotsheader_ d-flex align-items-center justify-content-between">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle modalheaderDot_"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v foodDetailicon"></i>
                </button>
                <ul
                  className="dropdown-menu menuItems_"
                  aria-labelledby="dropdownMenuButton1 "
                >
                  <div className=" menuChat">
                    <div
                      className="flexBox pb-2 "
                      onClick={() => {
                        handleOpenInnerModal("editMenuModal", menuId);
                      }}
                    >
                      <img
                        src={Images.EditImg}
                        className=" img-fluid reporticon_"
                        alt="editImg"
                      />
                      <p className="ps-2">Edit</p>
                    </div>
                    <div
                      className="flexBox"
                      onClick={() => {
                        handleOpenInnerModal("deleteMenuModal", menuId);
                      }}
                    >
                      <img
                        src={Images.cartDelete}
                        className=" img-fluid reporticon_"
                        alt="cartDeleteImg"
                      />
                      <p className="reportchattxt_ m-0 ps-2">Delete</p>
                    </div>
                  </div>
                </ul>
              </div>
              <p onClick={() => close()} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </div>
          </div>
          <div className="foodmodal">
            <img
              src={foodDetails?.image}
              alt="saladimage"
              className="img-fluid foodDetailImg"
            />
            <p className="foodmodalheading">{foodDetails?.name}</p>
            <div className="restroinfo">
              <img
                src={Images.sarahcap}
                alt="sarahcapimage"
                className="img-fluid"
              />
              <div className="johnchatdetail">
                <p className="chatDates">{foodDetails?.category}</p>
              </div>
            </div>
          </div>
          <div className="deliverytimesheet">
            <div className="modalfooddelivery">
              <div className="foodeliverytime">
                <p className="chefName">Delivery Time</p>
                <p className="chatSearchere_  mt-1">
                  {foodDetails?.deliveryTime} mins
                </p>
              </div>
              <div className="foodrating">
                <p className="chefName">Rating</p>
                <div className="chefrating mt-1">
                  <i className="las la-star startIcon"></i>
                  <p className="ratingheading">4.5 (845 Reviews)</p>
                </div>
              </div>
            </div>

            <div className="deliverfrom mt-2">
              <p className="chefName">Description</p>
              <p className="chatSearchere_  mt-1 ">
                {foodDetails?.description}
              </p>
            </div>
          </div>
          <p className="foodamountmodal">£ {foodDetails?.price}.00</p>
        </div>
      </div>
    </>
  );
};

export default FoodDetailModal;

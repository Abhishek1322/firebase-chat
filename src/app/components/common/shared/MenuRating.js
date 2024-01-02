import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import MenuGiveRating from "./MenuGiveRating";
import { getMenuRating, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import moment from "moment";

const MenuRating = ({ menuId }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [menuRatingData, setMenuRatingData] = useState([]);
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

  // get menu rating
  useEffect(() => {
    handleGetMenuRating();
  }, []);

  const handleGetMenuRating = () => {
    let params = {
      menuId: menuId,
    };
    dispatch(
      getMenuRating({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setMenuRatingData(res?.data?.data?.data);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="chefratingsection">
        <div className="userrate modalscroll">
          {menuRatingData.length > 0 ? (
            <>
              {menuRatingData?.map((item, index) => (
                <div className="chefrateimg">
                  <img
                    src={
                      item?.userId?.userInfo?.profilePhoto
                        ? item?.userId?.userInfo?.profilePhoto
                        : Images.dummyProfile
                    }
                    alt="userrating"
                    className="ratingImage"
                  />
                  <div className="reviewrating">
                    <div className="chefreviews">
                      <div className="venuInfo">
                        {item?.userId?.userInfo?.firstName}{" "}
                        {item?.userId?.userInfo?.lastName}
                      </div>
                      <div className="cheftext">
                        {moment(item?.createdAt).format("DD-MM-YYYY  HH:mm:ss")}
                      </div>
                    </div>
                    <div className="ratingimgmodal">
                      <ReactStars
                        count={5}
                        size={20}
                        value={item?.rating}
                        edit={false}
                        color="#FFE69C"
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#FFC107"
                      />
                    </div>
                    <div className="userreviews mt-2">
                      <p className="cheftext ">{item?.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div>
              <img
                className="w-100"
                alt="no-data-found"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
              />
            </div>
          )}
        </div>
        <div className="modalfooterbtn">
          <button
            className="foodmodalbtn"
            type="button"
            onClick={() => {
              handleOpenModal("givemenurate");
            }}
          >
            Rate Us
          </button>
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
          modalDetail.flag === "givemenurate" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "givemenurate" ? "availablebtnModal" : ""}
        child={
          modalDetail.flag === "givemenurate" ? (
            <MenuGiveRating
              menuId={menuId}
              handleGetMenuRating={handleGetMenuRating}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "givemenurate" ? (
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

export default MenuRating;

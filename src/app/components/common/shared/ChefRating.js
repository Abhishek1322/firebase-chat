import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import ChefGiveRating from "./ChefGiveRating";
import CustomModal from "./CustomModal";
import { getRating, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import ReactStars from "react-rating-stars-component";
import moment from "moment";

const ChefRating = (props) => {
  const { chefId, handleGetChefDetails } = props;
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [ratingData, setRatingData] = useState([]);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  console.log("ratingDataratingData", ratingData);
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

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get all rating
  const getAllRating = () => {
    let params = {
      chefId: chefId,
    };
    dispatch(
      getRating({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setRatingData(res?.data?.data);
          }
        },
      })
    );
  };

  // get all rating
  useEffect(() => {
    getAllRating();
  }, []);

  return (
    <>
      <div className="chefratingsection">
        <div className="userrate modalscroll">
          {ratingData?.details?.data.length > 0 ? (
            <>
              {ratingData?.details?.data?.map((item, index) => (
                <div key={index} className="chefrateimg">
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
              handleOpenModal("giverate");
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
          modalDetail.flag === "giverate" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "giverate" ? "giveratemodal" : ""}
        child={
          modalDetail.flag === "giverate" ? (
            <ChefGiveRating
              chefId={chefId}
              handleGetChefDetails={handleGetChefDetails}
              getAllRating={getAllRating}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "giverate" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={() => handleOnCloseModal()}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Give Rating & Reviews</h2>
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

export default ChefRating;

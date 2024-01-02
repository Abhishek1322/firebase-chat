import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import { Progress } from "antd";

const RatingReviewsModal = ({ allRating, setGetActiveRating }) => {
  const [activeRating, setActiveRating] = useState("All");
  const [ratingProgress, setRatingProgress] = useState({
    fiveStar: "",
    fourStar: "",
    threeStar: "",
    twoStar: "",
    oneStar: "",
  });

  // rating
  const rating = [
    {
      id: 0,
      value: "All",
    },
    {
      id: 1,
      value: "5",
    },
    {
      id: 2,
      value: "4",
    },
    {
      id: 3,
      value: "3",
    },
    {
      id: 4,
      value: "2",
    },
  ];

  // active rating
  const handleActiveRating = (rating) => {
    setActiveRating(rating);
    setGetActiveRating(rating);
  };

  // get rating progress
  useEffect(() => {
    const fiveStar =
      (allRating?.ratingCounts?.fiveRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const fourStar =
      (allRating?.ratingCounts?.fourRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const threeRating =
      (allRating?.ratingCounts?.threeRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const twoRating =
      (allRating?.ratingCounts?.twoRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const oneRating =
      (allRating?.ratingCounts?.oneRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    setRatingProgress({
      fiveStar: fiveStar,
      fourStar: fourStar,
      threeStar: threeRating,
      twoStar: twoRating,
      oneStar: oneRating,
    });
  }, []);

  return (
    <>
      <div className="ProfilePageModal">
        <div className="ratingReviews_ flexBox justify-content-between">
          <div className="ratingStars">
            <div className="flexBox">
              <p className="ratinghere_">{allRating?.averageRating}</p>
              <span className="ratingFrom">/5</span>
            </div>
            <p className="overallTxt ps-2">Overall</p>
          </div>

          <div>
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <div>
              <Progress
                className="ratingProgressBarNew"
                showInfo={false}
                percent={ratingProgress?.fiveStar}
              />
            </div>
          </div>

          <div>
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <div>
              <Progress
                className="ratingProgressBarNew"
                showInfo={false}
                percent={ratingProgress?.fourStar}
              />
            </div>
          </div>

          <div>
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />

            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />

            <div>
              <Progress
                className="ratingProgressBarNew"
                showInfo={false}
                percent={ratingProgress?.threeStar}
              />
            </div>
          </div>

          <div>
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />

            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <div>
              <Progress
                className="ratingProgressBarNew"
                showInfo={false}
                percent={ratingProgress?.twoStar}
              />
            </div>
          </div>

          <div>
            <img
              src={Images.singleRating}
              className="RatingImg_"
              alt="RatingImg"
            />
            <div>
              <Progress
                className="ratingProgressBarNew"
                showInfo={false}
                percent={ratingProgress?.oneStar}
              />
            </div>
          </div>
        </div>

        <div className="flexBox justify-content-between pt-3">
          {rating?.map((item, index) => (
            <div
              onClick={() => handleActiveRating(item?.value)}
              key={index}
              className={
                activeRating === item?.value
                  ? "StarRating_ activeRating"
                  : "StarRating_"
              }
            >
              {item?.value === "All" ? (
                ""
              ) : (
                <img
                  src={Images.RatingStar}
                  alt="userrating"
                  className="img-fluid"
                />
              )}
              <span
                className={item?.value === "All" ? "rating" : "rating ps-2"}
              >
                {item?.value}
              </span>
            </div>
          ))}
        </div>
        <div className="modalscroll">
          {allRating && allRating?.details?.data.length > 0 ? (
            <>
              {allRating?.details?.data?.map((item, index) => (
                <>
                  <div key={index} className="chefrateimg">
                    <img
                      src={
                        item?.userId?.userInfo?.profilePhoto
                          ? item?.userId?.userInfo?.profilePhoto
                          : Images.dummyProfile
                      }
                      alt="userrating"
                      className="img-fluid"
                    />
                    <div className="reviewrating">
                      <div className="chefreviews">
                        <div className="venuInfo">
                          {item?.userId?.userInfo?.firstName}{" "}
                          {item?.userId?.userInfo?.lastName}
                        </div>
                        <div className="cheftext">
                          {" "}
                          {moment(item?.createdAt).format(
                            "DD-MM-YYYY  HH:mm:ss"
                          )}
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
                </>
              ))}
            </>
          ) : (
            <p>No rating found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RatingReviewsModal;

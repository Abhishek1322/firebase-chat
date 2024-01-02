import React, { useState, useRef, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { menuRating, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/selector/user";

const MenuGiveRating = (props) => {
  const { close, menuId, handleGetMenuRating } = props;
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const userData = useUserSelector();
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  // get rating count
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  // submit rating
  const handleSubmitRating = () => {
    if (!rating) {
      showToast("Please select a rating");
      return;
    } else if (!review) {
      showToast("Please add a review");
      return;
    }
    let params = {
      menuId: menuId,
      rating: rating,
      review: review,
    };

    dispatch(
      menuRating({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            handleGetMenuRating();
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  return (
    <>
      <div className="giveratesection">
        <p className="venuInfo mt-4">Rating</p>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={28}
          color="#FFE69C"
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FFC107"
        />
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="input-container mt-4">
              <textarea
                onChange={(e) => setReview(e.target.value)}
                type="text"
                className="border-input inputPlaceholder"
                placeholder="Write here"
                rows={5}
              />
              <label className="border-label">Description</label>
            </div>
          </div>
        </div>
        <div className="modalfooterbtn">
          <div className="orderItems">
            <button onClick={close} className="cancelOrder" type="submit">
              Cancel
            </button>
            <button
              onClick={handleSubmitRating}
              className="acceptOrder"
              type="submit"
            >
              {userData?.loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuGiveRating;

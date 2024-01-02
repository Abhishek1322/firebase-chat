import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import {
  getBookingRequests,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import moment from "moment";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const NewBooking = () => {
  const dispatch = useDispatch();
  const [bookingRequest, setBookingRequest] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");

  // get booking request
  useEffect(() => {
    let params = {
      limit: 15,
      page: currentPage,
      status: bookingStatus,
    };
    dispatch(
      getBookingRequests({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setBookingRequest(res?.data?.data?.data);
            setPageCount(res.data.data.total_pages);
          }
        },
      })
    );
  }, [bookingStatus, currentPage, pageCount]);

  // stop loading
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <div className="mainchef_">
        <div className="Newbooking_">
          <nav>
            <div className="newBooking-tabs">
              <div
                className="nav nav-tabs bookingNav"
                id="nav-tab"
                role="tablist"
              >
                <button
                  onClick={() => setBookingStatus("")}
                  className="nav-link bookingNavHeader active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  New Bookings{" "}
                </button>
                <button
                  onClick={() => setBookingStatus("accepted")}
                  className="nav-link bookingNavHeader"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Accepted
                </button>
              </div>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="profileDetail">
                      {bookingRequest && bookingRequest.length > 0 ? (
                        <>
                          {bookingRequest?.map((item, index) => (
                            <Link to={`/booking-details?id=${item?._id}`}>
                              <div key={index} className="homeProfileBox">
                                <div className="profileInfo">
                                  <img
                                    src={
                                      item?.userId?.userInfo?.profilePhoto
                                        ? item?.userId?.userInfo?.profilePhoto
                                        : Images.dummyProfile
                                    }
                                    alt="profile"
                                    className="homeprofile"
                                  />
                                  <div className="detailInfo">
                                    <h3 className="userProfile">
                                      {item?.userId?.userInfo?.firstName}{" "}
                                      {item?.userId?.userInfo?.lastName}
                                    </h3>
                                    <h4 className="userInfo">
                                      {moment(item?.createdAt).format(
                                        "hh:mm A"
                                      )}
                                    </h4>
                                  </div>
                                </div>
                                <p className="userInfoTxt">
                                  {item?.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <p>No data found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {bookingRequest && bookingRequest.length > 0 && (
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};

export default NewBooking;

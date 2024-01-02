import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "../../../components/common/shared/CustomModal";
import UserOrderDetail from "../../../components/common/shared/UserOrderDetail";
import { getAllOrder, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import moment from "moment";
import ReactPaginate from "react-paginate";

const UserOrderHome = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [allOrders, setAllOrders] = useState([]);
  const [foodOrderId, setFoodOrderId] = useState("");
  const [orderDetail, setOrderDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
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
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setFoodOrderId(id);
  };

  // get all orders
  useEffect(() => {
    let params = {
      limit: 10,
      page: currentPage,
    };

    dispatch(
      getAllOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setAllOrders(res?.data?.data?.data);
            setPageCount(res.data.data.total_pages);
          }
        },
      })
    );
  }, [currentPage]);

  // stop looader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <div className="userordersection">
        <div className="row">
          {allOrders && allOrders.length > 0 ? (
            <>
              {allOrders?.map((item, index) => {
                return (
                  <div key={index} className="col-lg-12">
                    <div
                      className={
                        item?.status === "pending" ||
                        item?.status === "accepted" ||
                        item?.status === "readyForDelivery"
                          ? "orderprocess active mb-3"
                          : "orderprocess  mb-3"
                      }
                      onClick={() => {
                        handleOpenModal("orderdetail", item?._id);
                      }}
                    >
                      <article className="flexBox justify-content-between">
                        <h6 className="fooodquantity_">#{item?.orderId}</h6>
                        {item?.status === "pending" ||
                        item?.status === "accepted" ||
                        item?.status === "readyForDelivery" ? (
                          <h6 className="chatTime_">In-Progress</h6>
                        ) : (
                          <h6 className="chatTime_">Delivered</h6>
                        )}
                      </article>
                      <div className="orderchefinfo">
                        <div className="row">
                          <div className="col-lg-6 col-md-12">
                            <div className="flexBox">
                              <img
                                src={
                                  item?.chefId?.userInfo?.profilePhoto
                                    ? item?.chefId?.userInfo?.profilePhoto
                                    : Images.OrderChef
                                }
                                alt="chefimg"
                                className="img-fluid chefOrderImg"
                              />
                              <div className="orderchefname">
                                <h6 className="chefName">
                                  {item?.chefId?.userInfo?.firstName}{" "}
                                  {item?.chefId?.userInfo?.lastName}
                                </h6>
                                <h6 className="orderFrom">Order From</h6>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12">
                            <div className="orderstatus">
                              <h6 className="Items">{item?.itemCount} Items</h6>
                              <h6 className="timeOrder_">
                                Order placed on{" "}
                                {moment(item?.updatedAt).format("hh:mm A")}
                              </h6>
                              <div className="userorderprice">
                                <h5 className="orderPrice ">
                                  £{item?.total}.00
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p>No Order found</p>
          )}
        </div>
        {allOrders && allOrders.length > 0 && (
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
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "orderdetail" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "orderdetail" ? "userorderdetail" : ""}
        child={
          modalDetail.flag === "orderdetail" ? (
            <UserOrderDetail
              foodOrderId={foodOrderId}
              close={() => handleOnCloseModal()}
              setOrderDetail={setOrderDetail}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "orderdetail" ? (
            <>
              <div className="Common_header">
                <div className="headerProfile">
                  <p className="headerTxt_">Order #{orderDetail?.orderId}</p>

                  {orderDetail?.status === "pending" ||
                  orderDetail?.status === "accepted" ||
                  orderDetail?.status === "readyForDelivery" ? (
                    <p className="headerInner_ inprofress">In-Progress</p>
                  ) : (
                    <p className="orderDelivered">Delivered</p>
                  )}
                </div>
              </div>
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

export default UserOrderHome;

import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChefBookPay from "./ChefBookPay";

const ChefBookModal = ({
  chefData,
  latitude,
  longitude,
  city,
  selectedTimeSlotes,
  description,
  date,
  firstBookNow
}) => {
  console.log("selectedTimeSlotespp", selectedTimeSlotes);
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
    firstBookNow()
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
      <div className="chefbookmodalsection mt-3">
        <h2 className="chatheadtext m-3 ">Hire Chef</h2>
        <div className="row align-items-center m-2">
          <div className="col-lg-9">
            <div className="sarahinfo">
              <div className="sarahimg">
                <img
                  src={
                    chefData?.userInfo?.profilePhoto
                      ? chefData?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="sarahimage"
                  className="img-fluid"
                />
              </div>
              <div className="saraheading">
                <h4 className="chatheadtext">
                  {chefData?.userInfo?.firstName} {chefData?.userInfo?.lastName}
                </h4>

                <img
                  src={Images.sarahcap}
                  alt="sarahcapimage"
                  className="img-fluid"
                />

                <button className="restrodetail" type="button">
                  {chefData?.chefInfo?.type}
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <h6 className="chatTime_">
              {" "}
              <span className="bookchefprice">
                £{chefData?.chefInfo?.ratePerHour}
              </span>
              /hour
            </h6>
          </div>
        </div>
        <div className="chefbookslots">
          <p className="chefName mt-3">Book Time Slot</p>
          <div className="bookslots mt-2">
            {selectedTimeSlotes &&
              selectedTimeSlotes?.map((item, index) => (
                <div key={index} className="daytimes active">
                  <img
                    src={Images.ClockIcon}
                    alt="clockimage"
                    className="img-fluid lighttime"
                  />
                  <img
                    src={Images.ColorClock}
                    alt="clockimage"
                    className="img-fluid darktime"
                  />
                  <p className="daytimesheading">
                    {item?.from} - {item?.to}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className="modalfooterborder">
          <div className="modalfooterbtn">
            <div className="bookmodalbtn">
              <p className="foodamountmodal">
                £{chefData?.chefInfo?.ratePerHour}.00{" "}
                <span className="notificationText ">
                  X {selectedTimeSlotes?.length} hrs
                </span>
              </p>

              <div className="orderNow">
                <div className="totalPrice">
                  <h6 className="totaltxt">Total</h6>
                  <p className="price">
                    £
                    {chefData?.chefInfo?.ratePerHour *
                      selectedTimeSlotes?.length}
                    .00
                  </p>
                </div>
                <button
                  className="orderbutton"
                  type="button"
                  onClick={() => {
                    handleUserProfile("chefpay");
                  }}
                >
                  Pay Now
                </button>
              </div>
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
        ids={modalDetail.flag === "chefpay" ? "chefbookpaymodal" : ""}
        child={
          modalDetail.flag === "chefpay" ? (
            <ChefBookPay
              chefData={chefData}
              latitude={latitude}
              longitude={longitude}
              city={city}
              selectedTimeSlotes={selectedTimeSlotes}
              description={description}
              date={date}
              close={() => handleOnCloseModal()}
              secondChefBook={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chefpay" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Pay Now</h2>
                  <p className="chatUser">Debit/Credit cards acceptable</p>
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

export default ChefBookModal;

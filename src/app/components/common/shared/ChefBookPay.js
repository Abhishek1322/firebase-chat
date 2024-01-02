import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChefPaymentDone from "./ChefPaymentDone";
import { usePaymentInputs } from "react-payment-inputs";
import { toast } from "react-toastify";
import { hireChef, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import moment from "moment";

const ChefBookPay = ({
  chefData,
  latitude,
  longitude,
  city,
  selectedTimeSlotes,
  description,
  date,
  secondChefBook,
}) => {
  const [key, setKey] = useState(Math.random());
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cvv: "",
  });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  const { meta, getExpiryDateProps, getCVCProps } = usePaymentInputs();

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // open Modal
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // format card number
  const handleFormatCardNumber = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const formattedValue = numericValue
      .substr(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    return formattedValue;
  };

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // hire chef
  const handleHireChef = () => {
    if (!formData.cardHolderName) {
      showToast("Please enter cardholder name");
      return;
    } else if (!formData.cardNumber) {
      showToast("Please enter card number");
      return;
    } else if (!formData.expiryDate) {
      showToast("Please enter card expiry date");
      return;
    } else if (!formData.cvc) {
      showToast("Please enter cvv number");
      return;
    }
    const removeSlotId = selectedTimeSlotes?.map((item) => {
      const { id, ...rest } = item;
      return rest;
    });

    let params = {
      chefId: chefData?._id,
      date: moment(date).format("DD-MM-YYYY"),
      slots: removeSlotId,
      address: city,
      coordinates: [latitude, longitude],
      description: description,
      cardHolderName: formData.cardHolderName,
      cardNumber: formData.cardNumber,
      expiresOn: formData.expiryDate,
      cvv: formData.cvc,
    };
    dispatch(
      hireChef({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleOpenModal("chefpaydone");
            setOrderId(res?.data?.data?._id);
            setOrderNumber(
              res?.data?.data?.orderId
                ? res?.data?.data?.orderId
                : res?.data?.data?.bookingId
            );
          }
        },
      })
    );
  };

  return (
    <>
      <div className="paymodalsection">
        <div className="row">
          <div className="col-lg-12">
            <div className="input-container mt-4">
              <input
                onChange={handleChange}
                type="text"
                name="cardHolderName"
                className="border-input"
                placeholder="Card Holder’s Name"
              />
              <label className="border-label">Card Holder’s Name</label>
            </div>
          </div>
        </div>
        <div className="paynowinputs">
          <div className="row">
            <div className="col-lg-12">
              <div className="input-container mt-4">
                <input
                  name="cardNumber"
                  className="border-input"
                  maxLength="19"
                  placeholder="0000 0000 0000 0000"
                  onChange={handleChange}
                  value={handleFormatCardNumber(formData.cardNumber)}
                />
                <label className="border-label">Card No</label>
                <img
                  src={Images.ZipCode}
                  alt="InfoIcon"
                  className="InputIcon"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="input-container mt-4">
                <input
                  className="border-input"
                  placeholder="MM/YY"
                  name="cardExpiry"
                  {...getExpiryDateProps({ onChange: handleChange })}
                  value={formData.expiryDate}
                />

                <label className="border-label">Expires On</label>
                <img
                  src={Images.Calendar}
                  alt="InfoIcon"
                  className="InputIcon"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-container mt-4">
                <input
                  name="cvv"
                  className="border-input"
                  placeholder="123"
                  {...getCVCProps({ onChange: handleChange })}
                  value={formData.cvc}
                />

                <label className="border-label">Cvv</label>
                <img
                  src={Images.ZipCode}
                  alt="InfoIcon"
                  className="InputIcon"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button onClick={handleHireChef} className="foodmodalbtn">
              Pay £{chefData?.chefInfo?.ratePerHour * selectedTimeSlotes.length}
              .00
            </button>
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
          modalDetail.flag === "chefpaydone" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "chefpaydone" ? "chefpaydonemodal" : ""}
        child={
          modalDetail.flag === "chefpaydone" ? (
            <ChefPaymentDone
              orderId={orderId}
              orderNumber={orderNumber}
              secondChefBook={secondChefBook}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={modalDetail.flag === "chefpaydone" ? <></> : ""}
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default ChefBookPay;

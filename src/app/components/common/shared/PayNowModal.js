import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import PaymentDoneModal from "./PaymentDoneModal";
import { createOrder, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import { usePaymentInputs } from "react-payment-inputs";
import { toast } from "react-toastify";

const PayNowModal = (props) => {
  const { close, cartId, selectedAddress, orderPrice } = props;
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [key, setKey] = useState(Math.random());
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

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // create order
  const handleCreateOrder = () => {
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

    let params = {
      cartId: cartId,
      addressId: selectedAddress,
      cardHolderName: formData.cardHolderName,
      cardNumber: formData.cardNumber,
      expiresOn: formData.expiryDate,
      cvv: formData.cvc,
    };

    dispatch(
      createOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleOpenModal("paydone");
            setOrderId(res?.data?.data?._id);
            setOrderNumber(res?.data?.data?.orderId);
          }
        },
      })
    );
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
            <button
              className="foodmodalbtn"
              type="submit"
              onClick={() => {
                handleCreateOrder();
              }}
            >
              Pay £{orderPrice}.00
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
          modalDetail.flag === "paydone" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "paydone" ? "paydonemodal" : ""}
        child={
          modalDetail.flag === "paydone" ? (
            <PaymentDoneModal
              close={() => {
                close();
                handleOnCloseModal();
              }}
              orderNumber={orderNumber}
              orderId={orderId}
            />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default PayNowModal;

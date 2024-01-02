import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import PaidOnOrderModal from './paidOnOrderModal'
const OrderDeliveredModal = () => {
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
    <div className='myrecentOrders_'>
                <div className='modalscroll'>
                    <div className='orderProfile'>
                        <div className="ordermenuProfile">
                            <div className='orderprofile_ '>
                                <img src={Images.userProfile} alt="logo" className="homeprofile" />
                                <div className="detailInfo">
                                    <p className="userProfile">John Smith</p>
                                    <p className="userInfo">Order From</p>
                                </div>
                            </div>
                            <div className='chat_'>
                                <img src={Images.orderMsgImg} className='orderchat' alt='oprderMsgImg'  />
                            </div>
                        </div>
                        <p className='notificationText pt-3'>Delivery Address</p>
                        <p className='timeOrder_'>46 Abingdon Road, Brandeston, United Kingdom
                            IP13 4PB</p>
                        <div className='flexBox justify-content-between'>
                            <p className='Items'>2 Items</p>
                            <p className='timeOrder_ pb-2'>Order placed on 12:24 pm</p>
                        </div>
                    </div>
                    <div className='orderDetails_'>
                        <p className='reportText_ pt-3 pb-3'>Ordered Items</p>
                        <div className='orderProfile'>
                            <div className="profileInfo">
                                <div className='orderprofile_ flexBox'>
                                    <img src={Images.foodItems} alt="foodItems" className="homeprofile" />
                                    <div className="detailInfo">
                                        <p className='userInfo'>Food Category</p>
                                        <p className="userProfile">Chicken Salad</p>
                                        <p className="orderPrice">£22.00</p>
                                    </div>
                                </div>
                                <p className='cheftext'>2X</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modalfooterbtn'>
                    <div className='totalOrderAmount_ flexBox justify-content-between pb-4'>
                        <p className='chat_Text m-0 pb-0'>Total paid</p>
                        <p className='chat m-0'>£44.00</p>
                    </div>
                   <button className='readyForDelivery'  onClick={() => {
                        handleUserProfile("paidOnYourOrder")
                    }}>Order Delivered</button>
                </div>
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "paidOnYourOrder" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "paidOnYourOrder" ? "paidAmount":''}
                child={
                    modalDetail.flag === "paidOnYourOrder" ? (
                        <PaidOnOrderModal
                            close={() => handleOnCloseModal()}
                            
                        />
                    ) :
                            ""
                }
                header=

                {modalDetail.flag === "paidOnYourOrder" ?
                    <>
                        <div className='Common_header'>
                     <img
                                src={Images.backArrowpassword}
                                alt="arrowpswImg"
                                className="img-fluid  arrowCommon_"
                            />
                            <div className='headerProfile ps-2'>
                            <p className='modal_Heading'>Order #12548</p>
                            <p className='innerhead_ ps-3'>Order Delivered</p>
                            </div>
                     </div>
                    </>
                    :
                        ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />
   </>
  )
}

export default OrderDeliveredModal
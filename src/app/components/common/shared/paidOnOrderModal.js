import React from 'react'
import * as Images from "../../../../utilities/images"
const PaidOnOrderModal = () => {
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
                                <img src={Images.orderMsgImg} className='orderchat' />
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
                                    <img src={Images.foodItems} alt="logo" className="homeprofile" />
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
                </div>
            </div>
        </>
    )
}

export default PaidOnOrderModal
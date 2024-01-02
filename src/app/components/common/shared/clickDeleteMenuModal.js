import React from 'react'
import * as Images from "../../../../utilities/images"


const ClickDeleteMenuModal = () => {
  return (
    <>
     <div className='DeleteMenuModal'>
        <div className='paymentdonesection'>
          <img src={Images.deleteMenuImg} alt='accountdeletedimg' className='img-fluid' />
          <p className='accountDeleted mt-3'>Delete Item</p>
          <p className='accountdeletetxt mt-2 '>Are you sure, you want to delete this menu item?

          </p>
          <div className='modalfooterbtn'>
          <div className='orderItems_ flexBox  mb-3'>
                        <button className='cancelOrder_ me-4' >Cancel</button>
                        <button className='submitOrder_'>Yes, Report</button>
                    </div>
          </div>
        </div>
      </div>
    
    
    </>
  )
}

export default ClickDeleteMenuModal
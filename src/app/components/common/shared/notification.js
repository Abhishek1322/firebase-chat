import React from 'react'
import * as Images from "../../../../utilities/images"
const Notification = () => {
  return (
    <>
               <div className='modalContent'>
                    <p className='modalclearAll text-end'>Clear All</p>
          
           
             <div className='modalscroll'>
             <div className='notificationModal reademessage'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>
                <div className='notificationModal reademessage'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>
                <div className='notificationModal unreadmessage'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>
                <div className='notificationModal unreadmessage'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>
                <div className='notificationModal unreadmessage'>
               <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>
                 <div className='notificationModal unreadmessage'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    {/* <p className='notificationTime'>02:21 pm</p> */}

                </div> 
             </div>
             </div>
              
    </>
  )
}

export default Notification
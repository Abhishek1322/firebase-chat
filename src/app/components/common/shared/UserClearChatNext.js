import React from 'react'
import * as Images from "../../../../utilities/images"


const UserClearChatNext = () => {
  return (
    <>
      <div className='chatclearnextsection'>
        <div className='chatfooterbtn'>
          <div className='chatSearchHere_'>
            <input className='chatSearchere_' type='search' placeholder='Type Something...' />
            <div className='modaltooltip'>
              <img src={Images.chatgalleryImg} alt="logo" className="gallerImg" data-tooltip title="Click to go [crazy]" />
              <span className="tooltiptext">Your only able to send photos from gallery</span>
            </div>
            <img src={Images.chatSendImg} alt="logo" className="sendImg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserClearChatNext
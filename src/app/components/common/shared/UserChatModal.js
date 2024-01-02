import React from "react";
import * as Images from "../../../../utilities/images";

const UserChatModal = () => {
  return (
    <>
      <div className="chefchatsection">
        <div className="chatnext">
          <div className="left_chatBox">
            <div className="leftchat">
              <p className="chat_Text">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking layout.
              </p>
            </div>
            <div className="chefchat_detail">
              <img src={Images.UserICon} alt="logo" className="chatnextImg" />
              <h6 className="chatUser m-0 ps-1 pe-2">John Smith</h6>
              <h6 className="chatTime_ m-0">2:34 pm</h6>
            </div>
          </div>
          <div className="right_chatBox">
            <div className="chatinRight_">
              <p className="chat_Text">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking layout.
              </p>
            </div>
            <div className="chefchat_detail">
              <h6 className="chatTime_ m-0 pe-2 ">2:36 pm</h6>
              <h6 className="chatUser m-0 pe-1">You</h6>
              <img
                src={Images.homeProfile}
                alt="logo"
                className="chatnextImg"
              />
            </div>
          </div>
        </div>
        <div className="chatfooterbtn">
          <div className="chatSearchHere_">
            <input
              className="chatSearchere_"
              type="search"
              placeholder="Type Something..."
            />
            <div className="modaltooltip">
              <img
                src={Images.chatgalleryImg}
                alt="logo"
                className="gallerImg"
                data-tooltip
                title="Click to go [crazy]"
              />
              <span className="tooltiptext">
                Your only able to send photos from gallery
              </span>
            </div>
            <img src={Images.chatSendImg} alt="logo" className="sendImg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChatModal;

import React from "react";
import * as Images from "../../../../utilities/images";

const ReportChatModal = () => {
  return (
    <>
      <div className="modalContent">
        <div className="modalDetail ">
          <div className="main_reportchat">
            <div className="reportchat_">
              <div className="reportchat_Img">
                <img
                  src={Images.reportChatImg}
                  alt="reportChatImg"
                  className="reportchatImg"
                />
              </div>
              <p className="Headingsmall m-0">Delete Chat</p>
              <p className="subHeading m-0">
                Are you sure, you want to delete this chat?
              </p>
            </div>
            <div className="orderItems ">
              <button className="cancelOrder">CANCEL</button>
              <button className="acceptOrder">Yes, Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportChatModal;

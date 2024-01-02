import React from "react";

const ReportchatAnothermodal = () => {
  return (
    <>
      <div className="modalContent">
        <div className="modalDetail ">
          <div className="reportchatAnother_">
            <div className="reportchat__">
              <p className="chatheadtext">
                Are you sure, you want to report Sarah Bergstrom?
              </p>
              <p className="chatinner_">Give a reason</p>
            </div>
            <div className="orderItems">
              <button className="cancelOrder">Cancel</button>
              <button className="acceptOrder">Yes, Report</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportchatAnothermodal;

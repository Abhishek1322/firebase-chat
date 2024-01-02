import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { reportChat, onErrorStopLoad } from "../../../../redux/slices/user";
import { toast } from "react-toastify";
import { getUserProfileDetails } from "../../../../redux/slices/web";

const ReportchatDropModal = ({ id, close }) => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [chefData, setChefData] = useState([]);
  const [reportReason, setReportReason] = useState("");

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // getting user profile details
  useEffect(() => {
    handleGetProfile();
  }, []);

  // getting user profile details
  const handleGetProfile = () => {
    let params = {
      userid: id,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setChefData(res?.data?.data);
            // if (handleChefProfle !== undefined) {
            //   handleChefProfle(res?.data?.data);
            // }
          }
        },
      })
    );
  };

  // report chat
  const handleReportChat = () => {
    if (!reportReason) {
      showToast("please provide a reason");
      return;
    }
    let params = {
      id: id,
      message: reportReason,
    };
    dispatch(
      reportChat({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
          }
        },
      })
    );
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  return (
    <>
      <div className="modalContent">
        <div className="reportchatdrop_">
          <p className="reportText_">
            Are you sure, you want to report <br />{" "}
            {chefData?.userInfo?.firstName} {chefData?.userInfo?.lastName} ?
          </p>
          <div className="input-container mt-5">
            <textarea
              type="text"
              onChange={(e) => setReportReason(e.target.value)}
              className="Reportborder-input "
            />
            <label className="border-label">Give a reason</label>
          </div>
          <div className="orderItems_ flexBox justify-content-between modalfooterbtn">
            <button onClick={close} className="cancelOrder_">
              Cancel
            </button>
            <button onClick={handleReportChat} className="submitOrder_">
              Yes, Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportchatDropModal;

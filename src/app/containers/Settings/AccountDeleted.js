import React, { useEffect } from "react";
import * as Images from "../../../utilities/images";
import { useNavigate } from "react-router-dom";

const AccountDeleted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2500);
  }, []);

  return (
    <>
      <div className="accountDelete_">
        <div className="container-fluid">
          <div className="changepassword loadingpage">
            <div className="changepasswordForm">
              <div className="changepasswordImg d-flex justify-content-center">
                <img
                  src={Images.accountDeleted}
                  alt="deleteImg"
                  className="img-fluid innerHeaderArrow "
                />
              </div>
              <h6 className="accountDeleted mb-3 d-flex  justify-content-center mt-3">
                Account Deleted
              </h6>
              <h2 className="accountdeletetxt mb-3 d-flex  justify-content-center mt-3">
                Your account has been deleted successfully.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDeleted;

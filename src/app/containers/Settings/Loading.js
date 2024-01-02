import React from "react";
import * as Images from "../../../utilities/images"
const Loading = () => {
  return (
    <>
      <div className="changepsw_loader ">
        <div className="loaderImage_">
          <img
            src={Images.loadingsettingpage1}
            alt="loadingsettingpage1"
            className="img-fluid zoom-in-zoom-out changepswloader_"
            id="line"
          />
          <h2
            data-text="Please wait, It takes some time."
            className="changepassText  mb-0 d-flex  justify-content-center mt-3 method-3"
          ></h2>
        </div>
      </div>
    </>
  );
};

export default Loading;

import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHelperPages, onErrorStopLoad } from "../../../redux/slices/user";

const TermAndCondition = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState([]);

  //get privacy policy content
  useEffect(() => {
    let params = {
      slug: "term_and_conditions",
    };
    dispatch(
      getHelperPages({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setContent(res.data.data);
          }
        },
      })
    );
  }, []);

  //stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="main-div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
                <Link to="/setting">
                  <img
                    src={Images.backArrowpassword}
                    alt="arrowImg"
                    className="img-fluid  innerHeaderArrow"
                  />
                </Link>
                <h1 className="settingMainHeading text-align-center ">
                  {content?.title}
                </h1>
              </div>
              <div className="termAndCond">
                <div
                  dangerouslySetInnerHTML={{ __html: content.content }}
                  className="termcondDummy"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermAndCondition;

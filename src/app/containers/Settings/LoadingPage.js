import React from 'react'
import * as Images from "../../../utilities/images";

const LoadingPage = () => {
  return (
  <>
   <div className="loaderPage_">
                <div className="container-fluid">

                    <div className='changepassword loadingpage'>
                        <div className="logRight mt-5">
                            <div className="changepasswordForm">
                                <div className='changepasswordImg d-flex justify-content-center'>
                                    <img src={Images.loadingsettingpage1} alt="loadingsetting" className="img-fluid " />
                                </div>
                                <h6 className="changepassText mb-3 d-flex  justify-content-center mt-3">Please wait, It takes some time.</h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
  </>
  )
}

export default LoadingPage
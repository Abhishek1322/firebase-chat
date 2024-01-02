import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import UserClearChatNext from './UserClearChatNext';


const UserClearChat = () => {
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleUserProfile = (flag) => {

    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  return (
    <>
      <div className='chefclearchatsection deletesection paymentdonesection'>
        <img src={Images.DeleteModal} alt='accountdeletedimg' className='img-fluid' />
        <h1 className='accountDeleted mt-3'>Clear Chat</h1>
        <h4 className='accountdeletetxt mt-2 '>Are you sure, you want to clear all chat?</h4>
        <div className='modalfooterbtn'>
          <div className='orderItems'>
            <button className='cancelOrder' type='button'>Cancel</button>
            <button className='acceptOrder' type='button' onClick={() => {
              handleUserProfile("clearchatnext")
            }}>Yes, Clear</button>
          </div>
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={modalDetail.flag === "clearchatnext" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "clearchatnext" ? "chatnextmodal" : ""}
        child={
          modalDetail.flag === "clearchatnext" ? (
            <UserClearChatNext
              close={() => handleOnCloseModal()}
            />
          ) :
            ""
        }
        header=

        {modalDetail.flag === "clearchatnext" ?
          <>
            <div className='Common_header'>
              <img
                src={Images.backArrowpassword}
                alt="logo"
                className="img-fluid  arrowCommon_"
              />
              <img
                src={Images.UserICon}
                alt="logo"
                className="img-fluid  headerImg_"
              />
              <div className='headerProfile'>
                <h2 className='headerTxt_'>John Smith</h2>
                <h6 className='headerInner_'>Online</h6>
              </div>
            </div>
            <div className='Dotsheader_'>
              <div className="dropdown ">
                <button className="btn btn-secondary dropdown-toggle modalheaderDot_" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={Images.modalHeader} className=' img-fluid chatreportIcon_' alt='drodownimg' />
                </button>
                <ul className="dropdown-menu chatdrop" aria-labelledby="dropdownMenuButton1">
                  <li className=' chatdroplabel flexBox'>
                    <img src={Images.reportchatIcon} className=' img-fluid reporticon_' alt='reportchatimg' />
                    <p className='reportchattxt_ m-0 ps-2'>Report Chat</p>
                  </li>
                  <li className=' chatdroplabel flexBox'>
                    <img src={Images.ChatModal} className=' img-fluid reporticon_' alt='clearchatimg' />
                    <p className='reportchattxt_ m-0 ps-2'>Clear Chat</p>
                  </li>

                </ul>
              </div>
            </div>
          </>
          :
          ''
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  )
}

export default UserClearChat
import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import { getUserProfileDetails } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";

const UserMyProfile = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState([]);

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };

    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setProfile(res.data.data);
            setProfilePhoto(res.data.data.userInfo.profilePhoto);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="userprofilesection profilesection">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              {/* left section  */}
              <div className="profileleft">
                <img
                  src={profilePhoto ? profilePhoto :  Images.dummyProfile}
                  alt="chefSideProfile"
                  className="chefprofileimg"
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              {/* right section  */}
              <Link
                to="/user-editprofile"
                className="d-flex justify-content-end myprofileLink"
              >
                <img
                  src={Images.edit}
                  alt="editimage"
                  className="img-fluid"
                />
                <p className="editheading">Edit profile</p>
              </Link>
              <div className="profileright">
                {/* chefdata  */}
                <div className="profileinfosection">
                  <div className="nameprofile">
                    <div className="firstname">
                      <h4 className="dummyText p-0">First Name</h4>
                      <h2 className="nameheading">
                        {profile?.userInfo?.firstName}
                      </h2>
                    </div>
                    <div className="lastname">
                      <h4 className="dummyText p-0">Last Name</h4>
                      <h2 className="nameheading">
                        {profile?.userInfo?.lastName}
                      </h2>
                    </div>
                  </div>
                  <div className="emailheading">
                    <h4 className="dummyText p-0">Email</h4>
                    <h2 className="nameheading">{profile?.email}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default UserMyProfile;

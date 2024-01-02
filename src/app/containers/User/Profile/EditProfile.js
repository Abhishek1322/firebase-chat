import React, { useState, useEffect, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import { useNavigate } from "react-router-dom";
import { getUserProfileDetails } from "../../../../redux/slices/web";
import { updateProfileImage } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { chefProfileDocument } from "../../../../redux/slices/auth";

const UserEditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [userProfile, setUserProfile] = useState("");

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
            setFirstName(res.data.data.userInfo.firstName);
            setLastName(res.data.data.userInfo.lastName);
            setProfileUrl(res.data.data.userInfo.profilePhoto);
          }
        },
      })
    );
  }, []);

  // update User profile
  const handleUpdateProfile = () => {
    let params = {
      step: "1",
      firstName: firstName,
      lastName: lastName,
    };

    if (profileUrl) {
      params = {
        ...params,
        profilePhoto: profileUrl,
      };
    }

    dispatch(
      updateProfileImage({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/user-myprofile");
          }
        },
      })
    );
  };

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (
        rejectedFiles.length > 0 &&
        rejectedFiles[0]?.file?.type !== "image/jpeg" &&
        "image/jpg" &&
        "image/png" &&
        "image/svg"
      ) {
        toast.error("Please upload valid image");
        return;
      }
      setUserProfile(acceptedFiles[0]);
    },
    [userProfile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/svg": [],
    },
    multiple: false,
  });

  // getting profile image path
  useEffect(() => {
    if (userProfile) {
      let params = {
        file: userProfile,
      };
      dispatch(
        chefProfileDocument({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setProfileUrl(res.data.data.fileUrl);
            }
          },
        })
      );
    }
  }, [userProfile]);

  return (
    <>
      <div className="userEditprofileSection usereditsection">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12">
            <div className="editleft">
              <img
                src={profileUrl ? profileUrl : Images.dummyProfile}
                alt="chefProfileimg"
                className="chefprofileimg "
              />
              <div className="editprofileimg">
                <div className="postAd_upload_icon">
                  <div className="inputfile-box active">
                    <div {...getRootProps()} className="file-button text-end">
                      <input {...getInputProps()} />
                      <img
                        src={Images.editProfile}
                        alt="editprofileimg"
                        className="img-fluid uploadEditImg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="editright">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-container mt-5">
                      <input
                        type="text"
                        className="border-input"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="border-label">First Name</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-container mt-5">
                      <input
                        type="text"
                        value={lastName}
                        className="border-input"
                        placeholder="Enter your last name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <label className="border-label">Last Name</label>
                    </div>
                  </div>
                </div>
                <div className="buttonBox mt-5">
                  <button
                    onClick={handleUpdateProfile}
                    type="button"
                    className="smallBtn"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditProfile;

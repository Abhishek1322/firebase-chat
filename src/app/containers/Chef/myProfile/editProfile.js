import React, { useState, useEffect, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import {
  getChefProfileDetails,
  updateProfileImage,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { chefProfileDocument } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [chefType, setChefType] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [chefProfile, setChefProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");

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
      setChefProfile(acceptedFiles[0]);
    },
    [chefProfile]
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

  // get all profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          setFirstName(res?.data?.data?.userInfo.firstName);
          setRatePerHour(res?.data?.data?.chefInfo?.ratePerHour);
          setLastName(res?.data?.data?.userInfo.lastName);
          setEmail(res?.data?.data?.email);
          setPhoneNumber(res?.data?.data?.phoneNo);
          setChefType(res?.data?.data?.chefInfo.type);
          setAddress(res?.data?.data?.chefInfo.address);
          setExperience(res?.data?.data?.chefInfo?.experience);
          setBio(res?.data?.data?.chefInfo?.bio);
          setLatitude(res?.data?.data?.chefInfo?.coordinates[0]);
          setLongitude(res?.data?.data?.chefInfo?.coordinates[1]);
          setProfileUrl(res?.data?.data?.userInfo?.profilePhoto);
        },
      })
    );
  }, []);

  // handle change address
  const autoCompleteHandleChange = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // select address
  const autoCompleteHandleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  const typeOfChef = [{ type: "restaurant" }, { type: "home" }];

  // update chef type
  const handleUpdateChefType = (e, type) => {
    setChefType(type);
  };

  // stop loader on page reload
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // updateChef profile
  const handleUpdateProfile = () => {
    let params = {
      step: "1",
      firstName: firstName,
      lastName: lastName,
      type: chefType,
      experience: experience,
      address: address,
      coordinates: [latitude, longitude],
      bio: bio,
      ratePerHour: ratePerHour,
      phoneNo: phoneNumber,
      dialCode: "+91",
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
            navigate("/chef-profile");
          }
        },
      })
    );
  };

  // getting profile image path
  useEffect(() => {
    if (chefProfile) {
      let params = {
        file: chefProfile,
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
  }, [chefProfile]);

  return (
    <>
      <section className="editsection profilesectionChef">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="editleft">
                <img
                  src={profileUrl ? profileUrl : Images.dummyProfile}
                  alt="chefProfileimg"
                  className="chefprofileimg"
                />
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img
                    src={Images.editProfile}
                    alt="editprofileimg"
                    className="editprofileimg"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="editright">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={firstName}
                          className="border-input"
                          placeholder="enter your first name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="border-label">First Name</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={lastName}
                          className="border-input"
                          placeholder="enter your last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <label className="border-label">Last Name</label>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          className="border-input"
                          placeholder="Rate per hour"
                          value={ratePerHour}
                          onChange={(e) => setRatePerHour(e.target.value)}
                        />
                        <label className="border-label">Rate Per Hour</label>
                        <img
                          src={Images.ratePerHourImg}
                          alt="InfoIcon"
                          className="InputIcon"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="number"
                          name="rateperhour"
                          className="border-input"
                          placeholder="enter your phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label className="border-label">Phone</label>
                        <img
                          src={Images.ratePerHourImg}
                          alt="InfoIcon"
                          className="InputIcon"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={email}
                          className="border-input"
                          placeholder="enter your email address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="border-label">Email</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <div className="border-box">
                          {typeOfChef.map((item, index) => (
                            <div
                              onClick={(e) =>
                                handleUpdateChefType(e, item.type)
                              }
                              key={index}
                              className={
                                chefType === item.type
                                  ? "chefType active text-capitalize"
                                  : "chefType text-capitalize"
                              }
                            >
                              {item.type}
                              <img
                                src={Images.chefType}
                                alt="InfoIcon"
                                className="InfoIcon"
                                id="Restaurant"
                              />
                              <img
                                src={Images.chefTypeActive}
                                alt="InfoIcon"
                                className="InfoIconActive img-fluid d-none"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="border-label">Chef Type</div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="number"
                          value={experience}
                          className="border-input"
                          placeholder="enter your experience"
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <label className="border-label">
                          Experience (in years)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <PlacesAutocomplete
                          className=""
                          autoComplete="off"
                          value={address}
                          onChange={autoCompleteHandleChange}
                          onSelect={autoCompleteHandleSelect}
                          searchOptions={{
                          
                          }}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Street Address",
                                  className:
                                    "location-search-input customform-control border-input",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, index) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#41b6e6",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                      key={index}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        <label className="border-label">Address</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <textarea
                          value={bio}
                          className="border-input"
                          rows="3"
                          onChange={(e) => setBio(e.target.value)}
                        />
                        <label className="border-label">Bio</label>
                      </div>
                    </div>
                  </div>
                  <div className="buttonBox mt-5">
                    <button
                      onClick={handleUpdateProfile}
                      role="button"
                      className="smallBtn"
                    >
                      {" "}
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;

import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import {
  addAddress,
  getLocationInfo,
  onErrorStopLoad,
} from "../../../../redux/slices/user";
import CustomModal from "./CustomModal";
import PayNowModal from "./PayNowModal";
import { useDispatch } from "react-redux";
import { useUserSelector } from "../../../../redux/selector/user";
import { toast } from "react-toastify";

const AddAddressModal = (props) => {
  const { handleGetUserAddress, close } = props;
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const userData = useUserSelector();
  const [key, setKey] = useState(Math.random());
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressType, setAddressType] = useState("home");
  const [building, setBuilding] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState("");
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
  // open modal
  const handleUserProfile = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // handle change city
  const autoCompleteHandleChange = (city) => {
    setCity(city);
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // select city
  const autoCompleteHandleSelect = (city) => {
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
        if (results.length > 0) {
          // Extract the state from the results
          setCity(results[0].formatted_address);
          const addressComponents = results[0].address_components;
          const stateComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );
          // If stateComponent exists, set the state value
          if (stateComponent) {
            const stateName = stateComponent.long_name;
            setState(stateName);
          }
          // Extract the ZIP code from the results
          const zipCodeComponent = addressComponents.find((component) =>
            component.types.includes("postal_code")
          );
          if (zipCodeComponent) {
            const zipCode = zipCodeComponent.long_name;
            setZipCode(zipCode);
          }
          // Extract the local street address (route) or locality
          const routeComponent = addressComponents.find((component) =>
            component.types.includes("route")
          );
          const localityComponent = addressComponents.find((component) =>
            component.types.includes("locality")
          );
          if (routeComponent) {
            const localStreet = routeComponent.long_name;
            setStreetAddress(localStreet);
          } else if (localityComponent) {
            const localStreet = localityComponent.long_name;
            setStreetAddress(localStreet);
          }
        }
      })
      .catch((error) => {});
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit addresss
  const handleSubmitAddess = (save) => {
    setIsLoading(save);
    if (!city) {
      showToast("Please enter your city name");
      return;
    } else if (!state) {
      showToast("Please enter your state name");
      return;
    } else if (!zipCode) {
      showToast("Please enter your zip code");
      return;
    } else if (!streetAddress) {
      showToast("Please enter your street address");
      return;
    } else if (!building) {
      showToast("Please enter your building number");
      return;
    }
    let params = {
      type: addressType,
      city: city,
      state: state,
      zipCode: zipCode,
      streetAddress: streetAddress,
      plotNumber: building,
      coordinates: [latitude, longitude],
    };
    dispatch(
      addAddress({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetUserAddress();
            close();
          }
        },
      })
    );
  };

  // get let long
  function success(pos) {
    var crd = pos.coords;
    handleGetLocationInfo(crd.latitude, crd.longitude);
  }

  // getLocationInfo
  const handleGetLocationInfo = (lat, lng) => {
    let params = {
      lat: lat,
      lng: lng,
    };
    dispatch(
      getLocationInfo({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setCity(res?.data?.display_name);
            setState(res?.data?.address?.state);
            setZipCode(res?.data?.address?.postcode);
            setStreetAddress(res?.data?.address?.village);
          }
        },
      })
    );
  };

  // get current location
  const handleGetCurrentLocation = (curr) => {
    setIsLoading(curr);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
      setCity("");
      setState("");
      setZipCode("");
      setStreetAddress("");
      setBuilding("");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  // handling error
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  // location options
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  return (
    <>
      <div className="editadressection tabsection">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("home")}
              className={
                addressType === "home" ? "nav-link active" : "nav-link"
              }
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("office")}
              className={
                addressType === "office" ? "nav-link active" : "nav-link"
              }
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#office"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Office
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("other")}
              className={
                addressType === "other" ? "nav-link active" : "nav-link"
              }
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#other"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Other
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div role="tabpanel" aria-labelledby="home-tab">
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <button
                  disabled={userData?.loading && isLoading === "save"}
                  onClick={() => handleGetCurrentLocation("current")}
                  className="modalclearAll"
                >
                  {userData?.loading && isLoading === "current" && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  User Current Location
                </button>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <PlacesAutocomplete
                      className=""
                      autoComplete="off"
                      value={city}
                      onChange={autoCompleteHandleChange}
                      onSelect={autoCompleteHandleSelect}
                      searchOptions={{}}
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
                              placeholder: "City",
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

                    <label className="border-label">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="State"
                      className="border-input"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <label className="border-label">State</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="number"
                      name="Zip Code"
                      className="border-input"
                      placeholder="Zip code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                    <label className="border-label">Zip Code</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="street"
                      className="border-input"
                      placeholder="Enter Address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <label className="border-label">Street Address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Plot / Building Number"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                    />
                    <label className="border-label">
                      Plot / Building Number
                    </label>
                  </div>
                </div>
              </div>
              <div className="modalfooterbtn">
                <div className="addfoodbtn">
                  <button
                    disabled={userData?.loading && isLoading === "save"}
                    onClick={() => handleSubmitAddess("save")}
                    className="foodmodalbtn"
                  >
                    {userData?.loading && isLoading === "save" && (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    )}
                    Save
                  </button>
                </div>
              </div>
            </div>
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
        className={
          modalDetail.flag === "paynow" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "paynow" ? "paynowmodal" : ""}
        child={
          modalDetail.flag === "paynow" ? (
            <PayNowModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "paynow" ? (
            <>
              <div className="editadressheading">
                <img
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Pay Now</h2>
                  <p className="chatUser">Debit/Credit cards acceptable</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default AddAddressModal;

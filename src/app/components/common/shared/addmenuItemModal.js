import React, { useEffect, useState, useCallback, useRef } from "react";
import * as Images from "../../../../utilities/images";
import {
  createMenu,
  createImageUrl,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddmenuItemModal = (props) => {
  const { close, menuListAll } = props;
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [category, setCategory] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    deliveryTime: "",
    description: "",
  });

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad);
  }, [dispatch]);

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // create new menu
  const handleCreateMenu = () => {
    if (!formData.itemName) {
      showToast("Please add item name");
      return;
    } else if (!category) {
      showToast("Please select category");
      return;
    } else if (!formData.price) {
      showToast("Please add item price");
      return;
    } else if (!formData.deliveryTime) {
      showToast("Please add item delivery time");
      return;
    } else if (!formData.description) {
      showToast("Please add item description");
      return;
    } else if (!imageUrl) {
      showToast("Please add item image");
      return;
    }

    let params = {
      name: formData.itemName,
      category: category,
      price: formData.price,
      deliveryTime: formData.deliveryTime,
      description: formData.description,
      image: imageUrl,
    };
    dispatch(
      createMenu({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            menuListAll();
          }
        },
      })
    );
  };

  // getting item image
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (
        rejectedFiles.length > 0 &&
        rejectedFiles[0]?.file?.type !== "image/jpeg" &&
        "image/jpg" &&
        "image/png" &&
        "image/svg"
      ) {
        showToast("Please upload valid image");
        return;
      }
      setItemImage(acceptedFiles[0]);
    },
    [itemImage]
  );

  // accepted types
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

  // get image url
  useEffect(() => {
    if (itemImage) {
      let params = {
        file: itemImage,
      };
      dispatch(
        createImageUrl({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setImageUrl(res.data.data.photo);
            }
          },
        })
      );
    }
  }, [itemImage]);

  // remove upload image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImageUrl("");
    }
  };

  return (
    <>
      <div className="modalscroll">
        <div className="addmenuItemModal">
          <div className="input-container mt-5">
            <input
              type="text"
              className="menuReport_button inputPlaceholder"
              placeholder="e.g. Chicken Salad"
              name="itemName"
              onChange={(e) => handleChange(e)}
            />
            <img
              src={Images.categoryImg}
              className="cateofyImg_"
              alt="categoryImg"
              _
            />
            <label className="border-label">Item Name</label>
          </div>
          <div className="input-container mt-4">
            <Select
              className={
                category
                  ? "menuReport_button"
                  : "menuReport_button inputPlaceholderColor"
              }
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>Select Category</MenuItem>
              <MenuItem value={"veg"}>Veg</MenuItem>
              <MenuItem value={"non-veg"}>Non Veg</MenuItem>
            </Select>

            <img
              src={Images.menuDishImg}
              className="cateofyImg_"
              alt="menuDishImg"
              _
            />
            <label className="border-label">Category</label>
          </div>
          <div className="flexBox justify-content-between editMenuFields_ ">
            <div className="input-container mt-5">
              <input
                type="number"
                name="price"
                onChange={(e) => handleChange(e)}
                className="menuEditbuttom inputPlaceholder"
                placeholder="e.g. 22.00 "
              />
              <img
                src={Images.euroImg}
                className="cateofyImg_ euroImgText"
                alt="euroImg"
              />
              <label className="border-label">Price</label>
            </div>
            <div className="input-container mt-5 pe-3 flexBox">
              <input
                type="number"
                className="menuEditbuttom inputPlaceholder"
                name="deliveryTime"
                onChange={(e) => handleChange(e)}
                placeholder="e.g. 45"
              />
              <p className="inneredittxt">MIN</p>
              <img
                src={Images.clockImg}
                className="cateofyImg_"
                alt="clockimg"
              />
              <label className="border-label">Delivery Time</label>
            </div>
          </div>
        </div>
        <div className="input-container mt-4">
          <textarea
            type="text"
            name="description"
            onChange={(e) => handleChange(e)}
            className=" menuReport_button  menuDescrition_ inputPlaceholder"
            placeholder="Type here..."
          />
          <label className="border-label">Description</label>
        </div>
        <div className="editImgBox_">
          <p className="chefName mt-4 pb-3">Upload Image </p>
          {imageUrl ? (
            <>
              <img src={imageUrl} className="editFoodImg" alt="editFood" />
              <span className="cancelEditImg">
                <i
                  onClick={() => handleRemoveImage(imageUrl)}
                  className="fas fa-times cancelEdit"
                ></i>
              </span>
            </>
          ) : (
            <div className="uploadImgebox choosetoUpload">
              <div className="postAd_upload_icon">
                <div {...getRootProps()} className="inputfile-box active">
                  <input {...getInputProps()} />
                  <label for="file">
                    <span id="file-name" className="file-box d-none">
                      No File Chosen
                    </span>
                    <div className="file-button text-end">
                      <img
                        src={Images.Uploadicon}
                        alt="Uploadicon"
                        className="Uploadicon uploadIconImg"
                      />
                      <p className="uploadbtnn">Choose Image</p>
                      <p className="smallHeading_">Upload Image Here</p>
                      <p className="uploadText mt-1">5 mb max file size</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        disabled={
          !formData.itemName ||
          !formData.price ||
          !formData.deliveryTime ||
          !formData.description ||
          !imageUrl ||
          !category
        }
        className={
          !formData.itemName ||
          !formData.price ||
          !formData.deliveryTime ||
          !formData.description ||
          !imageUrl ||
          !category
            ? "foodmodalbtn  modalfooterbtn disbale-btn"
            : "foodmodalbtn  modalfooterbtn"
        }
        // className="foodmodalbtn  modalfooterbtn"
        onClick={() => {
          handleCreateMenu();
        }}
      >
        Add
      </button>
    </>
  );
};

export default AddmenuItemModal;

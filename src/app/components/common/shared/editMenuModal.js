import React, { useEffect, useState, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  editMenuItem,
  singleMenu,
  onErrorStopLoad,
  createImageUrl,
} from "../../../../redux/slices/web";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const EditMenuModal = (props) => {
  const { menuId, close, menuListAll } = props;

  const dispatch = useDispatch();
  const [category, setCategory] = useState("veg");
  const [itemImage, setItemImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    deliveryTime: "",
    description: "",
  });

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get single menu item
  useEffect(() => {
    let params = {
      id: menuId,
    };
    dispatch(
      singleMenu({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFormData({
              itemName: res?.data?.data?.item?.name,
              price: res?.data?.data?.item?.price,
              deliveryTime: res?.data?.data?.item?.deliveryTime,
              description: res?.data?.data?.item?.description,
            });
            setCategory(res?.data?.data?.item?.category);
            setImageUrl(res?.data?.data?.item?.image);
          }
        },
      })
    );
  }, []);

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
        toast.error("Please upload valid image");
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

  // remove upload image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImageUrl("");
    }
  };

  // update menu items
  const handleUpdateMenu = () => {
    let params = {
      id: menuId,
      name: formData.itemName,
      category: category,
      price: formData.price,
      deliveryTime: formData.deliveryTime,
      description: formData.description,
      image: imageUrl,
    };
    dispatch(
      editMenuItem({
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

  return (
    <>
      <div className="editMenuModal">
        <div className="menuModal_">
          <div className="input-container mt-5">
            <input
              type="text"
              className=" menuReport_button"
              placeholder="e.g. Chicken Salad"
              name="itemName"
              value={formData.itemName}
              onChange={(e) => handleChange(e)}
            />
            <img
              src={Images.categoryImg}
              className="cateofyImg_"
              alt="categoryImg"
            />
            <label className="border-label">Item Name</label>
          </div>
          <div className="input-container mt-4">
            <Select
              className="menuReport_button"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"veg"}>Veg</MenuItem>
              <MenuItem value={"non-veg"}>Non Veg</MenuItem>
            </Select>
            <img
              src={Images.menuDishImg}
              className="cateofyImg_"
              alt="menudishImg"
            />
            <label className="border-label">Category</label>
          </div>
          <div className="flexBox justify-content-between editMenuFields_ ">
            <div className="input-container mt-5">
              <input
                type="number"
                name="price"
                onChange={(e) => handleChange(e)}
                className="menuEditbuttom"
                placeholder="e.g. 22.00"
                value={formData.price}
              />
              <img src={Images.euroImg} className="cateofyImg_" alt="euroImg" />
              <label className="border-label">Price</label>
            </div>
            <div className="input-container mt-5 pe-3 flexBox">
              <input
                type="number"
                className="menuEditbuttom"
                name="deliveryTime"
                onChange={(e) => handleChange(e)}
                placeholder="e.g. 45"
                value={formData.deliveryTime}
              />
              <p className="inneredittxt">MIN</p>
              <img
                src={Images.clockImg}
                className="cateofyImg_"
                alt="clockImg"
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
            className=" menuReport_button  menuDescrition_  "
            placeholder="Type here..."
            value={formData.description}
          />
          <label className="border-label">Description</label>
        </div>
        <div className="editImgBox_">
          <p className="chefName mt-4 pb-3">Upload Image </p>
          {imageUrl ? (
            <>
              <img src={imageUrl} className="editFoodImg" alt="editFoodImg" />
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
        <button
          onClick={handleUpdateMenu}
          className="foodmodalbtn  modalfooterbtn"
        >
          Save Changes
        </button>
      </div>
    </>
  );
};

export default EditMenuModal;

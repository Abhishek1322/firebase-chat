import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "../../../components/common/shared/CustomModal";
import EditMenuModal from "../../../components/common/shared/editMenuModal";
import DeleteMenuModal from "../../../components/common/shared/DeleteMenuModal";
import AddmenuItemModal from "../../../components/common/shared/addmenuItemModal";
import FoodDetailModal from "../../../components/common/shared/foodDetailModal";
import { getMenusLists, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

const Menu = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [menuList, setMenuList] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [searchMenu, setSearchMenu] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  const handleUserProfile = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setMenuId(id);
  };

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get all menu lists
  useEffect(() => {
    menuListAll();
  }, [searchMenu]);

  // get all menu lists
  const menuListAll = (page = currentPage) => {
    let params = {
      limit: 14,
      page: page,
      search: searchMenu,
    };

    dispatch(
      getMenusLists({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setMenuList(res.data.data.data);
            setPageCount(res.data.data.total_pages);
          }
        },
      })
    );
  };

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    menuListAll(selected + 1);
  };

  return (
    <>
      <div className="mainchef_">
        <div className="menuPage">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="innerhomeheader">
                  <h2 className="headerinnerheading">
                    List of Your Menu Items
                  </h2>
                  <div className="d-flex align-items-center">
                    <div className="searchbar me-4">
                      <input
                        onChange={(e) => setSearchMenu(e.target.value)}
                        placeholder="Search menu items..."
                        type="text"
                        className="searchtext"
                      />
                      <img
                        src={Images.searchbar}
                        className="searchbarImg"
                        alt="searchbar"
                      />
                    </div>
                    <div
                      className="menuItems "
                      onClick={() => {
                        handleUserProfile("addMenuItemModal");
                      }}
                    >
                      <i className="fas fa-plus plusmenuImg"></i>
                      <h3 className="innermenuItem">Add Menu Item</h3>
                    </div>
                  </div>
                </div>
                <div className="profileDetail">
                  {menuList && menuList.length > 0 ? (
                    <>
                      {menuList.map((item, index) => (
                        <div key={index} className="listItems_">
                          <div className="menu_Items">
                            <div className="innerItems_">
                              <img
                                src={Images.ItemsBgMenu}
                                alt="logo"
                                className="bgmenuImg_"
                              />
                              <img
                                onClick={() => {
                                  handleUserProfile("foodDetail", item._id);
                                }}
                                src={item.image}
                                alt="logo"
                                className="menuItem_"
                              />

                              <div className="Dotsheader_">
                                <div className="dropdown ">
                                  <button
                                    className="btn btn-secondary dropdown-toggle modalheaderDot_"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="fas fa-ellipsis-v menuBtnIcon"></i>
                                  </button>
                                  <ul
                                    className="dropdown-menu menuItems_"
                                    aria-labelledby="dropdownMenuButton1 "
                                  >
                                    <div className=" menuChat">
                                      <div
                                        className="flexBox pb-3 "
                                        onClick={() => {
                                          handleUserProfile(
                                            "editMenuModal",
                                            item._id
                                          );
                                        }}
                                      >
                                        <img
                                          src={Images.EditImg}
                                          className=" img-fluid reporticon_"
                                          alt="reportImg"
                                        />
                                        <p className="ps-2">Edit</p>
                                      </div>
                                      <div
                                        className="flexBox"
                                        onClick={() => {
                                          handleUserProfile(
                                            "deleteMenuModal",
                                            item._id
                                          );
                                        }}
                                      >
                                        <img
                                          src={Images.cartDelete}
                                          className=" img-fluid reporticon_"
                                          alt="cartDelete"
                                        />
                                        <p className="reportchattxt_ m-0 ps-2">
                                          Delete
                                        </p>
                                      </div>
                                    </div>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="itemIs_">{item.name}</p>
                          <p className="category_">{item.category}</p>
                          <button className="itemsPrice_">
                            £{item.price}.00
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No data found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {menuList && menuList.length > 0 && (
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination menuPagination"}
            activeClassName={"active"}
          />
        )}
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "editMenuModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "editMenuModal"
            ? "editMenu"
            : "deleteMenuModal"
            ? "deleteMenu"
            : "addMenuItemModal"
            ? "addMenuItem"
            : ""
        }
        child={
          modalDetail.flag === "editMenuModal" ? (
            <EditMenuModal
              menuId={menuId}
              menuListAll={menuListAll}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "deleteMenuModal" ? (
            <DeleteMenuModal
              menuId={menuId}
              menuListAll={menuListAll}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "addMenuItemModal" ? (
            <AddmenuItemModal
              menuListAll={menuListAll}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "foodDetail" ? (
            <FoodDetailModal
              menuId={menuId}
              menuListAll={menuListAll}
              handleOpenInnerModal={(flag, id) => handleUserProfile(flag, id)}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "editMenuModal" ? (
            <>
              <div className="editadressheading">
                <div className="edithead">
                  <p className="modal_Heading">Edit Item</p>
                  <p className="chatUser">Edit your menu items below.</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancel"
                />
              </p>
            </>
          ) : modalDetail.flag === "addMenuItemModal" ? (
            <>
              <div className="editadressheading">
                <div className="edithead">
                  <p className="modal_Heading">Add Menu Item</p>
                  <p className="chatUser">Add your menu items below.</p>
                </div>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancel"
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

export default Menu;

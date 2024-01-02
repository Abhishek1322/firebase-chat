import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import { GEO_CODING_API_KEY } from "../../../config/config";
import {
  setAddAddress,
  setGetUserAddress,
  onErrorStopLoad,
  setEditUserAddress,
  setSingleAddress,
  setDeleteAddress,
  setAddContactUsDetail,
  setGetHelperPages,
  setAddToCart,
  setGetAllCart,
  setDeleteCartItem,
  setCreateOrder,
  setCancelOrder,
  setGetAllOrder,
  setGetSingleOrder,
  setUpdateCartItem,
  setGiveRating,
  setGetRating,
  setReportChat,
  setHireChef,
  setCancelChefBooking,
  setGetNotification,
  setReadNotification,
  setClearNotification,
  setMenuRating,
  setGetMenuRating,
  setGetLocationInfo,
} from "../../slices/user";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getLocationInfo(action) {
  try {
    const resp = yield call(
      ApiClient.getLocation,
      (action.url = `${ApiPath.userApiPath.GET_LOCATION_INFO_FREE}?format=json&lat=${action.payload.lat}&lon=${action.payload.lng}`),
      // (action.url = `${ApiPath.userApiPath.GET_LOCATION_INFO}?q=${action.payload.lat},${action.payload.lng}&key=${GEO_CODING_API_KEY}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetLocationInfo(resp));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getMenuRating(action) {
  let targetUrl = `${ApiPath.userApiPath.GET_MENU_RATING}?menuId=${action.payload.menuId}&`;
  if (action.payload.rating) {
    targetUrl += `rating=${action.payload.rating}`;
  }
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = targetUrl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetMenuRating(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* menuRating(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = `${ApiPath.userApiPath.MENU_RATING}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setMenuRating(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* clearNotification(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.userApiPath.CLEAR_ALL_NOTIFICATION}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setClearNotification(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* readNotification(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.userApiPath.READ_NOTIFICATION}/?id=${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setReadNotification(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* getNotification(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.GET_ALL_NOTIFICATION}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetNotification(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* cancelChefBooking(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.patch,
      (action.url = `${ApiPath.userApiPath.CANCEL_BOOKING}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setCancelChefBooking(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* hireChef(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = `${ApiPath.userApiPath.HIRE_CHEF}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setHireChef(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* reportChat(action) {
  let deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = `${ApiPath.userApiPath.REPORT_CHAT}?reportedUser=${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setReportChat(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* getRating(action) {
  console.log("actionaction", action);
  let targetUrl = `${ApiPath.userApiPath.GET_RATING}?chefId=${action.payload.chefId}&`;
  if (action.payload.rating) {
    targetUrl += `rating=${action.payload.rating}`;
  }
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = targetUrl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetRating(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* giveRating(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.ADD_RATING),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGiveRating(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* updateCartItem(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = ApiPath.userApiPath.UPDATE_CART_ITEM),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setUpdateCartItem(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* getSingleOrder(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.GET_SINGLE_ORDER}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetSingleOrder(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getAllOrder(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.GET_ALL_ORDER}?limit=${action.payload.limit}&page=${action.payload.page}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetAllOrder(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* cancelOrder(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;

  try {
    const resp = yield call(
      ApiClient.patch,
      (action.url = `${ApiPath.userApiPath.CANCEL_ORDER}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setCancelOrder(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* createOrder(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.MENU_ORDER),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setCreateOrder(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    console.log("erorrorro", e);
    yield put(onErrorStopLoad());
    toast.dismiss();
    // toast.error(e.response.data.message);
  }
}

function* deleteCartItem(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.userApiPath.REMOVE_CART}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setDeleteCartItem(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getAllCart(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.userApiPath.ALL_CART),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetAllCart(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* addToCart(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.ADD_CART),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddToCart(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* getHelperPages(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.HELPER_PAGES_BY_SLUG}/${action.payload.slug}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetHelperPages(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* addContactUsDetail(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.CONTACT_US),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddContactUsDetail(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* deleteAddress(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.userApiPath.GET_SINGLE_ADDRESS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setDeleteAddress(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* singleAddress(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.userApiPath.GET_SINGLE_ADDRESS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setSingleAddress(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* editUserAddress(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.userApiPath.EDIT_ADDRESS}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setEditUserAddress(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getUserAddress(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.userApiPath.GET_ADDRESS),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetUserAddress(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* addAddress(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.userApiPath.ADD_ADDRESS),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setAddAddress(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    if (e.response.data.data[0]) {
      toast.error(e.response.data.data[0]);
    } else {
      toast.error(e.response.data.message);
    }
  }
}

function* userSaga() {
  yield all([takeLatest("user/addAddress", addAddress)]);
  yield all([takeLatest("user/getUserAddress", getUserAddress)]);
  yield all([takeLatest("user/editUserAddress", editUserAddress)]);
  yield all([takeLatest("user/singleAddress", singleAddress)]);
  yield all([takeLatest("user/deleteAddress", deleteAddress)]);
  yield all([takeLatest("user/addContactUsDetail", addContactUsDetail)]);
  yield all([takeLatest("user/getHelperPages", getHelperPages)]);
  yield all([takeLatest("user/addToCart", addToCart)]);
  yield all([takeLatest("user/getAllCart", getAllCart)]);
  yield all([takeLatest("user/deleteCartItem", deleteCartItem)]);
  yield all([takeLatest("user/createOrder", createOrder)]);
  yield all([takeLatest("user/cancelOrder", cancelOrder)]);
  yield all([takeLatest("user/getAllOrder", getAllOrder)]);
  yield all([takeLatest("user/getSingleOrder", getSingleOrder)]);
  yield all([takeLatest("user/updateCartItem", updateCartItem)]);
  yield all([takeLatest("user/giveRating", giveRating)]);
  yield all([takeLatest("user/getRating", getRating)]);
  yield all([takeLatest("user/reportChat", reportChat)]);
  yield all([takeLatest("user/hireChef", hireChef)]);
  yield all([takeLatest("user/cancelChefBooking", cancelChefBooking)]);
  yield all([takeLatest("user/getNotification", getNotification)]);
  yield all([takeLatest("user/readNotification", readNotification)]);
  yield all([takeLatest("user/clearNotification", clearNotification)]);
  yield all([takeLatest("user/menuRating", menuRating)]);
  yield all([takeLatest("user/getMenuRating", getMenuRating)]);
  yield all([takeLatest("user/getLocationInfo", getLocationInfo)]);
}
export default userSaga;

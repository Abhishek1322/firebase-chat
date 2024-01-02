import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setChefProfileDetails,
  setUpdateChefProfile,
  onErrorStopLoad,
  setUpdateProfileImage,
  setUserProfileDetails,
  setChefLists,
  setGetMenusLists,
  setCreateMenu,
  setCreateImageUrl,
  seteditMenuItem,
  setSingleMenu,
  setDeleteMenuItem,
  setGetSingleChef,
} from "../../slices/web";

function* getSingleChef(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.webApiPath.SINGLE_CHEF_DETAIL}?chefId=${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setGetSingleChef(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* deleteMenuItem(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.webApiPath.MENUS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setDeleteMenuItem(resp.data));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* singleMenu(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.webApiPath.MENUS}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setSingleMenu(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* editMenuItem(action) {
  const paramToSend = { ...action.payload };
  delete paramToSend.id;

  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.webApiPath.EDIT_MENU_ITEM}/${action.payload.id}`),
      (action.payload = paramToSend)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(seteditMenuItem(action.payload));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.data[0]);
  }
}

function* createImageUrl(action) {
  try {
    const resp = yield call(
      ApiClient.postFormData,
      (action.url = ApiPath.webApiPath.GET_FILES_URL),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setCreateImageUrl(resp.data.data));
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

function* createMenu(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.webApiPath.MENUS),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setCreateMenu(resp.data.data));
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

function* getMenusLists(action) {
  let targetUrl = `${ApiPath.webApiPath.MENUS}?page=${action.payload.page}&limit=${action.payload.limit}&`;
  if (action.payload.search) {
    targetUrl += `search=${action.payload.search}`;
  }

  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = targetUrl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setGetMenusLists(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* chefLists(action) {
  let targetUtl = `${ApiPath.webApiPath.CHEF_LIST}?page=${action.payload.page}&limit=${action.payload.limit}&`;
  if (action.payload.address) {
    targetUtl += `address=${action.payload.address}`;
  }
  if (action.payload.rating) {
    targetUtl += `rating=${action.payload.rating}`;
  }
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = targetUtl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setChefLists(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* updateProfileImage(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.AuthApiPath.UPDATE_CHEF_PROFILE}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUpdateProfileImage(action.payload));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.data[0]);
  }
}

function* updateChefProfile(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = `${ApiPath.AuthApiPath.UPDATE_CHEF_PROFILE}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUpdateChefProfile(action.payload));
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.data[0]);
  }
}

function* getChefProfileDetails(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.AuthApiPath.CHEF_PROFILE_DETAILS}/${action.payload.userid}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setChefProfileDetails(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* getUserProfileDetails(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.AuthApiPath.CHEF_PROFILE_DETAILS}/${action.payload.userid}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      yield put(setUserProfileDetails(resp.data));
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* webSaga() {
  yield all([takeLatest("web/getChefProfileDetails", getChefProfileDetails)]);
  yield all([takeLatest("web/updateChefProfile", updateChefProfile)]);
  yield all([takeLatest("web/updateProfileImage", updateProfileImage)]);
  yield all([takeLatest("web/getUserProfileDetails", getUserProfileDetails)]);
  yield all([takeLatest("web/chefLists", chefLists)]);
  yield all([takeLatest("web/getMenusLists", getMenusLists)]);
  yield all([takeLatest("web/createMenu", createMenu)]);
  yield all([takeLatest("web/createImageUrl", createImageUrl)]);
  yield all([takeLatest("web/editMenuItem", editMenuItem)]);
  yield all([takeLatest("web/singleMenu", singleMenu)]);
  yield all([takeLatest("web/deleteMenuItem", deleteMenuItem)]);
  yield all([takeLatest("web/getSingleChef", getSingleChef)]);
}

export default webSaga;

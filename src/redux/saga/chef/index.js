import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";
import {
  setGetRecentOrder,
  setAcceptOrder,
  onErrorStopLoadChef,
  setGetSingleOrderDetail,
  setConfirmOrderOtp,
  setConfirmResendOtp,
  setGetBookingRequests,
  setGetBookingDetail,
  setAcceptBooking,
} from "../../slices/chef";

function* acceptBooking(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;

  try {
    const resp = yield call(
      ApiClient.patch,
      (action.url = `${ApiPath.chefApiPath.ACCEPT_BOOKING}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setAcceptBooking(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getBookingDetail(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.chefApiPath.GET_BOOKING_DETAIL}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetBookingDetail(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getBookingRequests(action) {
  let tartgetUrl = `${ApiPath.chefApiPath.GET_BOOKING_REQUESTS}?limit=${action.payload.limit}`;
  if (action.payload.status) {
    tartgetUrl += `&status=${action.payload.status}`;
  }
  if (action.payload.page) {
    tartgetUrl += `&page=${action.payload.page}`;
  }
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = tartgetUrl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetBookingRequests(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* confirmResendOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = `${ApiPath.chefApiPath.RESEND_OTP}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setConfirmResendOtp(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* confirmOrderOtp(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = `${ApiPath.chefApiPath.CONFIRM_ORDER_OTP}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setConfirmOrderOtp(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getSingleOrderDetail(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = `${ApiPath.chefApiPath.GET_CHEF_SINGLE_ORDER}/${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetSingleOrderDetail(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* getRecentOrder(action) {
  let tartgetUrl = `${ApiPath.chefApiPath.GET_RECENT_ORDER}`;
  if (action.payload.status) {
    tartgetUrl += `?status=${action.payload.status}`;
  }
  if (action.payload.search) {
    tartgetUrl += `&search=${action.payload.search}`;
  }
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = tartgetUrl),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setGetRecentOrder(resp.data.data));
      yield call(action.payload.cb, resp);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* acceptOrder(action) {
  const deleteParams = { ...action.payload };
  delete deleteParams.id;

  try {
    const resp = yield call(
      ApiClient.patch,
      (action.url = `${ApiPath.chefApiPath.ACCEPT_ORDER}/${action.payload.id}`),
      (action.payload = deleteParams)
    );
    if (resp.status) {
      yield put(setAcceptOrder(resp.data.data));
      yield call(action.payload.cb, resp);
      toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoadChef());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* chefSaga() {
  yield all([takeLatest("chef/getRecentOrder", getRecentOrder)]);
  yield all([takeLatest("chef/acceptOrder", acceptOrder)]);
  yield all([takeLatest("chef/getSingleOrderDetail", getSingleOrderDetail)]);
  yield all([takeLatest("chef/confirmOrderOtp", confirmOrderOtp)]);
  yield all([takeLatest("chef/confirmResendOtp", confirmResendOtp)]);
  yield all([takeLatest("chef/getBookingRequests", getBookingRequests)]);
  yield all([takeLatest("chef/getBookingDetail", getBookingDetail)]);
  yield all([takeLatest("chef/acceptBooking", acceptBooking)]);
}
export default chefSaga;

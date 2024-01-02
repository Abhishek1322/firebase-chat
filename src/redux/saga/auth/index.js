import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import {
  onErrorStopLoad,
  setUserSignup,
  setUserLogin,
  setVerifyOtp,
  setForgotPassword,
  setResetPasswordOtp,
  setResetPassword,
  setCreateNewPassword,
  setUserLogout,
  setResendVerifyOtp,
  setResendResetPasswordOtp,
  setDeleteAccount,
  setChefSetupProfile,
  setChefProfileDocument,
} from "../../slices/auth";
import ApiPath from "../../../constants/apiPath";
import { toast } from "react-toastify";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* chefProfileDocument(action) {
  try {
    const resp = yield call(
      ApiClient.postFormData,
      (action.url = ApiPath.AuthApiPath.CHEF_SETUP_PROFILE_DOCUMENT),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setChefProfileDocument(resp.data.data));
      yield call(action.payload.cb, resp);
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.dismiss();
    toast.error(e.response.data.message);
  }
}

function* chefSetupProfile(action) {
  try {
    const resp = yield call(
      ApiClient.put,
      (action.url = ApiPath.AuthApiPath.CHEF_SETUP_PROFILE),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setChefSetupProfile(resp.data.data));
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

function* deleteAccount(action) {
  try {
    const resp = yield call(
      ApiClient.delete,
      (action.url = `${ApiPath.AuthApiPath.DELETE_ACCOUNT}${action.payload.id}`),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
      localStorage.removeItem("persist:root");
      yield put(setDeleteAccount(resp.data.data));
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

function* resendResetPasswordOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESEND_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResendResetPasswordOtp(resp.data.data));
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

function* resendVerifyOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESEND_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResendVerifyOtp(resp.data.data));
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
function* createNewPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.CREATE_NEW_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setCreateNewPassword(resp.data.data));
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

function* resetPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESET_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResetPassword(resp.data.data));
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

function* resetPasswordOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESET_PASSWORD_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResetPasswordOtp(resp.data.data));
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

function* forgotPassword(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.FORGOT_PASSWORD),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setForgotPassword(resp.data.data));
      // localStorage.setItem(
      //   "userEmail",
      //   resp.data.data.email ? resp.data.data.email : ""
      // );
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

function* verifyOtp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.VERIFY_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.setItem(
        "authToken",
        resp.data && resp.data.data.token ? resp.data.data.token : ""
      );
      yield put(setVerifyOtp(resp.data.data));
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

function* userSignUp(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.USER_SIGNUP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.setItem(
        "userEmail",
        resp.data.data.email ? resp.data.data.email : ""
      );
      localStorage.setItem(
        "userId",
        resp.data.data.id ? resp.data.data.id : ""
      );

      if (resp.data.data.role === "chef") {
        localStorage.setItem("signupFlag", true);
      }

      yield put(setUserSignup(resp.data.data));
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

function* userLogin(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.LOGIN_USER),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.setItem(
        "authToken",
        resp.data.data.token ? resp.data.data.token : ""
      );
      localStorage.setItem(
        "userId",
        resp.data.data.id ? resp.data.data.id : ""
      );
      localStorage.setItem(
        "id",
        resp.data.data.id ? resp.data.data.userId : ""
      );
      yield put(setUserLogin(resp.data.data));
      yield call(action.payload.cb, (action.res = resp));
      if (resp.data.data.isActive === false) {
        toast.error(resp.data.message);
      }
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(setUserLogin({}));
    yield put(onErrorStopLoad());
    toast.error(e.response.data.message);
  }
}

function* userLogout(action) {
  try {
    const resp = yield call(
      ApiClient.get,
      (action.url = ApiPath.AuthApiPath.LOGOUT_USER),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      localStorage.removeItem("authToken");
      localStorage.removeItem("persist:root");
      toast.success(resp.data.message);
      yield put(setUserLogout());
    } else {
      throw resp;
    }
  } catch (e) {
    toast.error(e.response.data.message);
  }
}

function* authSaga() {
  yield all([
    takeLatest("auth/userSignUp", userSignUp),
    takeLatest("auth/userLogin", userLogin),
    takeLatest("auth/verifyOtp", verifyOtp),
    takeLatest("auth/forgotPassword", forgotPassword),
    takeLatest("auth/resetPasswordOtp", resetPasswordOtp),
    takeLatest("auth/resetPassword", resetPassword),
    takeLatest("auth/createNewPassword", createNewPassword),
    takeLatest("auth/userLogout", userLogout),
    takeLatest("auth/resendVerifyOtp", resendVerifyOtp),
    takeLatest("auth/resendResetPasswordOtp", resendResetPasswordOtp),
    takeLatest("auth/deleteAccount", deleteAccount),
    takeLatest("auth/chefSetupProfile", chefSetupProfile),
    takeLatest("auth/chefProfileDocument", chefProfileDocument),
  ]);
}

export default authSaga;

import axios from "axios";
import BaseUrl from "../constants/baseUrl";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: BaseUrl.API_URL,
  headers: {
    Accept: "application/json",
  },
});

const axiosInstanceLocation = axios.create({
  // baseURL: BaseUrl.GEO_CODE_API_URL,
  baseURL: BaseUrl.GET_LOCATION_API_URL,
  headers: {
    Accept: "application/json",
  },
});

//axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("authToken");
  const fcmToken = localStorage.getItem("fcmToken");
  if (fcmToken) {
    config.headers["Fcm-Token"] = fcmToken;
  }
  config.headers.Authorization = token ? token : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // handle 401 errors here
      console.log("Unauthorized access");
      localStorage.clear();
      window.location.href("/");

      toast.warning("Session expired");
    }
    return Promise.reject(error);
  }
);

const axiosGet = (url, params = {}) => {
  return axiosInstance
    .get(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosGetLocation = (url, params = {}) => {
  return axiosInstanceLocation
    .get(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPut = (url, params = {}) => {
  return axiosInstance
    .put(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPost = (url, params = {}) => {
  return axiosInstance
    .post(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPatch = (url, params = {}) => {
  return axiosInstance
    .patch(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const postDelete = (url, params = {}) => {
  return axiosInstance
    .delete(url, params)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPutFormData = (url, params) => {
  if (params.file) {
    var formData = new FormData();
    formData.append("file", params?.file);
  }

  return axiosInstance
    .put(url, formData)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPutFormDataProfile = (url, params) => {
  var formData = new FormData();
  formData.append("step", params?.step);
  formData.append("firstName", params?.firstName);
  formData.append("lastName", params?.lastName);
  formData.append("profilePhoto", params?.profilePhoto);
  formData.append("type", params?.type);
  formData.append("experience", params?.experience);
  formData.append("address", params?.address);
  formData.append("coordinates", params?.coordinates);
  formData.append("bio", params?.bio);
  return axiosInstance
    .put(url, formData)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

const axiosPostFormData = (url, params) => {
  if (params.file) {
    var formData = new FormData();
    formData.append("file", params?.file);
  } else if (params.file) {
    let files = params?.file;
    var formData = new FormData();
    files.forEach((val, index) => {
      formData.append("file", val);
    });
  } else {
    var formData = new FormData();
    formData.append("photo", params?.photo);
  }
  return axiosInstance
    .post(url, formData)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((err) => {
      throw err;
    });
};

export const ApiClient = {
  get: axiosGet,
  getLocation: axiosGetLocation,
  put: axiosPut,
  post: axiosPost,
  patch: axiosPatch,
  delete: postDelete,
  postFormData: axiosPostFormData,
  putFormData: axiosPutFormData,
  profileFormData: axiosPutFormDataProfile,
};

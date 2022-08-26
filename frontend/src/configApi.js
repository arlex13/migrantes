import axios from "axios";
import _ from "lodash";

const jsonInterceptor = [
  (response) => response.data,
  (error) => {
    const { response } = error;
    if (response.config.method == "get" && response.status == 403) {
      window.location.assign("/404");
    }
    return Promise.reject(_.get(error, "response.data", error));
  },
];

const configApi = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
  validateStatus: function (status) {
    if (status == 401) window.location.assign("/login");
    return status >= 200 && status < 300; // default
  },
});

configApi.interceptors.response.use(...jsonInterceptor);
configApi.interceptors.request.use((config) => {
  if (config.url[config.url.length - 1] !== "/") {
    config.url += "/";
  }
  return config;
});

export default configApi;

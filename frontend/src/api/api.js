import axios from "axios";
import {tokenService} from "../services/token.service";


const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8083/",
  timeout: 15000,
});
instance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = token;
    }

    config.headers["Content-Type"] = "application/json";

    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        try {
            window.location.href = "/";
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;

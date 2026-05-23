import axios from "axios";
import { API_BASE_URL } from "../config/constants";
// export const API_BASE_URL = "http://192.168.100.201:8000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   AUTO REFRESH TOKEN
========================= */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // token expired
    if (
      error.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          `${API_BASE_URL}/accounts/refresh/`,
          {
            refresh,
          }
        );

        // save new access token
        localStorage.setItem("access", response.data.access);

        // retry original request
        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        return api(originalRequest);

      } catch (refreshError) {

        // logout if refresh fails
        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
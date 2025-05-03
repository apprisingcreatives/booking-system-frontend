import axios from "axios";
import { clearTokens, getAccessToken, setAccessToken } from "./localStorage";
import { API_URL } from "../constants/api";

const authClient = axios.create({
  baseURL: API_URL,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

authClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isForbidden = error.response?.status === 403;
    const isRefreshRoute = originalRequest.url.includes("/auth/refresh");

    if (isForbidden && !originalRequest._retry && !isRefreshRoute) {
      originalRequest._retry = true;

      try {
        const { data } = await authClient.post("/auth/refresh");

        const newToken = data?.token;
        if (newToken) {
          setAccessToken({ access_token: newToken });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return authClient(originalRequest);
        }
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (isForbidden && isRefreshRoute) {
      clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default authClient;

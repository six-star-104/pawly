import axios, { InternalAxiosRequestConfig } from "axios";
import { logout } from "@/apis/userService";
import { setToken, getToken } from "@/stores/tokenStorage";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const flaskAxiosInstance = axios.create({
  baseURL: "https://k11d104.p.ssafy.io/flask",
});

// Modify the interceptor to handle async token retrieval
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const accessToken = await getToken();
      if (accessToken) {
        config.headers["Authorization"] = `${accessToken}`;
      }
      return config;
    } catch (error) {
      console.log("Error retrieving token:", error);
      return Promise.reject(error);
    }
  },
  (error) => {
    console.log("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.data?.status;
    const originalRequest = error.config;

    // Check for status A004, indicating token expiration or invalid token
    if (status === "A004" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Attempting to refresh token...");
        const newToken = await getRefreshToken();

        if (newToken) {
          // Update the header of the original request with the new token
          originalRequest.headers["Authorization"] = `${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        await logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Function to handle token refresh
export const getRefreshToken = async () => {
  try {
    const response = await axios.post(`/member/refresh-token`, {});
    console.log("Token refreshed:", response);

    if (response.data.data) {
      const accessToken = response.data.data.accessToken;

      // Save the new token in localStorage and update axios defaults
      await setToken(accessToken);
      axiosInstance.defaults.headers["Authorization"] = `${accessToken}`;

      return accessToken;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

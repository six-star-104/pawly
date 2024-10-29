import axios from "axios";
import axiosInstance from "./axiosInstance";

export const kakaoLogin = async () => {
  try {
    const response = await axios.get(`oauth/login/kakao`);
    console.log(response);
    window.location.replace(response.data.url);
  } catch (error) {
    console.error("kakao Login failed:", error);
    throw error;
  }
};

export const googleLogin = async () => {
  try {
    const response = await axios.get(`oauth/login/google`);
    console.log(response);
    window.location.replace(response.data.url);
  } catch (error) {
    console.error("kakao Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post(`member/logout`, "");
    console.log(response);
  } catch (error) {
    console.error("logout failed: ", error);
    throw error;
  }
};

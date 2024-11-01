import axios from "axios";
import axiosInstance from "./axiosInstance";
import { UserInfoType, LoginResponseType, SignUpType } from "@/types/UserType";

export const kakaoLogin = async () => {
  try {
    const response = await axios.get(`oauth/login/kakao`);
    console.log(response.data);
    window.location.replace(response.data.url);
    return response.data;
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
    console.error("Google Login failed:", error);
    throw error;
  }
};

export const getOAuthInformation = async (
  token: string
): Promise<UserInfoType> => {
  try {
    const response = await axios.get(`oauth/get-oauth-info`, {
      params: {
        token,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("getOAuthInformation failed:", error);
    throw error;
  }
};

export const getOAuthAccessToken = async (
  code: string
): Promise<LoginResponseType> => {
  try {
    const response = await axios.get(`oauth/get-user-token`, {
      params: {
        code,
      },
    });
    // console.log(response);
    const accessToken = response.data.data.accessToken;
    let userInfo: UserInfoType;
    if (accessToken) {
      userInfo = await getOAuthInformation(accessToken);
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      console.error("No access Token received from server");
      throw new Error("No access Token received from server");
    }
    return { accessToken, userInfo };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUp = async (signUpForm: SignUpType) => {
  try {
    const response = await axios.post(`member/sign-up`, {
      email: signUpForm.email,
      name: signUpForm.name,
      provider: signUpForm.provider,
      providerId: signUpForm.providerId,
      nickname: signUpForm.nickname,
      assets: signUpForm.assets,
      assetsName: signUpForm.assetsName,
    });
    console.log(response);
  } catch (error) {
    console.log("signUp failed: ", error);
    throw error;
  }
};

export const isNicknameDup = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axios.post(`member/exist-nickname`, {
      nickname,
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserInfoType> => {
  try {
    const response = await axiosInstance.get(`member/profile`);
    return response.data.data;
  } catch (error) {
    console.error("get user info failed: ", error);
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

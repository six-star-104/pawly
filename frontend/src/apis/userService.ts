import axios from "axios";
import { axiosInstance, flaskAxiosInstance } from "./axiosInstance";
import { UserInfoType, LoginResponseType, SignUpType } from "@/types/UserTypes";
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
    const response = await axios.get(`oauth/get-member-token`, {
      params: {
        code,
      },
    });
    const accessToken = response.data.data.accessToken;
    let userInfo: UserInfoType;
    if (accessToken) {
      
      userInfo = await getOAuthInformation(accessToken);
      console.log("우저정보"+userInfo)
      localStorage.setItem("accessToken", accessToken);
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
    const formData = new FormData();

    // asset 파일 추가
    if (signUpForm.asset) {
      formData.append("asset", signUpForm.asset);
    }

    // JSON 데이터를 Blob으로 추가
    const jsonBlob = new Blob(
      [
        JSON.stringify({
          email: signUpForm.email,
          name: signUpForm.name,
          provider: signUpForm.provider,
          providerId: signUpForm.providerId,
          nickname: signUpForm.nickname,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("data", jsonBlob);

    // axios 요청
    await axios.post(`member/sign-up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isNicknameDup = async (nickname: string): Promise<boolean> => {
  try {
    const response = await axios.post(`member/check/exist-nickname`, {
      nickname: nickname,
    });
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
    await axiosInstance.post(`member/logout`, "");
  } catch (error) {
    console.error("logout failed: ", error);
    throw error;
  }
};

export const makeAsset = async (word: string) => {
  try {
    const response = await flaskAxiosInstance.get("make_image", {
      params: {
        word: word,
      },
    });
    return response.data;
  } catch (error) {
    console.error("translate failed", error);
    throw error;
  }
};

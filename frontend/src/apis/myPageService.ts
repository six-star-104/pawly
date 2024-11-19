import { axiosInstance } from "./axiosInstance";

export const updateNickname = async (nickname: string) => {
  try {
    const response = await axiosInstance.patch("member/update-nickname", {
      nickname,
    });
    return response.data;
  } catch (error) {
    console.error("updateNickname 요청 실패:", error);
    throw error;
  }
};

export const getFriendInfo = async (memberId: number) => {
  try {
    const response = await axiosInstance.get(`member/${memberId}`);
    return response.data.data;
  } catch (error) {
    console.error("getFriendInfo 요청 실패:", error);
    throw error;
  }
};

export const updateBirth = async (birth: string) => {
  try {
    const response = await axiosInstance.patch("member/update-birth", {
      birth,
    });
    return response.data;
  } catch (error) {
    console.error("생일 업데이트 요청 실패:", error);
    throw error;
  }
};

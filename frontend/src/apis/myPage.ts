import axios from "axios";
import { GetMyInfoResponse, UpdateNicknameResponse } from "@/types/UserType";

export const getMyInfo = async (): Promise<GetMyInfoResponse["data"]> => {
  try {
    // sessionStorage에서 토큰을 가져옵니다.
    const token = sessionStorage.getItem("accessToken");
    console.log("토큰 확인:", token); // 디버깅용 로그

    // 토큰이 없는 경우 예외를 발생시킵니다.
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    // 전체 URL을 사용해 API 요청을 보내고, Authorization 헤더에 'Bearer '를 추가하여 토큰을 포함합니다.
    const response = await axios.get<GetMyInfoResponse>(
      "https://k11d104.p.ssafy.io/api/member/profile", // 전체 URL 입력
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`, // 'Bearer '를 중복되지 않게 설정
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      console.log("프로필 조회 성공:", response.data.data);
      return response.data.data;
    } else {
      console.error("프로필 조회 실패:", response.data.message);
      throw new Error(response.data.message || "프로필 조회에 실패했습니다.");
    }
  } catch (error) {
    console.error("getMyInfo 요청 실패:", error);
    throw error;
  }
};

// 닉네임 업데이트 함수
export const updateNickname = async (nickname: string): Promise<UpdateNicknameResponse> => {
  try {
    // sessionStorage에서 토큰을 가져옵니다.
    const token = sessionStorage.getItem("accessToken");
    console.log("토큰 확인:", token); // 디버깅용 로그

    // 토큰이 없는 경우 예외를 발생시킵니다.
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    // 닉네임 업데이트 요청
    const response = await axios.patch<UpdateNicknameResponse>(
      "https://k11d104.p.ssafy.io/api/member/update-nickname", // API URL
      { nickname }, // 요청 바디에 닉네임 포함
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      console.log("닉네임 업데이트 성공:", response.data.message);
      return response.data;
    } else {
      console.error("닉네임 업데이트 실패:", response.data.message);
      throw new Error(response.data.message || "닉네임 업데이트에 실패했습니다.");
    }
  } catch (error) {
    console.error("updateNickname 요청 실패:", error);
    throw error;
  }
};
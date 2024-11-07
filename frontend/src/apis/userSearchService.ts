import axios from "axios";
import { UserSearchResponse } from "@/types/UserSearchTypes"; // 새로운 타입 정의 필요

export const searchUserByNickname = async (nickname: string): Promise<UserSearchResponse["data"]> => {
  try {
    // sessionStorage에서 토큰을 가져옵니다.
    const token = localStorage.getItem("accessToken");
    console.log("토큰 확인:", token); // 디버깅용 로그

    // 토큰이 없는 경우 예외를 발생시킵니다.
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    // API 요청을 보내고, Authorization 헤더에 'Bearer '를 추가하여 토큰을 포함합니다.
    const response = await axios.get<UserSearchResponse>(
      `https://k11d104.p.ssafy.io/api/search/${nickname}`, // 닉네임을 경로 파라미터로 설정
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      console.log("유저 검색 성공:", response.data.data);
      return response.data.data;
    } else {
      console.error("유저 검색 실패:", response.data.message);
      throw new Error(response.data.message || "유저 검색에 실패했습니다.");
    }
  } catch (error) {
    console.error("searchUserByNickname 요청 실패:", error);
    throw error;
  }
};

import axios from "axios";
import { FriendRequestResponse } from "@/types/FriendsTypes"; // 새로운 타입 정의 필요

export const sendFriendRequest = async (memberId: number): Promise<FriendRequestResponse> => {
  try {
    // sessionStorage에서 토큰을 가져옵니다.
    const token = sessionStorage.getItem("accessToken");
    console.log("토큰 확인:", token); // 디버깅용 로그

    // 토큰이 없는 경우 예외를 발생시킵니다.
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    // API 요청을 보내고, Authorization 헤더에 'Bearer '를 추가하여 토큰을 포함합니다.
    const response = await axios.post<FriendRequestResponse>(
      "https://k11d104.p.ssafy.io/api/friend", // 친구 신청 API URL
      { memberId }, // 요청 바디에 memberId 포함
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      console.log("친구 신청 성공:", response.data.message);
      return response.data;
    } else {
      console.error("친구 신청 실패:", response.data.message);
      throw new Error(response.data.message || "친구 신청에 실패했습니다.");
    }
  } catch (error) {
    console.error("sendFriendRequest 요청 실패:", error);
    throw error;
  }
};

import axios from "axios";
import {
  GetMyInfoResponse,
  UpdateNicknameResponse,
  GetFriendInfoResponse,
} from "@/types/UserTypes";

export const getMyInfo = async () => {
  try {
    // localStorage에서 토큰을 가져옵니다.
    const token = localStorage.getItem("accessToken");
    // console.log("토큰 확인:", token); // 디버깅용 로그

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
      // console.log("프로필 조회 성공:", response.data.data);
      return response.data.data;
    } else {
      // console.error("프로필 조회 실패:", response.data.message);
      throw new Error(response.data.message || "프로필 조회에 실패했습니다.");
    }
  } catch (error) {
    // console.error("getMyInfo 요청 실패:", error);
    // throw error;
  }
};

// 닉네임 업데이트 함수
export const updateNickname = async (
  nickname: string
) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    const response = await axios.patch<UpdateNicknameResponse>(
      "https://k11d104.p.ssafy.io/api/member/update-nickname",
      { nickname },
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      if (response.data.message === "중복된 닉네임입니다.") {
        throw new Error("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.");
      }
      throw new Error(response.data.message || "닉네임 업데이트에 실패했습니다.");
    }
  } catch (error: any) {
    console.error("updateNickname 요청 실패:", error.message);
    throw error;
  }
};



export const getFriendInfo = async (
  memberId: number
)=> {
  try {
    // localStorage에서 토큰을 가져옵니다.
    const token = localStorage.getItem("accessToken");
    // console.log("토큰 확인:", token); // 디버깅용 로그

    // 토큰이 없는 경우 예외를 발생시킵니다.
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    // API 요청을 보내고, Authorization 헤더에 'Bearer '를 추가하여 토큰을 포함합니다.
    const response = await axios.get<GetFriendInfoResponse>(
      `https://k11d104.p.ssafy.io/api/member/${memberId}`, // memberId를 경로 파라미터로 설정
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      // console.log("친구 프로필 조회 성공:", response.data.data);
      return response.data.data;
    } else {
      // console.error("친구 프로필 조회 실패:", response.data.message);
      // throw new Error(
      //   response.data.message || "친구 프로필 조회에 실패했습니다."
      // );
    }
  } catch (error) {
    // console.error("getFriendInfo 요청 실패:", error);
    // throw error;
  }
};

export const updateBirth = async (birth: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 없습니다. 로그인 후 다시 시도해 주세요.");
    }

    const response = await axios.patch(
      "https://k11d104.p.ssafy.io/api/member/update-birth",
      { birth },
      {
        headers: {
          Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return response.data;
    } else {
      throw new Error(response.data.message || "생일 업데이트에 실패했습니다.");
    }
  } catch (error: any) {
    console.error("생일 업데이트 요청 실패:", error.message);
    throw error;
  }
};

import { axiosInstance } from "./axiosInstance";
// 친구 신청
export const postFriendRequest = async (memberId: number) => {
  try {
    const response = await axiosInstance.post(`friend`, { memberId: memberId });
    return response.data;
  } catch (error) {
    console.error("친구 신청 실패: ", error);
    throw error;
  }
};

// 친구 요청 받은 목록 조회
export const getFriendRequestsReceived = async () => {
  try {
    const response = await axiosInstance.get("friend/response");
    return response.data.data;
  } catch (error) {
    console.log("get friend request received failed", error);
    throw error;
  }
};

// 친구 요청 수락/거절 함수
export const responseToFriendRequest = async (
  friendId: number,
  status: boolean
) => {
  try {
    const response = await axiosInstance.patch("friend", {
      friendId,
      status,
    });
    return response.data.data;
  } catch (error) {
    console.log("response to friend request failed", error);
    throw error;
  }
};

// 친구 목록 조회 함수
export const getFriendList = async () => {
  try {
    const response = await axiosInstance.get("friend");
    return response.data.data;
  } catch (error) {
    console.log("get friend list failed", error);
    throw error;
  }
};

// 친구 신청한 목록 조회 함수
export const getFriendRequestsSent = async () => {
  try {
    const response = await axiosInstance.get("friend/request");
    return response.data.data;
  } catch (error) {
    console.log("get friend request sent failed", error);
    throw error;
  }
};

//친구 삭제
export const deleteFriend = async (memberId: number) => {
  try {
    const response = await axiosInstance.delete("friend", {
      data: { memberId },
    });
    return response.data;
  } catch (error) {
    console.log("friend delete failed", error);
  }
};

// 친구 정보 조회
export const getMemberInfo = async (memberId: number) => {
  try {
    const response = await axiosInstance.get(`/member/${memberId}`);
    return response.data.data;
  } catch (error) {
    console.log("get member info failed", error);
    throw error;
  }
};

// 친구 신청 취소
export const deleteMyRequest = async (memberId: number) => {
  try {
    const response = await axiosInstance.delete("friend/request", {
      data: { memberId },
    });
    return response.data.data;
  } catch (error) {
    console.log("delete my friend request failed", error);
    throw error;
  }
};

// 이름으로 유저 검색
export const searchUserByNickname = async (nickname: string) => {
  try {
    // API 요청을 보내고, Authorization 헤더에 'Bearer '를 추가하여 토큰을 포함합니다.
    const response = await axiosInstance.get(
      `search/${nickname}` // 닉네임을 경로 파라미터로 설정
    );
    return response.data;
  } catch (error) {
    // console.error("searchUserByNickname 요청 실패:", error);
    // throw error;
  }
};

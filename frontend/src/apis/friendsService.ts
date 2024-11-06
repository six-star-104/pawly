// import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { FriendRequest, FriendResponse, FriendRequestResponse, FriendListResponse } from "@/types/FriendsTypes"; // 타입 import

export const postFriendRequest = async (memberId: number): Promise<FriendResponse> => {
  try {
    const requestData: FriendRequest = { memberId };
    const response = await axiosInstance.post<FriendResponse>(`friend`, requestData);
    return response.data;
  } catch (error) {
    console.error("친구 신청 실패: ", error);
    throw error;
  }
};

// 친구 요청 받은 목록 조회 함수
export const getFriendRequestsReceived = async (): Promise<FriendRequestResponse> => {
  try {
    const response = await axiosInstance.get<FriendRequestResponse>('friend/response');

    // 받아온 데이터를 콘솔에 출력
    console.log("받아온 친구 요청 데이터:", response.data);

    // 응답이 성공적이지만 요청 목록이 없는 경우 처리
    if (response.data.status === 'success' && (!response.data.data || response.data.data.length === 0)) {
      console.warn("친구 요청 목록이 비어 있습니다.");
      return {
        status: "success",
        data: [],
        code: null,
        message: "친구 요청 목록이 비어 있습니다."
      };
    }

    return response.data;
  } catch (error: any) {
    // 네트워크 오류나 서버 오류와 같은 일반 오류 구분
    if (error.response) {
      console.error("서버 오류로 인해 친구 요청 받은 목록 조회 실패:", error.response.data.message);
      throw new Error(error.response.data.message || "친구 요청 목록 조회 중 오류가 발생했습니다.");
    } else if (error.request) {
      console.error("네트워크 오류로 인해 친구 요청 받은 목록 조회 실패:", error.message);
      throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    } else {
      console.error("친구 요청 받은 목록 조회 실패:", error.message);
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }
  }
};


// 친구 요청 수락/거절 함수
export const respondToFriendRequest = async (friendId: number, status: boolean): Promise<FriendResponse> => {
  try {
    if (!friendId || typeof friendId !== 'number') {
      throw new Error('유효하지 않은 친구 ID입니다.');
    }

    const requestData = { friendId, status };
    console.log("Request Data:", requestData);

    const response = await axiosInstance.patch<FriendResponse>('/friend', requestData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("서버 응답 오류:", error.response.data);
      if (error.response.data.code === 'E005') {
        throw new Error('이미 처리되었거나 존재하지 않는 친구 요청입니다.');
      }
      throw new Error(error.response.data.message || "친구 요청 처리 중 오류가 발생했습니다.");
    } else if (error.request) {
      console.error("네트워크 오류:", error.message);
      throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    } else {
      console.error("친구 수락/거절 실패:", error.message);
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }
  }
};

// 친구 목록 조회 함수
export const getFriendList = async (): Promise<FriendListResponse> => {
  try {
    const response = await axiosInstance.get<FriendListResponse>('/friend');
    
    // 받아온 데이터를 콘솔에 출력
    console.log("받아온 친구 목록 데이터:", response.data);

    // 응답이 성공적이지만 친구 목록이 없는 경우 처리
    if (response.data.status === 'success' && (!response.data.data || response.data.data.length === 0)) {
      console.warn("친구 목록이 비어 있습니다.");
      return {
        status: "success",
        data: [],
        code: null,
        message: "친구 목록이 비어 있습니다."
      };
    }

    return response.data;
  } catch (error: any) {
    // 네트워크 오류나 서버 오류와 같은 일반 오류 구분
    if (error.response) {
      console.error("서버 오류로 인해 친구 목록 조회 실패:", error.response.data.message);
      throw new Error(error.response.data.message || "친구 목록 조회 중 오류가 발생했습니다.");
    } else if (error.request) {
      console.error("네트워크 오류로 인해 친구 목록 조회 실패:", error.message);
      throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    } else {
      console.error("친구 목록 조회 실패:", error.message);
      throw new Error("예기치 못한 오류가 발생했습니다.");
    }
  }
};






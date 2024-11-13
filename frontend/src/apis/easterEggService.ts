import { axiosInstance } from "./axiosInstance";
import { EasterEggResponse } from "@/types/questTypes";

export const getEasterEggs = async () => {
  try {
    const response = await axiosInstance.get<EasterEggResponse>("/easter-egg");

    // 받아온 데이터를 콘솔에 출력
    // console.log("받아온 도전과제 데이터:", response.data);

    // 응답이 성공적이지만 도전과제 목록이 없는 경우 처리
    if (
      response.data.status === "success" &&
      (!response.data.data || response.data.data.length === 0)
    ) {
      // console.warn("도전과제 목록이 비어 있습니다.");
      return {
        status: "success",
        data: [],
        code: null,
        message: "도전과제 목록이 비어 있습니다.",
      };
    }

    return response.data;
  } catch (error) {
    // 네트워크 오류나 서버 오류와 같은 일반 오류 구분
    // if (error.response) {
    //   console.error("서버 오류로 인해 도전과제 조회 실패:", error.response.data.message);
    //   throw new Error(error.response.data.message || "도전과제 조회 중 오류가 발생했습니다.");
    // } else if (error.request) {
    //   console.error("네트워크 오류로 인해 도전과제 조회 실패:", error.message);
    //   throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    // } else {
    //   console.error("도전과제 조회 실패:", error.message);
    //   throw new Error("예기치 못한 오류가 발생했습니다.");
    // }
  }
};

// 도전과제 완료 요청 함수
export const completeEasterEgg = async (easterEggId: number) => {
  try {
    const response = await axiosInstance.post<EasterEggResponse>(
      "/easter-egg",
      { easterEggId }
    );

    // 응답 데이터 출력
    // console.log("도전과제 완료 응답 데이터:", response.data);

    if (response.data.status === "success") {
      return response.data;
    } else {
      // console.warn("도전과제 완료 실패:", response.data.message);
      throw new Error(response.data.message || "도전과제 완료에 실패했습니다.");
    }
  } catch (error) {
    // 네트워크 또는 서버 오류 처리
    //   if (error.response) {
    //     console.error("서버 오류로 인해 도전과제 완료 실패:", error.response.data.message);
    //     throw new Error(error.response.data.message || "도전과제 완료 중 오류가 발생했습니다.");
    //   } else if (error.request) {
    //     console.error("네트워크 오류로 인해 도전과제 완료 실패:", error.message);
    //     throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    //   } else {
    //     console.error("도전과제 완료 요청 실패:", error.message);
    //     throw new Error("예기치 못한 오류가 발생했습니다.");
    //   }
    // }
  }
};

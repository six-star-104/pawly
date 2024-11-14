// collectionService.ts
import { axiosInstance } from "./axiosInstance";
import { ICollectionResponse } from "@/types/collectionTypes";

// 도감 조회 API 함수
export const getCollection = async (
  memberId: number,
  pageNumber: number,
  pageSize: number
) => {
  try {
    // console.log(`API에서 받아오는 데이터= memberId=${memberId}, pageNumber=${pageNumber}, pageSize=${pageSize}`);

    const response = await axiosInstance.get<ICollectionResponse>(
      `/collection/${memberId}`,
      {
        params: { pageNumber: pageNumber, pageSize: pageSize }, // 파라미터 이름을 서버에서 기대하는 대로 변경
      }
    );
    console.log(response)
    // console.log("API 도감 조회 데이터:", response.data);

    return response.data;
  } catch (error) {
    // if (error.response) {
    //   console.error("서버 오류로 인해 도감 조회 실패:", error.response.data.message);
    //   throw new Error(error.response.data.message || "도감 조회 중 오류가 발생했습니다.");
    // } else if (error.request) {
    //   console.error("네트워크 오류로 인해 도감 조회 실패:", error.message);
    //   throw new Error("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.");
    // } else {
    //   console.error("도감 조회 요청 실패:", error.message);
    //   throw new Error("예기치 못한 오류가 발생했습니다.");
    // }
  }
};

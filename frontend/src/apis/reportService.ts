import { axiosInstance } from "./axiosInstance";

export const getReportList = async (
  category: string,
  pageNumber: number,
  pageSize: number,
  sortType: string,
  sortBy: string,
) => {
  try {
    const response = await axiosInstance.get(`/admin/${category}`, {
      params: {
        pageNumber,
        pageSize,
        sortType,
        sortBy,
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증에 실패했습니다. 다시 로그인해 주세요.");
      // 필요 시 로그아웃 처리 또는 로그인 페이지로 리다이렉트
    } else {
      console.error("Failed to fetch report list: ", error);
    }
    throw error;
  }
};

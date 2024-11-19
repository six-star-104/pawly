import { axiosInstance } from "./axiosInstance";

export const getReportList = async (
  category: string,
  pageNumber: number,
  pageSize: number,
  sortType: string,
  sortBy: string
) => {
  try {
    const response = await axiosInstance.get(`admin/${category}`, {
      params: {
        pageNumber,
        pageSize,
        sortType,
        sortBy,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("get report list failed", error);
    throw error;
  }
};

// 신고 유저 처리 API
export const updateReportStatus = async (
  reportId: number,
  confirmType: "COMPLETE" | "DENIED"
) => {
  try {
    const response = await axiosInstance.patch(`admin/${reportId}`, null, {
      params: {
        confirmType,
      },
    });
    return response.data;
  } catch (error) {
    console.log("update report list failed", error);
    throw error;
  }
};

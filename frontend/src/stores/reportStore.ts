// useReportStore.ts
import { create } from "zustand";
import { getReportList } from "@/apis/reportService";

interface ReportType {
  reportId: number;
  memberId: number;
  category: string;
  detailId: number;
  content: string;
  status: string;
  createdAt: string;
}

type ReportStore = {
  reports: ReportType[];
  totalReports: number;
  fetchReports: (
    category: string,
    pageNumber: number,
    pageSize?: number,
    sortType?: string,
    sortBy?: string,
  ) => Promise<void>;
};

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  totalReports: 0,

  fetchReports: async (
    category,
    pageNumber = 0,
    pageSize = 10,
    sortType = "asc",
    sortBy = "createdAt"
  ) => {
    try {
      const response = await getReportList(category, pageNumber, pageSize, sortType, sortBy);

      // response가 유효한지 확인 후 상태 업데이트
      if (response && response.content) {
        set(() => ({
          reports: response.content,
          totalReports: response.totalElements,
        }));
      } else {
        console.warn("신고 내역을 불러오지 못했습니다: 응답 데이터가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("신고 내역을 불러오는 중 오류:", error);
    }
  },
}));

export default useReportStore;

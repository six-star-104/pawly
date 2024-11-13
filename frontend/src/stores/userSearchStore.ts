import { create } from "zustand";
import { UserSearchResponse } from "@/types/UserSearchTypes";

// UserSearchStore 타입 정의
export interface UserSearchStore {
  searchResults: UserSearchResponse["data"] | null;
  setSearchResults: (results: UserSearchResponse["data"] | null) => void;
  executeSearch: (searchTerm: string) => Promise<void>;
}

// Zustand 스토어 정의
export const useUserSearchStore = create<UserSearchStore>((set) => ({
  // 초기 상태 정의
  searchResults: null,

  // setSearchResults 함수 정의
  setSearchResults: (results) => set(() => ({ searchResults: results })),

  // executeSearch 함수 정의
  executeSearch: async (searchTerm: string) => {
    try {
      // 실제 API 호출 로직을 추가합니다.
      const response = await fetch(`/api/search?query=${searchTerm}`);
      const data: UserSearchResponse = await response.json();

      // 검색 결과가 배열일 경우 설정합니다.
      set(() => ({
        searchResults: Array.isArray(data.data) ? data.data : null,
      }));
    } catch (error) {
      // console.error("검색 중 오류 발생:", error);
      set(() => ({ searchResults: null }));
    }
  },
}));

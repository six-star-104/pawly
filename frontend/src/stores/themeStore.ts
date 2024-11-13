import { create } from "zustand";
import { getThemes } from "@/apis/themeService"; // 조회 API 함수

interface ThemeType {
  themeId?: number;
  themeName: string;
  backgroundColor: string;
  fontColor: string;
  borderColor: string;
  image: string | null;
  base: boolean;
  deleteFlag?: boolean;
}

type ThemeStore = {
  themes: ThemeType[];
  fetchThemes: () => void;
  fetchThemesFromAPI: () => Promise<void>; // API에서 테마 조회
  addTheme: (theme: ThemeType) => void;
  updateThemeInStore: (updatedTheme: ThemeType) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themes: [],

  // 로컬 스토리지에서 테마를 가져오는 함수
  fetchThemes: () => {
    const storedThemes = localStorage.getItem("createdThemes");
    if (storedThemes) {
      set({ themes: JSON.parse(storedThemes) });
    }
  },

  // API에서 모든 테마를 조회하여 상태와 로컬 스토리지에 저장
  fetchThemesFromAPI: async () => {
    try {
      const response = await getThemes();
      if (response?.data) {
        const fetchedThemes: ThemeType[] = response.data; // deleteFlag에 관계없이 모든 테마 저장
        set({ themes: fetchedThemes });
        localStorage.setItem("createdThemes", JSON.stringify(fetchedThemes));
      }
    } catch (error) {
      console.error("Failed to fetch themes from API:", error);
    }
  },

  // 테마 추가 함수
  addTheme: (theme) =>
    set((state) => {
      const updatedThemes = [...state.themes, theme];
      localStorage.setItem("createdThemes", JSON.stringify(updatedThemes));
      return { themes: updatedThemes };
    }),

  // 테마 업데이트 함수
  updateThemeInStore: (updatedTheme) =>
    set((state) => {
      const updatedThemes = state.themes.map((theme) =>
        theme.themeId === updatedTheme.themeId ? updatedTheme : theme
      );
      localStorage.setItem("createdThemes", JSON.stringify(updatedThemes));
      return { themes: updatedThemes };
    }),
}));

export default useThemeStore;

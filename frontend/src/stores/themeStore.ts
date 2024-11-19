import { create } from "zustand";
import { getThemes, deleteTheme as deleteThemeAPI } from "@/apis/themeService";

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
  fetchThemesFromAPI: () => Promise<void>;
  addTheme: (theme: ThemeType) => void;
  updateThemeInStore: (updatedTheme: ThemeType) => void;
  deleteTheme: (themeId: number) => Promise<void>;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themes: [],

  fetchThemes: () => {
    const storedThemes = localStorage.getItem("createdThemes");
    if (storedThemes) {
      set({ themes: JSON.parse(storedThemes) });
    }
  },

  fetchThemesFromAPI: async () => {
    try {
      const response = await getThemes();
      if (response?.data) {
        const fetchedThemes: ThemeType[] = response.data;
        set({ themes: fetchedThemes });
        localStorage.setItem("createdThemes", JSON.stringify(fetchedThemes));
      }
    } catch (error) {
      console.error("Failed to fetch themes from API:", error);
    }
  },

  addTheme: (theme) =>
    set((state) => {
      const updatedThemes = [...state.themes, theme];
      localStorage.setItem("createdThemes", JSON.stringify(updatedThemes));
      return { themes: updatedThemes };
    }),

  updateThemeInStore: (updatedTheme) =>
    set((state) => {
      const updatedThemes = state.themes.map((theme) =>
        theme.themeId === updatedTheme.themeId ? updatedTheme : theme
      );
      localStorage.setItem("createdThemes", JSON.stringify(updatedThemes));
      return { themes: updatedThemes };
    }),

  deleteTheme: async (themeId: number) => {
    try {
      const response = await deleteThemeAPI(themeId);
      if (response?.status === "success") {
        console.log(`테마 ${themeId} 삭제 성공`);
        // 삭제 후 다시 모든 테마를 서버에서 가져옴
        set((state) => {
          const updatedThemes = state.themes.filter((theme) => theme.themeId !== themeId);
          localStorage.setItem("createdThemes", JSON.stringify(updatedThemes));
          return { themes: updatedThemes };
        });
        await useThemeStore.getState().fetchThemesFromAPI();
      } else {
        console.error("삭제 실패:", response?.message);
      }
    } catch (error) {
      console.error("Failed to delete theme:", error);
    }
  },
}));

export default useThemeStore;

import { create } from "zustand";

interface RollingpaperState {
  // 롤링페이퍼 변경여부 확인용
  isRollingpaperChanged: boolean;
  setIsRollingpaperChanged: (isBool: boolean) => void;

  // 사용 가능한 테마 여무
  ableTheme: boolean;
  setIsAbleTheme: (isBool: boolean) => void;

  // 포스트잇 form 에서 내용 or 테마 경고용
  isAlert: boolean;
  setIsAlert: (isBool: boolean) => void;
}

export const useRollingpaperStore = create<RollingpaperState>((set) => ({
  isRollingpaperChanged: false,
  setIsRollingpaperChanged: (isBool) => set({ isRollingpaperChanged: isBool }),

  ableTheme: true,
  setIsAbleTheme: (isBool) => set({ ableTheme: isBool }),

  isAlert: false,
  setIsAlert: (isBool) => set({ isAlert: isBool }),
}));

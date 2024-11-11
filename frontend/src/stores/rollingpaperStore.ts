import { create } from "zustand";

interface RollingpaperState {
  isPostItChanged: boolean;
  setIsPostItChanged: (isBool: boolean) => void;

  isRollingpaperChanged: boolean;
  setIsRollingpaperChanged: (isBool: boolean) => void;

  ableTheme: boolean;
  setIsAbleTheme: (isBool: boolean) => void;

  isAlert: boolean;
  setIsAlert: (isBool: boolean) => void;
}

export const useRollingpaperStore = create<RollingpaperState>((set) => ({
  isPostItChanged: false,
  setIsPostItChanged: (isBool) => set({ isPostItChanged: isBool }),

  isRollingpaperChanged: false,
  setIsRollingpaperChanged: (isBool) => set({ isRollingpaperChanged: isBool }),

  ableTheme: true,
  setIsAbleTheme: (isBool) => set({ ableTheme: isBool }),

  isAlert: false,
  setIsAlert: (isBool) => set({ isAlert: isBool }),
}));

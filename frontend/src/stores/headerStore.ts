import { create } from "zustand";

interface HeaderState {
  titleContent: string;
  setTitleContent: (title: string) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  titleContent: "",
  setTitleContent: (title) => set({ titleContent: title }),
}));

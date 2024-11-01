import { create } from "zustand";

interface LoginStore {
  isLogin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  login: (token: string) => {
    sessionStorage.setItem("accessToken", token); // accessToken을 세션에 저장
    set({ isLogin: true });
  },
  logout: () => {
    sessionStorage.removeItem("accessToken"); // accessToken을 세션에서 삭제
    set({ isLogin: false });
  },
}));

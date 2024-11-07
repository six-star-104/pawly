import { create } from "zustand";

interface LoginStore {
  isLogin: boolean;
  accessToken: string;
  setAccessToken: (token: string) => void;
  setLogin: () => void;
  setLogout: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  accessToken: "",

  setAccessToken: (token: string) => set({ accessToken: token }),

  setLogin: () =>
    set((state) => ({
      isLogin: true,
      accessToken: state.accessToken,
    })),

  setLogout: () => set({ isLogin: false, accessToken: "" }),
}));

export default useLoginStore;

import { create } from "zustand";
import { UserInfoType } from "@/types/UserTypes";

type UserInfoStore = UserInfoType & {
  setUserInfo: (userInfo: Partial<UserInfoType>) => void;
};

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  isInitialized: false,
  userId: "",
  name: "",
  email: "",
  provider: "",
  providerId: "",
  nickname: "",
  assets: "",
  birth: "",
  collections: [],
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
}));

// export default useUserInfoStore;

import { create } from "zustand";
import { UserInfoType } from "@/types/UserType";

type UserInfoStore = UserInfoType & {
  setUserInfo: (userInfo: Partial<UserInfoType>) => void;
};

const useUserInfoStore = create<UserInfoStore>((set) => ({
  isInitialized: false,
  userId: "",
  name: "",
  email: "",
  provider: "",
  providerId: "",
  nickname: "",
  assets: "",
  assetsName: "",
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
}));

export default useUserInfoStore;

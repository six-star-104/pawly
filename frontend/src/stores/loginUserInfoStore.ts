import { create } from "zustand";
import { MypageType } from "@/types/UserTypes";

// 로그인 사용자 정보 스토어 타입 정의
interface LoginUserInfoStore extends MypageType {
  isLogin: boolean;
  setLogin: (userInfo: MypageType) => void;
  setLogout: () => void;
}

// Zustand 스토어 정의
const useLoginUserInfoStore = create<LoginUserInfoStore>((set) => ({
  // 초기 상태 정의
  isLogin: false,
  isInitialized: false,
  memberId: "",
  userId: "",
  username: "",
  email: "",
  provider: "",
  providerId: "",
  nickname: "",
  assets: "",
  birth: "",
  collections: [],

  // 로그인 시 사용자 정보와 로그인 상태 업데이트
  setLogin: (userInfo) =>
    set({
      ...userInfo,
      isLogin: true,
      isInitialized: true,
    }),

  // 로그아웃 시 상태 초기화
  setLogout: () =>
    set({
      isLogin: false,
      isInitialized: false,
      memberId: "",
      userId: "",
      username: "",
      email: "",
      provider: "",
      providerId: "",
      nickname: "",
      assets: "",
      birth: "",
      collections: [],
    }),
}));

export default useLoginUserInfoStore;

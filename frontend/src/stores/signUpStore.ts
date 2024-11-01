import { create } from "zustand";
import { SignUpType } from "@/types/UserType";

type SignUpStore = {
  signUpState: SignUpType;
  setNickname: (nickname: string) => void;
  setAssets: (assets: string) => void;
  setAssetsName: (assetsName: string) => void;
  setOAuthInfo: (info: {
    email: string;
    name: string;
    provider: string;
    providerId: string;
  }) => void;
};

export const useSignUpStore = create<SignUpStore>((set, get) => ({
  signUpState: {
    email: "",
    name: "",
    provider: "",
    providerId: "",
    nickname: "",
    assets: "",
    assetsName: "",
  },
  // 상태 업데이트 함수들
  getOAuthInfo: () => {
    const { email, name, provider, providerId } = get().signUpState;
    return { email, name, provider, providerId };
  },
  setNickname: (nickname) =>
    set((state) => ({
      signUpState: { ...state.signUpState, nickname },
    })),
  setAssets: (assets) =>
    set((state) => ({
      signUpState: { ...state.signUpState, assets },
    })),
  setAssetsName: (assetsName) =>
    set((state) => ({
      signUpState: { ...state.signUpState, assetsName },
    })),
  setOAuthInfo: (info) =>
    set((state) => ({
      signUpState: {
        ...state.signUpState,
        email: info.email,
        name: info.name,
        provider: info.provider,
        providerId: info.providerId,
      },
    })),
}));

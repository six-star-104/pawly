// import { create } from "zustand";
// import { MypageType } from "@/types/UserTypes";

// UserInfoStore 타입 정의
// export interface UserInfoStore extends MypageType {
//   setUserInfo: (userInfo: Partial<MypageType>) => void;
// }

// // Zustand 스토어 정의
// export const useUserInfoStore = create<UserInfoStore>((set) => ({
//   // 초기 상태 정의
//   isInitialized: false,
//   memberId: "", // memberId 추가
//   userId: "",
//   username: "",
//   email: "",
//   provider: "",
//   providerId: "",
//   nickname: "",
//   assets: "",
//   birth: "", 
//   collections: [], 

//   // setUserInfo 함수 정의
//   setUserInfo: (userInfo: Partial<MypageType>) =>
//     set((state) => ({
//       ...state,
//       ...userInfo,
//       isInitialized: userInfo.isInitialized ?? state.isInitialized,
//     })),
// }));

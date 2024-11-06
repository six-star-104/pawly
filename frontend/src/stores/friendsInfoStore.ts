import { create } from "zustand";

interface FriendInfoType {
  nickname: string;
  birth: string;
  assets: string;
  collections: string[]; 
}

type FriendInfoStore = {
  friendInfo: FriendInfoType;
  isInitialized: boolean;
  setFriendInfo: (friendInfo: Partial<FriendInfoType>) => void;
  resetFriendInfo: () => void;
};

const useFriendInfoStore = create<FriendInfoStore>((set) => ({
  isInitialized: false,
  friendInfo: {
    nickname: "",
    birth: "",
    assets: "",
    collections: [],
  },
  setFriendInfo: (friendInfo) => 
    set((state) => ({ 
      ...state, 
      friendInfo: { ...state.friendInfo, ...friendInfo },
      isInitialized: true
    })),
  resetFriendInfo: () => 
    set(() => ({
      isInitialized: false,
      friendInfo: {
        nickname: "",
        birth: "",
        assets: "",
        collections: [],
      },
    })),
}));

export default useFriendInfoStore;

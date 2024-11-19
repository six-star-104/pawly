import { create } from "zustand";
import { getCollection } from "@/apis/userService";

interface CollectionType {
  collectionId: number;
  nickname: string;
  assets: string;
}

type CollectionStore = {
  collections: CollectionType[];
  totalCollections: number;
  fetchCollections: (
    memberId: number,
    pageNumber: number,
    pageSize?: number
  ) => Promise<void>;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  totalCollections: 0,

  fetchCollections: async (memberId, pageNumber = 0, pageSize = 9) => {
    try {
      const content = await getCollection(memberId, pageNumber, pageSize);
      if (!content) return;
      set(() => ({
        collections: content,
        totalCollections: content.length,
      }));
    } catch (error) {
      console.error("도감 데이터를 불러오는 중 오류:", error);
    }
  },
}));

export default useCollectionStore;

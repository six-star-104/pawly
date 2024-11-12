// useCollectionStore.ts
import { create } from "zustand";
import { getCollection } from "@/apis/collectionService";

interface CollectionType {
  collectionId: number;
  nickname: string;
  assets: string;
}

type CollectionStore = {
  collections: CollectionType[];
  totalCollections: number;
  fetchCollections: (memberId: number, pageNumber: number, pageSize?: number) => Promise<void>;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  totalCollections: 0,

  fetchCollections: async (memberId, pageNumber = 0, pageSize = 9) => {
    try {
      const response = await getCollection(memberId, pageNumber, pageSize);

      if (response.status === "success") {
        set(() => ({
          collections: response.data.content,
          totalCollections: response.data.totalElements,
        }));
      } else {
        console.warn("도감 데이터를 불러오지 못했습니다:", response.message);
      }
    } catch (error) {
      console.error("도감 데이터를 불러오는 중 오류:", error);
    }
  },
}));

export default useCollectionStore;

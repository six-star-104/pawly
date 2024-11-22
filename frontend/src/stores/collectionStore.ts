import { create } from "zustand";
import { getCollection } from "@/apis/userService";

interface CollectionType {
  isUser: boolean;
  collectionId: number;
  nickname: string;
  assets: string;
}

export type CollectionResponse = {
  content: CollectionType[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
};

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
      const response = await getCollection(memberId, pageNumber, pageSize);
      console.log(response);
      if (!response) return;
      set(() => ({
        collections: response.content,
        totalCollections: response.totalElements,
      }));
    } catch (error) {
      console.error("도감 데이터를 불러오는 중 오류:", error);
    }
  },
}));

export default useCollectionStore;

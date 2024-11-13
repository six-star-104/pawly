// useEasterEggStore.ts

import { create } from "zustand";
import { completeEasterEgg } from "@/apis/easterEggService";

interface EasterEggType {
  easterEggId: number;
  content: string;
  reward: string | null;
  status: string;
  completedAt: string | null;
}

type EasterEggStore = {
  easterEggs: EasterEggType[];
  completedChallengesCount: number;
  isInitialized: boolean;
  setEasterEggs: (easterEggs: EasterEggType[]) => void;
  markEasterEggComplete: (easterEggId: number) => Promise<void>;
  resetEasterEggs: () => void;
};

const useEasterEggStore = create<EasterEggStore>((set) => ({
  isInitialized: false,
  easterEggs: [],
  completedChallengesCount: 0,
  
  setEasterEggs: (easterEggs) => 
    set(() => ({
      easterEggs,
      completedChallengesCount: easterEggs.filter((egg) => egg.status === '완료됨').length,
      isInitialized: true,
    })),
  
  markEasterEggComplete: async (easterEggId) => {
    try {
      await completeEasterEgg(easterEggId);

      set((state) => {
        const updatedEasterEggs = state.easterEggs.map((egg) =>
          egg.easterEggId === easterEggId
            ? { ...egg, status: '완료됨', completedAt: new Date().toISOString() }
            : egg
        );

        const updatedCount = updatedEasterEggs.filter((egg) => egg.status === '완료됨').length;

        return {
          easterEggs: updatedEasterEggs,
          completedChallengesCount: updatedCount,
        };
      });
    } catch (error) {
      // console.error("도전과제 완료 중 오류:", error);
    }
  },

  resetEasterEggs: () =>
    set(() => ({
      isInitialized: false,
      easterEggs: [],
      completedChallengesCount: 0,
    })),
}));

export default useEasterEggStore;

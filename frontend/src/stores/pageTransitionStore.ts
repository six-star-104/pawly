import { create } from "zustand";

interface PageTransitionState {
  isTransitioning: boolean;
  targetLocation: string;
  setTransition: (isTransitioning: boolean, targetLocation: string) => void;
}

export const usePageTransitionStore = create<PageTransitionState>((set) => ({
  isTransitioning: false,
  targetLocation: "",
  setTransition: (isTransitioning, targetLocation) =>
    set({ isTransitioning, targetLocation }),
}));

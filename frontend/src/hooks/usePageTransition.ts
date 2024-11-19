import { usePageTransitionStore } from "@/stores/pageTransitionStore";

export const usePageTransition = () => {
  const setTransition = usePageTransitionStore((state) => state.setTransition);

  const transitionTo = (path: string) => {
    setTransition(true, path);
    // 실제 네비게이션은 App 컴포넌트나 필요한 곳에서 처리됩니다.
  };

  return transitionTo;
};

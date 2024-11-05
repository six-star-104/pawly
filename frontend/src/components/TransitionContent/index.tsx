// TransitionContent.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePageTransitionStore } from "@/stores/pageTransitionStore";
import { contentStyle } from "./style";
import { css } from "@emotion/react";

interface TransitionContentProps {
  children: React.ReactNode;
}

const TransitionContent: React.FC<TransitionContentProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isTransitioning, targetLocation, setTransition } =
    usePageTransitionStore();
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location.pathname !== targetLocation && isTransitioning) {
      setTransitionStage("fadeOut"); // FadeOut 시작
      setTimeout(() => {
        navigate(targetLocation); // 0.5초 후 페이지 이동
        setTransitionStage("fadeIn");
        setTransition(false, ""); // 상태 초기화
      }, 500); // 500ms 후 이동
    } else {
      setTransition(false, ""); // 상태 초기화
    }
  }, [
    isTransitioning,
    targetLocation,
    navigate,
    setTransition,
    location.pathname,
  ]);

  return (
    <div
      // prettier-ignore
      css={css`${contentStyle} ${transitionStage}`}
    >
      {children}
    </div>
  );
};

export default TransitionContent;

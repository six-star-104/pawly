import React from "react";
import PixelContainer from "../PixelContainer";
import Modal from "../Modal";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContentContainer, modalStyle } from "./SingleRollingpaperList.style";
// import { useDeleteRollingpaper } from "@/hooks/useDeleteRollingpaper";
import { IRollingPaperSum } from "@/types/rollingPaperTypes";
import useFetchUserRollingpaper from "@/hooks/useFetchUserRollingpaper";
// import { useRollingpaperStore } from "@/stores/rollingpaperStore";
interface Props {
  rollingpaper: IRollingPaperSum;
}
const SingleRollingpaperList: React.FC<Props> = ({ rollingpaper }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // 각각의 롤링페이퍼 세부 메뉴 위한 롱 클릭 이벤트들
  const timerRef = useRef<number | null>(null);
  // const { setIsRollingpaperChanged } = useRollingpaperStore();
  const handleMouseDown = () => {
    timerRef.current = window.setTimeout(() => {
      setIsMenuOpen(true);
    }, 300);
  };
  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const { deletRollingpaper } = useFetchUserRollingpaper();

  return (
    <PixelContainer key={rollingpaper.rollingPaperId} width="75%" height="8vh">
      <div
        css={ContentContainer}
        onClick={() => navigate(`${rollingpaper.rollingPaperId}`)}
        // 모바일용
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        // pc 테스트용
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        {rollingpaper.title}
      </div>
      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <div css={modalStyle}>
          <p>삭제하시겠습니까?</p>
          <div id="yesOrNo">
            <button
              className="nes-btn is-primary"
              onClick={() => {
                deletRollingpaper(rollingpaper.rollingPaperId);
                setIsMenuOpen(false);
              }}
            >
              예
            </button>
            <button className="nes-btn" onClick={() => setIsMenuOpen(false)}>
              아니오
            </button>
          </div>
        </div>
      </Modal>
    </PixelContainer>
  );
};

export default SingleRollingpaperList;

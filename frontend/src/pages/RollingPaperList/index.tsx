/** @jsxImportSource @emotion/react */
import PixelContainer from "@/components/PixelContainer";
// import { data } from "./mockdata";
import useFetchUserRollingpaper from "../../hooks/useFetchUserRollingpaper";
import {
  ListContainer,
  ContentContainer,
  backButton,
  container,
  modalStyle,
  tempBtn,
} from "./styles";
import { useNavigate } from "react-router-dom";
import backButtonImg from "@/assets/images/back_button.png";
import { useRef, useState } from "react";
import Modal from "@/components/Modal";
import { useDeleteRollingpaper } from "@/hooks/useDeleteRollingpaper";
import { useCreateRollingpaper } from "@/hooks/useCreateRollingpaper";
// 내가 받은 롤링페이퍼들 모아볼 수 있는 페이지
export const RollingPaperList = () => {
  const navigate = useNavigate();

  const { createRollingpaper } = useCreateRollingpaper();
  const { userRollingpapers } = useFetchUserRollingpaper();
  const timerRef = useRef<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deletRollingpaper } = useDeleteRollingpaper();

  // 각각의 롤링페이퍼 세부 메뉴 위한 롱 클릭 이벤트들
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

  return (
    <div css={container}>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>
      <div id="title">
        <h2>나의 롤링페이퍼들</h2>
      </div>
      <div css={ListContainer}>
        {userRollingpapers &&
          userRollingpapers.content.map((rollingpaper) => (
            //  여기다가 링크 걸어놓기

            <PixelContainer
              key={rollingpaper.rollingPaperId}
              width="75%"
              height="8vh"
            >
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
                    <button
                      className="nes-btn"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      아니오
                    </button>
                  </div>
                </div>
              </Modal>
            </PixelContainer>
          ))}
      </div>

      <button
        onClick={() => createRollingpaper("임시 롤링페이퍼", 56, 31)}
        className="nes-btn"
        css={tempBtn}
      >
        임시 롤링페이퍼 생성버튼
      </button>
    </div>
  );
};

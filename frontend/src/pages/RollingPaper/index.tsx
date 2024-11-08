/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { PostIt } from "@/components/PostIt";
import { backButton, container, plusButton, ListContainer } from "./styles";
import PlusButton from "@/assets/icons/PlusButton.png";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import backButtonImg from "@/assets/images/back_button.png";
import PostItForm from "@/components/PostItForm";
import { useParams } from "react-router-dom";
import { IPostIt } from "@/types/rollingPaperTypes";
import useFetchRollingpaper from "@/hooks/useFetchRollingpaper";
// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rollingpaperid } = useParams();

  const navigate = useNavigate(); 
  // 페이지네이션
  // const [pageNum, setPageNum] = useState(0);

  const { singleRollingpaper,fetchRollingPaper } = useFetchRollingpaper(String(rollingpaperid), 0, 10);

  useEffect(() => {
    fetchRollingPaper();
  }, []);

  return (
    <div css={container}>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>

      <div id="title">
        <h2>{singleRollingpaper?.rollingPaperTitle}</h2>
      </div>
      <div css={ListContainer}>
        {/* 무한스크롤 페이지네이션 고려하기 */}
        {singleRollingpaper?.content?.map((postit: IPostIt, index: number) => (
          <PostIt
            postitId={postit.postItId}
            key={index}
            props={postit}
            isPreview={false}
          />
        ))}
      </div>
      <button
        css={plusButton}
        type="button"
        className="nes-btn"
        onClick={() => setIsOpen(true)}
      >
        <img src={PlusButton} alt="" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="포스트잇 생성"
      >
        {/* 포스트잇 생성 폼 */}
        <PostItForm
          onClose={() => setIsOpen(false)}
          isCreate={true}
          rollingPaperId={rollingpaperid}
        />
      </Modal>
    </div>
  );
};

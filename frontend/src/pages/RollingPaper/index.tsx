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
import { sampleData } from "./mockdata";

// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rollingpaperid } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // 페이지네이션
  const [pageNum, setPageNum] = useState(0);

  const {
    singleRollingpaper,
    fetchRollingPaper,
    postits,
    createPostit,
    editPostit,
    deletePostit,
  } = useFetchRollingpaper();

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setIsLoading(true);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("옵저버 시작");
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      // 연속 호출 안되게
      setTimeout(() => observer.observe(observerTarget), 100);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    console.log("이펙트 시작");
    // 페이지 넘버 변경사항 생기면 다시 로딩
    if (!isLoading) {
      fetchRollingPaper(String(rollingpaperid), pageNum, 14)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [pageNum]);

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
        {postits.map((postit: IPostIt, index: number) => (
          <PostIt
            postitId={postit.postItId}
            key={index}
            props={postit}
            isPreview={false}
            deletePostit={deletePostit}
            editPostit={editPostit}
          />
        ))}
        <div id="observer" style={{ height: "10px" }}></div>
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
          props={sampleData}
          onClose={() => setIsOpen(false)}
          isCreate={true}
          rollingPaperId={rollingpaperid}
          createPostit={createPostit}
        />
      </Modal>
    </div>
  );
};

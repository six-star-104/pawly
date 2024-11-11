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
import { useRollingpaperStore } from "@/stores/rollingpaperStore";

// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { rollingpaperid } = useParams();
  const { isPostItChanged } = useRollingpaperStore();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // 페이지네이션
  const [pageNum, setPageNum] = useState(0);

  const sampleData = {
    // 미리보기라서 적당히 포스트잇 id 없음
    // 얘 둘은 가변으로 받아오기
    // memberId: Number(signUpState),?
    // memberNickname: nickname,

    // 아래애들은 기본 셋팅 값들
    themeId: 1,
    content: "",
    backgroundColor: "#000000",
    image: "",
    font: 1,
    fontColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    speechBubbleSize: 1,
  };
  const { singleRollingpaper, fetchRollingPaper, postits } =
    useFetchRollingpaper();

  const handleObserver = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setIsLoading(true);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      // 첫 로딩때 바로 다음페이지로 안가게
      setTimeout(() => observer.observe(observerTarget), 50);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchRollingPaper(String(rollingpaperid), pageNum, 10)
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [pageNum, isPostItChanged]);

  // useEffect(() => {
  //   if (isLoading) return;
  //   fetchRollingPaper(String(rollingpaperid), pageNum, 10);
  //   setIsLoading(false);
  // }, [isPostItChanged]);

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
        />
      </Modal>
    </div>
  );
};

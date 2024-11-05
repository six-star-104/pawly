/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { data } from "./mockdata";
import { PostIt } from "@/components/PostIt";
import { backButton, container, plusButton } from "./styles";
import PlusButton from "@/assets/icons/PlusButton.png";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import backButtonImg from "@/assets/images/back_button.png";
import PostItForm from "@/components/PostItForm";
// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  // 가능한 말풍선 선택지
  // 사이즈  mini  medium  large  - large는 너무크고, medium은 우측 말꼬리가 짤려서, mini랑 기본사이즈로 통일을할까...?
  //  그림자 여부  shadow    - 얘를 default로 넣을까...?
  //  말꼬리 방향  top right left bottom   -- 랜덤 아니면 유저가 지정 가능하도록...?
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const mockdata = {
    // 미리보기라서 적당히 포스트잇 id 정해주기
    postitId: 123,
    // 얘 둘은 가변으로 받아오기
    memberId: 123,
    memberNickname: "민준",

    // 아래애들은 기본 셋팅 값들
    content: "",
    backgroundColorer: 0,
    image: null,
    fontColorer: 0,
    borderColorer: 0,
    speechBubbleSize: 1,
    preview: true,
  };

  return (
    <div css={container}>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>
      <h2>누구누구의 롤링페이퍼</h2>
      {/* 무한스크롤 페이지네이션 고려하기 */}
      {data.content.map((postit, index) => (
        <>
          <PostIt key={index} props={postit} />
          <PostIt key={index} props={postit} />
          <PostIt key={index} props={postit} />
          <PostIt key={index} props={postit} />
          <PostIt key={index} props={postit} />
          <PostIt key={index} props={postit} />
        </>
      ))}
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
          props={mockdata}
          onClose={() => setIsOpen(false)}
          isCreate={true}
        />
      </Modal>
    </div>
  );
};

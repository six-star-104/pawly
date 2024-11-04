/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { data } from "./mockdata";
import { PostIt } from "@/components/PostIt";
import {
  backButton,
  contentContainer,
  container,
  ArrowButton,
  ArrowContainer,
} from "./styles";
import PlusButton from "@/assets/icons/PlusButton.png";
import Modal from "@/components/Modal";
import SelectOptions from "@/components/SelectOptions";
import { PostItStyle } from "@/components/SelectOptions/SelectOptions.type";
// 특정 하나의 롤링 페이퍼만 볼 수 있는 페이지
export const RollingPaper = () => {
  // 가능한 말풍선 선택지
  // 사이즈  mini  medium  large  - large는 너무크고, medium은 우측 말꼬리가 짤려서, mini랑 기본사이즈로 통일을할까...?
  //  그림자 여부  shadow    - 얘를 default로 넣을까...?
  //  말꼬리 방향  top right left bottom   -- 랜덤 아니면 유저가 지정 가능하도록...?
  const [isOpen, setIsOpen] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(false);
  const sizeArray = ["작게", "보통", "크게"];
  const [previewPostIt, setPreviewPostIt] = useState<PostItStyle>({
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
  });

  const handleChangeOptionValues = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.scrollHeight === e.target.clientHeight) {
      setPreviewPostIt((prev) => ({
        ...prev,
        content: e.target.value,
      }));
      // setIsMaxLength(false);
    } else {
      setIsMaxLength(true);
    }
  };

  return (
    <div css={container}>
      <h1>누구누구의 롤링페이퍼</h1>
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
        css={backButton}
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
        <div css={contentContainer}>
          {/* <form action="" onSubmit={(e) => setPreviewPostIt(e.currentTarget.value)}> */}
          <div className="nes-field" >
            <p>내용</p>
            <div id="textareacontainer">
            <textarea
              // type="text"
              id="content"
              className="nes-input"
              rows={4}
              value={previewPostIt.content}
              onChange={(e) => handleChangeOptionValues(e)}
            />
            </div>
            {isMaxLength && <p id="alert">최대 5줄까지 작성 가능합니다</p>}
          </div>

          <p>배경</p>
          <SelectOptions
            selectOption="backgroundColorer"
            setPreview={setPreviewPostIt}
            previewPostIt={previewPostIt}
          />
          <br />
          <SelectOptions
            selectOption="image"
            setPreview={setPreviewPostIt}
            previewPostIt={previewPostIt}
          />
          <p>글자색</p>
          <SelectOptions
            selectOption="fontColorer"
            setPreview={setPreviewPostIt}
            previewPostIt={previewPostIt}
          />
          <p>테두리색</p>
          <SelectOptions
            selectOption="borderColorer"
            setPreview={setPreviewPostIt}
            previewPostIt={previewPostIt}
          />
          <p> 말풍선 크기</p>
          <div css={ArrowContainer}>
            <button
              css={ArrowButton}
              onClick={() =>
                setPreviewPostIt((prev) => ({
                  ...prev,
                  // speechBubbleSize: Number(e.target.value),
                  speechBubbleSize: Math.abs(prev.speechBubbleSize - 1) % 3,
                }))
              }
            >
              ◀️
            </button>
            <div>{sizeArray[previewPostIt.speechBubbleSize]}</div>
            <button
              css={ArrowButton}
              onClick={() =>
                setPreviewPostIt((prev) => ({
                  ...prev,
                  speechBubbleSize: Math.abs(prev.speechBubbleSize + 1) % 3,
                }))
              }
            >
              ▶️
            </button>
          </div>

          <p>미리보기</p>
          <PostIt props={previewPostIt} />
        </div>

        <button className="nes-btn" onClick={() => setIsOpen(false)}>
          생성
        </button>
      </Modal>
    </div>
  );
};

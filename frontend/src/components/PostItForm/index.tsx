/** @jsxImportSource @emotion/react */
import React from "react";
import {
  contentContainer,
  ArrowButton,
  ArrowContainer,
  CreateButton,
} from "./PostItForm.style";
import { useState } from "react";
import SelectOptions from "../SelectOptions";
import { PostIt } from "../PostIt";
import { FormProps } from "./PostItForm.type";
import { useCreatePostit } from "@/hooks/useCreatePostit";
import { useEditPostit } from "@/hooks/useEditPostit";
import { IPostIt } from "@/types/rollingPaperTypes";

const PostItForm: React.FC<FormProps> = ({ props, onClose, isCreate }) => {
  const [isMaxLength, setIsMaxLength] = useState(false);
  const sizeArray = ["작게", "보통", "크게"];

  const [previewPostIt, setPreviewPostIt] = useState<IPostIt>(props);

  const { createPostit } = useCreatePostit();
  const { editPostit } = useEditPostit();

  // 내용 입력칸 4줄 이상시 경고 + 글자 제한
  const handleChangeOptionValues = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.scrollHeight === e.target.clientHeight) {
      setPreviewPostIt((prev) => ({
        ...prev,
        content: e.target.value,
      }));
      setIsMaxLength(false);
    } else {
      setIsMaxLength(true);
    }
  };
  const submitPostIt = () => {
    // 여기서 생성 api 호출해주기
    if (isCreate) {
      //여기에 생성
      createPostit(previewPostIt);
    } else {
      //여기에 수정
      editPostit(previewPostIt);
    }
    onClose();
  };

  return (
    <>
      <div css={contentContainer}>
        <div className="nes-field" id="textareacontainer">
          <p>내용</p>
          <div>
            <textarea
              // type="text"
              id="content"
              className={`nes-input  ${isMaxLength ? " is-error" : ""}`}
              rows={4}
              value={previewPostIt.content}
              onChange={(e) => handleChangeOptionValues(e)}
            />
          </div>
          {/* {isMaxLength && <p id="alert">최대 4줄까지 작성 가능합니다</p>} */}
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
                speechBubbleSize: Math.abs(prev.speechBubbleSize + 2) % 3,
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
        <PostIt props={previewPostIt} isPreview={true} />

        <div css={CreateButton}>
          {/* 이거 버튼 색 나중에 테마로 바꿀까 */}
          <button className="nes-btn is-primary" onClick={() => submitPostIt()}>
            {isCreate ? "생성" : "수정"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PostItForm;

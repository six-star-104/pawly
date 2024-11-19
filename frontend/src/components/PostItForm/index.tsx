/** @jsxImportSource @emotion/react */
import React from "react";
import { contentContainer, CreateButton } from "./PostItForm.style";
import { useState } from "react";
// import SelectOptions from "../SelectOptions";
import { IPostIt } from "@/types/rollingPaperTypes";
import { FormProps } from "./PostItForm.type";
// import { useCreatePostit } from "@/hooks/useCreatePostit";
// import { useEditPostit } from "@/hooks/useEditPostit";
import ArrowSelectContainer from "../ArrowSelectContainer";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
import { useFetchThemes } from "@/hooks/useFetchTheme";
// import useFetchRollingpaper from "@/hooks/useFetchRollingpaper";
const PostItForm: React.FC<FormProps> = ({
  props,
  onClose,
  isCreate,
  rollingPaperId,
  createPostit,
  editPostit,
}) => {
  const [isMaxLength, setIsMaxLength] = useState(false);
  const [noTextAlert, setNoTextAlert] = useState(false);

  const [previewPostIt, setPreviewPostIt] = useState<IPostIt>(props);
  const { ableTheme, setIsAlert } = useRollingpaperStore();
  // const { createPostit } = useCreatePostit();
  // const { editPostit } = useEditPostit();
  const { themes } = useFetchThemes();

  // const { createPostit, editPostit } = useFetchRollingpaper();

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
    if (!previewPostIt.content) {
      // 텍스트 내용 없을 경우 경고
      setNoTextAlert(true);
      setTimeout(() => setNoTextAlert(false), 1000);
      return;
    }
    if (!ableTheme) {
      // 선택 불가능한 테마면 경고
      setIsAlert(true);
      setTimeout(() => setIsAlert(false), 1000);
      return;
    }

    if (isCreate) {
      // 생성

      try {
        createPostit && createPostit(previewPostIt, rollingPaperId!);
      } catch {
        ("");
      } finally {
        // console.log("화면단 생성완료");
        onClose();
      }
      // setIsPostItChanged(true);
    } else {
      // 수정
      try {
        editPostit && editPostit(previewPostIt);
      } catch {
        ("");
      } finally {
        // console.log("화면단 수정완료");
        onClose();
      }

      // setIsPostItChanged(true);
    }
  };

  return (
    <>
      <div css={contentContainer(noTextAlert)}>
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
        </div>

        <p>말풍선 크기</p>
        <ArrowSelectContainer
          forWhat="speechBubbleSize"
          setPreviewPostIt={setPreviewPostIt}
          preViewPostIt={previewPostIt}
        />

        <p>폰트</p>
        <ArrowSelectContainer
          forWhat="font"
          setPreviewPostIt={setPreviewPostIt}
          preViewPostIt={previewPostIt}
        />

        <p>테마 </p>
        <ArrowSelectContainer
          forWhat="themeId"
          setPreviewPostIt={setPreviewPostIt}
          preViewPostIt={previewPostIt}
          themes={themes}
        />

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

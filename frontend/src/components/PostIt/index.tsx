/** @jsxImportSource @emotion/react */
import { bubbleStyle, fromWho, menuStyle, modalStyle } from "./PostIt.style";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Modal from "../Modal";
import PostItForm from "../PostItForm";
import { PostItProps } from "./PostIt.type";
import { useReport } from "@/hooks/useReport";
// import { useDeletePostit } from "@/hooks/useDeletePostit";
// import useFetchRollingpaper from "@/hooks/useFetchRollingpaper";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { findTheme } from "./themes";
export const PostIt: React.FC<PostItProps> = ({
  props,
  isPreview,
  deletePostit,
  editPostit,
  ownerId,
}) => {
  const randomDir = ["top", "right", "left", "bottom"];
  // 이러면 너무 랜더 될때마다 자꾸 반복돼서, 그냥 말풍선id넘버로 해줄까...?
  const [randomArrow, setRandomArrow] = useState("bottom");
  const themeStyle = findTheme(props.themeId);
  useEffect(() => {
    setRandomArrow(randomDir[Math.floor(Math.random() * 4)]);
  }, []);

  const { memberId } = useUserInfoStore();
  const speechBubbleSize = ["", "mini", "medium"];

  // 나중에 색 정해지면 다 바꿔주기
  // const randomTextColor = ["black", "white", "blue", "red", "yellow"];
  // const randomBgColor = ["white", "black", "blue", "red", "yellow"];
  // const randomBorderColor = ["black", "white", "blue", "red", "yellow"];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const timerRef = useRef<number | null>(null);
  const [reportContent, setReportContent] = useState("");
  const { reportPostit } = useReport();
  // const { deletePostit } = useDeletePostit();
  // const {deletePostit} = useFetchRollingpaper()
  const handleMouseDown = () => {
    // 미리보기면 no 클릭 이벤트
    if (isPreview) {
      return;
    }

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
    <>
      <div
        css={bubbleStyle(
          themeStyle!.fontColor,
          themeStyle!.borderColor,
          // 배경이 있으면 => 남은 자투리 배경색이 테두리색 따라가게
          props.image ? themeStyle!.borderColor : themeStyle!.background,
          props.image!,
          isPreview,
          props.font
        )}
        className={`bubble ${isPreview ? "" : randomArrow} ${
          speechBubbleSize[props.speechBubbleSize - 1]
        } 
      `}
        // 모바일용
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        // pc 테스트용
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseLeave={handleMouseUp}
      >
        {props.content}
        <div css={fromWho}>{isPreview ? "" : `- ${props.memberNickname}`}</div>
      </div>
      <Modal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        // title="세부메뉴"
      >
        <div css={menuStyle}>
          {ownerId == memberId && (
            <>
              <p
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEditOpen(true);
                }}
              >
                수정하기
              </p>
              <p
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsConfirmOpen(true);
                }}
              >
                삭제하기
              </p>
            </>
          )}

          <p
            onClick={() => {
              setIsMenuOpen(false);
              setIsReportOpen(true);
            }}
          >
            신고하기
          </p>
        </div>
      </Modal>

      {/* 삭제 모달 */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="삭제 확인"
      >
        <div css={modalStyle}>
          <p>삭제하시겠습니까?</p>
          <div id="yesOrNo">
            <button
              className="nes-btn is-primary"
              onClick={() => {
                deletePostit(props.postItId!);
                setIsConfirmOpen(false);
              }}
            >
              예
            </button>
            <button className="nes-btn" onClick={() => setIsConfirmOpen(false)}>
              아니오
            </button>
          </div>
        </div>
      </Modal>

      {/* 수정 모달 */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="포스트잇 수정"
      >
        <PostItForm
          props={props}
          onClose={() => setIsEditOpen(false)}
          isCreate={false}
          editPostit={editPostit}
        />
      </Modal>

      {/* 신고 모달 */}
      <Modal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        title="신고하기"
      >
        <div css={modalStyle}>
          <textarea
            id="reportContent"
            className="nes-input"
            rows={3}
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          ></textarea>
          <button
            id="reportButton"
            className="nes-btn is-primary"
            onClick={() => {
              reportPostit(props.postItId!, reportContent);
              setIsReportOpen(false);
            }}
          >
            신고하기
          </button>
        </div>
      </Modal>
    </>
  );
};

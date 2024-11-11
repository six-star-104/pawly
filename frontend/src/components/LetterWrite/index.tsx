import * as style from "./LetterWrite.style";
import { postLetter } from "@/apis/letterService";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm";

type LetterWriteProps = {
  recipientId: number;
  recipientName: string;
  onClose: () => void;
};

export const LetterWrite: React.FC<LetterWriteProps> = ({
  recipientId,
  recipientName,
  onClose,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleCancel = () => {
    setIsConfirmOpen(true);
  };

  const confirmCancel = () => {
    onClose();
  };

  const handlePostLetter = async () => {
    try {
      await postLetter(picture, recipientId, content);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to send the letter", error);
      throw error;
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= 1000) {
      setContent(newContent);
      setContentLength(newContent.length);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setPicture(selectedFile);

      // 미리보기 URL 생성
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  return (
    <>
      <style.modalHeader>
        <span>To. {recipientName}</span>
        <div>
          <button css={style.closeButtonStyle} onClick={handleCancel}>
            ✖️
          </button>
        </div>
      </style.modalHeader>
      <div css={style.inputContainer}>
        <div css={style.letterContent}>
          <textarea
            value={content}
            onChange={handleContentChange}
            css={style.contentInput}
            maxLength={1000}
          />
        </div>

        <div css={style.fileInputContainer}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="첨부된 사진 미리보기"
              css={style.imagePreview}
            />
          ) : (
            <label css={style.fileInputLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                css={style.fileInput}
              />
              사진 첨부하기
            </label>
          )}
        </div>
      </div>
      <ModalConfirm
        isOpen={isConfirmOpen}
        onConfirm={confirmCancel}
        onCancel={() => setIsConfirmOpen(false)}
        messageMain="편지 작성을 취소 하시겠습니까?"
        messageWarn={["작성하던 편지는 저장되지 않습니다."]}
      />
      <div css={style.footer}>
        <div>{contentLength} / 1000</div>
        <button css={style.sendButton} onClick={handlePostLetter}>
          보내기
        </button>
      </div>
      {isSent && (
        <>
          <div css={style.overlay}></div>
          <div css={style.sentMessage}>전송 완료</div>
        </>
      )}{" "}
    </>
  );
};

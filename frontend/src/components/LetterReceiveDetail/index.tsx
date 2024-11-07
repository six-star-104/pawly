// LetterReceiveDetail.tsx
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  closeButtonStyle,
  modalBodyStyle,
  reactionIconsStyle,
  modalActionsStyle,
} from "./LetterReceiveDetail.style";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import { IReadLetter } from "@/types/letterTypes";

export const LetterReceiveDetail = ({ selectedLetter, onClose }) => {
  const [reactionIcon, setReactionIcon] = useState<JSX.Element | null>(null);

  const handleReactionChange = (icon: JSX.Element) => {
    setReactionIcon(icon);
  };

  return (
    <Modal isOpen={!!selectedLetter} onClose={onClose}>
      <div css={modalOverlayStyle}>
        <div css={modalContentStyle}>
          <div css={modalHeaderStyle}>
            <span>From. {selectedLetter?.senderNickname}</span>
            <button css={closeButtonStyle} onClick={onClose}>
              ✖️
            </button>
          </div>
          <div css={modalBodyStyle}>
            <p>{selectedLetter?.content}</p>
            <p>반응: {reactionIcon}</p>
          </div>
          <div css={modalActionsStyle}>
            <div css={reactionIconsStyle}>
              <i
                className="nes-icon is-small heart"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small heart"></i>
                  )
                }
              ></i>
              <i
                className="nes-icon is-small star"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small star"></i>
                  )
                }
              ></i>
              <i
                className="nes-icon is-small like"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small like"></i>
                  )
                }
              ></i>
            </div>
            <Button onClick={onClose}>답장하기</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

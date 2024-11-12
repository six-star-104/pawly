import React from "react";
import * as style from "./ModalConfirm.style";

interface ModalConfirmProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  messageMain: string;
  messageWarn?: string[];
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  messageMain,
  messageWarn,
}) => {
  return (
    <div css={style.modalOverlay(isOpen)}>
      <div css={style.modalContent(isOpen)}>
        <div css={style.messageMain}>{messageMain}</div>
        {messageWarn?.map((line, index) => (
          <div css={style.messageWarn} key={index}>
            {line}
          </div>
        ))}
        <div css={style.buttonContainer}>
          <style.confirmButton onClick={onConfirm}>확인</style.confirmButton>
          <style.cancelButton onClick={onCancel}>취소</style.cancelButton>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;

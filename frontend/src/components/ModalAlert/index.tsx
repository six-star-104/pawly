import React from "react";
import * as style from "./ModalAlert.style";

type ModalAlertProps = {
  isOpen: boolean;
  message: string;
};

const ModalAlert: React.FC<ModalAlertProps> = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <>
      <div css={style.overlay}></div>
      <div css={style.alertMessage}>{message}</div>
    </>
  );
};

export default ModalAlert;

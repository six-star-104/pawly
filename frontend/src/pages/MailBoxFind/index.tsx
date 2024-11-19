/** @jsxImportSource @emotion/react */
import Ar from "../../components/Ar";
import { container } from "./styles";
import { backButton } from "./styles";
import backButtonImg from "@/assets/icons/back_button.png";
export const MailBoxFind = () => {

  const resetUrl = ()=>{
    window.location.replace('/');
  }
  return (
    <>
      <button css={backButton} onClick={resetUrl}>
        <img src={backButtonImg} alt="" />
      </button>

      <div css={container}>
        <Ar />
      </div>
    </>
  );
};

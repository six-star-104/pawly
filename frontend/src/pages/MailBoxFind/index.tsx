/** @jsxImportSource @emotion/react */
import Ar from "../../components/Ar";
import { container } from "./styles";
import { useNavigate } from "react-router-dom";
import { backButton } from "./styles";
import backButtonImg from "@/assets/images/back_button.png";
export const MailBoxFind = () => {
  const navigate = useNavigate()
  return (
    <>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>

      <div css={container}>
        <Ar />
      </div>
    </>
  );
};

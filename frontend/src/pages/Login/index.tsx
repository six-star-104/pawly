/** @jsxImportSource @emotion/react */
import Pawly from "@/assets/images/Pawly.png";
import kakao from "@/assets/images/kakao.png";
import GooGle1 from "@/assets/images/GooGle1.png";
import { container, imgCss, loginBtn } from "./styles";
// import { kakaoLogin } from "@/apis/userService";

export const Login = () => {
  const KAKAO_AUTH_URL = `${
    import.meta.env.VITE_BACKEND_URL
  }/oauth2/authorize/kakao`;
  const loginWithKakao = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div css={container}>
      <div css={imgCss}>
        <img src={Pawly} alt="Pawly Logo" />
      </div>

      <div css={loginBtn}>
        <button onClick={loginWithKakao}>
          <img src={kakao} alt="Kakao" />
          카카오로 시작하기
        </button>
        <button>
          <img src={GooGle1} alt="Google" />
          구글로 시작하기
        </button>
      </div>
    </div>
  );
};

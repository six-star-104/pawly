/** @jsxImportSource @emotion/react */
import Pawly from "@/assets/icons/Pawly.svg";
import kakao from "@/assets/images/kakao.png";
import GooGle1 from "@/assets/images/GooGle1.png";
import { container, imgCss, loginBtn } from "./styles";
import { kakaoLogin } from "@/apis/userService";
import { useNavigate, useLocation } from "react-router-dom";
import useLoginStore from "@/stores/loginStore";
import { getRefreshToken } from "@/apis/axiosInstance";
import { useEffect } from "react";
export const Login = () => {
  const { isLogin, setLogin } = useLoginStore();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const from = location.state?.from?.pathname || "/";
    if (isLogin) {
      navigateTo(from, { replace: true });
    } else {
      const requestAccessToken = async () => {
        try {
          const response = await getRefreshToken();
          if (response) {
            setLogin();
            console.log("refreshToken 유효, 토큰 재발급");
            navigateTo(from, { replace: true });
          } else {
            console.log("refreshToken 만료, 다시 로그인하세요.");
          }
        } catch {
          console.log("refreshToken 만료, 다시 로그인하세요.");
        }
      };

      requestAccessToken();
    }
  }, [isLogin, navigateTo]);

  // 뒤로 가기 방지
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // 카카오 로그인 버튼 클릭 핸들러
  const handleKakaoLogin = () => {
    kakaoLogin();
  };

  return (
    <div css={container}>
      <div>
        <img src={Pawly} css={imgCss} alt="Pawly Logo" />
      </div>

      <div css={loginBtn}>
        <button onClick={handleKakaoLogin}>
          <img src={kakao} alt="Kakao" />
          카카오로 시작하기기
        </button>
        <button>
          <img src={GooGle1} alt="Google" />
          구글로 시작하기
        </button>
      </div>
    </div>
  );
};

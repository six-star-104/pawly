/** @jsxImportSource @emotion/react */
import Pawly from "@/assets/images/Pawly.png";
import kakao from "@/assets/images/kakao.png";
import GooGle1 from "@/assets/images/GooGle1.png";
import { container, imgCss, loginBtn } from "./styles";
import { kakaoLogin } from "@/apis/userService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRefreshToken } from "@/apis/axiosInstance";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("accessToken"));
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigateTo("/");
    } else {
      const requestAccessToken = async () => {
        try {
          const response = await getRefreshToken();
          if (response) {
            setIsLogin(response);
            console.log("refreshToken 유효, 토큰 재발급");
            navigateTo("/");
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

  return (
    <div css={container}>
      <div css={imgCss}>
        <img src={Pawly} alt="Pawly Logo" />
      </div>

      <div css={loginBtn}>
        <button onClick={kakaoLogin}>
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

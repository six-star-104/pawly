/** @jsxImportSource @emotion/react */
import Pawly from "@/assets/images/Pawly.png";
import kakao from "@/assets/images/kakao.png";
import GooGle1 from "@/assets/images/GooGle1.png";
import { container, imgCss, loginBtn } from "./styles";
import { kakaoLogin, getOAuthInformation } from "@/apis/userService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useUserInfoStore from "@/stores/userInfoStore";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const navigateTo = useNavigate();
  const token = searchParams.get("token");
  console.log("token", token);

  const userInfoValue = useUserInfoStore();
  useEffect(() => {
    const getOAuth = async (token: string) => {
      try {
        const response = await getOAuthInformation(token);
        userInfoValue.setUserInfo({
          email: response.email,
          name: response.name,
          provider: response.provider,
          providerId: response.providerId,
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      getOAuth(token);
    } else {
      navigateTo("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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

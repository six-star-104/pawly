import { useEffect, useState } from "react";
import { getOAuthInformation, kakaoLogin, signUp } from "@/apis/userService";
import { CreateNickname } from "@/components/CreateNickname";
import { CreateAssets } from "@/components/CreateAssets";
import { useSignUpStore } from "@/stores/signUpStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as style from "./style";
import Pawly from "@/assets/icons/Pawly.svg";

export const SignUp = () => {
  const [pageNum, setPageNum] = useState(1);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isImageGenerated, setIsImageGenerated] = useState(false);

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigateTo = useNavigate();
  const { signUpState, setOAuthInfo } = useSignUpStore();

  useEffect(() => {
    const getOAuth = async (token: string) => {
      try {
        const response = await getOAuthInformation(token);
        setOAuthInfo({
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
  }, [token, navigateTo, setOAuthInfo]);

  const handleNextPage = () => {
    if (isNicknameValid) {
      setPageNum(2);
    }
  };

  const handlePrevPage = () => {
    setPageNum(1);
  };

  const handleSignUp = async () => {
    try {
      await signUp({
        email: signUpState.email,
        name: signUpState.name,
        provider: signUpState.provider,
        providerId: signUpState.providerId,
        nickname: signUpState.nickname,
        asset: signUpState.asset,
      });

      if (signUpState.provider === "kakao") {
        await kakaoLogin();
      }

      navigateTo("/");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  };

  return (
    <style.Container>
      <style.Logo src={Pawly} alt="Pawly Logo" />

      <style.PageContainer>
        <style.Page $pageNum={pageNum}>
          <CreateNickname onValidationChange={setIsNicknameValid} />
          <style.ButtonContainer>
            <style.NextButton
              onClick={handleNextPage}
              disabled={!isNicknameValid}
            >
              다음
            </style.NextButton>
          </style.ButtonContainer>
        </style.Page>

        <style.Page $pageNum={pageNum}>
          <div className="content">
            <CreateAssets onImageGenerated={setIsImageGenerated} />
          </div>
          <style.ButtonContainer>
            <style.PrevButton onClick={handlePrevPage}>이전</style.PrevButton>
            <style.SubmitButton
              onClick={handleSignUp}
              disabled={!isImageGenerated}
            >
              가입하기
            </style.SubmitButton>
          </style.ButtonContainer>
        </style.Page>
      </style.PageContainer>
    </style.Container>
  );
};

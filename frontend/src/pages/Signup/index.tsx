import { useEffect, useState } from "react";
import { getOAuthInformation, signUp } from "@/apis/userService";
import { CreateNickname } from "@/components/CreateNickname";
import { CreateAssets } from "@/components/CreateAssets";
import { useSignUpStore } from "@/stores/signUpStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as style from "./style";
import Pawly from "@/assets/images/Pawly.png";

export const SignUp = () => {
  const [pageNum, setPageNum] = useState(1);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigateTo = useNavigate();
  const { signUpState, setNickname, setAssets, setAssetsName, setOAuthInfo } =
    useSignUpStore();

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

  const handleNextButton = () => {
    if (isNicknameValid) {
      setPageNum(2);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(signUpState);
      navigateTo("/main");
    } catch (error) {
      console.error("Sign up failed: ", error);
    }
  };

  return (
    <style.Container>
      <img src={Pawly} alt="Pawly Logo" />

      <style.PageContainer>
        {pageNum === 1 && (
          <style.Page>
            <CreateNickname
              nickname={signUpState.nickname}
              setNickname={setNickname}
              onValidationChange={setIsNicknameValid}
            />
            <style.Button
              onClick={handleNextButton}
              disabled={!isNicknameValid}
            >
              다음
            </style.Button>
          </style.Page>
        )}
        {pageNum === 2 && (
          <style.Page>
            <CreateAssets
              assets={signUpState.assets}
              setAssets={setAssets}
              assetsName={signUpState.assetsName}
              setAssetsName={setAssetsName}
            />
            <style.Button onClick={handleSignUp}>가입하기</style.Button>
          </style.Page>
        )}
      </style.PageContainer>
    </style.Container>
  );
};

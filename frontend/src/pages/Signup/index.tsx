import { useEffect, useState } from "react";
import { getOAuthInformation, signUp } from "@/apis/userService";
import { CreateNickname } from "@/components/CreateNickname";
import { CreateAssets } from "@/components/CreateAssets";
import { useSignUpStore } from "@/stores/signUpStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as style from "./style";

export const SignUp = () => {
  const [pageNum, setPageNum] = useState(1);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleNextButton = () => {
    if (signUpState.nickname.trim()) {
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
    <style.Container pageNum={pageNum}>
      <style.PageContainer>
        <style.Page pageNum={pageNum}>
          {/* Nickname Input Component */}
          <CreateNickname
            nickname={signUpState.nickname}
            setNickname={setNickname}
          />
          <style.Button
            onClick={handleNextButton}
            disabled={!signUpState.nickname.trim()}
          >
            다음
          </style.Button>
        </style.Page>
        <style.Page pageNum={pageNum}>
          {/* Character Assets Input Component */}
          <CreateAssets
            assets={signUpState.assets}
            setAssets={setAssets}
            assetsName={signUpState.assetsName}
            setAssetsName={setAssetsName}
          />
          <style.Button
            onClick={handleSignUp}
            disabled={!signUpState.assetsName.trim()}
          >
            가입하기
          </style.Button>
        </style.Page>
      </style.PageContainer>
    </style.Container>
  );
};

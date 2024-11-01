import { useEffect } from "react";
import { getOAuthInformation, signUp } from "@/apis/userService";
import { CreateNickname } from "@/components/CreateNickname";
import { CreateAssets } from "@/components/CreateAssets";
import { useSignUpStore } from "@/stores/signUpStore"; // Zustand store import
import { useNavigate, useSearchParams } from "react-router-dom";

export const SignUp = () => {
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
      navigateTo("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 최종 회원가입 요청 함수
  const handleSignUp = async () => {
    try {
      await signUp(signUpState);
      navigateTo("/main");
    } catch (error) {
      console.error("Sign up failed: ", error);
    }
  };

  return (
    <>
      {/* 닉네임 입력 컴포넌트 */}
      <CreateNickname
        nickname={signUpState.nickname}
        setNickname={setNickname}
      />

      {/* 캐릭터 입력 컴포넌트 */}
      <CreateAssets
        assets={signUpState.assets}
        setAssets={setAssets}
        assetsName={signUpState.assetsName}
        setAssetsName={setAssetsName}
      />

      {/* 가입하기 버튼 */}
      <button
        onClick={handleSignUp}
        disabled={
          !signUpState.nickname.trim() || !signUpState.assetsName.trim()
        }
      >
        가입하기
      </button>
    </>
  );
};

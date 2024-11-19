import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getOAuthAccessToken } from "@/apis/userService";
import { getRefreshToken } from "@/apis/axiosInstance";
import useLoginStore from "@/stores/loginStore";
import { getMyInfo } from "@/apis/myPageService"; // 사용자 정보 API 가져오기
import { useUserInfoStore } from "./stores/userInfoStore";
import { Header } from "./components/Header";
import Notification from "./components/Notification";
// 사용자가 메인 페이지에 들어오면 사용자 정보를 스토어에 저장
// useEffect(() => {
//   const fetchUserInfo = async () => {
//     try {
//       const data = await getMyInfo();
//       setUserInfo({
//         isInitialized: true,
//         userId: data.memberId,
//         name: data.name,
//         email: data.email,
//         provider: data.provider,
//         providerId: data.providerId,
//         nickname: data.nickname,
//         assets: data.assets,
//         birth: data.birth,
//         collections: data.collections || [],
//       });
//       console.log("User Info:", {
//         memberId: data.memberId,
//         username: data.name,
//         email: data.email,
//         provider: data.provider,
//         providerId: data.providerId,
//         nickname: data.nickname,
//         assets: data.assets,
//         birth: data.birth,
//         collections: data.collections || [],
//       });
//     } catch (error) {
//       console.error("Failed to fetch user info:", error);
//     }
//   };
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PrivateRoute = () => {
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, setLogin, setLogout, setAccessToken } = useLoginStore();
  const navigateTo = useNavigate();
  const location = useLocation();
  const { setUserInfo } = useUserInfoStore(); // 스토어에서 상태와 함수 가져오기

  const fetchUserInfo = async () => {
    try {
      const data = await getMyInfo();
      if (!data) return;
      setUserInfo({
        isInitialized: true,
        memberId: data.memberId,
        name: data.name,
        email: data.email,
        provider: data.provider,
        providerId: data.providerId,
        nickname: data.nickname,
        assets: data.assets,
        birth: data.birth,
        collections: data.collections || [],
      });
    } catch (error) {
      // console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // 1. URL에서 인증 코드 확인
        // console.log("쿼리코드로 시작");
        const queryCode = query.get("code");
        if (queryCode) {
          try {
            // console.log("쿼리코드 내부", queryCode);
            const response = await getOAuthAccessToken(queryCode);
            if (response?.accessToken) {
              setAccessToken(response.accessToken);
              localStorage.setItem("accessToken", response.accessToken);
              setLogin();
              fetchUserInfo();
              // 나중에 마지막에 주석 풀고 code 안나오게 하기
              // navigateTo("/", { replace: true });
              setIsLoading(false);
              return;
            } else {
              // OAuth 토큰 발급은 성공했지만 accessToken이 없는 경우
              // console.error("OAuth token response missing accessToken");
              setLogout();
            }
          } catch (error) {
            // console.error("OAuth token error:", error);
            setLogout();
          }
        }

        // 2. 스토어에서 accessToken 확인
        const storedToken = localStorage.getItem("accessToken");

        if (storedToken) {
          // console.log("로컬 토큰으로 시작");
          setAccessToken(storedToken);
          setLogin();
          fetchUserInfo();
          // navigateTo("/", { replace: true });
          setIsLoading(false);
          return;
        }

        // 3. refreshToken으로 accessToken 재발급 시도
        try {
          // console.log("리프레시 토큰으로 시작");
          const newAccessToken = await getRefreshToken();
          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            setAccessToken(newAccessToken);
            setLogin();
            fetchUserInfo();
            // navigateTo("/", { replace: true });
            setIsLoading(false);
            return;
          } else {
            // console.error("Failed to get new access token");
            setLogout();
          }
        } catch (error) {
          // console.error("Refresh token error:", error);
          setLogout();
        }

        navigateTo("/login", { replace: true, state: { from: location } });
      } catch (error) {
        // console.error("Authentication check failed:", error);
        setLogout();
        setIsLoading(false);
        navigateTo("/login", { replace: true, state: { from: location } });
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLogin ? (
    <>
    <Header />
    <Notification />
    <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

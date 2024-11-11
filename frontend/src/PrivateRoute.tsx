import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getOAuthAccessToken } from "@/apis/userService";
import { getRefreshToken } from "@/apis/axiosInstance";
import useLoginStore from "@/stores/loginStore";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PrivateRoute = () => {
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, setLogin, setLogout } = useLoginStore();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // 1. 먼저 URL에서 인증 코드 확인
        const queryCode = query.get("code");
        if (queryCode) {
          try {
            const response = await getOAuthAccessToken(queryCode);
            if (response?.accessToken) {
              sessionStorage.setItem("accessToken", response.accessToken);
              setLogin();
              navigateTo("/", { replace: true });
              setIsLoading(false);
              return;
            } else {
              // OAuth 토큰 발급은 성공했지만 accessToken이 없는 경우
              console.error("OAuth token response missing accessToken");
              setLogout();
            }
          } catch (error) {
            console.error("OAuth token error:", error);
            setLogout();
          }
        }

        // 2. sessionStorage에서 accessToken 확인
        const storedToken = sessionStorage.getItem("accessToken");
        if (storedToken) {
          setLogin();
          setIsLoading(false);
          return;
        }

        // 3. refreshToken으로 accessToken 재발급 시도
        try {
          const newAccessToken = await getRefreshToken();
          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            setLogin();
            setIsLoading(false);
            return;
          } else {
            // refresh token으로 새 토큰 발급 실패
            console.error("Failed to get new access token");
            setLogout();
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          setLogout();
        }

        //  모든 인증 시도 실패
        navigateTo("/login", { replace: true, state: { from: location } });
      } catch (error) {
        // 전체 인증 프로세스 실패
        console.error("Authentication check failed:", error);
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
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

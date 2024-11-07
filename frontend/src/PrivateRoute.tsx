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
  const { isLogin, setLogin, setLogout, accessToken, setAccessToken } =
    useLoginStore();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // 1. URL에서 인증 코드 확인
        const queryCode = query.get("code");
        if (queryCode) {
          try {
            const response = await getOAuthAccessToken(queryCode);
            if (response?.accessToken) {
              setAccessToken(response.accessToken);
              setLogin();
              navigateTo("/", { replace: true });
              setIsLoading(false);
              return;
            } else {
              console.error("OAuth token response missing accessToken");
              setLogout();
            }
          } catch (error) {
            console.error("OAuth token error:", error);
            setLogout();
          }
        }

        // 2. 스토어에서 accessToken 확인
        if (accessToken) {
          setLogin();
          setIsLoading(false);
          return;
        }

        // 3. refreshToken으로 accessToken 재발급 시도
        try {
          const newAccessToken = await getRefreshToken();
          if (newAccessToken) {
            setAccessToken(newAccessToken); // 스토어에 accessToken 저장
            setLogin();
            setIsLoading(false);
            return;
          } else {
            console.error("Failed to get new access token");
            setLogout();
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          setLogout();
        }

        navigateTo("/login", { replace: true, state: { from: location } });
      } catch (error) {
        console.error("Authentication check failed:", error);
        setLogout();
        setIsLoading(false);
        navigateTo("/login", { replace: true, state: { from: location } });
      }
    };

    checkAuthentication();
  }, [
    query,
    navigateTo,
    location,
    accessToken,
    setAccessToken,
    setLogin,
    setLogout,
  ]);

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

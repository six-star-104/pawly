import { getOAuthAccessToken } from "@/apis/userService";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLoginStore } from "@/stores/loginStore";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PrivateRoute = () => {
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, login, logout } = useLoginStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // session에 accessToken이 존재하면 로그인이 된 것으로 간주
      const storedToken = sessionStorage.getItem("accessToken");
      if (storedToken) {
        login(storedToken); // 세션에 저장된 토큰으로 로그인 상태 유지
        setIsLoading(false);
        return;
      }

      // 소셜 로그인 후 main 페이지로 이동할 때
      // 발급 받은 code로 로그인 정보를 가져옴
      const queryCode = query.get("code");
      if (queryCode) {
        try {
          const response = await getOAuthAccessToken(queryCode);
          console.log(response);
          if (response && response.accessToken) {
            login(response.accessToken); // 로그인 시 accessToken 저장
            navigate("/", { replace: true });
          }
        } catch (error) {
          console.log(error);
          logout(); // 오류 발생 시 로그아웃 처리
        }
      } else {
        // 세션에 accessToken 정보가 없고 소셜 로그인 후가 아니라면 로그인 페이지로 리다이렉트
        logout();
        navigate("/login", { replace: true });
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, [query, login, logout, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

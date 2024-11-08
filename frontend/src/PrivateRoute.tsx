import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getOAuthAccessToken } from "@/apis/userService";
import { getRefreshToken } from "@/apis/axiosInstance";
import { setToken, getToken, removeToken } from '@/stores/tokenStorage';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PrivateRoute = () => {
  const query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // 1. Check for authorization code in the URL
        const queryCode = query.get("code");
        if (queryCode) {
          try {
            const response = await getOAuthAccessToken(queryCode);
            if (response?.accessToken) {
              await setToken(response.accessToken); // Store access token in IndexedDB
              setIsAuthenticated(true);
              setIsLoading(false);
              navigateTo("/", { replace: true });
              return;
            } else {
              console.error("OAuth token response missing accessToken");
              await removeToken();
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error("OAuth token error:", error);
            await removeToken();
            setIsAuthenticated(false);
          }
        }

        // 2. Check for an accessToken asynchronously with getToken
        const storedAccessToken = await getToken();
        if (storedAccessToken) {
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }

        // 3. Attempt to refresh the token if no valid accessToken was found
        try {
          const newAccessToken = await getRefreshToken();
          if (newAccessToken) {
            await setToken(newAccessToken); // Save refreshed accessToken in IndexedDB
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          } else {
            console.error("Failed to refresh access token");
            await removeToken();
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Refresh token error:", error);
          await removeToken();
          setIsAuthenticated(false);
        }

        // Redirect to login if all attempts fail
        navigateTo("/login", { replace: true, state: { from: location } });
      } catch (error) {
        console.error("Authentication check failed:", error);
        await removeToken();
        setIsAuthenticated(false);
        setIsLoading(false);
        navigateTo("/login", { replace: true, state: { from: location } });
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;

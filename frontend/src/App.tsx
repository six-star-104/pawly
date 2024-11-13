// import { useEffect } from "react";
import Router from "@/Router";
import MobileLayout from "@/styles/MobileLayout";
import "./firebase-messaging-sw.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
// import { getEasterEggs } from "@/apis/easterEggService";
// import { getMyInfo } from "@/apis/myPageService";
// import useEasterEggStore from "@/stores/easterEggStore";
// import { useUserInfoStore } from "@/stores/mypageStore";

import { useLocation } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.js";
// import { getMyInfo } from "@/apis/myPageService";
// import  useUserInfoStore  from "@/stores/userInfoStore.js";

// 이 페이지 주석친 부분들이, 어짜피 로그인 로직인데 소셜쪽에서 한꺼번에 처리하는게 안 낫나 싶어서
// 없어도 작동 이상 없어보이는데

function App() {
  const location = useLocation();
  // const { setEasterEggs, isInitialized: isEasterEggInitialized } = useEasterEggStore();
  // const { setUserInfo, isInitialized: isUserInfoInitialized } = useUserInfoStore();

  // useEffect(() => {
  //   const fetchEasterEggs = async () => {
  //     try {
  //       const response = await getEasterEggs();
  //       if (response.status === "success") {
  //         setEasterEggs(response.data);
  //       }
  //     } catch (error) {
  //       console.error("초기 이스터에그 데이터 로드 실패:", error);
  //     }
  //   };

  //   if (!isEasterEggInitialized) {
  //     fetchEasterEggs();
  //   }
  // }, [isEasterEggInitialized, setEasterEggs]);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const data = await getMyInfo();
  //       setUserInfo({
  //         isInitialized: true,
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
  //       console.error("사용자 정보 로드 실패:", error);
  //     }
  //   };

  //   if (!isUserInfoInitialized) {
  //     fetchUserInfo();
  //   }
  // }, [isUserInfoInitialized, setUserInfo]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {location.pathname !== "/admin" ? (
          <MobileLayout>
            <GlobalStyles />
            <Router />
          </MobileLayout>
        ) : (
          <Router />
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;

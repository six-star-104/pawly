/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  container,
  BtnContainer,
  HamBtnCss,
  slidePanelStyle,
  panelContentStyle,
} from "./styles";
import { Hamberger } from "../Hamberger";
import NavButton from "../../assets/icons/hamburgerBtn.png";
import { logout } from "@/apis/userService";
import { useNavigate } from "react-router-dom";
// import { useUserInfoStore } from "@/stores/userInfoStore"; // 스토어 가져오기
// import { getMyInfo } from "@/apis/myPageService"; // 사용자 정보 API 가져오기

export const Main = () => {
  const navigateTo = useNavigate();
  const [mypageVisible, setMyPageVisible] = useState(false);
  // const { isInitialized, setUserInfo } = useUserInfoStore(); // 스토어에서 상태와 함수 가져오기

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

  //   // 초기화되지 않았다면 사용자 정보를 가져옴
  //   if (!isInitialized) {
  //     fetchUserInfo();
  //   }
  // }, [isInitialized, setUserInfo]);

  // const userBtn = () => {
  //   console.log("유저페이지 클릭");
  // };

  const Hambtn = () => {
    // console.log("햄버거 클릭");
    setMyPageVisible(true); // 슬라이딩 패널을 보이게
  };

  const closeMyPage = () => {
    setMyPageVisible(false); // 슬라이딩 패널 숨기기
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    navigateTo("/login");
  };

  const adminMove = () => {
    navigateTo("/admin")
  }

  return (
    <div css={container}>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={adminMove}>Admin</button>
      <div css={BtnContainer}>
        {/* <button css={userBtnCss} onClick={userBtn}>
          <img
            src="https://unpkg.com/pixelarticons@1.8.1/svg/user.svg"
            alt="유저 버튼"
            width="30"
            height="30"
          />
        </button> */}

        <button css={HamBtnCss} onClick={Hambtn} className="nes-btn">
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      {/* 슬라이딩 패널 */}
      <div
        css={[slidePanelStyle, mypageVisible && { transform: "translateX(0)" }]}
      >
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>
    </div>
  );
};

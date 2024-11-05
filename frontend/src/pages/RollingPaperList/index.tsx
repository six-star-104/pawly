/** @jsxImportSource @emotion/react */
import PixelContainer from "@/components/PixelContainer";
// import { data } from "./mockdata";
import { useFetchUserRollingpapers } from "../../hooks/useFetchUserRollingpaper"
import {
  ListContainer,
  ContentContainer,
  backButton,
  container,
} from "./styles";
import { useNavigate } from "react-router-dom";
import backButtonImg from "@/assets/images/back_button.png";
// 내가 받은 롤링페이퍼들 모아볼 수 있는 페이지
export const RollingPaperList = () => {
  const navigate = useNavigate();

  const { userRollingpapers } = useFetchUserRollingpapers();

  return (
    <div css={container}>
      <button css={backButton} onClick={() => navigate(-1)}>
        <img src={backButtonImg} alt="" />
      </button>
      <h2>나의 롤링페이퍼들</h2>
      <div css={ListContainer}>
        {userRollingpapers &&
          userRollingpapers.content.map((rollingpaper) => (
            //  여기다가 링크 걸어놓기

            <PixelContainer width="75%" height="8vh">
              <div
                css={ContentContainer}
                onClick={() => navigate(`${rollingpaper.rollingPaperId}`)}
              >
                {rollingpaper.title}
              </div>
            </PixelContainer>
          ))}
      </div>
    </div>
  );
};

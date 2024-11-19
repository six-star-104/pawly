import styled from "@emotion/styled";
import backgroundImage from "@/assets/images/background.png";

export const BackGround = () => {
  return (
    <div>
      <Container>
        <BackgroundImg />
        <BackgroundDiv />
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; /* 배경이 클릭을 방해하지 않도록 설정 */
`;

const BackgroundImg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  opacity: 1;
  transition: opacity 0.5s;
`;

const BackgroundDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.25); /* 투명도 있는 흰색 레이어 */
  z-index: 1;
  opacity: 1;
  transition: opacity 0.5s;
`;

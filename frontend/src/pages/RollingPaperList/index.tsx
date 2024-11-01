/** @jsxImportSource @emotion/react */
import PixelContainer from "@/components/PixelContainer";
import { data } from "./mockdata";
import { ListContainer, ContentContainer } from "./styles";
// 내가 받은 롤링페이퍼들 모아볼 수 있는 페이지
export const RollingPaperList = () => {
  const rollingpaperTemplate = (title: string) => {
    return <div css={ContentContainer}>{title}</div>;
  };
  return (
    <div>
      <h1>나의 롤링페이퍼들</h1>
      {data.content.map((rollingpaper) => (
        <div css={ListContainer}>
          <PixelContainer
            width="80%"
            height="10vh"
            children={rollingpaperTemplate(rollingpaper.title)}
          />
        </div>
      ))}
    </div>
  );
};

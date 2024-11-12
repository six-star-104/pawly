/** @jsxImportSource @emotion/react */
import { bubbleStyle, pixelLock } from "./PreviewPostit.style";
import { PreviewPostItProps } from "./PreviewPostit.type";
// import { PixelLock } from "@/assets/icons/lock-padlock-privacy-svgrepo-com.svg";
// import Lock from '@/assets/icons/lock-padlock-privacy-svgrepo-com.svg'
// import NewLock from '@/assets/icons/lock_svg.svg'
import NewLock from "@/assets/icons/nnnn.svg?react";

import { useRollingpaperStore } from "@/stores/rollingpaperStore";
export const PreviewPostIt: React.FC<PreviewPostItProps> = ({
  //   theme,
  themeName,
  background,
  fontColor,
  borderColor,
  flag,
}) => {
  const { isAlert } = useRollingpaperStore();
  return (
    <div css={pixelLock(flag, isAlert)}>
      <div
        css={bubbleStyle(
          fontColor,
          borderColor,
          // 배경이 있으면 => 남은 자투리 배경색이 테두리색 따라가게
          // 배경색
          background?.startsWith("#") ? background : borderColor,
          // 이미지
          background?.startsWith("#") ? null : background
          // flag
        )}
        className={`bubble `}
      >
        {flag ? themeName : " "}
      </div>
      <div id="lockimg">
        <NewLock width="36" height="36" fill={fontColor} // 여기서 원하는 색깔 동적으로 할당해주면 됨
        />
      </div>
    </div>
  );
};

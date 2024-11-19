import React from "react";
import { ArrowSelectContainerProps } from "./ArrowSelectContainer.type";
import {
  ArrowContainer,
  ArrowButton,
  FontSelector,
} from "./ArrowSelectContainer.style";
import { PreviewPostIt } from "../PreviewPostit";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
const ArrowSelectContainer: React.FC<ArrowSelectContainerProps> = ({
  preViewPostIt,
  setPreviewPostIt,
  forWhat,
  themes,
}) => {
  const sizeArray = ["보통", "작게", "크게"];
  const fontArray = [
    { name: "갈무리", font: "Galmuri9" },
    { name: "스타더스트", font: "PFStardust" },
    { name: "둥근모", font: "DGM" },
  ];

  const { setIsAbleTheme } = useRollingpaperStore();

  const decreaseIndex = () => {
    switch (forWhat) {
      case "themeId":
        setPreviewPostIt((prev) => ({
          ...prev,
          themeId: ((prev.themeId + themes!.length - 2) % themes!.length) + 1,
        }));
        setIsAbleTheme(
          themes![(preViewPostIt.themeId + themes!.length - 2) % themes!.length]
            ?.flag
        );
        break;
      case "font":
        setPreviewPostIt((prev) => ({
          ...prev,
          font: ((prev.font + fontArray.length - 2) % fontArray.length) + 1,
        }));
        break;
      case "speechBubbleSize":
        setPreviewPostIt((prev) => ({
          ...prev,
          speechBubbleSize:
            ((prev.speechBubbleSize + sizeArray.length - 2) %
              sizeArray.length) +
            1,
        }));
        break;
    }
  };
  const increaseIndex = () => {
    switch (forWhat) {
      case "themeId":
        setPreviewPostIt((prev) => ({
          ...prev,
          themeId: (prev.themeId % themes!.length) + 1,
        }));
        setIsAbleTheme(themes![preViewPostIt.themeId % themes!.length]?.flag);
        break;
      case "font":
        setPreviewPostIt((prev) => ({
          ...prev,
          font: (prev.font % fontArray.length) + 1,
        }));
        break;
      case "speechBubbleSize":
        setPreviewPostIt((prev) => ({
          ...prev,
          speechBubbleSize: (prev.speechBubbleSize % sizeArray.length) + 1,
        }));
        break;
    }
  };

  return (
    <div css={ArrowContainer(forWhat)}>
      <button css={ArrowButton} onClick={() => decreaseIndex()}>
        ◀
      </button>
      {forWhat === "themeId" ? (
        <div>
          {/* 미리보기용 포스트잇 */}
          <PreviewPostIt
            // 미리보기용 임시 id
            themeName={themes![preViewPostIt.themeId - 1]?.themeName}
            background={themes![preViewPostIt.themeId - 1]?.background}
            fontColor={themes![preViewPostIt.themeId - 1]?.fontColor}
            borderColor={themes![preViewPostIt.themeId - 1]?.borderColor}
            flag={themes![preViewPostIt.themeId - 1]?.flag}
          />
        </div>
      ) : forWhat === "font" ? (
        <div css={FontSelector(fontArray[preViewPostIt.font - 1].font)}>
          {fontArray[preViewPostIt.font - 1].name}
        </div>
      ) : (
        <div>{sizeArray[preViewPostIt.speechBubbleSize - 1]}</div>
      )}

      <button css={ArrowButton} onClick={() => increaseIndex()}>
        ▶
      </button>
    </div>
  );
};

export default ArrowSelectContainer;

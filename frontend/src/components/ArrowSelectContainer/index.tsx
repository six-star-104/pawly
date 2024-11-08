import React from "react";
import { ArrowSelectContainerProps } from "./ArrowSelectContainer.type";
import { ArrowContainer, ArrowButton } from "./ArrowSelectContainer.style";
import { PostIt } from "../PostIt";
const ArrowSelectContainer: React.FC<ArrowSelectContainerProps> = ({
  preViewPostIt,
  setPreviewPostIt,
  forWhat,
}) => {
  // const [nowIndex, setNowIndex] = useState(0);

  // 여기서 기본값들 셋팅해주기....?? 나중엔 api로 받아오는걸로 처리
  const sizeArray = ["작게", "보통", "크게"];
  const fontArray = ["기본", "다른거", "또다른거"];
  const themeArray = [
    {
      backgroundColor: "#ffffff",
      fontColor: "#000000",
      borderColor: "#000000",
      image: "",
      themeName: "기본",
      base: true,
    },
    {
      backgroundColor: "red",
      fontColor: "#ffffff",
      borderColor: "red",
      image: "",
      themeName: "레드",
      base: true,
    },
    // {
    //   backgroundColor: "#000000",
    //   fontColor: "#ffffff",
    //   borderColor: "#000000",
    //   image: "",
    //   themeName: "다크",
    //   base: true,
    // },
    // {
    //   backgroundColor: "#000000",
    //   fontColor: "#ffffff",
    //   borderColor: "#000000",
    //   image:
    //     "https://st2.depositphotos.com/46898394/50276/v/380/depositphotos_502768918-stock-illustration-pixel-art-halloween-seamless-pattern.jpg",
    //   themeName: "할로윈",
    //   base: true,
    // },
  ];

  const decreaseIndex = () => {
    switch (forWhat) {
      case "themeId":
        setPreviewPostIt((prev) => ({
          ...prev,
          themeId: (prev.themeId + themeArray.length - 1) % themeArray.length,
        }));
        break;
      case "font":
        setPreviewPostIt((prev) => ({
          ...prev,
          font: (prev.font + fontArray.length - 1) % fontArray.length,
        }));
        break;
      case "speechBubbleSize":
        setPreviewPostIt((prev) => ({
          ...prev,
          speechBubbleSize:
            (prev.speechBubbleSize + sizeArray.length - 1) % sizeArray.length,
        }));
        break;
    }
  };
  const increaseIndex = () => {
    switch (forWhat) {
      case "themeId":
        setPreviewPostIt((prev) => ({
          ...prev,
          themeId: (prev.themeId + 1) % themeArray.length,
        }));
        break;
      case "font":
        setPreviewPostIt((prev) => ({
          ...prev,
          font: (prev.font + 1) % fontArray.length,
        }));
        break;
      case "speechBubbleSize":
        setPreviewPostIt((prev) => ({
          ...prev,
          speechBubbleSize: (prev.speechBubbleSize + 1) % sizeArray.length,
        }));
        break;
    }
  };

  return (
    <div css={ArrowContainer}>
      <button css={ArrowButton} onClick={() => decreaseIndex()}>
        ◀️
      </button>
      {forWhat === "themeId" ? (
        <div>
          {/* 미리보기용 포스트잇 */}
          <PostIt
            setRefetchKey={()=>""}
            // 미리보기용 임시 id
            postitId={0}
            props={{
              ...themeArray[
                (preViewPostIt.themeId - 1 + themeArray.length) %
                  themeArray.length
              ],
              themeId: preViewPostIt.themeId,
              font: preViewPostIt.font,
              content:
                themeArray[
                  (preViewPostIt.themeId - 1 + themeArray.length) %
                    themeArray.length
                ].themeName,
              // 디폴트 사이즈로 줄까?
              speechBubbleSize: 0,
            }}
            isPreview={true}
          />
        </div>
      ) : forWhat === "font" ? (
        <div>
          {
            fontArray[
              (preViewPostIt.font - 1 + fontArray.length) % fontArray.length
            ]
          }
        </div>
      ) : (
        <div>
          {
            sizeArray[
              (preViewPostIt.speechBubbleSize - 1 + sizeArray.length) %
                sizeArray.length
            ]
          }
        </div>
      )}

      <button css={ArrowButton} onClick={() => increaseIndex()}>
        ▶️
      </button>
    </div>
  );
};

export default ArrowSelectContainer;

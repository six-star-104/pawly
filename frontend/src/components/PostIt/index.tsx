/** @jsxImportSource @emotion/react */
import { PostItProps } from "./PostIt.type";
import { bubbleStyle, fromWho } from "./PostIt.style";

export const PostIt: React.FC<PostItProps> = ({ props }) => {
  const randomDir = ["top", "right", "left", "bottom"];
  const randomArrow = randomDir[Math.floor(Math.random() * 4)];

  const speechBubbleSize = ["mini", "", "medium"];

  // 나중에 색 정해지면 다 바꿔주기
  const randomTextColor = ["black", "white", "blue", "red", "yellow"];
  const randomBgColor = ["white", "black", "blue", "red", "yellow"];
  const randomBorderColor = ["black", "white", "blue", "red", "yellow"];

  return (
    <div
      css={bubbleStyle(
        randomTextColor[props.fontColorer],
        randomBorderColor[props.borderColorer],
        randomBgColor[props.backgroundColorer!],
        props.image!,
      )}
      className={`bubble ${randomArrow} ${
        speechBubbleSize[props.speechBubbleSize]
      } 
      `}
    >
      {props.content}
      <div css={fromWho}>- {props.memberNickname}</div>
    </div>
  );
};

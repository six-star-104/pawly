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

  //이런식으로 s3주소 넣어줘야됨
  const backgroundImage =
    "https://st2.depositphotos.com/46898394/50276/v/380/depositphotos_502768918-stock-illustration-pixel-art-halloween-seamless-pattern.jpg";

  return (
    <div
      css={bubbleStyle(
        randomTextColor[props.fontColorer],
        randomBorderColor[props.borderColorer],
        randomBgColor[props.backgroundColorer!],
        backgroundImage
      )}
      className={`bubble ${randomArrow} ${randomTextColor[props.fontColorer]} ${
        speechBubbleSize[props.speechBubbleSize]
      } 
      ${randomBorderColor[props.borderColorer]}
      `}
    >
      {props.content}
      <div css={fromWho}>- {props.memberNickname}</div>
    </div>
  );
};

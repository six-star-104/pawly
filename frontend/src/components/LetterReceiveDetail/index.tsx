import { useState } from "react";
import {
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  closeButtonStyle,
  modalBodyStyle,
  reactionIconsStyle,
  modalActionsStyle,
} from "./LetterReceiveDetail.style";
import { Button } from "@/components/Button";
import { IReceiveLetter } from "@/types/letterTypes";
import { useQuery } from "@tanstack/react-query";
import { getReceiveLetterDetail } from "@/apis/letterService";

interface LetterReceiveDetailProps {
  receiveLetterId: number;
  onClose: () => void;
}

export const LetterReceiveDetail: React.FC<LetterReceiveDetailProps> = ({
  receiveLetterId,
  onClose,
}) => {
  const [reactionIcon, setReactionIcon] = useState<JSX.Element | null>(null);

  const handleReactionChange = (icon: JSX.Element) => {
    setReactionIcon(icon);
  };

  const { data: letterDetail } = useQuery<IReceiveLetter>({
    queryKey: ["receiveLetterList"],
    queryFn: () => getReceiveLetterDetail(receiveLetterId),
  });
  console.log(letterDetail);
  return (
    <div>
      <div css={modalOverlayStyle}>
        <div css={modalContentStyle}>
          <div css={modalHeaderStyle}>
            <span>From. {letterDetail?.senderName}</span>
            <button css={closeButtonStyle} onClick={onClose}>
              ✖️
            </button>
          </div>
          <div css={modalBodyStyle}>
            <p>{letterDetail?.content}</p>
            <p>반응: {reactionIcon}</p>
          </div>
          <div css={modalActionsStyle}>
            <div css={reactionIconsStyle}>
              <i
                className="nes-icon is-small heart"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small heart"></i>
                  )
                }
              ></i>
              <i
                className="nes-icon is-small star"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small star"></i>
                  )
                }
              ></i>
              <i
                className="nes-icon is-small like"
                onClick={() =>
                  handleReactionChange(
                    <i className="nes-icon is-small like"></i>
                  )
                }
              ></i>
            </div>
            <Button handler={onClose}>답장하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as style from "./LetterReceiveDetail.style";
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
  const { data: letterDetail } = useQuery<IReceiveLetter>({
    queryKey: ["receiveLetterList"],
    queryFn: () => getReceiveLetterDetail(receiveLetterId),
  });

  return (
    <div css={style.modalOverlayStyle}>
      <div css={style.modalContentStyle}>
        <style.modalHeader>
          <span>From. {letterDetail?.senderName}</span>
          <button css={style.deleteIcon}>
            <img
              src="https://unpkg.com/pixelarticons@1.8.1/svg/trash.svg"
              alt="삭제"
              width={20}
              height={20}
            />
          </button>
          <button css={style.closeButtonStyle} onClick={onClose}>
            ✖️
          </button>
        </style.modalHeader>
        <div css={style.letterContent}>
          <p>{letterDetail?.content}</p>
        </div>
        <div css={style.modalActionsStyle}>
          <div css={style.reactionIconsStyle}>
            <i className="nes-icon is-small heart"></i>
            <i className="nes-icon is-small star"></i>
            <i className="nes-icon is-small like"></i>
          </div>
          <Button handler={onClose}>답장하기</Button>
        </div>
      </div>
    </div>
  );
};

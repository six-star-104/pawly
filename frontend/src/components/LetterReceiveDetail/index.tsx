import * as style from "./LetterReceiveDetail.style";
import { IReceiveLetter } from "@/types/letterTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReveiveLetter,
  getReceiveLetterDetail,
  reactToReceiveLetter,
} from "@/apis/letterService";
import { useEffect, useState } from "react";
import ModalConfirm from "../ModalConfirm";
import replyHeart from "@/assets/icons/replyHeart.svg";
import replyLike from "@/assets/icons/replyLike.svg";
import replyStar from "@/assets/icons/replyStar.svg";
import { LetterWrite } from "../LetterWrite";
import ModalLetter from "../ModalLetter";

interface LetterReceiveDetailProps {
  receiveLetterId: number;
  onClose: () => void;
}

export const LetterReceiveDetail: React.FC<LetterReceiveDetailProps> = ({
  receiveLetterId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [reaction, setReaction] = useState<number | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const { data: letterDetail, refetch } = useQuery<IReceiveLetter>({
    queryKey: ["receiveLetterDetail", receiveLetterId],
    queryFn: () => getReceiveLetterDetail(receiveLetterId),
  });

  useEffect(() => {
    if (letterDetail && letterDetail.reaction !== undefined) {
      setReaction(letterDetail.reaction);
    }
  }, [letterDetail]);

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteReveiveLetter(receiveLetterId);
    queryClient.invalidateQueries({ queryKey: ["receiveLetterList"] });
    setIsConfirmOpen(false);
    onClose();
  };

  const handleIconClick = async (iconReaction: number) => {
    setReaction(iconReaction);
    try {
      await reactToReceiveLetter(receiveLetterId, iconReaction);
      await refetch();
    } catch (error) {
      console.error("Failed to react to letter", error);
    }
  };

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  return (
    <>
      <style.modalHeader>
        <span>From. {letterDetail?.senderName}</span>
        <div>
          <button css={style.deleteIcon} onClick={handleDelete}>
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
        </div>
      </style.modalHeader>
      <div css={style.letterContent}>
        <p>{letterDetail?.content}</p>
      </div>
      <img src={letterDetail?.picture} css={style.pictureStyle} />

      <ModalConfirm
        isOpen={isConfirmOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        messageMain="정말 삭제하시겠습니까?"
      />

      <div css={style.modalActionsStyle}>
        <div css={style.reactionIconsStyle}>
          <div
            css={[
              style.iconContainer,
              reaction === 1 && style.selectedIconBorder,
            ]}
            onClick={() => handleIconClick(1)}
          >
            <img src={replyHeart} css={style.replyIcon} />
          </div>
          <div
            css={[
              style.iconContainer,
              reaction === 2 && style.selectedIconBorder,
            ]}
            onClick={() => handleIconClick(2)}
          >
            <img src={replyLike} css={style.replyIcon} />
          </div>
          <div
            css={[
              style.iconContainer,
              reaction === 3 && style.selectedIconBorder,
            ]}
            onClick={() => handleIconClick(3)}
          >
            <img src={replyStar} css={style.replyIcon} />
          </div>
        </div>

        <button css={style.replyButton} onClick={openReplyModal}>
          답장하기
        </button>
      </div>

      {isReplyModalOpen && (
        <ModalLetter isOpen={isReplyModalOpen} onClose={closeReplyModal}>
          <LetterWrite
            recipientId={letterDetail?.senderId || 0}
            recipientName={letterDetail?.senderName || ""}
            onClose={closeReplyModal}
          />
        </ModalLetter>
      )}
    </>
  );
};

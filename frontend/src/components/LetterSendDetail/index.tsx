import * as style from "./LetterSendDetail.style";
import { ISendLetter } from "@/types/letterTypes";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSendLetterDetail, deleteSendLetter } from "@/apis/letterService";
import ModalConfirm from "@/components/ModalConfirm";

interface LetterSendDetailProps {
  sendLetterId: number;
  onClose: () => void;
}

export const LetterSendDetail: React.FC<LetterSendDetailProps> = ({
  sendLetterId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data: letterDetail } = useQuery<ISendLetter>({
    queryKey: ["sendLetterList", sendLetterId],
    queryFn: () => getSendLetterDetail(sendLetterId),
  });

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await deleteSendLetter(sendLetterId);
    queryClient.invalidateQueries({ queryKey: ["sendLetterList"] });
    setIsConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <style.modalHeader>
        <span>To. {letterDetail?.recipientName}</span>
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
        messageWarn={[
          "나의 보낸 편지함에서만 삭제되고,",
          "친구의 편지함에서는 삭제되지 않습니다.",
        ]}
      />
    </>
  );
};

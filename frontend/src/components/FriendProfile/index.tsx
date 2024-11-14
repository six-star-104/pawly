import ModalLetter from "@/components/ModalLetter";
import * as style from "./FriendProfile.style";
import { getMemberInfo, deleteFriend } from "@/apis/friendsService";
import { useEffect, useState } from "react";
import { FriendType } from "@/types/FriendsTypes";
import ModalConfirm from "../ModalConfirm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LetterWrite } from "@/components/LetterWrite";

interface FriendProfileProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number;
  showActions: string;
}

export const FriendProfile = ({
  isOpen,
  onClose,
  memberId,
  showActions,
}: FriendProfileProps) => {
  const queryClient = useQueryClient();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const { data: memberInfo, refetch } = useQuery<FriendType>({
    queryKey: ["memberInfo", memberId],
    queryFn: () => getMemberInfo(memberId),
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);
  const handleDeleteFriend = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = async (memberId: number) => {
    await deleteFriend(memberId);
    queryClient.invalidateQueries({ queryKey: ["friendList"] });
    setIsConfirmOpen(false);
    onClose();
  };

  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  return (
    <>
      <ModalLetter isOpen={isOpen} onClose={onClose}>
        <style.modalHeader>
          <button css={style.closeButtonStyle} onClick={onClose}>
            ✖️
          </button>
        </style.modalHeader>
        <style.modalContentStyle>
          {memberInfo ? (
            <div css={style.profileContainer}>
              <div css={style.nickname}>{memberInfo.nickname}</div>
              <div css={style.name}>{memberInfo.name}</div>
              <img
                src={memberInfo.assets}
                alt={`${memberInfo.nickname} 이미지`}
                css={style.assetImage}
              />
            </div>
          ) : (
            <p>회원 정보를 불러오는 중입니다...</p>
          )}
          {showActions === "list" && (
            <div css={style.buttonContainer}>
              <style.deleteButton onClick={handleDeleteFriend}>
                친구 삭제
              </style.deleteButton>
              <style.writeLetterButton onClick={openWriteModal}>
                편지 쓰기
              </style.writeLetterButton>
            </div>
          )}
        </style.modalContentStyle>
      </ModalLetter>

      <ModalConfirm
        isOpen={isConfirmOpen}
        onConfirm={() => memberInfo && confirmDelete(memberInfo.memberId)}
        onCancel={() => setIsConfirmOpen(false)}
        messageMain="정말 삭제하시겠습니까?"
      />

      {isWriteModalOpen && (
        <ModalLetter isOpen={isWriteModalOpen} onClose={closeWriteModal}>
          <LetterWrite
            recipientId={memberInfo?.memberId || 0}
            recipientName={memberInfo?.nickname || ""}
            onClose={closeWriteModal}
          />
        </ModalLetter>
      )}
    </>
  );
};

import * as style from "./FriendList.style";
import { getFriendList } from "@/apis/friendsService";
import { FriendType } from "@/types/FriendsTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FriendProfile } from "@/components/FriendProfile";
import ModalAlert from "../ModalAlert";

export const FriendList = () => {
  const { data: friendList = [] } = useQuery<FriendType[]>({
    queryKey: ["friendList"],
    queryFn: getFriendList,
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const openDetailModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedMemberId(null);
    setIsDetailModalOpen(false);
  };

  const handleFriendDeleted = () => {
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 1500);
  };

  return (
    <>
      <div css={style.Container}>
        <div css={style.friendListContainer}>
          {friendList?.length > 0 ? (
            friendList.map((friend) => (
              <div
                css={style.friendItem}
                key={friend.friendId}
                onClick={() => openDetailModal(friend.memberId)}
              >
                <div css={style.contentContainer}>
                  <img src={friend.assets} css={style.asset} />
                  <div>
                    <div css={style.nickname}>{friend.nickname}</div>
                    <div css={style.name}>{friend.name}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div css={style.friendItem}>
              <div css={style.noFriend}>아직 친구가 없습니다.</div>
            </div>
          )}
        </div>
      </div>

      {selectedMemberId && (
        <FriendProfile
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          memberId={selectedMemberId}
          showActions="list"
          onFriendDeleted={handleFriendDeleted}
        />
      )}
      <ModalAlert isOpen={showDeleteAlert} message="친구 삭제 완료" />
    </>
  );
};

import * as style from "./FriendRequest.style";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFriendRequestsReceived,
  getFriendRequestsSent,
  responseToFriendRequest,
  deleteMyRequest,
} from "@/apis/friendsService";
import {
  FriendRequestType,
  FriendRequestResponseType,
} from "@/types/FriendsTypes";
import { useState } from "react";
import { FriendProfile } from "../FriendProfile";

export const FriendRequest = () => {
  const queryClient = useQueryClient();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const openDetailModal = (memberId: number) => {
    setSelectedMemberId(memberId);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedMemberId(null);
    setIsDetailModalOpen(false);
  };

  const { data: receivedRequest = [] } = useQuery<FriendRequestType[]>({
    queryKey: ["receivedRequest"],
    queryFn: getFriendRequestsReceived,
  });

  const { data: sentRequest = [] } = useQuery<FriendRequestType[]>({
    queryKey: ["sentRequest"],
    queryFn: getFriendRequestsSent,
  });

  const { mutate: respondToRequest } = useMutation({
    mutationFn: ({ friendId, status }: FriendRequestResponseType) =>
      responseToFriendRequest(friendId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["receivedRequest"] });
    },
    onError: (error) => {
      console.log("Failed to respond to friend request", error);
    },
  });

  const { mutate: cancelFriendRequest } = useMutation({
    mutationFn: (memberId: number) => deleteMyRequest(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentRequest"] });
    },
    onError: (error) => {
      console.log("Failed to cancel friend request", error);
    },
  });
  return (
    <>
      <div css={style.Container}>
        <div css={style.friendRequestContainer}>
          {receivedRequest?.length > 0 &&
            receivedRequest.map((request) => (
              <div
                css={style.receiveRequestItem}
                key={request.friendId}
                onClick={() => openDetailModal(request.memberId)}
              >
                <div css={style.contentContainer}>
                  <img src={request.assets} css={style.asset} />
                  <div css={style.nicknameWrapper}>
                    <div css={style.nicknameContainer}>
                      <div css={style.nickname}>{request.nickname}</div>
                    </div>
                    <div css={style.responseIconContainer}>
                      {/* prettier-ignore */}
                      <button
                        css={style.responseIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          respondToRequest({ friendId: request.friendId, status: true });
                        }}
                      >
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/check.svg" alt="수락"/>
                      </button>
                      {/* prettier-ignore */}
                      <button 
                        css={style.responseIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          respondToRequest({ friendId: request.friendId, status: false });
                        }}
                      >
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="거절"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {sentRequest?.length > 0 &&
            sentRequest.map((request) => (
              <div
                css={style.sentRequestItem}
                key={request.friendId}
                onClick={() => openDetailModal(request.memberId)}
              >
                <div css={style.contentContainer}>
                  <img src={request.assets} css={style.asset} />
                  <div css={style.nicknameWrapper}>
                    <div css={style.nicknameContainer}>
                      <div css={style.nickname}>{request.nickname}</div>
                      <div css={style.waitingContainer}>
                        <div css={style.waiting}>수락 대기</div>
                        {/* prettier-ignore */}
                        <button 
                          css={style.responseIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelFriendRequest(request.memberId);
                          }}
                        >
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="친구요청취소"/>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {selectedMemberId && (
        <FriendProfile
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          memberId={selectedMemberId}
          showActions={false}
        />
      )}
    </>
  );
};

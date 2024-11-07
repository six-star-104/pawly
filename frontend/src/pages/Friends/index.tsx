import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hamberger } from '../Hamberger';
import NavButton from '../../assets/icons/NavButton.png';
import PixelPuppy from '../../assets/icons/PixelPuppy.png';
import CancelButton from '../../assets/icons/CancelButton.png';
import Warning from '../../assets/icons/Warning.png';
import BackButton from '../../assets/icons/BackButton.png';
import Modal from '@/components/Modal';
import {
  Container,
  BackBtnContainer,
  HamBtnContainer,
  HamBtnCss,
  BackBtnCss,
  slidePanelStyle,
  panelContentStyle,
  searchPixelContainerWrapper,
  searchContainer,
  tabContainer,
  friendListContainer,
  friendItem,
  friendName,
  friendActionIcons,
  modalOverlayStyle,
  modalContentStyle,
  modalHeaderStyle,
  modalInputStyle,
  sendButtonStyle,
  closeButtonStyle,
  searchResultsContainer,
  searchResultItem,
  searchResultText,
  searchResultActions,
  deleteModalOverlayStyle,
  deleteModalContentStyle,
  warningIconStyle,
} from './styles';
import { searchUserByNickname } from '@/apis/userSearchService';
import { postFriendRequest, getFriendRequestsReceived, getFriendRequestsSent, respondToFriendRequest, getFriendList, deleteFriend, getMemberInfo } from '@/apis/friendsService';

interface Member {
  nickname: string;
  name?: string;
  assets: string;
  memberId: number;
  friendId?: number;
  birth?: string;
}

export const Friends = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Member[]>([]);
  const [sentRequests, setSentRequests] = useState<Member[]>([]);
  const [friends, setFriends] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const navigate = useNavigate();

  const backBtn = () => {
    navigate(-1);
  };

  const Hambtn = () => {
    setMyPageVisible(true);
  };

  const closeMyPage = () => {
    setMyPageVisible(false);
  };

  const openMessageModal = () => {
    setIsModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const openAlertModal = (message: string) => {
    setAlertMessage(message);
    setAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  const openDetailModal = async (memberId: number) => {
    try {
      const response = await getMemberInfo(memberId);

      console.log("회원 정보 응답 데이터:", response.data);

      if (response.status === "success" && response.data) {
        const memberData: Member = {
          nickname: response.data.nickname,
          name: response.data.name,
          assets: response.data.assets || "",
          memberId: response.data.memberId,
          birth: response.data.birth || "",
        };
        setSelectedMember(memberData);
        setIsDetailModalOpen(true);
      } else {
        console.error("회원 정보가 비어 있거나 잘못된 응답입니다.");
      }
    } catch (error) {
      console.error("회원 정보 조회 중 오류가 발생했습니다:", error);
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedMember(null);
  };

  const handleSend = () => {
    console.log("전송된 메시지:", message);
    setMessage("");
    closeMessageModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const results = await searchUserByNickname(searchTerm);
      const modifiedResults = results.map((user: Member) => ({ ...user, friendId: undefined }));
      setSearchResults(modifiedResults);
    } catch (error) {
      setError("검색에 실패했습니다. 다시 시도해 주세요.");
      console.error("검색 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFriendRequest = async (memberId: number) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await postFriendRequest(memberId);
      if (response.status === "success") {
        openAlertModal("친구 요청을 보냈습니다.");
        setSearchResults(prev => prev.filter(user => user.memberId !== memberId));
      } else {
        openAlertModal("친구 요청에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("친구 요청 오류:", error);
      openAlertModal("친구 요청 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteFriend = async (memberId: number) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await deleteFriend(memberId);
      if (response.status === "success") {
        openAlertModal("친구를 삭제했습니다.");
        setFriends(prev => prev.filter(friend => friend.memberId !== memberId));
      } else {
        openAlertModal("친구 삭제에 실패했습니다.");
      }
    } catch (error: any) {
      console.error("친구 삭제 오류:", error);
      openAlertModal("친구 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResponseToFriendRequest = async (friendId: number, isAccepted: boolean) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await respondToFriendRequest(friendId, isAccepted);

      if (response.status === "success") {
        setReceivedRequests(prevRequests =>
          prevRequests.filter(request => request.friendId !== friendId)
        );

        openAlertModal(isAccepted ? "친구 요청을 수락했습니다." : "친구 요청을 거절했습니다.");
        setErrorMessage(null);
      } else {
        openAlertModal("요청 처리에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      console.error("친구 요청 처리 오류:", error);
      openAlertModal("친구 요청 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      try {
        const response = await getFriendList();
        if (response.status === "success") {
          setFriends(response.data);
        } else {
          setError("친구 목록을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("친구 목록 조회 오류:", error);
        setError("친구 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchFriendRequests = async () => {
      setIsLoading(true);
      try {
        const receivedResponse = await getFriendRequestsReceived();
        const sentResponse = await getFriendRequestsSent();

        if (receivedResponse.status === "success" && sentResponse.status === "success") {
          setReceivedRequests(receivedResponse.data);
          setSentRequests(sentResponse.data);
        } else {
          setError("친구 요청 목록을 불러오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("친구 요청 목록 조회 오류:", error);
        setError("친구 요청 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === "friends") {
      fetchFriends();
    } else if (activeTab === "requests") {
      fetchFriendRequests();
    }
  }, [activeTab]);

  return (
    <div css={Container}>
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={backBtn}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={Hambtn}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>

      <div css={searchPixelContainerWrapper}>
        <div css={searchContainer}>
          <input
            type="text"
            placeholder="닉네임으로 검색..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} disabled={isProcessing}>
            <img src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg" alt="검색 아이콘" width={20} height={20} />
          </button>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div css={tabContainer(activeTab)}>
        <button onClick={() => setActiveTab("friends")} className={activeTab === "friends" ? "active" : ""}>친구 목록</button>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>친구 요청</button>
      </div>

      <div css={friendListContainer}>
        {activeTab === "friends" && (
          friends.map(friend => (
            <div css={friendItem} key={friend.friendId}>
              <img src={friend.assets || PixelPuppy} alt={`${friend.nickname} 아바타`} width={40} height={40} onClick={() => openDetailModal(friend.memberId)} />
              <div css={friendName} onClick={() => openDetailModal(friend.memberId)}>
                <p>{friend.nickname}</p>
                <span>{friend.name}</span>
              </div>
              <div css={friendActionIcons}>
                <button onClick={openMessageModal}>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mail.svg" alt="메일 아이콘" width={20} height={20} />
                </button>
                <button onClick={() => handleDeleteFriend(friend.memberId)}>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="삭제 아이콘" width={20} height={20} />
                </button>
              </div>
            </div>
          ))
        )}

        {activeTab === "requests" && (
          <>
            {errorMessage && (
              <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                {errorMessage}
              </div>
            )}
            {receivedRequests.length === 0 && sentRequests.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                요청 항목이 없습니다.
              </div>
            )}
            {receivedRequests.length > 0 && receivedRequests.map((request) => (
              <div css={friendItem} key={request.friendId}>
                <img src={request.assets || PixelPuppy} alt={`${request.nickname} 아바타`} width={40} height={40} onClick={() => openDetailModal(request.memberId)} />
                <div css={friendName} onClick={() => openDetailModal(request.memberId)}>
                  <p>{request.nickname}</p>
                  <span>{request.name}</span>
                </div>
                <div css={friendActionIcons}>
                  <button 
                    onClick={() => handleResponseToFriendRequest(request.friendId!, true)}
                    disabled={isProcessing}
                  >
                    <img src="https://unpkg.com/pixelarticons@1.8.1/svg/check.svg" alt="수락 아이콘" width={20} height={20} />
                  </button>
                  <button 
                    onClick={() => handleResponseToFriendRequest(request.friendId!, false)}
                    disabled={isProcessing}
                  >
                    <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="거절 아이콘" width={20} height={20} />
                  </button>
                </div>
              </div>
            ))}
            {sentRequests.length > 0 && sentRequests.map((request) => (
              <div css={friendItem} key={request.friendId}>
                <img src={request.assets || PixelPuppy} alt={`${request.nickname} 아바타`} width={40} height={40} onClick={() => openDetailModal(request.memberId)} />
                <div css={friendName} onClick={() => openDetailModal(request.memberId)}>
                  <p>{request.nickname}</p>
                  <span>{request.name}</span>
                </div>
                <div css={friendActionIcons}>
                  <span style={{ color: '#888' }}>수락 대기중...</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {searchResults && searchResults.length > 0 && (
        <div css={searchResultsContainer}>
          <h3>검색 결과</h3>
          {searchResults.map((result) => {
            const isFriend = friends.some(friend => friend.memberId === result.memberId);
            const isSentRequest = sentRequests.some(request => request.memberId === result.memberId);
            const isReceivedRequest = receivedRequests.some(request => request.memberId === result.memberId);

            return (
              <div css={searchResultItem} key={result.memberId}>
                <img src={result.assets || PixelPuppy} alt={`${result.nickname} 아바타`} width={50} height={50} onClick={() => openDetailModal(result.memberId)} />
                <div css={searchResultText} onClick={() => openDetailModal(result.memberId)}>
                  <h3>{result.nickname}</h3>
                  <p>{result.name}</p>
                </div>
                <div css={searchResultActions}>
                  {isFriend ? (
                    <>
                      <button onClick={openMessageModal}>
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mail.svg" alt="메일 아이콘" width={20} height={20} />
                      </button>
                      <button onClick={() => handleDeleteFriend(result.memberId)}>
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="삭제 아이콘" width={20} height={20} />
                      </button>
                    </>
                  ) : isSentRequest ? (
                    <span style={{ color: '#888' }}>수락 대기중...</span>
                  ) : isReceivedRequest ? (
                    <>
                      <button 
                        onClick={() => handleResponseToFriendRequest(result.memberId!, true)}
                        disabled={isProcessing}
                      >
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/check.svg" alt="수락 아이콘" width={20} height={20} />
                      </button>
                      <button 
                        onClick={() => handleResponseToFriendRequest(result.memberId!, false)}
                        disabled={isProcessing}
                      >
                        <img src="https://unpkg.com/pixelarticons@1.8.1/svg/close.svg" alt="거절 아이콘" width={20} height={20} />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleFriendRequest(result.memberId)}
                      disabled={isProcessing}
                    >
                      <img src="https://unpkg.com/pixelarticons@1.8.1/svg/user-plus.svg" alt="친구 추가 아이콘" width={20} height={20} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>

      {/* Alert Modal for friend actions */}
      <Modal isOpen={alertModalOpen} onClose={closeAlertModal} title="">
        <div css={deleteModalOverlayStyle}>
          <div css={deleteModalContentStyle}>
            <img src={Warning} alt="경고 아이콘" css={warningIconStyle} />
            <p>{alertMessage}</p>
            <button css={sendButtonStyle} onClick={closeAlertModal}>확인</button>
          </div>
        </div>
      </Modal>

      {/* Message Modal for friend message */}
      <Modal isOpen={isModalOpen} onClose={closeMessageModal} title="">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <span>To. 친구</span>
              <button css={closeButtonStyle} onClick={closeMessageModal}>
                <img src={CancelButton} alt="Cancel Button" width={25} />
              </button>
            </div>
            <textarea
              css={modalInputStyle}
              placeholder="메시지를 입력하세요..."
              rows={15}
              value={message}
              onChange={handleChange}
            />
            <button css={sendButtonStyle} onClick={handleSend}>메시지 전송</button>
          </div>
        </div>
      </Modal>

      {/* 상세 정보 모달 */}
      <Modal isOpen={isDetailModalOpen} onClose={closeDetailModal} title="">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            {selectedMember ? (
              <>
                <h2>{selectedMember.nickname}</h2>
                <p>이름: {selectedMember.name}</p>
                <p>생일: {selectedMember.birth}</p>
                <p><img src={selectedMember.assets} alt={`${selectedMember.nickname} 이미지`} /></p>
              </>
            ) : (
              <p>회원 정보를 불러오는 중입니다...</p>
            )}
            <button css={sendButtonStyle} onClick={closeDetailModal}>닫기</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

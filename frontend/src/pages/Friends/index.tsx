import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hamberger } from '../Hamberger';
import NavButton from '../../assets/icons/NavButton.png';
import PixelPuppy from '../../assets/icons/PixelPuppy.png';
import CancelButton from '../../assets/icons/CancelButton.png';
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
  searchResultActions
} from './styles';
import { searchUserByNickname } from '@/apis/userSearchService';
import { postFriendRequest, getFriendRequestsReceived, respondToFriendRequest, getFriendList } from '@/apis/friendsService';

interface Member {
  nickname: string;
  name: string;
  assets: string;
  memberId: number;
  friendId?: number;
}

export const Friends = () => {
  const [mypageVisible, setMyPageVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [friendRequests, setFriendRequests] = useState<Member[]>([]);
  const [friends, setFriends] = useState<Member[]>([]); // 친구 목록 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handleSend = () => {
    console.log("전송된 메시지:", message);
    setMessage("");
    closeModal();
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

      // friendId를 undefined로 추가
      const modifiedResults = results.map(user => ({ ...user, friendId: undefined }));
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
        alert(response.message);
        setSearchResults(prev => prev.filter(user => user.memberId !== memberId));
      } else {
        alert("친구 요청에 실패했습니다.");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "친구 요청 중 오류가 발생했습니다.";
      console.error("친구 요청 오류:", error);
      alert(errorMessage);
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

    if (activeTab === "friends") {
      fetchFriends();
    }
  }, [activeTab]);

  const handleResponseToFriendRequest = async (friendId: number, isAccepted: boolean) => {
    if (isProcessing) return;

    setIsProcessing(true);
    try {
      const response = await respondToFriendRequest(friendId, isAccepted);

      if (response.status === "success") {
        setFriendRequests(prevRequests =>
          prevRequests.filter(request => request.friendId !== friendId)
        );

        alert(isAccepted ? "친구 요청을 수락했습니다." : "친구 요청을 거절했습니다.");
        setErrorMessage(null);
      } else {
        setErrorMessage("요청 처리에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error: any) {
      console.error("친구 요청 처리 오류:", error);
      const errorMessage = error.response?.data?.message || "친구 요청 처리 중 오류가 발생했습니다.";
      setErrorMessage(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

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

      {/* {isLoading && <p>검색 중...</p>} */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div css={tabContainer(activeTab)}>
        <button onClick={() => setActiveTab("friends")} className={activeTab === "friends" ? "active" : ""}>친구 목록</button>
        <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>친구 요청</button>
      </div>

      <div css={friendListContainer}>
        {activeTab === "friends" && (
          friends.map(friend => (
            <div css={friendItem} key={friend.friendId}>
              <img src={friend.assets || PixelPuppy} alt={`${friend.nickname} 아바타`} width={40} height={40} />
              <div css={friendName}>
                <p>{friend.nickname}</p>
                <span>{friend.name}</span>
              </div>
              <div css={friendActionIcons}>
                <button onClick={openModal}>
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/mail.svg" alt="메일 아이콘" width={20} height={20} />
                </button>
                <button>
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
            {friendRequests.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                받은 친구 요청이 없습니다.
              </div>
            ) : (
              friendRequests.map((request) => (
                <div css={friendItem} key={request.friendId}>
                  <img src={request.assets || PixelPuppy} alt={`${request.nickname} 아바타`} width={40} height={40} />
                  <div css={friendName}>
                    <p>{request.nickname}</p>
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
              ))
            )}
          </>
        )}
      </div>

      {searchResults && searchResults.length > 0 && (
        <div css={searchResultsContainer}>
          <h3>검색 결과</h3>
          {searchResults.map((result) => (
            <div css={searchResultItem} key={result.memberId}>
              <img src={result.assets || PixelPuppy} alt={`${result.nickname} 아바타`} width={50} height={50} />
              <div css={searchResultText}>
                <h3>{result.nickname}</h3>
              </div>
              <div css={searchResultActions}>
                <button 
                  onClick={() => handleFriendRequest(result.memberId)}
                  disabled={isProcessing}
                >
                  <img src="https://unpkg.com/pixelarticons@1.8.1/svg/user-plus.svg" alt="친구 추가 아이콘" width={20} height={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div css={[slidePanelStyle, mypageVisible && { transform: 'translateX(0)' }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="">
        <div css={modalOverlayStyle}>
          <div css={modalContentStyle}>
            <div css={modalHeaderStyle}>
              <span>To. 친구</span>
              <button css={closeButtonStyle} onClick={closeModal}>
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
    </div>
  );
};

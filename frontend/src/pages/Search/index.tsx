import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as style from "./styles";
import { Header } from "@/components/Header";
import { searchUser } from "@/apis/userService";
import { postFriendRequest } from "@/apis/friendsService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FriendProfile } from "@/components/FriendProfile";
import ModalAlert from "@/components/ModalAlert"; // Import ModalAlert

interface SearchResult {
  memberId: number;
  nickname: string;
  name: string;
  assets: string;
  status: number;
}

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State for ModalAlert visibility

  const queryClient = useQueryClient();
  const navigateTo = useNavigate();
  const getShowActions = (status: number) =>
    status === 3 ? "list" : "request";

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchTerm(decodeURIComponent(keyword));
      setSearchQuery(decodeURIComponent(keyword));
    }
  }, [searchParams]);

  const { data: searchResults = [], isLoading } = useQuery<SearchResult[]>({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => searchUser(searchQuery),
  });

  const mutation = useMutation({
    mutationFn: (memberId: number) => postFriendRequest(memberId),
    onSuccess: (_, memberId) => {
      setSentRequests((prev) => [...prev, memberId]);
      queryClient.invalidateQueries({ queryKey: ["friendList"] });
      setIsAlertOpen(true);
      setTimeout(() => setIsAlertOpen(false), 1500);
    },
    onError: (error) => {
      console.error("친구 요청 실패:", error);
      alert("친구 요청을 보내는 데 실패했습니다.");
    },
  });

  const handleAddFriend = (memberId: number) => {
    mutation.mutate(memberId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ keyword: searchTerm });
      setSearchQuery(searchTerm.trim());
    }
  };

  const backToFriend = () => {
    navigateTo("/friends");
  };
  return (
    <>
      <div>
        <Header />
        <div css={style.searchWrapper}>
          <form css={style.searchContainer} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="닉네임 or 이름으로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg"
                alt="search"
              />
            </button>
          </form>
        </div>

        <div css={style.resultsContainer}>
          {isLoading ? (
            <div css={style.messageContainer}>검색 중...</div>
          ) : searchResults.length > 0 ? (
            <div css={style.resultsList}>
              {searchResults.map((result) => (
                <div
                  key={result.memberId}
                  css={style.searchResultItem}
                  onClick={() => {
                    setSelectedMemberId(result.memberId);
                    setIsProfileOpen(true);
                  }}
                >
                  <img src={result.assets} css={style.asset} alt="" />
                  <div css={style.userInfo}>
                    <div css={style.nickname}>{result.nickname}</div>
                    <div css={style.name}>{result.name}</div>
                  </div>
                  {result.status === 0 ? (
                    <button
                      css={style.addFriendIcon}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click event
                        handleAddFriend(result.memberId);
                      }}
                    >
                      {sentRequests.includes(result.memberId) ? (
                        "요청 보냄"
                      ) : (
                        <img
                          src="https://unpkg.com/pixelarticons@1.8.1/svg/user-plus.svg"
                          alt="Add Friend"
                        />
                      )}
                    </button>
                  ) : result.status === 1 || result.status === 2 ? (
                    <div css={style.pendingRequest}>수락 대기</div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div css={style.messageContainer}>검색 결과가 없습니다.</div>
          )}
        </div>
        <div css={style.buttonContainer}>
          <button css={style.backToFriend} onClick={backToFriend}>
            친구 목록으로 돌아가기
          </button>
        </div>
      </div>

      {/* FriendProfile modal */}
      {selectedMemberId && (
        <FriendProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          memberId={selectedMemberId}
          showActions={getShowActions(
            searchResults.find((result) => result.memberId === selectedMemberId)
              ?.status ?? 0
          )}
        />
      )}

      {/* ModalAlert for friend request success */}
      <ModalAlert isOpen={isAlertOpen} message="친구 신청 완료" />
    </>
  );
};

import { useState } from "react";
import { Header } from "@/components/Header";
import { FriendList } from "@/components/FriendList";
import { FriendRequest } from "@/components/FriendRequest";
import * as style from "./styles";
import { useNavigate } from "react-router-dom";

export const Friends = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      navigate(`/friendsearch?keyword=${encodeURIComponent(nickname)}`);
    }
  };

  return (
    <>
      <Header />
      <div css={style.searchWrapper}>
        <form css={style.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="닉네임 or 이름으로 검색"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit">
            <img
              src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg"
              alt="search"
            />
          </button>
        </form>
      </div>

      <div css={style.Container}>
        <div css={style.tabContainer(activeTab)}>
          <button
            onClick={() => setActiveTab("friends")}
            className={activeTab === "friends" ? "active" : ""}
          >
            친구 목록
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={activeTab === "requests" ? "active" : ""}
          >
            친구 요청
          </button>
        </div>
        <div css={style.FriendtContainer}>
          {activeTab === "friends" && <FriendList />}
          {activeTab === "requests" && <FriendRequest />}
        </div>
      </div>
    </>
  );
};

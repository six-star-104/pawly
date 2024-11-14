import { useState } from "react";
import { FriendList } from "@/components/FriendList";
import { FriendRequest } from "@/components/FriendRequest";
import * as style from "./styles";
export const Friends = () => {
  const [activeTab, setActiveTab] = useState<"friends" | "requests">("friends");

 

  return (
    <>
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

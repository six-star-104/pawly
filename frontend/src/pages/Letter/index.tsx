/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as style from "./styles";
import { LetterReceiveList } from "@/components/LetterReceiveList";
import { LetterSendList } from "@/components/LetterSendList";
// import { Header } from "@/components/Header";

export const Letter = () => {
  const [activeTab, setActiveTab] = useState<"received" | "sent">("received");

  return (
    <>
      {/* <Header /> */}
      <div css={style.Container}>
        <div css={style.tabContainer(activeTab)}>
          <button
            onClick={() => setActiveTab("received")}
            className={activeTab === "received" ? "active" : ""}
          >
            받은 편지함
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={activeTab === "sent" ? "active" : ""}
          >
            보낸 편지함
          </button>
        </div>
        <div css={style.letterListContainer}>
          {activeTab === "received" ? (
            <LetterReceiveList />
          ) : (
            <LetterSendList />
          )}
        </div>
      </div>
    </>
  );
};

// LetterReceiveList.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  BackBtnContainer,
  BackBtnCss,
  HamBtnContainer,
  HamBtnCss,
  searchPixelContainerWrapper,
  searchContainer,
  tabContainer,
  letterListContainer,
  letterItem,
  letterContent,
  letterDate,
  deleteIcon,
} from "./LetterReceiveList.style";
import NavButton from "../../assets/icons/NavButton.png";
import BackButton from "../../assets/icons/BackButton.png";
import { ILetter } from "@/types/letterTypes";
import { getReceiveLetterList } from "@/apis/letterService";
import { useQuery } from "@tanstack/react-query";

export const LetterReceiveList = ({ onLetterSelect }) => {
  const [letters, setLetters] = useState<ILetter[]>([]);
  const navigate = useNavigate();

  const useReceiveLetterList = useQuery<ILetter[]>({
      queryKey: ["receiveLetterList"],
      queryFn: getReceiveLetterList,
    });
  };
  return (
    <div css={Container}>
      <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={() => navigate(-1)}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>
      <div css={HamBtnContainer}>
        <button css={HamBtnCss}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div>
      <div css={searchPixelContainerWrapper}>
        <div css={searchContainer}>
          <input type="text" placeholder="편지 검색" />
          <button>
            <img
              src="https://unpkg.com/pixelarticons@1.8.1/svg/search.svg"
              alt="검색 아이콘"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div css={tabContainer("received")}>
        <button>받은 편지함</button>
      </div>
      <div css={letterListContainer}>
        {letters.map((letter) => (
          <div
            css={letterItem}
            key={letter.letterId}
            onClick={() => onLetterSelect(letter.letterId)}
          >
            <div css={letterContent}>
              <p>{letter.senderNickname}</p>
            </div>
            <div css={letterDate}>
              {new Date(letter.createdAt).toLocaleDateString("ko-KR")}
            </div>
            <button css={deleteIcon}>
              <img
                src="https://unpkg.com/pixelarticons@1.8.1/svg/trash.svg"
                alt="삭제"
                width={20}
                height={20}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

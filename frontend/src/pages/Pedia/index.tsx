import { useEffect, useState } from "react";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useCollectionStore } from "@/stores/collectionStore";
import * as style from "./styles";

export const Pedia = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { nickname, memberId } = useUserInfoStore();
  const { collections, fetchCollections, totalCollections } =
    useCollectionStore();

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(totalCollections / itemsPerPage));

  useEffect(() => {
    if (memberId) {
      fetchCollections(Number(memberId), currentPage, itemsPerPage);
    }
  }, [memberId, currentPage, fetchCollections]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div css={style.PixelContainerWrapper}>
      <div css={style.Container}>
        <h2 css={style.headerStyle}>
          {nickname ? `${nickname}님의 도감` : "사용자의 도감"}
        </h2>

        <div css={style.IconGrid}>
          {collections.map((collection) => (
            <div css={style.IconItem} key={collection.collectionId}>
              <img
                src={collection.assets}
                alt={collection.nickname}
                width={60}
              />
              <p>{collection.nickname}</p>
            </div>
          ))}
        </div>
      </div>
      <div css={style.ArrowContainer}>
        <button
          css={style.ArrowButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          ◀️ 이전
        </button>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <button
          css={style.ArrowButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          다음 ▶️
        </button>
      </div>
    </div>
  );
};

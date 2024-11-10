import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as style from "./LetterReceiveList.style";
import { IReceiveLetterList } from "@/types/letterTypes";
import { getReceiveLetterList } from "@/apis/letterService";
import { LetterReceiveDetail } from "@/components/LetterReceiveDetail";
import Pagination from "@/components/Pagination";
import ModalLetter from "../ModalLetter";

export const LetterReceiveList = () => {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: letterList } = useQuery<IReceiveLetterList>({
    queryKey: ["receiveLetterList", currentPage],
    queryFn: () =>
      getReceiveLetterList(currentPage - 1, 10, "desc", "createdAt"),
  });

  const openModal = (receiveLetterId: number) => {
    setSelectedLetterId(receiveLetterId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLetterId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div css={style.Container}>
      <div css={style.letterListContainer}>
        {letterList?.content && letterList.content.length > 0 ? (
          letterList.content.map((letter) => (
            <div
              css={style.letterItem}
              key={letter.letterId}
              onClick={() => openModal(letter.receiveLetterId)}
            >
              <div css={style.contentContainer}>
                <div css={style.content}>{letter.content}</div>
                <div css={style.nickname}>{letter.senderName}</div>
              </div>
              <div css={style.date}>
                {new Date(letter.createdAt).toLocaleDateString("ko-KR")}
              </div>
            </div>
          ))
        ) : (
          <div css={style.letterItem}>
            <div css={style.noLetter}>받은 편지가 없습니다.</div>
          </div>
        )}
      </div>

      <Pagination
        totalPages={letterList?.totalPage || 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {isModalOpen && selectedLetterId && (
        <ModalLetter isOpen={isModalOpen} onClose={closeModal}>
          {selectedLetterId && (
            <LetterReceiveDetail
              receiveLetterId={selectedLetterId}
              onClose={closeModal}
            />
          )}
        </ModalLetter>
      )}
    </div>
  );
};

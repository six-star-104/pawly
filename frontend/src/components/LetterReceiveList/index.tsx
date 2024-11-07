import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as style from "./LetterReceiveList.style";
import { ILetterList } from "@/types/letterTypes";
import { getReceiveLetterList } from "@/apis/letterService";
import { LetterReceiveDetail } from "@/components/LetterReceiveDetail";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";

export const LetterReceiveList = () => {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: letterList } = useQuery<ILetterList>({
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
              <div css={style.letterContent}>
                <p>{letter.senderName}</p>
              </div>
              <div css={style.letterDate}>
                {new Date(letter.createdAt).toLocaleDateString("ko-KR")}
              </div>
              <button css={style.deleteIcon}>
                <img
                  src="https://unpkg.com/pixelarticons@1.8.1/svg/trash.svg"
                  alt="삭제"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          ))
        ) : (
          <p>아직 받은 편지가 없습니다.</p>
        )}
      </div>

      <Pagination
        totalPages={letterList?.totalPage || 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {isModalOpen && selectedLetterId && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LetterReceiveDetail
            receiveLetterId={selectedLetterId}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as style from "./LetterSendList.style";
import { ISendLetterList } from "@/types/letterTypes";
import { getSendLetterList } from "@/apis/letterService";
import { LetterSendDetail } from "@/components/LetterSendDetail";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";

export const LetterSendList = () => {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: letterList } = useQuery<ISendLetterList>({
    queryKey: ["sendLetterList", currentPage],
    queryFn: () => getSendLetterList(currentPage - 1, 10, "desc"),
  });

  const openModal = (sendLetterId: number) => {
    setSelectedLetterId(sendLetterId);
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
              onClick={() => openModal(letter.sendLetterId)}
            >
              <div css={style.contentContainer}>
                <div css={style.content}>{letter.content}</div>
                <div css={style.nickname}>{letter.recipientName}</div>
              </div>
              <div css={style.date}>
                {new Date(letter.createdAt).toLocaleDateString("ko-KR")}
              </div>
            </div>
          ))
        ) : (
          <div css={style.letterItem}>
            <div css={style.noLetter}>보낸 편지가 없습니다.</div>
          </div>
        )}
      </div>

      <Pagination
        totalPages={letterList?.totalPage || 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {isModalOpen && selectedLetterId && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LetterSendDetail
            sendLetterId={selectedLetterId}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

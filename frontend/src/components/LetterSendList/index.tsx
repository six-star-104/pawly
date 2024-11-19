import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as style from "./LetterSendList.style";
import { ISendLetterList } from "@/types/letterTypes";
import { getSendLetterList } from "@/apis/letterService";
import { LetterSendDetail } from "@/components/LetterSendDetail";
import ModalLetter from "@/components/ModalLetter";
import Pagination from "@/components/Pagination";
import replyHeart from "@/assets/icons/replyHeart.svg";
import replyLike from "@/assets/icons/replyLike.svg";
import replyStar from "@/assets/icons/replyStar.svg";

export const LetterSendList = () => {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: letterList } = useQuery<ISendLetterList>({
    queryKey: ["sendLetterList", currentPage],
    queryFn: () => getSendLetterList(currentPage - 1, 7, "desc"),
  });

  const openModal = (sendLetterId: number) => {
    setSelectedLetterId(sendLetterId);
    setIsModalOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLetterId(null);
    document.body.classList.remove("no-scroll");
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
                {letter?.reaction === 1 ? (
                  <img src={replyHeart} css={style.replyIcon} />
                ) : letter?.reaction === 2 ? (
                  <img src={replyLike} css={style.replyIcon} />
                ) : letter?.reaction === 3 ? (
                  <img src={replyStar} css={style.replyIcon} />
                ) : null}
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
      {letterList && letterList.totalPage > 1 && (
        <Pagination
          totalPages={letterList?.totalPage || 0}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {isModalOpen && selectedLetterId && (
        <ModalLetter isOpen={isModalOpen} onClose={closeModal}>
          {selectedLetterId && (
            <LetterSendDetail
              sendLetterId={selectedLetterId}
              onClose={closeModal}
            />
          )}
        </ModalLetter>
      )}
    </div>
  );
};

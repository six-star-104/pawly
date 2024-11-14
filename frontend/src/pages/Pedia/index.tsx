/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavButton from "../../assets/icons/NavButton.png";
// import BackButton from "../../assets/icons/BackButton.png";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useCollectionStore } from "@/stores/collectionStore";
import { 
  // BackBtnContainer,
  // HamBtnContainer,
  // HamBtnCss,
  // BackBtnCss,
  // slidePanelStyle,
  // panelContentStyle,
  PixelContainerWrapper,
  Container,
  IconGrid,
  IconItem,
  ArrowContainer,
  ArrowButton,
  headerStyle,
} from "./styles";
// import { Hamberger } from "../Hamberger";

export const Pedia = () => {
  // const [mypageVisible, setMyPageVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { nickname, userId } = useUserInfoStore();
  const { collections, fetchCollections, totalCollections } = useCollectionStore();

  // const navigate = useNavigate();
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalCollections / itemsPerPage);

  useEffect(() => {
    if (userId) {
      fetchCollections(Number(userId), currentPage, itemsPerPage);
    }
  }, [userId, currentPage, fetchCollections]);

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

  // const close = () => {
  //   navigate(-1);
  // };

  // const openMenu = () => {
  //   setMyPageVisible(true);
  // };

  // const closeMyPage = () => {
  //   setMyPageVisible(false);
  // };

  return (
    <div css={PixelContainerWrapper}> {/* PixelContainerWrapper로 감싸기 */}
      {/* <div css={BackBtnContainer}>
        <button css={BackBtnCss} onClick={close}>
          <img src={BackButton} alt="뒤로가기 버튼" width={35} height={35} />
        </button>
      </div>

      <div css={HamBtnContainer}>
        <button css={HamBtnCss} onClick={openMenu}>
          <img src={NavButton} alt="햄버거 버튼" width={40} />
        </button>
      </div> */}

      {/* <div css={[slidePanelStyle, { transform: "translateX(0)" }]}>
        <div css={panelContentStyle}>
           슬라이딩 메뉴 내용 
        </div>
      </div> */}

      <div css={Container}> {/* Container 적용 */}
        <h2 css={headerStyle}>{nickname ? `${nickname}님의 도감` : "사용자의 도감"}</h2>
        
        <div css={IconGrid}>
          {collections.map((collection) => (
            <div css={IconItem} key={collection.collectionId}>
              <img src={collection.assets} alt={collection.nickname} width={60} />
              <p>{collection.nickname}</p>
            </div>
          ))}
        </div>
        
        <div css={ArrowContainer}>
          <button css={ArrowButton} onClick={handlePreviousPage} disabled={currentPage === 0}>
            ◀️ 이전
          </button>
          <span>{currentPage + 1} / {totalPages}</span>
          <button css={ArrowButton} onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            다음 ▶️
          </button>
        </div>
      </div>

      {/* <div css={[slidePanelStyle, mypageVisible && { transform: "translateX(0)" }]}>
        <div css={panelContentStyle}>
          <Hamberger closeMyPage={closeMyPage} />
        </div>
      </div> */}
    </div>
  );
};

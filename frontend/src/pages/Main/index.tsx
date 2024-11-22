import * as style from "./styles";
import CameraIcon from "@/assets/icons/camera.png";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useNavigate } from "react-router-dom";
import postbox from "@/assets/icons/postbox.svg";
import { useEffect, useMemo } from "react";
import useCollectionStore from "@/stores/collectionStore";

type assetType = {
  assets: string;
  collectionId: number;
  nickname: string;
  isUser?: boolean;
};

export const Main = () => {
  const navigateTo = useNavigate();
  const { assets, memberId } = useUserInfoStore();

  const { collections, fetchCollections } = useCollectionStore();

  const itemsPerPage = 20;

  useEffect(() => {
    if (memberId) {
      fetchCollections(Number(memberId), 0, itemsPerPage);
    }
  }, [memberId, fetchCollections]);

  const combinedData = useMemo(() => {
    if (!collections) return [];

    const userAsset: assetType = {
      assets: assets,
      collectionId: -1,
      nickname: "Me",
      isUser: true,
    };

    return [...collections, userAsset];
  }, [collections, assets]);

  const arMove = () => {
    navigateTo("/ar");
  };

  const goToRollingPaper = () => {
    navigateTo("/rollingpaper");
  };
  return (
    <div css={style.container}>
      <div css={style.content}>
        <button onClick={arMove} className="nes-btn">
          <img src={CameraIcon} />
          AR 우체통 찾기
        </button>
      </div>
      <div css={style.collectionContainer}>
        {combinedData.map((item) => (
          <img
            key={item.collectionId}
            src={item.assets}
            css={item.isUser ? style.MyAssetStyle() : style.assetStyle()}
          />
        ))}
      </div>
      <div css={style.postboxContainer}>
        <div css={style.rollingPaperWrapper}>
          <div css={style.rollingPaperText}>롤링페이퍼함</div>
          <img
            src={postbox}
            css={style.postboxStyle}
            onClick={goToRollingPaper}
          />
        </div>
      </div>
    </div>
  );
};

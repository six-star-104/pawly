import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPaper, IPostIt } from "@/types/rollingPaperTypes";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useHeaderStore } from "@/stores/headerStore";

const useFetchRollingpaper = () => {
  const [singleRollingpaper, setSingleRollingpaper] = useState<IRollingPaper>();
  const [postits, setPostits] = useState<IPostIt[]>([]);
  const [loading, setLoading] = useState(false);
  const [maxPageError, setMaxPageError] = useState<boolean>(false);
  const { nickname } = useUserInfoStore();
  const { setTitleContent } = useHeaderStore();
  // const { setIsPostItChanged, isPostItChanged } = useRollingpaperStore();

  const fetchRollingPaper = async (
    rollingpaperId: string,
    page: number,
    pageSize: number
  ) => {
    // 더 로딩할게 없으면 호출 안되게
    if (maxPageError) return;
    // if (!isPostItChanged) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `rollingpaper/${rollingpaperId}?pageNumber=${page}&pageSize=${pageSize}`
      );
      setLoading(false);
      setSingleRollingpaper(res.data.data);
      if (res.data.data.content.length === 0) {
        setMaxPageError(true);
        return;
      }
      setTitleContent(res.data.data.rollingPaperTitle)
      setPostits([...postits, ...res.data.data.content]);
    } catch (err) {
      // console.error("포스트잇 조회 오류:", err);
    }
  };

  // 아래쪽 생성 수정 삭제는 일단 비동기로 프론트 단에서 자체 처리해 놓는 식으로 진행
  const createPostit = async (postitData: IPostIt, rollingPaperId: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/postit`, {
        ...postitData,
        rollingPaperId: rollingPaperId,
      });

      const returnId = res.data.data.postItId;
      // 여기서 스토어에서 내 닉넴 받아와서 넣어주기
      setPostits([
        {
          ...postitData,
          postItId: returnId,
          memberNickname: nickname,
        },
        ...postits,
      ]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // console.error("포스트잇 생성 오류:", err);
    }
  };

  const deletePostit = async (postitId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/postit/${postitId}`);
      setLoading(false);
      setPostits(postits.filter((p) => p.postItId !== postitId));
    } catch (err) {
      setLoading(false);
      // console.error("포스트잇 삭제 오류:", err);
    }
  };

  const editPostit = async (postitData: IPostIt) => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/postit/${postitData.postItId}`, postitData);
      setLoading(false);
      setPostits(
        postits.map((p) =>
          p.postItId === postitData.postItId ? postitData : p
        )
      );
    } catch (err) {
      setLoading(false);
      // console.error("포스트잇 수정 오류:", err);
    }
  };

  return {
    singleRollingpaper,
    fetchRollingPaper,
    postits,
    loading,
    setLoading,
    maxPageError,
    createPostit,
    editPostit,
    deletePostit,
  };
};
export default useFetchRollingpaper;

import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPaper } from "@/types/rollingPaperTypes";
import { IPostIt } from "@/types/rollingPaperTypes";
const useFetchRollingpaper = (
  rollingpaperId: string,
  page: number,
  pageSize: number
) => {
  const [singleRollingpaper, setSingleRollingpaper] = useState<IRollingPaper>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  const fetchRollingPaper = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(
        `rollingpaper/${rollingpaperId}?page=${page}&pageSize=${pageSize}`
      );
      setSingleRollingpaper(res.data.data);
    } catch (err) {
      setError("Failed to fetch rolling papers.");
    } finally {
      setLoading(false);
    }
  }, []);

  // fetchRollingPaper(rollingpaperId, page, pageSize);
  // }, []);

  const createPostit = async (postitData: IPostIt, rollingPaperId: string) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/postit`, {
        ...postitData,
        rollingPaperId: rollingPaperId,
      });
      setLoading(false);
      setError(null);
      console.log("생성완료");
      await fetchRollingPaper();
      // setSingleRollingpaper((prev) => ({
      //   ...prev,
      //   content: [...(prev?.content || []), postitData],
      // }));
    } catch (err) {
      setLoading(false);
      setError("포스트잇 생성 중 오류가 발생했습니다.");
      console.error("포스트잇 생성 오류:", err);
    }
  };

  const deletePostit = async (postitId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/postit/${postitId}`);
      setLoading(false);
      setError(null);
      console.log("삭제완료");
      // setSingleRollingpaper((prev) => ({
      //   ...prev,
      //   content: prev?.content?.filter(
      //     (data: IPostIt) => data.postItId != postitId
      //   ),
      // }));
      await fetchRollingPaper();
    } catch (err) {
      setLoading(false);
      setError("포스트잇 삭제 중 오류가 발생했습니다.");
      console.error("포스트잇 삭제 오류:", err);
    }
  };

  useEffect(() => {
    fetchRollingPaper();
  }, []);

  return {
    singleRollingpaper,
    fetchRollingPaper,
    loading,
    error,
    createPostit,
    deletePostit,
  };
};
export default useFetchRollingpaper;

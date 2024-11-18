//useFetchUserRollingpaper
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPaperSum } from "@/types/rollingPaperTypes";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
import { useHeaderStore } from "@/stores/headerStore";

const useFetchUserRollingpaper = () => {
  const [userRollingpapers, setUserRollingpapers] = useState<
    IRollingPaperSum[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setIsRollingpaperChanged } = useRollingpaperStore();
  const { setTitleContent } = useHeaderStore();

  const fetchRollingPapers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`rollingpaper`);
      setUserRollingpapers(res.data.data.content);
      setIsRollingpaperChanged(false);
      setTitleContent("나의 롤링페이퍼");
    } catch (err) {
      setError("Failed to fetch rolling papers.");
    } finally {
      setLoading(false);
    }
  };

  const createRollingpaper = async (
    title: string,
    lat: number,
    lng: number
  ) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/rollingpaper`, {
        title: title,
        latitude: lat,
        longitude: lng,
      });
      setLoading(false);
      setError(null);
      setIsRollingpaperChanged(true);
      return "success";
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setError("롤링페이퍼 생성 중 오류가 발생했습니다.");
      return err.response.data.code;
    }
  };

  const deletRollingpaper = async (rollingpaperId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/rollingpaper/${rollingpaperId}`);
      setLoading(false);
      setError(null);
      setIsRollingpaperChanged(true);
      setUserRollingpapers((prev) =>
        prev.filter((p) => p.rollingPaperId !== rollingpaperId)
      );
    } catch (err) {
      setLoading(false);
      setError("롤링페이퍼 삭제 중 오류가 발생했습니다.");
      console.error("롤링페이퍼 삭제 오류:", err);
    }
  };

  return {
    userRollingpapers,
    loading,
    error,
    fetchRollingPapers,
    createRollingpaper,
    deletRollingpaper,
  };
};
export default useFetchUserRollingpaper;

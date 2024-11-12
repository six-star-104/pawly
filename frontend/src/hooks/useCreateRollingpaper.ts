import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
export const useCreateRollingpaper = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setIsRollingpaperChanged} = useRollingpaperStore()
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
      setIsRollingpaperChanged(true)
    } catch (err) {
      setLoading(false);
      setError("롤링페이퍼 생성 중 오류가 발생했습니다.");
      console.error("롤링페이퍼 생성 오류:", err);
    }
  };

  return { createRollingpaper, loading, error };
};

// src/hooks/useUserRollingpapers.ts
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

export const useDeleteRollingpaper = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deletRollingpaper = async (rollingpaperId: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/rollingpaper/${rollingpaperId}`);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("롤링페이퍼 삭제 중 오류가 발생했습니다.");
      console.error("롤링페이퍼 삭제 오류:", err);
    }
  };

  return { deletRollingpaper, loading, error };
};

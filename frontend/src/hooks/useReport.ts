// src/hooks/useUserRollingpapers.ts
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

export const useReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reportPostit = async (postitId: number, content: string) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/postit/${postitId}`, {
        content: `${content}`,
      });
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("포스트잇 신고 중 오류가 발생했습니다.");
      console.error("포스트잇 신고 오류:", err);
    }
  };

  return { reportPostit, loading, error };
};

import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";

export const useDeletePostit = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setIsPostItChanged} = useRollingpaperStore();
  const deletePostit = async (postitId: number) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/postit/${postitId}`);
      setLoading(false);
      setError(null);
      setIsPostItChanged(true)
    } catch (err) {
      setLoading(false);
      setError("포스트잇 삭제 중 오류가 발생했습니다.");
      console.error("포스트잇 삭제 오류:", err);
    }
  };

  return { deletePostit, loading, error };
};

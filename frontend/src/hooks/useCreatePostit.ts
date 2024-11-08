import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IPostIt } from "@/types/rollingPaperTypes";

export const useCreatePostit = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPostit = async (postitData: IPostIt, rollingPaperId: string) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/postit`, {
        ...postitData,
        rollingPaperId: rollingPaperId,
      });
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("포스트잇 생성 중 오류가 발생했습니다.");
      console.error("포스트잇 생성 오류:", err);
    }
  };

  return { createPostit, loading, error };
};

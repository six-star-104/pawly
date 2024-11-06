// src/hooks/useUserRollingpapers.ts
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IPostIt } from "@/types/rollingPaperTypes";

// interface formType {
//   rollingPaperId: number;
//   content: string;
//   backgroundColor: number;
//   fontColor: number;
//   borderColor: number;
//   image: string;
//   speechBubbleSize: number;
// }

export const useCreatePostit = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPostit = async (postitData: IPostIt) => {
    const testData = {
      rollingPaperId: 1,
      content: "롤링페이퍼 내용임니다",
      backgroundColor: 1,
      fontColor: 1,
      borderColor: 1,
      image: "url",
      speechBubbleSize: 1,
      preview: false,
    };
    setLoading(true);
    try {
      await axiosInstance.post(`/postit`, postitData);
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

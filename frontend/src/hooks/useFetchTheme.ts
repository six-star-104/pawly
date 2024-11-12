import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { ITheme } from "@/types/rollingPaperTypes";

export const useFetchThemes = () => {
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      setError(null);
      try {
        // 테마 조회 API 나오면 수정하기
        const res = await axiosInstance.get(`theme`);
        setThemes(res.data.data);
        // console.log(res.data.data)
      } catch (err) {
        setError("Failed to fetch themes.");
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  return { themes, loading, error };
};

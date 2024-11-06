// src/hooks/useUserRollingpapers.ts
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPaper } from "@/types/rollingPaperTypes";

export const useFetchSingleRollingpaper = (
  rollingpaperId: string,
  page: number,
  pageSize: number
) => {
  const [singleRollingpaper, setSingleRollingpaper] =
    useState<IRollingPaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRollingPaper = async () => {
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
    };

    fetchRollingPaper();
  }, [rollingpaperId, page, pageSize]);

  return { singleRollingpaper, loading, error };
};

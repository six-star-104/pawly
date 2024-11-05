// src/hooks/useUserRollingpapers.ts
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPapers } from "@/types/rollingPaperTypes";

export const useFetchUserRollingpapers = () => {
  const [userRollingpapers, setUserRollingpapers] =
    useState<IRollingPapers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRollingPaper = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`rollingpaper`);
        setUserRollingpapers(res.data.data);
      } catch (err) {
        setError("Failed to fetch rolling papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchRollingPaper();
  }, []);

  return { userRollingpapers, loading, error };
};

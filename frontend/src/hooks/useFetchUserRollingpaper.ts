//useFetchUserRollingpaper
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPapers } from "@/types/rollingPaperTypes";

const useFetchUserRollingpaper = (reFetch: number) => {
  const [userRollingpapers, setUserRollingpapers] =
    useState<IRollingPapers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchRollingPapers = async () => {
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

  useEffect(() => {
    fetchRollingPapers();
  }, [reFetch]);

  return { userRollingpapers, loading, error,fetchRollingPapers };
};
export default useFetchUserRollingpaper;

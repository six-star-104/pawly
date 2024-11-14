//useFetchUserRollingpaper
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPapers } from "@/types/rollingPaperTypes";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";
import { useHeaderStore } from "@/stores/headerStore";

const useFetchUserRollingpaper = () => {
  const [userRollingpapers, setUserRollingpapers] =
    useState<IRollingPapers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setIsRollingpaperChanged } = useRollingpaperStore();
  const {setTitleContent} = useHeaderStore()

  const fetchRollingPapers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get(`rollingpaper`);
      setUserRollingpapers(res.data.data);
      setIsRollingpaperChanged(false);
      setTitleContent("나의 롤링페이퍼")
    } catch (err) {
      setError("Failed to fetch rolling papers.");
    } finally {
      setLoading(false);
    }
  };

  return { userRollingpapers, loading, error, fetchRollingPapers };
};
export default useFetchUserRollingpaper;

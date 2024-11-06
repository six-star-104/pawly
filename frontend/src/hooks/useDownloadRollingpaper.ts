// src/hooks/useUserRollingpapers.ts
import { useState, useEffect } from "react";
import { axiosInstance } from "../apis/axiosInstance";

export const useDownloadRollingpaper = (rollingpaperId: number) => {
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRollingPaper = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(
          `rollingpaper/${rollingpaperId}/download`
        );
        setDownloadLink(res.data.data.downloadLink);
      } catch (err) {
        setError("롤링페이퍼 다운로드 실패");
      } finally {
        setLoading(false);
      }
    };

    fetchRollingPaper();
  }, [rollingpaperId]);

  return { downloadLink, loading, error };
};

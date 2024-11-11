import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import { IRollingPaper, IPostIt } from "@/types/rollingPaperTypes";
import { useRollingpaperStore } from "@/stores/rollingpaperStore";

const useFetchRollingpaper = () => {
  const [singleRollingpaper, setSingleRollingpaper] = useState<IRollingPaper>();
  const [postits, setPostits] = useState<IPostIt[]>([])
  const [loading, setLoading] = useState(false);
  const [maxPageError, setMaxPageError] = useState<boolean>(false);

  const { setIsPostItChanged } = useRollingpaperStore();

  const fetchRollingPaper = async (
    rollingpaperId: string,
    page: number,
    pageSize: number
  ) => {
    if(maxPageError) return
    setLoading(true);
    console.log(page);
    try {
      const res = await axiosInstance.get(
        `rollingpaper/${rollingpaperId}?pageNumber=${page}&pageSize=${pageSize}`
      );
      setLoading(false);
      setSingleRollingpaper(res.data.data);
      console.log(res.data.data)
      if(res.data.data.content.length===0){
        setMaxPageError(true)
      }
      setPostits(prev => [...prev, ...res.data.data.content])
      setIsPostItChanged(false);
    } catch (err) {
      // setError("Failed to fetch rolling papers.");
    } finally {
      console.log("로딩완료" + `${loading}`);
    }
  };

  return {
    singleRollingpaper,
    fetchRollingPaper,
    postits,
    loading,
    setLoading,
    maxPageError
  };
};
export default useFetchRollingpaper;

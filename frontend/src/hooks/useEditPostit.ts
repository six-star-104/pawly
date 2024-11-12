// import { useState } from "react";
// import { axiosInstance } from "../apis/axiosInstance";
// import { IPostIt } from "@/types/rollingPaperTypes";

// import { useRollingpaperStore } from "@/stores/rollingpaperStore";

// export const useEditPostit = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { setIsPostItChanged } = useRollingpaperStore();
//   const editPostit = async (postitData: IPostIt) => {
//     setLoading(true);
//     try {
//       await axiosInstance.patch(`/postit/${postitData.postItId}`, postitData);
//       setLoading(false);
//       setError(null);
//       setIsPostItChanged(true);
//     } catch (err) {
//       setLoading(false);
//       setError("포스트잇 수정 중 오류가 발생했습니다.");
//       console.error("포스트잇 수정 오류:", err);
//     }
//   };

//   return { editPostit, loading, error };
// };

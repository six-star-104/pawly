// import { useState } from "react";
// import { axiosInstance } from "../apis/axiosInstance";
// import { useRollingpaperStore } from "@/stores/rollingpaperStore";
// export const useDeleteRollingpaper = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { setIsRollingpaperChanged } = useRollingpaperStore();

//   const deletRollingpaper = async (rollingpaperId: number) => {
//     setLoading(true);
//     try {
//       await axiosInstance.delete(`/rollingpaper/${rollingpaperId}`);
//       setLoading(false);
//       setError(null);
//       setIsRollingpaperChanged(true);
//     } catch (err) {
//       setLoading(false);
//       setError("롤링페이퍼 삭제 중 오류가 발생했습니다.");
//       console.error("롤링페이퍼 삭제 오류:", err);
//     }
//   };

//   return { deletRollingpaper, loading, error };
// };

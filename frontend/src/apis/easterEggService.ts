import { axiosInstance } from "./axiosInstance";

export const getEasterEggs = async () => {
  try {
    const response = await axiosInstance.get("/easter-egg");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 도전과제 완료 요청 함수
export const completeEasterEgg = async (easterEggId: number) => {
  try {
    const response = await axiosInstance.post("/easter-egg", { easterEggId });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

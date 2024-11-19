import { axiosInstance } from "./axiosInstance";
import { ILetter } from "@/types/letterTypes";
export const receiveLetterList = async (): Promise<ILetter> => {
  try {
    const response = await axiosInstance.get(`receiveLetter`);
    return response.data.data;
  } catch (error) {
    console.error("get user info failed: ", error);
    throw error;
  }
};

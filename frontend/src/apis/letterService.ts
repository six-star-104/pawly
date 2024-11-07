import { axiosInstance } from "./axiosInstance";
import { ILetterList } from "@/types/letterTypes";

export const getReceiveLetterList = async (
  pageNumber: number,
  pageSize: number,
  sortType: string,
  sortBy: string
): Promise<ILetterList> => {
  try {
    const response = await axiosInstance.get(`receiveLetter`, {
      params: {
        pageNumber,
        pageSize,
        sortType,
        sortBy,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("get receive letter list failed: ", error);
    throw error;
  }
};

export const getReceiveLetterDetail = async (receiveLetterId: number) => {
  try {
    const response = await axiosInstance.get(
      `receiveLetter/${receiveLetterId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("get receive letter detail failed", error);
    throw error;
  }
};

export const deleteReveiveLetter = async (receiveLetterId: number) => {
  try {
    const response = await axiosInstance.delete(
      `receiveLetter/${receiveLetterId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("delete receive letter failed", error);
    throw error;
  }
};

export const reactToReveiveLetter = async (receiveLetterId: number) => {
  try {
    const response = await axiosInstance.patch(
      `receiveLetter/${receiveLetterId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("react to receive letter detail failed", error);
    throw error;
  }
};

export const reportReveiveLetter = async (receiveLetterId: number) => {
  try {
    const response = await axiosInstance.post(
      `receiveLetter/${receiveLetterId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("report letter failed", error);
    throw error;
  }
};

export const getSendLetterList = async () => {
  try {
    const response = await axiosInstance.get(`sendLetter`);
    return response.data.data;
  } catch (error) {
    console.error("get send letter list failed: ", error);
    throw error;
  }
};

export const getSendLetterDetail = async (sendLetterId: number) => {
  try {
    const response = await axiosInstance.get(`sendLetter/${sendLetterId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("get send letter detail failed", error);
    throw error;
  }
};

export const postLetter = async () => {
  try {
    const response = await axiosInstance.post("sendLetter");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("post letter failed", error);
    throw error;
  }
};

export const deleteSendLetter = async (sendLetterId: number) => {
  try {
    const response = await axiosInstance.delete(`sendLetter/${sendLetterId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("delete send letter failed", error);
    throw error;
  }
};

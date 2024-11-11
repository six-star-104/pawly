import { axiosInstance } from "./axiosInstance";
import { IReceiveLetterList, ISendLetterList } from "@/types/letterTypes";

export const getReceiveLetterList = async (
  pageNumber: number,
  pageSize: number,
  sortType: string,
  sortBy: string
): Promise<IReceiveLetterList> => {
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
    return response.data;
  } catch (error) {
    console.error("delete receive letter failed", error);
    throw error;
  }
};

export const reactToReceiveLetter = async (
  receiveLetterId: number,
  reaction: number
) => {
  try {
    const response = await axiosInstance.patch(
      `receiveLetter/${receiveLetterId}`,
      { reaction }
    );
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
    return response.data;
  } catch (error) {
    console.error("report letter failed", error);
    throw error;
  }
};

export const getSendLetterList = async (
  pageNumber: number,
  pageSize: number,
  sortType: string
): Promise<ISendLetterList> => {
  try {
    const response = await axiosInstance.get(`sendLetter`, {
      params: {
        pageNumber,
        pageSize,
        sortType,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("get send letter list failed: ", error);
    throw error;
  }
};

export const getSendLetterDetail = async (sendLetterId: number) => {
  try {
    const response = await axiosInstance.get(`sendLetter/${sendLetterId}`);
    return response.data.data;
  } catch (error) {
    console.error("get send letter detail failed", error);
    throw error;
  }
};

export const postLetter = async (
  picture: File | null,
  recipientId: number,
  content: string
) => {
  try {
    const formData = new FormData();

    if (picture) {
      formData.append("picture", picture);
    }

    const jsonBlob = new Blob(
      [
        JSON.stringify({
          recipientId: recipientId,
          content: content,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("data", jsonBlob);

    const response = await axiosInstance.post("sendLetter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    return response.data;
  } catch (error) {
    console.error("delete send letter failed", error);
    throw error;
  }
};

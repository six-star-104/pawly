import { axiosInstance } from "./axiosInstance";


export const getThemes = async () => {
  try {
    const response = await axiosInstance.get("/admin/theme");
    console.log("테마 조회 결과:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      console.error("Failed to get themes: ", error);
    }
    throw error;
  }
};



export const createTheme = async (
  themeName: string,
  backgroundColor: string,
  fontColor: string,
  borderColor: string,
  image?: string,
  base?: boolean
) => {
  try {
    const response = await axiosInstance.post("/admin/theme", {
      themeName,
      backgroundColor,
      fontColor,
      borderColor,
      image,
      base,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // console.error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      // console.error("Failed to create theme: ", error);
    }
    throw error;
  }
};

export const updateTheme = async (
  themeId: number,
  themeName: string,
  backgroundColor: string,
  fontColor: string,
  borderColor: string,
  image?: string,
  base?: boolean
) => {
  try {
    const response = await axiosInstance.patch(`/admin/theme/${themeId}`, {
      themeName,
      backgroundColor,
      fontColor,
      borderColor,
      image,
      base,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      console.error("Failed to update theme: ", error);
    }
    throw error;
  }
};

//삭제
export const deleteTheme = async (themeId: number) => {
  try {
    const response = await axiosInstance.delete(`/admin/theme/${themeId}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      console.error("Failed to delete theme: ", error);
    }
    throw error;
  }
};

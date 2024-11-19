import { IPostIt } from "@/types/rollingPaperTypes";

export type SelectOptionsProps = {
  selectOption: string;
  setPreview: React.Dispatch<React.SetStateAction<IPostIt>>;
  previewPostIt: IPostIt;
};

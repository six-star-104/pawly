import { IPostIt } from "@/types/rollingPaperTypes";

export interface ArrowSelectContainerProps {
  preViewPostIt: IPostIt;
  setPreviewPostIt: React.Dispatch<React.SetStateAction<IPostIt>>;
  forWhat: string;
  children?: React.ReactNode;
}

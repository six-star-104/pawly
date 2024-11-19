import { IPostIt } from "@/types/rollingPaperTypes";
import { ITheme } from "@/types/rollingPaperTypes";

export interface ArrowSelectContainerProps {
  preViewPostIt: IPostIt;
  setPreviewPostIt: React.Dispatch<React.SetStateAction<IPostIt>>;
  forWhat: string;
  themes?: ITheme[];
  children?: React.ReactNode;
}

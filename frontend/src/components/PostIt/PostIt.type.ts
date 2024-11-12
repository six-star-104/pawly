import { IPostIt } from "@/types/rollingPaperTypes";

export type PostItProps = {
  postitId?: number;
  // content: string;
  // memberId:number;
  // nickname:string;
  props: IPostIt;
  isPreview?: boolean;
  deletePostit: (id: number) => Promise<void>;
  editPostit: (data: IPostIt) => Promise<void>;
};

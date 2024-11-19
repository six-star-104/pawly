import { IPostIt } from "@/types/rollingPaperTypes";

export type FormProps = {
  props: IPostIt;
  onClose: () => void;
  // 생성용이면 true, 수정용이면 false
  isCreate: boolean;
  rollingPaperId?: string;
  createPostit?: (data:IPostIt, id:string) => Promise<void>;
  editPostit?: (data:IPostIt) => Promise<void>;
};

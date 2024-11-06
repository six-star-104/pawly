import { PostItStyle } from "../SelectOptions/SelectOptions.type";

export type FormProps = {
  props: PostItStyle;
  onClose: () => void;
  // 생성용이면 true, 수정용이면 false
  isCreate: boolean;
};

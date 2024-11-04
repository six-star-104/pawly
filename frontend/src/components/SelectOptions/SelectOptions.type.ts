export type PostItStyle = {
  postitId: number;
  // 얘 둘은 가변으로 받아오기
  memberId: number;
  memberNickname: string;
  content: string;
  backgroundColorer: number;
  image: string | null;
  fontColorer: number;
  borderColorer: number;
  speechBubbleSize: number;
};

export type SelectOptionsProps = {
  selectOption: string;
  setPreview: React.Dispatch<React.SetStateAction<PostItStyle>>;
  previewPostIt: PostItStyle
};

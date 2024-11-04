export type PostItProps = {
  // postitId:number;
  // content: string;
  // memberId:number;
  // nickname:string;
  props: {
    postitId: number;
    memberId: number;
    memberNickname: string;
    content: string;
    // status: string;
    // createdAt: string;
    // updatedAt: string;
    // 둘중 하나는 null로 오니까
    backgroundColorer?: number|null;
    image?: string | null;

    fontColorer: number;
    borderColorer: number;
    speechBubbleSize: number;
  };
};

export interface IPostIt {
  postItId?: number;
  memberId: number;
  memberNickname: string;

  content: string;
  status?: string;
  backgroundColor:number;
  fontColor:number;
  borderColor: number;
  image: string;
  speechBubbleSize: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRollingPaper {
  ownerMemberId: number;
  ownerMemberNickname: string;
  rollingPaperTitle: string;
  content: IPostIt[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

export interface IRollingPapers {
  content: {
    rollingPaperId: number;
    title: string;
    category: number;
    createdAt: string;
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

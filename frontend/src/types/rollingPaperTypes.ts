export interface IPostItSummary {
  postitId: number;
  memberId: number;
  memberNickname: string;
  content: string;

  backgroundColorer: number | null;
  image: string | null;

  fontColorer: number;
  borderColorer: number;
  speechBubbleSize: number;
  preview?: boolean;
}

export interface IPostIt {
  postitId: number;
  memberId: number;
  memberNickname: string;
  content: string;

  backgroundColorer: number | null;
  image: string | null;

  fontColorer: number;
  borderColorer: number;
  speechBubbleSize: number;
  preview?: boolean;
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

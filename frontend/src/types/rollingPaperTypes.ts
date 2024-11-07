export interface ITheme {
  backgroundColor: number;
  fontColor: number;
  borderColor: number;
  image: string;
  themeName: string;
  base: boolean;
  status: boolean;
}

export interface IPostIt {
  postItId?: number;
  memberId?: number;
  memberNickname: string;

  content: string;
  status?: string;

  // 이 4개가 DTO로 받을수도 있고,
  backgroundColor: number;
  fontColor: number;
  borderColor: number;
  image: string;
  // 2개 추가로 생길 예정
  // font: number;
  // themeName: string;
  // base:boolean으로 올수도??
  // status:boolean  미션 달성여부

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

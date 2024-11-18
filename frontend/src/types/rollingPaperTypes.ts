// 테마 내용
export interface ITheme {
  theme: number;
  themeName: string;
  background: string;
  fontColor: string;
  borderColor: string;
  flag: boolean;
}
// 상세 조회 시 하나의 포스트 잇
export interface IPostIt {
  postItId?: number;
  memberId?: number;
  memberNickname?: string;

  content?: string;
  status?: string;

  // 이 4개가 DTO로 받을수도 있고,
  themeId: number;
  backgroundColor: string;
  font: number;
  fontColor: string;
  borderColor: string;
  image: string;
  // 2개 추가로 생길 예정
  // font: number;
  themeName?: string;
  base?: boolean; //으로 올수도??
  speechBubbleSize: number;

  createdAt?: string;
  updatedAt?: string;
}

// 롤링페이퍼 상세 조회
export interface IRollingPaper {
  ownerMemberId?: number;
  ownerMemberNickname?: string;
  rollingPaperTitle?: string;
  content?: IPostIt[];
  pageNumber?: number;
  pageSize?: number;
  totalPage?: number;
  totalElements?: number;
}

export interface IRollingPaperSum {
  rollingPaperId: number;
  title: string;
  status: string;
  category: number;
  createdAt: string;
}
// 롤링페이퍼 전체 조회
export interface IRollingPapers {
  content: IRollingPaperSum[];
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

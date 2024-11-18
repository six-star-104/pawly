export interface ICollectionContent {
  collectionId: number;
  nickname: string;
  assets: string;
}

export interface ICollectionResponseData {
  content: ICollectionContent[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

export interface ILetterList {
  content: ILetterListContent[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

export interface ILetterListContent {
  receiveLetterId: number;
  senderId: string;
  senderName: string;
  content: string;
  letterId: number;
  createdAt: string;
  updatedAt: string;
}
export interface IReceiveLetter {
  receiveLetterId: number;
  letterId: number;
  senderId: string;
  senderName: string;
  content: string;
  picture?: string;
  reaction?: number;
  createdAt: string;
  updatedAt: string;
}

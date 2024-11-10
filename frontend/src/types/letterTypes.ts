// 편지함 응답
export interface IReceiveLetterList {
  content: IReceiveLetterListContent[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

// 받은 편지 content
export interface IReceiveLetterListContent {
  receiveLetterId: number;
  senderId: string;
  senderName: string;
  content: string;
  letterId: number;
  createdAt: string;
  updatedAt: string;
}

// 받은 편지 detail
export interface IReceiveLetter {
  recipientName: string;
  recipientId: number;
  letterId: number;
  senderId: string;
  senderName: string;
  content: string;
  picture?: string;
  reaction?: number;
  createdAt: string;
  updatedAt: string;
}

// 보낸 편지함 응답
export interface ISendLetterList {
  content: ISendLetterListContent[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalElements: number;
}

// 보낸 편지 content
export interface ISendLetterListContent {
  sendLetterId: number;
  recipientId: string;
  recipientName: string;
  content: string;
  letterId: number;
  createdAt: string;
  updatedAt: string;
}

// 보낸 편지 detail
export interface ISendLetter {
  recipientId: number;
  recipientName: string;
  letterId: number;
  senderId: string;
  senderName: string;
  content: string;
  picture?: string;
  reaction?: number;
  createdAt: string;
  updatedAt: string;
}

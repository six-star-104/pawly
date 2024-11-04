export interface ILetter {
  letterId: number;
  senderId: string;
  senderNickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface IReadLetter {
  letterId: number;
  senderId: string;
  senderNickname: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  picture: string;
  reaction: string;
}
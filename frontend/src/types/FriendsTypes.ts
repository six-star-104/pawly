export interface FriendType {
  friendId: number;
  memberId: number;
  name: string;
  nickname: string;
  assets: string;
  birth: string;
  email: string;
}

export interface FriendRequestType {
  friendId: number;
  memberId: number;
  name: string;
  nickname: string;
  assets: string;
}

export interface FriendRequestResponseType {
  friendId: number;
  status: boolean;
}

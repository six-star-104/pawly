// 요청 타입
export interface FriendRequest {
  memberId: number;
}

// 응답 타입
export interface FriendResponse {
  status: "success" | "error"; // 성공 또는 오류 상태를 표현하기 위해 유니온 타입 사용
  data: null; // 이 API 응답에서 `data`는 null입니다.
  code: number | null; // `code`는 null이거나 숫자일 수 있습니다.
  message: string; // 메시지는 문자열로 정의
}

export interface FriendRequestReceived {
  friendId: number;
  memberId: number;
  name: string;
  nickname: string;
  assets: string;
}

export interface FriendRequestResponse {
  status: string;
  data: FriendRequestReceived[];
  code: null | number;
  message: string;
}


export interface Friend {
  friendId: number;     
  memberId: number;     
  name: string;         
  nickname: string;     
  assets: string;       
}


export interface FriendListResponse {
  status: string;               
  data: Friend[];               
  code: null | string;          
  message: string;              
}

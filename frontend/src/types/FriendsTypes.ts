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

export interface SentFriendRequest {
  friendId: number; // 친구 요청 ID
  memberId: number; // 신청한 친구 ID
  name: string; // 친구 이름
  nickname: string; // 친구 닉네임
  assets: string; // 자산 정보
}

export interface SentFriendRequestResponse {
  status: string; // 응답 상태 (예: "success")
  data: SentFriendRequest[]; // 친구 요청 목록 배열
  code: null | string; // 코드 (null이거나 문자열)
  message: string; // 응답 메시지
}

export interface DeleteFriendResponse {
  status: string; // 응답 상태 (예: "success")
  data: null; // 데이터가 없으므로 null
  code: null | string; // 에러 코드가 없으면 null, 있을 경우 문자열
  message: string; // 응답 메시지 (예: "친구 삭제 성공")
}

export interface MemberInfoResponse {
  status: string;
  data: {
    nickname: string;
    name: string;
    assets?: string | null; // assets가 null일 가능성이 있으므로 옵셔널로 설정
    memberId: number;
    birth?: string | null;
  };
  code: number | null;
  message: string;
}
export type OAuthInfoType = {
  email: string;
  name: string;
  provider: "kakao" | "naver";
  providerId: string;
};

export type LoginResponseType = {
  accessToken: string;
  userInfo: UserInfoType;
};

export type UserInfoType = {
  isInitialized: boolean;
  userId: string;
  name: string;
  email: string;
  provider: string;
  providerId: string;

  nickname: string;
  assets: string;
};

export type SignUpType = {
  name: string;
  email: string;
  provider: string;
  providerId: string;
  nickname: string;
  asset: File | null;
};

export type SignupNicknameProps = {
  onValidationChange?: (isValid: boolean) => void;
};

export type SignupAssetsProps = {
  assets: string;
  setAssets: (assets: string) => void;
};

// 개별 항목에 대한 타입 정의
export interface MemberInfo {
  userId: string;
  name: string;
  email: string;
  provider: string;
  providerId: string;
  nickname: string;
  birth: string | null | undefined;
  assets: string;
}


export interface CollectionInfo {
  collections: string[];
}

// API 응답 데이터 타입 정의
export interface ProfileData {
  memberId: string;
  name: string; // API에서 받아오는 필드
  email: string;
  provider: string;
  providerId: string;
  nickname: string;
  birth: string | null | undefined;
  assets: string;
  collections: string[];
}

// MypageType 정의
export interface MypageType {
  isInitialized: boolean;
  memberId: string;
  userId: string;
  username: string; // 앱 내부에서 사용하는 필드명으로 username 추가
  email: string;
  provider: string;
  providerId: string;
  nickname: string;
  assets: string;
  birth: string | null | undefined;
  collections: string[];
}
export interface GetMyInfoResponse {
  status: string;           
  data: ProfileData;         
  message: string;          
}

export interface UpdateNicknameResponse {
  status: string;
  data: null;
  code: number | null;
  message: string;
}

export interface GetFriendInfoResponse {
  status: string; 
  data: {
    member: {
      nickname: string; 
      birth: string; 
      assets: string; 
    };
    collection: {
      collections: any[];  
    };
  };
  code: null | string; 
  message: string; 
}
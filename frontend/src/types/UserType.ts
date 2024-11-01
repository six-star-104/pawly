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
  assetsName: string;
};

export type SignUpType = {
  name: string;
  email: string;
  provider: string;
  providerId: string;
  nickname: string;
  assets: string;
  assetsName: string;
};

export type SignupNicknameProps = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

export type SignupAssetsProps = {
  assets: string;
  setAssets: (assets: string) => void;
  assetsName: string;
  setAssetsName: (assetsName: string) => void;
};

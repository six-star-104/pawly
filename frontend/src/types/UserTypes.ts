export type UserInfoType = {
  isInitialized: boolean;
  memberId: number;
  name: string;
  email: string;
  provider: string;
  providerId: string;
  birth: string | null | undefined;
  collections: string[];
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

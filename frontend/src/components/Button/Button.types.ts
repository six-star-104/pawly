import { ReactNode } from 'react';

export type ButtonVariant = 'contained' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullwidth?: boolean;
  rounded?: number;
  color?: string;
  backgroundColor?: string;
  fontSize?: string; // 폰트 크기 설정
  padding?: string; // 패딩 설정
  width?: string; // 버튼 너비 설정
  height?: string; // 버튼 높이 설정
  handler: () => void;
}

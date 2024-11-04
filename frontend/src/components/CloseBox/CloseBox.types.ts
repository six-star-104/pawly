import { ReactNode } from 'react';

export interface CloseBoxProps extends React.ComponentProps<'button'> {
  children: ReactNode;
}
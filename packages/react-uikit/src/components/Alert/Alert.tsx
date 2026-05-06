import type { FC, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Alert: FC<AlertProps> = ({ className, children }) => {
  return <div className={cn('uk-alert', className)}>{children}</div>;
};

import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils';

export interface OffCanvasBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const OffCanvasBar = ({ className, children, ...props }: OffCanvasBarProps) => {
  const classes = cn('uk-offcanvas-bar', className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default OffCanvasBar;

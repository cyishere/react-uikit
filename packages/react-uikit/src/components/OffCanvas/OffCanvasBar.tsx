import type { HTMLAttributes, ReactNode } from 'react';

import { useOffCanvasContext } from './OffCanvasContext';
import { cn } from '../../utils';

export interface OffCanvasBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const OffCanvasBar = ({ className, children, ...props }: OffCanvasBarProps) => {
  // TODO: needed for the focus trap
  const { open } = useOffCanvasContext();

  const classes = cn('uk-offcanvas-bar', className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default OffCanvasBar;

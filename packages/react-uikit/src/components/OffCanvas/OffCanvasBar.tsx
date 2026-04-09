import type { HTMLAttributes, ReactNode } from 'react';

import { useEffect, useRef } from 'react';
import { lock, unlock } from 'tua-body-scroll-lock';

import { useOffCanvasContext } from './OffCanvasContext';
import { cn } from '../../utils';

export interface OffCanvasBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const OffCanvasBar = ({ className, children, ...props }: OffCanvasBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // TODO: needed for the focus trap
  const { open } = useOffCanvasContext();

  const classes = cn('uk-offcanvas-bar', className);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    if (open) {
      lock(el);
    } else {
      unlock(el);
    }

    return () => {
      unlock(el);
    };
  }, [open]);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default OffCanvasBar;

import * as React from 'react';

import { cn, isDev } from '../../utils';

export interface OffCanvasBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const OffCanvasBar = ({ className, children, ...props }: OffCanvasBarProps) => {
  const classes = cn('uk-offcanvas-bar', className);

  if (isDev) {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      console.warn(
        '[react-uikit] OffCanvasBar: provide either aria-label or aria-labelledby for screen reader accessibility.'
      );
    }
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default OffCanvasBar;

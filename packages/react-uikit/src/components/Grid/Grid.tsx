import * as React from 'react';

import { useGridRowClasses } from '../../hooks/useGridRowClasses';
import { cn, isDev } from '../../utils';

const VALID_GRID_ELEMENTS = new Set([
  'div',
  'ul',
  'ol',
  'section',
  'article',
  'main',
  'aside',
  'nav'
]);

export interface GridProps extends React.ComponentProps<'div'> {
  as?: React.ElementType;
}

export const Grid: React.FC<GridProps> = ({ as: Comp = 'div', className, children, ...props }) => {
  const ref = React.useRef<HTMLElement>(null);

  if (isDev && typeof Comp === 'string' && !VALID_GRID_ELEMENTS.has(Comp)) {
    console.warn(
      `[react-uikit] Grid: "${Comp}" is not a recommended element for Grid. ` +
        `Use one of: ${[...VALID_GRID_ELEMENTS].join(', ')}.`
    );
  }

  useGridRowClasses(ref);

  return (
    <Comp ref={ref} className={cn('uk-grid', className)} {...props}>
      {children}
    </Comp>
  );
};

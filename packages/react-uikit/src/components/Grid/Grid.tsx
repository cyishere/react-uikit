import * as React from 'react';

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
  if (isDev && typeof Comp === 'string' && !VALID_GRID_ELEMENTS.has(Comp)) {
    console.warn(
      `[react-uikit] Grid: "${Comp}" is not a recommended element for Grid. ` +
        `Use one of: ${[...VALID_GRID_ELEMENTS].join(', ')}.`
    );
  }

  return (
    <Comp className={cn('uk-grid', className)} {...props}>
      {children}
    </Comp>
  );
};

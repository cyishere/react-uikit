import * as React from 'react';
import uikit from 'uikit';

import { useGridRowClasses, useIsomorphicLayoutEffect } from '../../hooks';
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
  /**
   * Enable UIkit masonry layout for this grid.
   * - `"pack"`: sorts items into the column with the most room to equalise column heights.
   * - `"next"`: uses the natural item order.
   */
  masonry?: 'pack' | 'next';
  /**
   * Enable UIkit height-match on the grid cells.
   * - `true`: uses the default target `"> *"` (direct children of each cell).
   * - `string`: a custom CSS selector passed as the `target` option.
   */
  matchHeight?: boolean | string;
  /**
   * When `matchHeight` is enabled, only match heights within the same row.
   * Default: `true`.
   */
  matchRow?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  as: Comp = 'div',
  className,
  children,
  masonry,
  matchHeight,
  matchRow = true,
  ...props
}) => {
  const ref = React.useRef<HTMLElement>(null);

  if (isDev && typeof Comp === 'string' && !VALID_GRID_ELEMENTS.has(Comp)) {
    console.warn(
      `[react-uikit] Grid: "${Comp}" is not a recommended element for Grid. ` +
        `Use one of: ${[...VALID_GRID_ELEMENTS].join(', ')}.`
    );
  }

  useGridRowClasses(ref);

  useIsomorphicLayoutEffect(() => {
    if (!masonry || !ref.current) return;

    const instance = uikit.grid(ref.current, { masonry });

    return () => {
      instance.$destroy();
    };
  }, [masonry]);

  useIsomorphicLayoutEffect(() => {
    if (!matchHeight || !ref.current) return;

    const target = typeof matchHeight === 'string' ? matchHeight : '> *';
    const instance = uikit.heightMatch(ref.current, { target, row: matchRow });

    return () => {
      instance.$destroy();
    };
  }, [matchHeight, matchRow]);

  return (
    <Comp ref={ref} className={cn('uk-grid', className)} {...props}>
      {children}
    </Comp>
  );
};

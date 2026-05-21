import * as React from 'react';
import uikit from 'uikit';

import { useGridRowClasses } from '../../hooks/useGridRowClasses';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
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

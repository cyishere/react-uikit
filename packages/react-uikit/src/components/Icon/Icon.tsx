/**
 * Icon — generic UIkit icon renderer.
 *
 * Renders a UIkit icon as a `<span class="uk-icon">` wrapping
 * an inline `<svg>`, matching UIkit's DOM structure so `uk-icon`
 * CSS rules apply correctly.
 *
 * - The inner SVG is always `aria-hidden="true"` since icons are decorative.
 * - `UIkitIconName` is derived from the registry's keys, so invalid icon names produce a TypeScript error at compile time.
 */
import * as React from 'react';

import { cn } from '@/utils';

import type { UIkitIconName } from './registry';
import { getIconSvg } from './registry';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  ref?: React.Ref<HTMLSpanElement>;
  /** The UIkit icon name to render (e.g. `"heart"`, `"check"`) */
  name: UIkitIconName;
  /**
   * Accessible label for the icon.
   * If omitted, the icon is considered decorative and hidden from screen readers.
   */
  label?: string;
  /**
   * Scales the icon by this multiplier.
   * For example: `ratio={2}` renders the icon at 2x its natural size.
   * @defaultValue 1
   */
  ratio?: number;
}

export const Icon = ({ ref, name, label, ratio = 1, className, ...props }: IconProps) => {
  const svg = getIconSvg(name, ratio);

  const classes = cn('uk-icon', className);

  return (
    <span
      ref={ref}
      className={classes}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
};

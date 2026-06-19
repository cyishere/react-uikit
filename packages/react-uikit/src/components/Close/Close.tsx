/**
 * Close — UIkit close-button glyph component.
 *
 * Replaces the SVG that UIkit JS would normally inject for
 * `uk-close` / `uk-close-large`. This library intentionally
 * excludes UIkit JS, so this React component takes over that
 * responsibility.
 *
 * Design notes (see _docs/icon-system.md § Implementation Decisions):
 *
 * - Renders a `<button>` by default (not a `<span>`) so it is a
 *    native interactive element with correct keyboard and
 *    accessibility semantics.
 * - Uses Radix UI's `Slot` for the `asChild` pattern, which lets
 *    consumers swap the root element for any custom component
 *    (e.g. React Router `<Link>`) while still receiving all classes,
 *    attributes, and `ref`.
 * - When `asChild` is active, `React.cloneElement` is used to inject
 *    the SVG *inside* the passed child, guaranteeing a visible click
 *    target without requiring consumers to supply the icon themselves.
 * - SVG paths use `currentColor` for `stroke` so the icon inherits
 *    the surrounding CSS text color — no extra styling needed by
 *    consumers.
 * - `close-icon.svg` (14×14) and `close-large.svg` (20×20) are UIkit's
 *    *component* glyphs (from `src/images/components/`). They are
 *    intentionally NOT entries in the generic icon registry used by
 *    `<Icon>` because UIkit itself treats them as a separate asset
 *    category.
 */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';

/**
 * Inline SVG for UIkit's `close-icon.svg` (14×14).
 * Matches `uk-close` — the standard modal / dismissible close glyph.
 * `stroke="currentColor"` to enable CSS color inheritance.
 */
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    aria-hidden="true"
  >
    <path fill="none" stroke="currentColor" strokeWidth="1.1" d="m1 1 12 12M13 1 1 13" />
  </svg>
);

/**
 * Inline SVG for UIkit's `close-large.svg` (20×20).
 * Matches `uk-close-large` — used inside full-screen / cover modals.
 * `stroke="currentColor"` to enable CSS color inheritance.
 */
const CloseLargeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path fill="none" stroke="currentColor" strokeWidth="1.4" d="m1 1 18 18M19 1 1 19" />
  </svg>
);

export interface CloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  /**
   * Renders the 20×20 close-large glyph and applies `uk-close-large` instead of `uk-close`.
   * @defaultValue false
   */
  large?: boolean;
  /**
   * Accessible label for the close button.
   * @defaultValue 'Close'
   */
  label?: string;
  /**
   * When `true`, merges all props onto the single child element
   * via Radix `Slot` instead of rendering a `<button>`. The correct
   * SVG is automatically injected inside the child via
   * `React.cloneElement`.
   * @defaultValue false
   */
  asChild?: boolean;
}

export const Close = ({
  ref,
  asChild = false,
  className,
  label = 'Close',
  large = false,
  type,
  children,
  ...props
}: CloseProps) => {
  // Use Radix Slot when asChild is true so consumers can swap the
  // root element (e.g. <a>, <Link>) while still receiving all
  // classes, attributes, and ref.
  const Comp = asChild ? Slot : 'button';

  // UIkit requires both `uk-icon` (base icon reset) and the variant
  // class (`uk-close` or `uk-close-large`) to be present on the same
  // element.
  const classes = cn('uk-icon', large ? 'uk-close-large' : 'uk-close', className);

  // Default to type="button" in standard button mode to prevent
  // accidental form submissions. We cast explicitly because `Slot`
  // changes the inferred type.
  // In `asChild` mode the `type` prop is irrelevant (non-button elements ignore it).
  const compProps = !asChild
    ? ({ type: type ?? 'button', ...props } as React.ButtonHTMLAttributes<HTMLButtonElement>)
    : props;

  const icon = large ? <CloseLargeIcon /> : <CloseIcon />;

  return (
    <Comp ref={ref} className={classes} aria-label={label} {...compProps}>
      {/*
      In `asChild` mode, clone the child and inject the SVG inside it. This ensures the icon is always rendered even when consumers provide their own element (e.g. an empty <a> or <Link>). In standard `button` mode, render the SVG directly as the only child.
      */}
      {asChild && React.isValidElement(children) ? React.cloneElement(children, {}, icon) : icon}
    </Comp>
  );
};

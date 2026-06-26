import * as React from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import UIkit from 'uikit';

import { useIsomorphicLayoutEffect } from '@/hooks';
import { cn, isDev } from '@/utils';

// ---------------------------------------------------------------------------
// OffCanvasRoot
// ---------------------------------------------------------------------------

type OffcanvasInitOptions = UIkit.UIkitOffcanvasOptions & { swiping?: boolean };

/**
 * Public props for the OffCanvas component.
 */
export interface OffCanvasProps {
  /** Controls whether the off-canvas is visible. */
  open: boolean;
  /** Called when UIkit finishes closing (e.g. overlay click or Escape key). */
  onClose: () => void;
  /**
   * Enables UIkit overlay behavior.
   * @defaultValue false
   */
  overlay?: boolean;
  /**
   * Places the panel on the right side instead of the left.
   * @defaultValue false
   */
  flip?: boolean;
  /**
   * UIkit off-canvas animation mode.
   * @defaultValue 'slide'
   */
  mode?: 'slide' | 'push' | 'reveal' | 'none';
  /**
   * Close the off-canvas when the Escape key is pressed.
   * @defaultValue true
   */
  escClose?: boolean;
  /**
   * Close the off-canvas when the background is clicked.
   * @defaultValue true
   */
  bgClose?: boolean;
  /**
   * Close the off-canvas when the panel is swiped away.
   * @defaultValue true
   */
  swiping?: boolean;
  /** Off-canvas content, usually including OffCanvasBar. */
  children: React.ReactNode;
}

const OffCanvasRoot = ({
  open,
  onClose,
  overlay = false,
  flip = false,
  mode = 'slide',
  escClose = true,
  bgClose = true,
  swiping = true,
  children
}: OffCanvasProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const instanceRef = React.useRef<ReturnType<typeof UIkit.offcanvas> | null>(null);
  const onCloseRef = React.useRef(onClose);
  const openRef = React.useRef(open);
  const didInitialShowRef = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const options: OffcanvasInitOptions = {
      mode,
      flip,
      overlay,
      escClose,
      bgClose,
      // `swiping` is a valid runtime option but missing from UIkitOffcanvasOptions
      swiping
    };

    const oc = UIkit.offcanvas(el, options);
    instanceRef.current = oc;

    // On initial mount, defer the first show() to the visibility effect to avoid a
    // double show(). Only re-show here when options change after mount (instance recreated).
    if (didInitialShowRef.current && openRef.current) {
      oc.show();
    }

    const handleHidden = () => onCloseRef.current();
    UIkit.util.on(el, 'hidden', handleHidden);

    return () => {
      UIkit.util.off(el, 'hidden', handleHidden);
      oc.$destroy();
      instanceRef.current = null;
    };
  }, [mode, flip, overlay, escClose, bgClose, swiping]);

  useIsomorphicLayoutEffect(() => {
    const oc = instanceRef.current;
    if (!oc) return;

    if (open) {
      oc.show();
    } else {
      oc.hide();
    }

    didInitialShowRef.current = true;
  }, [open]);

  return createPortal(
    <FocusLock disabled={overlay || !open} returnFocus={true}>
      <RemoveScroll enabled={!overlay && open}>
        <div ref={ref} className="uk-offcanvas">
          {children}
        </div>
      </RemoveScroll>
    </FocusLock>,
    document.body
  );
};

// ---------------------------------------------------------------------------
// OffCanvasBar
// ---------------------------------------------------------------------------

export type OffCanvasBarProps = React.ComponentProps<'div'>;

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

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const OffCanvas = {
  Root: OffCanvasRoot,
  Bar: OffCanvasBar
};

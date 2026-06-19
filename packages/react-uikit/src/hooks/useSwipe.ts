import * as React from 'react';

export interface UseSwipeOptions {
  onSwipeLeft?: (() => void) | undefined;
  onSwipeRight?: (() => void) | undefined;
  threshold?: number | undefined;
  enabled?: boolean | undefined;
}

/**
 * Detects horizontal swipe gestures on a target element.
 */
export const useSwipe = (
  ref: React.RefObject<HTMLElement | null>,
  { onSwipeLeft, onSwipeRight, threshold = 100, enabled = true }: UseSwipeOptions
) => {
  React.useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let startX: number | null = null;
    let startY: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handlePointerEnd = (e: PointerEvent) => {
      if (startX === null || startY === null || e.pointerType !== 'touch') return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Dominant axis must be horizontal.
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }

      startX = null;
      startY = null;
    };

    const handleScroll = () => {
      startX = null;
      startY = null;
    };

    element.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerEnd);
    window.addEventListener('pointercancel', handlePointerEnd);
    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
      window.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [ref, onSwipeLeft, onSwipeRight, threshold, enabled]);
};

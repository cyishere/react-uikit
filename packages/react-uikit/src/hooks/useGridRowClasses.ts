import type * as React from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

const getOffset = (element: HTMLElement, useAbsoluteOffset = false) => {
  let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;

  if (useAbsoluteOffset) {
    const rect = element.getBoundingClientRect();
    offsetTop = rect.top + window.scrollY;
    offsetLeft = rect.left + window.scrollX;
  }

  return {
    top: offsetTop,
    left: offsetLeft,
    bottom: offsetTop + offsetHeight,
    right: offsetLeft + offsetWidth
  };
};

/**
 * Groups visible child elements into rows based on their vertical position,
 * mirroring UIkit's `Margin` mixin `getRows` algorithm.
 *
 * @see https://github.com/uikit/uikit/blob/develop/src/js/core/margin.js
 */
const getRows = (elements: Element[]): Element[][] => {
  const sortedInRows: Element[][] = [[]];

  const withOffset = elements.some(
    (el, i) =>
      i && (elements[i - 1] as HTMLElement).offsetParent !== (el as HTMLElement).offsetParent
  );

  for (const el of elements) {
    const currentElement = el as HTMLElement;
    // Skip invisible elements
    if (currentElement.offsetWidth === 0 && currentElement.offsetHeight === 0) {
      continue;
    }

    const currentElementOffset = getOffset(currentElement, withOffset);

    for (let i = sortedInRows.length - 1; i >= 0; i--) {
      const currentRow = sortedInRows[i]!;

      if (!currentRow[0]) {
        currentRow.push(el);
        break;
      }

      const currentRowFirstElementOffset = getOffset(currentRow[0] as HTMLElement, withOffset);

      // Element is below the current row
      if (
        currentElementOffset.top >= currentRowFirstElementOffset.bottom - 1 &&
        currentElementOffset.top !== currentRowFirstElementOffset.top
      ) {
        sortedInRows.push([el]);
        break;
      }

      // Element overlaps or is on the same row
      if (
        currentElementOffset.bottom - 1 > currentRowFirstElementOffset.top ||
        currentElementOffset.top === currentRowFirstElementOffset.top
      ) {
        // Insert in left-to-right order
        let j = currentRow.length - 1;
        for (; j >= 0; j--) {
          const rowItemOffset = getOffset(currentRow[j] as HTMLElement, withOffset);

          if (currentElementOffset.left >= rowItemOffset.left) {
            break;
          }
        }
        currentRow.splice(j + 1, 0, el);
        break;
      }

      // Element is above all existing rows
      if (i === 0) {
        sortedInRows.unshift([el]);
        break;
      }
    }
  }

  return sortedInRows;
};

/**
 * Measures child element positions and toggles UIkit layout classes:
 * - `uk-grid-margin` on children that have wrapped to a non-first row
 * - `uk-first-column` on the first element in each row
 *
 * This mirrors UIkit's JS `Margin` mixin behavior, which the `uk-grid`
 * attribute triggers at runtime. Uses ResizeObserver to re-measure on
 * layout changes.
 *
 * @param ref - Ref to the grid container element
 * @param marginClass - Class to add to non-first-row children (default: 'uk-grid-margin')
 * @param firstColumnClass - Class to add to first-in-row children (default: 'uk-first-column')
 */
export const useGridRowClasses = (
  ref: React.RefObject<HTMLElement | null>,
  marginClass = 'uk-grid-margin',
  firstColumnClass = 'uk-first-column'
) => {
  useIsomorphicLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    function update() {
      if (!container) return;
      const children = Array.from(container.children);
      const rows = getRows(children);

      for (const row of rows) {
        for (const child of row) {
          const isFirstRow = rows[0] === row;
          const isFirstColumn = row[0] === child;

          child.classList.toggle(marginClass, !isFirstRow);
          child.classList.toggle(firstColumnClass, isFirstColumn);
        }
      }
    }

    // Initial measurement after mount
    update();

    // Re-measure on resize of the container or any child
    const targets = [container, ...Array.from(container.children)];

    const resizeObs = new ResizeObserver(update);

    for (const target of targets) {
      resizeObs.observe(target);
    }

    // Also observe child list changes (items added/removed)
    const mutationObs = new MutationObserver(() => {
      // Update observer targets when children change
      resizeObs.disconnect();

      const newTargets = [container, ...Array.from(container.children)];
      for (const target of newTargets) {
        resizeObs.observe(target);
      }

      update();
    });

    mutationObs.observe(container, { childList: true });

    return () => {
      resizeObs.disconnect();
      mutationObs.disconnect();

      // Clean up classes on unmount
      for (const child of Array.from(container.children)) {
        child.classList.remove(marginClass, firstColumnClass);
      }
    };
  }, [ref, marginClass, firstColumnClass]);
};

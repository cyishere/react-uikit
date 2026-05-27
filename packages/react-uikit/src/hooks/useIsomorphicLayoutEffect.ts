import * as React from 'react';

/**
 * Uses `useLayoutEffect` on the client (synchronous, before paint)
 * and `useEffect` on the server (avoids SSR warnings).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

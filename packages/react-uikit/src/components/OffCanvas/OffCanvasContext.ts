import { createContext, useContext } from 'react';

interface OffCanvasContextValue {
  open: boolean;
}

export const OffCanvasContext = createContext<OffCanvasContextValue | null>(null);

export const useOffCanvasContext = (): OffCanvasContextValue => {
  const context = useContext(OffCanvasContext);

  if (!context) {
    throw new Error('OffCanvasBar must be used within an OffCanvas.');
  }

  return context;
};

import type { ReactNode } from 'react';

import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { OffCanvasContext } from './OffCanvasContext';
import { cn } from '../../utils';

export interface OffCanvasProps {
  open: boolean;
  onClose?: () => void;
  overlay?: boolean;
  flip?: boolean;
  mode?: 'slide' | 'push' | 'reveal' | 'none';
  children: ReactNode;
}

const OffCanvas = ({
  open,
  onClose,
  overlay = false,
  flip = false,
  mode = 'none',
  children
}: OffCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const classes = cn('uk-offcanvas', open && 'uk-open', flip && 'uk-offcanvas-flip');
  const styles = open ? { display: 'block' } : {};

  return createPortal(
    <OffCanvasContext.Provider value={{ open }}>
      <div
        ref={containerRef}
        className={classes}
        style={styles}
        data-uk-offcanvas={`mode: ${mode}; overlay: ${overlay}`}
      >
        {children}
      </div>
    </OffCanvasContext.Provider>,
    document.body
  );
};

export default OffCanvas;

import type { ReactNode } from 'react';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import UIkit from 'uikit';

export interface OffCanvasProps {
  open: boolean;
  onClose: () => void;
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
  const ref = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      const _offcanvas = UIkit.offcanvas(el);

      if (open) {
        _offcanvas.show();
      } else {
        _offcanvas.hide();
      }

      const handleHidden = () => onCloseRef.current();
      UIkit.util.on(el, 'hidden', handleHidden);

      return () => {
        UIkit.util.off(el, 'hidden', handleHidden);
      };
    }
  }, [open]);

  return createPortal(
    <FocusLock disabled={overlay || !open} returnFocus={true}>
      <RemoveScroll enabled={!overlay && open}>
        <div
          ref={ref}
          className="uk-offcanvas"
          data-uk-offcanvas={`mode: ${mode}; overlay: ${overlay}; flip: ${flip}`}
        >
          {children}
        </div>
      </RemoveScroll>
    </FocusLock>,
    document.body
  );
};

export default OffCanvas;

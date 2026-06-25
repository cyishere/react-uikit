import { useState } from 'react';
import { Close, OffCanvas } from '@cyishere/react-uikit';

const CloseBehavior = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button type="button" className="uk-button uk-button-default" onClick={() => setIsOpen(true)}>
        Open
      </button>

      <OffCanvas.Root open={isOpen} onClose={handleClose} escClose={false} bgClose={false} overlay>
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handleClose} />

          <h3>Title</h3>

          <p>
            Pressing <code>Escape</code> or clicking the background will not close this off-canvas.
            Use the close button instead.
          </p>
        </OffCanvas.Bar>
      </OffCanvas.Root>
    </div>
  );
};

export default CloseBehavior;

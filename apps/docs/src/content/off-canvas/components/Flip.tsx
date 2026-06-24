import { useState } from 'react';
import { Close, OffCanvas } from '@cyishere/react-uikit';

const Flip = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button type="button" className="uk-button uk-button-default" onClick={() => setIsOpen(true)}>
        Open
      </button>

      <OffCanvas.Root open={isOpen} onClose={handleClose} flip>
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handleClose} />

          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </OffCanvas.Bar>
      </OffCanvas.Root>
    </div>
  );
};

export default Flip;

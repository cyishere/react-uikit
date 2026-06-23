import { useState } from 'react';
import { Close, OffCanvas } from 'react-uikit';

const OffCanvasDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="uk-margin-top">
      <button type="button" className="uk-button uk-button-default" onClick={() => setIsOpen(true)}>
        Open
      </button>

      <OffCanvas.Root open={isOpen} onClose={handleClose} mode="slide">
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

      <div className="uk-padding">
        <button>Test focus</button>
        <a href="/#">Test Focus</a>
        <div style={{ height: '600px' }} />
      </div>
    </div>
  );
};

export default OffCanvasDemo;

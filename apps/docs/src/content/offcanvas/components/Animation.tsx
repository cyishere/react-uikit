import { useState } from 'react';
import { Close, OffCanvas } from 'react-uikit';

const OffCanvasDemo = () => {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [isPushOpen, setIsPushOpen] = useState(false);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [isNoneOpen, setIsNoneOpen] = useState(false);

  const handleSlideClose = () => setIsSlideOpen(false);
  const handlePushClose = () => setIsPushOpen(false);
  const handleRevealClose = () => setIsRevealOpen(false);
  const handleNoneClose = () => setIsNoneOpen(false);

  return (
    <div>
      <div className="uk-flex">
        <button
          type="button"
          className="uk-button uk-button-default"
          onClick={() => setIsSlideOpen(true)}
        >
          Slide
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-margin-small-left"
          onClick={() => setIsPushOpen(true)}
        >
          Push
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-margin-small-left"
          onClick={() => setIsRevealOpen(true)}
        >
          Reveal
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-margin-small-left"
          onClick={() => setIsNoneOpen(true)}
        >
          None
        </button>
      </div>

      <OffCanvas.Root open={isSlideOpen} onClose={handleSlideClose}>
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handleSlideClose} />

          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </OffCanvas.Bar>
      </OffCanvas.Root>

      <OffCanvas.Root open={isPushOpen} onClose={handlePushClose} mode="push">
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handlePushClose} />

          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </OffCanvas.Bar>
      </OffCanvas.Root>

      <OffCanvas.Root open={isRevealOpen} onClose={handleRevealClose} mode="reveal">
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handleRevealClose} />

          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </OffCanvas.Bar>
      </OffCanvas.Root>

      <OffCanvas.Root open={isNoneOpen} onClose={handleNoneClose} mode="none">
        <OffCanvas.Bar>
          <Close className="uk-offcanvas-close" onClick={handleNoneClose} />

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

export default OffCanvasDemo;

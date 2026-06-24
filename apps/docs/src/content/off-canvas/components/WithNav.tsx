/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Close, Icon, OffCanvas } from 'react-uikit';

const WithNav = () => {
  const [isPrimaryNavOpen, setIsPrimaryNavOpen] = useState(false);
  const [isDefaultNavOpen, setIsDefaultNavOpen] = useState(false);

  const handlePrimaryNavClose = () => setIsPrimaryNavOpen(false);
  const handleDefaultNavClose = () => setIsDefaultNavOpen(false);

  return (
    <div>
      <div className="uk-flex">
        <button
          type="button"
          className="uk-button uk-button-default"
          onClick={() => setIsPrimaryNavOpen(true)}
        >
          Primary Nav
        </button>
        <button
          type="button"
          className="uk-button uk-button-default uk-margin-small-left"
          onClick={() => setIsDefaultNavOpen(true)}
        >
          Default Nav
        </button>
      </div>

      <OffCanvas.Root open={isPrimaryNavOpen} onClose={handlePrimaryNavClose} overlay>
        <OffCanvas.Bar className="uk-flex uk-flex-column">
          <Close className="uk-offcanvas-close" onClick={handlePrimaryNavClose} />

          <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className="uk-active">
              <a href="#">Active</a>
            </li>
            <li className="uk-parent">
              <a href="#">Parent</a>
              <ul className="uk-nav-sub">
                <li>
                  <a href="#">Sub item</a>
                </li>
                <li>
                  <a href="#">Sub item</a>
                </li>
              </ul>
            </li>
            <li className="uk-nav-header">Header</li>
            <li>
              <a href="#">
                <Icon name="table" className="uk-margin-xsmall-right" /> Item
              </a>
            </li>
            <li>
              <a href="#">
                <Icon className="uk-margin-xsmall-right" name="thumbnails" /> Item
              </a>
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <a href="#">
                <Icon className="uk-margin-xsmall-right" name="trash" /> Item
              </a>
            </li>
          </ul>
        </OffCanvas.Bar>
      </OffCanvas.Root>

      <OffCanvas.Root open={isDefaultNavOpen} onClose={handleDefaultNavClose} overlay>
        <OffCanvas.Bar className="uk-flex uk-flex-column">
          <Close className="uk-offcanvas-close" onClick={handleDefaultNavClose} />

          <ul className="uk-nav uk-nav-default">
            <li className="uk-active">
              <a href="#">Active</a>
            </li>
            <li className="uk-parent">
              <a href="#">Parent</a>
              <ul className="uk-nav-sub">
                <li>
                  <a href="#">Sub item</a>
                </li>
                <li>
                  <a href="#">Sub item</a>
                </li>
              </ul>
            </li>
            <li className="uk-nav-header">Header</li>
            <li>
              <a href="#">
                <Icon className="uk-margin-xsmall-right" name="table" /> Item
              </a>
            </li>
            <li>
              <a href="#">
                <Icon className="uk-margin-xsmall-right" name="thumbnails" /> Item
              </a>
            </li>
            <li className="uk-nav-divider"></li>
            <li>
              <a href="#">
                <Icon className="uk-margin-xsmall-right" name="trash" /> Item
              </a>
            </li>
          </ul>
        </OffCanvas.Bar>
      </OffCanvas.Root>
    </div>
  );
};

export default WithNav;

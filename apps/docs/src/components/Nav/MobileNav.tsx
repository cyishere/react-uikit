import type { ReactNode } from 'react';
import { useState } from 'react';
import { Close, Icon, OffCanvas } from '@cyishere/react-uikit';

import styles from './MobileNav.module.css';

interface MobileNavProps {
  children: ReactNode;
}

const MobileNav = ({ children }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.wrapper} uk-navbar-item`}>
      <button
        className={`uk-button uk-button-default uk-button-small`}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Icon name="menu" label="Open menu" />
      </button>

      <OffCanvas.Root open={isOpen} onClose={handleClose} overlay>
        <OffCanvas.Bar aria-label="Mobile navigation">
          <Close className="uk-offcanvas-close" onClick={handleClose} />

          {children}
        </OffCanvas.Bar>
      </OffCanvas.Root>
    </div>
  );
};

export default MobileNav;

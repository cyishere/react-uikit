import type { ReactNode } from 'react';

import { useState } from 'react';
import { Close, Icon, OffCanvas, OffCanvasBar } from 'react-uikit';

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
			>
				<Icon name="menu" />
			</button>

			<OffCanvas open={isOpen} onClose={handleClose} overlay>
				<OffCanvasBar>
					<Close className="uk-offcanvas-close" onClick={handleClose} />

					{children}
				</OffCanvasBar>
			</OffCanvas>
		</div>
	);
};

export default MobileNav;

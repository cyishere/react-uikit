import { useState } from 'react';
import { Close, OffCanvas, OffCanvasBar } from 'react-uikit';

const OffCanvasDemo = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="uk-margin-top">
			<button type="button" className="uk-button uk-button-default" onClick={() => setIsOpen(true)}>
				Open
			</button>

			<OffCanvas open={isOpen}>
				<OffCanvasBar>
					<Close className="uk-offcanvas-close" onClick={() => setIsOpen(false)} />

					<h3>Title</h3>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
				</OffCanvasBar>
			</OffCanvas>
		</div>
	);
};

export default OffCanvasDemo;

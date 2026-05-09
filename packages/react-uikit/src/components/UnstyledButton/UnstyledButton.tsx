import * as React from 'react';

import './UnstyledButton.css';
import { cn } from '../../utils';

const UnstyledButton: React.FC<React.ComponentPropsWithoutRef<'button'>> = (props) => {
  return <button {...props} className={cn('ruk-unstyled-button uk-width-1-1', props.className)} />;
};

export default UnstyledButton;

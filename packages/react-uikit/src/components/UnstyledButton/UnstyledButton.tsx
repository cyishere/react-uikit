import * as React from 'react';

import { cn } from '@/utils';

import './UnstyledButton.css';

const UnstyledButton = (props: React.ComponentProps<'button'>) => {
  return <button {...props} className={cn('ruk-unstyled-button', props.className)} />;
};

export default UnstyledButton;

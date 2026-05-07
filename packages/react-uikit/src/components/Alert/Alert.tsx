import * as React from 'react';

import { cn } from '../../utils';
import { Close } from '../Close';
import './Alert.css';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ className, children }) => {
  const [hide, setHide] = React.useState(false);

  const handleClose = () => {
    console.log('hiya');
    setHide(true);
  };

  return (
    <div className={cn('uk-alert', className, hide && 'ruk-alert-leave')}>
      {children}
      <Close className="uk-alert-close" onClick={handleClose} />
    </div>
  );
};

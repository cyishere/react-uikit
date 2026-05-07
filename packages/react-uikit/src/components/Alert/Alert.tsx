import * as React from 'react';
import UIkit from 'uikit';

import { cn } from '../../utils';
import { Close } from '../Close';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ className, children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const _alertRef = React.useRef<UIkit.UIkitAlertElement>(null);

  const handleClose = () => {
    if (_alertRef.current) {
      _alertRef.current.close();
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      _alertRef.current = UIkit.alert(el);
    }
  }, []);

  return (
    <div ref={ref} className={cn('uk-alert', className)}>
      {children}
      <Close className="uk-alert-close" label="Close alert" onClick={handleClose} />
    </div>
  );
};

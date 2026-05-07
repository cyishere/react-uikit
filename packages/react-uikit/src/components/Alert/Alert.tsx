import * as React from 'react';
import UIkit from 'uikit';

import { cn } from '../../utils';
import { Close } from '../Close';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Whether to animate the alert when closing.
   * Default: true
   */
  animation?: boolean;
  /**
   * Base duration of the close animation in milliseconds.
   * Default: 150ms
   */
  duration?: number;
  /**
   * CSS selector for the close button.
   * Default: `.uk-alert-close`
   */
  selClose?: string;
}

export const Alert: React.FC<AlertProps> = ({
  animation = true,
  className,
  children,
  duration = 150,
  selClose = '.uk-alert-close'
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const _alertRef = React.useRef<UIkit.UIkitAlertElement>(null);

  const handleClose = () => {
    if (_alertRef.current) {
      if (animation) {
        // Use UIkit's close (which is currently hardcoded to animate)
        _alertRef.current.close();
      } else {
        // Bypassing UIkit's bug:
        // Manually destroy the component and remove the element immediately
        // TODO: update when UIkit fixes this bug
        _alertRef.current.$destroy(true);
      }
    }
  };

  React.useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      _alertRef.current = UIkit.alert(el, {
        animation,
        duration,
        selClose
      });
    }
  }, [animation, duration, selClose]);

  return (
    <div ref={ref} className={cn('uk-alert', className)}>
      {children}
      <Close className="uk-alert-close" label="Close alert" onClick={handleClose} />
    </div>
  );
};

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
  /**
   * Fires before an item is hidden.
   */
  onBeforeHide?: (event: Event) => void;
  /**
   * Fires after an item is hidden.
   */
  onHide?: (event: Event) => void;
}

export const Alert: React.FC<AlertProps> = ({
  animation = true,
  className,
  children,
  duration = 150,
  selClose = '.uk-alert-close',
  onBeforeHide,
  onHide,
  ...props
}) => {
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
      _alertRef.current = UIkit.alert(el, {
        animation,
        // Workaround: UIkit Alert ignore `animation: false`,
        // so we force duration to 0 to simulate it.
        // TODO: update this when UIkit fixes this bug
        duration: animation ? duration : 0,
        selClose
      });
    }
  }, [animation, duration, selClose]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // UIkit triggers these as native DOM events
    const handleBeforeHide = (e: Event) => onBeforeHide?.(e);
    const handleHide = (e: Event) => onHide?.(e);

    el.addEventListener('beforehide', handleBeforeHide);
    el.addEventListener('hide', handleHide);

    return () => {
      el.removeEventListener('beforehide', handleBeforeHide);
      el.removeEventListener('hide', handleHide);
    };
  }, [onBeforeHide, onHide]);

  return (
    <div ref={ref} className={cn('uk-alert', className)} {...props}>
      {children}
      <Close className="uk-alert-close" label="Close alert" onClick={handleClose} />
    </div>
  );
};

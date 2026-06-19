import * as React from 'react';

export interface UseControllableStateParams<T> {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: ((state: T) => void) | undefined;
}

/**
 * Manages state that can be either controlled (via props) or uncontrolled (internal state).
 */
export const useControllableState = <T>({
  prop,
  defaultProp,
  onChange
}: UseControllableStateParams<T>) => {
  const [uncontrolledProp, setUncontrolledProp] = React.useState<T | undefined>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const onChangeRef = React.useRef(onChange);
  const isFirstMount = React.useRef(true);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = React.useCallback(
    (nextValue: React.SetStateAction<T | undefined>) => {
      if (isControlled) {
        const setter = nextValue as (prevState?: T) => T;
        const newValue = typeof nextValue === 'function' ? setter(prop) : nextValue;
        if (newValue !== prop) onChangeRef.current?.(newValue as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop]
  );

  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (!isControlled && uncontrolledProp !== undefined) {
      onChangeRef.current?.(uncontrolledProp);
    }
  }, [isControlled, uncontrolledProp]);

  return [value, setValue] as const;
};

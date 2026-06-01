import * as React from 'react';

import './Switcher.css';
import { SwitcherContext, useSwitcherContext } from './SwitcherContext';
import { useIsomorphicLayoutEffect } from '../../hooks';
import { cn } from '../../utils';

export interface SwitcherRootProps {
  children: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onValueChange?: (index: number) => void;
}

const SwitcherRoot = ({ children, defaultValue = 0, value, onValueChange }: SwitcherRootProps) => {
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultValue);
  const [triggerOrder, setTriggerOrder] = React.useState<string[]>([]);
  const [panelOrder, setPanelOrder] = React.useState<string[]>([]);
  const [triggerMeta, setTriggerMeta] = React.useState<
    Record<string, { disabled: boolean; ref: HTMLButtonElement | null }>
  >({});

  const baseId = 'ruk-switcher-' + React.useId().replace(/:/g, '');
  const activeIndex = value ?? uncontrolledIndex;

  const setActiveIndex = React.useCallback(
    (nextState: number | ((prev: number) => number)) => {
      const resolvedIndex = typeof nextState === 'function' ? nextState(activeIndex) : nextState;

      if (value === undefined) {
        setUncontrolledIndex(resolvedIndex);
      }

      onValueChange?.(resolvedIndex);
    },
    [activeIndex, onValueChange, value]
  );

  const registerTrigger = React.useCallback((id: string, disabled: boolean) => {
    setTriggerOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setTriggerMeta((prev) => {
      const existing = prev[id];
      if (existing && existing.disabled === disabled) {
        return prev;
      }

      return {
        ...prev,
        [id]: { disabled, ref: existing?.ref ?? null }
      };
    });
  }, []);

  const unregisterTrigger = React.useCallback((id: string) => {
    setTriggerOrder((prev) => prev.filter((item) => item !== id));
    setTriggerMeta((prev) => {
      if (!(id in prev)) {
        return prev;
      }

      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const setTriggerRef = React.useCallback((id: string, ref: HTMLButtonElement | null) => {
    setTriggerMeta((prev) => {
      const existing = prev[id] ?? { disabled: false, ref: null };

      if (existing.ref === ref) {
        return prev;
      }

      return {
        ...prev,
        [id]: {
          ...existing,
          ref
        }
      };
    });
  }, []);

  const updateTriggerDisabled = React.useCallback((id: string, disabled: boolean) => {
    setTriggerMeta((prev) => {
      const existing = prev[id] ?? { disabled: false, ref: null };

      if (existing.disabled === disabled) {
        return prev;
      }

      return {
        ...prev,
        [id]: {
          ...existing,
          disabled
        }
      };
    });
  }, []);

  const registerPanel = React.useCallback((id: string) => {
    setPanelOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const unregisterPanel = React.useCallback((id: string) => {
    setPanelOrder((prev) => prev.filter((item) => item !== id));
  }, []);

  const contextValue = React.useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      baseId,
      triggerOrder,
      panelOrder,
      triggerMeta,
      registerTrigger,
      unregisterTrigger,
      setTriggerRef,
      updateTriggerDisabled,
      registerPanel,
      unregisterPanel
    }),
    [
      activeIndex,
      baseId,
      panelOrder,
      registerPanel,
      registerTrigger,
      setActiveIndex,
      setTriggerRef,
      triggerMeta,
      triggerOrder,
      unregisterPanel,
      unregisterTrigger,
      updateTriggerDisabled
    ]
  );

  return <SwitcherContext.Provider value={contextValue}>{children}</SwitcherContext.Provider>;
};

export interface SwitcherListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const SwitcherList = ({ className, children, ...props }: SwitcherListProps) => {
  return (
    <ul className={cn(className)} role="tablist" {...props}>
      {children}
    </ul>
  );
};

const getNextEnabledIndex = (
  current: number,
  direction: 1 | -1,
  order: string[],
  meta: Record<string, { disabled: boolean }>
) => {
  if (!order.length) {
    return -1;
  }

  for (let step = 1; step <= order.length; step += 1) {
    const candidate = (current + direction * step + order.length) % order.length;
    const id = order[candidate];

    if (!id) {
      continue;
    }

    if (!meta[id]?.disabled) {
      return candidate;
    }
  }

  return -1;
};

export interface SwitcherTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  index?: number;
}

const SwitcherTrigger = ({
  children,
  className,
  index,
  disabled = false,
  onClick,
  onKeyDown,
  ...props
}: SwitcherTriggerProps) => {
  const {
    activeIndex,
    setActiveIndex,
    baseId,
    triggerOrder,
    triggerMeta,
    registerTrigger,
    unregisterTrigger,
    setTriggerRef,
    updateTriggerDisabled
  } = useSwitcherContext();

  const id = 'ruk-switcher-trigger-' + React.useId();

  useIsomorphicLayoutEffect(() => {
    registerTrigger(id, disabled);

    return () => {
      unregisterTrigger(id);
    };
  }, [disabled, id, registerTrigger, unregisterTrigger]);

  useIsomorphicLayoutEffect(() => {
    updateTriggerDisabled(id, disabled);
  }, [disabled, id, updateTriggerDisabled]);

  const triggerIndex = index ?? triggerOrder.indexOf(id);
  const isActive = triggerIndex === activeIndex;
  const tabId = `${baseId}-tab-${triggerIndex}`;
  const panelId = `${baseId}-panel-${triggerIndex}`;
  const handleRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      setTriggerRef(id, node);
    },
    [id, setTriggerRef]
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || disabled || triggerIndex < 0) {
      return;
    }

    setActiveIndex(triggerIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || triggerIndex < 0) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();

      const nextIndex = getNextEnabledIndex(
        triggerIndex,
        event.key === 'ArrowRight' ? 1 : -1,
        triggerOrder,
        triggerMeta
      );

      if (nextIndex >= 0) {
        const nextId = triggerOrder[nextIndex];

        if (!nextId) {
          return;
        }

        triggerMeta[nextId]?.ref?.focus();
        setActiveIndex(nextIndex);
      }

      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const firstEnabledIndex = triggerOrder.findIndex(
        (triggerId) => !triggerMeta[triggerId]?.disabled
      );

      if (firstEnabledIndex >= 0) {
        const firstId = triggerOrder[firstEnabledIndex];

        if (!firstId) {
          return;
        }

        triggerMeta[firstId]?.ref?.focus();
        setActiveIndex(firstEnabledIndex);
      }

      return;
    }

    if (event.key === 'End') {
      event.preventDefault();

      for (let i = triggerOrder.length - 1; i >= 0; i -= 1) {
        const triggerId = triggerOrder[i];

        if (!triggerId) {
          continue;
        }

        if (!triggerMeta[triggerId]?.disabled) {
          triggerMeta[triggerId]?.ref?.focus();
          setActiveIndex(i);
          break;
        }
      }

      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      setActiveIndex(triggerIndex);
    }
  };

  return (
    <li className={cn(isActive && 'uk-active')} role="presentation">
      <button
        {...props}
        aria-controls={panelId}
        aria-selected={isActive}
        className={cn('ruk-switcher-trigger-button', className)}
        disabled={disabled}
        id={tabId}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        ref={handleRef}
        role="tab"
        tabIndex={isActive ? 0 : -1}
        type={props.type ?? 'button'}
      >
        {children}
      </button>
    </li>
  );
};

export interface SwitcherContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const SwitcherContainer = ({ className, children, ...props }: SwitcherContainerProps) => {
  return (
    <div className={cn('uk-switcher', className)} {...props}>
      {children}
    </div>
  );
};

export interface SwitcherPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
}

const SwitcherPanel = ({ children, className, index, ...props }: SwitcherPanelProps) => {
  const { activeIndex, baseId, panelOrder, registerPanel, unregisterPanel } = useSwitcherContext();
  const id = 'ruk-switcher-panel-' + React.useId();

  useIsomorphicLayoutEffect(() => {
    registerPanel(id);

    return () => {
      unregisterPanel(id);
    };
  }, [id, registerPanel, unregisterPanel]);

  const panelIndex = index ?? panelOrder.indexOf(id);
  const isActive = panelIndex === activeIndex;
  const panelId = `${baseId}-panel-${panelIndex}`;
  const tabId = `${baseId}-tab-${panelIndex}`;

  return (
    <div
      {...props}
      aria-labelledby={tabId}
      className={cn(className, isActive && 'uk-active')}
      hidden={!isActive}
      id={panelId}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export const Switcher = {
  Root: SwitcherRoot,
  List: SwitcherList,
  Trigger: SwitcherTrigger,
  Container: SwitcherContainer,
  Panel: SwitcherPanel
};

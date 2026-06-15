import * as React from 'react';

import { SwitcherContext, claimIndex, useSwitcherContext } from './SwitcherContext';
import { useControllableState } from '../../hooks';
import { cn } from '../../utils';

import './Switcher.css';

export interface SwitcherRootProps {
  children: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onValueChange?: (index: number) => void;
}

export const SwitcherRoot = ({
  children,
  defaultValue = 0,
  value,
  onValueChange
}: SwitcherRootProps) => {
  const [selectedIndex = 0, setSelectedIndex] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const triggerRegistry: string[] = [];
  const panelRegistry: string[] = [];
  const baseId = 'ruk-switcher-' + React.useId().replace(/:/g, '');

  return (
    <SwitcherContext.Provider
      value={{ baseId, triggerRegistry, panelRegistry, selectedIndex, setSelectedIndex }}
    >
      {children}
    </SwitcherContext.Provider>
  );
};

export type SwitcherListProps = React.ComponentProps<'ul'>;

export const SwitcherList = ({ children, className, ref, ...props }: SwitcherListProps) => (
  <ul ref={ref} role="tablist" className={cn(className)} {...props}>
    {children}
  </ul>
);

export type SwitcherTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SwitcherTrigger = ({
  children,
  className,
  onClick,
  onKeyDown,
  ...props
}: SwitcherTriggerProps) => {
  const { baseId, triggerRegistry, selectedIndex, setSelectedIndex } = useSwitcherContext();
  const id = React.useId();
  const triggerIndex = claimIndex(triggerRegistry, id);
  const isActive = triggerIndex === selectedIndex;

  const tabId = `${baseId}-tab-${triggerIndex}`;
  const panelId = `${baseId}-panel-${triggerIndex}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || props.disabled || triggerIndex < 0) return;

    setSelectedIndex(triggerIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || props.disabled || triggerIndex < 0) return;

    const length = triggerRegistry.length;
    let nextIndex: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (triggerIndex + 1) % length;
        break;
      case 'ArrowLeft':
        nextIndex = (triggerIndex - 1 + length) % length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = length - 1;
        break;
      case 'Enter':
      case ' ':
        setSelectedIndex(triggerIndex);
        event.preventDefault();
        return;
      default:
        return;
    }

    if (nextIndex !== null && nextIndex !== triggerIndex) {
      event.preventDefault();
      setSelectedIndex(nextIndex);
      const nextTabId = `${baseId}-tab-${nextIndex}`;
      document.getElementById(nextTabId)?.focus();
    }
  };

  return (
    <li role="presentation" className={cn(isActive && 'uk-active')}>
      <button
        {...props}
        id={tabId}
        aria-controls={panelId}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className={cn('ruk-switcher-trigger-button', className)}
        role="tab"
        type={props.type ?? 'button'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </button>
    </li>
  );
};

export type SwitcherContainerProps = React.ComponentProps<'div'>;

export const SwitcherContainer = ({
  children,
  className,
  ref,
  ...props
}: SwitcherContainerProps) => (
  <div ref={ref} className={cn('uk-switcher', className)} {...props}>
    {children}
  </div>
);

export type SwitcherPanelProps = React.HTMLAttributes<HTMLDivElement>;

export const SwitcherPanel = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<'div'>) => {
  const { baseId, panelRegistry, selectedIndex } = useSwitcherContext();
  const id = React.useId();
  const panelIndex = claimIndex(panelRegistry, id);
  const isActive = panelIndex === selectedIndex;

  const panelId = `${baseId}-panel-${panelIndex}`;
  const tabId = `${baseId}-tab-${panelIndex}`;

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      aria-labelledby={tabId}
      id={panelId}
      className={cn(className, isActive && 'uk-active')}
      hidden={!isActive}
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

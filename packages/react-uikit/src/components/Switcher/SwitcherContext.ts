import * as React from 'react';

interface TriggerMeta {
  disabled: boolean;
  ref: HTMLButtonElement | null;
}

export interface SwitcherContextValue {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  baseId: string;
  triggerOrder: string[];
  panelOrder: string[];
  triggerMeta: Record<string, TriggerMeta>;
  registerTrigger: (id: string, disabled: boolean) => void;
  unregisterTrigger: (id: string) => void;
  setTriggerRef: (id: string, ref: HTMLButtonElement | null) => void;
  updateTriggerDisabled: (id: string, disabled: boolean) => void;
  registerPanel: (id: string) => void;
  unregisterPanel: (id: string) => void;
}

export const SwitcherContext = React.createContext<SwitcherContextValue | null>(null);

export const useSwitcherContext = () => {
  const context = React.useContext(SwitcherContext);

  if (!context) {
    throw new Error('Switcher components must be wrapped in <Switcher.Root>');
  }

  return context;
};

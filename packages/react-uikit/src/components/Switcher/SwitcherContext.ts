import type { Dispatch, SetStateAction } from 'react';

import { createContext, useContext } from 'react';

interface TriggerMeta {
  disabled: boolean;
  ref: HTMLButtonElement | null;
}

export interface SwitcherContextValue {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
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

export const SwitcherContext = createContext<SwitcherContextValue | null>(null);

export const useSwitcherContext = () => {
  const context = useContext(SwitcherContext);

  if (!context) {
    throw new Error('Switcher components must be wrapped in <Switcher.Root>');
  }

  return context;
};

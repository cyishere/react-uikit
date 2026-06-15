import * as React from 'react';

export interface SwitcherContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  baseId: string;
  triggerRegistry: string[];
  panelRegistry: string[];
}

export const SwitcherContext = React.createContext<SwitcherContextValue | null>(null);

export const useSwitcherContext = () => {
  const context = React.useContext(SwitcherContext);

  if (!context) {
    throw new Error('Switcher components must be wrapped in <Switcher.Root>');
  }

  return context;
};

export const claimIndex = (registry: string[], id: string) => {
  if (!registry.includes(id)) {
    registry.push(id);
  }

  return registry.indexOf(id);
};

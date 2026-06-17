import * as React from 'react';

export interface SwitcherContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  baseId: string;
  triggerRegistry: string[];
  containerRegistry: string[];
  triggerCount: number;
  animation?: string | undefined;
  duration: number;
  swiping: boolean;
  followFocus: boolean;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
}

export const SwitcherContext = React.createContext<SwitcherContextValue | null>(null);

export const useSwitcherContext = () => {
  const context = React.useContext(SwitcherContext);

  if (!context) {
    throw new Error('Switcher components must be wrapped in <Switcher.Root>');
  }

  return context;
};

export interface ContainerContextValue {
  panelRegistry: string[];
  containerIndex: number;
  panelCount: number;
  animationGeneration: number;
  notifyOutComplete: () => void;
}

export const ContainerContext = React.createContext<ContainerContextValue | null>(null);

export const useContainerContext = () => {
  const context = React.useContext(ContainerContext);

  if (!context) {
    throw new Error('Switcher.Panel must be wrapped in <Switcher.Container>');
  }

  return context;
};

// Resolve a possibly-negative index as an offset from the end of the set,
// matching UIkit's getIndex wrap. Read-only: never written back to state, so
// controlled values aren't fought. Falls back to the raw index until the count
// is known (registries fill during render).
export const resolveIndex = (index: number, count: number) =>
  index < 0 && count > 0 ? ((index % count) + count) % count : index;

export const claimIndex = (registry: string[], id: string) => {
  if (!registry.includes(id)) {
    registry.push(id);
  }

  return registry.indexOf(id);
};

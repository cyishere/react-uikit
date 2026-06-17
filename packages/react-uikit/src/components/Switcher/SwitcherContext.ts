import * as React from 'react';

export interface SwitcherContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  baseId: string;
  triggerRegistry: string[];
  containerRegistry: string[];
  animation?: string | undefined;
  duration: number;
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

export const claimIndex = (registry: string[], id: string) => {
  if (!registry.includes(id)) {
    registry.push(id);
  }

  return registry.indexOf(id);
};

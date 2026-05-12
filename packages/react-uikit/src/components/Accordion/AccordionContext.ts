import * as React from 'react';

export interface AccordionContextValue {
  openItems: Set<number>;
  toggle: (index: number) => void;
  showIcon: boolean;
  baseId: string;
  animation: boolean;
}

export const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion components must be wrapped in <Accordion.Root>');
  }

  return context;
};

/**
 * Item-level context that provides the index of the current accordion item
 * to its child Trigger and Panel components.
 */
export interface AccordionItemContextValue {
  index: number;
}

export const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);

  if (!context) {
    throw new Error('Accordion.Trigger and Accordion.Panel must be wrapped in <Accordion.Item>');
  }

  return context;
};

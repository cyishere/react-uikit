// Title + Section
// Title: heading > button > text + icon
//    button: `aria-expanded`, `aria-controls`, `aria-disabled`, `id`
// Section: `id` (co-responding to button's `aria-controls`), `role="region"`,
//    `aria-labelledby=<button_id>`
import * as React from 'react';

import { cn } from '../../utils';
import { Icon } from '../Icon';
import UnstyledButton from '../UnstyledButton';

export interface AccordionRootProps extends React.ComponentPropsWithoutRef<'ul'> {
  className?: string;
  showIcon?: boolean;
}

const AccordionRoot: React.FC<AccordionRootProps> = ({
  className,
  children,
  showIcon = false,
  ...props
}) => {
  return (
    <ul {...props} className={cn('uk-accordion-default uk-accordion', className)}>
      {children}
    </ul>
  );
};

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'li'> {
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children, className, ...props }) => {
  return (
    <li {...props} className={className}>
      {children}
    </li>
  );
};

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  showIcon?: boolean;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  showIcon = false,
  ...props
}) => {
  return (
    <UnstyledButton {...props} className={cn('uk-accordion-title', className)}>
      <span>{children}</span>
      {showIcon && <Icon name="plus" className="uk-accordion-icon" />}
    </UnstyledButton>
  );
};

export interface AccordionPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('uk-accordion-content', className)}>
      {children}
    </div>
  );
};

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel
};

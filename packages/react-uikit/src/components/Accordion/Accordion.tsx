import * as React from 'react';

import {
  AccordionContext,
  AccordionItemContext,
  useAccordionContext,
  useAccordionItemContext
} from './AccordionContext';
import AccordionIcon from './Icon';
import { cn } from '../../utils';
import UnstyledButton from '../UnstyledButton';
import './Accordion.css';

// ---------------------------------------------------------------------------
// AccordionRoot
// ---------------------------------------------------------------------------

export interface AccordionRootProps extends React.ComponentPropsWithoutRef<'ul'> {
  className?: string;
  /**
   * Allow multiple items to be open at the same time.
   * @defaultValue false
   */
  multiple?: boolean;
  /**
   * Allow all items to be collapsed. When false, at least one item stays open.
   * @defaultValue true
   */
  collapsible?: boolean;
  /**
   * Initially open item indices (uncontrolled).
   * @defaultValue []
   */
  defaultOpen?: number[];
  /** Controlled open item indices. */
  value?: number[];
  /** Callback when open items change. */
  onValueChange?: (openItems: number[]) => void;
  /**
   * Show the accordion icon on every trigger.
   * @defaultValue false
   */
  showIcon?: boolean;
  /**
   * Whether to animate the accordion panel.
   * @defaultValue false
   */
  animation?:
    | boolean
    | {
        duration?: number;
        transition?: string;
      };
}

const AccordionRoot: React.FC<AccordionRootProps> = ({
  className,
  children,
  multiple = false,
  collapsible = true,
  defaultOpen = [],
  value,
  onValueChange,
  showIcon = false,
  animation = false,
  ...props
}) => {
  const [uncontrolledItems, setUncontrolledItems] = React.useState<Set<number>>(
    () => new Set(defaultOpen)
  );

  const baseId = 'ruk-accordion-' + React.useId().replace(/:/g, '');
  const openItems = React.useMemo(() => {
    return value !== undefined ? new Set(value) : uncontrolledItems;
  }, [value, uncontrolledItems]);

  const toggle = React.useCallback(
    (index: number) => {
      const isOpen = openItems.has(index);

      let next: Set<number>;

      if (isOpen) {
        // Trying to close — check if collapsible
        if (!collapsible && openItems.size <= 1) {
          return; // Can't close the last open item
        }

        next = new Set(openItems);
        next.delete(index);
      } else {
        if (multiple) {
          next = new Set(openItems);
          next.add(index);
        } else {
          // Single mode: close all others
          next = new Set([index]);
        }
      }

      if (value === undefined) {
        setUncontrolledItems(next);
      }

      onValueChange?.(Array.from(next));
    },
    [openItems, collapsible, multiple, value, onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      openItems,
      toggle,
      showIcon,
      baseId,
      animation
    }),
    [openItems, toggle, showIcon, baseId, animation]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul {...props} className={cn('uk-accordion-default uk-accordion', className)}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return (
            <AccordionItemContext.Provider value={{ index }}>{child}</AccordionItemContext.Provider>
          );
        })}
      </ul>
    </AccordionContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<'li'> {
  className?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ children, className, ...props }) => {
  const { openItems } = useAccordionContext();
  const { index } = useAccordionItemContext();
  const isOpen = openItems.has(index);

  return (
    <li {...props} className={cn(isOpen && 'uk-open', className)}>
      {children}
    </li>
  );
};

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const { openItems, toggle, showIcon, baseId } = useAccordionContext();
  const { index } = useAccordionItemContext();
  const isOpen = openItems.has(index);

  const triggerId = `${baseId}-trigger-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    toggle(index);
  };

  return (
    <UnstyledButton
      {...props}
      aria-controls={panelId}
      aria-expanded={isOpen}
      className={cn('uk-width-1-1 uk-accordion-title', 'ruk-accordion-trigger', className)}
      id={triggerId}
      onClick={handleClick}
    >
      <span>{children}</span>
      {showIcon && <AccordionIcon />}
    </UnstyledButton>
  );
};

// ---------------------------------------------------------------------------
// AccordionPanel
// ---------------------------------------------------------------------------

export interface AccordionPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ children, className, ...props }) => {
  const { openItems, baseId, animation } = useAccordionContext();
  const { index } = useAccordionItemContext();
  const isOpen = openItems.has(index);

  const triggerId = `${baseId}-trigger-${index}`;
  const panelId = `${baseId}-panel-${index}`;

  const contentRef = React.useRef<HTMLDivElement>(null);

  const [height, setHeight] = React.useState<number | 'auto'>(isOpen ? 'auto' : 0);
  const [isHidden, setIsHidden] = React.useState(!isOpen);

  const isInitialMount = React.useRef(true);

  React.useLayoutEffect(() => {
    if (!animation) {
      setHeight(isOpen ? 'auto' : 0);
      setIsHidden(!isOpen);
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!contentRef.current) return;
    const content = contentRef.current;

    if (isOpen) {
      setIsHidden(false);
      setHeight(0);

      requestAnimationFrame(() => {
        if (!contentRef.current) return;
        const style = window.getComputedStyle(contentRef.current);
        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;
        const targetHeight = contentRef.current.offsetHeight + marginTop + marginBottom;

        setHeight(targetHeight);
      });
    } else {
      const style = window.getComputedStyle(content);
      const marginTop = parseFloat(style.marginTop) || 0;
      const marginBottom = parseFloat(style.marginBottom) || 0;
      const currentHeight = content.offsetHeight + marginTop + marginBottom;

      setHeight(currentHeight);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [isOpen, animation]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (!animation || e.target !== e.currentTarget) return;

    if (isOpen) {
      setHeight('auto');
    } else {
      setIsHidden(true);
    }
  };

  if (!animation) {
    return (
      <div
        {...props}
        aria-labelledby={triggerId}
        className={cn('uk-accordion-content', className)}
        hidden={!isOpen}
        id={panelId}
        role="region"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        overflow: 'hidden',
        height: height === 'auto' ? 'auto' : `${height}px`,
        transition: `height ${(typeof animation === 'object' && animation.duration) || 200}ms ${(typeof animation === 'object' && animation.transition) || 'ease'}`
      }}
    >
      <div
        {...props}
        ref={contentRef}
        aria-labelledby={triggerId}
        className={cn('uk-accordion-content', className)}
        hidden={isHidden}
        id={panelId}
        role="region"
      >
        {children}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel
};

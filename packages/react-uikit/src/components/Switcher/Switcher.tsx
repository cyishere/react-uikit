import * as React from 'react';

import {
  ContainerContext,
  SwitcherContext,
  claimIndex,
  useContainerContext,
  useSwitcherContext
} from './SwitcherContext';
import { useControllableState, useSwipe } from '../../hooks';
import { cn } from '../../utils';

import './Switcher.css';

// Matches UIkit's Togglable/Switcher default duration (200ms). UIkit applies the
// duration inline on every switch, overriding the CSS-default durations.
const DEFAULT_ANIMATION_DURATION_MS = 200;

export const parseAnimation = (animation: string | undefined) => {
  if (!animation) return null;

  const parts = animation.split(',').map((s) => s.trim());

  return {
    in: parts[0]!, // e.g. "uk-animation-fade"
    out: parts[1] ?? parts[0]! // falls back to same class for single-animation mode
  };
};

export interface SwitcherRootProps {
  children: React.ReactNode;
  defaultValue?: number;
  value?: number;
  onValueChange?: (index: number) => void;
  animation?: string;
  duration?: number;
  followFocus?: boolean;
  swiping?: boolean;
}

export const SwitcherRoot = ({
  children,
  defaultValue = 0,
  value,
  onValueChange,
  animation,
  duration = DEFAULT_ANIMATION_DURATION_MS,
  followFocus = false,
  swiping = true
}: SwitcherRootProps) => {
  const [selectedIndex = 0, setSelectedIndex] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  // Reset roving focus to the active tab when selection changes outside of focus
  // (e.g. controlled value or click), so the active tab becomes the tabbable one.
  // Focus-driven changes already set focusedIndex via the trigger's onFocus.
  React.useEffect(() => {
    setFocusedIndex(null);
  }, [selectedIndex]);

  const triggerRegistry: string[] = [];
  const containerRegistry: string[] = [];
  const baseId = 'ruk-switcher-' + React.useId().replace(/:/g, '');

  return (
    <SwitcherContext
      value={{
        baseId,
        triggerRegistry,
        containerRegistry,
        selectedIndex,
        setSelectedIndex,
        animation,
        duration,
        swiping,
        followFocus,
        focusedIndex,
        setFocusedIndex
      }}
    >
      {children}
    </SwitcherContext>
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
  onFocus,
  ...props
}: SwitcherTriggerProps) => {
  const {
    baseId,
    triggerRegistry,
    selectedIndex,
    setSelectedIndex,
    followFocus,
    focusedIndex,
    setFocusedIndex
  } = useSwitcherContext();
  const id = React.useId();
  const triggerIndex = claimIndex(triggerRegistry, id);
  const isActive = triggerIndex === selectedIndex;
  const isFocusable = (focusedIndex ?? selectedIndex) === triggerIndex;

  const triggerId = `${baseId}-trigger-${triggerIndex}`;
  const panelId = `${baseId}-panel-0-${triggerIndex}`;

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
      if (followFocus) {
        setSelectedIndex(nextIndex);
      }
      const nextTriggerId = `${baseId}-trigger-${nextIndex}`;
      document.getElementById(nextTriggerId)?.focus();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    onFocus?.(event);
    setFocusedIndex(triggerIndex);
  };

  return (
    <li role="presentation" className={cn(isActive && 'uk-active')}>
      <button
        {...props}
        id={triggerId}
        aria-controls={panelId}
        aria-selected={isActive}
        tabIndex={isFocusable ? 0 : -1}
        className={cn('ruk-switcher-trigger-button', className)}
        role="tab"
        type={props.type ?? 'button'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
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
}: SwitcherContainerProps) => {
  const { containerRegistry, swiping, triggerRegistry, selectedIndex, setSelectedIndex } =
    useSwitcherContext();
  const id = React.useId();
  const containerIndex = claimIndex(containerRegistry, id);
  const panelRegistry: string[] = [];

  const [animGen, setAnimGen] = React.useState(0);
  const notifyOutComplete = React.useCallback(() => {
    setAnimGen((g) => g + 1);
  }, []);

  const localRef = React.useRef<HTMLDivElement>(null);

  useSwipe(localRef, {
    enabled: swiping,
    onSwipeLeft: () => {
      const length = triggerRegistry.length;
      if (length === 0) return;
      setSelectedIndex((selectedIndex + 1) % length);
    },
    onSwipeRight: () => {
      const length = triggerRegistry.length;
      if (length === 0) return;
      setSelectedIndex((selectedIndex - 1 + length) % length);
    }
  });

  return (
    <ContainerContext
      value={{ panelRegistry, containerIndex, animationGeneration: animGen, notifyOutComplete }}
    >
      <div
        {...props}
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={cn('uk-switcher', className)}
        style={{ touchAction: swiping ? 'pan-y pinch-zoom' : undefined, ...props.style }}
      >
        {children}
      </div>
    </ContainerContext>
  );
};

export type SwitcherPanelProps = React.ComponentProps<'div'>;

type AnimationPhase = 'idle' | 'animating-out' | 'waiting-in' | 'animating-in';

export const SwitcherPanel = ({ children, className, ref, ...props }: SwitcherPanelProps) => {
  const { baseId, selectedIndex, animation, duration } = useSwitcherContext();
  const { panelRegistry, containerIndex, animationGeneration, notifyOutComplete } =
    useContainerContext();
  const id = React.useId();
  const panelIndex = claimIndex(panelRegistry, id);
  const isActive = panelIndex === selectedIndex;

  // Stable identity so the out-coordination effect below only re-runs on real
  // phase changes — recreating this object each render would make the effect's
  // cleanup fire notifyOutComplete() on incidental re-renders mid-animation.
  const animConfig = React.useMemo(() => parseAnimation(animation), [animation]);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveAnimConfig = prefersReducedMotion ? null : animConfig;

  const [phase, setPhase] = React.useState<AnimationPhase>('idle');
  const [prevIsActive, setPrevIsActive] = React.useState(isActive);
  const [targetGen, setTargetGen] = React.useState(animationGeneration);

  if (isActive !== prevIsActive) {
    setPrevIsActive(isActive);
    if (!effectiveAnimConfig) {
      // No animation (or reduced motion): switch instantly, never enter an
      // animating phase so there is no hidden/flash frame.
      setPhase('idle');
    } else if (!prevIsActive && isActive) {
      setPhase('waiting-in');
      setTargetGen(animationGeneration);
    } else {
      setPhase('animating-out');
    }
  }

  React.useEffect(() => {
    if (phase === 'animating-out') {
      return () => {
        notifyOutComplete();
      };
    }
  }, [phase, notifyOutComplete]);

  React.useEffect(() => {
    if (phase === 'waiting-in' && animationGeneration > targetGen) {
      setPhase('animating-in');
    }
  }, [phase, animationGeneration, targetGen]);

  let animClass = '';
  const isAnimating = phase === 'animating-out' || phase === 'animating-in';
  if (phase === 'animating-out' && effectiveAnimConfig) {
    animClass = cn(
      effectiveAnimConfig.out,
      'uk-animation',
      'uk-animation-leave',
      'uk-animation-reverse'
    );
  } else if (phase === 'animating-in' && effectiveAnimConfig) {
    animClass = cn(effectiveAnimConfig.in, 'uk-animation', 'uk-animation-enter');
  }

  // UIkit forces the animation-duration inline on every switch, overriding the
  // slower per-animation CSS defaults (e.g. uk-animation-fade is 0.8s). Match
  // that so transitions run at the configured speed (default 200ms).
  const animStyle = isAnimating ? { animationDuration: duration + 'ms' } : undefined;

  // Hidden while 'waiting-in' so the incoming panel stays invisible until the
  // outgoing panel finishes (sequential out→in), then appears with its enter
  // animation.
  const isVisible = (isActive && phase !== 'waiting-in') || phase === 'animating-out';

  const panelId = `${baseId}-panel-${containerIndex}-${panelIndex}`;
  const triggerId = `${baseId}-trigger-${panelIndex}`;

  return (
    <div
      {...props}
      ref={ref}
      role="tabpanel"
      aria-labelledby={triggerId}
      id={panelId}
      className={cn(className, isVisible && 'uk-active', animClass)}
      style={{ ...props.style, ...animStyle }}
      tabIndex={0}
      onAnimationEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (phase === 'animating-out' || phase === 'animating-in') {
          setPhase('idle');
        }
        props.onAnimationEnd?.(e);
      }}
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

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Switcher } from './Switcher';

const renderSwitcher = () => {
  render(
    <Switcher.Root>
      <Switcher.List>
        <Switcher.Trigger>Tab 1</Switcher.Trigger>
        <Switcher.Trigger>Tab 2</Switcher.Trigger>
      </Switcher.List>
      <Switcher.Container>
        <Switcher.Panel>Panel 1</Switcher.Panel>
        <Switcher.Panel>Panel 2</Switcher.Panel>
      </Switcher.Container>
    </Switcher.Root>
  );
};

describe('Switcher', () => {
  it('renders WAI-ARIA tab semantics and default active panel', () => {
    renderSwitcher();

    const tablist = screen.getByRole('tablist');
    const tabs = screen.getAllByRole('tab');
    const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');
    const panel2 = screen.getByText('Panel 2').closest('[role="tabpanel"]');

    expect(tablist).toBeInTheDocument();
    expect(tabs).toHaveLength(2);

    expect(tabs[0]!).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]!).toHaveAttribute('aria-selected', 'false');

    expect(tabs[0]!.closest('li')).toHaveClass('uk-active');
    expect(tabs[1]!.closest('li')).not.toHaveClass('uk-active');

    expect(panel1).toHaveClass('uk-active');
    expect(panel2).not.toHaveClass('uk-active');
  });

  it('switches active tab and panel on click', () => {
    renderSwitcher();

    const tabs = screen.getAllByRole('tab');
    const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');
    const panel2 = screen.getByText('Panel 2').closest('[role="tabpanel"]');

    fireEvent.click(tabs[1]!);

    expect(tabs[0]!).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]!).toHaveAttribute('aria-selected', 'true');

    expect(tabs[0]!.closest('li')).not.toHaveClass('uk-active');
    expect(tabs[1]!.closest('li')).toHaveClass('uk-active');

    expect(panel1).not.toHaveClass('uk-active');
    expect(panel2).toHaveClass('uk-active');
  });

  it('supports keyboard navigation (manual activation by default)', () => {
    render(
      <Switcher.Root>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
          <Switcher.Trigger>Tab 3</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
          <Switcher.Panel>Panel 3</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');

    tabs[0]!.focus();
    fireEvent.keyDown(tabs[0]!, { key: 'ArrowRight' });

    expect(tabs[1]!).toHaveFocus();
    expect(tabs[1]!).toHaveAttribute('aria-selected', 'false'); // Not activated yet
    expect(tabs[0]!).toHaveAttribute('aria-selected', 'true');

    // Roving tabindex follows focus, not the active tab: the focused-but-inactive
    // tab is the tabbable one so Tab/Shift+Tab return to it, not the active tab.
    expect(tabs[1]!).toHaveAttribute('tabindex', '0');
    expect(tabs[0]!).toHaveAttribute('tabindex', '-1');

    // Activate focused tab with Enter
    fireEvent.keyDown(tabs[1]!, { key: 'Enter' });
    expect(tabs[1]!).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(tabs[1]!, { key: 'Home' });
    expect(tabs[0]!).toHaveFocus();
    expect(tabs[0]!).toHaveAttribute('aria-selected', 'false');

    fireEvent.keyDown(tabs[0]!, { key: ' ' }); // Space activates
    expect(tabs[0]!).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(tabs[0]!, { key: 'End' });
    expect(tabs[2]!).toHaveFocus();
    expect(tabs[2]!).toHaveAttribute('aria-selected', 'false');
  });

  it('resets roving tabindex to the active tab after activation', () => {
    render(
      <Switcher.Root>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
          <Switcher.Trigger>Tab 3</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
          <Switcher.Panel>Panel 3</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');

    // Move focus to tab 3 without activating, then activate it.
    tabs[0]!.focus();
    fireEvent.keyDown(tabs[0]!, { key: 'End' });
    expect(tabs[2]!).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(tabs[2]!, { key: 'Enter' });

    // Once activated, the active tab is the tabbable one and stale focus tracking
    // is cleared so a click elsewhere correctly hands off the roving tabindex.
    expect(tabs[2]!).toHaveAttribute('tabindex', '0');
    expect(tabs[0]!).toHaveAttribute('tabindex', '-1');

    fireEvent.click(tabs[0]!);
    expect(tabs[0]!).toHaveAttribute('tabindex', '0');
    expect(tabs[2]!).toHaveAttribute('tabindex', '-1');
  });

  it('supports keyboard navigation (automatic activation with followFocus)', () => {
    render(
      <Switcher.Root followFocus>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
          <Switcher.Trigger>Tab 3</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
          <Switcher.Panel>Panel 3</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');

    tabs[0]!.focus();
    fireEvent.keyDown(tabs[0]!, { key: 'ArrowRight' });

    expect(tabs[1]!).toHaveFocus();
    expect(tabs[1]!).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(tabs[1]!, { key: 'Home' });
    expect(tabs[0]!).toHaveFocus();
    expect(tabs[0]!).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(tabs[0]!, { key: 'End' });
    expect(tabs[2]!).toHaveFocus();
    expect(tabs[2]!).toHaveAttribute('aria-selected', 'true');
  });

  it('links tabs and panels via aria-controls/aria-labelledby', () => {
    renderSwitcher();

    const tabs = screen.getAllByRole('tab');
    const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');

    expect(panel1).toBeTruthy();
    if (!panel1) {
      throw new Error('Panel 1 not found');
    }

    const controlsId = tabs[0]!.getAttribute('aria-controls');

    expect(controlsId).toBeTruthy();
    expect(panel1).toHaveAttribute('id', controlsId);
    expect(panel1).toHaveAttribute('aria-labelledby', tabs[0]!.id);
  });

  it('merges custom classes for list and container', () => {
    render(
      <Switcher.Root>
        <Switcher.List className="custom-list">
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container className="custom-container">
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tablist = screen.getByRole('tablist');
    const container = screen.getByText('Panel 1').closest('.uk-switcher');

    expect(container).toBeTruthy();
    if (!container) {
      throw new Error('Switcher container not found');
    }

    expect(tablist).toHaveClass('custom-list');

    expect(container).toHaveClass('uk-switcher');
    expect(container).toHaveClass('custom-container');
  });

  it('supports controlled mode', () => {
    const onValueChange = vi.fn();

    const { rerender } = render(
      <Switcher.Root onValueChange={onValueChange} value={0}>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');

    fireEvent.click(tabs[1]!);

    expect(onValueChange).toHaveBeenCalledWith(1);
    expect(tabs[0]!).toHaveAttribute('aria-selected', 'true');

    rerender(
      <Switcher.Root onValueChange={onValueChange} value={1}>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const rerenderedTabs = screen.getAllByRole('tab');
    expect(rerenderedTabs[1]!).toHaveAttribute('aria-selected', 'true');
  });

  it('throws when used outside Switcher.Root', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => {
      render(<Switcher.Trigger>Invalid</Switcher.Trigger>);
    }).toThrow('Switcher components must be wrapped in <Switcher.Root>');

    consoleError.mockRestore();
  });

  it('supports multiple containers switching simultaneously', () => {
    render(
      <Switcher.Root>
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>C1-Panel 1</Switcher.Panel>
          <Switcher.Panel>C1-Panel 2</Switcher.Panel>
        </Switcher.Container>
        <Switcher.Container>
          <Switcher.Panel>C2-Panel 1</Switcher.Panel>
          <Switcher.Panel>C2-Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    // Initially, first panel in each container is visible
    expect(screen.getByText('C1-Panel 1').closest('[role="tabpanel"]')).toHaveClass('uk-active');
    expect(screen.getByText('C1-Panel 2').closest('[role="tabpanel"]')).not.toHaveClass('uk-active');
    expect(screen.getByText('C2-Panel 1').closest('[role="tabpanel"]')).toHaveClass('uk-active');
    expect(screen.getByText('C2-Panel 2').closest('[role="tabpanel"]')).not.toHaveClass('uk-active');

    // Click Tab 2 — both containers switch
    fireEvent.click(screen.getAllByRole('tab')[1]!);

    expect(screen.getByText('C1-Panel 1').closest('[role="tabpanel"]')).not.toHaveClass('uk-active');
    expect(screen.getByText('C1-Panel 2').closest('[role="tabpanel"]')).toHaveClass('uk-active');
    expect(screen.getByText('C2-Panel 1').closest('[role="tabpanel"]')).not.toHaveClass('uk-active');
    expect(screen.getByText('C2-Panel 2').closest('[role="tabpanel"]')).toHaveClass('uk-active');
  });

  it('applies single animation classes on switch', () => {
    render(
      <Switcher.Root animation="uk-animation-fade">
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');
    const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');
    const panel2 = screen.getByText('Panel 2').closest('[role="tabpanel"]');

    fireEvent.click(tabs[1]!);

    expect(panel1).toHaveClass('uk-animation-fade', 'uk-animation-reverse');
    expect(panel2).not.toHaveClass('uk-animation-fade');

    fireEvent.animationEnd(panel1!);

    expect(panel1).not.toHaveClass('uk-active');
    expect(panel2).toHaveClass('uk-animation-fade', 'uk-animation-enter');

    fireEvent.animationEnd(panel2!);

    expect(panel2).not.toHaveClass('uk-animation-fade');
  });

  it('supports dual animation mode', () => {
    render(
      <Switcher.Root animation="uk-animation-slide-left, uk-animation-slide-right">
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>Panel 1</Switcher.Panel>
          <Switcher.Panel>Panel 2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');
    const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');
    const panel2 = screen.getByText('Panel 2').closest('[role="tabpanel"]');

    fireEvent.click(tabs[1]!);

    expect(panel1).toHaveClass('uk-animation-slide-right', 'uk-animation-reverse');
    
    fireEvent.animationEnd(panel1!);

    expect(panel2).toHaveClass('uk-animation-slide-left', 'uk-animation-enter');
  });

  it('coordinates animation sequentially within container', () => {
    render(
      <Switcher.Root animation="uk-animation-fade">
        <Switcher.List>
          <Switcher.Trigger>Tab 1</Switcher.Trigger>
          <Switcher.Trigger>Tab 2</Switcher.Trigger>
        </Switcher.List>
        <Switcher.Container>
          <Switcher.Panel>C1-P1</Switcher.Panel>
          <Switcher.Panel>C1-P2</Switcher.Panel>
        </Switcher.Container>
        <Switcher.Container>
          <Switcher.Panel>C2-P1</Switcher.Panel>
          <Switcher.Panel>C2-P2</Switcher.Panel>
        </Switcher.Container>
      </Switcher.Root>
    );

    const tabs = screen.getAllByRole('tab');
    const c1p1 = screen.getByText('C1-P1').closest('[role="tabpanel"]');
    const c1p2 = screen.getByText('C1-P2').closest('[role="tabpanel"]');
    const c2p1 = screen.getByText('C2-P1').closest('[role="tabpanel"]');
    const c2p2 = screen.getByText('C2-P2').closest('[role="tabpanel"]');

    fireEvent.click(tabs[1]!);

    expect(c1p1).toHaveClass('uk-animation-leave');
    expect(c2p1).toHaveClass('uk-animation-leave');

    fireEvent.animationEnd(c1p1!);

    expect(c1p2).toHaveClass('uk-animation-enter');
    expect(c2p2).not.toHaveClass('uk-animation-enter');

    fireEvent.animationEnd(c2p1!);

    expect(c2p2).toHaveClass('uk-animation-enter');
  });

  it('renders without window.matchMedia (SSR safety)', () => {
    const original = window.matchMedia;
    // Simulate an environment where matchMedia is unavailable (e.g. SSR).
    // @ts-expect-error -- intentionally removing for the test
    delete window.matchMedia;

    try {
      expect(() =>
        render(
          <Switcher.Root animation="uk-animation-fade">
            <Switcher.List>
              <Switcher.Trigger>Tab 1</Switcher.Trigger>
              <Switcher.Trigger>Tab 2</Switcher.Trigger>
            </Switcher.List>
            <Switcher.Container>
              <Switcher.Panel>Panel 1</Switcher.Panel>
              <Switcher.Panel>Panel 2</Switcher.Panel>
            </Switcher.Container>
          </Switcher.Root>
        )
      ).not.toThrow();

      // Without matchMedia we can't detect a reduced-motion preference, so
      // animation still runs (not skipped) and the sequence proceeds normally.
      const panel1 = screen.getByText('Panel 1').closest('[role="tabpanel"]');
      const panel2 = screen.getByText('Panel 2').closest('[role="tabpanel"]');

      fireEvent.click(screen.getAllByRole('tab')[1]!);
      expect(panel1).toHaveClass('uk-animation-leave');

      fireEvent.animationEnd(panel1!);
      expect(panel2).toHaveClass('uk-animation-enter', 'uk-active');
    } finally {
      window.matchMedia = original;
    }
  });
});

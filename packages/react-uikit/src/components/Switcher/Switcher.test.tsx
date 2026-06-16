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

    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');
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

    expect(panel1).toHaveAttribute('hidden');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  it('supports keyboard navigation', () => {
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
    expect(screen.getByText('C1-Panel 1')).not.toHaveAttribute('hidden');
    expect(screen.getByText('C1-Panel 2').closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    expect(screen.getByText('C2-Panel 1')).not.toHaveAttribute('hidden');
    expect(screen.getByText('C2-Panel 2').closest('[role="tabpanel"]')).toHaveAttribute('hidden');

    // Click Tab 2 — both containers switch
    fireEvent.click(screen.getAllByRole('tab')[1]!);

    expect(screen.getByText('C1-Panel 1').closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    expect(screen.getByText('C1-Panel 2')).not.toHaveAttribute('hidden');
    expect(screen.getByText('C2-Panel 1').closest('[role="tabpanel"]')).toHaveAttribute('hidden');
    expect(screen.getByText('C2-Panel 2')).not.toHaveAttribute('hidden');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Accordion } from './Accordion';

const renderAccordion = (props: Record<string, unknown> = {}) => {
  return render(
    <Accordion.Root {...props}>
      <Accordion.Item>
        <Accordion.Trigger>Item 1</Accordion.Trigger>
        <Accordion.Panel>Content 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>Item 2</Accordion.Trigger>
        <Accordion.Panel>Content 2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>Item 3</Accordion.Trigger>
        <Accordion.Panel>Content 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
};

describe('Accordion', () => {
  it('starts fully collapsed by default', () => {
    renderAccordion();

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');
    const panel2 = screen.getByText('Content 2').closest('[role="region"]');

    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'false');

    expect(triggers[0]!.closest('li')).not.toHaveClass('uk-open');
    expect(triggers[1]!.closest('li')).not.toHaveClass('uk-open');

    expect(panel1).toHaveAttribute('hidden');
    expect(panel2).toHaveAttribute('hidden');
  });

  it('toggles an item on click', () => {
    renderAccordion();

    const triggers = screen.getAllByRole('button');
    const panel2 = screen.getByText('Content 2').closest('[role="region"]');

    // Open item 2
    fireEvent.click(triggers[1]!);

    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'true');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  it('in single mode, opening one closes the other', () => {
    renderAccordion({ defaultOpen: [0] });

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');
    const panel2 = screen.getByText('Content 2').closest('[role="region"]');

    // Item 1 is open by default
    expect(panel1).not.toHaveAttribute('hidden');

    // Click item 2
    fireEvent.click(triggers[1]!);

    // Item 1 should close, item 2 should open
    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'true');
    expect(panel1).toHaveAttribute('hidden');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  it('in single mode, clicking the open item collapses it', () => {
    renderAccordion({ defaultOpen: [0] });

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');

    // Item 1 is open by default — click to close
    fireEvent.click(triggers[0]!);

    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'false');
    expect(panel1).toHaveAttribute('hidden');
  });

  it('supports multiple open items', () => {
    renderAccordion({ multiple: true, defaultOpen: [0] });

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');
    const panel2 = screen.getByText('Content 2').closest('[role="region"]');

    // Item 1 is open by default
    expect(panel1).not.toHaveAttribute('hidden');

    // Click item 2 — item 1 should stay open
    fireEvent.click(triggers[1]!);

    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'true');
    expect(panel1).not.toHaveAttribute('hidden');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  it('prevents collapsing the last open item when collapsible is false', () => {
    renderAccordion({ collapsible: false, defaultOpen: [0] });

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');

    // Item 1 is open — try to close it
    fireEvent.click(triggers[0]!);

    // Should remain open
    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'true');
    expect(panel1).not.toHaveAttribute('hidden');
  });

  it('supports custom defaultOpen', () => {
    renderAccordion({ defaultOpen: [1] });

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');
    const panel2 = screen.getByText('Content 2').closest('[role="region"]');

    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]!).toHaveAttribute('aria-expanded', 'true');
    expect(panel1).toHaveAttribute('hidden');
    expect(panel2).not.toHaveAttribute('hidden');
  });

  it('links triggers and panels via aria-controls/aria-labelledby', () => {
    renderAccordion();

    const triggers = screen.getAllByRole('button');
    const panel1 = screen.getByText('Content 1').closest('[role="region"]');

    expect(panel1).toBeTruthy();
    if (!panel1) {
      throw new Error('Panel 1 not found');
    }

    const controlsId = triggers[0]!.getAttribute('aria-controls');

    expect(controlsId).toBeTruthy();
    expect(panel1).toHaveAttribute('id', controlsId);
    expect(panel1).toHaveAttribute('aria-labelledby', triggers[0]!.id);
  });

  it('supports controlled mode', () => {
    const onValueChange = vi.fn();

    const { rerender } = render(
      <Accordion.Root onValueChange={onValueChange} value={[0]}>
        <Accordion.Item>
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Panel>Content 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Panel>Content 2</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    );

    const triggers = screen.getAllByRole('button');

    // Click item 2
    fireEvent.click(triggers[1]!);

    // Should call onValueChange but not update internally (controlled)
    expect(onValueChange).toHaveBeenCalledWith([1]);
    expect(triggers[0]!).toHaveAttribute('aria-expanded', 'true'); // Still controlled by value

    // Re-render with new value
    rerender(
      <Accordion.Root onValueChange={onValueChange} value={[1]}>
        <Accordion.Item>
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Panel>Content 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Panel>Content 2</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    );

    const rerenderedTriggers = screen.getAllByRole('button');
    expect(rerenderedTriggers[0]!).toHaveAttribute('aria-expanded', 'false');
    expect(rerenderedTriggers[1]!).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders showIcon on all triggers when set on Root', () => {
    renderAccordion({ showIcon: true });

    const icons = document.querySelectorAll('.uk-accordion-icon');
    expect(icons).toHaveLength(3);
  });

  it('does not render icons when showIcon is false', () => {
    renderAccordion({ showIcon: false });

    const icons = document.querySelectorAll('.uk-accordion-icon');
    expect(icons).toHaveLength(0);
  });

  it('throws when Trigger is used outside Accordion.Root', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => {
      render(<Accordion.Trigger>Invalid</Accordion.Trigger>);
    }).toThrow();

    consoleError.mockRestore();
  });
});

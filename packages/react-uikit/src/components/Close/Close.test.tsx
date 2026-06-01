import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Close } from './Close';

describe('Close', () => {
  // --- Default (button) render ---

  it('renders a button with both uk-icon and uk-close classes by default', () => {
    render(<Close />);
    const button = screen.getByRole('button', { name: 'Close' });

    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('uk-icon', 'uk-close');
  });

  // --- type attribute ---

  it('sets type="button" by default on the button fallback', () => {
    render(<Close />);
    const button = screen.getByRole('button', { name: 'Close' });

    expect(button).toHaveAttribute('type', 'button');
  });

  it('allows overriding the button type in non-slotted mode', () => {
    render(<Close type="submit" />);
    const button = screen.getByRole('button', { name: 'Close' });

    expect(button).toHaveAttribute('type', 'submit');
  });

  // --- SVG glyph content ---

  it('uses currentColor for stroke attributes in the SVG', () => {
    const { container } = render(<Close />);
    const svgPath = container.querySelector('path');

    expect(svgPath).toBeInTheDocument();
    expect(svgPath).toHaveAttribute('stroke', 'currentColor');
  });

  it('renders the 14x14 close-icon SVG by default', () => {
    const { container } = render(<Close />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '14');
    expect(svg).toHaveAttribute('height', '14');
    expect(svg).toHaveAttribute('viewBox', '0 0 14 14');
  });

  // --- large prop ---

  it('renders the 20x20 close-large SVG when large is true', () => {
    const { container } = render(<Close large />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
    expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
  });

  it('applies uk-close-large class instead of uk-close when large is true', () => {
    render(<Close large />);
    const button = screen.getByRole('button', { name: 'Close' });

    expect(button).toHaveClass('uk-icon', 'uk-close-large');
    expect(button).not.toHaveClass('uk-close');
  });

  // --- className, label and ref ---

  it('merges custom className onto the element', () => {
    render(<Close className="custom-close-class" />);
    const button = screen.getByRole('button', { name: 'Close' });

    expect(button).toHaveClass('uk-icon', 'uk-close', 'custom-close-class');
  });

  it('use custom label text for the element', () => {
    render(<Close label="Close the component" />);
    const button = screen.getByRole('button', { name: 'Close the component' });

    expect(button).toBeInTheDocument();
  });

  it('forwards ref to the button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Close ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toHaveClass('uk-icon', 'uk-close');
  });

  // --- asChild / Slot render delegation ---

  it('renders as the passed child element and injects the SVG when asChild is true', () => {
    const { container } = render(
      <Close asChild>
        <a href="/home" aria-label="Close"></a>
      </Close>
    );

    // 1. The rendered element should be an anchor tag because of asChild
    const link = screen.getByRole('link', { name: 'Close' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('uk-icon', 'uk-close');

    // 2. The SVG should be successfully injected INSIDE that anchor tag
    const svg = container.querySelector('a > svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '14');
  });

  it('does not enforce type="button" when asChild is active on an anchor', () => {
    render(
      <Close asChild>
        <a href="/home" aria-label="Close"></a>
      </Close>
    );
    const link = screen.getByRole('link', { name: 'Close' });

    expect(link).not.toHaveAttribute('type');
  });
});

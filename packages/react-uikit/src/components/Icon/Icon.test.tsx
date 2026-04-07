import { render } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';

describe('Icon', () => {
  // --- DOM structure ---

  it('renders a span with class uk-icon', () => {
    const { container } = render(<Icon name="heart" />);
    const span = container.querySelector('.uk-icon');

    expect(span).toBeInTheDocument();
    expect(span?.tagName).toBe('SPAN');
    expect(span).toHaveClass('uk-icon');
  });

  it('renders an inner svg element', () => {
    const { container } = render(<Icon name="check" />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('has aria-hidden="true" on the inner SVG', () => {
    const { container } = render(<Icon name="heart" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  // --- Ratio prop ---

  it('applies ratio scaling to SVG width and height attributes', () => {
    const { container } = render(<Icon name="check" ratio={2} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '40');
    expect(svg).toHaveAttribute('height', '40');
  });

  it('applies ratio=1 by default (1x scale)', () => {
    const { container } = render(<Icon name="heart" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  // --- className and attributes ---

  it('merges custom className onto the span', () => {
    const { container } = render(<Icon name="heart" className="custom-icon-class" />);
    const span = container.querySelector('.uk-icon');

    expect(span).toHaveClass('uk-icon', 'custom-icon-class');
  });

  it('forwards extra HTML attributes to the span', () => {
    const { container } = render(<Icon name="heart" id="my-heart-icon" data-testid="heart-icon" />);
    const span = container.querySelector('.uk-icon');

    expect(span).toHaveAttribute('id', 'my-heart-icon');
    expect(span).toHaveAttribute('data-testid', 'heart-icon');
  });

  // --- ref forwarding ---

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Icon name="heart" ref={ref} />);
    const span = ref.current;

    expect(span).toBeInstanceOf(HTMLSpanElement);
    expect(span).toHaveClass('uk-icon');
  });
});

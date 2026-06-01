import { render } from '@testing-library/react';
import * as React from 'react';
import UIkit from 'uikit';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import { Grid } from './Grid';

// --- Stub ResizeObserver (not available in jsdom) ---

beforeAll(() => {
  globalThis.ResizeObserver ??= class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.ResizeObserver;
});

// --- Mock UIkit ---

const destroyGrid = vi.fn();
const destroyHeightMatch = vi.fn();

vi.mock('uikit', () => ({
  default: {
    grid: vi.fn(() => ({ $destroy: destroyGrid })),
    heightMatch: vi.fn(() => ({ $destroy: destroyHeightMatch }))
  }
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('Grid', () => {
  // --- Default rendering ---

  it('renders a div with uk-grid class by default', () => {
    const { container } = render(<Grid>content</Grid>);
    const el = container.firstElementChild!;

    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('uk-grid');
  });

  it('renders children inside the grid element', () => {
    const { container } = render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );

    expect(container.querySelectorAll('.uk-grid > div')).toHaveLength(2);
  });

  // --- className merging ---

  it('merges custom className onto the element', () => {
    const { container } = render(<Grid className="uk-grid-small custom-class">content</Grid>);
    const el = container.firstElementChild!;

    expect(el).toHaveClass('uk-grid', 'uk-grid-small', 'custom-class');
  });

  // --- Polymorphic `as` prop ---

  it('renders as a <ul> when as="ul"', () => {
    const { container } = render(
      <Grid as="ul">
        <li>item</li>
      </Grid>
    );
    const el = container.firstElementChild!;

    expect(el.tagName).toBe('UL');
    expect(el).toHaveClass('uk-grid');
  });

  it('renders as a <section> when as="section"', () => {
    const { container } = render(<Grid as="section">content</Grid>);

    expect(container.firstElementChild!.tagName).toBe('SECTION');
  });

  // --- Dev-mode warning for invalid elements ---

  it('warns when using a non-recommended element for as', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<Grid as="span">content</Grid>);

    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('"span" is not a recommended element')
    );

    consoleWarn.mockRestore();
  });

  it('does not warn for valid grid elements', () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<Grid as="nav">content</Grid>);

    expect(consoleWarn).not.toHaveBeenCalled();

    consoleWarn.mockRestore();
  });

  // --- ref forwarding ---

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Grid ref={ref}>content</Grid>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('uk-grid');
  });

  // --- Extra HTML attributes ---

  it('forwards extra HTML attributes to the root element', () => {
    const { container } = render(
      <Grid id="my-grid" data-testid="grid-el">
        content
      </Grid>
    );
    const el = container.firstElementChild!;

    expect(el).toHaveAttribute('id', 'my-grid');
    expect(el).toHaveAttribute('data-testid', 'grid-el');
  });

  // --- UIkit.grid() initialisation (masonry / parallax) ---

  it('does not initialise UIkit.grid() when no masonry or parallax props are set', () => {
    render(<Grid>content</Grid>);

    expect(UIkit.grid).not.toHaveBeenCalled();
  });

  it('initialises UIkit.grid() with masonry when masonry prop is set', () => {
    render(<Grid masonry="pack">content</Grid>);

    expect(UIkit.grid).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ masonry: 'pack' })
    );
  });

  it('initialises UIkit.grid() with parallax options', () => {
    render(
      <Grid parallax={150} parallaxStart="100vh" parallaxEnd="0" parallaxJustify>
        content
      </Grid>
    );

    expect(UIkit.grid).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        parallax: 150,
        parallaxStart: '100vh',
        parallaxEnd: '0',
        parallaxJustify: true
      })
    );
  });

  it('calls $destroy on the UIkit.grid instance when unmounted', () => {
    const { unmount } = render(<Grid masonry="next">content</Grid>);

    unmount();

    expect(destroyGrid).toHaveBeenCalled();
  });

  // --- UIkit.heightMatch() initialisation ---

  it('does not initialise UIkit.heightMatch() by default', () => {
    render(<Grid>content</Grid>);

    expect(UIkit.heightMatch).not.toHaveBeenCalled();
  });

  it('initialises UIkit.heightMatch() with default target when matchHeight is true', () => {
    render(<Grid matchHeight>content</Grid>);

    expect(UIkit.heightMatch).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ target: '> *', row: true })
    );
  });

  it('initialises UIkit.heightMatch() with custom target when matchHeight is a string', () => {
    render(<Grid matchHeight=".card-body">content</Grid>);

    expect(UIkit.heightMatch).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ target: '.card-body', row: true })
    );
  });

  it('passes matchRow=false to UIkit.heightMatch() when specified', () => {
    render(
      <Grid matchHeight matchRow={false}>
        content
      </Grid>
    );

    expect(UIkit.heightMatch).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({ row: false })
    );
  });

  it('calls $destroy on the UIkit.heightMatch instance when unmounted', () => {
    const { unmount } = render(<Grid matchHeight>content</Grid>);

    unmount();

    expect(destroyHeightMatch).toHaveBeenCalled();
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { OffCanvas } from './';

const { offcanvasMock, showMock, hideMock, onMock, offMock } = vi.hoisted(() => {
  const showMock = vi.fn();
  const hideMock = vi.fn();
  const offcanvasMock = vi.fn(() => ({ show: showMock, hide: hideMock }));
  const onMock = vi.fn();
  const offMock = vi.fn();

  return { offcanvasMock, showMock, hideMock, onMock, offMock };
});

vi.mock('uikit', () => ({
  default: {
    offcanvas: offcanvasMock,
    util: {
      on: onMock,
      off: offMock
    }
  }
}));

vi.mock('react-focus-lock', () => ({
  default: ({
    disabled,
    returnFocus,
    children
  }: {
    disabled: boolean;
    returnFocus: boolean;
    children: React.ReactNode;
  }) => (
    <div
      data-testid="focus-lock"
      data-disabled={String(disabled)}
      data-return-focus={String(returnFocus)}
    >
      {children}
    </div>
  )
}));

vi.mock('react-remove-scroll', () => ({
  RemoveScroll: ({ enabled, children }: { enabled: boolean; children: React.ReactNode }) => (
    <div data-testid="remove-scroll" data-enabled={String(enabled)}>
      {children}
    </div>
  )
}));

describe('OffCanvas', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders into document.body with default offcanvas options', () => {
    render(
      <OffCanvas.Root open={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    const panel = document.body.querySelector('.uk-offcanvas');

    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute(
      'data-uk-offcanvas',
      'mode: slide; overlay: false; flip: false; esc-close: true; bg-close: true; swiping: true'
    );
  });

  it('calls UIkit.offcanvas with the rendered element', () => {
    render(
      <OffCanvas.Root open={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(offcanvasMock).toHaveBeenCalledTimes(1);
    expect(offcanvasMock).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('calls show when open is true', () => {
    render(
      <OffCanvas.Root open={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(showMock).toHaveBeenCalledTimes(1);
    expect(hideMock).not.toHaveBeenCalled();
  });

  it('calls hide when open is false', () => {
    render(
      <OffCanvas.Root open={false} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(hideMock).toHaveBeenCalledTimes(1);
    expect(showMock).not.toHaveBeenCalled();
  });

  it('registers hidden listener and removes it on unmount', () => {
    const { unmount } = render(
      <OffCanvas.Root open={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(onMock).toHaveBeenCalledTimes(1);
    expect(onMock).toHaveBeenCalledWith(expect.any(HTMLDivElement), 'hidden', expect.any(Function));

    const firstOnCall = onMock.mock.calls[0];
    expect(firstOnCall).toBeDefined();
    if (!firstOnCall) {
      throw new Error('Expected hidden handler registration call');
    }

    const [el, _, handler] = firstOnCall;
    unmount();

    expect(offMock).toHaveBeenCalledTimes(1);
    expect(offMock).toHaveBeenCalledWith(el, 'hidden', handler);
  });

  it('calls the latest onClose callback when hidden event fires', () => {
    const onCloseA = vi.fn();
    const onCloseB = vi.fn();

    const { rerender } = render(
      <OffCanvas.Root open={true} onClose={onCloseA}>
        <div>content</div>
      </OffCanvas.Root>
    );

    const firstOnCall = onMock.mock.calls[0];
    expect(firstOnCall).toBeDefined();
    if (!firstOnCall) {
      throw new Error('Expected hidden handler registration call');
    }

    const hiddenHandler = firstOnCall[2] as () => void;

    rerender(
      <OffCanvas.Root open={true} onClose={onCloseB}>
        <div>content</div>
      </OffCanvas.Root>
    );

    hiddenHandler();

    expect(onCloseA).not.toHaveBeenCalled();
    expect(onCloseB).toHaveBeenCalledTimes(1);
  });

  it('disables focus lock and remove scroll when overlay is true', () => {
    render(
      <OffCanvas.Root open={true} overlay={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(screen.getByTestId('focus-lock')).toHaveAttribute('data-disabled', 'true');
    expect(screen.getByTestId('focus-lock')).toHaveAttribute('data-return-focus', 'true');
    expect(screen.getByTestId('remove-scroll')).toHaveAttribute('data-enabled', 'false');
  });

  it('disables focus lock and remove scroll when open is false', () => {
    render(
      <OffCanvas.Root open={false} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    expect(screen.getByTestId('focus-lock')).toHaveAttribute('data-disabled', 'true');
    expect(screen.getByTestId('remove-scroll')).toHaveAttribute('data-enabled', 'false');
  });

  it('uses custom mode, overlay and flip values in data attribute', () => {
    render(
      <OffCanvas.Root open={true} mode="push" overlay={true} flip={true} onClose={() => {}}>
        <div>content</div>
      </OffCanvas.Root>
    );

    const panel = document.body.querySelector('.uk-offcanvas');
    expect(panel).toHaveAttribute(
      'data-uk-offcanvas',
      'mode: push; overlay: true; flip: true; esc-close: true; bg-close: true; swiping: true'
    );
  });
});

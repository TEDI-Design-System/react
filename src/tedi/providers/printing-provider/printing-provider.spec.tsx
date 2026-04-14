import { act, render, screen } from '@testing-library/react';

import { PrintingProvider, usePrint } from './printing-provider';

import '@testing-library/jest-dom';

describe('PrintingProvider', () => {
  let beforePrintHandler: EventListener | null = null;
  let afterPrintHandler: EventListener | null = null;

  beforeEach(() => {
    beforePrintHandler = null;
    afterPrintHandler = null;

    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation((event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === 'beforeprint') {
          beforePrintHandler = handler as EventListener;
        }
        if (event === 'afterprint') {
          afterPrintHandler = handler as EventListener;
        }
      });

    jest
      .spyOn(window, 'removeEventListener')
      .mockImplementation((event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === 'beforeprint' && handler === beforePrintHandler) {
          beforePrintHandler = null;
        }
        if (event === 'afterprint' && handler === afterPrintHandler) {
          afterPrintHandler = null;
        }
      });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const TestConsumer = () => {
    const isPrinting = usePrint();
    return (
      <div>
        <p data-testid="print-status">{isPrinting ? 'printing' : 'not-printing'}</p>
      </div>
    );
  };

  it('provides false by default (not printing)', () => {
    render(
      <PrintingProvider>
        <TestConsumer />
      </PrintingProvider>
    );

    expect(screen.getByTestId('print-status')).toHaveTextContent('not-printing');
  });

  it('updates to true when beforeprint fires', () => {
    render(
      <PrintingProvider>
        <TestConsumer />
      </PrintingProvider>
    );

    expect(screen.getByTestId('print-status')).toHaveTextContent('not-printing');

    act(() => {
      beforePrintHandler?.(new Event('beforeprint'));
    });

    expect(screen.getByTestId('print-status')).toHaveTextContent('printing');
  });

  it('reverts to false when afterprint fires', () => {
    render(
      <PrintingProvider>
        <TestConsumer />
      </PrintingProvider>
    );

    act(() => {
      beforePrintHandler?.(new Event('beforeprint'));
    });

    expect(screen.getByTestId('print-status')).toHaveTextContent('printing');

    act(() => {
      afterPrintHandler?.(new Event('afterprint'));
    });

    expect(screen.getByTestId('print-status')).toHaveTextContent('not-printing');
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(
      <PrintingProvider>
        <TestConsumer />
      </PrintingProvider>
    );

    expect(window.addEventListener).toHaveBeenCalledTimes(2);
    expect(window.addEventListener).toHaveBeenCalledWith('beforeprint', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('afterprint', expect.any(Function));

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledTimes(2);
    expect(window.removeEventListener).toHaveBeenCalledWith('beforeprint', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('afterprint', expect.any(Function));
  });

  it('keeps state consistent across nested consumers', () => {
    const NestedConsumer = () => {
      const isPrinting = usePrint();
      return <span data-testid="nested">{isPrinting ? 'yes' : 'no'}</span>;
    };

    render(
      <PrintingProvider>
        <TestConsumer />
        <NestedConsumer />
      </PrintingProvider>
    );

    expect(screen.getByTestId('print-status')).toHaveTextContent('not-printing');
    expect(screen.getByTestId('nested')).toHaveTextContent('no');

    act(() => {
      beforePrintHandler?.(new Event('beforeprint'));
    });

    expect(screen.getByTestId('print-status')).toHaveTextContent('printing');
    expect(screen.getByTestId('nested')).toHaveTextContent('yes');
  });
});

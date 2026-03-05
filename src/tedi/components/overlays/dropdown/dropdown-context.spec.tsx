import { render, renderHook } from '@testing-library/react';
import React from 'react';

import { DropdownContext, type DropdownContextValue, useDropdownContext } from './dropdown-context';

jest.mock('@floating-ui/react', () => ({
  useFloating: jest.fn(() => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
      reference: { current: null },
      floating: { current: null },
    },
    x: 0,
    y: 0,
    strategy: 'absolute',
    placement: 'bottom-start',
  })),
  useInteractions: jest.fn(() => ({
    getReferenceProps: jest.fn((userProps) => ({ ...userProps })),
    getFloatingProps: jest.fn((userProps) => ({ ...userProps })),
    getItemProps: jest.fn((userProps) => ({ ...userProps })),
  })),
}));

describe('DropdownContext + useDropdownContext', () => {
  const mockSetOpen = jest.fn();
  const mockSetActiveIndex = jest.fn();
  const mockSetContent = jest.fn();

  const mockContextValue: DropdownContextValue = {
    open: true,
    setOpen: mockSetOpen,
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
      reference: { current: null },
      floating: { current: null },
      domReference: { current: null },
      setPositionReference: jest.fn(),
    },
    getReferenceProps: jest.fn(),
    getFloatingProps: jest.fn(),
    getItemProps: jest.fn(),
    listItemsRef: { current: [] },
    activeIndex: 2,
    setActiveIndex: mockSetActiveIndex,
    placement: 'bottom-start',
    content: <div>Mock content</div>,
    setContent: mockSetContent,
    divided: true,
    variant: 'tree',
  };

  const wrapperWithContext = ({ children }: { children: React.ReactNode }) => (
    <DropdownContext.Provider value={mockContextValue}>{children}</DropdownContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws error when useDropdownContext is used outside DropdownContext', () => {
    expect(() => {
      renderHook(() => useDropdownContext());
    }).toThrow('Dropdown components must be used within <Dropdown />');
  });

  it('returns context value when used inside provider', () => {
    const { result } = renderHook(() => useDropdownContext(), {
      wrapper: wrapperWithContext,
    });

    expect(result.current).toEqual(mockContextValue);
    expect(result.current?.open).toBe(true);
    expect(result.current?.activeIndex).toBe(2);
    expect(result.current?.variant).toBe('tree');
    expect(result.current?.content).toEqual(<div>Mock content</div>);
  });

  it('does not throw when context is provided (smoke test)', () => {
    const TestConsumer = () => {
      const ctx = useDropdownContext();
      return <div data-testid="consumer">{ctx?.open ? 'Open' : 'Closed'}</div>;
    };

    const { getByTestId } = render(<TestConsumer />, {
      wrapper: wrapperWithContext,
    });

    expect(getByTestId('consumer')).toHaveTextContent('Open');
  });

  it('context value has all expected keys', () => {
    const { result } = renderHook(() => useDropdownContext(), {
      wrapper: wrapperWithContext,
    });

    const ctx = result.current;
    expect(ctx).toHaveProperty('open');
    expect(ctx).toHaveProperty('setOpen');
    expect(ctx).toHaveProperty('refs');
    expect(ctx).toHaveProperty('getReferenceProps');
    expect(ctx).toHaveProperty('getFloatingProps');
    expect(ctx).toHaveProperty('getItemProps');
    expect(ctx).toHaveProperty('listItemsRef');
    expect(ctx).toHaveProperty('activeIndex');
    expect(ctx).toHaveProperty('setActiveIndex');
    expect(ctx).toHaveProperty('placement');
    expect(ctx).toHaveProperty('content');
    expect(ctx).toHaveProperty('setContent');
    expect(ctx).toHaveProperty('divided');
    expect(ctx).toHaveProperty('variant');
  });

  it('context value shape matches snapshot', () => {
    const { result } = renderHook(() => useDropdownContext(), {
      wrapper: wrapperWithContext,
    });

    const {
      setOpen,
      setActiveIndex,
      setContent,
      refs,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      listItemsRef,
      ...serializable
    } = result.current ?? {};
    expect(serializable).toMatchSnapshot();
  });
});

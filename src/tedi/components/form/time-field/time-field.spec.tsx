/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { TimeField } from './time-field';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: () => ({
    getCurrentBreakpointProps: (props: any) => ({
      ...props,
    }),
  }),
  useBreakpoint: () => 'xs',
  isBreakpointBelow: (current: string, target: string) => {
    const order = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    return order.indexOf(current) < order.indexOf(target);
  },
}));

jest.mock('@floating-ui/react', () => ({
  autoUpdate: jest.fn(),
  flip: jest.fn(),
  offset: jest.fn(),
  shift: jest.fn(),
  useClick: () => ({}),
  useDismiss: () => ({}),
  useRole: () => ({}),
  useInteractions: () => ({
    getReferenceProps: () => ({}),
    getFloatingProps: (props: any) => props,
  }),
  useFloating: () => ({
    refs: {
      setReference: jest.fn(),
      setFloating: jest.fn(),
    },
    context: {},
    x: 0,
    y: 0,
    strategy: 'absolute',
  }),
  FloatingPortal: ({ children }: any) => <>{children}</>,
  FloatingFocusManager: ({ children }: any) => <>{children}</>,
}));

jest.mock('../../overlays/dropdown', () => {
  const Dropdown = ({ children }: any) => <div data-testid="dropdown">{children}</div>;
  Dropdown.Trigger = ({ children }: any) => <div data-testid="trigger">{children}</div>;
  Dropdown.Content = ({ children }: any) => <div data-testid="content">{children}</div>;
  Dropdown.Item = ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>;

  return { Dropdown };
});

jest.mock('../textfield/textfield', () => {
  const ReactModule = jest.requireActual('react');
  return ReactModule.forwardRef((props: any, ref: any) => {
    const inputRef = ReactModule.useRef(null);

    ReactModule.useImperativeHandle(ref, () => ({
      input: inputRef.current,
      inner: inputRef.current,
    }));

    return (
      <div>
        <input
          ref={inputRef}
          data-testid="textfield-input"
          value={props.value || ''}
          onChange={(e: any) => props.onChange?.(e.target.value)}
        />
        <button data-testid="icon" onClick={props.onIconClick}>
          icon
        </button>
      </div>
    );
  });
});

jest.mock('../time-picker/time-picker', () => ({
  TimePicker: ({ value, onChange }: any) => (
    <div>
      <div data-testid="timepicker">{value}</div>
      <button onClick={() => onChange('12:30')}>pick</button>
    </div>
  ),
}));

describe('TimeField', () => {
  it('renders with default value', () => {
    render(<TimeField id="t1" label="Time" defaultValue="10:00" />);

    expect(screen.getByTestId('textfield-input')).toHaveValue('10:00');
  });

  it('works as controlled component', () => {
    const { rerender } = render(<TimeField id="t1" label="Time" value="08:00" />);

    expect(screen.getByTestId('textfield-input')).toHaveValue('08:00');

    rerender(<TimeField id="t1" label="Time" value="09:00" />);

    expect(screen.getByTestId('textfield-input')).toHaveValue('09:00');
  });

  it('updates internal state when uncontrolled', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" />);

    const input = screen.getByTestId('textfield-input');

    await user.clear(input);
    await user.type(input, '11:15');

    expect(input).toHaveValue('11:15');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" onChange={onChange} />);

    const input = screen.getByTestId('textfield-input');

    await user.clear(input);
    await user.type(input, '12:00');

    expect(onChange).toHaveBeenCalled();
  });

  it('opens custom picker when icon clicked (button trigger)', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" />);

    await user.click(screen.getByTestId('icon'));

    expect(screen.getByTestId('timepicker')).toBeInTheDocument();
  });

  it('closes custom picker when icon clicked again (button trigger)', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" />);

    await user.click(screen.getByTestId('icon'));
    expect(screen.getByTestId('timepicker')).toBeInTheDocument();

    await user.click(screen.getByTestId('icon'));
    expect(screen.queryByTestId('timepicker')).not.toBeInTheDocument();
  });

  it('does NOT open picker when readOnly', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" readOnly />);

    await user.click(screen.getByTestId('icon'));

    expect(screen.queryByTestId('timepicker')).not.toBeInTheDocument();
  });

  it('updates value from TimePicker', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" />);

    await user.click(screen.getByTestId('icon'));
    await user.click(screen.getByText('pick'));

    expect(screen.getByTestId('textfield-input')).toHaveValue('12:30');
  });

  it('renders dropdown variant when availableTimes + dropdown', () => {
    render(<TimeField id="t1" label="Time" availableTimes={['09:00', '10:00']} availableTimesVariant="dropdown" />);

    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders dropdown items when opened', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" availableTimes={['09:00', '10:00']} availableTimesVariant="dropdown" />);

    await user.click(screen.getByTestId('icon'));

    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('selects time from dropdown', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <TimeField
        id="t1"
        label="Time"
        availableTimes={['09:00', '10:00']}
        availableTimesVariant="dropdown"
        onChange={onChange}
      />
    );

    await user.click(screen.getByText('10:00'));

    expect(onChange).toHaveBeenCalledWith('10:00');
  });

  it('uses native picker path (focus/showPicker)', async () => {
    const user = userEvent.setup();
    const showPicker = jest.fn();

    render(<TimeField id="t1" label="Time" useNativePicker />);

    const input = screen.getByTestId('textfield-input');

    Object.defineProperty(input, 'showPicker', {
      value: showPicker,
    });

    await user.click(screen.getByTestId('icon'));

    expect(showPicker).toHaveBeenCalled();
  });
});

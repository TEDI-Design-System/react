/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
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
          {...props.input}
          ref={inputRef}
          data-testid="textfield-input"
          value={props.value || ''}
          onChange={(e: any) => props.onChange?.(e.target.value)}
          onBlur={props.onBlur}
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

  it('still opens the picker when readOnly (typing is blocked, picking is not)', async () => {
    const user = userEvent.setup();

    render(<TimeField id="t1" label="Time" defaultValue="10:00" readOnly />);

    await user.click(screen.getByTestId('icon'));

    expect(screen.getByTestId('timepicker')).toBeInTheDocument();
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

  it('button-trigger dropdown does not open from an input click (stops propagation to the trigger)', async () => {
    const user = userEvent.setup();
    const parentClick = jest.fn();

    render(
      <div onClick={parentClick}>
        <TimeField
          id="t1"
          label="Time"
          availableTimes={['09:00', '10:00']}
          availableTimesVariant="dropdown"
          timePickerTrigger="button"
        />
      </div>
    );

    await user.click(screen.getByTestId('textfield-input'));
    // Input click must not bubble to the Dropdown trigger — only the icon opens a button-trigger dropdown.
    expect(parentClick).not.toHaveBeenCalled();
  });

  it('input-trigger dropdown opens from an input click (click reaches the trigger)', async () => {
    const user = userEvent.setup();
    const parentClick = jest.fn();

    render(
      <div onClick={parentClick}>
        <TimeField
          id="t2"
          label="Time"
          availableTimes={['09:00', '10:00']}
          availableTimesVariant="dropdown"
          timePickerTrigger="input"
        />
      </div>
    );

    await user.click(screen.getByTestId('textfield-input'));
    expect(parentClick).toHaveBeenCalled();
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

  it('normalises a delimiter-less time on blur (e.g. "1155" -> "11:55")', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TimeField id="t-norm" label="Time" onChange={onChange} />);

    const input = screen.getByTestId('textfield-input');
    await user.click(input);
    await user.keyboard('1155');
    await user.tab();

    await waitFor(() => expect(input).toHaveValue('11:55'));
    expect(onChange).toHaveBeenLastCalledWith('11:55');
  });

  it('leaves invalid input untouched on blur (no normalisation possible)', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<TimeField id="t-norm-bad" label="Time" onChange={onChange} />);

    const input = screen.getByTestId('textfield-input');
    await user.click(input);
    await user.keyboard('9999');
    onChange.mockClear();
    await user.tab();

    expect(input).toHaveValue('9999');
    expect(onChange).not.toHaveBeenCalled();
  });
});

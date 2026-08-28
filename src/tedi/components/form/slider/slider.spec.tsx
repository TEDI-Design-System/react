import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { Slider, SliderProps } from './slider';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

describe('Slider component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: SliderProps = {
    id: 'test-slider',
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
  };

  it('renders the slider with role and accessible name', () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole('slider', { name: /volume/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-slider');
    expect(input).toHaveAttribute('type', 'range');
  });

  it('uses defaultValue in uncontrolled mode', () => {
    render(<Slider {...defaultProps} defaultValue={30} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('30');
  });

  it('respects controlled value and does not update internal state without prop change', () => {
    const handleChange = jest.fn();
    render(<Slider {...defaultProps} value={50} onChange={handleChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('50');

    fireEvent.change(input, { target: { value: '70' } });
    expect(handleChange).toHaveBeenCalledWith(70);
    expect(input.value).toBe('50');
  });

  it('updates value in uncontrolled mode and fires onChange', () => {
    const handleChange = jest.fn();
    render(<Slider {...defaultProps} defaultValue={10} onChange={handleChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '42' } });

    expect(handleChange).toHaveBeenCalledWith(42);
    expect(input.value).toBe('42');
  });

  it('renders min and max range labels', () => {
    render(<Slider {...defaultProps} minLabel="0%" maxLabel="100%" />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('renders the current value instead of maxLabel when showCurrentValue is true', () => {
    render(
      <Slider
        {...defaultProps}
        defaultValue={25}
        maxLabel="100%"
        showCurrentValue
        tooltip={false}
        valueFormatter={(value) => `${value}%`}
      />
    );
    expect(screen.getByText('25%')).toBeInTheDocument();
    expect(screen.queryByText('100%')).not.toBeInTheDocument();
  });

  it('renders addonRight node', () => {
    render(<Slider {...defaultProps} addonRight={<button type="button">+</button>} />);
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
  });

  it('disables the input when disabled', () => {
    render(<Slider {...defaultProps} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('exposes aria-invalid when invalid', () => {
    render(<Slider {...defaultProps} invalid />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text and links it via aria-describedby using the helper id when provided', () => {
    render(<Slider {...defaultProps} helper={{ type: 'hint', text: 'Slide to adjust', id: 'hint-1' }} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('aria-describedby', 'hint-1');
    expect(screen.getByText(/slide to adjust/i)).toBeInTheDocument();
  });

  it('falls back to a generated helper id when the helper has no id', () => {
    render(<Slider {...defaultProps} helper={{ type: 'hint', text: 'Slide to adjust' }} />);
    const input = screen.getByRole('slider');
    expect(input).toHaveAttribute('aria-describedby', 'test-slider-helper');
  });

  it('does not set aria-describedby when no helper is provided', () => {
    render(<Slider {...defaultProps} />);
    const input = screen.getByRole('slider');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('clamps the displayed value when out of range', () => {
    render(<Slider {...defaultProps} min={0} max={50} value={200} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('50');
  });

  it('forwards ref to the underlying input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Slider {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('does not show the tooltip until the slider is hovered or focused', () => {
    render(<Slider {...defaultProps} defaultValue={42} valueFormatter={(value) => `${value}%`} />);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the tooltip with the current value on hover', () => {
    render(<Slider {...defaultProps} defaultValue={42} valueFormatter={(value) => `${value}%`} />);
    const input = screen.getByRole('slider');

    fireEvent.mouseEnter(input);
    expect(screen.getByRole('tooltip')).toHaveTextContent('42%');

    fireEvent.mouseLeave(input);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows the tooltip on keyboard focus', () => {
    render(<Slider {...defaultProps} defaultValue={30} />);
    const input = screen.getByRole('slider');

    fireEvent.focus(input);
    expect(screen.getByRole('tooltip')).toHaveTextContent('30');

    fireEvent.blur(input);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not render the tooltip when tooltip={false}', () => {
    render(<Slider {...defaultProps} defaultValue={42} tooltip={false} />);
    const input = screen.getByRole('slider');
    fireEvent.mouseEnter(input);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('does not render the tooltip when disabled', () => {
    render(<Slider {...defaultProps} defaultValue={42} disabled />);
    const input = screen.getByRole('slider');
    fireEvent.mouseEnter(input);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('updates the tooltip content when the value changes while open', () => {
    render(<Slider {...defaultProps} defaultValue={10} valueFormatter={(value) => `${value}%`} />);
    const input = screen.getByRole('slider');

    fireEvent.mouseEnter(input);
    expect(screen.getByRole('tooltip')).toHaveTextContent('10%');

    fireEvent.change(input, { target: { value: '75' } });
    expect(screen.getByRole('tooltip')).toHaveTextContent('75%');
  });

  it('keeps the tooltip visible while dragging, even after the pointer leaves the track', () => {
    render(<Slider {...defaultProps} defaultValue={40} valueFormatter={(value) => `${value}%`} />);
    const input = screen.getByRole('slider');

    fireEvent.mouseEnter(input);
    fireEvent.pointerDown(input, { pointerId: 1 });
    fireEvent.mouseLeave(input);

    expect(screen.getByRole('tooltip')).toHaveTextContent('40%');

    fireEvent.pointerUp(window, { pointerId: 1 });

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies the dragging class while the pointer is down and removes it on pointerup', () => {
    render(<Slider {...defaultProps} defaultValue={40} />);
    const input = screen.getByRole('slider');

    fireEvent.pointerDown(input, { pointerId: 1 });
    expect(input.className).toMatch(/--dragging/);

    fireEvent.pointerUp(window, { pointerId: 1 });
    expect(input.className).not.toMatch(/--dragging/);
  });

  it('does not start dragging when the slider is disabled', () => {
    render(<Slider {...defaultProps} defaultValue={40} disabled />);
    const input = screen.getByRole('slider');

    fireEvent.pointerDown(input, { pointerId: 1 });
    expect(input.className).not.toMatch(/--dragging/);
  });

  it('ends dragging on pointercancel', () => {
    render(<Slider {...defaultProps} defaultValue={40} />);
    const input = screen.getByRole('slider');

    fireEvent.pointerDown(input, { pointerId: 1 });
    expect(input.className).toMatch(/--dragging/);

    fireEvent.pointerCancel(window, { pointerId: 1 });
    expect(input.className).not.toMatch(/--dragging/);
  });

  it('uses the default min/max/step when none are provided', () => {
    render(<Slider label="Volume" />);
    const input = screen.getByRole('slider') as HTMLInputElement;

    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
    expect(input).toHaveAttribute('step', '1');
    expect(input.value).toBe('0');
  });

  it('generates an id when none is provided', () => {
    render(<Slider label="Volume" />);
    const input = screen.getByRole('slider');

    expect(input.id).toMatch(/^tedi-slider-/);
  });

  it('avoids a divide-by-zero when min equals max', () => {
    expect(() => render(<Slider label="Volume" min={5} max={5} value={5} />)).not.toThrow();
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('5');
  });

  it('marks the slider invalid when the helper has type="error"', () => {
    render(<Slider {...defaultProps} helper={{ type: 'error', text: 'Oops' }} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-invalid', 'true');
  });
});

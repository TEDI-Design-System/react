import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import Separator, { SeparatorProps } from './separator';
import styles from './separator.module.scss';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Separator Component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const renderComponent = <P extends SeparatorProps>(props: P) =>
    render(<Separator {...props} data-testid="separator" />);

  it('renders a div by default', () => {
    const { getByTestId } = renderComponent({ element: 'div' });
    expect(getByTestId('separator').tagName).toBe('DIV');
  });

  it('renders the specified element', () => {
    const { getByTestId } = renderComponent({ element: 'hr' });
    expect(getByTestId('separator').tagName).toBe('HR');
  });

  it('applies base and default classes', () => {
    const { getByTestId } = renderComponent({ axis: 'horizontal' });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator']);
    expect(el).toHaveClass(styles['tedi-separator--horizontal']);
    expect(el).toHaveClass(styles['tedi-separator--thickness-1']);
  });

  it('applies custom className', () => {
    const { getByTestId } = renderComponent({ className: 'my-extra-class' });
    expect(getByTestId('separator')).toHaveClass('my-extra-class');
  });

  it('applies color modifier', () => {
    const { getByTestId } = renderComponent({ color: 'accent' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--accent']);
  });

  it('applies vertical axis class and allows height', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical', height: 5.5 });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--vertical']);
    expect(el).toHaveStyle('--vertical-separator-height: 5.5rem');
  });

  it('applies spacing classes — number value', () => {
    const { getByTestId } = renderComponent({ spacing: 1.5 });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--top-1-5']);
    expect(el).toHaveClass(styles['tedi-separator--bottom-1-5']);
  });

  it('applies spacing classes — object value', () => {
    const { getByTestId } = renderComponent({
      spacing: { top: 2, bottom: 0.5, left: 1 },
      axis: 'horizontal',
    });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--top-2']);
    expect(el).toHaveClass(styles['tedi-separator--bottom-0-5']);
    expect(el).toHaveClass(styles['tedi-separator--left-1']);
  });

  it('applies isStretched class', () => {
    const { getByTestId } = renderComponent({ isStretched: true });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--is-stretched']);
  });

  it('applies thickness class when no variant', () => {
    const { getByTestId } = renderComponent({ thickness: 2 });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--thickness-2']);
  });
  it('applies dotted class and dot size', () => {
    const { getByTestId } = renderComponent({
      variant: 'dotted',
      dotSize: 'sm',
      dotPosition: 'center',
    });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--dotted']);
    expect(el).toHaveClass(styles['tedi-separator--dotted-sm']);
    expect(el).toHaveClass(styles['tedi-separator--dot-position-center']);
  });

  it('applies custom dot position via CSS var', () => {
    const { getByTestId } = renderComponent({
      variant: 'dotted',
      dotPosition: 2.75,
    });
    expect(getByTestId('separator')).toHaveStyle('--separator-dot-position: 2.75rem');
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-position-custom']);
  });

  it('does not apply dot-style class when variant is dotted', () => {
    const { getByTestId } = renderComponent({
      variant: 'dotted',
      dotStyle: undefined,
    });
    expect(getByTestId('separator')).not.toHaveClass(/dot-style/);
  });

  it('applies dot-only and dot size class', () => {
    const { getByTestId } = renderComponent({
      variant: 'dot-only',
      dotSize: 'lg',
      dotStyle: 'filled',
    });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--dot-only']);
    expect(el).toHaveClass(styles['tedi-separator--dot-only-lg']);
    expect(el).not.toHaveClass(styles['tedi-separator--dot-style-outlined']);
  });

  it('applies outlined style and thickness var when outlined', () => {
    const { getByTestId } = renderComponent({
      variant: 'dot-only',
      dotSize: 'md',
      dotStyle: 'outlined',
      thickness: 2,
    });
    const el = getByTestId('separator');

    expect(el).toHaveClass(styles['tedi-separator--dot-style-outlined']);
    expect(el).toHaveStyle('--separator-thickness: 2px');
    expect(el).toHaveClass(styles['tedi-separator--thickness-2']);
  });

  it('requires dotSize (but test fallback/default)', () => {
    const { getByTestId } = renderComponent({
      variant: 'dot-only',
      dotSize: 'lg',
    });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--dot-only-lg']);
  });
  it('defaults to block display in vertical mode', () => {
    const { getByTestId } = renderComponent({ axis: 'vertical' });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--block']);
  });

  it('applies inline display when specified (vertical)', () => {
    const { getByTestId } = renderComponent({
      axis: 'vertical',
      display: 'inline-block',
    });
    expect(getByTestId('separator')).toHaveClass(styles['tedi-separator--inline-block']);
  });
});

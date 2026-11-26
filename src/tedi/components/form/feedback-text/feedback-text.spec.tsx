import { render } from '@testing-library/react';

import { FeedbackText, FeedbackTextProps } from './feedback-text';

import '@testing-library/jest-dom';

describe('FeedbackText component', () => {
  const defaultProps: FeedbackTextProps = {
    text: 'Helper text',
  };

  it('renders with default props', () => {
    const { container } = render(<FeedbackText {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text');
    expect(helperElement).toHaveClass('tedi-feedback-text--hint');
    expect(helperElement).toHaveClass('tedi-feedback-text--left');
    expect(helperElement).toHaveTextContent('Helper text');
  });

  it('renders with custom id', () => {
    const { container } = render(<FeedbackText {...defaultProps} id="custom-id" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveAttribute('id', 'custom-id');
  });

  it('renders with additional className', () => {
    const { container } = render(<FeedbackText {...defaultProps} className="custom-class" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('custom-class');
  });

  it('applies the "valid" type style as a polite live region without role="alert"', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="valid" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--valid');
    expect(helperElement).not.toHaveAttribute('role');
    expect(helperElement).toHaveAttribute('aria-live', 'polite');
  });

  it('applies the "error" type style as a polite live region without role="alert"', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="error" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--error');
    expect(helperElement).not.toHaveAttribute('role');
    expect(helperElement).toHaveAttribute('aria-live', 'polite');
  });

  it('renders with "hint" type without role or live region', () => {
    const { container } = render(<FeedbackText {...defaultProps} type="hint" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--hint');
    expect(helperElement).not.toHaveAttribute('role');
    expect(helperElement).not.toHaveAttribute('aria-live');
  });

  it('renders with the "left" position by default', () => {
    const { container } = render(<FeedbackText {...defaultProps} />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--left');
  });

  it('renders with the "right" position when specified', () => {
    const { container } = render(<FeedbackText {...defaultProps} position="right" />);
    const helperElement = container.querySelector('div[data-name="feedback-text"]');
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('tedi-feedback-text--right');
  });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import MultiValueField, { MultiValueFieldProps } from './multi-value-field';

import '@testing-library/jest-dom';

describe('MultiValueField', () => {
  const defaultProps: MultiValueFieldProps = {
    id: 'test-multi',
    label: 'Test Multi',
  };

  it('renders label when provided', () => {
    render(<MultiValueField {...defaultProps} />);
    expect(screen.getByText('Test Multi')).toBeInTheDocument();
  });

  it('renders values as tags', () => {
    render(<MultiValueField {...defaultProps} values={['apple', 'banana']} />);

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
  });

  it('renders every value tag in row layout when width cannot be measured', () => {
    render(<MultiValueField {...defaultProps} tagsDirection="row" values={['apple', 'banana', 'cherry']} />);

    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('cherry')).toBeInTheDocument();
  });

  describe('tagsDirection="row" overflow grouping', () => {
    let originalClientWidth: PropertyDescriptor | undefined;
    let originalOffsetWidth: PropertyDescriptor | undefined;

    beforeAll(() => {
      originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
      originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 100 });
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
    });

    afterAll(() => {
      if (originalClientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth);
      else delete (HTMLElement.prototype as unknown as Record<string, unknown>).clientWidth;
      if (originalOffsetWidth) Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
      else delete (HTMLElement.prototype as unknown as Record<string, unknown>).offsetWidth;
    });

    it('collapses overflowing tags into a +N counter', async () => {
      render(<MultiValueField {...defaultProps} tagsDirection="row" values={['one', 'two', 'three']} />);

      await waitFor(() => expect(screen.getByText('+2')).toBeInTheDocument());
      expect(screen.getByText('one')).toBeInTheDocument();
      expect(screen.queryByText('three')).not.toBeInTheDocument();
    });

    it('gives the overflow counter an accessible label', async () => {
      render(<MultiValueField {...defaultProps} tagsDirection="row" values={['one', 'two', 'three']} />);

      const counter = (await screen.findByText('+2')).closest('[role="status"]');
      expect(counter).toHaveAccessibleName();
      expect(counter).not.toHaveAccessibleName('+2');
    });

    it('attaches the ResizeObserver once the tags container mounts (starting empty)', () => {
      const observe = jest.fn();
      class MockResizeObserver {
        observe = observe;
        unobserve = jest.fn();
        disconnect = jest.fn();
      }
      const original = global.ResizeObserver;
      global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

      try {
        const { rerender } = render(<MultiValueField {...defaultProps} tagsDirection="row" values={[]} />);
        expect(observe).not.toHaveBeenCalled();
        rerender(<MultiValueField {...defaultProps} tagsDirection="row" values={['one', 'two']} />);
        expect(observe).toHaveBeenCalledTimes(1);
      } finally {
        global.ResizeObserver = original;
      }
    });
  });

  it('calls onChange when removing a value', () => {
    const handleChange = jest.fn();

    render(<MultiValueField {...defaultProps} values={['one', 'two']} onChange={handleChange} />);

    const closeButtons = screen.getAllByRole('button');
    fireEvent.click(closeButtons[0]);

    expect(handleChange).toHaveBeenCalledWith(['two']);
  });

  it('shows clear button when values exist and isClearable is true', () => {
    render(<MultiValueField {...defaultProps} values={['one']} />);

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('clears all values when clear button is clicked', () => {
    const handleChange = jest.fn();

    render(<MultiValueField {...defaultProps} values={['one', 'two']} onChange={handleChange} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith([]);
  });

  it('does not show clear button when isClearable is false', () => {
    render(<MultiValueField {...defaultProps} values={['one']} isClearable={false} />);

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('renders hidden input when name is provided', () => {
    render(<MultiValueField {...defaultProps} name="test-name" values={['one', 'two']} />);

    const input = document.querySelector('input[type="hidden"]');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveValue(JSON.stringify(['one', 'two']));
  });

  it('renders icon when provided', () => {
    render(<MultiValueField {...defaultProps} icon="add" />);
    expect(document.querySelector('[data-name="icon"]')).toBeInTheDocument();
  });

  it('calls onIconClick when icon is clicked', () => {
    const handleClick = jest.fn();

    render(<MultiValueField {...defaultProps} icon="add" onIconClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<MultiValueField {...defaultProps} className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});

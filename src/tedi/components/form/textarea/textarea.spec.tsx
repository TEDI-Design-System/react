import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { useBreakpointProps } from '../../../helpers';
import { TextFieldForwardRef } from '../textfield/textfield';
import Textarea, { TextareaProps } from './textarea';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('Textarea component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: TextareaProps = {
    id: 'test-textarea',
    label: 'Test Label',
    placeholder: 'Enter text...',
    name: 'testTextarea',
  };

  it('renders the Textarea with default properties', () => {
    render(<Textarea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'testTextarea');
  });

  it('forwards the ref to a callback ref', () => {
    const ref = jest.fn();
    render(<Textarea {...defaultProps} ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.objectContaining({ input: expect.any(HTMLTextAreaElement) }));
  });

  it('forwards the ref to an object ref', () => {
    const ref = React.createRef<TextFieldForwardRef>();
    render(<Textarea {...defaultProps} ref={ref} />);
    expect(ref.current?.input).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('shows no clear button, even with a value', () => {
    render(<Textarea {...defaultProps} value="Some text" onChange={jest.fn()} />);
    expect(screen.queryByTitle(/clear/i)).not.toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Textarea {...defaultProps} className="custom-class" />);
    const wrapper = screen.getByRole('textbox').closest('div[data-name="textarea"]');
    expect(wrapper).toHaveClass('tedi-textarea', 'custom-class');
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('tedi-textarea__input');
  });

  it('displays error when char count exceeds characterLimit', () => {
    const charLimit = 10;
    const newText = 'This text is too long';
    render(<Textarea {...defaultProps} characterLimit={charLimit} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: newText } });

    const error = screen.getByText(`${newText.length}/${charLimit}`);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('displays character counter as hint when under limit', () => {
    render(<Textarea {...defaultProps} characterLimit={15} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Short text' } });

    const counter = screen.getByText(/10\/15/i);
    expect(counter).toHaveClass('tedi-feedback-text--hint');
  });

  it('displays a character counter when characterLimit is set', () => {
    render(<Textarea {...defaultProps} characterLimit={15} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.getByText(/9\/15/i);
    expect(counter).toBeInTheDocument();
  });

  it('does not display a character counter when characterLimit is not set', () => {
    render(<Textarea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.queryByText(/\d+\/\d+/i);
    expect(counter).not.toBeInTheDocument();
  });

  it('applies minRows when autoGrow is enabled', () => {
    render(<Textarea {...defaultProps} autoGrow minRows={5} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute('rows', '5');
  });

  it('grows height when typing with autoGrow=true', async () => {
    const user = userEvent.setup();

    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = jest.fn().mockImplementation((el) => ({
      ...originalGetComputedStyle(el),
      lineHeight: '20px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }));

    const originalScrollHeightDescriptor = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'scrollHeight'
    );
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return 100 + (this.value.split('\n').length - 1) * 40;
      },
    });

    render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={10} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea).toHaveAttribute('rows', '3');

    await act(async () => {
      await user.type(textarea, 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5');
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(parseFloat(textarea.style.height || '0')).toBeGreaterThan(120);
    window.getComputedStyle = originalGetComputedStyle;

    if (originalScrollHeightDescriptor) {
      Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', originalScrollHeightDescriptor);
    } else {
      Reflect.deleteProperty(HTMLTextAreaElement.prototype, 'scrollHeight');
    }
  });

  it('respects maxRows and enables scroll when exceeded with autoGrow', async () => {
    const user = userEvent.setup();

    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = jest.fn().mockImplementation((el) => ({
      ...originalGetComputedStyle(el),
      lineHeight: '20px',
      paddingTop: '8px',
      paddingBottom: '8px',
    }));

    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return 400;
      },
    });

    render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={5} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;

    await act(async () => {
      await user.type(textarea, 'Line1\nLine2\nLine3\nLine4\nLine5\nLine6\nLine7\nLine8');
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(textarea.style.overflowY).toBe('auto');
    const height = parseFloat(textarea.style.height || '0');
    expect(height).toBeGreaterThan(100);
    expect(height).toBeLessThan(200);

    window.getComputedStyle = originalGetComputedStyle;
  });

  describe('autoGrow height recalculation', () => {
    const LINE_HEIGHT = 20;
    const PADDING = 8;
    const rowsToHeight = (rows: number) => `${rows * LINE_HEIGHT + PADDING * 2}px`;

    let originalGetComputedStyle: typeof window.getComputedStyle;
    let originalScrollHeightDescriptor: PropertyDescriptor | undefined;

    const mockScrollHeight = (getContentHeight: (textarea: HTMLTextAreaElement) => number) => {
      Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
        configurable: true,
        get(this: HTMLTextAreaElement) {
          // Like a real browser, scrollHeight is never smaller than clientHeight (falls back to style height in jsdom)
          const boxHeight = this.clientHeight || parseFloat(this.style.height) || 0;
          return Math.max(getContentHeight(this), boxHeight);
        },
      });
    };

    const flush = () =>
      act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });

    beforeEach(() => {
      originalGetComputedStyle = window.getComputedStyle;
      window.getComputedStyle = jest.fn().mockImplementation((el) => ({
        ...originalGetComputedStyle(el),
        lineHeight: `${LINE_HEIGHT}px`,
        paddingTop: `${PADDING}px`,
        paddingBottom: `${PADDING}px`,
      }));
      originalScrollHeightDescriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'scrollHeight');
    });

    afterEach(() => {
      window.getComputedStyle = originalGetComputedStyle;
      if (originalScrollHeightDescriptor) {
        Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', originalScrollHeightDescriptor);
      } else {
        Reflect.deleteProperty(HTMLTextAreaElement.prototype, 'scrollHeight');
      }
    });

    it('shrinks back when content is removed', async () => {
      const user = userEvent.setup();
      mockScrollHeight((textarea) => textarea.value.split('\n').length * LINE_HEIGHT + PADDING * 2);

      render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={10} />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      await flush();
      expect(textarea.style.height).toBe(rowsToHeight(3));

      await user.type(textarea, '1\n2\n3\n4\n5\n6\n7');
      await flush();
      expect(textarea.style.height).toBe(rowsToHeight(7));

      await user.clear(textarea);
      await flush();
      expect(textarea.style.height).toBe(rowsToHeight(3));
    });

    describe('with border-box sizing', () => {
      const BORDER = 1;

      beforeEach(() => {
        window.getComputedStyle = jest.fn().mockImplementation((el) => ({
          ...originalGetComputedStyle(el),
          lineHeight: `${LINE_HEIGHT}px`,
          paddingTop: `${PADDING}px`,
          paddingBottom: `${PADDING}px`,
          boxSizing: 'border-box',
          borderTopWidth: `${BORDER}px`,
          borderBottomWidth: `${BORDER}px`,
        }));
        mockScrollHeight((textarea) => textarea.value.split('\n').length * LINE_HEIGHT + PADDING * 2);
        Object.defineProperty(HTMLTextAreaElement.prototype, 'clientHeight', {
          configurable: true,
          get(this: HTMLTextAreaElement) {
            const height = parseFloat(this.style.height) || 0;
            const maxHeight = parseFloat(this.style.maxHeight) || Infinity;
            return Math.min(height, maxHeight) - BORDER * 2;
          },
        });
      });

      afterEach(() => {
        Reflect.deleteProperty(HTMLTextAreaElement.prototype, 'clientHeight');
      });

      it('includes the border in the height so content fits without scrolling', async () => {
        render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={5} defaultValue={'1\n2\n3\n4'} />);
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();

        expect(textarea.style.height).toBe(`${4 * LINE_HEIGHT + PADDING * 2 + BORDER * 2}px`);
        expect(textarea.style.overflowY).toBe('hidden');
      });

      it('does not show a scrollbar when content exactly fills maxRows', async () => {
        render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={5} defaultValue={'1\n2\n3\n4\n5'} />);
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();

        expect(textarea.style.overflowY).toBe('hidden');
      });

      it('shows a scrollbar once content exceeds maxRows', async () => {
        render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={5} defaultValue={'1\n2\n3\n4\n5\n6'} />);
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();

        expect(textarea.style.height).toBe(`${5 * LINE_HEIGHT + PADDING * 2 + BORDER * 2}px`);
        expect(textarea.style.overflowY).toBe('auto');
      });

      it('shows a scrollbar when maxHeight clips the content before maxRows', async () => {
        render(
          <Textarea
            {...defaultProps}
            autoGrow
            minRows={3}
            maxRows={12}
            maxHeight="100px"
            defaultValue={'1\n2\n3\n4\n5\n6'}
          />
        );
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();

        expect(textarea.style.overflowY).toBe('auto');
      });
    });

    it('recalculates height when the textarea width changes', async () => {
      let resizeCallback: ResizeObserverCallback = () => undefined;
      const disconnect = jest.fn();
      class MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = disconnect;
      }
      const originalResizeObserver = global.ResizeObserver;
      global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

      // Narrow (e.g. hidden) container makes the placeholder wrap onto many lines
      let isNarrow = true;
      mockScrollHeight(() => (isNarrow ? 1000 : LINE_HEIGHT + PADDING * 2));

      try {
        const { unmount } = render(
          <Textarea {...defaultProps} autoGrow minRows={3} maxRows={12} placeholder="Placeholder text" />
        );
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();
        expect(textarea.style.height).toBe(rowsToHeight(12));

        isNarrow = false;
        act(() => {
          resizeCallback([{ contentRect: { width: 600 } } as ResizeObserverEntry], {} as ResizeObserver);
        });
        expect(textarea.style.height).toBe(rowsToHeight(3));

        unmount();
        expect(disconnect).toHaveBeenCalled();
      } finally {
        global.ResizeObserver = originalResizeObserver;
      }
    });

    it('recalculates height when shown again at the same width after the value changed while hidden', async () => {
      let resizeCallback: ResizeObserverCallback = () => undefined;
      class MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {
          resizeCallback = callback;
        }
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
      }
      const originalResizeObserver = global.ResizeObserver;
      global.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

      // A hidden (display: none) textarea has no layout, so scrollHeight is 0
      let isHidden = false;
      mockScrollHeight((textarea) => (isHidden ? 0 : textarea.value.split('\n').length * LINE_HEIGHT + PADDING * 2));
      const resize = (width: number) =>
        act(() => {
          resizeCallback([{ contentRect: { width } } as ResizeObserverEntry], {} as ResizeObserver);
        });

      try {
        render(<Textarea {...defaultProps} autoGrow minRows={3} maxRows={12} />);
        const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
        await flush();
        resize(600);
        expect(textarea.style.height).toBe(rowsToHeight(3));

        isHidden = true;
        resize(0);
        fireEvent.change(textarea, { target: { value: '1\n2\n3\n4\n5\n6' } });
        await flush();
        expect(textarea.style.height).toBe(rowsToHeight(3));

        isHidden = false;
        resize(600);
        expect(textarea.style.height).toBe(rowsToHeight(6));
      } finally {
        global.ResizeObserver = originalResizeObserver;
      }
    });
  });

  it('applies maxHeight when autoGrow=true', () => {
    render(<Textarea {...defaultProps} autoGrow maxHeight="200px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.maxHeight).toBe('200px');
  });

  // === Fixed height (non-autoGrow) Tests ===
  it('applies fixed height when autoGrow=false (default)', () => {
    render(<Textarea {...defaultProps} height="200px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('200px');
  });

  it('uses default height 7.5rem when not specified and autoGrow=false', () => {
    render(<Textarea {...defaultProps} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('7.5rem');
  });

  it('applies maxHeight when autoGrow=false', () => {
    render(<Textarea {...defaultProps} height="150px" maxHeight="300px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('150px');
    expect(textarea.style.maxHeight).toBe('300px');
  });

  it('disables the textarea when disabled prop is true', () => {
    render(<Textarea {...defaultProps} disabled />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeDisabled();
  });

  it('renders helper text when provided', () => {
    render(<Textarea {...defaultProps} helper={{ type: 'hint', text: 'Helper text', id: 'helper-id' }} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('displays validation error if invalid prop is true', () => {
    render(<Textarea {...defaultProps} invalid helper={{ type: 'error', text: 'Error message' }} />);
    const error = screen.getByText(/error message/i);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('applies defaultValue correctly when component is uncontrolled', async () => {
    const user = userEvent.setup();
    const defaultValue = 'Initial text';
    render(<Textarea {...defaultProps} defaultValue={defaultValue} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(defaultValue);

    await act(async () => {
      await user.type(textarea, ' additional text');
    });
    expect(textarea).toHaveValue('Initial text additional text');
  });

  it('handles controlled behavior correctly with value and onChange', async () => {
    const handleChange = jest.fn();
    const initialValue = 'Initial Value';
    const newValue = 'New Value';

    render(<Textarea {...defaultProps} value={initialValue} onChange={handleChange} placeholder="Enter text" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(initialValue);

    await act(async () => {
      fireEvent.change(textarea, { target: { value: newValue } });
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(newValue);
    expect(textarea).toHaveValue(initialValue);
  });

  it('handles onChangeEvent correctly with controlled value', () => {
    const initialValue = 'Initial value';
    let currentValue = initialValue;

    const handleChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      currentValue = event.target.value;
    };

    const { rerender } = render(<Textarea {...defaultProps} value={currentValue} onChangeEvent={handleChangeEvent} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(initialValue);

    const newValue = 'Changed value';
    fireEvent.change(textarea, { target: { value: newValue } });

    rerender(<Textarea {...defaultProps} value={currentValue} onChangeEvent={handleChangeEvent} />);
    expect(textarea).toHaveValue(newValue);
    expect(currentValue).toBe(newValue);
  });
});

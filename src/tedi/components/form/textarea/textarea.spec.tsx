import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useBreakpointProps } from '../../../helpers';
import { UnknownType } from '../../../types/commonTypes';
import TextArea, { TextAreaProps } from './textarea';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('TextArea component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const defaultProps: TextAreaProps = {
    id: 'test-textarea',
    label: 'Test Label',
    placeholder: 'Enter text...',
    name: 'testTextarea',
  };

  it('renders the TextArea with default properties', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'testTextarea');
  });

  it('applies the correct CSS classes', () => {
    render(<TextArea {...defaultProps} className="custom-class" />);
    const wrapper = screen.getByRole('textbox').closest('div[data-name="textarea"]');
    expect(wrapper).toHaveClass('tedi-textarea', 'custom-class');
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('tedi-textarea__input');
  });

  it('displays error when char count exceeds characterLimit', () => {
    const charLimit = 10;
    const newText = 'This text is too long';
    render(<TextArea {...defaultProps} characterLimit={charLimit} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: newText } });

    const error = screen.getByText(`${newText.length}/${charLimit}`);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('displays character counter as hint when under limit', () => {
    render(<TextArea {...defaultProps} characterLimit={15} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Short text' } });

    const counter = screen.getByText(/10\/15/i);
    expect(counter).toHaveClass('tedi-feedback-text--hint');
  });

  it('displays a character counter when characterLimit is set', () => {
    render(<TextArea {...defaultProps} characterLimit={15} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.getByText(/9\/15/i);
    expect(counter).toBeInTheDocument();
  });

  it('does not display a character counter when characterLimit is not set', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    fireEvent.change(textarea, { target: { value: 'Some text' } });
    const counter = screen.queryByText(/\d+\/\d+/i);
    expect(counter).not.toBeInTheDocument();
  });

  it('applies minRows when autoGrow is enabled', () => {
    render(<TextArea {...defaultProps} autoGrow minRows={5} />);
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

    render(<TextArea {...defaultProps} autoGrow minRows={3} maxRows={10} />);
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
      delete (HTMLTextAreaElement.prototype as UnknownType).scrollHeight;
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

    render(<TextArea {...defaultProps} autoGrow minRows={3} maxRows={5} />);

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

  it('applies maxHeight when autoGrow=true', () => {
    render(<TextArea {...defaultProps} autoGrow maxHeight="200px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.maxHeight).toBe('200px');
  });

  // === Fixed height (non-autoGrow) Tests ===
  it('applies fixed height when autoGrow=false (default)', () => {
    render(<TextArea {...defaultProps} height="200px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('200px');
  });

  it('uses default height 7.5rem when not specified and autoGrow=false', () => {
    render(<TextArea {...defaultProps} />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('7.5rem');
  });

  it('applies maxHeight when autoGrow=false', () => {
    render(<TextArea {...defaultProps} height="150px" maxHeight="300px" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.style.height).toBe('150px');
    expect(textarea.style.maxHeight).toBe('300px');
  });

  it('disables the textarea when disabled prop is true', () => {
    render(<TextArea {...defaultProps} disabled />);
    const textarea = screen.getByPlaceholderText(/enter text/i);
    expect(textarea).toBeDisabled();
  });

  it('renders helper text when provided', () => {
    render(<TextArea {...defaultProps} helper={{ type: 'hint', text: 'Helper text', id: 'helper-id' }} />);
    const helper = screen.getByText(/helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('displays validation error if invalid prop is true', () => {
    render(<TextArea {...defaultProps} invalid helper={{ type: 'error', text: 'Error message' }} />);
    const error = screen.getByText(/error message/i);
    expect(error).toHaveClass('tedi-feedback-text--error');
  });

  it('applies defaultValue correctly when component is uncontrolled', async () => {
    const user = userEvent.setup();
    const defaultValue = 'Initial text';
    render(<TextArea {...defaultProps} defaultValue={defaultValue} />);

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

    render(<TextArea {...defaultProps} value={initialValue} onChange={handleChange} placeholder="Enter text" />);
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

    const { rerender } = render(<TextArea {...defaultProps} value={currentValue} onChangeEvent={handleChangeEvent} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(initialValue);

    const newValue = 'Changed value';
    fireEvent.change(textarea, { target: { value: newValue } });

    rerender(<TextArea {...defaultProps} value={currentValue} onChangeEvent={handleChangeEvent} />);
    expect(textarea).toHaveValue(newValue);
    expect(currentValue).toBe(newValue);
  });
});

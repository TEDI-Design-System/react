import { fireEvent, render, screen } from '@testing-library/react';

import { ChoiceGroupItemType } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import ChoiceGroupItem, { ExtendedChoiceGroupItemProps } from './choice-group-item';

describe('ChoiceGroupItem', () => {
  const defaultProps: ExtendedChoiceGroupItemProps = {
    id: 'test-id',
    label: 'Test Label',
    value: 'test-value',
    type: 'radio',
    variant: 'default',
    color: 'primary',
    showIndicator: false,
  };

  const renderWithContext = (
    props = {},
    contextValue = {
      currentValue: '',
      name: 'test-name',
      onChange: jest.fn(),
      inputType: 'radio' as ChoiceGroupItemType,
    }
  ) => {
    return render(
      <ChoiceGroupContext.Provider value={contextValue}>
        <ChoiceGroupItem {...defaultProps} {...props} />
      </ChoiceGroupContext.Provider>
    );
  };

  it('renders the radio input correctly', () => {
    renderWithContext();
    const radioInput = screen.getByLabelText('Test Label');
    expect(radioInput).toBeInTheDocument();
    expect(radioInput).toHaveAttribute('type', 'radio');
  });

  it('renders the checkbox input correctly when type is checkbox', () => {
    renderWithContext({ type: 'checkbox' });
    const checkboxInput = screen.getByLabelText('Test Label');
    expect(checkboxInput).toBeInTheDocument();
    expect(checkboxInput).toHaveAttribute('type', 'checkbox');
  });

  it('renders the card variant correctly', () => {
    renderWithContext({ variant: 'card' });
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
  });

  it('renders with disabled state correctly', () => {
    renderWithContext({ disabled: true });
    const radioInput = screen.getByLabelText('Test Label');
    expect(radioInput).toBeDisabled();
  });

  it('renders with helper text correctly', () => {
    const helper = { text: 'Helper text', className: 'helper-class' };
    renderWithContext({ helper });
    const helperText = screen.getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });

  it('renders with indicator when showIndicator is true', () => {
    renderWithContext({ showIndicator: true });
    const indicator = screen.getByTestId('choice-group-item-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('renders the card variant with disabled state correctly', () => {
    renderWithContext({ variant: 'card', disabled: true });
    const cardInput = screen.getByLabelText('Test Label');
    expect(cardInput).toBeDisabled();
  });

  it('renders the card variant with helper text correctly', () => {
    const helper = { text: 'Helper text', className: 'helper-class' };
    renderWithContext({ variant: 'card', helper });
    const helperText = screen.getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });

  it('calls onChange handler when label is clicked', () => {
    const onChange = jest.fn();
    renderWithContext({ onChange }, { currentValue: '', name: 'test-name', onChange, inputType: 'radio' });
    const label = screen.getByText('Test Label');
    fireEvent.click(label);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange handler when card is clicked', () => {
    const onChange = jest.fn();
    renderWithContext(
      { variant: 'card', onChange },
      { currentValue: '', name: 'test-name', onChange, inputType: 'radio' }
    );

    const card = screen.getByText('Test Label');
    fireEvent.click(card);
    expect(onChange).toHaveBeenCalled();
  });

  it('programmatically clicks the input when card background is clicked', () => {
    renderWithContext({ variant: 'card' });

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');
    const card = input.closest('.tedi-choice-group-item') as HTMLElement;
    fireEvent.click(card);

    expect(clickSpy).toHaveBeenCalledTimes(1);
    clickSpy.mockRestore();
  });

  it('does NOT programmatically click input when clicking the native input directly', () => {
    const mockInputClick = jest.fn();
    const mockInput = { click: mockInputClick } as unknown as HTMLInputElement;

    jest.spyOn(document, 'getElementById').mockReturnValue(mockInput);
    renderWithContext({ variant: 'card' });
    const input = screen.getByLabelText('Test Label');
    fireEvent.click(input);
    expect(mockInputClick).not.toHaveBeenCalled();
  });

  it('makes the outer wrapper non-tabbable for radio type (arrow-navigated group)', () => {
    const { container } = renderWithContext({ type: 'radio', variant: 'card' });
    const card = container.querySelector('.tedi-choice-group-item') as HTMLElement;
    expect(card).toHaveAttribute('tabIndex', '-1');
    expect(card).not.toHaveAttribute('role');
    expect(card).not.toHaveAttribute('aria-checked');
  });

  it('keeps the outer wrapper tabbable with role=checkbox for checkbox type', () => {
    const { container } = renderWithContext({ type: 'checkbox', variant: 'card' });
    const card = container.querySelector('.tedi-choice-group-item') as HTMLElement;
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('role', 'checkbox');
  });
});

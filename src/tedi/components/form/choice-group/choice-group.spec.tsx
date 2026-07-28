import { fireEvent, render, screen } from '@testing-library/react';

import ChoiceGroup, { ChoiceGroupProps } from './choice-group';
import { ChoiceGroupContext } from './choice-group-context';

import '@testing-library/jest-dom';

const defaultProps: ChoiceGroupProps = {
  id: 'test-choice-group',
  label: 'Test Choice Group',
  name: 'test-choice-group',
  items: [
    { id: 'option-1', value: 'option-1', label: 'Option 1' },
    { id: 'option-2', value: 'option-2', label: 'Option 2' },
    { id: 'option-3', value: 'option-3', label: 'Option 3', disabled: true },
  ],
  inputType: 'checkbox',
  onChange: jest.fn(),
  color: 'secondary',
};

describe('ChoiceGroup Component', () => {
  it('renders correctly with required props', () => {
    render(
      <ChoiceGroupContext.Provider
        value={{
          name: 'test-choice-group',
          inputType: 'checkbox',
          currentValue: [],
          onChange: jest.fn(),
        }}
      >
        <ChoiceGroup {...defaultProps} />
      </ChoiceGroupContext.Provider>
    );

    expect(screen.getByText('Test Choice Group')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeDisabled();
  });

  it('calls onChange when selecting a checkbox', () => {
    const onChangeMock = jest.fn();

    render(
      <ChoiceGroup
        id="test-group"
        name="test"
        label="Choicegroup title"
        inputType="checkbox"
        color="primary"
        items={[
          { id: 'option-1', value: 'option-1', label: 'Option 1' },
          { id: 'option-2', value: 'option-2', label: 'Option 2' },
        ]}
        value={[]}
        onChange={onChangeMock}
      />
    );

    const option1 = screen.getByLabelText('Option 1');

    fireEvent.click(option1);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(['option-1']);
  });

  it('supports radio button selection', () => {
    render(
      <ChoiceGroupContext.Provider
        value={{
          name: 'test-choice-group',
          inputType: 'radio',
          currentValue: 'option-1',
          onChange: jest.fn(),
        }}
      >
        <ChoiceGroup {...defaultProps} inputType="radio" />
      </ChoiceGroupContext.Provider>
    );

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');

    fireEvent.click(option1);
    expect(option1).toBeChecked();

    fireEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });

  it('renders helper text', () => {
    render(
      <ChoiceGroupContext.Provider
        value={{
          name: 'test-choice-group',
          inputType: 'checkbox',
          currentValue: [],
          onChange: jest.fn(),
        }}
      >
        <ChoiceGroup {...defaultProps} helper={{ id: 'helper-text', text: 'This is a helper message' }} />
      </ChoiceGroupContext.Provider>
    );

    expect(screen.getByText('This is a helper message')).toBeInTheDocument();
  });

  it('renders and toggles the indeterminate checkbox', () => {
    const onChangeMock = jest.fn();

    render(
      <ChoiceGroup
        {...defaultProps}
        indeterminateCheck
        inputType="checkbox"
        value={['option-1']}
        onChange={onChangeMock}
      />
    );

    const indeterminateCheckbox = screen.getByLabelText(/table.filter.select-all/i);
    expect(indeterminateCheckbox).toBeInTheDocument();

    fireEvent.click(indeterminateCheckbox);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('returns correct indeterminate label when indeterminateCheck is a string', () => {
    render(<ChoiceGroup {...defaultProps} indeterminateCheck="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('calls indeterminateCheck function correctly', () => {
    const mockIndeterminateCheck = jest.fn((state) => `State: ${state}`);
    render(<ChoiceGroup {...defaultProps} indeterminateCheck={mockIndeterminateCheck} />);

    expect(mockIndeterminateCheck).toHaveBeenCalledWith('none');
    expect(screen.getByText('State: none')).toBeInTheDocument();
  });

  it('returns remove-all label when all items are selected', () => {
    render(<ChoiceGroup {...defaultProps} indeterminateCheck={true} value={['option-1', 'option-2']} />);
    expect(screen.getByText(/table.filter.remove-all/i)).toBeInTheDocument();
  });

  it('returns select-all label when no items are selected', () => {
    render(<ChoiceGroup {...defaultProps} indeterminateCheck={true} value={[]} />);
    expect(screen.getByText(/table.filter.select-all/i)).toBeInTheDocument();
  });

  it('exposes required and invalid state on the radiogroup, not on individual radios', () => {
    render(
      <ChoiceGroup {...defaultProps} inputType="radio" required helper={{ text: 'Please choose one', type: 'error' }} />
    );

    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-required', 'true');
    expect(group).toHaveAttribute('aria-invalid', 'true');

    // The state lives on the group; the individual radios must not carry it.
    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).not.toHaveAttribute('aria-required');
      expect(radio).not.toHaveAttribute('aria-invalid');
    });
  });

  it('does not set aria-required or aria-invalid on the radiogroup by default', () => {
    render(<ChoiceGroup {...defaultProps} inputType="radio" />);

    const group = screen.getByRole('radiogroup');
    expect(group).not.toHaveAttribute('aria-required');
    expect(group).not.toHaveAttribute('aria-invalid');
  });

  it('handles indeterminate checkbox change correctly', () => {
    const onChangeMock = jest.fn();

    render(<ChoiceGroup {...defaultProps} indeterminateCheck={true} onChange={onChangeMock} value={['option-1']} />);

    const indeterminateCheckbox = screen.getByLabelText(/table.filter.select-all/i);
    fireEvent.click(indeterminateCheckbox);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});

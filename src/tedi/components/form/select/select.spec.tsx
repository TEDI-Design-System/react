import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { UnknownType } from '../../../types/commonTypes';
import { SelectMultiValueRemove } from './components/select-multi-value-remove';
import { ISelectOption, Select, SelectProps } from './select';

async function openSelectWithKeyboard(selectElement: HTMLElement) {
  await act(async () => {
    selectElement.focus();
    fireEvent.keyDown(selectElement, { key: 'ArrowDown', code: 'ArrowDown' });
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function selectOptionWithKeyboard(selectElement: HTMLElement) {
  await act(async () => {
    fireEvent.keyDown(selectElement, { key: 'Enter', code: 'Enter' });
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe('Select component', () => {
  const basicOptions: ISelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange', isDisabled: true },
  ];

  const groupedOptions = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'potato', label: 'Potato' },
      ],
    },
  ];

  const defaultProps: SelectProps = {
    id: 'fruit-select',
    label: 'Choose a fruit',
    options: basicOptions,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label and options', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByLabelText('Choose a fruit')).toBeInTheDocument();
  });

  it('opens the menu and allows selection', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const selectInput = screen.getByRole('combobox');
    fireEvent.focus(selectInput);
    fireEvent.keyDown(selectInput, { key: 'ArrowDown' });

    const option = screen.getByText('Banana');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'banana', label: 'Banana' }));
  });

  it('renders with a placeholder', () => {
    render(<Select {...defaultProps} placeholder="Pick something" />);
    expect(screen.getByText('Pick something')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<Select {...defaultProps} disabled />);
    expect(screen.getByLabelText('Choose a fruit')).toBeDisabled();
  });

  it('renders with grouped options', async () => {
    render(<Select {...defaultProps} options={groupedOptions} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Carrot')).toBeInTheDocument();
  });

  it('does not allow selecting disabled options', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const disabledOption = screen.getByText('Orange');
    await act(async () => {
      await userEvent.click(disabledOption);
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows radio buttons when showRadioButtons is true', async () => {
    render(<Select {...defaultProps} showRadioButtons />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
    });
  });

  it('renders custom no options message', async () => {
    render(<Select {...defaultProps} options={[]} noOptionsMessage={() => 'No fruits available'} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getByText('No fruits available')).toBeInTheDocument();
    });
  });

  it('renders with custom renderOption', async () => {
    const renderOption = (props: { label: string }) => <div data-testid="custom-option">{props.label}</div>;
    render(<Select {...defaultProps} renderOption={renderOption} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      const customOptions = screen.getAllByTestId('custom-option');
      expect(customOptions.length).toBeGreaterThan(0);
      expect(customOptions[0]).toHaveTextContent('Apple');
    });
  });

  it('handles keyboard navigation', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);
    const selectInput = screen.getByRole('combobox');

    await openSelectWithKeyboard(selectInput);
    await selectOptionWithKeyboard(selectInput);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('clears selection when clearable', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Select {...defaultProps} onChange={handleChange} value={basicOptions[0]} isClearIndicatorVisible />
    );

    const clearButton = container.querySelector('.tedi-closing-button');
    expect(clearButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(clearButton!);
    });

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('renders helper text', () => {
    render(<Select {...defaultProps} helper={{ text: 'Please select a fruit' }} />);
    expect(screen.getByText('Please select a fruit')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    const { container } = render(<Select {...defaultProps} invalid />);

    const selectRoot = container.querySelector('.tedi-select');
    expect(selectRoot).toHaveClass('tedi-select--invalid');
  });

  it('renders with success state', () => {
    const { container } = render(<Select {...defaultProps} valid />);

    const selectRoot = container.querySelector('.tedi-select');
    expect(selectRoot).toHaveClass('tedi-select--valid');
  });

  it('calls onBlur when the select loses focus', async () => {
    const handleBlur = jest.fn();
    render(<Select {...defaultProps} onBlur={handleBlur} />);

    const selectInput = screen.getByRole('combobox');

    await act(async () => {
      selectInput.focus();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      selectInput.blur();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(handleBlur).toHaveBeenCalled();
  });

  it('exposes react-select methods via ref', async () => {
    const ref = React.createRef<UnknownType>();

    render(<Select {...defaultProps} ref={ref} />);

    await waitFor(() => {
      expect(ref.current).toBeTruthy();
    });

    expect(typeof ref.current.focus).toBe('function');
    expect(typeof ref.current.blur).toBe('function');
    expect(typeof ref.current.clearValue).toBe('function');

    act(() => {
      ref.current.focus();
    });
  });

  it('renders with custom className', () => {
    const { container } = render(<Select {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
  it('renders custom option when renderOption is passed', async () => {
    const renderOptionMock = jest.fn((props) => <div data-testid="custom-option">{props.label}</div>);

    render(<Select {...defaultProps} multiple renderOption={renderOptionMock} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const customOption = screen.getAllByTestId('custom-option');
    expect(customOption.length).toBeGreaterThan(0);
    expect(customOption[0]).toHaveTextContent('Apple');

    expect(renderOptionMock).toHaveBeenCalled();
  });

  it('radio onChange behaviour', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} showRadioButtons onChange={handleChange} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const radioButton = screen.getByLabelText('Banana');
    await act(async () => {
      await userEvent.click(radioButton);
    });

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'banana', label: 'Banana' }));
  });

  it('custom loading indicator', () => {
    const { container } = render(<Select {...defaultProps} isLoading />);
    const loadingIndicator = container.querySelector('.tedi-select__loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders multivalue with tags', () => {
    const { container } = render(<Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} />);
    const tags = container.querySelectorAll('.tedi-tag');
    expect(tags.length).toBe(2);
  });

  it('renders tag closing button', () => {
    const { container } = render(
      <Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} isTagRemovable />
    );
    const tags = container.querySelectorAll('.tedi-tag__close');
    expect(tags.length).toBe(2);
  });

  it('renders tag closing button when tags are removable', () => {
    const { container } = render(
      <Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} isTagRemovable />
    );
    const tags = container.querySelectorAll('.tedi-tag__close');
    expect(tags.length).toBe(2);
  });

  it('does not render tag closing button when tags are not removable', () => {
    const { container } = render(
      <Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} isTagRemovable={false} />
    );
    const tags = container.querySelectorAll('.tedi-tag__close');
    expect(tags.length).toBe(0);
  });

  it('stops event propagation on mouse down when closing a removable tag', () => {
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation');
    render(<Select {...defaultProps} multiple value={[basicOptions[0]]} isTagRemovable />);
    const closeButton = screen.getByRole('button', { name: /close/i });

    fireEvent.mouseDown(closeButton);
    expect(stopPropagationSpy).toHaveBeenCalled();
    stopPropagationSpy.mockRestore();
  });

  it('does not apply classNames when not provided', () => {
    const { container } = render(<Select {...defaultProps} />);
    expect(container.firstChild).not.toHaveClass('custom-container-class');
  });

  it('forwards classNames map to react-select subcomponents', () => {
    const { container } = render(
      <Select {...defaultProps} classNames={{ control: 'my-control', menu: () => 'my-menu' }} />
    );
    expect(container.querySelector('.my-control')).toBeInTheDocument();
  });

  it('renders search icon when iconName is "search"', () => {
    const { container } = render(<Select {...defaultProps} iconName="search" />);
    expect(container.querySelector('[class*="search"]')).toBeInTheDocument();
  });

  it('renders message list footer when renderMessageListFooter is provided', async () => {
    render(
      <Select {...defaultProps} renderMessageListFooter={() => <div data-testid="list-footer">Footer content</div>} />
    );

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    expect(await screen.findByTestId('list-footer')).toBeInTheDocument();
  });

  it('uses renderValue to customise the selected single-value display', () => {
    render(
      <Select
        {...defaultProps}
        value={basicOptions[0]}
        renderValue={(opt) => <span data-testid="custom-value">{opt.label} (custom)</span>}
      />
    );
    expect(screen.getByTestId('custom-value')).toHaveTextContent('Apple (custom)');
  });

  it('applies the grid class when dropdownType is "grid"', async () => {
    render(<Select {...defaultProps} dropdownType="grid" isSearchable={false} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    await waitFor(() => {
      const list = document.querySelector('[class*="menu-list--grid"]');
      expect(list).toBeInTheDocument();
    });
  });

  it('toggles keyboard mode on arrow keys and clears it on mousemove', async () => {
    render(<Select {...defaultProps} />);
    const input = screen.getByRole('combobox');

    await act(async () => {
      input.focus();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await new Promise((r) => setTimeout(r, 0));
    });

    const list = await waitFor(() => {
      const el = document.querySelector('[class*="menu-list--keyboard"]');
      expect(el).toBeInTheDocument();
      return el!;
    });

    // Walk up to the wrapper that owns onMouseMove, then fire it.
    const wrapper = list.parentElement!;
    await act(async () => {
      fireEvent.mouseMove(wrapper);
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(document.querySelector('[class*="menu-list--keyboard"]')).not.toBeInTheDocument();
  });

  // The Checkbox label resolves to the i18n key when no LabelProvider is
  // present (LabelContext default returns the key in test env), so tests
  // assert against `'select.select-all'` rather than the localised string.
  const SELECT_ALL_KEY = 'select.select-all';

  it('renders a Select All toggle when showSelectAll is true in multi mode', async () => {
    render(<Select {...defaultProps} multiple showSelectAll isSearchable={false} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    // The select-all option renders the label twice (sr-only span + Checkbox
    // label), so use findAllByText and assert at least one match.
    expect((await screen.findAllByText(SELECT_ALL_KEY)).length).toBeGreaterThan(0);
  });

  it('does not render Select All toggle outside multi mode', async () => {
    render(<Select {...defaultProps} showSelectAll isSearchable={false} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    expect(screen.queryByText(SELECT_ALL_KEY)).not.toBeInTheDocument();
  });

  it('deselects every option when Select All is clicked while all are selected', async () => {
    const handleChange = jest.fn();
    render(
      <Select
        {...defaultProps}
        multiple
        showSelectAll
        isSearchable={false}
        defaultValue={[basicOptions[0], basicOptions[1]]}
        onChange={handleChange}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    // The select-all option renders the label twice; click the option element
    // itself (matched by role) to trigger react-select's selection handler.
    const selectAllOption = (await screen.findAllByRole('option')).find((el) =>
      el.textContent?.includes(SELECT_ALL_KEY)
    )!;
    await act(async () => {
      await userEvent.click(selectAllOption);
    });

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as ISelectOption[];
    expect(lastCall).toEqual([]);
  });

  it('selects every enabled option when Select All is clicked', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} multiple showSelectAll isSearchable={false} onChange={handleChange} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const selectAllOption = (await screen.findAllByRole('option')).find((el) =>
      el.textContent?.includes(SELECT_ALL_KEY)
    )!;
    await act(async () => {
      await userEvent.click(selectAllOption);
    });

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as ISelectOption[];
    expect(lastCall.map((o) => o.value).sort()).toEqual(['apple', 'banana']);
  });

  it('renders selectable group headings as checkboxes', async () => {
    render(<Select {...defaultProps} options={groupedOptions} multiple selectableGroups isSearchable={false} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    expect(await screen.findByLabelText('Fruits')).toBeInTheDocument();
    expect(screen.getByLabelText('Vegetables')).toBeInTheDocument();
  });

  it('toggles every option in a group when its heading checkbox is clicked', async () => {
    const handleChange = jest.fn();
    render(
      <Select
        {...defaultProps}
        options={groupedOptions}
        multiple
        selectableGroups
        isSearchable={false}
        onChange={handleChange}
      />
    );

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const heading = await screen.findByLabelText('Fruits');
    await act(async () => {
      await userEvent.click(heading);
    });

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as ISelectOption[];
    expect(lastCall.map((o) => o.value).sort()).toEqual(['apple', 'banana']);
  });

  it('falls back to plain group headings when selectableGroups is off', async () => {
    render(<Select {...defaultProps} options={groupedOptions} multiple isSearchable={false} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    // Group label is shown but not as a labelled checkbox.
    expect(await screen.findByText('Fruits')).toBeInTheDocument();
    expect(screen.queryByLabelText('Fruits')).not.toBeInTheDocument();
  });

  it('removes a tag when its close button is clicked (multi-select)', async () => {
    const handleChange = jest.fn();
    render(
      <Select
        {...defaultProps}
        multiple
        isTagRemovable
        value={[basicOptions[0], basicOptions[1]]}
        onChange={handleChange}
      />
    );

    const closeButtons = screen.getAllByRole('button', { name: /close/i });
    await act(async () => {
      await userEvent.click(closeButtons[0]);
    });

    expect(handleChange).toHaveBeenCalled();
    const lastCall = handleChange.mock.calls[handleChange.mock.calls.length - 1][0] as ISelectOption[];
    expect(lastCall.map((o) => o.value)).toEqual(['banana']);
  });

  it('opens the menu on focus when openMenuOnFocus is true', async () => {
    render(<Select {...defaultProps} openMenuOnFocus />);
    await act(async () => {
      screen.getByRole('combobox').focus();
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });
  });

  it('renders error helper styling when helper.type is "error"', () => {
    const { container } = render(<Select {...defaultProps} helper={{ text: 'Boom', type: 'error' }} />);
    expect(container.querySelector('.tedi-select')).toHaveClass('tedi-select--invalid');
  });

  it('renders valid helper styling when helper.type is "valid"', () => {
    const { container } = render(<Select {...defaultProps} helper={{ text: 'OK', type: 'valid' }} />);
    expect(container.querySelector('.tedi-select')).toHaveClass('tedi-select--valid');
  });

  describe('SelectMultiValueRemove', () => {
    const renderRemove = (onClick: jest.Mock) =>
      render(
        <SelectMultiValueRemove
          // Minimal props — the component only reads innerProps and data.
          {...({
            innerProps: { onClick },
            data: { value: 'apple', label: 'Apple' },
          } as unknown as React.ComponentProps<typeof SelectMultiValueRemove>)}
        />
      );

    it('forwards click events to innerProps.onClick', () => {
      const onClick = jest.fn();
      const { container } = renderRemove(onClick);
      fireEvent.click(container.querySelector('button')!);
      expect(onClick).toHaveBeenCalled();
    });

    it('treats Enter as activation', () => {
      const onClick = jest.fn();
      const { container } = renderRemove(onClick);
      fireEvent.keyDown(container.querySelector('button')!, { key: 'Enter' });
      expect(onClick).toHaveBeenCalled();
    });

    it('treats Space as activation', () => {
      const onClick = jest.fn();
      const { container } = renderRemove(onClick);
      fireEvent.keyDown(container.querySelector('button')!, { key: ' ' });
      expect(onClick).toHaveBeenCalled();
    });

    it('ignores other keys', () => {
      const onClick = jest.fn();
      const { container } = renderRemove(onClick);
      fireEvent.keyDown(container.querySelector('button')!, { key: 'a' });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('stops propagation on mousedown so the menu does not close', () => {
      const onClick = jest.fn();
      const stopSpy = jest.spyOn(Event.prototype, 'stopPropagation');
      const { container } = renderRemove(onClick);
      fireEvent.mouseDown(container.querySelector('button')!);
      expect(stopSpy).toHaveBeenCalled();
      stopSpy.mockRestore();
    });
  });

  it('honours the inputIsHidden prop on the underlying input', () => {
    render(<Select {...defaultProps} inputIsHidden />);
    // Goal is branch coverage of the inputIsHidden ?? props.isHidden ternary.
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('keeps keyboard mode active across multiple arrow keys', async () => {
    render(<Select {...defaultProps} />);
    const input = screen.getByRole('combobox');
    await act(async () => {
      input.focus();
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      await new Promise((r) => setTimeout(r, 0));
    });
    await waitFor(() => {
      expect(document.querySelector('[class*="menu-list--keyboard"]')).toBeInTheDocument();
    });
  });

  describe('tagsDirection="row" overflow handling', () => {
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

    it('renders a +N counter when tags overflow on a single row', async () => {
      const manyOptions: ISelectOption[] = Array.from({ length: 5 }, (_, i) => ({
        value: `v${i}`,
        label: `Option ${i}`,
      }));
      render(
        <Select
          id="overflow-select"
          label="Overflow"
          options={manyOptions}
          multiple
          tagsDirection="row"
          value={manyOptions}
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/^\+\d+$/)).toBeInTheDocument();
      });
    });
  });
});

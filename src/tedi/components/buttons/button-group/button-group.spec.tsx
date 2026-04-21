import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useBreakpoint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import Button from '../button/button';
import { ButtonGroup } from './button-group';

jest.mock('../../../helpers', () => {
  const original = jest.requireActual('../../../helpers');
  return {
    ...original,
    useBreakpoint: jest.fn(),
    isBreakpointBelow: (bp: string, threshold: string) => bp === 'sm' && threshold === 'md',
  };
});

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

describe('ButtonGroup Component', () => {
  beforeEach(() => {
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (useLabels as jest.Mock).mockReturnValue({ getLabel: (key: string) => 'sidenav.submenu' });
  });

  it('renders child buttons correctly', () => {
    render(
      <ButtonGroup>
        <Button id="button1">Button 1</Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Button 1');
    expect(buttons[1]).toHaveTextContent('Button 2');
  });

  it('renders dropdown trigger with dropdownLabel on mobile', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    render(
      <ButtonGroup dropdownLabel="Custom Dropdown" enableMobileDropdown>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /Custom Dropdown/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it('falls back to useLabels value if dropdownLabel is not provided on mobile', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    render(
      <ButtonGroup enableMobileDropdown>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /sidenav.submenu/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it('triggers onSelectionChange when a dropdown item is clicked', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    const onSelectionChange = jest.fn();

    render(
      <ButtonGroup onSelectionChange={onSelectionChange} dropdownLabel="Menu" enableMobileDropdown>
        <Button id="button1">Button 1</Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );

    // Open the dropdown
    const triggerButton = screen.getByRole('button', { name: /Menu/i });
    fireEvent.click(triggerButton);

    // Query the dropdown item after opening
    const dropdownItem = screen.getByText('Button 1');
    fireEvent.click(dropdownItem);

    expect(onSelectionChange).toHaveBeenCalledWith('button1');
  });

  it('does not trigger onSelectionChange for a disabled dropdown item', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');
    const onSelectionChange = jest.fn();

    render(
      <ButtonGroup onSelectionChange={onSelectionChange} dropdownLabel="Menu" enableMobileDropdown>
        <Button id="button1" disabled>
          Button 1
        </Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /Menu/i });
    fireEvent.click(triggerButton);
    const dropdownItem = screen.getByText('Button 1');
    fireEvent.click(dropdownItem);
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('applies the stretch class when the stretch prop is true', () => {
    const { container } = render(
      <ButtonGroup stretch>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('tedi-button-group--stretch');
  });

  it('does not apply the stretch class when the stretch prop is false', () => {
    const { container } = render(
      <ButtonGroup stretch={false}>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).not.toHaveClass('tedi-button-group--stretch');
  });

  it('triggers onSelectionChange when a button is clicked', () => {
    const onSelectionChange = jest.fn();
    render(
      <ButtonGroup onSelectionChange={onSelectionChange}>
        <Button id="button1">Button 1</Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const button1 = screen.getByText('Button 1');
    fireEvent.click(button1);
    expect(onSelectionChange).toHaveBeenCalledWith('button1');
  });

  it('does not trigger onSelectionChange for a disabled button', () => {
    const onSelectionChange = jest.fn();
    render(
      <ButtonGroup onSelectionChange={onSelectionChange}>
        <Button id="button1" disabled>
          Button 1
        </Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const button1 = screen.getByText('Button 1');
    fireEvent.click(button1);
    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <ButtonGroup className="custom-class">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with the correct type class based on the type prop', () => {
    const { container } = render(
      <ButtonGroup type="secondary">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    expect(container.firstChild).toHaveClass('tedi-button-group--secondary');
  });

  it('renders with the correct aria-label when provided', () => {
    render(
      <ButtonGroup ariaLabel="Test Button Group">
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', 'Test Button Group');
  });

  it('renders active class on a button when isActive is true', () => {
    const { container } = render(
      <ButtonGroup>
        <Button id="button1" isActive>
          Button 1
        </Button>
        <Button id="button2">Button 2</Button>
      </ButtonGroup>
    );
    const activeButton = container.querySelector('.tedi-button-group__item--active');
    expect(activeButton).toBeInTheDocument();
    expect(activeButton).toHaveTextContent('Button 1');
  });

  it('updates state correctly when a button is clicked', () => {
    const TestComponent = () => {
      const [selected, setSelected] = React.useState<string | null>(null);

      return (
        <ButtonGroup onSelectionChange={setSelected}>
          <Button id="button1" data-testid="button1" isActive={selected === 'button1'}>
            Button 1
          </Button>
          <Button id="button2" data-testid="button2" isActive={selected === 'button2'}>
            Button 2
          </Button>
        </ButtonGroup>
      );
    };

    render(<TestComponent />);

    const button1 = screen.getByTestId('button1');
    const button2 = screen.getByTestId('button2');

    fireEvent.click(button1);
    expect(button1).toHaveClass('tedi-button-group__item--active');
    expect(button2).not.toHaveClass('tedi-button-group__item--active');

    fireEvent.click(button2);
    expect(button2).toHaveClass('tedi-button-group__item--active');
    expect(button1).not.toHaveClass('tedi-button-group__item--active');
  });

  it('uses dropdownLabel when dropdownLabelMode is static even if a button is active', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');

    render(
      <ButtonGroup dropdownLabel="Static Label" enableMobileDropdown>
        <Button id="button1" isActive>
          Active Button
        </Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /Static Label/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it('uses active button label when dropdownLabelMode is active', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');

    render(
      <ButtonGroup dropdownLabel="Static Label" dropdownLabelMode="active" enableMobileDropdown>
        <Button id="button1" isActive>
          Active Button
        </Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /Active Button/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it('falls back to dropdownLabel in active mode when no button is active', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');

    render(
      <ButtonGroup dropdownLabel="Fallback Label" dropdownLabelMode="active" enableMobileDropdown>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /Fallback Label/i });
    expect(triggerButton).toBeInTheDocument();
  });

  it('falls back to useLabels value in active mode when no active button and no dropdownLabel', () => {
    (useBreakpoint as jest.Mock).mockReturnValue('sm');

    render(
      <ButtonGroup dropdownLabelMode="active" enableMobileDropdown>
        <Button id="button1">Button 1</Button>
      </ButtonGroup>
    );

    const triggerButton = screen.getByRole('button', { name: /sidenav.submenu/i });
    expect(triggerButton).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderRole } from './header-role';
import HeaderRoleRepresentatives, { Representative } from './header-role-representatives';

import '@testing-library/jest-dom';

jest.mock('../../../../../helpers', () => ({
  ...jest.requireActual('../../../../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
}));

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

const mockRepresentatives: Representative[] = [
  { name: 'John Doe', description: 'Personal representative' },
  { name: 'Jane Smith', description: 'Organization representative' },
  { name: 'Bob Wilson', description: 'Another representative' },
];

const singleRepresentative: Representative[] = [{ name: 'John Doe', description: 'Personal representative' }];

describe('HeaderRole component', () => {
  const mockGetLabel = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
    (useLabels as jest.Mock).mockReturnValue({ getLabel: mockGetLabel });
  });

  describe('Desktop view', () => {
    it('renders the first representative name', () => {
      render(<HeaderRole representatives={mockRepresentatives} />);

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<HeaderRole representatives={mockRepresentatives} label={<span>Acting as</span>} />);

      expect(screen.getByText('Acting as')).toBeInTheDocument();
    });

    it('shows description when showDescription is true', () => {
      const { container } = render(<HeaderRole representatives={singleRepresentative} showDescription />);

      const labelArea = container.querySelector('[class*="header-role__label"]');
      expect(labelArea?.textContent).toContain('Personal representative');
    });

    it('hides description when showDescription is false', () => {
      const { container } = render(<HeaderRole representatives={singleRepresentative} showDescription={false} />);

      const labelArea = container.querySelector('[class*="header-role__label"]');
      expect(labelArea?.textContent).not.toContain('Personal representative');
    });

    it('shows expand icon when multiple representatives exist', () => {
      const { container } = render(<HeaderRole representatives={mockRepresentatives} />);

      expect(container.querySelector('[class*="header-role__icon"]')).toBeInTheDocument();
    });

    it('does not show expand icon for single representative', () => {
      const { container } = render(<HeaderRole representatives={singleRepresentative} />);

      expect(container.querySelector('[class*="header-role__icon"]')).not.toBeInTheDocument();
    });

    it('opens popover when clicking representative name with multiple reps', () => {
      render(<HeaderRole representatives={mockRepresentatives} />);

      const trigger = screen.getByText('John Doe').closest('button');
      if (trigger) fireEvent.click(trigger);

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('calls onRepresentativeChange when a representative is selected', () => {
      const onRepresentativeChange = jest.fn();
      render(<HeaderRole representatives={mockRepresentatives} onRepresentativeChange={onRepresentativeChange} />);

      const trigger = screen.getByText('John Doe').closest('button');
      if (trigger) fireEvent.click(trigger);

      const janeButton = screen.getByText('Jane Smith').closest('button');
      if (janeButton) fireEvent.click(janeButton);

      expect(onRepresentativeChange).toHaveBeenCalledWith(mockRepresentatives[1]);
    });

    it('calls onRoleSelectionToggle when popover is toggled', () => {
      const onRoleSelectionToggle = jest.fn();
      render(<HeaderRole representatives={mockRepresentatives} onRoleSelectionToggle={onRoleSelectionToggle} />);

      const trigger = screen.getByText('John Doe').closest('button');
      if (trigger) fireEvent.click(trigger);

      expect(onRoleSelectionToggle).toHaveBeenCalledWith(true);
    });
  });

  describe('Tablet/Mobile view (accordion)', () => {
    beforeEach(() => {
      (isBreakpointBelow as jest.Mock).mockReturnValue(true);
    });

    it('renders the representative name', () => {
      render(<HeaderRole representatives={mockRepresentatives} />);

      expect(screen.getAllByText('John Doe').length).toBeGreaterThanOrEqual(1);
    });

    it('renders accordion toggle for multiple representatives', () => {
      render(<HeaderRole representatives={mockRepresentatives} />);

      expect(mockGetLabel).toHaveBeenCalledWith('header.role-selection');
    });

    it('does not render accordion toggle for single representative', () => {
      render(<HeaderRole representatives={singleRepresentative} />);

      expect(screen.queryByText('header.role-selection')).not.toBeInTheDocument();
    });

    it('uses custom accordion labels', () => {
      render(
        <HeaderRole
          representatives={mockRepresentatives}
          accordionLabels={{ open: 'Switch role', close: 'Close selector' }}
        />
      );

      expect(screen.getByText('Switch role')).toBeInTheDocument();
    });

    it('shows description with separator for single representative', () => {
      const { container } = render(<HeaderRole representatives={singleRepresentative} showDescription />);

      expect(container.textContent).toContain('Personal representative');
    });
  });

  describe('Search functionality', () => {
    beforeEach(() => {
      (isBreakpointBelow as jest.Mock).mockReturnValue(true);
    });

    it('forwards searchLabel to representatives', () => {
      render(<HeaderRole representatives={mockRepresentatives} searchLabel="Find person" />);

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      expect(screen.getByLabelText('Find person')).toBeInTheDocument();
    });

    it('forwards organizationSearchLabel when isOrganization', () => {
      render(
        <HeaderRole representatives={mockRepresentatives} isOrganization organizationSearchLabel="Find organization" />
      );

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      expect(screen.getByLabelText('Find organization')).toBeInTheDocument();
    });

    it('filters representatives by name when search input changes', () => {
      render(<HeaderRole representatives={mockRepresentatives} searchLabel="Search" />);

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      const searchInput = screen.getByLabelText('Search');
      fireEvent.change(searchInput, { target: { value: 'Jane' } });

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Wilson')).not.toBeInTheDocument();
    });

    it('filters representatives by description', () => {
      render(<HeaderRole representatives={mockRepresentatives} searchLabel="Search" />);

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      const searchInput = screen.getByLabelText('Search');
      fireEvent.change(searchInput, { target: { value: 'Organization' } });

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Wilson')).not.toBeInTheDocument();
    });

    it('shows all representatives when search input is empty', () => {
      render(<HeaderRole representatives={mockRepresentatives} searchLabel="Search" />);

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      expect(screen.getAllByText('John Doe').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    });
  });

  describe('Representative selection closing behavior', () => {
    it('closes role selection via setIsRoleSelectionOpen when selecting in desktop popover without onRoleSelectionToggle', () => {
      render(<HeaderRole representatives={mockRepresentatives} />);

      const trigger = screen.getByText('John Doe').closest('button');
      if (trigger) fireEvent.click(trigger);

      const janeButton = screen.getByText('Jane Smith').closest('button');
      if (janeButton) fireEvent.click(janeButton);

      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('keeps selection open with keepOpenOnSelect in tablet view', () => {
      (isBreakpointBelow as jest.Mock).mockReturnValue(true);

      render(<HeaderRole representatives={mockRepresentatives} />);

      const toggle = screen.getByText('header.role-selection');
      fireEvent.click(toggle);

      const janeButton = screen.getByText('Jane Smith').closest('button');
      if (janeButton) fireEvent.click(janeButton);

      expect(screen.getByText('header.role-selection.close')).toBeInTheDocument();
    });

    it('shows close label after accordion is toggled open', () => {
      (isBreakpointBelow as jest.Mock).mockReturnValue(true);

      render(
        <HeaderRole
          representatives={mockRepresentatives}
          accordionLabels={{ open: 'Switch role', close: 'Close selector' }}
        />
      );

      fireEvent.click(screen.getByText('Switch role'));

      expect(screen.getByText('Close selector')).toBeInTheDocument();
    });
  });
});

describe('HeaderRoleRepresentatives component', () => {
  const mockGetLabel = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useLabels as jest.Mock).mockReturnValue({ getLabel: mockGetLabel });
  });

  it('calls setIsRoleSelectionOpen(false) when onRoleSelectionToggle is not provided', () => {
    const mockSetRepresentative = jest.fn();
    const mockSetInputValue = jest.fn();
    const mockSetIsRoleSelectionOpen = jest.fn();

    render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={mockSetInputValue}
        setRepresentative={mockSetRepresentative}
        setIsRoleSelectionOpen={mockSetIsRoleSelectionOpen}
        isRoleSelectionOpen={false}
        searchLabel="Search"
      />
    );

    const janeButton = screen.getByText('Jane Smith').closest('button');
    fireEvent.click(janeButton!);

    expect(mockSetRepresentative).toHaveBeenCalledWith(mockRepresentatives[1]);
    expect(mockSetInputValue).toHaveBeenCalledWith('');
    expect(mockSetIsRoleSelectionOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsRoleSelectionOpen(false) when isRoleSelectionOpen is false even if onRoleSelectionToggle exists', () => {
    const mockSetRepresentative = jest.fn();
    const mockSetInputValue = jest.fn();
    const mockSetIsRoleSelectionOpen = jest.fn();
    const mockOnRoleSelectionToggle = jest.fn();

    render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={mockSetInputValue}
        setRepresentative={mockSetRepresentative}
        setIsRoleSelectionOpen={mockSetIsRoleSelectionOpen}
        onRoleSelectionToggle={mockOnRoleSelectionToggle}
        isRoleSelectionOpen={false}
        searchLabel="Search"
      />
    );

    const janeButton = screen.getByText('Jane Smith').closest('button');
    fireEvent.click(janeButton!);

    expect(mockSetIsRoleSelectionOpen).toHaveBeenCalledWith(false);
    expect(mockOnRoleSelectionToggle).not.toHaveBeenCalled();
  });

  it('calls onRoleSelectionToggle when isRoleSelectionOpen is true and callback exists', () => {
    const mockSetRepresentative = jest.fn();
    const mockSetInputValue = jest.fn();
    const mockSetIsRoleSelectionOpen = jest.fn();
    const mockOnRoleSelectionToggle = jest.fn();

    render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={mockSetInputValue}
        setRepresentative={mockSetRepresentative}
        setIsRoleSelectionOpen={mockSetIsRoleSelectionOpen}
        onRoleSelectionToggle={mockOnRoleSelectionToggle}
        isRoleSelectionOpen={true}
        searchLabel="Search"
      />
    );

    const janeButton = screen.getByText('Jane Smith').closest('button');
    fireEvent.click(janeButton!);

    expect(mockOnRoleSelectionToggle).toHaveBeenCalled();
    expect(mockSetIsRoleSelectionOpen).not.toHaveBeenCalled();
  });

  it('sets inert on the collapse container when closed', () => {
    const { container } = render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={jest.fn()}
        setRepresentative={jest.fn()}
        setIsRoleSelectionOpen={jest.fn()}
        isRoleSelectionOpen={false}
        searchLabel="Search"
      />
    );

    const collapse = container.querySelector('[class*="header-role__collapse"]');
    expect(collapse).toHaveAttribute('inert');
  });

  it('does not set inert on the collapse container when open', () => {
    const { container } = render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={jest.fn()}
        setRepresentative={jest.fn()}
        setIsRoleSelectionOpen={jest.fn()}
        isRoleSelectionOpen={true}
        searchLabel="Search"
      />
    );

    const collapse = container.querySelector('[class*="header-role__collapse"]');
    expect(collapse).not.toHaveAttribute('inert');
  });

  it('does not close when keepOpenOnSelect is true', () => {
    const mockSetRepresentative = jest.fn();
    const mockSetInputValue = jest.fn();
    const mockSetIsRoleSelectionOpen = jest.fn();
    const mockOnRoleSelectionToggle = jest.fn();

    render(
      <HeaderRoleRepresentatives
        representatives={mockRepresentatives}
        representative={mockRepresentatives[0]}
        inputValue=""
        setInputValue={mockSetInputValue}
        setRepresentative={mockSetRepresentative}
        setIsRoleSelectionOpen={mockSetIsRoleSelectionOpen}
        onRoleSelectionToggle={mockOnRoleSelectionToggle}
        isRoleSelectionOpen={true}
        searchLabel="Search"
        keepOpenOnSelect
      />
    );

    const janeButton = screen.getByText('Jane Smith').closest('button');
    fireEvent.click(janeButton!);

    expect(mockSetRepresentative).toHaveBeenCalledWith(mockRepresentatives[1]);
    expect(mockSetInputValue).toHaveBeenCalledWith('');
    expect(mockOnRoleSelectionToggle).not.toHaveBeenCalled();
    expect(mockSetIsRoleSelectionOpen).not.toHaveBeenCalled();
  });
});

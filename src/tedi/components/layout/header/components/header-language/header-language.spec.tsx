import { fireEvent, render, screen } from '@testing-library/react';

import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { HeaderLanguage, Language } from './header-language';

import '@testing-library/jest-dom';

jest.mock('../../../../../helpers', () => ({
  ...jest.requireActual('../../../../../helpers'),
  useBreakpoint: jest.fn(),
  isBreakpointBelow: jest.fn(),
  useBreakpointProps: jest.fn(),
}));

jest.mock('../../../../../providers/label-provider', () => ({
  useLabels: jest.fn(),
}));

const mockLanguages: Language[] = [
  { label: 'EST', locale: 'et' as never, isSelected: true, 'aria-label': 'Estonian' },
  { label: 'ENG', locale: 'en' as never, isSelected: false, 'aria-label': 'English' },
  { label: 'RUS', locale: 'ru' as never, isSelected: false, 'aria-label': 'Russian' },
];

describe('HeaderLanguage component', () => {
  const mockSetLocale = jest.fn();
  const mockGetLabel = jest.fn((key: string) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoint as jest.Mock).mockReturnValue('lg');
    (isBreakpointBelow as jest.Mock).mockReturnValue(false);
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props: Record<string, unknown>) => props),
    });
    (useLabels as jest.Mock).mockReturnValue({
      getLabel: mockGetLabel,
      setLocale: mockSetLocale,
      locale: 'et',
    });
  });

  it('renders the current language label', () => {
    render(<HeaderLanguage languages={mockLanguages} />);

    expect(screen.getByText('EST')).toBeInTheDocument();
  });

  it('renders the select label text', () => {
    render(<HeaderLanguage languages={mockLanguages} selectLabel="Choose language" />);

    expect(screen.getByText('Choose language')).toBeInTheDocument();
  });

  it('falls back to i18n label when selectLabel is not provided', () => {
    render(<HeaderLanguage languages={mockLanguages} />);

    expect(mockGetLabel).toHaveBeenCalledWith('header.select-lang');
  });

  it('opens language dropdown on trigger click', () => {
    render(<HeaderLanguage languages={mockLanguages} />);

    const trigger = screen.getByRole('button', { expanded: false });
    fireEvent.click(trigger);

    expect(screen.getByText('ENG')).toBeInTheDocument();
    expect(screen.getByText('RUS')).toBeInTheDocument();
  });

  it('changes displayed language on selection', () => {
    render(<HeaderLanguage languages={mockLanguages} />);

    const trigger = screen.getByRole('button', { expanded: false });
    fireEvent.click(trigger);

    const engOption = screen.getAllByText('ENG');
    fireEvent.click(engOption[engOption.length - 1]);

    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });

  it('uses currentLanguage prop as initial label', () => {
    (useLabels as jest.Mock).mockReturnValue({
      getLabel: mockGetLabel,
      setLocale: mockSetLocale,
      locale: undefined,
    });

    render(<HeaderLanguage languages={mockLanguages} currentLanguage="ENG" />);

    expect(screen.getByText('ENG')).toBeInTheDocument();
  });

  it('falls back to first language when no locale or currentLanguage is set', () => {
    (useLabels as jest.Mock).mockReturnValue({
      getLabel: mockGetLabel,
      setLocale: mockSetLocale,
      locale: undefined,
    });

    render(<HeaderLanguage languages={mockLanguages} />);

    expect(screen.getByText('EST')).toBeInTheDocument();
  });

  it('calls custom onClick handler when provided', () => {
    const mockOnClick = jest.fn();
    const languagesWithClick: Language[] = [
      { label: 'EST', isSelected: true },
      { label: 'ENG', onClick: mockOnClick },
    ];

    render(<HeaderLanguage languages={languagesWithClick} />);

    const trigger = screen.getByRole('button', { expanded: false });
    fireEvent.click(trigger);

    const engOption = screen.getAllByText('ENG');
    fireEvent.click(engOption[engOption.length - 1]);

    expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({ onToggle: expect.any(Function) }));
    expect(mockSetLocale).not.toHaveBeenCalled();
  });

  it('applies the left label modifier when labelPosition is "left"', () => {
    const { container } = render(<HeaderLanguage languages={mockLanguages} labelPosition="left" />);

    expect(container.querySelector('[class*="tedi-header-language--label-left"]')).toBeInTheDocument();
  });

  it('renders a language option as an anchor with href instead of calling setLocale', () => {
    const languagesWithHref: Language[] = [
      { label: 'EST', locale: 'et' as never, isSelected: true, 'aria-label': 'Estonian' },
      { label: 'ENG', href: '/en', 'aria-label': 'English' },
    ];

    render(<HeaderLanguage languages={languagesWithHref} />);

    fireEvent.click(screen.getByRole('button', { expanded: false }));

    const link = screen.getByRole('link', { name: 'English' });
    expect(link).toHaveAttribute('href', '/en');

    fireEvent.click(link);
    expect(mockSetLocale).not.toHaveBeenCalled();
  });

  it('prefers a custom onClick over href when both are provided', () => {
    const mockOnClick = jest.fn();
    const languagesWithBoth: Language[] = [
      { label: 'EST', locale: 'et' as never, isSelected: true, 'aria-label': 'Estonian' },
      { label: 'ENG', href: '/en', onClick: mockOnClick, 'aria-label': 'English' },
    ];

    render(<HeaderLanguage languages={languagesWithBoth} />);

    fireEvent.click(screen.getByRole('button', { expanded: false }));

    const option = screen.getByRole('button', { name: 'English' });
    fireEvent.click(option);

    expect(mockOnClick).toHaveBeenCalledWith(expect.objectContaining({ onToggle: expect.any(Function) }));
    expect(mockSetLocale).not.toHaveBeenCalled();
  });

  it('renders expand icon', () => {
    const { container } = render(<HeaderLanguage languages={mockLanguages} />);

    expect(container.querySelector('[class*="header-language__icon"]')).toBeInTheDocument();
  });
});

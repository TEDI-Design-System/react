import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { PrintingProvider, usePrint } from '../../../providers/printing-provider/printing-provider';
import { Heading } from '../../base/typography/heading/heading';
import Collapse, { CollapseProps } from './collapse';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

jest.mock('../../../providers/printing-provider/printing-provider', () => ({
  PrintingProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePrint: jest.fn(),
}));

const getComponent = (props?: Partial<CollapseProps>) =>
  render(
    <PrintingProvider>
      <Collapse
        id="collapse-1"
        title={<Heading>Heading</Heading>}
        openText="Näita rohkem"
        closeText="Näita vähem"
        {...props}
      >
        Collapse content
      </Collapse>
    </PrintingProvider>
  );

describe('Collapse', () => {
  (useBreakpointProps as jest.Mock).mockImplementation(() => ({
    getCurrentBreakpointProps: jest.fn((props) => ({ ...props })),
  }));
  (usePrint as jest.Mock).mockReturnValue(false);

  it('renders the title, content and a toggle button', () => {
    getComponent();
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Collapse content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Näita rohkem' })).toBeInTheDocument();
  });

  it('applies a custom className to the root', () => {
    const { container } = getComponent({ className: 'test-class' });
    const root = container.querySelector('.test-class');
    expect(root).toBeInTheDocument();
    expect(root?.getAttribute('data-name')).toBe('collapse');
  });

  it('is collapsed by default and expands when the toggle is clicked (uncontrolled)', () => {
    getComponent();
    const button = screen.getByRole('button', { name: 'Näita rohkem' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: 'Näita vähem' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('starts open with defaultOpen', () => {
    getComponent({ defaultOpen: true });
    expect(screen.getByRole('button', { name: 'Näita vähem' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('can be controlled externally', () => {
    const { getByTestId, rerender } = render(
      <Collapse id="collapse-2" open title={<Heading>Controlled</Heading>}>
        Controlled content
      </Collapse>
    );
    expect(getByTestId('collapse-inner')).toHaveStyle('height: auto');

    rerender(
      <Collapse id="collapse-2" open={false} title={<Heading>Controlled</Heading>}>
        Controlled content
      </Collapse>
    );
    expect(getByTestId('collapse-inner')).toHaveStyle('height: 0px');
  });

  it('fires onToggle with the next open state', () => {
    const onToggle = jest.fn();
    getComponent({ onToggle });
    fireEvent.click(screen.getByRole('button', { name: 'Näita rohkem' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('does NOT toggle when the title itself is clicked (only the toggle button does)', () => {
    getComponent();
    fireEvent.click(screen.getByText('Heading'));
    expect(screen.getByRole('button', { name: 'Näita rohkem' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles on a title click when fullRowToggle is set', () => {
    getComponent({ fullRowToggle: true });
    fireEvent.click(screen.getByText('Heading'));
    expect(screen.getByRole('button', { name: 'Näita vähem' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not double-toggle when the chevron button is clicked with fullRowToggle', () => {
    const onToggle = jest.fn();
    getComponent({ fullRowToggle: true, onToggle });
    fireEvent.click(screen.getByRole('button', { name: 'Näita rohkem' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('renders the content as a region labelled by the toggle', () => {
    getComponent({ defaultOpen: true });
    const region = screen.getByRole('region', { name: 'Näita vähem' });
    expect(region).toHaveTextContent('Collapse content');
  });

  it('hides the toggle text (chevron only) when hideCollapseText is set, keeping an accessible name', () => {
    getComponent({ hideCollapseText: true });
    expect(screen.getByRole('button', { name: 'Näita rohkem' })).toBeInTheDocument();
    expect(screen.queryByText('Näita rohkem')).not.toBeInTheDocument();
  });

  it('uses toggleLabel as the accessible name in icon-only mode', () => {
    render(
      <Collapse id="collapse-a11y" iconOnly toggleLabel="Toggle section">
        Content
      </Collapse>
    );
    expect(screen.getByRole('button', { name: 'Toggle section' })).toBeInTheDocument();
  });

  it('points aria-controls at an external id and renders no internal panel when controlsId is set', () => {
    render(
      <Collapse id="collapse-ext" controlsId="external-region" title={<Heading>External</Heading>}>
        Should not render here
      </Collapse>
    );
    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', 'external-region');
    expect(screen.queryByTestId('collapse-inner')).not.toBeInTheDocument();
    expect(screen.queryByText('Should not render here')).not.toBeInTheDocument();
  });

  describe('headingLevel', () => {
    const renderHeading = (props?: Partial<CollapseProps>) =>
      getComponent({ title: undefined, openText: 'Section', closeText: 'Section', headingLevel: 'h3', ...props });

    it('puts the toggle button inside a heading of that level', () => {
      renderHeading();

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toContainElement(screen.getByRole('button', { name: 'Section' }));
    });

    it('names the section once: the heading is the button, with no separate title', () => {
      renderHeading({ title: <Heading>Section</Heading> });

      expect(screen.getAllByText('Section')).toHaveLength(1);
      expect(screen.getAllByRole('heading')).toHaveLength(1);
      expect(screen.getByRole('button', { name: 'Section' })).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles and labels the content region by the button', () => {
      renderHeading();

      const button = screen.getByRole('button', { name: 'Section' });
      fireEvent.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('region', { name: 'Section' })).toHaveTextContent('Collapse content');
    });

    it('keeps the title next to an icon-only toggle when headingLevel is not set', () => {
      getComponent();

      expect(screen.getByText('Heading')).toBeInTheDocument();
      expect(screen.getByRole('button').closest('h1, h2, h3, h4, h5, h6')).toBeNull();
    });

    it('prints the label as plain text under the print provider', () => {
      (usePrint as jest.Mock).mockReturnValue(true);
      renderHeading();

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      (usePrint as jest.Mock).mockReturnValue(false);
    });

    it('prints the default close label when no label is given, like the toggle does', () => {
      (usePrint as jest.Mock).mockReturnValue(true);
      renderHeading({ openText: undefined, closeText: undefined });

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading.textContent?.trim()).not.toBe('');
      (usePrint as jest.Mock).mockReturnValue(false);
    });

    it('uses a single label for both states, on screen and in print', () => {
      renderHeading({ openText: 'Section', closeText: undefined });

      const button = screen.getByRole('button', { name: 'Section' });
      fireEvent.click(button);
      expect(screen.getByRole('button', { name: 'Section' })).toHaveAttribute('aria-expanded', 'true');
    });

    it('prints the single label when only openText is given', () => {
      (usePrint as jest.Mock).mockReturnValue(true);
      renderHeading({ openText: 'Section', closeText: undefined });

      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section');
      (usePrint as jest.Mock).mockReturnValue(false);
    });

    it('keeps the content region labelled when printing', () => {
      (usePrint as jest.Mock).mockReturnValue(true);
      renderHeading();

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveAttribute('id', 'collapse-1__trigger');
      expect(screen.getByRole('region', { name: 'Section' })).toBeInTheDocument();
      (usePrint as jest.Mock).mockReturnValue(false);
    });
  });
});

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
});

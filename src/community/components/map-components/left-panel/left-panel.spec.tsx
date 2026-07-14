import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { ReactElement } from 'react';

import '@testing-library/jest-dom';

jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

import { LabelProvider } from '../../../../tedi';
import { LeftPanel } from './left-panel';

const renderWithLabels = (ui: ReactElement): RenderResult => render(<LabelProvider>{ui}</LabelProvider>);

describe('LeftPanel', () => {
  describe('rendering', () => {
    it('renders header, footer and children when open', () => {
      renderWithLabels(
        <LeftPanel header={<span>Header</span>} footer={<span>Footer</span>}>
          <span>Body</span>
        </LeftPanel>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('does not render the footer wrapper when no footer is provided', () => {
      renderWithLabels(<LeftPanel>Body</LeftPanel>);

      expect(screen.queryByText('Footer')).not.toBeInTheDocument();
    });

    it('renders a close button with the default accessible label', () => {
      renderWithLabels(<LeftPanel>Body</LeftPanel>);

      expect(screen.getByRole('button', { name: 'Sulge paneel' })).toBeInTheDocument();
    });

    it('hides the close button when hideCloseButton is set', () => {
      renderWithLabels(<LeftPanel hideCloseButton>Body</LeftPanel>);

      expect(screen.queryByRole('button', { name: 'Sulge paneel' })).not.toBeInTheDocument();
    });

    it('applies a fixed width and skips the resizer when resizable is false', () => {
      renderWithLabels(
        <LeftPanel resizable={false} width={420}>
          Body
        </LeftPanel>
      );

      expect(screen.getByRole('complementary')).toHaveStyle({ width: '420px' });
    });

    it('exposes the panel as a labelled complementary landmark linked to its close button', () => {
      renderWithLabels(<LeftPanel>Body</LeftPanel>);

      const panel = screen.getByRole('complementary', { name: 'Külgpaneel' });
      const closeButton = screen.getByRole('button', { name: 'Sulge paneel' });
      expect(closeButton).toHaveAttribute('aria-controls', panel.getAttribute('id'));
    });
  });

  describe('uncontrolled open state', () => {
    it('collapses to the expander button when the close button is clicked', () => {
      renderWithLabels(<LeftPanel>Body</LeftPanel>);

      fireEvent.click(screen.getByRole('button', { name: 'Sulge paneel' }));

      expect(screen.queryByText('Body')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ava paneel' })).toBeInTheDocument();
    });

    it('reopens the panel when the expander button is clicked', () => {
      renderWithLabels(<LeftPanel defaultOpen={false}>Body</LeftPanel>);

      fireEvent.click(screen.getByRole('button', { name: 'Ava paneel' }));

      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('renders nothing when collapsed and hideOpenButton is set', () => {
      const { container } = renderWithLabels(
        <LeftPanel defaultOpen={false} hideOpenButton>
          Body
        </LeftPanel>
      );

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('controlled open state', () => {
    it('notifies onOpenChange without collapsing on its own', () => {
      const onOpenChange = jest.fn();
      renderWithLabels(
        <LeftPanel open onOpenChange={onOpenChange}>
          Body
        </LeftPanel>
      );

      fireEvent.click(screen.getByRole('button', { name: 'Sulge paneel' }));

      expect(onOpenChange).toHaveBeenCalledWith(false);
      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('reflects the open prop from the parent', () => {
      const { rerender } = renderWithLabels(<LeftPanel open>Body</LeftPanel>);
      expect(screen.getByText('Body')).toBeInTheDocument();

      rerender(
        <LabelProvider>
          <LeftPanel open={false}>Body</LeftPanel>
        </LabelProvider>
      );
      expect(screen.queryByText('Body')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Ava paneel' })).toBeInTheDocument();
    });
  });

  describe('accessible labels', () => {
    it('labels the reopen button from LabelProvider when collapsed', () => {
      renderWithLabels(<LeftPanel defaultOpen={false}>Body</LeftPanel>);

      expect(screen.getByRole('button', { name: 'Ava paneel' })).toBeInTheDocument();
    });
  });
});

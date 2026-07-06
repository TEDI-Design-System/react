import { fireEvent, render, screen, within } from '@testing-library/react';

import '@testing-library/jest-dom';

// The `src/tedi` barrel transitively imports react-sticky-box (ESM-only), which Jest does not transform.
jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

import { LabelProvider } from '../../../../tedi/providers/label-provider/label-provider';
import { SplitPane } from './split-pane';

const RECT = {
  left: 0,
  top: 0,
  width: 1000,
  height: 500,
  right: 1000,
  bottom: 500,
  x: 0,
  y: 0,
  toJSON: () => ({}),
} as DOMRect;

const mockContainerRect = (rect: Partial<DOMRect> = {}): void => {
  jest.spyOn(screen.getByTestId('split-pane'), 'getBoundingClientRect').mockReturnValue({ ...RECT, ...rect });
};

describe('SplitPane', () => {
  describe('rendering', () => {
    it('renders first and second pane content', () => {
      render(<SplitPane first={<span>First</span>} second={<span>Second</span>} direction="horizontal" />);

      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('exposes the divider as a separator with orientation for horizontal', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);

      const divider = screen.getByRole('separator');
      expect(divider).toHaveAttribute('aria-orientation', 'vertical');
      expect(divider).toHaveAttribute('aria-valuenow', '50');
      expect(divider).toHaveAttribute('tabindex', '0');
    });

    it('exposes horizontal orientation for a vertical split', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" />);

      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders the drag grip as a non-interactive visual affordance', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);

      expect(screen.getByTestId('split-pane-handle')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('highlighted side', () => {
    it('rings the first pane and omits the divider-facing edge (horizontal)', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" highlightedSide="first" />);

      const ring = within(screen.getByTestId('split-pane-first')).getByTestId('active-pane-ring');
      expect(ring).toHaveClass('tedi-split-pane__ring--omit-right');
      expect(within(screen.getByTestId('split-pane-second')).queryByTestId('active-pane-ring')).not.toBeInTheDocument();
    });

    it('rings the second pane and omits its divider-facing edge (horizontal)', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" highlightedSide="second" />);

      const ring = within(screen.getByTestId('split-pane-second')).getByTestId('active-pane-ring');
      expect(ring).toHaveClass('tedi-split-pane__ring--omit-left');
    });

    it('omits the bottom edge for the first pane in a vertical split', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" highlightedSide="first" />);

      const ring = within(screen.getByTestId('split-pane-first')).getByTestId('active-pane-ring');
      expect(ring).toHaveClass('tedi-split-pane__ring--omit-bottom');
    });
  });

  describe('close button', () => {
    it('renders a close button and calls onClose on click when onClose is provided', () => {
      const onClose = jest.fn();
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onClose={onClose} />);

      fireEvent.click(screen.getByTestId('split-pane-close'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render a close button without onClose', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);

      expect(screen.queryByTestId('split-pane-close')).not.toBeInTheDocument();
    });
  });

  describe('localized accessible names', () => {
    it('resolves labels through LabelProvider (Estonian by default)', () => {
      render(
        <LabelProvider>
          <SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onClose={jest.fn()} />
        </LabelProvider>
      );

      expect(screen.getByRole('separator')).toHaveAccessibleName('Muuda paanide suurust');
      expect(screen.getByRole('button', { name: 'Sulge' })).toBeInTheDocument();
    });
  });

  describe('pointer interactions', () => {
    it('updates pane sizes on divider drag', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);
      mockContainerRect();

      fireEvent.mouseDown(screen.getByTestId('split-pane-divider'), { clientX: 500, clientY: 250 });
      fireEvent.mouseMove(document, { clientX: 700, clientY: 250 });
      fireEvent.mouseUp(document);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('70');
    });

    it('clamps the ratio to a minimum of 20%', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);
      mockContainerRect();

      fireEvent.mouseDown(screen.getByTestId('split-pane-divider'), { clientX: 500, clientY: 250 });
      fireEvent.mouseMove(document, { clientX: 50, clientY: 250 });
      fireEvent.mouseUp(document);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('20');
    });

    it('clamps the ratio to a maximum of 80%', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);
      mockContainerRect();

      fireEvent.mouseDown(screen.getByTestId('split-pane-divider'), { clientX: 500, clientY: 250 });
      fireEvent.mouseMove(document, { clientX: 950, clientY: 250 });
      fireEvent.mouseUp(document);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('80');
    });

    it('uses the vertical axis for a vertical split', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" />);
      mockContainerRect({ width: 500, height: 1000, right: 500, bottom: 1000 });

      fireEvent.mouseDown(screen.getByTestId('split-pane-divider'), { clientX: 250, clientY: 500 });
      fireEvent.mouseMove(document, { clientX: 250, clientY: 600 });
      fireEvent.mouseUp(document);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('60');
    });

    it('does not update the ratio without a preceding mousedown', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);
      mockContainerRect();

      fireEvent.mouseMove(document, { clientX: 700, clientY: 250 });

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('50');
    });

    it('does not start a drag when the close button is pressed', () => {
      const onClose = jest.fn();
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onClose={onClose} />);
      mockContainerRect();

      fireEvent.mouseDown(screen.getByTestId('split-pane-close'), { clientX: 500, clientY: 250 });
      fireEvent.mouseMove(document, { clientX: 800, clientY: 250 });
      fireEvent.mouseUp(document);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('50');
    });
  });

  describe('controlled ratio', () => {
    it('seeds the pane size from initialRatio', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" initialRatio={70} />);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('70');
    });

    it('clamps an out-of-range initialRatio', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" initialRatio={95} />);

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('80');
    });

    it('reports the final ratio via onRatioChange on drag end', () => {
      const onRatioChange = jest.fn();
      render(
        <SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onRatioChange={onRatioChange} />
      );
      mockContainerRect();

      fireEvent.mouseDown(screen.getByTestId('split-pane-divider'), { clientX: 500, clientY: 250 });
      fireEvent.mouseMove(document, { clientX: 700, clientY: 250 });
      fireEvent.mouseUp(document);

      expect(onRatioChange).toHaveBeenCalledTimes(1);
      expect(onRatioChange).toHaveBeenCalledWith(70);
    });
  });

  describe('keyboard interactions', () => {
    it('increases the ratio with the forward arrow (horizontal)', () => {
      const onRatioChange = jest.fn();
      render(
        <SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onRatioChange={onRatioChange} />
      );

      fireEvent.keyDown(screen.getByRole('separator'), { key: 'ArrowRight' });

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('52');
      expect(onRatioChange).toHaveBeenCalledWith(52);
    });

    it('decreases the ratio with the backward arrow (horizontal)', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);

      fireEvent.keyDown(screen.getByRole('separator'), { key: 'ArrowLeft' });

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('48');
    });

    it('uses the vertical arrows for a vertical split', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="vertical" />);

      fireEvent.keyDown(screen.getByRole('separator'), { key: 'ArrowDown' });

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('52');
    });

    it('jumps to the bounds with Home and End', () => {
      render(<SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" />);
      const divider = screen.getByRole('separator');

      fireEvent.keyDown(divider, { key: 'Home' });
      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('20');

      fireEvent.keyDown(divider, { key: 'End' });
      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('80');
    });

    it('ignores unrelated keys', () => {
      const onRatioChange = jest.fn();
      render(
        <SplitPane first={<div>A</div>} second={<div>B</div>} direction="horizontal" onRatioChange={onRatioChange} />
      );

      fireEvent.keyDown(screen.getByRole('separator'), { key: 'Enter' });

      expect(screen.getByTestId('split-pane-first').style.flexGrow).toBe('50');
      expect(onRatioChange).not.toHaveBeenCalled();
    });
  });
});

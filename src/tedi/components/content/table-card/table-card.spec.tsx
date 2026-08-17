import { fireEvent, render, screen, within } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { TableCard, TableCardRow } from './table-card';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

const rows: TableCardRow[] = [
  { label: 'Kogus', value: '2 päeva' },
  { label: 'Summa', value: '0.00 €', bold: true },
];

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockReturnValue({
    getCurrentBreakpointProps: (props: unknown) => props,
  });
});

describe('TableCard', () => {
  it('renders the rows as a definition list of label / value pairs', () => {
    render(<TableCard rows={rows} />);

    expect(screen.getByText('Kogus').closest('dl')).toBeInTheDocument();
    expect(screen.getByText('Kogus').closest('dt')).toBeInTheDocument();
    expect(screen.getByText('2 päeva').closest('dd')).toBeInTheDocument();
    expect(screen.getByText('0.00 €')).toBeInTheDocument();
  });

  it('renders a non-string label node as-is (not wrapped in a Label)', () => {
    render(<TableCard rows={[{ label: <span>Custom</span>, value: 'v' }]} />);
    const custom = screen.getByText('Custom');
    expect(custom.tagName).toBe('SPAN');
    expect(custom.closest('dt')).toBeInTheDocument();
  });

  it('emphasises a value marked bold via a bold Text', () => {
    render(<TableCard rows={rows} />);
    expect(screen.getByText('0.00 €')).toHaveClass('text-bold');
    expect(screen.getByText('2 päeva')).not.toHaveClass('text-bold');
  });

  it('right-aligns label and value by default and honours overrides (via TextGroup)', () => {
    const { rerender } = render(<TableCard rows={rows} />);
    expect(screen.getByText('2 päeva').closest('dd')).toHaveClass('tedi-text-group__value--align-right');
    expect(screen.getByText('Kogus').closest('dt')).toHaveClass('tedi-text-group--align-right');

    rerender(<TableCard rows={rows} labelAlign="left" valueAlign="left" />);
    expect(screen.getByText('2 päeva').closest('dd')).toHaveClass('tedi-text-group__value--align-left');
    expect(screen.getByText('Kogus').closest('dt')).toHaveClass('tedi-text-group--align-left');
  });

  it('renders a vertical layout when layout="vertical"', () => {
    render(<TableCard rows={rows} layout="vertical" />);
    expect(screen.getByText('Kogus').closest('dl')).toHaveClass('tedi-text-group--vertical');
  });

  it('lays rows out in a grid when columns > 1', () => {
    render(<TableCard rows={rows} layout="vertical" columns={2} />);
    const dl = screen.getByText('Kogus').closest('dl');
    expect(dl).toHaveClass('tedi-text-group--columns');
    expect(dl).toHaveStyle('--tedi-text-group-columns: 2');
  });

  it('spans a row across columns when colSpan is set (multi-column body)', () => {
    render(
      <TableCard
        layout="vertical"
        columns={2}
        rows={[
          { label: 'Periood', value: '01.02 - 14.01.2024', colSpan: 2 },
          { label: 'Liik', value: 'Haigusleht' },
        ]}
      />
    );
    expect(screen.getByText('Periood').closest('div')).toHaveStyle('grid-column: span 2');
    expect(screen.getByText('Liik').closest('div')).not.toHaveStyle('grid-column: span 2');
  });

  it('renders trailing header status content', () => {
    render(<TableCard rows={rows} title="ID kaart" status={<span>Kehtib</span>} />);
    expect(screen.getByText('Kehtib')).toBeInTheDocument();
  });

  it('renders an emphasised summary row', () => {
    render(<TableCard rows={rows} summary={{ label: 'Ülekande summa', value: '9.99 €' }} />);
    expect(screen.getByText('Ülekande summa')).toBeInTheDocument();
    expect(screen.getByText('9.99 €')).toBeInTheDocument();
  });

  it('renders the title as a heading with the configured level and a subtitle', () => {
    render(<TableCard rows={rows} title="Anna Tamm" subtitle="49001010001" titleElement="h2" />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Anna Tamm' });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('49001010001')).toBeInTheDocument();
  });

  it('keeps the title as body text by default and scales it via titleModifiers (level stays)', () => {
    const { rerender } = render(<TableCard rows={rows} title="Anna Tamm" titleElement="h4" />);
    expect(screen.getByRole('heading', { level: 4, name: 'Anna Tamm' })).not.toHaveClass('tedi-text--h5');

    rerender(<TableCard rows={rows} title="Anna Tamm" titleElement="h4" titleModifiers="h5" />);
    const heading = screen.getByRole('heading', { level: 4, name: 'Anna Tamm' });
    expect(heading).toHaveClass('tedi-text--h5');
  });

  it('renders a static (non-collapsible) card without a toggle button', () => {
    render(<TableCard rows={rows} title="Anna Tamm" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('2 päeva')).toBeInTheDocument();
  });

  describe('collapsible', () => {
    it('wires the toggle button to the body and toggles its hidden state (uncontrolled)', () => {
      render(<TableCard rows={rows} title="Hambaarst" collapsible defaultOpen={false} />);

      const toggle = screen.getByRole('button', { name: /Hambaarst/ });
      expect(toggle).toHaveAttribute('aria-expanded', 'false');

      const bodyId = toggle.getAttribute('aria-controls') as string;
      const body = document.getElementById(bodyId);
      expect(body).not.toBeNull();
      expect(body).toHaveAttribute('hidden');

      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(body).not.toHaveAttribute('hidden');
      expect(within(body as HTMLElement).getByText('2 päeva')).toBeInTheDocument();
    });

    it('names the toggle via ariaLabel when there is no title (keeps the button accessible)', () => {
      render(<TableCard rows={rows} collapsible ariaLabel="Broneering 22.03" />);
      expect(screen.getByRole('button', { name: 'Broneering 22.03' })).toBeInTheDocument();
    });

    it('respects controlled `open` and calls onOpenChange without self-toggling', () => {
      const onOpenChange = jest.fn();
      render(
        <TableCard
          rows={rows}
          title="Hambaarst"
          subtitle="14.04.2026"
          collapsible
          open={false}
          onOpenChange={onOpenChange}
        />
      );

      const toggle = screen.getByRole('button', { name: /Hambaarst/ });
      expect(toggle).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggle);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('renders children inside the body and collapses them with it', () => {
    render(
      <TableCard rows={rows} title="Kadri Kaasik" collapsible defaultOpen={false}>
        <div>Child certificate group</div>
      </TableCard>
    );

    const toggle = screen.getByRole('button', { name: /Kadri Kaasik/ });
    const panel = document.getElementById(toggle.getAttribute('aria-controls') as string);
    expect(within(panel as HTMLElement).getByText('Child certificate group')).toBeInTheDocument();
    expect(panel).toHaveAttribute('hidden');

    fireEvent.click(toggle);
    expect(panel).not.toHaveAttribute('hidden');
  });

  it('renders footer actions', () => {
    render(<TableCard rows={rows} actions={<button type="button">Muuda</button>} />);
    expect(screen.getByRole('button', { name: 'Muuda' })).toBeInTheDocument();
  });

  describe('selectable', () => {
    it('uses the title as the checkbox label so the whole name is clickable, and reports changes', () => {
      const onSelectedChange = jest.fn();
      render(<TableCard rows={rows} title="Anna Tamm" selectable onSelectedChange={onSelectedChange} />);
      const checkbox = screen.getByRole('checkbox', { name: 'Anna Tamm' });
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      expect(onSelectedChange).toHaveBeenCalledWith(true);
    });

    it('falls back to selectionLabel for the checkbox name when there is no title', () => {
      render(<TableCard rows={rows} selectable selectionLabel="Vali rida" />);
      expect(screen.getByRole('checkbox', { name: 'Vali rida' })).toBeInTheDocument();
    });

    it('honours defaultSelected in uncontrolled mode', () => {
      render(<TableCard rows={rows} title="Anna Tamm" selectable defaultSelected />);
      const checkbox = screen.getByRole('checkbox', { name: 'Anna Tamm' });
      expect(checkbox).toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('reflects the controlled selected state and does not self-toggle', () => {
      const onSelectedChange = jest.fn();
      render(<TableCard rows={rows} title="Anna Tamm" selectable selected onSelectedChange={onSelectedChange} />);
      const checkbox = screen.getByRole('checkbox', { name: 'Anna Tamm' });
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(onSelectedChange).toHaveBeenCalledWith(false);
      expect(checkbox).toBeChecked();
    });
  });

  it('applies a custom id and className', () => {
    const { container } = render(<TableCard rows={rows} id="tc-1" className="custom" />);
    const root = container.querySelector('#tc-1');
    expect(root).toHaveClass('tedi-table-card', 'custom');
  });
});

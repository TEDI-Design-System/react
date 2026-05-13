import { render, screen, within } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { TextGroup } from './text-group';

import '@testing-library/jest-dom';

// TextGroup + TextGroup.List both run their props through `useBreakpointProps`
// to support per-breakpoint overrides. Mock it once so layout / class
// assertions are deterministic and don't depend on the runtime viewport.
jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockImplementation(() => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCurrentBreakpointProps: (props: any) => ({ ...props }),
  }));
});

describe('TextGroup component', () => {
  it('renders with default props', () => {
    const { container } = render(<TextGroup label="Label" value="Value" />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('tedi-text-group--vertical');
    expect(textGroup).toHaveStyle('--label-width: auto');

    const labelElement = container.querySelector('dt');
    const valueElement = container.querySelector('dd');

    expect(labelElement).toHaveClass('tedi-text-group__label');
    expect(valueElement).toHaveClass('tedi-text-group__value');
    expect(labelElement).toHaveTextContent('Label');
    expect(valueElement).toHaveTextContent('Value');
  });

  it('renders with custom props (horizontal layout, custom labelWidth)', () => {
    const { container } = render(
      <TextGroup label="Custom Label" value="Custom Value" type="horizontal" labelWidth="200px" />
    );
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('tedi-text-group--horizontal');
    expect(textGroup).toHaveStyle('--label-width: 200px');

    const labelElement = container.querySelector('dt');
    const valueElement = container.querySelector('dd');

    expect(labelElement).toHaveTextContent('Custom Label');
    expect(valueElement).toHaveTextContent('Custom Value');
  });

  it('applies custom className', () => {
    const { container } = render(<TextGroup label="Label" value="Value" className="custom-class" />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveClass('custom-class');
  });

  it('handles number for labelWidth as percentage', () => {
    const { container } = render(<TextGroup label="Label" value="Value" labelWidth={50} />);
    const textGroup = container.querySelector('.tedi-text-group');

    expect(textGroup).toHaveStyle('--label-width: 50%');
  });

  it('applies right alignment class when labelAlign="right"', () => {
    const { container } = render(<TextGroup label="Total" value="€ 124.50" labelAlign="right" />);

    const labelElement = container.querySelector('dt.tedi-text-group__label');
    expect(labelElement).toHaveClass('tedi-text-group--align-right');
    expect(labelElement).not.toHaveClass('tedi-text-group--align-left');
  });

  it('applies right alignment in horizontal layout', () => {
    const { container } = render(
      <TextGroup label="Price" value="39.99 €" type="horizontal" labelAlign="right" labelWidth="180px" />
    );

    const textGroup = container.querySelector('.tedi-text-group');
    expect(textGroup).toHaveClass('tedi-text-group--horizontal');
    expect(textGroup).toHaveStyle('--label-width: 180px');

    const labelElement = container.querySelector('dt');
    expect(labelElement).toHaveClass('tedi-text-group--align-right');
  });

  it('still applies left alignment when explicitly set to "left"', () => {
    const { container } = render(<TextGroup label="Status" value="Active" labelAlign="left" />);

    const labelElement = container.querySelector('dt');
    expect(labelElement).toHaveClass('tedi-text-group--align-left');
    expect(labelElement).not.toHaveClass('tedi-text-group--align-right');
  });

  it('renders plain string label through <Label> component', () => {
    const { container } = render(<TextGroup label="Status" value="Active" />);

    const dt = container.querySelector('dt');
    const labelWrapper = dt?.querySelector('.tedi-label');

    expect(labelWrapper).toBeInTheDocument();
    expect(dt).toHaveTextContent('Status');
    expect(dt?.children).toHaveLength(1);
    expect(dt?.firstChild?.nodeName.toLowerCase()).toBe('label');
  });

  it('renders complex JSX label without extra <Label> wrapper', () => {
    const { container } = render(
      <TextGroup
        label={
          <>
            <strong>Authorisations</strong>
            <button type="button">Info</button>
          </>
        }
        value="Visible to doctor"
      />
    );

    const dt = container.querySelector('dt');

    expect(dt).toBeInTheDocument();
    expect(dt).toHaveTextContent('Authorisations');

    const nestedLabels = dt?.querySelectorAll('label, .tedi-label');
    expect(nestedLabels?.length).toBe(0);
    expect(dt?.querySelector('strong')).toBeInTheDocument();
    expect(dt?.querySelector('button')).toBeInTheDocument();
  });

  it('handles null/undefined label gracefully (renders empty)', () => {
    const { container } = render(<TextGroup label={null} value="—" />);
    const dt = container.querySelector('dt');

    expect(dt).toBeInTheDocument();
    expect(dt).toHaveTextContent('');
    expect(dt?.querySelector('.tedi-label')).not.toBeInTheDocument();
  });

  it('renders label as array of nodes without wrapper', () => {
    const { container } = render(<TextGroup label={['Role: ', <em key="em">Admin</em>]} value="System" />);

    const dt = container.querySelector('dt');
    expect(dt).toHaveTextContent('Role: Admin');
    expect(dt?.querySelector('em')).toBeInTheDocument();
    expect(dt?.querySelector('.tedi-label')).not.toBeInTheDocument();
  });
});

describe('TextGroup.List', () => {
  it('renders a single <dl> with N <dt>/<dd> pairs', () => {
    render(
      <TextGroup.List
        items={[
          { label: 'Patient', value: 'Mari Maasikas' },
          { label: 'Address', value: 'Tulbi tn 4, Tallinn' },
          { label: 'Vaccine', value: 'COVID-19 mRNA' },
        ]}
      />
    );

    // Three semantic `term` (<dt>) and three `definition` (<dd>) entries grouped
    // under the same definition list. RTL maps <dt> → "term" and <dd> →
    // "definition" via dom-accessibility-api, so we can assert structure
    // through accessible roles instead of DOM selectors.
    const terms = screen.getAllByRole('term');
    const definitions = screen.getAllByRole('definition');
    expect(terms).toHaveLength(3);
    expect(definitions).toHaveLength(3);

    expect(terms.map((dt) => dt.textContent?.trim())).toEqual(['Patient', 'Address', 'Vaccine']);
    expect(definitions.map((dd) => dd.textContent?.trim())).toEqual([
      'Mari Maasikas',
      'Tulbi tn 4, Tallinn',
      'COVID-19 mRNA',
    ]);

    // All terms share the same parent <dl>, so there's exactly one definition
    // list wrapping the whole content.
    const dl = terms[0].closest('dl');
    expect(dl).not.toBeNull();
    expect(terms.every((dt) => dt.closest('dl') === dl)).toBe(true);
    expect(dl).toHaveClass('tedi-text-group');
    expect(dl).toHaveClass('tedi-text-group--list');
  });

  it('applies the horizontal modifier when type="horizontal"', () => {
    render(
      <TextGroup.List
        type="horizontal"
        labelWidth="200px"
        items={[
          { label: 'A', value: '1' },
          { label: 'B', value: '2' },
        ]}
      />
    );

    const dl = screen.getByText('A').closest('dl');
    expect(dl).toHaveClass('tedi-text-group--horizontal');
    expect(dl).toHaveStyle('--label-width: 200px');
  });

  it('honors per-row labelAlign overrides', () => {
    render(
      <TextGroup.List
        labelAlign="left"
        items={[
          { label: 'Subtotal', value: '€ 10' },
          { label: 'Total', value: '€ 12', labelAlign: 'right' },
        ]}
      />
    );

    expect(screen.getByText('Subtotal').closest('dt')).toHaveClass('tedi-text-group--align-left');
    expect(screen.getByText('Total').closest('dt')).toHaveClass('tedi-text-group--align-right');
  });

  it('honors per-row labelWidth overrides via inline --label-width', () => {
    render(
      <TextGroup.List
        labelWidth="100px"
        items={[
          { label: 'Default', value: 'A' },
          { label: 'Custom', value: 'B', labelWidth: '240px' },
          { label: 'Percent', value: 'C', labelWidth: 25 },
        ]}
      />
    );

    // Each row is the <dt>'s parent <div>; semantically "the group containing
    // this label". Resolve it via the visible label text and walk up to the
    // group rather than poking at a class name.
    const rowOf = (labelName: string) => screen.getByText(labelName).closest('dt')?.parentElement as HTMLElement;
    expect(rowOf('Default')).not.toHaveAttribute('style');
    expect(rowOf('Custom')).toHaveStyle('--label-width: 240px');
    expect(rowOf('Percent')).toHaveStyle('--label-width: 25%');
  });

  it('renders string labels via <Label>, JSX labels untouched', () => {
    render(
      <TextGroup.List
        items={[
          { label: 'Plain', value: 'A' },
          { label: <strong>Bold</strong>, value: 'B' },
        ]}
      />
    );

    // String labels go through `<Label>` which renders an HTML <label>.
    expect(screen.getByText('Plain').tagName.toLowerCase()).toBe('label');

    // JSX labels are rendered verbatim — the <strong> stays as-is, no Label
    // wrapping happens.
    const boldText = screen.getByText('Bold');
    expect(boldText.tagName.toLowerCase()).toBe('strong');
    const boldTerm = boldText.closest('dt');
    expect(
      within(boldTerm as HTMLElement).queryByText((_, node) => node?.tagName?.toLowerCase() === 'label')
    ).toBeNull();
  });

  it('applies custom className to the root <dl>', () => {
    render(<TextGroup.List className="custom-list" items={[{ label: 'A', value: '1' }]} />);
    expect(screen.getByText('A').closest('dl')).toHaveClass('custom-list');
  });
});

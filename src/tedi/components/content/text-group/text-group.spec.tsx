import { render } from '@testing-library/react';

import { TextGroup } from './text-group';

import '@testing-library/jest-dom';

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

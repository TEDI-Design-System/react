import { render, screen } from '@testing-library/react';

import { OptionContent } from './option-content';
import styles from './option-content.module.scss';

describe('OptionContent', () => {
  it('renders the label and meta content', () => {
    render(
      <OptionContent>
        <OptionContent.Label>Tallinn</OptionContent.Label>
        <OptionContent.Meta>4 results</OptionContent.Meta>
      </OptionContent>
    );
    expect(screen.getByText('Tallinn')).toBeInTheDocument();
    expect(screen.getByText('4 results')).toBeInTheDocument();
  });

  it('clips the label by default', () => {
    render(
      <OptionContent>
        <OptionContent.Label>Tallinn</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('Tallinn')).not.toHaveClass(styles['tedi-option-content__label--no-clip']);
  });

  it('does not clip the label when clipContent is false', () => {
    render(
      <OptionContent>
        <OptionContent.Label clipContent={false}>Tallinn</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('Tallinn')).toHaveClass(styles['tedi-option-content__label--no-clip']);
  });

  it('does not expose a selection control for the default type', () => {
    render(
      <OptionContent>
        <OptionContent.Label>Plain</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('Plain')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
    expect(screen.queryByRole('radio')).toBeNull();
  });

  it('shows a check glyph for a selected checkbox without exposing a control (presentation)', () => {
    render(
      <OptionContent type="checkbox" selected>
        <OptionContent.Label>Item</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('check')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('shows no glyph for an unchecked checkbox', () => {
    render(
      <OptionContent type="checkbox">
        <OptionContent.Label>Item</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.queryByText('check')).toBeNull();
    expect(screen.queryByText('remove')).toBeNull();
  });

  it('shows a dash glyph for an indeterminate checkbox (presentation)', () => {
    render(
      <OptionContent type="checkbox" indeterminate>
        <OptionContent.Label>Item</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('remove')).toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });

  it('renders a selected radio without exposing a control (presentation)', () => {
    const { container } = render(
      <OptionContent type="radio" selected>
        <OptionContent.Label>Item</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.queryByRole('radio')).toBeNull();
    expect(container.querySelector(`.${styles['tedi-option-content__radio--checked']}`)).toBeInTheDocument();
  });

  it('renders a leading icon', () => {
    render(
      <OptionContent icon="location_on">
        <OptionContent.Label>Tallinn</OptionContent.Label>
      </OptionContent>
    );
    expect(screen.getByText('Tallinn')).toBeInTheDocument();
  });

  it('renders a leading icon from icon props, keeping its className', () => {
    const { container } = render(
      <OptionContent icon={{ name: 'location_on', className: 'custom-icon' }}>
        <OptionContent.Label>Tallinn</OptionContent.Label>
      </OptionContent>
    );
    const icon = container.querySelector('.custom-icon');
    expect(icon).toHaveClass(styles['tedi-option-content__icon']);
    expect(icon).toHaveTextContent('location_on');
  });

  describe('indicatorSemantics="control" (listbox)', () => {
    it('exposes a radio with an accessible name from the label', () => {
      render(
        <OptionContent type="radio" indicatorSemantics="control" selected>
          <OptionContent.Label>Tartu</OptionContent.Label>
        </OptionContent>
      );
      const radio = screen.getByRole('radio', { name: 'Tartu' });
      expect(radio).toHaveAttribute('aria-checked', 'true');
    });

    it('exposes a checkbox with an indeterminate (mixed) state', () => {
      render(
        <OptionContent type="checkbox" indicatorSemantics="control" indeterminate>
          <OptionContent.Label>All</OptionContent.Label>
        </OptionContent>
      );
      expect(screen.getByRole('checkbox', { name: 'All' })).toHaveAttribute('aria-checked', 'mixed');
    });

    it('names the control from the Label and leaves its other children as they are', () => {
      render(
        <OptionContent type="checkbox" indicatorSemantics="control" selected>
          <OptionContent.Label>Tartu</OptionContent.Label>
          <OptionContent.Meta>4 vaba aega</OptionContent.Meta>
        </OptionContent>
      );
      expect(screen.getByRole('checkbox', { name: 'Tartu' })).toBeInTheDocument();
      expect(screen.getByText('4 vaba aega')).not.toHaveAttribute('id');
    });

    it('does not set a dangling aria-labelledby when no Label child is present', () => {
      render(
        <OptionContent type="checkbox" indicatorSemantics="control" selected>
          <span>Bare text, not a Label</span>
        </OptionContent>
      );
      expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-labelledby');
    });
  });
});

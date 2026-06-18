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

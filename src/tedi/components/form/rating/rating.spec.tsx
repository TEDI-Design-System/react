import { fireEvent, render, screen, within } from '@testing-library/react';

import { LabelProvider } from '../../../providers/label-provider';
import { Rating } from './rating';

import '@testing-library/jest-dom';

const renderWithLabels = (ui: JSX.Element) => render(<LabelProvider>{ui}</LabelProvider>);

describe('Rating', () => {
  it('renders a labelled radiogroup with the requested number of items', () => {
    render(<Rating label="Feedback" type="star" count={5} />);
    const group = screen.getByRole('radiogroup', { name: 'Feedback' });
    expect(group).toBeInTheDocument();
    expect(within(group).getAllByRole('radio')).toHaveLength(5);
  });

  it('defaults to 10 items for the number type', () => {
    render(<Rating label="NPS" type="number" />);
    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('marks the selected radio from defaultValue (uncontrolled)', () => {
    render(<Rating label="Feedback" defaultValue={3} count={5} />);
    expect(screen.getByRole('radio', { name: '3 of 5' })).toBeChecked();
  });

  it('fires onChange and updates selection when an item is chosen', () => {
    const onChange = jest.fn();
    render(<Rating label="Feedback" count={5} onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '4 of 5' }));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getByRole('radio', { name: '4 of 5' })).toBeChecked();
  });

  it('respects the controlled value and does not self-update', () => {
    const onChange = jest.fn();
    render(<Rating label="Feedback" count={5} value={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio', { name: '5 of 5' }));
    expect(onChange).toHaveBeenCalledWith(5);
    expect(screen.getByRole('radio', { name: '2 of 5' })).toBeChecked();
  });

  it('uses itemLabels as accessible names', () => {
    render(<Rating label="Feedback" type="icon" count={3} itemLabels={['Bad', 'Ok', 'Good']} />);
    expect(screen.getByRole('radio', { name: 'Good' })).toBeInTheDocument();
  });

  it('gives every radio a non-empty name even with sparse (endpoint-only) labels', () => {
    render(
      <Rating label="NPS" type="number" count={10} itemLabels={['Low', '', '', '', '', '', '', '', '', 'High']} />
    );
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => expect(radio).toHaveAccessibleName(/.+/));
    expect(screen.getByRole('radio', { name: 'Low' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'High' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '5 of 10' })).toBeInTheDocument();
  });

  it('disables every radio when disabled', () => {
    render(<Rating label="Feedback" count={5} disabled />);
    screen.getAllByRole('radio').forEach((radio) => expect(radio).toBeDisabled());
  });

  describe('readOnly aggregate summary', () => {
    it('renders a non-interactive summary (no radios) with the value, max and rater count', () => {
      renderWithLabels(<Rating label="Teenuse hinnang" count={5} value={3.5} ratingsCount={271} readOnly />);
      expect(screen.queryAllByRole('radio')).toHaveLength(0);
      const summary = screen.getByRole('img');

      expect(summary).toHaveAccessibleName(/^Teenuse hinnang: 3[.,]5\/5 - 271 hindajat$/);
    });

    it('omits the rater count when ratingsCount is not provided', () => {
      renderWithLabels(<Rating label="Hinnang" count={5} value={4} readOnly />);
      expect(screen.getByRole('img')).toHaveAccessibleName('Hinnang: 4/5');
    });

    it('shows the count number without the raters label when showRatingsCountLabel is false', () => {
      renderWithLabels(
        <Rating label="Hinnang" count={5} value={3.5} ratingsCount={271} showRatingsCountLabel={false} readOnly />
      );
      expect(screen.getByRole('img')).toHaveAccessibleName(/^Hinnang: 3[.,]5\/5 - 271$/);
    });

    it('partially fills the boundary star in the scale variant (3.5 -> 3 full, 1 half, 1 empty)', () => {
      const { container } = renderWithLabels(
        <Rating label="Hinnang" type="star" count={5} value={3.5} readOnly readOnlyVariant="scale" />
      );
      const fills = container.querySelectorAll<HTMLElement>('.tedi-rating__star-partial-fill');

      expect(fills).toHaveLength(4);
      expect(fills[0].style.getPropertyValue('--tedi-rating-star-fill')).toBe('100%');
      expect(fills[2].style.getPropertyValue('--tedi-rating-star-fill')).toBe('100%');
      expect(fills[3].style.getPropertyValue('--tedi-rating-star-fill')).toBe('50%');
    });

    it('renders a single star (no partial-fill overlays) in the default summary variant', () => {
      const { container } = renderWithLabels(<Rating label="Hinnang" type="star" count={5} value={3.5} readOnly />);
      expect(container.querySelectorAll('.tedi-rating__star-partial-fill')).toHaveLength(0);
    });

    it('does not render the interactive scale in readOnly mode', () => {
      const onChange = jest.fn();
      renderWithLabels(<Rating label="Hinnang" count={5} value={2} ratingsCount={10} readOnly onChange={onChange} />);
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});

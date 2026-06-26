import { fireEvent, render, screen, within } from '@testing-library/react';

import { Rating } from './rating';

import '@testing-library/jest-dom';

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

  it('is non-interactive when readOnly', () => {
    const onChange = jest.fn();
    render(<Rating label="Feedback" count={5} defaultValue={2} readOnly onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => expect(radio).toBeDisabled());
    expect(screen.getByRole('radio', { name: '2 of 5' })).toBeChecked();
  });
});

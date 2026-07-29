import { fireEvent, render, screen } from '@testing-library/react';

import { InfoTooltip } from './info-tooltip';

import '@testing-library/jest-dom';

describe('InfoTooltip', () => {
  it('renders an info button with an accessible name and no visible tooltip initially', () => {
    render(<InfoTooltip>Helpful hint</InfoTooltip>);

    expect(screen.getByRole('button')).toHaveAccessibleName('infoButton.moreInformation');
    expect(screen.queryByText('Helpful hint')).not.toBeInTheDocument();
  });

  it('shows the tooltip content on hover', () => {
    render(<InfoTooltip>Helpful hint</InfoTooltip>);

    fireEvent.mouseEnter(screen.getByRole('button'));
    expect(screen.getByText('Helpful hint')).toBeInTheDocument();
  });

  it('uses a custom ariaLabel for the trigger', () => {
    render(<InfoTooltip ariaLabel="What is this?">Helpful hint</InfoTooltip>);

    expect(screen.getByRole('button')).toHaveAccessibleName('What is this?');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import { InfoTooltip } from './info-tooltip';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

describe('InfoTooltip', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars, @typescript-eslint/no-explicit-any
      getCurrentBreakpointProps: ({ sm, md, lg, xl, xxl, defaultServerBreakpoint, ...xs }: any) => xs,
    });
  });

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

  it('resolves per-breakpoint overrides (e.g. ariaLabel at md)', () => {
    // Simulate md being the active breakpoint: md props win over the xs base.
    (useBreakpointProps as jest.Mock).mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars, @typescript-eslint/no-explicit-any
      getCurrentBreakpointProps: ({ sm, md, lg, xl, xxl, defaultServerBreakpoint, ...xs }: any) => ({ ...xs, ...md }),
    });

    render(
      <InfoTooltip ariaLabel="Mobile label" md={{ ariaLabel: 'Desktop label' }}>
        Helpful hint
      </InfoTooltip>
    );

    expect(screen.getByRole('button')).toHaveAccessibleName('Desktop label');
  });
});

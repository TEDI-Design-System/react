import { render, screen } from '@testing-library/react';

import { CollapseButton, CollapseButtonSize } from './collapse-button';

import '@testing-library/jest-dom';

const iconOf = (button: HTMLElement): HTMLElement => button.querySelector('[data-name="icon"]') as HTMLElement;

describe('CollapseButton', () => {
  describe('icon size', () => {
    it.each<[CollapseButtonSize, number]>([
      ['default', 24],
      ['small', 24],
    ])('keeps the icon-only arrow at 24px in size %s', (size, iconSize) => {
      render(<CollapseButton hideText size={size} aria-label="Näita" />);

      expect(iconOf(screen.getByRole('button'))).toHaveClass(`tedi-icon--size-${iconSize}`);
    });

    it.each<[CollapseButtonSize, number]>([
      ['default', 18],
      ['small', 16],
    ])('sizes the arrow next to the text by the button size (%s: %ipx)', (size, iconSize) => {
      render(<CollapseButton size={size} />);

      expect(iconOf(screen.getByRole('button'))).toHaveClass(`tedi-icon--size-${iconSize}`);
    });

    it('draws the secondary arrow at 24px', () => {
      render(<CollapseButton hideText arrowType="secondary" aria-label="Näita" />);

      expect(iconOf(screen.getByRole('button'))).toHaveClass('tedi-icon--size-24');
    });
  });
});

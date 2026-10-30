import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import Popover, { addArrowGap } from './popover';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key) => `Mocked Label for ${key}`),
  })),
}));

describe('Popover component', () => {
  it('should render children within OverlayContent', () => {
    render(
      <Popover>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content>Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const content = screen.getByTestId('overlay-content');
    expect(content).toHaveTextContent('Content');
  });

  it('should render title when provided', () => {
    render(
      <Popover>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content title="Heading">Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const title = screen.getByText('Heading');
    expect(title).toHaveTextContent('Heading');
  });

  it('renders a title-only popover without a description wrapper', () => {
    render(
      <Popover>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content title="Heading" />
      </Popover>
    );

    fireEvent.click(screen.getByText('Trigger'));

    const content = screen.getByTestId('overlay-content');
    expect(content).toHaveTextContent('Heading');
    expect(content).not.toHaveAttribute('aria-describedby');
  });

  it('should render closing button when provided', () => {
    const mockOnToggle = jest.fn();
    const { getLabel } = useLabels();

    render(
      <Popover onToggle={mockOnToggle}>
        <Popover.Trigger>Trigger</Popover.Trigger>
        <Popover.Content close>Content</Popover.Content>
      </Popover>
    );

    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);

    const close = screen.getByTitle(getLabel('close'));
    fireEvent.click(close);

    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });

  describe('padding prop', () => {
    const openWithPadding = (padding: React.ComponentProps<typeof Popover.Content>['padding']) => {
      render(
        <Popover>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content padding={padding}>Content</Popover.Content>
        </Popover>
      );
      fireEvent.click(screen.getByText('Trigger'));
      return screen.getByTestId('overlay-content');
    };

    it('does not set padding custom properties when padding is undefined', () => {
      const content = openWithPadding(undefined);
      expect(content.style.getPropertyValue('--popover-content-padding-top')).toBe('');
    });

    it('applies a numeric padding to all four sides', () => {
      const content = openWithPadding(1);
      expect(content.style.getPropertyValue('--popover-content-padding-top')).toBe('1rem');
      expect(content.style.getPropertyValue('--popover-content-padding-right')).toBe('1rem');
      expect(content.style.getPropertyValue('--popover-content-padding-bottom')).toBe('1rem');
      expect(content.style.getPropertyValue('--popover-content-padding-left')).toBe('1rem');
    });

    it('maps a { vertical, horizontal } padding to the matching sides', () => {
      const content = openWithPadding({ vertical: 0.5, horizontal: 0 });
      expect(content.style.getPropertyValue('--popover-content-padding-top')).toBe('0.5rem');
      expect(content.style.getPropertyValue('--popover-content-padding-bottom')).toBe('0.5rem');
      expect(content.style.getPropertyValue('--popover-content-padding-right')).toBe('0rem');
      expect(content.style.getPropertyValue('--popover-content-padding-left')).toBe('0rem');
    });

    it('applies a per-side { top, right, bottom, left } padding', () => {
      const content = openWithPadding({ top: 1, right: 2, bottom: 3, left: 2.5 });
      expect(content.style.getPropertyValue('--popover-content-padding-top')).toBe('1rem');
      expect(content.style.getPropertyValue('--popover-content-padding-right')).toBe('2rem');
      expect(content.style.getPropertyValue('--popover-content-padding-bottom')).toBe('3rem');
      expect(content.style.getPropertyValue('--popover-content-padding-left')).toBe('2.5rem');
    });
  });

  describe('withArrow prop', () => {
    const openPopover = (withArrow?: boolean) => {
      render(
        <Popover withArrow={withArrow}>
          <Popover.Trigger>Trigger</Popover.Trigger>
          <Popover.Content>Content</Popover.Content>
        </Popover>
      );
      fireEvent.click(screen.getByText('Trigger'));
    };

    it('renders the arrow by default', () => {
      openPopover();
      expect(screen.getByTestId('overlay-arrow')).toBeInTheDocument();
    });

    it('omits the arrow when withArrow is false', () => {
      openPopover(false);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.queryByTestId('overlay-arrow')).not.toBeInTheDocument();
    });
  });

  describe('addArrowGap', () => {
    it('returns the offset unchanged without an arrow', () => {
      expect(addArrowGap(4, 0)).toBe(4);
    });

    it('adds the arrow height to a numeric offset', () => {
      expect(addArrowGap(4, 17)).toBe(21);
    });

    it('adds the arrow height to mainAxis of an object offset', () => {
      expect(addArrowGap({ crossAxis: 8 }, 17)).toEqual({ crossAxis: 8, mainAxis: 17 });
      expect(addArrowGap({ mainAxis: 4, alignmentAxis: 2 }, 17)).toEqual({ mainAxis: 21, alignmentAxis: 2 });
    });

    it('adds the arrow height to the value a function offset returns', () => {
      const offset = addArrowGap(() => 4, 17);
      expect(typeof offset).toBe('function');
      expect((offset as (state: never) => number)({} as never)).toBe(21);
    });
  });
});

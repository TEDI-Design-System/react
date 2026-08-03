import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentProps, createRef } from 'react';

import Tooltip, { TooltipProps } from './tooltip';

describe('Tooltip component', () => {
  const renderTooltip = (
    triggerProps: ComponentProps<typeof Tooltip.Trigger>,
    contentProps: ComponentProps<typeof Tooltip.Content>,
    tooltipProps?: Omit<TooltipProps, 'children'>
  ) => {
    return render(
      <Tooltip {...tooltipProps}>
        <Tooltip.Trigger {...triggerProps} />
        <Tooltip.Content {...contentProps} />
      </Tooltip>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct Trigger children', async () => {
    renderTooltip({ children: <span>Trigger content</span> }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    expect(trigger.tagName).toBe('SPAN');
    expect(trigger).toHaveAttribute('tabIndex', '0');
  });

  it('preserves a consumer ref on the trigger child (merged, not clobbered by the props spread)', () => {
    // Regression for #779: the merged floating-ui + consumer ref must be applied
    // after `...children.props`, so a trigger child that carries its own ref still
    // receives the DOM node (and floating-ui keeps its reference).
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tooltip>
        <Tooltip.Trigger>
          <button type="button" ref={ref}>
            Open
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content>Tip</Tooltip.Content>
      </Tooltip>
    );

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Open' }));
  });

  it('shows tooltip content on hover', async () => {
    renderTooltip({ children: 'Trigger content' }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip content on click', () => {
    renderTooltip({ children: 'Trigger content' }, { children: 'Tooltip content' }, { openWith: 'click' });

    const trigger = screen.getByText('Trigger content');
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    expect(trigger).toHaveClass('tedi-overlay__trigger--click');

    fireEvent.mouseEnter(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('clones element children with correct props', () => {
    renderTooltip({ children: <button className="custom-class">Click me</button> }, { children: 'Tooltip content' });

    const button = screen.getByText('Click me');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('passes through additional props on element children', () => {
    renderTooltip(
      {
        children: (
          <button aria-label="test button" data-testid="test-button">
            Tooltip trigger
          </button>
        ),
      },
      { children: 'Tooltip content' }
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'test button');
  });

  it('wires aria-describedby to the trigger when open (default)', () => {
    renderTooltip({ children: 'Trigger content' }, { children: 'Tooltip content' });

    const trigger = screen.getByText('Trigger content');
    fireEvent.mouseEnter(trigger);

    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-describedby');
  });

  it('is visual-only when ariaHidden: no aria-describedby on the trigger, content is aria-hidden', () => {
    renderTooltip({ children: 'Trigger content' }, { children: 'Tooltip content' }, { ariaHidden: true });

    const trigger = screen.getByText('Trigger content');
    fireEvent.mouseEnter(trigger);

    const content = screen.getByText('Tooltip content');
    expect(content).toBeInTheDocument();
    expect(trigger).not.toHaveAttribute('aria-describedby');
    expect(content.closest('[data-testid="overlay-content"]')).toHaveAttribute('aria-hidden', 'true');
  });
});

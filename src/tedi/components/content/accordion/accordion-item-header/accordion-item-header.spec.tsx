import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AccordionItem } from '../accordion-item/accordion-item';
import { AccordionItemHeader, AccordionItemHeaderProps } from './accordion-item-header';

import '@testing-library/jest-dom';

const renderHeader = (
  headerProps: AccordionItemHeaderProps = {},
  itemProps: React.ComponentProps<typeof AccordionItem> = {}
) =>
  render(
    <AccordionItem {...itemProps}>
      <AccordionItemHeader title="Hello" {...headerProps} />
      <AccordionItem.Content>Body</AccordionItem.Content>
    </AccordionItem>
  );

describe('AccordionItemHeader', () => {
  it('renders the title text', () => {
    renderHeader();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders a button trigger when headerClickable is true (default)', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /Hello|Open/ })).toBeInTheDocument();
  });

  it('renders a non-button trigger when headerClickable is false', () => {
    const { container } = renderHeader({ headerClickable: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    const toggle = container.querySelector('[aria-controls]');
    expect(toggle).not.toBeNull();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles the item when the clickable header is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('shows the open label when collapsed and the close label when expanded', async () => {
    const user = userEvent.setup();
    renderHeader({ openLabel: 'Show', closeLabel: 'Hide' });

    expect(screen.getByText('Show')).toBeInTheDocument();

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Hide')).toBeInTheDocument();
  });

  it('applies a custom headerClass on the host element', () => {
    const { container } = renderHeader({ headerClass: 'custom-header' });

    const host = container.querySelector('[data-name="accordion-item-header"]');
    expect(host).toHaveClass('custom-header');
    expect(host?.className).toMatch(/tedi-accordion-item-header/);
  });

  it('renders header slots (startAction, beforeTitle, afterTitle, endAction)', () => {
    renderHeader({
      startAction: <span data-testid="start-action">start</span>,
      beforeTitle: <span data-testid="before-title">before</span>,
      afterTitle: <span data-testid="after-title">after</span>,
      endAction: <span data-testid="end-action">end</span>,
    });

    expect(screen.getByText('start')).toBeInTheDocument();
    expect(screen.getByText('before')).toBeInTheDocument();
    expect(screen.getByText('after')).toBeInTheDocument();
    expect(screen.getByText('end')).toBeInTheDocument();
  });

  it('renders start and end description slots', () => {
    renderHeader({
      startDescription: <span data-testid="start-desc">start-desc</span>,
      endDescription: <span data-testid="end-desc">end-desc</span>,
    });

    expect(screen.getByText('start-desc')).toBeInTheDocument();
    expect(screen.getByText('end-desc')).toBeInTheDocument();
  });

  it('falls back to the LabelProvider open/close translations when labels are not set', async () => {
    const user = userEvent.setup();
    render(
      <AccordionItem>
        <AccordionItemHeader title="My item" />
        <AccordionItem.Content>Body</AccordionItem.Content>
      </AccordionItem>
    );

    expect(screen.getByText('open')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('close')).toBeInTheDocument();
  });

  it('wraps the trigger in a semantic heading element when headingLevel is set', () => {
    renderHeader({ headingLevel: 3 });

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toContainElement(screen.getByRole('button'));
  });

  it('does not render a heading wrapper by default', () => {
    renderHeader();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('throws if rendered outside an AccordionItem', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<AccordionItemHeader title="Solo" />)).toThrow(/Accordion\.Item\.Header/);
    spy.mockRestore();
  });
});

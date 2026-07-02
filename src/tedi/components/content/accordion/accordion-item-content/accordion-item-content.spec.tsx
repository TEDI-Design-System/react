import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { AccordionItem } from '../accordion-item/accordion-item';
import { AccordionItemContent } from './accordion-item-content';

import '@testing-library/jest-dom';

describe('AccordionItemContent', () => {
  it('projects its children inside the content panel', () => {
    render(
      <AccordionItem>
        <AccordionItem.Header title="Hello" />
        <AccordionItemContent>Body content</AccordionItemContent>
      </AccordionItem>
    );

    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('wires content id to the trigger aria-controls and ARIA references', () => {
    const { container } = render(
      <AccordionItem>
        <AccordionItem.Header title="Hello" />
        <AccordionItemContent>Body content</AccordionItemContent>
      </AccordionItem>
    );

    const trigger = screen.getByRole('button');
    const content = container.querySelector('[data-name="accordion-item-content"]') as HTMLElement;

    expect(content).toBeInTheDocument();
    expect(content.id).toBeTruthy();
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(content.getAttribute('aria-labelledby')).toBe(trigger.id);
  });

  it('toggles aria-hidden and inert with the expanded state', async () => {
    const user = userEvent.setup();
    render(
      <AccordionItem>
        <AccordionItem.Header title="Hello" />
        <AccordionItemContent>Body content</AccordionItemContent>
      </AccordionItem>
    );

    const trigger = screen.getByRole('button');
    const content = document.getElementById(trigger.getAttribute('aria-controls')!) as HTMLElement;
    expect(content.getAttribute('aria-hidden')).toBe('true');
    expect(content.hasAttribute('inert')).toBe(true);
    expect(content.getAttribute('role')).toBeNull();

    await user.click(screen.getByRole('button'));

    expect(content.getAttribute('aria-hidden')).toBe('false');
    expect(content.hasAttribute('inert')).toBe(false);
    expect(content.getAttribute('role')).toBe('region');
  });

  it('applies a custom contentClass on the host', () => {
    render(
      <AccordionItem>
        <AccordionItem.Header title="Hello" />
        <AccordionItemContent contentClass="custom-content">Body</AccordionItemContent>
      </AccordionItem>
    );

    const trigger = screen.getByRole('button');
    const content = document.getElementById(trigger.getAttribute('aria-controls')!) as HTMLElement;
    expect(content).toHaveClass('custom-content');
    expect(content.className).toMatch(/tedi-accordion-item-content/);
  });

  it('applies the with-icon-card modifier when the parent item enables the icon card', () => {
    render(
      <AccordionItem showIconCard iconCard={<span>icon</span>}>
        <AccordionItem.Header title="Hello" />
        <AccordionItemContent>Body</AccordionItemContent>
      </AccordionItem>
    );

    const trigger = screen.getByRole('button');
    const content = document.getElementById(trigger.getAttribute('aria-controls')!) as HTMLElement;
    expect(content.className).toMatch(/with-icon-card/);
  });

  it('throws if rendered outside an AccordionItem', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<AccordionItemContent>Body</AccordionItemContent>)).toThrow(/Accordion\.Item\.Content/);
    spy.mockRestore();
  });
});

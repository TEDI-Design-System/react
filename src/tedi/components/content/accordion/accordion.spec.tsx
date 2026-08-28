import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { useBreakpointProps } from '../../../helpers';
import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item/accordion-item';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

beforeEach(() => {
  (useBreakpointProps as jest.Mock).mockReturnValue({
    getCurrentBreakpointProps: jest.fn((props) => props),
  });
});

const renderItem = (title: string, key?: React.Key) => (
  <AccordionItem key={key}>
    <AccordionItem.Header title={title} />
    <AccordionItem.Content>Body for {title}</AccordionItem.Content>
  </AccordionItem>
);

describe('Accordion', () => {
  it('renders an Accordion with multiple items', () => {
    render(
      <Accordion>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
        {renderItem('Item 3', 3)}
      </Accordion>
    );

    expect(screen.getByTestId('tedi-accordion')).toBeInTheDocument();
    expect(screen.getAllByTestId('tedi-accordion-item')).toHaveLength(3);
  });

  it('expands the clicked item', async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
      </Accordion>
    );

    const buttons = screen.getAllByRole('button', { expanded: false });
    expect(buttons).toHaveLength(2);

    await user.click(buttons[0]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an expanded item when toggled again', async () => {
    const user = userEvent.setup();

    render(<Accordion>{renderItem('Item 1', 1)}</Accordion>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('collapses other items in single-expand mode (allowMultiple=false)', async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
        {renderItem('Item 3', 3)}
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');

    await user.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows multiple items to be expanded simultaneously when allowMultiple=true', async () => {
    const user = userEvent.setup();

    render(
      <Accordion allowMultiple>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
        {renderItem('Item 3', 3)}
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies a custom className to the accordion root', () => {
    render(<Accordion className="custom-accordion">{renderItem('Item', 1)}</Accordion>);

    expect(screen.getByTestId('tedi-accordion')).toHaveClass('custom-accordion');
  });

  it('expands every item initially when allowMultiple + defaultExpanded are set on the group', () => {
    render(
      <Accordion allowMultiple defaultExpanded>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
        {renderItem('Item 3', 3)}
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('exposes itemGap (in rem) as the --tedi-accordion-item-gap CSS variable on the root', () => {
    render(
      <Accordion itemGap={1.5}>
        {renderItem('Item 1', 1)}
        {renderItem('Item 2', 2)}
      </Accordion>
    );

    const root = screen.getByTestId('tedi-accordion');
    expect(root.style.getPropertyValue('--tedi-accordion-item-gap')).toBe('1.5rem');
  });

  it('does not set --tedi-accordion-item-gap when itemGap is omitted (falls back to :root default)', () => {
    render(<Accordion>{renderItem('Item', 1)}</Accordion>);

    const root = screen.getByTestId('tedi-accordion');
    expect(root.style.getPropertyValue('--tedi-accordion-item-gap')).toBe('');
  });

  it('accepts BreakpointSupport props (per-breakpoint overrides + defaultServerBreakpoint) without crashing', () => {
    render(
      <Accordion
        defaultServerBreakpoint="lg"
        itemGap={0.5}
        allowMultiple={false}
        lg={{ itemGap: 2, allowMultiple: true }}
        md={{ itemGap: 1 }}
      >
        {renderItem('Item', 1)}
      </Accordion>
    );

    const root = screen.getByTestId('tedi-accordion');
    expect(root.style.getPropertyValue('--tedi-accordion-item-gap')).toBe('0.5rem');
  });

  it('lets per-item defaultExpanded={false} opt out of the group default', () => {
    render(
      <Accordion allowMultiple defaultExpanded>
        <AccordionItem>
          <AccordionItem.Header title="Open by group default" />
          <AccordionItem.Content>Body</AccordionItem.Content>
        </AccordionItem>
        <AccordionItem defaultExpanded={false}>
          <AccordionItem.Header title="Closed by explicit override" />
          <AccordionItem.Content>Body</AccordionItem.Content>
        </AccordionItem>
      </Accordion>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });
});

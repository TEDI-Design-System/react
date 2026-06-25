import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Accordion } from '../accordion';
import { AccordionItem } from './accordion-item';

import '@testing-library/jest-dom';

const renderWithHeader = (props: React.ComponentProps<typeof AccordionItem> = {}) =>
  render(
    <AccordionItem {...props}>
      <AccordionItem.Header title="My item" />
      <AccordionItem.Content>Body content</AccordionItem.Content>
    </AccordionItem>
  );

describe('AccordionItem', () => {
  it('renders with default props (collapsed)', () => {
    renderWithHeader();

    expect(screen.getByTestId('tedi-accordion-item')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('is expanded initially when defaultExpanded is true', () => {
    renderWithHeader({ defaultExpanded: true });

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles expanded state when the header trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithHeader();

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('applies the selected modifier when selected=true', () => {
    renderWithHeader({ selected: true });

    expect(screen.getByTestId('tedi-accordion-item').className).toMatch(/selected/);
  });

  it('renders the iconCard slot when showIconCard is true', () => {
    render(
      <AccordionItem showIconCard iconCard={<span data-testid="icon-card-content">icon</span>}>
        <AccordionItem.Header title="My item" />
        <AccordionItem.Content>Body</AccordionItem.Content>
      </AccordionItem>
    );

    expect(screen.getByTestId('icon-card-content')).toBeInTheDocument();
  });

  it('does not render the iconCard slot when showIconCard is false', () => {
    render(
      <AccordionItem iconCard={<span data-testid="icon-card-content">icon</span>}>
        <AccordionItem.Header title="My item" />
        <AccordionItem.Content>Body</AccordionItem.Content>
      </AccordionItem>
    );

    expect(screen.queryByTestId('icon-card-content')).not.toBeInTheDocument();
  });

  it('cannot be toggled when disabled', async () => {
    const user = userEvent.setup();
    renderWithHeader({ disabled: true });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('preserves defaultExpanded even when disabled', () => {
    renderWithHeader({ disabled: true, defaultExpanded: true });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toBeDisabled();
  });

  it('opens automatically when location.hash matches id and openOnHashMatch is true', () => {
    const originalHash = window.location.hash;
    window.location.hash = '#deep-link-target';

    try {
      render(
        <AccordionItem id="deep-link-target" openOnHashMatch>
          <AccordionItem.Header title="Linkable" />
          <AccordionItem.Content>Body</AccordionItem.Content>
        </AccordionItem>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
    } finally {
      window.location.hash = originalHash;
    }
  });

  it('ignores openOnHashMatch when no explicit id is provided', () => {
    const originalHash = window.location.hash;
    window.location.hash = '#anything';

    try {
      render(
        <AccordionItem openOnHashMatch>
          <AccordionItem.Header title="Linkable" />
          <AccordionItem.Content>Body</AccordionItem.Content>
        </AccordionItem>
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    } finally {
      window.location.hash = originalHash;
    }
  });

  it('supports controlled expanded state via `expanded` + `onToggle`', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    const { rerender } = render(
      <AccordionItem expanded={false} onToggle={onToggle}>
        <AccordionItem.Header title="My item" />
        <AccordionItem.Content>Body</AccordionItem.Content>
      </AccordionItem>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(onToggle).toHaveBeenCalledWith(true);

    rerender(
      <AccordionItem expanded={true} onToggle={onToggle}>
        <AccordionItem.Header title="My item" />
        <AccordionItem.Content>Body</AccordionItem.Content>
      </AccordionItem>
    );

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an uncontrolled sibling when another item expands (single-expand mode)', async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        <AccordionItem id="item-a">
          <AccordionItem.Header title="Item A" />
          <AccordionItem.Content>Body A</AccordionItem.Content>
        </AccordionItem>
        <AccordionItem id="item-b" defaultExpanded>
          <AccordionItem.Header title="Item B" />
          <AccordionItem.Content>Body B</AccordionItem.Content>
        </AccordionItem>
      </Accordion>
    );

    const triggerA = screen.getByRole('button', { name: /item a/i });
    const triggerB = screen.getByRole('button', { name: /item b/i });

    expect(triggerB).toHaveAttribute('aria-expanded', 'true');

    await user.click(triggerA);

    expect(triggerA).toHaveAttribute('aria-expanded', 'true');
    expect(triggerB).toHaveAttribute('aria-expanded', 'false');
  });

  it('forwards parent collapse via onToggle when controlled and another sibling expands', async () => {
    const user = userEvent.setup();
    const onToggleA = jest.fn();
    const onToggleB = jest.fn();

    render(
      <Accordion>
        <AccordionItem id="item-a" expanded={false} onToggle={onToggleA}>
          <AccordionItem.Header title="Item A" />
          <AccordionItem.Content>Body A</AccordionItem.Content>
        </AccordionItem>
        <AccordionItem id="item-b" expanded={true} onToggle={onToggleB}>
          <AccordionItem.Header title="Item B" />
          <AccordionItem.Content>Body B</AccordionItem.Content>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByRole('button', { name: /item a/i }));

    expect(onToggleA).toHaveBeenCalledWith(true);
    expect(onToggleB).toHaveBeenCalledWith(false);
  });

  it('calls onToggle(true) when controlled, collapsed, and the URL hash matches', () => {
    const originalHash = window.location.hash;
    window.location.hash = '#controlled-deep-link';
    const onToggle = jest.fn();

    try {
      render(
        <AccordionItem id="controlled-deep-link" openOnHashMatch expanded={false} onToggle={onToggle}>
          <AccordionItem.Header title="Linkable" />
          <AccordionItem.Content>Body</AccordionItem.Content>
        </AccordionItem>
      );

      expect(onToggle).toHaveBeenCalledWith(true);
      expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
    } finally {
      window.location.hash = originalHash;
    }
  });
});

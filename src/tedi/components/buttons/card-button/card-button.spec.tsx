import { render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { CardButton } from './card-button';

import '@testing-library/jest-dom';

describe('CardButton', () => {
  it('renders a <button> with type="button" by default', () => {
    render(<CardButton>Label</CardButton>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('keeps an explicit button type', () => {
    render(<CardButton type="submit">Submit</CardButton>);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  it('renders an <a> with href and no type when as="a"', () => {
    render(
      <CardButton as="a" href="#target">
        Link
      </CardButton>
    );
    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('href', '#target');
    expect(link).not.toHaveAttribute('type');
  });

  it('supports the disabled state on the button host', () => {
    render(<CardButton disabled>Disabled</CardButton>);
    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('merges a custom className with the component class', () => {
    render(<CardButton className="custom">Label</CardButton>);
    const button = screen.getByRole('button', { name: 'Label' });
    expect(button.className).toContain('custom');
    expect(button).toHaveAttribute('data-name', 'card-button');
  });

  it('forwards the ref to the host element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<CardButton ref={ref}>Label</CardButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders the projected content', () => {
    render(
      <CardButton>
        <span>Card content</span>
      </CardButton>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });
});

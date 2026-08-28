import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';

import { HorizontalStepper } from './horizontal-stepper';

import '@testing-library/jest-dom';

const renderStepper = (props?: Partial<Parameters<typeof HorizontalStepper>[0]>) =>
  render(
    <HorizontalStepper aria-label="Form progress" {...props}>
      <HorizontalStepper.Item label="Kutse" completed />
      <HorizontalStepper.Item label="Tahteavaldus" selected />
      <HorizontalStepper.Item label="Geenianalüüs" />
      <HorizontalStepper.Item label="Vastus" />
    </HorizontalStepper>
  );

describe('HorizontalStepper', () => {
  it('renders a navigation landmark with the accessible name', () => {
    renderStepper();
    expect(screen.getByRole('navigation', { name: 'Form progress' })).toBeInTheDocument();
  });

  it('auto-numbers the steps that have no completed/error indicator', () => {
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="One" />
        <HorizontalStepper.Item label="Two" />
        <HorizontalStepper.Item label="Three" />
      </HorizontalStepper>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks the selected step with aria-current="step"', () => {
    renderStepper();
    expect(screen.getByRole('button', { name: /Tahteavaldus/ })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: /Vastus/ })).not.toHaveAttribute('aria-current');
  });

  it('shows the completed indicator instead of a number for completed steps', () => {
    renderStepper();
    expect(screen.getByRole('img', { name: 'stepper.completed' })).toBeInTheDocument();
  });

  it('shows the error indicator and lets error take precedence over completed', () => {
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="Broken" completed error />
      </HorizontalStepper>
    );
    expect(screen.getByRole('img', { name: 'stepper.error' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'stepper.completed' })).not.toBeInTheDocument();
  });

  it('fires onSelect when a non-selected, enabled step is clicked', () => {
    const onSelect = jest.fn();
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="One" onSelect={onSelect} />
      </HorizontalStepper>
    );
    fireEvent.click(screen.getByRole('button', { name: /One/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('does not fire onSelect for the selected step', () => {
    const onSelect = jest.fn();
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="Current" selected onSelect={onSelect} />
      </HorizontalStepper>
    );
    fireEvent.click(screen.getByRole('button', { name: /Current/ }));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('disables the step button and never fires onSelect when disabled', () => {
    const onSelect = jest.fn();
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="Locked" disabled onSelect={onSelect} />
      </HorizontalStepper>
    );
    const button = screen.getByRole('button', { name: /Locked/ });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders the description text', () => {
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="Step" description="Ametnik täidab" />
      </HorizontalStepper>
    );
    expect(screen.getByText('Ametnik täidab')).toBeInTheDocument();
  });

  it('applies a custom className to the item root', () => {
    render(
      <HorizontalStepper aria-label="Steps">
        <HorizontalStepper.Item label="Step" className="my-step" />
      </HorizontalStepper>
    );
    expect(screen.getByRole('listitem')).toHaveClass('my-step');
  });

  it('forwards a ref to the nav element', () => {
    const stepperRef = createRef<HTMLElement>();
    render(
      <HorizontalStepper aria-label="Steps" ref={stepperRef}>
        <HorizontalStepper.Item label="Step" />
      </HorizontalStepper>
    );
    expect(stepperRef.current?.tagName).toBe('NAV');
  });
});

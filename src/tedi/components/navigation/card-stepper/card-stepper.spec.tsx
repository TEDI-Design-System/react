/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, within } from '@testing-library/react';

import { CardStepper, CardStepperStepProps } from './card-stepper';

import '@testing-library/jest-dom';

jest.mock('../../overlays/modal/modal', () => {
  const Modal = ({ open, children }: any) => (open ? <div role="dialog">{children}</div> : null);
  Modal.Content = ({ children }: any) => <div>{children}</div>;
  Modal.Header = ({ children }: any) => <h2>{children}</h2>;
  Modal.Body = ({ children }: any) => <div>{children}</div>;
  return { Modal };
});

const STEPS: CardStepperStepProps[] = [
  { title: 'Personal data', state: 'completed' },
  { title: 'Contacts', description: 'Phone and email', state: 'completed' },
  { title: 'Review' },
  { title: 'Done' },
];

describe('CardStepper', () => {
  it('shows the active step title, description and counter', () => {
    render(<CardStepper steps={STEPS} activeStep={1} aria-label="Wizard" />);
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument();
    expect(screen.getByText('Phone and email')).toBeInTheDocument();
    expect(screen.getByText('2 / 4')).toBeInTheDocument();
  });

  it('supports the compound API via CardStepper.Step children', () => {
    render(
      <CardStepper activeStep={1} aria-label="Wizard">
        <CardStepper.Step title="Personal data" state="completed" />
        <CardStepper.Step title="Contacts" description="Phone and email" state="completed" />
        <CardStepper.Step title="Review" />
      </CardStepper>
    );
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument();
    expect(screen.getByText('Phone and email')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('shows the active step number indicator by default and hides it when showStepNumber=false', () => {
    const { container, rerender } = render(<CardStepper steps={STEPS} activeStep={2} aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__indicator')).toHaveTextContent('3');

    rerender(<CardStepper steps={STEPS} activeStep={2} showStepNumber={false} aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__indicator')).not.toBeInTheDocument();
  });

  it('renders one segment per step, filled up to and including the active step', () => {
    const { container } = render(<CardStepper steps={STEPS} activeStep={2} aria-label="Wizard" />);
    expect(container.querySelectorAll('.tedi-card-stepper__segment')).toHaveLength(4);
    // "3 / 4" → 3 filled (the active step plus the two before it).
    expect(container.querySelectorAll('.tedi-card-stepper__segment--done')).toHaveLength(3);
  });

  it('hides the progress bar when showProgress=false', () => {
    const { container } = render(<CardStepper steps={STEPS} activeStep={2} showProgress={false} aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__progress')).not.toBeInTheDocument();
  });

  it('navigates with the arrows and disables them at the bounds', () => {
    const onStepChange = jest.fn();
    const { rerender } = render(
      <CardStepper steps={STEPS} activeStep={0} showNavigation onStepChange={onStepChange} aria-label="Wizard" />
    );
    expect(screen.getByRole('button', { name: 'stepper.previous' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'stepper.next' }));
    expect(onStepChange).toHaveBeenCalledWith(1);

    rerender(
      <CardStepper steps={STEPS} activeStep={3} showNavigation onStepChange={onStepChange} aria-label="Wizard" />
    );
    expect(screen.getByRole('button', { name: 'stepper.next' })).toBeDisabled();
  });

  it('hides the step-number indicator when navigation arrows are shown', () => {
    const { container } = render(
      <CardStepper steps={STEPS} activeStep={2} showNavigation showStepNumber aria-label="Wizard" />
    );
    expect(container.querySelector('.tedi-card-stepper__indicator')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'stepper.previous' })).toBeInTheDocument();
  });

  it('has no arrows by default', () => {
    render(<CardStepper steps={STEPS} activeStep={0} aria-label="Wizard" />);
    expect(screen.queryByRole('button', { name: 'stepper.next' })).not.toBeInTheDocument();
  });

  it('works uncontrolled via defaultActiveStep', () => {
    render(<CardStepper steps={STEPS} defaultActiveStep={0} showNavigation aria-label="Wizard" />);
    expect(screen.getByRole('heading', { name: 'Personal data' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'stepper.next' }));
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument();
  });

  it('opens the step-list modal and lets the user jump to a step', () => {
    const onStepChange = jest.fn();
    render(<CardStepper steps={STEPS} activeStep={1} onStepChange={onStepChange} aria-label="Wizard" />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'stepper.open-steps' }));

    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: /Review/ }));
    expect(onStepChange).toHaveBeenCalledWith(2);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('exposes a screen-reader step status and dialog semantics on the list button', () => {
    render(<CardStepper steps={STEPS} activeStep={1} aria-label="Wizard" />);
    // "2 / 4" is hidden from AT; an unambiguous phrasing is exposed instead.
    expect(screen.getByText('stepper.status')).toBeInTheDocument();
    const listButton = screen.getByRole('button', { name: 'stepper.open-steps' });
    expect(listButton).toHaveAttribute('aria-haspopup', 'dialog');
    expect(listButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('hides the list button (and modal) when showStepList=false', () => {
    render(<CardStepper steps={STEPS} activeStep={1} showStepList={false} aria-label="Wizard" />);
    expect(screen.queryByRole('button', { name: 'stepper.open-steps' })).not.toBeInTheDocument();
  });

  it('only lets navigable steps be jumped to when allowJump="completed"', () => {
    render(<CardStepper steps={STEPS} activeStep={1} allowJump="completed" aria-label="Wizard" />);
    fireEvent.click(screen.getByRole('button', { name: 'stepper.open-steps' }));
    const dialog = screen.getByRole('dialog');
    // Completed steps are clickable…
    expect(within(dialog).getByRole('button', { name: /Personal data/ })).toBeInTheDocument();
    // …a not-yet-reached (default) step is not.
    expect(within(dialog).queryByRole('button', { name: /Done/ })).not.toBeInTheDocument();
  });

  it('skips disabled steps with the arrows and disables them in the list', () => {
    const onStepChange = jest.fn();
    const steps: CardStepperStepProps[] = [
      { title: 'One', state: 'completed' },
      { title: 'Two', disabled: true },
      { title: 'Three' },
    ];
    render(<CardStepper steps={steps} activeStep={0} showNavigation onStepChange={onStepChange} aria-label="Wizard" />);

    // Next skips the disabled step and lands on index 2.
    fireEvent.click(screen.getByRole('button', { name: 'stepper.next' }));
    expect(onStepChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByRole('button', { name: 'stepper.open-steps' }));
    expect(within(screen.getByRole('dialog')).queryByRole('button', { name: /Two/ })).not.toBeInTheDocument();
  });

  it('renders the title with the configured heading element', () => {
    render(<CardStepper steps={STEPS} activeStep={0} headingElement="h2" aria-label="Wizard" />);
    expect(screen.getByRole('heading', { level: 2, name: /Personal data/ })).toBeInTheDocument();
  });

  it('overrides accessible labels via the labels prop', () => {
    render(
      <CardStepper
        steps={STEPS}
        activeStep={0}
        showNavigation
        labels={{ next: 'Järgmine samm', openSteps: 'Ava sammud' }}
        aria-label="Wizard"
      />
    );
    expect(screen.getByRole('button', { name: 'Järgmine samm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ava sammud' })).toBeInTheDocument();
  });

  it('shows a status icon for the active step only when showStatusIcon is set and the state warrants it', () => {
    const { container, rerender } = render(
      <CardStepper
        steps={[{ title: 'One', state: 'completed' }, { title: 'Two' }]}
        activeStep={0}
        showStatusIcon
        aria-label="Wizard"
      />
    );
    expect(container.querySelector('.tedi-card-stepper__status-icon')).toHaveTextContent('check');

    rerender(
      <CardStepper steps={[{ title: 'One', state: 'error' }]} activeStep={0} showStatusIcon aria-label="Wizard" />
    );
    expect(container.querySelector('.tedi-card-stepper__status-icon')).toHaveTextContent('error');

    rerender(<CardStepper steps={[{ title: 'One' }]} activeStep={0} showStatusIcon aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__status-icon')).not.toBeInTheDocument();

    rerender(<CardStepper steps={[{ title: 'One', state: 'completed' }]} activeStep={0} aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__status-icon')).not.toBeInTheDocument();
  });

  it('places the description below the title by default and above it when infoPosition="top"', () => {
    const steps: CardStepperStepProps[] = [{ title: 'One', description: 'Helper' }];
    const { container, rerender } = render(<CardStepper steps={steps} activeStep={0} aria-label="Wizard" />);
    expect(container.querySelector('.tedi-card-stepper__description-bottom')).toBeInTheDocument();
    expect(container.querySelector('.tedi-card-stepper__top')).not.toBeInTheDocument();

    rerender(<CardStepper steps={steps} activeStep={0} infoPosition="top" aria-label="Wizard" />);
    const top = container.querySelector('.tedi-card-stepper__top');
    expect(top).toBeInTheDocument();
    expect(top).toHaveTextContent('Helper');
    expect(container.querySelector('.tedi-card-stepper__description-bottom')).not.toBeInTheDocument();
  });

  it('moves the N / M counter above the title when counterPosition="top"', () => {
    const steps: CardStepperStepProps[] = [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }];
    const { container } = render(
      <CardStepper steps={steps} activeStep={1} counterPosition="top" aria-label="Wizard" />
    );
    const top = container.querySelector('.tedi-card-stepper__top');
    expect(top).toHaveTextContent('2 / 3');
    expect(container.querySelector('.tedi-card-stepper__trail')).not.toHaveTextContent('2 / 3');
  });

  it('renders only the active step bottomSlot', () => {
    const steps: CardStepperStepProps[] = [
      { title: 'One', bottomSlot: <span>slot-one</span> },
      { title: 'Two', bottomSlot: <span>slot-two</span> },
    ];
    const { rerender } = render(<CardStepper steps={steps} activeStep={0} aria-label="Wizard" />);
    expect(screen.getByText('slot-one')).toBeInTheDocument();
    expect(screen.queryByText('slot-two')).not.toBeInTheDocument();

    rerender(<CardStepper steps={steps} activeStep={1} aria-label="Wizard" />);
    expect(screen.getByText('slot-two')).toBeInTheDocument();
  });
});

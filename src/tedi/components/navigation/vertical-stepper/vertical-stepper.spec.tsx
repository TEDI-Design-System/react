import { fireEvent, render as rtlRender, screen, within } from '@testing-library/react';

import { PrintingProvider } from '../../../providers/printing-provider/printing-provider';
import { VerticalStepper } from './vertical-stepper';

import '@testing-library/jest-dom';

const render = (ui: JSX.Element) => rtlRender(<PrintingProvider>{ui}</PrintingProvider>);

describe('VerticalStepper', () => {
  it('renders a nav landmark with an accessible name', () => {
    render(
      <VerticalStepper aria-label="Application progress">
        <VerticalStepper.Item title="Step one" />
      </VerticalStepper>
    );
    expect(screen.getByRole('navigation', { name: 'Application progress' })).toBeInTheDocument();
  });

  it('auto-numbers the items in source order', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="First" />
        <VerticalStepper.Item title="Second" />
        <VerticalStepper.Item title="Third" />
      </VerticalStepper>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks the active step with aria-current="step"', () => {
    const { container } = render(
      <VerticalStepper>
        <VerticalStepper.Item title="First" state="completed" />
        <VerticalStepper.Item title="Second" current />
      </VerticalStepper>
    );
    const current = container.querySelector('[aria-current="step"]');
    expect(current).toHaveTextContent('Second');
    expect(container.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
  });

  it('puts aria-current on the focusable link for an interactive current step', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="First" state="completed" href="#1" />
        <VerticalStepper.Item title="Second" current href="#2" />
      </VerticalStepper>
    );
    // Announced on focus: the marker is on the link itself, not the wrapping <li>.
    const link = screen.getByRole('link', { name: /Second/ });
    expect(link).toHaveAttribute('aria-current', 'step');
    expect(link.closest('li')).not.toHaveAttribute('aria-current');
  });

  it('shows a completed check icon with a screen-reader label', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Done step" state="completed" />
      </VerticalStepper>
    );
    expect(screen.getByRole('img', { name: 'stepper.completed' })).toBeInTheDocument();
  });

  it('shows an error icon with a screen-reader label', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Bad step" state="error" />
      </VerticalStepper>
    );
    expect(screen.getByRole('img', { name: 'stepper.error' })).toBeInTheDocument();
  });

  it('renders an interactive button and fires onClick', () => {
    const onClick = jest.fn();
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Clickable" onClick={onClick} />
      </VerticalStepper>
    );
    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders an anchor when href is set', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Link step" href="/step-1" />
      </VerticalStepper>
    );
    expect(screen.getByRole('link', { name: 'Link step' })).toHaveAttribute('href', '/step-1');
  });

  it('renders a disabled step as non-interactive text and announces it to screen readers', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Disabled step" state="disabled" onClick={() => undefined} />
      </VerticalStepper>
    );
    expect(screen.queryByRole('button', { name: 'Disabled step' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Disabled step' })).not.toBeInTheDocument();
    expect(screen.getByText('Disabled step')).toBeInTheDocument();
    expect(screen.getByText(/stepper\.disabled/)).toBeInTheDocument();
  });

  it('renders sub-steps under an expandable parent and toggles them', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent">
          <VerticalStepper.SubItem title="Child A" />
          <VerticalStepper.SubItem title="Child B" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    const toggle = screen.getByRole('button', { name: /Parent/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Child A')).toBeInTheDocument();
    expect(screen.getByText('Child B')).toBeInTheDocument();
  });

  it('supports a controlled open sub-step list via open + onToggle', () => {
    const onToggle = jest.fn();
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" open onToggle={onToggle}>
          <VerticalStepper.SubItem title="Visible child" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    expect(screen.getByText('Visible child')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Parent/ }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('renders the info slot content', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="With info" info={<span>extra detail</span>} />
      </VerticalStepper>
    );
    expect(screen.getByText('extra detail')).toBeInTheDocument();
  });

  it('renders the description line', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Has description" description="Takes up to 30 days" />
      </VerticalStepper>
    );
    expect(screen.getByText('Takes up to 30 days')).toBeInTheDocument();
  });

  it('shows the state icon inside the indicator (not the number) in compact mode', () => {
    const { container } = render(
      <VerticalStepper compact>
        <VerticalStepper.Item title="Done" state="completed" />
      </VerticalStepper>
    );
    expect(container.querySelector('.tedi-vertical-stepper--compact')).toBeInTheDocument();
    expect(container.querySelector('.tedi-vertical-stepper__number')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'stepper.completed' })).toBeInTheDocument();
  });

  it('renders an informative sub-item as non-interactive text', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" defaultOpen>
          <VerticalStepper.SubItem title="Filled by official" state="informative" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    const region = screen.getByText('Filled by official');
    expect(within(region.closest('li') as HTMLElement).queryByRole('button')).not.toBeInTheDocument();
    expect(within(region.closest('li') as HTMLElement).queryByRole('link')).not.toBeInTheDocument();
  });
});

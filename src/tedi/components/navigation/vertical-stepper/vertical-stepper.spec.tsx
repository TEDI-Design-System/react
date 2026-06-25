import { fireEvent, render as rtlRender, screen, within } from '@testing-library/react';
import { createRef } from 'react';

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
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="First" state="completed" />
        <VerticalStepper.Item title="Second" current />
      </VerticalStepper>
    );
    // getByRole enforces a single match, so this also asserts only one current step.
    const current = screen.getByRole('listitem', { current: 'step' });
    expect(current).toHaveTextContent('Second');
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

  it('lets a parent step be a link alongside its expand toggle', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" href="/parent">
          <VerticalStepper.SubItem title="Child A" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    // The title navigates...
    expect(screen.getByRole('link', { name: /Parent/ })).toHaveAttribute('href', '/parent');
    // ...while a separate toggle expands the sub-steps.
    const toggle = screen.getByRole('button', { name: /Parent/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByText('Child A')).toBeInTheDocument();
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

  it('renders an interactive sub-item as a link (href) or button (onClick) and marks current on the focusable element', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" defaultOpen>
          <VerticalStepper.SubItem title="Linked" href="/sub" current />
          <VerticalStepper.SubItem title="Clicked" onClick={() => undefined} />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    const link = screen.getByRole('link', { name: /Linked/ });
    expect(link).toHaveAttribute('href', '/sub');
    expect(link).toHaveAttribute('aria-current', 'step');
    expect(link.closest('li')).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('button', { name: /Clicked/ })).toBeInTheDocument();
  });

  it('shows the completed / error glyphs on sub-items and keeps a disabled sub-item non-interactive', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" defaultOpen>
          <VerticalStepper.SubItem title="Done sub" state="completed" onClick={() => undefined} />
          <VerticalStepper.SubItem title="Error sub" state="error" onClick={() => undefined} />
          <VerticalStepper.SubItem title="Off sub" state="disabled" onClick={() => undefined} />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    expect(screen.getByRole('img', { name: 'stepper.completed' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'stepper.error' })).toBeInTheDocument();
    const off = screen.getByText('Off sub').closest('li') as HTMLElement;
    expect(within(off).queryByRole('button')).not.toBeInTheDocument();
    expect(within(off).getByText(/stepper\.disabled/)).toBeInTheDocument();
  });

  it('renders sub-item info slot content', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="Parent" defaultOpen>
          <VerticalStepper.SubItem title="Sub" info={<span>sub detail</span>} />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    expect(screen.getByText('sub detail')).toBeInTheDocument();
  });

  it('shows the error icon inside the indicator in compact mode', () => {
    render(
      <VerticalStepper compact>
        <VerticalStepper.Item title="Err" state="error" />
      </VerticalStepper>
    );
    expect(screen.getByRole('img', { name: 'stepper.error' })).toBeInTheDocument();
  });

  it('renders an empty indicator (no number, no glyph) for a default step in compact mode', () => {
    const { container } = render(
      <VerticalStepper compact>
        <VerticalStepper.Item title="Plain" />
      </VerticalStepper>
    );
    expect(container.querySelector('.tedi-vertical-stepper__number')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('passes non-Item children (e.g. a separator) through unchanged and only numbers items', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title="One" />
        <hr />
        <VerticalStepper.Item title="Two" />
      </VerticalStepper>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('forwards refs to the underlying <li> of an item and a sub-item', () => {
    const itemRef = createRef<HTMLLIElement>();
    const subItemRef = createRef<HTMLLIElement>();
    render(
      <VerticalStepper>
        <VerticalStepper.Item ref={itemRef} title="Parent" defaultOpen>
          <VerticalStepper.SubItem ref={subItemRef} title="Child" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
    expect(subItemRef.current).toBeInstanceOf(HTMLLIElement);
  });

  it('supports a non-string parent title (the toggle derives no text label)', () => {
    render(
      <VerticalStepper>
        <VerticalStepper.Item title={<span>Node title</span>} defaultOpen>
          <VerticalStepper.SubItem title="Child" />
        </VerticalStepper.Item>
      </VerticalStepper>
    );
    expect(screen.getByText('Node title')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});

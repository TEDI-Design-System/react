import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';

import { useBreakpointProps } from '../../../helpers';
import { Sheet } from './sheet';
import { useSheet } from './sheet-context';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => (key === 'close' ? 'Close' : `Mocked label: ${key}`)),
  })),
}));

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useBreakpointProps: jest.fn(),
}));

describe('Sheet', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: (props: Record<string, unknown>) => props,
    });
  });

  beforeAll(() => {
    class PointerEventPolyfill extends MouseEvent {
      pointerId: number;
      constructor(type: string, params: PointerEventInit = {}) {
        super(type, params);
        this.pointerId = params.pointerId ?? 0;
      }
    }
    window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
    HTMLElement.prototype.setPointerCapture = jest.fn();
    HTMLElement.prototype.releasePointerCapture = jest.fn();
  });

  it('opens on trigger click and renders body content', () => {
    render(
      <Sheet>
        <Sheet.Trigger>
          <button type="button">Open</button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('wires the header title to the dialog via aria-labelledby', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Title text" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const dialog = screen.getByRole('dialog');
    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(document.getElementById(labelledBy as string)).toHaveTextContent('Title text');
  });

  it('keeps a Content aria-label when the header renders custom children (no built-in title)', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content aria-label="Custom labelled sheet">
          <Sheet.Header>
            <span>Fully custom header</span>
          </Sheet.Header>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-label', 'Custom labelled sheet');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('keeps the Content aria-label when the header has both a title and custom children', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content aria-label="Custom labelled sheet">
          <Sheet.Header title="Ignored title">
            <span>Fully custom header</span>
          </Sheet.Header>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-label', 'Custom labelled sheet');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });

  it('falls back to aria-label when no header title is set', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content aria-label="Themes">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Themes');
  });

  it('closes when the header close button is clicked', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes on Escape', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('renders the drag handle by default and hides it when showHandle is false', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[data-name="sheet-handle"]')).toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content showHandle={false}>
          <Sheet.Header title="Layers" />
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[data-name="sheet-handle"]')).not.toBeInTheDocument();
  });

  it('collapses the body and footer via the header toggle', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
          <Sheet.Footer>Footer content</Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByText('Body content')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(screen.getByText('Body content')).not.toBeVisible();
    expect(screen.getByText('Footer content')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.expand' }));
    expect(screen.getByText('Body content')).toBeVisible();
  });

  it('keeps body state across collapse and expand', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>
            <input aria-label="Note" />
          </Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.change(screen.getByLabelText('Note'), { target: { value: 'kept' } });
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.expand' }));
    expect(screen.getByLabelText('Note')).toHaveValue('kept');
  });

  it('reports the real expanded state on the collapse toggle', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(screen.getByRole('button', { name: 'Mocked label: sheet.expand' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('starts collapsed with defaultCollapsed and returns to it on reopen', async () => {
    render(
      <Sheet defaultCollapsed>
        <Sheet.Trigger>
          <button type="button">Open</button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Body content')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.expand' }));
    expect(screen.getByText('Body content')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Body content')).not.toBeVisible();
    // Let the open transition settle so its state update lands inside act().
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveAttribute('data-status', 'open'));
  });

  it('supports controlled collapsed state', () => {
    const onCollapsedChange = jest.fn();
    const ControlledCollapse = () => {
      const [collapsed, setCollapsed] = useState(true);
      return (
        <>
          <button type="button" onClick={() => setCollapsed(false)}>
            Expand from outside
          </button>
          <Sheet
            defaultOpen
            collapsed={collapsed}
            onCollapsedChange={(next) => {
              onCollapsedChange(next);
              setCollapsed(next);
            }}
          >
            <Sheet.Content trapFocus={false}>
              <Sheet.Header title="Layers" collapsible />
              <Sheet.Body>Body content</Sheet.Body>
            </Sheet.Content>
          </Sheet>
        </>
      );
    };
    render(<ControlledCollapse />);

    expect(screen.getByText('Body content')).not.toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Expand from outside' }));
    expect(screen.getByText('Body content')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Body content')).not.toBeVisible();
  });

  it.each(['click', 'tab'] as const)('keeps a non-modal sheet open when focus leaves via %s', async (interaction) => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <>
        <Sheet closeOnBackdropClick={false} onToggle={onToggle}>
          <Sheet.Trigger>
            <button type="button">Open</button>
          </Sheet.Trigger>
          <Sheet.Content trapFocus={false} showOverlay={false} lockScroll={false}>
            <Sheet.Header title="Layers" closeButton={false} />
            <Sheet.Body>
              <input aria-label="Note" />
            </Sheet.Body>
          </Sheet.Content>
        </Sheet>
        <button type="button">Confirm drawing</button>
      </>
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Note' })).toHaveFocus());
    const panel = screen.getByRole('dialog');
    await waitFor(() => expect(panel).toHaveAttribute('data-status', 'open'));
    onToggle.mockClear();

    const outsideButton = screen.getByRole('button', { name: 'Confirm drawing' });
    if (interaction === 'click') {
      await user.click(outsideButton);
    } else {
      await user.tab();
    }

    expect(outsideButton).toHaveFocus();
    expect(panel).toHaveAttribute('data-status', 'open');
    expect(panel).toBeVisible();
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('expands a collapsed sheet when the drag handle is pulled up', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(screen.getByText('Body content')).not.toBeVisible();

    const handle = document.querySelector('[data-name="sheet-handle"]') as HTMLElement;
    fireEvent.pointerDown(handle, { clientY: 500, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 440, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 440, pointerId: 1 });

    // Dragging the peek upward past the threshold expands it back to full height.
    expect(screen.getByText('Body content')).toBeVisible();
  });

  it('closes a collapsed sheet when the drag handle is swiped down', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body content</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    const handle = document.querySelector('[data-name="sheet-handle"]') as HTMLElement;
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 260, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 260, pointerId: 1 });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes via Sheet.Closer while calling the child onClick first', async () => {
    const onClick = jest.fn();
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>Body</Sheet.Body>
          <Sheet.Footer>
            <Sheet.Closer>
              <button type="button" onClick={onClick}>
                Cancel
              </button>
            </Sheet.Closer>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('supports controlled open state', async () => {
    const ControlledSheet = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <Sheet open={open} onToggle={setOpen}>
            <Sheet.Content>
              <Sheet.Header title="Layers" />
              <Sheet.Body>Body content</Sheet.Body>
            </Sheet.Content>
          </Sheet>
        </>
      );
    };
    render(<ControlledSheet />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('renders left content before the title and keeps the dialog named by the title', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" left={<span>Left content</span>} />
        </Sheet.Content>
      </Sheet>
    );

    const left = screen.getByText('Left content');
    const title = screen.getByRole('heading', { name: 'Layers' });
    expect(left.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Layers');
  });

  it('renders extra actions between the collapse and close buttons', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header
            title="Layers"
            collapsible
            right={<span>Right content</span>}
            actions={<button type="button">Fullscreen</button>}
          />
        </Sheet.Content>
      </Sheet>
    );

    const header = screen.getByRole('heading', { name: 'Layers' }).parentElement as HTMLElement;
    const buttons = within(header)
      .getAllByRole('button')
      .map((button) => button.getAttribute('aria-label') ?? button.textContent);
    expect(buttons).toEqual(['Mocked label: sheet.collapse', 'Fullscreen', 'Close']);
    const right = screen.getByText('Right content');
    const collapse = screen.getByRole('button', { name: 'Mocked label: sheet.collapse' });
    expect(right.compareDocumentPosition(collapse) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders right content before the actions', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" right={<span>Right content</span>} />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const right = screen.getByText('Right content');
    const close = screen.getByRole('button', { name: 'Close' });
    expect(right.compareDocumentPosition(close) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('applies the centre-title modifier only when centerTitle is set', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__header--center"]')).not.toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Header title="Layers" centerTitle />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__header--center"]')).toBeInTheDocument();
  });

  it('removes the panel from the DOM while closed by default', () => {
    render(
      <Sheet>
        <Sheet.Content>
          <Sheet.Body>Persisted body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(document.querySelector('[class*="tedi-sheet__panel"]')).not.toBeInTheDocument();
  });

  it('keeps the panel mounted (hidden, inert) while closed when keepMounted is set', () => {
    render(
      <Sheet>
        <Sheet.Content keepMounted>
          <Sheet.Body>Persisted body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    const panel = document.querySelector('[class*="tedi-sheet__panel"]');
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('hidden');
    expect(panel).toHaveTextContent('Persisted body');
  });

  it('sizes a bottom sheet to the tallest snap point when snapPoints is set', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content snapPoints={[0.4, 0.9]}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const panel = document.querySelector<HTMLElement>('[class*="tedi-sheet__panel"]');
    expect(panel).toHaveStyle({ height: '90dvh' });
  });

  it('drops the snap height while collapsed and restores it on expand', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content snapPoints={[0.4, 0.9]}>
          <Sheet.Header title="Layers" collapsible />
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const panel = screen.getByRole('dialog');
    fireEvent.click(screen.getByRole('button', { name: 'Mocked label: sheet.collapse' }));
    expect(panel.style.height).toBe('');

    const handle = document.querySelector('[data-name="sheet-handle"]') as HTMLElement;
    fireEvent.pointerDown(handle, { clientY: 500, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 440, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 440, pointerId: 1 });
    expect(screen.getByText('Body')).toBeVisible();
    expect(panel).toHaveStyle({ height: '90dvh' });
  });

  it('overrides the corner radius via the radius prop', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    // Default leaves the sheet radius to the stylesheet.
    expect(screen.getByRole('dialog').style.getPropertyValue('--tedi-sheet-radius')).toBe('');

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content radius="none">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ '--tedi-sheet-radius': '0' });

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content radius="card">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ '--tedi-sheet-radius': 'var(--card-radius-rounded)' });
  });

  it('applies the base radius when the breakpoint resolver reports the base breakpoint', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content radius="none" md={{ radius: 'card' }}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ '--tedi-sheet-radius': '0' });
  });

  it('applies the md radius when the breakpoint resolver reports md', () => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: () => ({ radius: 'card' }),
    });

    render(
      <Sheet defaultOpen>
        <Sheet.Content radius="none" md={{ radius: 'card' }}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(screen.getByRole('dialog')).toHaveStyle({ '--tedi-sheet-radius': 'var(--card-radius-rounded)' });
  });

  it('throws when a subcomponent is rendered outside <Sheet>', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() =>
      render(
        <Sheet.Trigger>
          <button type="button">Orphan</button>
        </Sheet.Trigger>
      )
    ).toThrow('Sheet subcomponents must be rendered inside <Sheet>.');
    spy.mockRestore();
  });

  it('exposes the sheet state to descendants via useSheet', async () => {
    const CloseFromBody = () => {
      const { open, onOpenChange } = useSheet();
      return (
        <button type="button" onClick={() => onOpenChange(false)}>
          {open ? 'Close from body' : 'Closed'}
        </button>
      );
    };

    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>
            <CloseFromBody />
          </Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const closeButton = screen.getByRole('button', { name: 'Close from body' });
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('merges an object ref supplied on the trigger child', () => {
    const TriggerWithRef = () => {
      const ref = useRef<HTMLButtonElement>(null);
      const [tag, setTag] = useState('');
      return (
        <Sheet>
          <Sheet.Trigger>
            <button type="button" ref={ref}>
              Open
            </button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Body>Body</Sheet.Body>
          </Sheet.Content>
          <button type="button" onClick={() => setTag(ref.current?.tagName ?? 'null')}>
            Probe
          </button>
          <span data-testid="probe">{tag}</span>
        </Sheet>
      );
    };
    render(<TriggerWithRef />);

    fireEvent.click(screen.getByRole('button', { name: 'Probe' }));
    expect(screen.getByTestId('probe')).toHaveTextContent('BUTTON');
  });

  it('renders a split footer with right-aligned content', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>Body</Sheet.Body>
          <Sheet.Footer right={<button type="button">Confirm</button>}>
            <button type="button">Cancel</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(document.querySelector('[class*="tedi-sheet__footer--split"]')).toBeInTheDocument();
    expect(document.querySelector('[class*="tedi-sheet__footer-side--right"]')).toBeInTheDocument();
  });

  it('aligns footer actions via the align prop', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Footer align="center">
            <button type="button">Save</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__footer--center"]')).toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Footer align="right">
            <button type="button">Save</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__footer--right"]')).toBeInTheDocument();
  });

  it('stretches footer actions to full width', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Footer fullWidth>
            <button type="button">Save</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    expect(document.querySelector('[class*="tedi-sheet__footer--full-width"]')).toBeInTheDocument();
  });

  it('keeps fullWidth together with right content', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Footer fullWidth right={<button type="button">More</button>}>
            <button type="button">Save</button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );

    const footer = document.querySelector('[class*="tedi-sheet__footer--full-width"]');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass(/tedi-sheet__footer--split/);
    expect(screen.getByRole('button', { name: 'More' }).parentElement).toHaveClass(/tedi-sheet__footer-side--right/);
  });

  it('removes body padding when padding="none"', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body padding="none">Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(document.querySelector('[class*="tedi-sheet__body--no-padding"]')).toBeInTheDocument();
  });

  it('tightens the sheet padding when padding="small"', () => {
    const { rerender } = render(
      <Sheet defaultOpen>
        <Sheet.Content>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__panel--padding-small"]')).not.toBeInTheDocument();

    rerender(
      <Sheet defaultOpen>
        <Sheet.Content padding="small">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );
    expect(document.querySelector('[class*="tedi-sheet__panel--padding-small"]')).toBeInTheDocument();
  });

  it('applies minHeight and maxHeight to the panel', () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content minHeight="200px" maxHeight="400px">
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toHaveStyle({ minHeight: '200px', maxHeight: '400px' });
  });

  it('snaps to the nearest snap point on drag end', () => {
    const onSnapPointChange = jest.fn();
    render(
      <Sheet defaultOpen>
        <Sheet.Content snapPoints={[0.4, 0.9]} onSnapPointChange={onSnapPointChange}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const handle = document.querySelector('[data-name="sheet-handle"]') as HTMLElement;
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 450, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 450, pointerId: 1 });

    expect(onSnapPointChange).toHaveBeenCalledWith(0.4);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('dismisses a snap-point sheet when dragged below the lowest snap', async () => {
    render(
      <Sheet defaultOpen>
        <Sheet.Content snapPoints={[0.4, 0.9]}>
          <Sheet.Body>Body</Sheet.Body>
        </Sheet.Content>
      </Sheet>
    );

    const handle = document.querySelector('[data-name="sheet-handle"]') as HTMLElement;
    fireEvent.pointerDown(handle, { clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 700, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 700, pointerId: 1 });

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});

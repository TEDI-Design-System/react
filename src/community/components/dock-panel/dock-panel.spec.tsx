import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import {
  DockPanel,
  DockPanelDimensionPreset,
  DockPanelLabels,
  DockPanelLayout,
  DockPanelPlacement,
} from './dock-panel';

jest.mock('react-sticky-box', () => ({ __esModule: true, default: () => null }));

jest.mock('../../../tedi/helpers', () => ({
  ...jest.requireActual('../../../tedi/helpers'),
  useBreakpointProps: () => ({
    getCurrentBreakpointProps: <T,>(props: T): T => props,
  }),
}));

const labels: DockPanelLabels = {
  collapse: 'Minimize panel',
  expand: 'Restore panel',
  close: 'Close panel',
};

const Editor = () => {
  const [value, setValue] = useState('Initial value');
  return <input aria-label="Example value" value={value} onChange={(event) => setValue(event.target.value)} />;
};
Editor.displayName = 'DockPanelTestEditor';

describe('DockPanel', () => {
  it('renders an expanded, labelled, non-modal region by default', () => {
    const { container } = render(
      <DockPanel title="Details" labels={labels}>
        Content
      </DockPanel>
    );

    const panel = screen.getByRole('region', { name: 'Details' });
    expect(panel).toHaveAttribute('data-placement', 'right');
    expect(panel).toHaveAttribute('data-collapsed', 'false');
    expect(panel).not.toHaveAttribute('aria-modal');
    expect(panel).toHaveAttribute('aria-labelledby', screen.getByRole('heading', { name: 'Details', level: 3 }).id);
    expect(screen.getByRole('button', { name: labels.collapse })).toHaveAttribute('aria-expanded', 'true');
    expect(container.querySelector('.tedi-dock-panel__resizer')).not.toBeInTheDocument();
  });

  it.each(['small', 'default'] as const)(
    'preserves the heading override with %s density when minimizing',
    async (size) => {
      const user = userEvent.setup();
      render(
        <DockPanel title="Details" labels={labels} size={size} headingElement="h2">
          Content
        </DockPanel>
      );
      expect(screen.getByRole('heading', { name: 'Details', level: 2 })).not.toHaveClass('text-small');

      await user.click(screen.getByRole('button', { name: labels.collapse }));
      expect(screen.getByRole('heading', { name: 'Details', level: 2 })).toHaveClass('text-small');

      await user.click(screen.getByRole('button', { name: labels.expand }));
      expect(screen.getByRole('heading', { name: 'Details', level: 2 })).not.toHaveClass('text-small');
    }
  );

  it.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])('supports %s placement', (placement) => {
    render(
      <DockPanel title="Details" labels={labels} placement={placement}>
        Content
      </DockPanel>
    );
    expect(screen.getByRole('region')).toHaveAttribute('data-placement', placement);
  });

  it('minimizes and restores in uncontrolled mode', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <DockPanel title="Details" labels={labels} onCollapsedChange={onChange}>
        Content
      </DockPanel>
    );

    await user.click(screen.getByRole('heading', { name: 'Details' }));
    expect(onChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(screen.getByRole('button', { name: labels.expand })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Content')).not.toBeVisible();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByText('Content')).toBeVisible();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('preserves both React child state and the input DOM node', async () => {
    const user = userEvent.setup();
    render(
      <DockPanel title="Details" labels={labels}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Unsaved changes');

    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(input).toBeInTheDocument();
    expect(input).not.toBeVisible();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('Unsaved changes');
  });

  it('preserves content when placement changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <DockPanel title="Details" labels={labels}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Kept when moved');

    rerender(
      <DockPanel title="Details" labels={labels} placement="bottom">
        <Editor />
      </DockPanel>
    );
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('Kept when moved');
  });

  it('supports an initially minimized panel', () => {
    render(
      <DockPanel title="Details" labels={labels} defaultCollapsed>
        Content
      </DockPanel>
    );
    expect(screen.getByRole('button', { name: labels.expand })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Content')).not.toBeVisible();
  });

  it('requests a controlled change without overriding the parent state', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} collapsed={false} onCollapsedChange={onChange}>
        Content
      </DockPanel>
    );
    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByText('Content')).toBeVisible();

    rerender(
      <DockPanel title="Details" labels={labels} collapsed onCollapsedChange={onChange}>
        Content
      </DockPanel>
    );
    expect(screen.getByText('Content')).not.toBeVisible();
    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(screen.getByText('Content')).not.toBeVisible();
  });

  describe('minimizeCounter', () => {
    it.each([undefined, 0, 5])('ignores the initial value %s', (minimizeCounter) => {
      const onChange = jest.fn();
      render(
        <DockPanel title="Details" labels={labels} minimizeCounter={minimizeCounter} onCollapsedChange={onChange}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).toBeVisible();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('minimizes on changes in either direction and restores with its content preserved', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const props = { title: 'Details', labels, onCollapsedChange: onChange };
      const { rerender } = render(
        <DockPanel {...props} minimizeCounter={1}>
          <Editor />
        </DockPanel>
      );
      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Unsaved changes');

      rerender(
        <DockPanel {...props} minimizeCounter={2}>
          <Editor />
        </DockPanel>
      );
      expect(input).toBeInTheDocument();
      expect(input).not.toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenLastCalledWith(true);

      await user.click(screen.getByRole('button', { name: labels.expand }));
      expect(screen.getByRole('textbox')).toBe(input);
      expect(input).toHaveValue('Unsaved changes');
      expect(onChange).toHaveBeenLastCalledWith(false);

      rerender(
        <DockPanel {...props} title="Updated title" minimizeCounter={2}>
          <Editor />
        </DockPanel>
      );
      expect(input).toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(2);

      rerender(
        <DockPanel {...props} minimizeCounter={1}>
          <Editor />
        </DockPanel>
      );
      expect(input).not.toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(true);
    });

    it.each([
      [undefined, 0],
      [0, undefined],
    ])('treats a change from %s to %s as a minimize request', (initial, next) => {
      const onChange = jest.fn();
      const props = { title: 'Details', labels, onCollapsedChange: onChange };
      const { rerender } = render(
        <DockPanel {...props} minimizeCounter={initial}>
          Content
        </DockPanel>
      );
      rerender(
        <DockPanel {...props} minimizeCounter={next}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).not.toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('consumes counter changes while already minimized without affecting restoration', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const props = { title: 'Details', labels, defaultCollapsed: true, onCollapsedChange: onChange };
      const { rerender } = render(
        <DockPanel {...props} minimizeCounter={0}>
          Content
        </DockPanel>
      );
      rerender(
        <DockPanel {...props} minimizeCounter={1}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).not.toBeVisible();
      expect(onChange).not.toHaveBeenCalled();

      await user.click(screen.getByRole('button', { name: labels.expand }));
      expect(screen.getByText('Content')).toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('requests controlled minimization once and leaves state changes to the parent', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const props = { title: 'Details', labels, collapsed: false, onCollapsedChange: onChange };
      const { rerender } = render(
        <DockPanel {...props} minimizeCounter={0}>
          Content
        </DockPanel>
      );
      expect(onChange).not.toHaveBeenCalled();

      rerender(
        <DockPanel {...props} minimizeCounter={1}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);

      const onNextChange = jest.fn();
      const nextProps = { ...props, title: 'Updated title', onCollapsedChange: onNextChange };
      rerender(
        <DockPanel {...nextProps} minimizeCounter={1}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).toBeVisible();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onNextChange).not.toHaveBeenCalled();

      rerender(
        <DockPanel {...nextProps} minimizeCounter={2}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).toBeVisible();
      expect(onNextChange).toHaveBeenCalledTimes(1);
      expect(onNextChange).toHaveBeenCalledWith(true);

      rerender(
        <DockPanel {...nextProps} collapsed minimizeCounter={2}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).not.toBeVisible();
      rerender(
        <DockPanel {...nextProps} collapsed minimizeCounter={3}>
          Content
        </DockPanel>
      );
      expect(onNextChange).toHaveBeenCalledTimes(1);

      await user.click(screen.getByRole('button', { name: labels.expand }));
      expect(onNextChange).toHaveBeenCalledTimes(2);
      expect(onNextChange).toHaveBeenLastCalledWith(false);
      expect(screen.getByText('Content')).not.toBeVisible();

      rerender(
        <DockPanel {...nextProps} minimizeCounter={3}>
          Content
        </DockPanel>
      );
      expect(screen.getByText('Content')).toBeVisible();
      expect(onNextChange).toHaveBeenCalledTimes(2);
    });
  });

  it('keeps keyboard focus on the toggle when minimized', async () => {
    const user = userEvent.setup();
    render(
      <DockPanel title="Details" labels={labels}>
        Content
      </DockPanel>
    );
    const toggle = screen.getByRole('button', { name: labels.collapse });
    act(() => toggle.focus());
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: labels.expand })).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('button', { name: labels.collapse })).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not move focus to the toggle on a programmatic collapse', () => {
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} collapsed={false}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    act(() => input.focus());
    rerender(
      <DockPanel title="Details" labels={labels} collapsed>
        <Editor />
      </DockPanel>
    );
    expect(input).not.toBeVisible();
    expect(screen.getByRole('button', { name: labels.expand })).not.toHaveFocus();
  });

  it('does not steal focus from the application on a programmatic collapse', () => {
    const example = (collapsed: boolean) => (
      <>
        <button type="button">Outside</button>
        <DockPanel title="Details" labels={labels} collapsed={collapsed}>
          <Editor />
        </DockPanel>
      </>
    );
    const { rerender } = render(example(false));
    act(() => screen.getByRole('textbox').focus());
    act(() => screen.getByRole('button', { name: 'Outside' }).focus());
    rerender(example(true));
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it.each([null, undefined, false, true])('omits optional slot wrappers for %s', (content) => {
    const { container } = render(
      <DockPanel title="Details" labels={labels} headerActions={content} footer={content}>
        Content
      </DockPanel>
    );
    expect(container.querySelector('.tedi-dock-panel__header-actions')).not.toBeInTheDocument();
    expect(container.querySelector('.tedi-dock-panel__footer')).not.toBeInTheDocument();
  });

  it('renders numeric zero in both optional slots', () => {
    const { container } = render(
      <DockPanel title="Details" labels={labels} headerActions={0} footer={0}>
        Content
      </DockPanel>
    );
    expect(container.querySelector('.tedi-dock-panel__header-actions')).toHaveTextContent('0');
    expect(container.querySelector('.tedi-dock-panel__footer')).toHaveTextContent('0');
  });

  it.each([undefined, ''])('omits the description when it is %s', (description) => {
    const { container } = render(
      <DockPanel title="Details" labels={labels} description={description}>
        Content
      </DockPanel>
    );
    expect(container.querySelector('.tedi-dock-panel__description')).not.toBeInTheDocument();
  });

  it('hides the description, header actions and footer without unmounting them', async () => {
    const user = userEvent.setup();
    render(
      <DockPanel
        title="Details"
        labels={labels}
        description="Supporting information"
        headerActions={<button type="button">Header action</button>}
        footer={<button type="button">Footer action</button>}
      >
        Content
      </DockPanel>
    );
    const description = screen.getByText('Supporting information');
    const headerAction = screen.getByRole('button', { name: 'Header action' });
    const footerAction = screen.getByRole('button', { name: 'Footer action' });
    expect(description).toBeVisible();
    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(description).toBeInTheDocument();
    expect(description).not.toBeVisible();
    expect(headerAction).toBeInTheDocument();
    expect(headerAction).not.toBeVisible();
    expect(footerAction).toBeInTheDocument();
    expect(footerAction).not.toBeVisible();

    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByText('Supporting information')).toBe(description);
    expect(description).toBeVisible();
    expect(screen.getByRole('button', { name: 'Header action' })).toBe(headerAction);
    expect(screen.getByRole('button', { name: 'Footer action' })).toBe(footerAction);
  });

  it('skips minimized content when tabbing', async () => {
    const user = userEvent.setup();
    render(
      <>
        <DockPanel title="Details" labels={labels} defaultCollapsed>
          <Editor />
        </DockPanel>
        <button type="button">After panel</button>
      </>
    );
    await user.tab();
    expect(screen.getByRole('button', { name: labels.expand })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After panel' })).toHaveFocus();
  });

  it.each([false, true])('delegates closing without changing collapsed=%s', async (defaultCollapsed) => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const onCollapsedChange = jest.fn();
    render(
      <DockPanel
        title="Details"
        labels={labels}
        defaultCollapsed={defaultCollapsed}
        onClose={onClose}
        onCollapsedChange={onCollapsedChange}
      >
        Content
      </DockPanel>
    );
    await user.click(screen.getByRole('button', { name: labels.close }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onCollapsedChange).not.toHaveBeenCalled();
    expect(screen.getByRole('region')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: defaultCollapsed ? labels.expand : labels.collapse })).toHaveAttribute(
      'aria-expanded',
      String(!defaultCollapsed)
    );
  });

  it('does not render a close button unless requested', () => {
    render(
      <DockPanel title="Details" labels={labels}>
        Content
      </DockPanel>
    );
    expect(screen.queryByRole('button', { name: labels.close })).not.toBeInTheDocument();
  });

  it('connects each toggle to its own content region', () => {
    render(
      <>
        <DockPanel title="First" labels={labels}>
          First content
        </DockPanel>
        <DockPanel title="Second" labels={labels}>
          Second content
        </DockPanel>
      </>
    );
    const ids = screen
      .getAllByRole('button', { name: labels.collapse })
      .map((button) => button.getAttribute('aria-controls'));
    expect(ids[0]).not.toBe(ids[1]);
    ids.forEach((id) => expect(document.getElementById(id ?? '')).toBeInTheDocument());
  });

  it('accepts an explicit id and per-instance dimensions', () => {
    render(
      <DockPanel id="details" title="Details" labels={labels} width={420} height="60%">
        Content
      </DockPanel>
    );
    const panel = screen.getByRole('region');
    expect(panel).toHaveAttribute('id', 'details');
    expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('420px');
    expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('60%');
  });

  it.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])(
    'sets content height and a height limit for %s placement',
    (placement) => {
      render(
        <DockPanel title="Details" labels={labels} placement={placement} height="auto" maxHeight={480}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('auto');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('480px');
    }
  );

  it('leaves placement-specific default heights to CSS when dimensions are omitted', () => {
    render(
      <DockPanel title="Details" labels={labels}>
        Content
      </DockPanel>
    );
    const panel = screen.getByRole('region');
    expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('');
    expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('');
  });

  it('preserves the editor and sizing options through content-height minimization', async () => {
    const user = userEvent.setup();
    render(
      <DockPanel title="Details" labels={labels} height="auto" maxHeight={480} onClose={jest.fn()}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Keep my changes');
    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(input).toBeInTheDocument();
    expect(input).not.toBeVisible();
    expect(screen.getByRole('button', { name: labels.close })).toBeVisible();
    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByRole('textbox')).toBe(input);
    expect(input).toHaveValue('Keep my changes');
    expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-height')).toBe('auto');
    expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-max-height')).toBe('480px');
  });

  it('updates sizing without remounting content and removes an omitted height limit', () => {
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} height="auto" maxHeight={480}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    rerender(
      <DockPanel title="Details" labels={labels} height={360}>
        <Editor />
      </DockPanel>
    );
    const panel = screen.getByRole('region');
    expect(screen.getByRole('textbox')).toBe(input);
    expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('360px');
    expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('');
  });

  it.each([false, true])(
    'keeps toggle and Close consecutive in the keyboard order when collapsed=%s',
    async (defaultCollapsed) => {
      const user = userEvent.setup();
      render(
        <>
          <DockPanel
            title="Details"
            labels={labels}
            defaultCollapsed={defaultCollapsed}
            onClose={jest.fn()}
            headerActions={<button type="button">Custom action</button>}
          >
            <Editor />
          </DockPanel>
          <button type="button">After panel</button>
        </>
      );

      await user.tab();
      if (!defaultCollapsed) {
        expect(screen.getByRole('button', { name: 'Custom action' })).toHaveFocus();
        await user.tab();
      }
      expect(screen.getByRole('button', { name: defaultCollapsed ? labels.expand : labels.collapse })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole('button', { name: labels.close })).toHaveFocus();
      await user.tab();
      if (!defaultCollapsed) {
        expect(screen.getByRole('textbox')).toHaveFocus();
        await user.tab();
      }
      expect(screen.getByRole('button', { name: 'After panel' })).toHaveFocus();
    }
  );

  describe('resizing', () => {
    let workspace: HTMLDivElement;
    let notifyWorkspaceResize: () => void;
    let workspaceObserver: ResizeObserver;

    const measurePanel = () => ({
      width: 500,
      height: 400,
      top: 0,
      left: 0,
      right: 500,
      bottom: 400,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    beforeEach(() => {
      workspace = document.createElement('div');
      Object.defineProperties(workspace, {
        clientWidth: { value: 1000, configurable: true },
        clientHeight: { value: 800, configurable: true },
      });
      jest.spyOn(globalThis, 'ResizeObserver').mockImplementation((callback) => {
        workspaceObserver = {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
        notifyWorkspaceResize = () => callback([], workspaceObserver);
        return workspaceObserver;
      });
      const getBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function () {
        return this.classList.contains('tedi-dock-panel') ? measurePanel() : getBoundingClientRect.call(this);
      });
      jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockReturnValue(workspace);
    });

    afterEach(() => jest.restoreAllMocks());

    it.each([
      ['left', 200, 100, '600px'],
      ['right', 0, 100, '600px'],
      ['top', 100, 200, '500px'],
      ['bottom', 100, 0, '500px'],
    ] as const)('resizes %s placement from its workspace-facing edge', async (placement, x, y, size) => {
      const user = userEvent.setup();
      const { container } = render(
        <DockPanel title="Details" labels={labels} placement={placement} width="md" height="md" resizable>
          Content
        </DockPanel>
      );
      const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
      const handle = resizer.querySelector('[data-show-indicator]') as HTMLElement;
      const dimension = placement === 'left' || placement === 'right' ? 'width' : 'height';
      expect(resizer.style[dimension]).toBe(dimension === 'width' ? '500px' : '400px');

      await user.pointer([
        { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
        { coords: { x, y } },
        { keys: '[/MouseLeft]' },
      ]);
      expect(resizer.style[dimension]).toBe(size);
    });

    it.each(['right', 'bottom'] as const)(
      'starts minimized at %s and restores the measured size',
      async (placement) => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        const { container } = render(
          <DockPanel
            title="Details"
            labels={labels}
            placement={placement}
            width="md"
            height="md"
            resizable
            defaultCollapsed
            onCollapsedChange={onChange}
          >
            Content
          </DockPanel>
        );
        expect(screen.getByText('Content')).not.toBeVisible();
        expect(onChange).not.toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: labels.expand }));
        expect(screen.getByText('Content')).toBeVisible();
        expect(container.querySelector('.tedi-dock-panel__resizer')).toHaveStyle(
          placement === 'right' ? { width: '500px' } : { height: '400px' }
        );
      }
    );

    it.each([
      ['left', 2100, -2000],
      ['right', -2000, 2100],
      ['top', 2100, -2000],
      ['bottom', -2000, 2100],
    ] as const)(
      'keeps %s resizing between 8% and 92% of the measured workspace size',
      async (placement, growTo, shrinkTo) => {
        const user = userEvent.setup();
        const { container } = render(
          <DockPanel title="Details" labels={labels} placement={placement} resizable>
            Content
          </DockPanel>
        );
        const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        const handle = resizer.querySelector('[data-show-indicator]') as HTMLElement;
        const dimension = placement === 'left' || placement === 'right' ? 'width' : 'height';

        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: growTo, y: growTo } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(dimension === 'width' ? '920px' : '736px');

        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: shrinkTo, y: shrinkTo } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(dimension === 'width' ? '80px' : '64px');
      }
    );

    it.each([
      ['right', 1500, 1000, '1380px', '120px'],
      ['bottom', 1500, 1000, '920px', '80px'],
      ['right', 800, 600, '736px', '64px'],
      ['bottom', 800, 600, '552px', '48px'],
    ] as const)(
      'updates %s drag limits when the workspace becomes %s by %s',
      async (placement, workspaceWidth, workspaceHeight, maximum, minimum) => {
        const user = userEvent.setup();
        const { container, unmount } = render(
          <DockPanel title="Details" labels={labels} placement={placement} resizable>
            <Editor />
          </DockPanel>
        );
        const input = screen.getByRole('textbox');
        const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        const handle = resizer.querySelector('[data-show-indicator]') as HTMLElement;
        const dimension = placement === 'right' ? 'width' : 'height';
        expect(workspaceObserver.observe).toHaveBeenCalledWith(workspace);

        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: 50, y: 50 } },
          { keys: '[/MouseLeft]' },
        ]);
        const chosenSize = resizer.style[dimension];

        act(() => {
          Object.defineProperties(workspace, {
            clientWidth: { value: workspaceWidth },
            clientHeight: { value: workspaceHeight },
          });
          notifyWorkspaceResize();
        });
        expect(resizer.style[dimension]).toBe(chosenSize);
        expect(screen.getByRole('textbox')).toBe(input);

        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: -2000, y: -2000 } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(maximum);

        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: 2100, y: 2100 } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(minimum);

        expect(workspaceObserver.disconnect).not.toHaveBeenCalled();
        unmount();
        expect(workspaceObserver.disconnect).toHaveBeenCalledTimes(1);
      }
    );

    it.each([
      ['right', -2000, 600, 400, 552, 110],
      ['bottom', -2000, 600, 400, 368, 110],
      ['right', 2100, 1500, 1200, 120, 90],
      ['bottom', 2100, 1500, 1200, 96, 90],
    ] as const)(
      'resets an invalid %s size without replacing content after a workspace resize',
      async (placement, dragTo, workspaceWidth, workspaceHeight, clampedSize, nextDragTo) => {
        const user = userEvent.setup();
        const { container } = render(
          <DockPanel title="Details" labels={labels} placement={placement} resizable>
            <Editor />
          </DockPanel>
        );
        const input = screen.getByRole('textbox');
        const originalResizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        const handle = originalResizer.querySelector('[data-show-indicator]') as HTMLElement;
        const dimension = placement === 'right' ? 'width' : 'height';
        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: dragTo, y: dragTo } },
          { keys: '[/MouseLeft]' },
        ]);
        await user.clear(input);
        await user.type(input, 'Keep edited content');

        act(() => {
          Object.defineProperties(workspace, {
            clientWidth: { value: workspaceWidth },
            clientHeight: { value: workspaceHeight },
          });
          notifyWorkspaceResize();
        });

        const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        expect(originalResizer).not.toBeInTheDocument();
        expect(resizer.style[dimension]).toBe(`${clampedSize}px`);
        expect(screen.getByRole('textbox')).toBe(input);
        expect(input).toHaveValue('Keep edited content');
        expect(input).toHaveFocus();

        await user.pointer([
          {
            target: resizer.querySelector('[data-show-indicator]') as HTMLElement,
            keys: '[MouseLeft>]',
            coords: { x: 100, y: 100 },
          },
          { coords: { x: nextDragTo, y: nextDragTo } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(`${clampedSize + 100 - nextDragTo}px`);
      }
    );

    it.each([
      ['right', 50, undefined, 50, 920],
      ['right', undefined, 950, 80, 950],
      ['bottom', 25, undefined, 25, 736],
      ['bottom', undefined, 780, 64, 780],
      ['right', 560, 400, 400, 400],
      ['right', 0, 1200, 0, 1000],
    ] as const)(
      'uses explicit %s limits independently: minimum %s, maximum %s',
      async (placement, minimum, maximum, expectedMinimum, expectedMaximum) => {
        const user = userEvent.setup();
        const side = placement === 'right';
        const { container } = render(
          <DockPanel
            title="Details"
            labels={labels}
            placement={placement}
            resizable
            minWidth={side ? minimum : undefined}
            maxWidth={side ? maximum : undefined}
            minHeight={side ? undefined : minimum}
            maxHeight={side ? undefined : maximum}
          >
            Content
          </DockPanel>
        );
        const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        const handle = resizer.querySelector('[data-show-indicator]') as HTMLElement;
        const dimension = side ? 'width' : 'height';
        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: 2100, y: 2100 } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(`${expectedMinimum}px`);
        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: -2000, y: -2000 } },
          { keys: '[/MouseLeft]' },
        ]);
        expect(resizer.style[dimension]).toBe(`${expectedMaximum}px`);
      }
    );

    it.each(['left', 'right', 'top', 'bottom'] as const)(
      'removes %s height limits while minimized and restores them when expanded',
      async (placement) => {
        const user = userEvent.setup();
        const expandedHeight = placement === 'left' || placement === 'right' ? '360px' : '';
        const { container } = render(
          <DockPanel title="Details" labels={labels} placement={placement} height={360} maxHeight={20} resizable>
            <Editor />
          </DockPanel>
        );
        const input = screen.getByRole('textbox');
        const layout = container.querySelector('.tedi-dock-panel__resize-layout') as HTMLElement;
        expect(layout.style.height).toBe(expandedHeight);
        expect(layout.style.maxHeight).toBe('20px');

        await user.click(screen.getByRole('button', { name: labels.collapse }));
        expect(layout.style.height).toBe('');
        expect(layout.style.maxHeight).toBe('');
        expect(input).toBeInTheDocument();
        expect(input).not.toBeVisible();

        await user.click(screen.getByRole('button', { name: labels.expand }));
        expect(layout.style.height).toBe(expandedHeight);
        expect(layout.style.maxHeight).toBe('20px');
        expect(screen.getByRole('textbox')).toBe(input);
        expect(input).toBeVisible();
      }
    );

    it.each(['right', 'bottom'] as const)(
      'preserves %s resized dimensions and content through minimize/restore and rerenders',
      async (placement) => {
        const user = userEvent.setup();
        const props = { title: 'Details', labels, placement, resizable: true };
        const { container, rerender } = render(
          <DockPanel {...props}>
            <Editor />
          </DockPanel>
        );
        const input = screen.getByRole('textbox');
        await user.clear(input);
        await user.type(input, 'Keep resized changes');
        const resizer = container.querySelector('.tedi-dock-panel__resizer') as HTMLElement;
        const handle = resizer.querySelector('[data-show-indicator]') as HTMLElement;
        await user.pointer([
          { target: handle, keys: '[MouseLeft>]', coords: { x: 100, y: 100 } },
          { coords: { x: 50, y: 50 } },
          { keys: '[/MouseLeft]' },
        ]);
        const dimensions = placement === 'right' ? { width: '550px' } : { height: '450px' };
        expect(resizer).toHaveStyle(dimensions);

        await user.click(screen.getByRole('button', { name: labels.collapse }));
        expect(input).toBeInTheDocument();
        expect(input).not.toBeVisible();
        expect(container.querySelector('.tedi-dock-panel__resizer')).toHaveStyle(dimensions);

        await user.click(screen.getByRole('button', { name: labels.expand }));
        rerender(
          <DockPanel {...props} title="Updated details">
            <Editor />
          </DockPanel>
        );
        expect(screen.getByRole('textbox')).toBe(input);
        expect(input).toHaveValue('Keep resized changes');
        expect(input).toBeVisible();
        expect(container.querySelector('.tedi-dock-panel__resizer')).toHaveStyle(dimensions);
      }
    );
  });

  describe('density and dimension presets', () => {
    it('uses default density when size is omitted', () => {
      render(
        <DockPanel title="Details" labels={labels}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('data-size', 'default');
    });

    it.each(['small', 'default'] as const)('supports %s density independently of dimensions', (size) => {
      render(
        <DockPanel title="Details" labels={labels} size={size} width={420} height="70%">
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('data-size', size);
      expect(screen.getByRole('heading', { name: 'Details', level: size === 'small' ? 4 : 3 })).toBeInTheDocument();
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('420px');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('70%');
    });

    describe.each<DockPanelPlacement>(['left', 'right'])('%s width presets', (placement) => {
      it.each([
        ['xs', '25%'],
        ['sm', '35%'],
        ['md', '50%'],
        ['lg', '65%'],
        ['xl', '80%'],
      ] as const)('resolves width=%s to %s of the containing workspace', (width, expected) => {
        render(
          <DockPanel title="Details" labels={labels} placement={placement} width={width}>
            Content
          </DockPanel>
        );
        const panel = screen.getByRole('region');
        expect(panel.style.getPropertyValue('--dock-panel-width')).toBe(expected);
      });
    });

    it.each<DockPanelDimensionPreset>(['xs', 'sm', 'md', 'lg', 'xl'])(
      'uses the same percentage for width and height preset %s',
      (preset) => {
        render(
          <DockPanel title="Details" labels={labels} width={preset} height={preset}>
            Content
          </DockPanel>
        );
        const panel = screen.getByRole('region');
        expect(panel.style.getPropertyValue('--dock-panel-width')).toBe(
          panel.style.getPropertyValue('--dock-panel-height')
        );
      }
    );

    it('allows explicit full size without changing xl to a full-size preset', () => {
      const { rerender } = render(
        <DockPanel title="Details" labels={labels} width="xl" height="xl">
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('80%');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('80%');
      rerender(
        <DockPanel title="Details" labels={labels} width="100%" height="100%">
          Content
        </DockPanel>
      );
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('100%');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('100%');
    });

    it.each([
      ['xs', '25%'],
      ['sm', '35%'],
      ['md', '50%'],
      ['lg', '65%'],
      ['xl', '80%'],
    ] as const)('resolves height=%s to %s of the containing workspace', (height, expected) => {
      render(
        <DockPanel title="Details" labels={labels} placement="bottom" height={height}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe(expected);
    });

    it.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])(
      'accepts height presets for %s placement',
      (placement) => {
        render(
          <DockPanel title="Details" labels={labels} placement={placement} height="lg">
            Content
          </DockPanel>
        );
        expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-height')).toBe('65%');
      }
    );

    it('still accepts custom CSS dimensions and numeric pixels', () => {
      render(
        <DockPanel title="Details" labels={labels} width="calc(100% - 4rem)" height={360} maxHeight={480}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('calc(100% - 4rem)');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('360px');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('480px');
    });

    it('converts zero dimensions to pixels', () => {
      render(
        <DockPanel title="Details" labels={labels} width={0} height={0} maxHeight={0}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('0px');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('0px');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('0px');
    });

    it('overrides style dimensions only while dimension props are supplied', () => {
      const style = {
        color: 'red',
        '--dock-panel-width': '10rem',
        '--dock-panel-height': '20rem',
        '--dock-panel-max-height': '30rem',
      };
      const { rerender } = render(
        <DockPanel title="Details" labels={labels} style={style} width="sm" height={360} maxHeight={480}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('35%');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('360px');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('480px');
      expect(panel.style.color).toBe('red');

      rerender(
        <DockPanel title="Details" labels={labels} style={style}>
          Content
        </DockPanel>
      );
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('10rem');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('20rem');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('30rem');
      expect(panel.style.color).toBe('red');
    });

    it('updates presets and density without resetting child state', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <DockPanel title="Details" labels={labels} size="small" width="xs">
          <Editor />
        </DockPanel>
      );
      const input = screen.getByRole('textbox');
      await user.clear(input);
      await user.type(input, 'Keep this value');
      rerender(
        <DockPanel title="Details" labels={labels} size="default" width="xl" height="sm">
          <Editor />
        </DockPanel>
      );
      expect(screen.getByRole('textbox')).toBe(input);
      expect(input).toHaveValue('Keep this value');
      expect(screen.getByRole('region')).toHaveAttribute('data-size', 'default');
      expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-width')).toBe('80%');
      expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-height')).toBe('35%');
    });

    it('restores preset dimensions after minimization', async () => {
      const user = userEvent.setup();
      render(
        <DockPanel title="Details" labels={labels} size="small" width="md" height="lg" onClose={jest.fn()}>
          <Editor />
        </DockPanel>
      );
      await user.click(screen.getByRole('button', { name: labels.collapse }));
      expect(screen.getByRole('button', { name: labels.close })).toBeVisible();
      await user.click(screen.getByRole('button', { name: labels.expand }));
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('data-size', 'small');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('50%');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('65%');
    });

    it('returns to previous defaults when preset props are removed', () => {
      const { rerender } = render(
        <DockPanel title="Details" labels={labels} size="small" width="xl" height="xs">
          Content
        </DockPanel>
      );
      rerender(
        <DockPanel title="Details" labels={labels}>
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('data-size', 'default');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('');
    });
  });
});

describe('DockPanel revised controls and composition', () => {
  it.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])(
    'uses four inward/outward arrows for %s placement',
    async (placement) => {
      const user = userEvent.setup();
      render(
        <DockPanel title="Details" labels={labels} placement={placement}>
          Content
        </DockPanel>
      );
      expect(screen.getByRole('button', { name: labels.collapse })).toHaveTextContent('zoom_in_map');
      await user.click(screen.getByRole('button', { name: labels.collapse }));
      expect(screen.getByRole('button', { name: labels.expand })).toHaveTextContent('zoom_out_map');
    }
  );

  it('keeps footer button state when minimizing and restoring', async () => {
    const user = userEvent.setup();
    const Footer = () => {
      const [count, setCount] = useState(0);
      return (
        <button type="button" onClick={() => setCount(count + 1)}>
          Saved: {count}
        </button>
      );
    };
    render(
      <DockPanel title="Details" labels={labels} footer={<Footer />}>
        Content
      </DockPanel>
    );
    await user.click(screen.getByRole('button', { name: 'Saved: 0' }));
    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(screen.queryByRole('button', { name: 'Saved: 1' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByRole('button', { name: 'Saved: 1' })).toBeVisible();
  });
});

describe('DockPanelLayout', () => {
  it('puts the panel and workspace in separate sibling elements', () => {
    const { container } = render(
      <DockPanelLayout
        panel={
          <DockPanel title="Details" labels={labels}>
            Panel content
          </DockPanel>
        }
      >
        <p>Workspace content</p>
      </DockPanelLayout>
    );
    const content = screen.getByText('Workspace content').parentElement;
    const panel = screen.getByRole('region', { name: 'Details' });
    expect(content?.parentElement).toBe(container.firstChild);
    expect(panel.parentElement).toBe(container.firstChild);
    expect(content).not.toContainElement(panel);
  });

  it('preserves underlying application state while opening and closing the panel', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <DockPanelLayout>
        <Editor />
      </DockPanelLayout>
    );
    const editor = screen.getByRole('textbox');
    await user.clear(editor);
    await user.type(editor, 'Workspace changes');
    rerender(
      <DockPanelLayout
        panel={
          <DockPanel title="Details" labels={labels}>
            Panel content
          </DockPanel>
        }
      >
        <Editor />
      </DockPanelLayout>
    );
    expect(screen.getByRole('textbox')).toBe(editor);
    rerender(
      <DockPanelLayout>
        <Editor />
      </DockPanelLayout>
    );
    expect(screen.getByRole('textbox')).toBe(editor);
    expect(editor).toHaveValue('Workspace changes');
  });
});

import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';

import {
  DockPanel,
  DockPanelDimensionPreset,
  DockPanelLabels,
  DockPanelLayout,
  DockPanelPlacement,
} from './dock-panel';

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
    render(
      <DockPanel title="Details" labels={labels}>
        Content
      </DockPanel>
    );

    const panel = screen.getByRole('region', { name: 'Details' });
    expect(panel).toHaveAttribute('data-placement', 'right');
    expect(panel).toHaveAttribute('data-collapsed', 'false');
    expect(panel).not.toHaveAttribute('aria-modal');
    expect(screen.getByRole('heading', { name: 'Details', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: labels.collapse })).toHaveAttribute('aria-expanded', 'true');
  });

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

    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(screen.getByRole('button', { name: labels.expand })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Content')).not.toBeVisible();
    expect(onChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole('button', { name: labels.expand }));
    expect(screen.getByText('Content')).toBeVisible();
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

  it('moves focus out of content on a programmatic collapse', () => {
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} collapsed={false}>
        <Editor />
      </DockPanel>
    );
    act(() => screen.getByRole('textbox').focus());
    rerender(
      <DockPanel title="Details" labels={labels} collapsed>
        <Editor />
      </DockPanel>
    );
    expect(screen.getByRole('button', { name: labels.expand })).toHaveFocus();
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

  it('hides header actions and the footer without unmounting them', async () => {
    const user = userEvent.setup();
    render(
      <DockPanel
        title="Details"
        labels={labels}
        headerActions={<button type="button">Header action</button>}
        footer={<button type="button">Footer action</button>}
      >
        Content
      </DockPanel>
    );
    const headerAction = screen.getByRole('button', { name: 'Header action' });
    const footerAction = screen.getByRole('button', { name: 'Footer action' });
    await user.click(screen.getByRole('button', { name: labels.collapse }));
    expect(headerAction).toBeInTheDocument();
    expect(headerAction).not.toBeVisible();
    expect(footerAction).not.toBeVisible();
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

  it('does not restore focus after the user explicitly blurred the editor', () => {
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} collapsed={false}>
        <Editor />
      </DockPanel>
    );
    const input = screen.getByRole('textbox');
    act(() => input.focus());
    act(() => input.blur());
    rerender(
      <DockPanel title="Details" labels={labels} collapsed>
        <Editor />
      </DockPanel>
    );
    expect(screen.getByRole('button', { name: labels.expand })).not.toHaveFocus();
  });

  it('delegates closing to the parent', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <DockPanel title="Details" labels={labels} onClose={onClose}>
        Content
      </DockPanel>
    );
    await user.click(screen.getByRole('button', { name: labels.close }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('region')).toBeInTheDocument();
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

  it('forwards the ref and accepts per-instance dimensions', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DockPanel ref={ref} id="details" title="Details" labels={labels} width={420} height="60%">
        Content
      </DockPanel>
    );
    expect(ref.current).toBe(screen.getByRole('region'));
    expect(ref.current).toHaveAttribute('id', 'details');
    expect(ref.current?.style.getPropertyValue('--dock-panel-width')).toBe('420px');
    expect(ref.current?.style.getPropertyValue('--dock-panel-height')).toBe('60%');
  });

  it.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])(
    'accepts content height and a height limit for %s placement without leaking props to the DOM',
    (placement) => {
      render(
        <DockPanel title="Details" labels={labels} placement={placement} height="auto" maxHeight="calc(100% - 4rem)">
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('auto');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('calc(100% - 4rem)');
      expect(panel).not.toHaveAttribute('height');
      expect(panel).not.toHaveAttribute('maxHeight');
    }
  );

  it('converts a numeric maximum height to pixels', () => {
    render(
      <DockPanel title="Details" labels={labels} height="auto" maxHeight={480}>
        Content
      </DockPanel>
    );
    expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-max-height')).toBe('480px');
  });

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
      <DockPanel title="Details" labels={labels} height="auto" maxHeight="80%" onClose={jest.fn()}>
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
    expect(screen.getByRole('region').style.getPropertyValue('--dock-panel-max-height')).toBe('80%');
  });

  it('updates sizing without remounting content and removes an omitted height limit', () => {
    const { rerender } = render(
      <DockPanel title="Details" labels={labels} height="auto" maxHeight="80%">
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

  describe.each<DockPanelPlacement>(['left', 'right', 'top', 'bottom'])('%s controls', (placement) => {
    it.each([false, true])('keeps toggle and close together when collapsed=%s', (defaultCollapsed) => {
      render(
        <DockPanel
          title="Details"
          labels={labels}
          placement={placement}
          defaultCollapsed={defaultCollapsed}
          onClose={jest.fn()}
          headerActions={<button type="button">Custom action</button>}
        >
          Content
        </DockPanel>
      );

      const toggle = screen.getByRole('button', { name: defaultCollapsed ? labels.expand : labels.collapse });
      const close = screen.getByRole('button', { name: labels.close });
      const controls = toggle.closest('.tedi-dock-panel__controls');

      // The structural assertion prevents a title or custom action separating these controls.
      expect(controls).not.toBeNull();
      expect(controls).toContainElement(close);
      expect(controls).not.toContainElement(screen.getByRole('heading', { name: 'Details' }));
      expect(controls).not.toContainElement(screen.getByText('Custom action'));
      expect(close).toBeVisible();
    });

    it('can close while minimized without restoring first', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const onCollapsedChange = jest.fn();
      render(
        <DockPanel
          title="Details"
          labels={labels}
          placement={placement}
          defaultCollapsed
          onClose={onClose}
          onCollapsedChange={onCollapsedChange}
        >
          Content
        </DockPanel>
      );

      await user.click(screen.getByRole('button', { name: labels.close }));
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onCollapsedChange).not.toHaveBeenCalled();
      expect(screen.getByRole('region')).toHaveAttribute('data-collapsed', 'true');
    });
  });

  it('keeps restore and close consecutive in the minimized keyboard order', async () => {
    const user = userEvent.setup();
    render(
      <>
        <DockPanel title="Details" labels={labels} defaultCollapsed onClose={jest.fn()}>
          <Editor />
        </DockPanel>
        <button type="button">After panel</button>
      </>
    );

    await user.tab();
    expect(screen.getByRole('button', { name: labels.expand })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: labels.close })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'After panel' })).toHaveFocus();
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
      expect(panel).not.toHaveAttribute('size');
    });

    it.each(['small', 'default'] as const)('supports %s density independently of dimensions', (size) => {
      render(
        <DockPanel title="Details" labels={labels} size={size} width={420} height="70%">
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel).toHaveAttribute('data-size', size);
      expect(panel).not.toHaveAttribute('size');
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
        expect(panel).not.toHaveAttribute('width');
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
      expect(panel).not.toHaveAttribute('height');
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
        <DockPanel title="Details" labels={labels} width="calc(100% - 4rem)" height={360} maxHeight="90%">
          Content
        </DockPanel>
      );
      const panel = screen.getByRole('region');
      expect(panel.style.getPropertyValue('--dock-panel-width')).toBe('calc(100% - 4rem)');
      expect(panel.style.getPropertyValue('--dock-panel-height')).toBe('360px');
      expect(panel.style.getPropertyValue('--dock-panel-max-height')).toBe('90%');
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
    const ref = createRef<HTMLDivElement>();
    render(
      <DockPanelLayout
        ref={ref}
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
    expect(content).toHaveAttribute('data-dock-panel-layout-content');
    expect(content?.parentElement).toBe(ref.current);
    expect(panel.parentElement).toBe(ref.current);
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

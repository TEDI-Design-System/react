import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useId, useRef, useState } from 'react';
import { useArgs } from 'storybook/preview-api';

import { Button } from '../../../tedi/components/buttons/button/button';
import { TextField } from '../../../tedi/components/form/textfield/textfield';
import { Col, Row } from '../../../tedi/components/layout/grid';
import { DockPanel, DockPanelDimensionPreset, DockPanelLabels, DockPanelLayout, DockPanelProps } from './dock-panel';

const labels: DockPanelLabels = {
  collapse: 'Minimize panel',
  expand: 'Restore panel',
  close: 'Close panel',
};
const presets: readonly DockPanelDimensionPreset[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const SampleForm = () => {
  const id = useId();
  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-10)' }}>
      <TextField id={`${id}-name`} label="Name" defaultValue="Example item" />
      <TextField id={`${id}-description`} label="Description" defaultValue="Application-provided content" />
    </div>
  );
};
SampleForm.displayName = 'DockPanelSampleForm';

const ExampleContent = () => {
  const inputId = useId();
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-10)' }}>
      <p style={{ margin: 0 }}>Application content, not part of DockPanel.</p>
      <TextField id={inputId} label="Example value" defaultValue="Edit me, then minimize and restore" />
      <Button visualType="secondary" onClick={() => setCount((previous) => previous + 1)}>
        Content counter: {count}
      </Button>
      <p style={{ margin: 0 }}>Changing the placement, dimensions or density does not reset this content.</p>
    </div>
  );
};
ExampleContent.displayName = 'DockPanelExampleContent';

const ExampleFooter = ({ onCancel, message }: { onCancel?: () => void; message?: string }) => {
  const [saveCount, setSaveCount] = useState(0);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--tedi-dimensions-05)',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <span role="status" style={{ marginRight: 'auto' }}>
        {saveCount > 0 ? `Saved (demo): ${saveCount}` : message}
      </span>
      <Button visualType="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={() => setSaveCount((count) => count + 1)}>Save</Button>
    </div>
  );
};
ExampleFooter.displayName = 'DockPanelExampleFooter';

const Workspace = ({ children, height = '36rem' }: { children: ReactNode; height?: string }) => {
  const [count, setCount] = useState(0);
  return (
    <DockPanelLayout
      panel={children}
      style={{
        height,
        border: '1px solid var(--general-border-primary)',
        background: 'var(--general-surface-secondary)',
      }}
    >
      <div style={{ padding: 'var(--tedi-dimensions-10)' }}>
        <p>Expanded panels cover this workspace. Minimized panels reserve their own strip beside it.</p>
        <Button visualType="secondary" onClick={() => setCount((previous) => previous + 1)}>
          Workspace counter: {count}
        </Button>
      </div>
      <div
        style={{
          position: 'absolute',
          right: 'var(--tedi-dimensions-10)',
          bottom: 'var(--tedi-dimensions-10)',
        }}
      >
        <Button visualType="secondary" onClick={() => setCount((previous) => previous + 1)}>
          Background action: {count}
        </Button>
      </div>
    </DockPanelLayout>
  );
};
Workspace.displayName = 'DockPanelWorkspace';

interface PanelChoice {
  key: string;
  label: string;
  props?: Partial<DockPanelProps>;
}

interface PanelExampleProps {
  args: DockPanelProps;
  choices?: readonly PanelChoice[];
  closable?: boolean;
  onStateChange?: (collapsed: boolean) => void;
  workspaceHeight?: string;
}

const openChoice: readonly PanelChoice[] = [{ key: 'default', label: 'Open DockPanel' }];

// Only the demo owns visibility; DockPanel does not acquire an `open` prop or modal behaviour.
const PanelExample = ({
  args,
  choices = openChoice,
  closable = true,
  onStateChange,
  workspaceHeight,
}: PanelExampleProps) => {
  const [activeKey, setActiveKey] = useState<string>();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const generatedId = useId();
  const panelId = args.id ?? `dock-panel-example-${generatedId}`;
  const choice = choices.find((item) => item.key === activeKey);
  const collapsed = args.collapsed ?? internalCollapsed;

  const handleCollapsedChange = (next: boolean): void => {
    setInternalCollapsed(next);
    args.onCollapsedChange?.(next);
    onStateChange?.(next);
  };

  const handleClose = (): void => {
    setActiveKey(undefined);
    triggerRef.current?.focus();
    args.onClose?.();
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-10)' }}>
      <Row gutterY={2}>
        {choices.map((item) => (
          <Col key={item.key} xs="auto">
            <Button
              visualType="secondary"
              aria-expanded={activeKey === item.key && !collapsed}
              aria-controls={choice ? panelId : undefined}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                const initialCollapsed = item.props?.defaultCollapsed ?? args.defaultCollapsed ?? false;
                setActiveKey(item.key);
                handleCollapsedChange(initialCollapsed);
              }}
            >
              {item.label}
            </Button>
          </Col>
        ))}
        {choice && !closable && (
          <Col xs="auto">
            <Button visualType="secondary" onClick={handleClose}>
              Hide example
            </Button>
          </Col>
        )}
      </Row>
      {choice && (
        <Workspace height={workspaceHeight}>
          <DockPanel
            {...args}
            {...choice.props}
            id={panelId}
            collapsed={collapsed}
            onCollapsedChange={handleCollapsedChange}
            onClose={closable ? handleClose : undefined}
            footer={args.footer === undefined ? <ExampleFooter onCancel={handleClose} /> : args.footer}
          />
        </Workspace>
      )}
    </div>
  );
};
PanelExample.displayName = 'DockPanelButtonExample';

const componentDescription = `
A reusable **non-modal, docked panel**. Expanded panels cover the workspace; minimized panels do not.
Use **DockPanelLayout** with the workspace as \`children\` and DockPanel as \`panel\`.
The layout reserves a separate row or column for the minimized strip, then releases it when expanded or closed.
There is no dimmed backdrop, background click interception, focus trap or body-scroll lock.
Opening is owned by the application: render the panel to show it, remove it to close it.
Minimizing leaves a restore strip and **keeps the content mounted**.
The four inward arrows (\`zoom_in_map\`) minimize; four outward arrows (\`zoom_out_map\`) restore the
configured or resized size, **not fullscreen**. Collapsed side titles read bottom-to-top in smaller text.
Click the minimized title, bar or Restore button to restore. Close dismisses the panel without restoring it.

### Required props

| Prop | Purpose |
| --- | --- |
| \`title\` | Visible heading and accessible name. |
| \`children\` | Any application-provided React content. |
| \`labels\` | Translated button names: \`{ collapse, expand, close }\`. All three strings are required by this API. |

### Optional props

All other DockPanel-specific props are optional. The table below groups them by purpose and shows their types,
defaults and behaviour. Most commonly: \`placement\`, \`size\`, \`width\`, \`height\`, \`maxHeight\`,
\`footer\`, \`headerActions\`, \`onClose\` and the minimized-state props.

**Close button:** only providing \`onClose\` displays an ×. The first example omits it.
The callback requests dismissal; the application handles unsaved changes, removal and focus restoration.
In these examples, closing removes the panel and resets its content when reopened. Minimizing does not.

### Dimensions are not density

\`size="small"\` and \`size="default"\` change header/body/footer **padding**, following TEDI Modal.
The title defaults to h3 for default and h4 for small, including its text size when expanded.
Use \`headingElement\` to override the heading and expanded text size. Minimized titles keep their compact text.
They do not select a width or height and do not shrink the application-provided form controls.

| Preset | Side-panel \`width\` | \`height\` (any placement) |
| --- | --- | --- |
| \`xs\` | 25% of workspace width | 25% of workspace height |
| \`sm\` | 35% | 35% |
| \`md\` | 50% | 50% |
| \`lg\` | 65% | 65% |
| \`xl\` | 80% | 80% |

Width and height use the **same DockPanel percentage scale**, not fixed-pixel Modal width tokens.
An \`xl\` side panel leaves 20% of the workspace visible beside it, just as an \`xl\` top/bottom panel
leaves 20% above or below it. Without resizing enabled, presets resize proportionally with their containing workspace.
You can still use numbers (pixels), CSS lengths and percentages, or \`height="auto"\`.
Use \`width="100%"\` or \`height="100%"\` explicitly when the full available dimension is intended.
Omitted dimensions use side width \`xs\` (25%), side height 100%, and top/bottom height 50%.
Width is ignored for top/bottom panels, which fill the workspace width.
Custom dimensions remain capped by the workspace but are not restricted to the preset scale.

Enable \`resizable\` to drag the edge facing the workspace. The configured preset or custom dimension
is measured once to initialize Resizer in pixels. Resizing defaults to 8–92% of the current workspace.
Optional pixel limits (minWidth/maxWidth for sides, minHeight/maxHeight for top/bottom) replace each default independently.
Limits stay within the workspace; the maximum wins if it is smaller than the minimum.
Workspace resizing clamps an invalid saved size and preserves a valid one.
A larger workspace permits further dragging; a saved size within the new limits stays unchanged.
Minimize/restore preserves the resized dimensions and mounted content; closing and remounting
starts again from the configured size.

### Content height and containment

DockPanelLayout needs a defined height, either through its parent or its own style/class.
It is a layout-only companion, not a map component. Its required \`children\` are the underlying workspace;
its optional \`panel\` is a DockPanel or a layout-aware wrapper containing it. Omit the panel to close it.
When minimized, it reserves exactly the rail width/height. A custom wrapper must participate in the grid
when collapsed rather than remain absolutely positioned. DockPanel handles this when \`resizable\` is enabled.
A canvas-based map may need its own documented resize/update call when its container changes size.
\`height="auto" maxHeight={512}\` limits the expanded side panel to 512 pixels.
At the height limit, the body scrolls independently of the header and footer.
Header controls wrap in narrow panels; very shallow panels scroll the header internally.
A minimized side rail fills the workspace height; restoring it restores the expanded height.
A minimized top/bottom panel is always a compact horizontal strip.

### State and accessibility

Omit \`collapsed\` for internal state (optionally initialize it with \`defaultCollapsed\`).
For application-controlled state, pass \`collapsed\` plus \`onCollapsedChange\` and apply each requested value.
\`defaultCollapsed\` is only an initial value, not a command to reset the component.
The minimize/restore button exposes \`aria-expanded\` and \`aria-controls\`; hidden content is not tabbable.
Minimize/restore and Close remain grouped, including in the minimized rail.
Example footers contain **Cancel** and **Save** buttons. Cancel closes the example; Save only updates a
local demo status (no backend call). Footer state survives minimization. All actions remain application-owned.
Use \`id\` to connect external controls, \`className\`/\`style\` for styling, and \`headingElement\` for the heading level.
The required title names the panel.

### Examples

Like the TEDI-Ready Modal documentation, examples begin with **opening buttons** rather than permanently open panels.
**Size**, **Width** and **Height** let you compare variants. **Position** demonstrates all four edges,
including their minimized layouts: use the header controls rather than separate minimized examples.
The remaining examples cover custom dimensions, content height, overflow, controlled state,
external minimization through \`minimizeCounter\` and resizing through \`resizable\`.
The default preview also provides live Controls. Select a story's Canvas for more preview space.
`;

const publicProps = [
  'title',
  'description',
  'children',
  'labels',
  'placement',
  'size',
  'resizable',
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'collapsed',
  'defaultCollapsed',
  'minimizeCounter',
  'onCollapsedChange',
  'onClose',
  'headerActions',
  'footer',
  'headingElement',
  'id',
  'className',
  'style',
];

const meta = {
  title: 'Community/Layout/DockPanel',
  component: DockPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst', include: publicProps },
    docs: { description: { component: componentDescription } },
  },
  args: {
    title: 'Details',
    labels,
    placement: 'right',
    size: 'default',
    children: <ExampleContent />,
  },
  argTypes: {
    title: {
      control: 'text',
      type: { name: 'string', required: true },
      description: 'Required. Visible heading and accessible name.',
      table: { category: 'Required props', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description:
        'Text below the title, styled like Modal.Header. Hidden while minimized; omitted or empty text adds no spacing.',
      table: {
        category: 'Optional props',
        subcategory: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: false,
      type: { name: 'other', value: 'ReactNode', required: true },
      description: 'Required. Application content; remains mounted while minimized.',
      table: { category: 'Required props', type: { summary: 'ReactNode' } },
    },
    labels: {
      control: 'object',
      type: { name: 'other', value: 'DockPanelLabels', required: true },
      description: 'Required. All three translated names are required. close does not itself enable the Close button.',
      table: {
        category: 'Required props',
        type: { summary: 'DockPanelLabels', detail: '{ collapse: string; expand: string; close: string; }' },
      },
    },
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Optional. Edge of the positioned workspace. Changing it does not recreate the panel content.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'right' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'default'],
      description:
        'Optional. Panel density, independent of width/height. Uses TEDI Modal padding tokens. The title defaults to h3 for default and h4 for small, unless headingElement is supplied.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'default' } },
    },
    resizable: {
      control: 'boolean',
      description:
        'Enables dragging the workspace-facing edge, within 8–92% of the workspace by default. Pixel min/max props replace the corresponding defaults. Minimize/restore preserves the resized dimensions.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'false' } },
    },
    width: {
      control: 'text',
      description:
        'Optional. Left/right expanded width: xs=25%, sm=35%, md=50%, lg=65%, xl=80% of workspace width, a CSS length, or number in pixels. Top/bottom ignore it. Use 100% explicitly for full width. In this text control use 480px rather than a unitless 480.',
      table: {
        category: 'Optional props',
        subcategory: 'Layout',
        type: { summary: 'DockPanelWidth', detail: '"xs" | "sm" | "md" | "lg" | "xl" | CSSProperties["width"]' },
        defaultValue: { summary: 'xs (25% of workspace width)' },
      },
    },
    height: {
      control: 'text',
      description:
        'Optional. Every placement: xs=25%, sm=35%, md=50%, lg=65%, xl=80%, a CSS length, auto, or number in pixels. Percentages use the workspace height.',
      table: {
        category: 'Optional props',
        subcategory: 'Layout',
        type: { summary: 'DockPanelHeight', detail: '"xs" | "sm" | "md" | "lg" | "xl" | CSSProperties["height"]' },
        defaultValue: { summary: '100% (side); 50% (top/bottom)' },
      },
    },
    minWidth: {
      control: 'number',
      description: 'Minimum side-panel resize width in pixels. Defaults to 8% of workspace width.',
      table: { category: 'Optional props', subcategory: 'Layout', type: { summary: 'number' } },
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum side-panel width in pixels. Defaults to 92% when resizable; otherwise workspace width.',
      table: { category: 'Optional props', subcategory: 'Layout', type: { summary: 'number' } },
    },
    minHeight: {
      control: 'number',
      description: 'Minimum top/bottom resize height in pixels. Defaults to 8% of workspace height.',
      table: { category: 'Optional props', subcategory: 'Layout', type: { summary: 'number' } },
    },
    maxHeight: {
      control: 'number',
      description:
        'Optional maximum expanded height in pixels. Defaults to 92% of workspace height for top/bottom resizing; otherwise the workspace height. Body content scrolls at this limit.',
      table: {
        category: 'Optional props',
        subcategory: 'Layout',
        type: { summary: 'number' },
        defaultValue: { summary: '92% (top/bottom resizing); workspace height otherwise' },
      },
    },
    collapsed: {
      control: 'boolean',
      description:
        'Optional. Controlled minimized state. Apply onCollapsedChange to keep the toggle interactive. Omit it for internal state. The Default story synchronizes this control with its toggle.',
      table: {
        category: 'Optional props',
        subcategory: 'State',
        defaultValue: { summary: 'undefined (uncontrolled)' },
      },
    },
    defaultCollapsed: {
      control: 'boolean',
      description:
        'Optional. Initial internal state only; ignored when collapsed is supplied. In examples it is reapplied on opening, not while editing an open panel.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'false' } },
    },
    minimizeCounter: {
      control: 'number',
      description:
        'Application-owned minimize counter. The initial value is ignored. Changes in either direction request minimization only while expanded; unchanged values do nothing. Restoring does not require changing the counter. In controlled mode, apply onCollapsedChange(true).',
      table: {
        category: 'Optional props',
        subcategory: 'State',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onCollapsedChange: {
      control: false,
      description:
        'Receives the next minimized state requested by the toggle or minimizeCounter. In controlled mode, update collapsed with this value.',
      table: {
        category: 'Optional props',
        subcategory: 'Events',
        type: { summary: '(collapsed: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onClose: {
      control: false,
      description:
        'Optional. Enables × and requests dismissal. The application owns removal and focus restoration. Omit to hide ×. Does not minimize the panel.',
      table: {
        category: 'Optional props',
        subcategory: 'Events',
        type: { summary: '() => void' },
        defaultValue: { summary: 'undefined (no close button)' },
      },
    },
    headerActions: {
      control: false,
      description:
        'React content before the grouped minimize/restore and Close controls. Hidden but kept mounted while minimized.',
      table: {
        category: 'Optional props',
        subcategory: 'Content',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    footer: {
      control: false,
      description:
        'Optional. React content below the scrolling body. Hidden while minimized; mounted state is preserved.',
      table: {
        category: 'Optional props',
        subcategory: 'Content',
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },

    headingElement: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description:
        'Optional. Overrides the title heading and expanded text size. Defaults to h3 for default and h4 for small. Minimized titles keep their compact text.',
      table: {
        category: 'Optional props',
        subcategory: 'Accessibility',
        defaultValue: { summary: 'h3 (default), h4 (small)' },
      },
    },
    id: {
      control: 'text',
      description: 'Optional. Panel id; a unique id is generated when omitted.',
      table: {
        category: 'Optional props',
        subcategory: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'Generated unique id' },
      },
    },
    className: {
      control: 'text',
      description: 'Optional. Additional class names on the panel root.',
      table: {
        category: 'Optional props',
        subcategory: 'Styling',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    style: {
      control: 'object',
      description:
        'Optional. Root CSS styles. Prefer the dimension props for sizing; they set the corresponding CSS custom properties.',
      table: {
        category: 'Optional props',
        subcategory: 'Styling',
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<DockPanelProps>();
    return <PanelExample args={args} onStateChange={(collapsed) => updateArgs({ collapsed })} />;
  },
} satisfies Meta<typeof DockPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onClose: undefined, description: 'Additional information about this item.' },
  render: function Render(args) {
    const [, updateArgs] = useArgs<DockPanelProps>();
    return <PanelExample args={args} closable={false} onStateChange={(collapsed) => updateArgs({ collapsed })} />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Open the panel, then use Controls to change placement, density or dimensions. No × button: onClose is omitted. Hide example is an external demo control, not part of DockPanel.',
      },
      source: {
        language: 'tsx',
        type: 'code',
        code: `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();

  function closePanel() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button ref={openButtonRef} visualType="secondary" onClick={() => {
          setOpen(true);
          setCollapsed(false);
        }}>
          Open DockPanel
        </Button>
        <Button visualType="secondary" disabled={!open} onClick={closePanel}>Hide example</Button>
      </div>
      <DockPanelLayout style={{ height: '36rem' }} panel={open ? (
        <DockPanel
          title="Details"
          description="Additional information about this item."
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
        >
          <TextField id={inputId} label="Example value" defaultValue="Edit me, then minimize and restore" />
        </DockPanel>
      ) : null}>
        <p>Your workspace.</p>
      </DockPanelLayout>
    </>
  );
}`,
      },
    },
  },
};

const presetExampleSource = (dimension: 'width' | 'height'): string => `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout, type DockPanelDimensionPreset } from '@tedi-design-system/react/community';

export function Example() {
  const [preset, setPreset] = useState<DockPanelDimensionPreset>();
  const [collapsed, setCollapsed] = useState(false);
  const inputId = useId();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const close = () => { setPreset(undefined); trigger.current?.focus(); };
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((value) => (
          <Button key={value} visualType="secondary" onClick={(event) => {
            trigger.current = event.currentTarget;
            setPreset(value);
            setCollapsed(false);
          }}>{value}</Button>
        ))}
      </div>
      <DockPanelLayout style={{ height: '${dimension === 'height' ? '48rem' : '36rem'}' }} panel={preset ? (
        <DockPanel
          title="Details"
          placement="${dimension === 'width' ? 'right' : 'bottom'}"
          ${dimension}={preset}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={close}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={close}>Cancel</Button>}
        >
          <TextField id={inputId} label="Name" defaultValue="Edit me, then switch examples" />
        </DockPanel>
      ) : null}>
        <p>Your underlying workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const sizeExampleSource = `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout, type DockPanelSize } from '@tedi-design-system/react/community';

export function Example() {
  const [size, setSize] = useState<DockPanelSize>();
  const [collapsed, setCollapsed] = useState(false);
  const inputId = useId();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const close = () => { setSize(undefined); trigger.current?.focus(); };
  return (
    <>
      {(['small', 'default'] as const).map((value) => (
        <Button key={value} visualType="secondary" onClick={(event) => {
          trigger.current = event.currentTarget;
          setSize(value);
          setCollapsed(false);
        }}>Open {value} DockPanel</Button>
      ))}
      <DockPanelLayout style={{ height: '36rem' }} panel={size ? (
        <DockPanel title="Details" size={size} width="sm" height="auto" maxHeight={512}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={close}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={close}>Cancel</Button>}
        >
          <TextField id={inputId} label="Name" defaultValue="Edit me, then switch examples" />
        </DockPanel>
      ) : null}>
        <p>Your underlying workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const sizeChoices: readonly PanelChoice[] = [
  {
    key: 'small',
    label: 'Open small DockPanel',
    props: { size: 'small', title: 'Small DockPanel', width: 'sm', height: 'auto', maxHeight: 512 },
  },
  {
    key: 'default',
    label: 'Open default DockPanel',
    props: { size: 'default', title: 'Default DockPanel', width: 'sm', height: 'auto', maxHeight: 512 },
  },
];

export const Size: Story = {
  args: { children: <SampleForm /> },
  argTypes: {
    collapsed: { control: false },
    size: { control: false },
    width: { control: false },
    height: { control: false },
  },
  render: (args) => <PanelExample args={args} choices={sizeChoices} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: sizeExampleSource },
      description: {
        story:
          'Small and default use the same width, content and footer. Small reduces panel padding using TEDI Modal density tokens. The title defaults to h3 for default and h4 for small, with matching text sizes. The form controls and minimized title styling are unchanged.',
      },
    },
  },
};

const widthChoices: readonly PanelChoice[] = presets.map((width) => ({
  key: width,
  label: width,
  props: { width, placement: 'right', title: `Width: ${width}` },
}));

export const Width: Story = {
  args: { children: <SampleForm /> },
  argTypes: { collapsed: { control: false }, width: { control: false }, placement: { control: false } },
  render: (args) => <PanelExample args={args} choices={widthChoices} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: presetExampleSource('width') },
      description: {
        story:
          'Click xs, sm, md, lg or xl to open a right-docked panel at 25%, 35%, 50%, 65% or 80% of workspace width. The scale matches Height. Even xl leaves 20% of the workspace visible and interactive beside the panel. Switching buttons while open preserves content, and resizing the workspace updates the panel proportionally.',
      },
    },
  },
};

const heightChoices: readonly PanelChoice[] = presets.map((height) => ({
  key: height,
  label: height,
  props: { height, placement: 'bottom', title: `Height: ${height}` },
}));

export const Height: Story = {
  args: { children: <SampleForm /> },
  argTypes: { collapsed: { control: false }, height: { control: false }, placement: { control: false } },
  render: (args) => <PanelExample args={args} choices={heightChoices} workspaceHeight="48rem" />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: presetExampleSource('height') },
      description: {
        story:
          'This example uses a 48rem-high workspace to make the smallest panel usable. Click xs, sm, md, lg or xl to open a bottom DockPanel at 25%, 35%, 50%, 65%, or 80% of workspace height. The scale matches Width; xl leaves 20% of the workspace visible and interactive above the panel. The full-width panel has a scrolling body when its content needs more room; the header and footer stay visible.',
      },
    },
  },
};

const positionExampleSource = `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout, type DockPanelPlacement } from '@tedi-design-system/react/community';

export function Example() {
  const [placement, setPlacement] = useState<DockPanelPlacement>();
  const [collapsed, setCollapsed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputId = useId();

  function closePanel() {
    setPlacement(undefined);
    triggerRef.current?.focus();
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        {(['left', 'right', 'top', 'bottom'] as const).map((position) => (
          <Button key={position} visualType="secondary" onClick={(event) => {
            triggerRef.current = event.currentTarget;
            setPlacement(position);
            setCollapsed(false);
          }}>
            {position}
          </Button>
        ))}
      </div>
      <DockPanelLayout style={{ height: '36rem' }} panel={placement ? (
        <DockPanel
          title={'DockPanel: ' + placement}
          placement={placement}
          width="md"
          height={placement === 'left' || placement === 'right' ? '100%' : 'md'}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={closePanel}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
        >
          <TextField id={inputId} label="Name" defaultValue="Edit me, then change position" />
        </DockPanel>
      ) : null}>
        <p>Your workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const customDimensionsExampleSource = `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [example, setExample] = useState<'side' | 'bottom'>();
  const [collapsed, setCollapsed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputId = useId();
  const isSidePanel = example === 'side';

  function openPanel(next: 'side' | 'bottom', trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setExample(next);
    setCollapsed(false);
  }

  function closePanel() {
    setExample(undefined);
    triggerRef.current?.focus();
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button visualType="secondary" onClick={(event) => openPanel('side', event.currentTarget)}>
          Side: 420px × 70%
        </Button>
        <Button visualType="secondary" onClick={(event) => openPanel('bottom', event.currentTarget)}>
          Bottom: 320px high
        </Button>
      </div>
      <DockPanelLayout style={{ height: '36rem' }} panel={example ? (
        <DockPanel
          title="Custom dimensions"
          placement={isSidePanel ? 'right' : 'bottom'}
          width={isSidePanel ? 420 : undefined}
          height={isSidePanel ? '70%' : 320}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={closePanel}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
        >
          <TextField id={inputId} label="Name" defaultValue="Edit me, then switch examples" />
        </DockPanel>
      ) : null}>
        <p>Your workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const contentHeightExampleSource = `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sectionCount, setSectionCount] = useState(0);
  const [backgroundCount, setBackgroundCount] = useState(0);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();

  function closePanel() {
    setOpen(false);
    setSectionCount(0);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <Button ref={openButtonRef} visualType="secondary" onClick={() => {
        setOpen(true);
        setCollapsed(false);
      }}>
        Open DockPanel
      </Button>
      <DockPanelLayout style={{ height: '36rem' }} panel={open ? (
        <DockPanel
          title="Content-height details"
          width={420}
          height="auto"
          maxHeight={512}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={closePanel}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
        >
          <TextField id={inputId} label="Example value" defaultValue="Edit me" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
            <Button disabled={sectionCount >= 20} onClick={() => setSectionCount((count) => count + 1)}>
              Add section
            </Button>
            <Button visualType="secondary" disabled={sectionCount === 0}
              onClick={() => setSectionCount((count) => count - 1)}>
              Remove section
            </Button>
          </div>
          {Array.from({ length: sectionCount }, (_, index) => (
            <p key={index}>Section {index + 1}. More content makes the panel grow until it reaches its limit.</p>
          ))}
        </DockPanel>
      ) : null}>
        <p>Your workspace stays interactive.</p>
        <Button visualType="secondary" onClick={() => setBackgroundCount((count) => count + 1)}>
          Background action ({backgroundCount})
        </Button>
      </DockPanelLayout>
    </>
  );
}`;

const controlledExampleSource = `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [minimizeCounter, setMinimizeCounter] = useState(0);
  const [message, setMessage] = useState('No header action yet.');
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();

  function closePanel() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button ref={openButtonRef} visualType="secondary" onClick={() => {
          setOpen(true);
          setCollapsed(false);
        }}>
          Open / restore panel
        </Button>
        <Button visualType="secondary" disabled={!open}
          onClick={() => setMinimizeCounter((previous) => previous + 1)}>
          Minimize panel
        </Button>
      </div>
      <DockPanelLayout style={{ height: '36rem' }} panel={open ? (
        <DockPanel
          title="Details"
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          minimizeCounter={minimizeCounter}
          onClose={closePanel}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          headerActions={
            <Button visualType="secondary" size="small" onClick={() => setMessage('Header action clicked.')}>
              Example action
            </Button>
          }
          footer={<>
            <span role="status">{message}</span>
            <Button visualType="secondary" onClick={closePanel}>Cancel</Button>
          </>}
        >
          <TextField id={inputId} label="Name" defaultValue="Edit me, then minimize and restore" />
        </DockPanel>
      ) : null}>
        <p>Your workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const overflowExampleSource = (contentHeight: boolean): string => `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();

  function closePanel() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <Button ref={openButtonRef} visualType="secondary" onClick={() => {
        setOpen(true);
        setCollapsed(false);
      }}>
        Open DockPanel
      </Button>
      <DockPanelLayout style={{ height: '36rem' }} panel={open ? (
        <DockPanel
          ${
            contentHeight
              ? 'title="Long content, shorter panel"\n          width={420}\n          height="auto"\n          maxHeight={512}'
              : 'title="Long content"'
          }
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          onClose={closePanel}
          labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
          footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
        >
          <TextField id={inputId} label="Example value" defaultValue="Edit me, then minimize and restore" />
          {Array.from({ length: 20 }, (_, index) => (
            <p key={index}>Paragraph {index + 1}. The body scrolls while the footer stays outside it.</p>
          ))}
        </DockPanel>
      ) : null}>
        <p>Your workspace.</p>
      </DockPanelLayout>
    </>
  );
}`;

const resizeExampleSource = (dimension: 'width' | 'height'): string => `import { useId, useRef, useState } from 'react';
import { Button, TextField } from '@tedi-design-system/react/tedi';
import { DockPanel, DockPanelLayout } from '@tedi-design-system/react/community';

export function Example() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isWorkspaceSmaller, setIsWorkspaceSmaller] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputId = useId();

  function closePanel() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button visualType="secondary" onClick={() => setIsWorkspaceSmaller((smaller) => !smaller)}>
          {isWorkspaceSmaller ? 'Restore workspace size' : 'Make workspace smaller'}
        </Button>
        <Button ref={openButtonRef} visualType="secondary" onClick={() => {
          setOpen(true);
          setCollapsed(false);
        }}>
          Open DockPanel
        </Button>
      </div>
      <div style={{ width: isWorkspaceSmaller ? '60%' : '100%' }}>
        <DockPanelLayout style={{ height: isWorkspaceSmaller ? '24rem' : '36rem' }} panel={open ? (
          <DockPanel
            title="Resizable details"
            ${
              dimension === 'width'
                ? 'placement="right"\n            width="md"\n            height="70%"'
                : 'placement="bottom"\n            height="auto"'
            }
            resizable
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
            onClose={closePanel}
            labels={{ collapse: 'Minimize panel', expand: 'Restore panel', close: 'Close panel' }}
            footer={<Button visualType="secondary" onClick={closePanel}>Cancel</Button>}
          >
            <TextField id={inputId} label="Example value" defaultValue="Edit me before resizing" />
            <p>Drag the workspace-facing edge to resize the panel.</p>
          </DockPanel>
        ) : null}>
          <p>Your workspace.</p>
        </DockPanelLayout>
      </div>
    </>
  );
}`;

const placementChoices: readonly PanelChoice[] = (['left', 'right', 'top', 'bottom'] as const).map((placement) => ({
  key: placement,
  label: placement[0].toUpperCase() + placement.slice(1),
  props: {
    placement,
    title: `DockPanel: ${placement}`,
    width: 'md',
    height: placement === 'left' || placement === 'right' ? '100%' : 'md',
  },
}));

export const Position: Story = {
  argTypes: {
    collapsed: { control: false },
    placement: { control: false },
    width: { control: false },
    height: { control: false },
  },
  render: (args) => <PanelExample args={args} choices={placementChoices} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: positionExampleSource },
      description: {
        story: `Choose **Left**, **Right**, **Top** or **Bottom** to open or move the same panel.
This example uses \`md\` (50%) on the docking axis: side panels fill the workspace height;
top/bottom panels fill its width. Expanded panels overlay the workspace. Minimized strips occupy a separate grid track, so no workspace content is covered. The background remains interactive.

| Position | Expanded | Minimized |
| --- | --- | --- |
| Left | 50% width, full height, attached to the left edge | Vertical strip at the left edge |
| Right | 50% width, full height, attached to the right edge | Vertical strip at the right edge |
| Top | Full width, 50% height, attached to the top edge | Horizontal strip at the top edge |
| Bottom | Full width, 50% height, attached to the bottom edge | Horizontal strip at the bottom edge |

**Minimize and restore here** using the header button. Restore and Close stay grouped:
stacked above the smaller, bottom-to-top title on side strips, or adjacent at the end of horizontal strips. Inward arrows minimize; outward arrows restore the configured size.
The same panel and children stay mounted while switching positions or minimizing, so edited
form values and the content counter are preserved. Switching position buttons restores the
expanded view by default; set \`defaultCollapsed\` before opening to start minimized.
Closing is separate: it unmounts this example, and reopening starts with fresh content.

Custom side heights and top/bottom heights use the existing \`height\` prop;
see **Custom dimensions** and **Content height** rather than separate per-edge examples.`,
      },
    },
  },
};

export const CustomDimensions: Story = {
  name: 'Custom dimensions',
  argTypes: {
    collapsed: { control: false },
    width: { control: false },
    height: { control: false },
    placement: { control: false },
  },
  render: (args) => (
    <PanelExample
      args={args}
      choices={[
        { key: 'side', label: 'Side: 420px × 70%', props: { placement: 'right', width: 420, height: '70%' } },
        { key: 'bottom', label: 'Bottom: 320px high', props: { placement: 'bottom', height: 320 } },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: customDimensionsExampleSource },
      description: {
        story:
          'Presets are optional. Numeric values are pixels; CSS values such as 70%, 30rem and calc(100% - 4rem) still work. A custom side height leaves the workspace visible and usable underneath.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <ExampleContent />
        {Array.from({ length: 20 }, (_, index) => (
          <p key={index}>Example paragraph {index + 1}. Only the body scrolls; the header and footer remain visible.</p>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: overflowExampleSource(false) },
      description: {
        story:
          'A long body scrolls independently of the header and footer. Minimize and restore to verify that the input and content counter are preserved.',
      },
    },
  },
};

const ContentHeightContent = () => {
  const inputId = useId();
  const [sectionCount, setSectionCount] = useState(0);

  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-08)' }}>
      <p style={{ margin: 0 }}>The panel grows with its content, leaving the workspace visible underneath.</p>
      <TextField id={inputId} label="Example value" defaultValue="Your changes survive minimization" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button
          visualType="secondary"
          disabled={sectionCount >= 20}
          onClick={() => setSectionCount((count) => count + 1)}
        >
          Add section
        </Button>
        <Button
          visualType="secondary"
          disabled={sectionCount === 0}
          onClick={() => setSectionCount((count) => count - 1)}
        >
          Remove section
        </Button>
      </div>
      {Array.from({ length: sectionCount }, (_, index) => (
        <p key={index} style={{ margin: 0 }}>
          Section {index + 1}. Add more sections to reach the height limit, then scroll the content.
        </p>
      ))}
    </div>
  );
};
ContentHeightContent.displayName = 'DockPanelContentHeightContent';

export const ContentHeight: Story = {
  name: 'Content height',
  args: {
    placement: 'right',
    title: 'Content-height details',
    width: 420,
    height: 'auto',
    maxHeight: 512,
    children: <ContentHeightContent />,
  },
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: contentHeightExampleSource },
      description: {
        story:
          'height="auto" fits the content. maxHeight={512} caps the panel at 512 pixels, leaving space below in this example. ' +
          'Add or remove sections to see the panel grow and shrink; only the content scrolls at the limit. ' +
          'Try the Background action below the panel: no invisible overlay intercepts it. ' +
          'Switch placement to left to try the same behaviour on the other side. ' +
          'Minimizing fills the workspace height without resetting the content; restoring returns to the expanded height.',
      },
    },
  },
};

export const ContentHeightOverflow: Story = {
  name: 'Content height with overflow',
  args: {
    placement: 'right',
    title: 'Long content, shorter panel',
    width: 420,
    height: 'auto',
    maxHeight: 512,
    children: (
      <>
        <ExampleContent />
        {Array.from({ length: 20 }, (_, index) => (
          <p key={index}>Paragraph {index + 1}. Only this content area scrolls; the footer stays visible.</p>
        ))}
      </>
    ),
  },
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: overflowExampleSource(true) },
      description: {
        story:
          'Long content reaches maxHeight and scrolls internally. The header and footer remain visible, ' +
          'and the background below the 512-pixel panel remains visible and interactive.',
      },
    },
  },
};

// Each demo, not DockPanel, owns mounting and focus restoration after dismissal.
const usePanelVisibility = (onClose: DockPanelProps['onClose']) => {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const handleClose = (): void => {
    setOpen(false);
    openButtonRef.current?.focus();
    onClose?.();
  };
  return { open, setOpen, openButtonRef, handleClose };
};

const ControlledExample = (args: DockPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [minimizeCounter, setMinimizeCounter] = useState(0);
  const [message, setMessage] = useState('No header action yet.');
  const { open, setOpen, openButtonRef, handleClose } = usePanelVisibility(args.onClose);

  const handleCollapsedChange = (next: boolean): void => {
    setCollapsed(next);
    args.onCollapsedChange?.(next);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-08)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tedi-dimensions-04)' }}>
        <Button
          visualType="secondary"
          ref={openButtonRef}
          onClick={() => {
            setOpen(true);
            setCollapsed(false);
          }}
        >
          Open / restore panel
        </Button>
        <Button visualType="secondary" disabled={!open} onClick={() => setMinimizeCounter((counter) => counter + 1)}>
          Minimize panel
        </Button>
      </div>
      {open && (
        <Workspace>
          <DockPanel
            {...args}
            collapsed={collapsed}
            minimizeCounter={minimizeCounter}
            onCollapsedChange={handleCollapsedChange}
            onClose={handleClose}
            headerActions={
              <Button visualType="secondary" size="small" onClick={() => setMessage('Header action clicked.')}>
                Example action
              </Button>
            }
            footer={<ExampleFooter onCancel={handleClose} message={message} />}
          />
        </Workspace>
      )}
    </div>
  );
};
ControlledExample.displayName = 'DockPanelControlledExample';

export const Controlled: Story = {
  argTypes: {
    collapsed: { control: false },
    defaultCollapsed: { control: false },
    minimizeCounter: { control: false },
  },
  render: (args) => <ControlledExample {...args} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: controlledExampleSource },
      description: {
        story:
          'The external Minimize panel button increments minimizeCounter. DockPanel requests onCollapsedChange(true), ' +
          'and this example applies it to controlled collapsed state. Restore using the panel control or Open / restore panel; ' +
          'the counter does not need to change. Minimize again while already minimized to verify that it stays minimized. ' +
          'Minimizing preserves child state. Closing unmounts the panel, so reopening creates fresh child state.',
      },
    },
  },
};

const ResizeExample = (args: DockPanelProps) => {
  const [isWorkspaceSmaller, setIsWorkspaceSmaller] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--tedi-dimensions-10)' }}>
      <div>
        <Button visualType="secondary" onClick={() => setIsWorkspaceSmaller((smaller) => !smaller)}>
          {isWorkspaceSmaller ? 'Restore workspace size' : 'Make workspace smaller'}
        </Button>
      </div>
      <div style={{ width: isWorkspaceSmaller ? '60%' : '100%' }}>
        <PanelExample args={args} workspaceHeight={isWorkspaceSmaller ? '24rem' : '36rem'} />
      </div>
    </div>
  );
};
ResizeExample.displayName = 'DockPanelResizeExample';

export const ResizeWidth: Story = {
  name: 'Resize width',
  args: { placement: 'right', title: 'Resizable details', resizable: true, width: 'md', height: '70%' },
  argTypes: { collapsed: { control: false } },
  render: (args) => <ResizeExample {...args} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: resizeExampleSource('width') },
      description: {
        story:
          'Drag the left edge. width="md" starts at 50%; the default limits are 8–92% of the workspace width. ' +
          'Edit the form, drag near the maximum, then make the workspace smaller: the width is clamped and your edits remain. ' +
          'Restore the workspace size: the panel keeps its width, and you can drag it wider again. ' +
          'Minimize this shorter panel: its rail fills the workspace height and hides the resize handle. ' +
          'Click the minimized title or bar to restore its previous width and short height. Close only closes. ' +
          'To try pixel limits, close the panel, set minWidth=240 and maxWidth=640 in Controls, then reopen.',
      },
    },
  },
};

export const ResizeHeight: Story = {
  name: 'Resize height',
  args: { placement: 'bottom', title: 'Resizable details', resizable: true, height: 'auto' },
  argTypes: { collapsed: { control: false } },
  render: (args) => <ResizeExample {...args} />,
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: resizeExampleSource('height') },
      description: {
        story:
          'height="auto" starts at the content height, within the default 8–92% workspace limits. ' +
          'Drag the top edge to resize. ' +
          'Edit the form, drag near the maximum, then make the workspace smaller: the height is clamped and your edits remain. ' +
          'Restore the workspace size: the panel keeps its height, and you can drag it taller again. ' +
          'Minimize, then click the title or bar to restore the saved height. The handle is hidden while minimized. ' +
          'To try pixel limits, close the panel, set minHeight=160 and maxHeight=400 in Controls, then reopen.',
      },
    },
  },
};

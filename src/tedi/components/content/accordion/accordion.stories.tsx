import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { useBreakpointProps } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Checkbox } from '../../form/checkbox/checkbox';
import { Link } from '../../navigation/link/link';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { Accordion, AccordionProps } from './accordion';
import { AccordionItemProps } from './accordion-item/accordion-item';
import { AccordionItemContentProps } from './accordion-item-content/accordion-item-content';
import { AccordionItemHeaderProps } from './accordion-item-header/accordion-item-header';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.30.43?node-id=8048-69789" target="_blank">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/00e937-accordion" target="_blank">Zeroheight ↗</a><br /><br />
 */

export default {
  title: 'TEDI-Ready/Content/Accordion',
  component: Accordion,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'One or more `Accordion.Item` components.',
      table: { category: 'Accordion', type: { summary: 'ReactNode' } },
    },
    className: {
      control: 'text',
      description: 'Extra class applied to the Accordion host element.',
      table: { category: 'Accordion', type: { summary: 'string' } },
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple accordion items can be opened at once.',
      table: { category: 'Accordion', defaultValue: { summary: 'false' } },
    },
    defaultServerBreakpoint: {
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description:
        'Default breakpoint used during server-side rendering, before the ' +
        'real viewport size is known. Only matters if you ship the Accordion ' +
        'through SSR and want a specific breakpoint variant to render in the ' +
        'initial HTML. Has no effect after hydration — once the browser knows ' +
        'the viewport size, the actual breakpoint takes over.',
      table: { category: 'Accordion' },
    },
    itemGap: {
      control: { type: 'number', min: 0, step: 0.25 },
      description:
        'Vertical gap between sibling Accordion items in rem. ' +
        'Forwarded as the `--tedi-accordion-item-gap` CSS variable. ' +
        'Defaults to the design-token value `var(--layout-grid-gutters-08)` (0.5rem) when omitted.',
      table: { category: 'Accordion', defaultValue: { summary: '0.5' } },
    },
    // Internally keyed `accordionDefaultExpanded` to avoid colliding with the
    // item-level `defaultExpanded` arg below — Storybook's args namespace is
    // flat, so we'd otherwise wire one value into two unrelated props. The
    // `name` field restores the displayed key to `defaultExpanded` in the
    // controls/docs table so users see the real API name.
    accordionDefaultExpanded: {
      name: 'defaultExpanded',
      control: 'boolean',
      description:
        'Group-level default for the items initial expanded state. ' +
        'Items use this value when they do not specify their own `defaultExpanded`. ' +
        'Per-item overrides (including explicit `false`) take precedence.',
      table: { category: 'Accordion', defaultValue: { summary: 'false' } },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the accordion item is initially expanded or collapsed.',
      table: { category: 'Accordion Item', defaultValue: { summary: 'false' } },
    },
    onToggle: {
      action: 'onToggle',
      description: 'Called whenever the user toggles the item. Receives the next expanded state.',
      table: { category: 'Accordion Item' },
    },
    showIconCard: {
      control: 'boolean',
      description: 'Whether to show the icon card.',
      table: { category: 'Accordion Item', defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Marks the accordion item as selected.',
      table: { category: 'Accordion Item', defaultValue: { summary: 'false' } },
    },
    headerClickable: {
      control: 'boolean',
      description:
        'Defines whether the entire header acts as the toggle trigger.\n\n' +
        '`true` (default): the header is rendered as a button.\n\n' +
        '`false`: the header is rendered as a non-interactive container. The default expand action ' +
        'is still rendered alongside it unless `showDefaultExpandAction` is also set to `false`.',
      table: { category: 'Accordion Item Header', defaultValue: { summary: 'true' } },
    },
    titleLayout: {
      control: 'radio',
      options: ['hug', 'fill'],
      description:
        'Controls how the title stretches.\n\n' +
        '`hug`: wraps tightly around content.\n\n' +
        '`fill`: expands to available space and pushes trailing elements to the end.',
      table: { category: 'Accordion Item Header', defaultValue: { summary: 'hug' } },
    },
    openText: {
      control: 'text',
      description:
        'Text shown when the accordion is collapsed. Rendered literally — ' +
        'translate at the call site if needed. When omitted, falls back to the translated ' +
        '`open` label from `LabelProvider`.',
      table: { category: 'Accordion Item Header' },
    },
    closeText: {
      control: 'text',
      description:
        'Text shown when the accordion is expanded. Rendered literally — ' +
        'translate at the call site if needed. When omitted, falls back to the translated ' +
        '`close` label from `LabelProvider`.',
      table: { category: 'Accordion Item Header' },
    },
    showExpandLabel: {
      control: 'boolean',
      description: 'Whether to show the expand/collapse labels.',
      table: { category: 'Accordion Item Header', defaultValue: { summary: 'true' } },
    },
    showDefaultExpandAction: {
      control: 'boolean',
      description: 'Whether to render the built-in expand/collapse control.',
      table: { category: 'Accordion Item Header', defaultValue: { summary: 'true' } },
    },
    expandActionPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of the expand/collapse action.',
      table: { category: 'Accordion Item Header', defaultValue: { summary: 'end' } },
    },
    expandActionArrowType: {
      control: 'radio',
      options: ['default', 'secondary'],
      description:
        'Chevron style of the default expand action. Only effective when ' +
        '`headerClickable` is `false` (otherwise the default expand action ' +
        'is not a `CollapseButton`) and `showExpandLabel` is `false` (only ' +
        'icon-only mode honours `arrowType`).',
      table: {
        category: 'Accordion Item Header',
        defaultValue: { summary: 'default' },
      },
    },
    expandActionSize: {
      control: 'radio',
      options: [undefined, 'default', 'small'],
      description:
        'Visual size of the default expand action. Only effective when ' +
        '`headerClickable` is `false`. When omitted, the size is derived ' +
        'from `showExpandLabel` — `true` → `default`, `false` → `small`. ' +
        'Pass a value to override the derived default.',
      table: {
        category: 'Accordion Item Header',
      },
    },
    expandActionInverted: {
      control: 'boolean',
      description:
        'Use the inverted (light-on-dark) palette for the default expand ' +
        'action, for placement on a dark or brand background. Only ' +
        'effective when `headerClickable` is `false`.',
      table: {
        category: 'Accordion Item Header',
        defaultValue: { summary: 'false' },
      },
    },
    expandActionUnderline: {
      control: 'boolean',
      description:
        'Whether to underline the label of the default expand action. ' +
        'Defaults to `false` so the chevron stays the sole affordance. ' +
        'Only effective when `headerClickable` is `false` and ' +
        '`showExpandLabel` is `true` (icon-only mode never underlines).',
      table: {
        category: 'Accordion Item Header',
        defaultValue: { summary: 'false' },
      },
    },
    headerClass: {
      control: 'text',
      description: 'Custom CSS class for the accordion header.',
      table: { category: 'Accordion Item Header' },
    },
    headingLevel: {
      control: 'select',
      options: [undefined, 1, 2, 3, 4, 5, 6],
      description:
        'Wraps the trigger in a semantic `<h1>`–`<h6>` element following the ' +
        'WAI-ARIA Accordion Pattern. The wrapper uses `display: contents` so ' +
        'it adds semantic info for assistive technologies without affecting layout.',
      table: { category: 'Accordion Item Header' },
    },
    id: {
      control: false,
      description:
        'Stable id used for hash-based deep-linking. Pair with `openOnHashMatch`. ' +
        'Also seeds the auto-generated header/content ARIA ids when set.',
      table: { category: 'Accordion Item', type: { summary: 'string' } },
    },
    openOnHashMatch: {
      control: false,
      description:
        'Auto-expand the item when `window.location.hash` matches its `id`. ' +
        'Requires an explicit `id` prop — no-op for items using the auto-generated React id.',
      table: { category: 'Accordion Item', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description:
        'Disables the item — the header trigger becomes non-interactive and ' +
        'the expanded state can no longer be toggled by user interaction. ' +
        'The current state is preserved.',
      table: { category: 'Accordion Item', defaultValue: { summary: 'false' } },
    },
    contentClass: {
      control: 'text',
      description: 'Custom CSS class for the accordion content.',
      table: { category: 'Accordion Item Content' },
    },
  },
} as Meta;

const contentExample = (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </>
);

const iconCardTemplate = (
  <>
    <Icon name="business_center" color="secondary" size={24} />
    <Text element="span" color="secondary" modifiers="bold">
      Category
    </Text>
  </>
);

const SelectActionButton = (props: { selected: boolean; onToggle: (selected: boolean) => void }) => (
  <Button
    visualType={props.selected ? 'primary' : 'secondary'}
    onClick={(e: React.MouseEvent) => {
      e.stopPropagation();
      props.onToggle(!props.selected);
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {props.selected && <Icon name="done" size={16} />}
      <span style={{ padding: '0 var(--button-md-inner-spacing)' }}>{props.selected ? 'Selected' : 'Select'}</span>
    </div>
  </Button>
);

type AccordionStoryArgs = AccordionProps &
  AccordionItemProps &
  AccordionItemHeaderProps &
  AccordionItemContentProps & {
    // Separate key for the parent's group-level `defaultExpanded`, displayed
    // as `defaultExpanded` in Storybook via the argType `name` field.
    accordionDefaultExpanded?: boolean;
  };

type Story = StoryObj<AccordionStoryArgs>;

const DefaultTemplate: StoryFn<AccordionStoryArgs> = (args) => {
  const {
    allowMultiple,
    itemGap,
    accordionDefaultExpanded,
    headerClickable,
    titleLayout,
    openText,
    closeText,
    showExpandLabel,
    showDefaultExpandAction,
    expandActionPosition,
    expandActionArrowType,
    expandActionSize,
    expandActionInverted,
    expandActionUnderline,
    defaultExpanded,
    showIconCard,
    selected: initialSelected,
    disabled,
    onToggle,
    headerClass,
    headingLevel,
    contentClass,
    className,
  } = args;
  const [selected, setSelected] = React.useState<boolean>(!!initialSelected);

  return (
    <Accordion
      allowMultiple={allowMultiple}
      itemGap={itemGap}
      defaultExpanded={accordionDefaultExpanded}
      className={className}
    >
      <Accordion.Item
        defaultExpanded={defaultExpanded}
        showIconCard={showIconCard}
        selected={selected}
        disabled={disabled}
        onToggle={onToggle}
        iconCard={iconCardTemplate}
      >
        <Accordion.Item.Header
          headerClickable={headerClickable}
          titleLayout={titleLayout}
          openText={openText}
          closeText={closeText}
          showExpandLabel={showExpandLabel}
          showDefaultExpandAction={showDefaultExpandAction}
          expandActionPosition={expandActionPosition}
          expandActionArrowType={expandActionArrowType}
          expandActionSize={expandActionSize}
          expandActionInverted={expandActionInverted}
          expandActionUnderline={expandActionUnderline}
          headerClass={headerClass}
          headingLevel={headingLevel}
          title="Title"
          afterTitle={<StatusBadge color="success">Approved</StatusBadge>}
          endAction={headerClickable ? undefined : <SelectActionButton selected={selected} onToggle={setSelected} />}
        />
        <Accordion.Item.Content contentClass={contentClass}>{contentExample}</Accordion.Item.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Item.Header title="Title 2" openText="Open" closeText="Close" expandActionPosition="end" />
        <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export const Default: Story = {
  render: DefaultTemplate,
  args: {
    allowMultiple: false,
    accordionDefaultExpanded: false,
    headerClickable: true,
    titleLayout: 'hug',
    showExpandLabel: true,
    showDefaultExpandAction: true,
    expandActionPosition: 'end',
    expandActionArrowType: 'default',
    expandActionSize: undefined,
    expandActionInverted: false,
    expandActionUnderline: false,
    defaultExpanded: false,
    showIconCard: false,
    selected: false,
    disabled: false,
    headingLevel: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: `
 The accordion item is composed of three parts:

- \`Accordion.Item\`: owns the item's state (\`expanded\`) and the inputs shared by header and content (\`selected\`, \`showIconCard\`, \`defaultExpanded\`).
- \`Accordion.Item.Header\`: owns header appearance and interaction (\`titleLayout\`, \`headerClickable\`, expand labels, \`headerClass\`, slot props for badges/actions/etc).
- \`Accordion.Item.Content\`: owns content styling (\`contentClass\`) and the collapsible body.

| Slot prop | Description |
|----------|------------|
| \`title\` | The accordion title (passed to \`Accordion.Item.Header\`). |
| \`beforeTitle\` | Custom elements before the title. |
| \`afterTitle\` | Custom elements after the title. |
| \`startAction\` | Custom actions at the start of the header. |
| \`endAction\` | Custom actions at the end of the header. |
| \`startDescription\` | Description rendered below the title. |
| \`endDescription\` | Description rendered at the end of the header. |
| \`iconCard\` | Icon card content (passed to \`Accordion.Item\`). |
      `,
      },
    },
  },
};

export const Variants: StoryObj = {
  render: () => {
    const [selectedA, setSelectedA] = React.useState(false);
    const [selectedB, setSelectedB] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Title" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Title" afterTitle={<StatusBadge color="success">Approved</StatusBadge>} />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Title"
              beforeTitle={<Icon name="description" color="secondary" size={18} />}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Title"
              beforeTitle={<Icon name="account_circle" color="brand" background="brand-secondary" size={16} />}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Title" showExpandLabel={false} />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Title" expandActionPosition="start" showExpandLabel={false} />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Title"
              showExpandLabel={false}
              endDescription={
                <Text element="span" color="tertiary" modifiers="small">
                  Description
                </Text>
              }
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Title"
              showExpandLabel={false}
              startDescription={
                <Text element="span" color="tertiary" modifiers="normal">
                  Description
                </Text>
              }
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header
              title="Title"
              showExpandLabel={false}
              startDescription={
                <Text element="span" color="tertiary" modifiers="normal">
                  Description
                </Text>
              }
              endDescription={
                <Text element="span" color="tertiary" modifiers="small">
                  Description
                </Text>
              }
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item selected={selectedA}>
            <Accordion.Item.Header
              headerClickable={false}
              expandActionPosition="start"
              openText="Title"
              closeText="Title"
              endAction={<SelectActionButton selected={selectedA} onToggle={setSelectedA} />}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item selected={selectedB}>
            <Accordion.Item.Header
              headerClickable={false}
              expandActionPosition="start"
              openText="Title"
              closeText="Title"
              endAction={<SelectActionButton selected={selectedB} onToggle={setSelectedB} />}
            />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

export const ActionTypes: StoryObj = {
  render: () => {
    const [selectedA, setSelectedA] = React.useState(false);
    const [selectedB, setSelectedB] = React.useState(false);
    const [selectedC, setSelectedC] = React.useState(true);
    const [selectedD, setSelectedD] = React.useState(true);

    const rowStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--layout-grid-gutters-08)',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header title="Title" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded>
              <Accordion.Item.Header title="Title" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header title="Title" showExpandLabel={false} />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded>
              <Accordion.Item.Header title="Title" showExpandLabel={false} />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header title="Title" showExpandLabel={false} expandActionPosition="start" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded>
              <Accordion.Item.Header title="Title" showExpandLabel={false} expandActionPosition="start" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item selected={selectedA}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedA} onToggle={setSelectedA} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item defaultExpanded selected={selectedB}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedB} onToggle={setSelectedB} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={rowStyle}>
          <Accordion>
            <Accordion.Item selected={selectedC}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedC} onToggle={setSelectedC} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item defaultExpanded selected={selectedD}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedD} onToggle={setSelectedD} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
  },
};

export const WithIconCard: StoryObj = {
  render: () => {
    const [selectedA, setSelectedA] = React.useState(false);
    const [selectedB, setSelectedB] = React.useState(false);
    const [selectedC, setSelectedC] = React.useState(true);
    const [selectedD, setSelectedD] = React.useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-08)' }}>
          <Accordion>
            <Accordion.Item showIconCard iconCard={iconCardTemplate}>
              <Accordion.Item.Header title="Title" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded showIconCard iconCard={iconCardTemplate}>
              <Accordion.Item.Header title="Title" />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-08)' }}>
          <Accordion>
            <Accordion.Item showIconCard iconCard={iconCardTemplate}>
              <Accordion.Item.Header title="Title" showExpandLabel={false} />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item defaultExpanded showIconCard iconCard={iconCardTemplate}>
              <Accordion.Item.Header title="Title" showExpandLabel={false} />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-08)' }}>
          <Accordion>
            <Accordion.Item showIconCard iconCard={iconCardTemplate} selected={selectedA}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedA} onToggle={setSelectedA} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item defaultExpanded showIconCard iconCard={iconCardTemplate} selected={selectedB}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedB} onToggle={setSelectedB} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-08)' }}>
          <Accordion>
            <Accordion.Item showIconCard iconCard={iconCardTemplate} selected={selectedC}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedC} onToggle={setSelectedC} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item defaultExpanded showIconCard iconCard={iconCardTemplate} selected={selectedD}>
              <Accordion.Item.Header
                headerClickable={false}
                expandActionPosition="start"
                openText="Title"
                closeText="Title"
                endAction={<SelectActionButton selected={selectedD} onToggle={setSelectedD} />}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    );
  },
};

export const Customized: StoryObj = {
  render: () => {
    const [selected, setSelected] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const { getCurrentBreakpointProps } = useBreakpointProps();
    const responsive = getCurrentBreakpointProps<{
      avatar: React.ReactNode;
      email: React.ReactNode;
      badge: React.ReactNode;
      importantPhoto: React.ReactNode;
      importantDescription: React.ReactNode;
      showMorePhoto: React.ReactNode;
      showMoreDescription: React.ReactNode;
    }>({
      avatar: null,
      email: null,
      badge: null,
      importantPhoto: null,
      importantDescription: null,
      showMorePhoto: null,
      showMoreDescription: null,
      md: {
        avatar: <img src="custom_accordion_1.png" alt="Mari Maasikas" />,
        email: (
          <Text element="span" color="tertiary" modifiers="normal">
            mari.maasikas@gmail.com
          </Text>
        ),
        badge: <StatusBadge color="success">Verified</StatusBadge>,
        importantPhoto: <img src="custom_accordion_2.png" alt="Accordion example" />,
        importantDescription: (
          <Text element="span" color="tertiary" modifiers="normal" className="custom-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        ),
        showMorePhoto: <img src="custom_accordion_2.png" alt="Accordion example" />,
        showMoreDescription: (
          <Text element="span" color="primary" modifiers="normal" className="custom-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        ),
      },
    });

    return (
      <>
        <style>{`
          .custom-header,
          .custom-content {
            background: var(--card-background-brand-quaternary);
          }

          .custom-header {
            --tedi-accordion-header-start-gap: var(--layout-grid-gutters-16);
          }

          .custom-title {
            font-weight: var(--heading-h6-weight);
          }

          .custom-description {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            align-self: stretch;
            text-align: left;
            text-overflow: ellipsis;
          }
        `}</style>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                title="Title"
                titleLayout="fill"
                afterTitle={<StatusBadge color="brand">Public</StatusBadge>}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                title="Title"
                titleLayout="fill"
                beforeTitle={<Icon name="account_circle" color="brand" background="brand-secondary" size={16} />}
                afterTitle={<StatusBadge color="neutral">New</StatusBadge>}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item selected={selected}>
              <Accordion.Item.Header
                headerClickable={false}
                showExpandLabel={false}
                expandActionPosition="start"
                title="Title"
                endAction={
                  <Checkbox
                    id="customized-select"
                    label={selected ? 'Unselect this value' : 'Select this value'}
                    checked={selected}
                    onChange={(_, nextChecked) => setSelected(nextChecked)}
                    value={selected ? 'unselect' : 'select'}
                    name="customized-select"
                  />
                }
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                title="Title"
                titleLayout="fill"
                afterTitle={<StatusBadge color="success">Approved</StatusBadge>}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                title={<Text modifiers="bold">Mari Maasikas</Text>}
                headerClass="custom-title"
                beforeTitle={responsive.avatar}
                startDescription={responsive.email}
                endDescription={responsive.badge}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item>
              <Accordion.Item.Header
                title={<Text modifiers="bold">Some important title</Text>}
                titleLayout="fill"
                showExpandLabel={false}
                headerClass="custom-title"
                afterTitle={responsive.importantPhoto}
                startDescription={responsive.importantDescription}
              />
              <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>

          <Accordion>
            <Accordion.Item expanded={expanded} onToggle={setExpanded}>
              <Accordion.Item.Header
                showDefaultExpandAction={false}
                headerClickable={false}
                headerClass="custom-header custom-title"
                title={<Text modifiers="bold">Some important title</Text>}
                beforeTitle={responsive.showMorePhoto}
                startDescription={responsive.showMoreDescription}
                endAction={
                  <Button visualType="neutral" onClick={() => setExpanded((current) => !current)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Icon name={expanded ? 'arrow_upward' : 'arrow_downward'} size={16} />
                      {expanded ? 'Show less' : 'Show more'}
                    </div>
                  </Button>
                }
              />
              <Accordion.Item.Content contentClass="custom-content">{contentExample}</Accordion.Item.Content>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    );
  },
};

export const AccordionBehavior: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-16)' }}>
      <Heading element="h4" modifiers="h4">
        Single-expand accordion
      </Heading>
      <div style={{ marginBottom: 'var(--layout-grid-gutters-16)' }}>
        <Accordion>
          <Accordion.Item>
            <Accordion.Item.Header title="Title 1" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header title="Title 2" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </div>

      <Heading element="h4" modifiers="h4">
        Multi-expand accordion
      </Heading>
      <Accordion allowMultiple>
        <Accordion.Item>
          <Accordion.Item.Header title="Title 1" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header title="Title 2" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const Disabled: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
Disabled items keep their current expanded state but reject user interaction.
The header trigger renders as a native \`<button disabled>\` (or with
\`aria-disabled\` for the non-clickable-header variant), so browsers handle
focus, keyboard, and screen-reader announcements for free.

Use \`disabled\` for items whose content is locked behind a state the user
hasn't met yet (incomplete prerequisites, missing permissions, etc.).
        `,
      },
    },
  },
  render: () => (
    <div>
      <Accordion allowMultiple>
        <Accordion.Item>
          <Accordion.Item.Header title="Section 1" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header title="Section 2" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item disabled>
          <Accordion.Item.Header title="Section 3" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

export const HashDeepLinking: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
Items with \`openOnHashMatch\` auto-expand when \`window.location.hash\`
matches their \`id\`. Useful for FAQs, settings panels, documentation, or any
page where a sharable link should open straight to a specific section.

Click the links below to update the URL hash. The matching item expands
automatically. The listener also reacts to \`hashchange\`, so users
navigating between in-page links will see the corresponding item open as
they go. Combine with \`allowMultiple\` if you want previously opened items
to stay open.

**Note:** the \`id\` prop must be set explicitly — \`openOnHashMatch\`
is a no-op for items relying on the auto-generated React id.
        `,
      },
    },
  },
  render: () => {
    const navStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--layout-grid-gutters-16)',
      marginBottom: 'var(--layout-grid-gutters-16)',
    };

    return (
      <div>
        <nav style={navStyle} aria-label="Jump to citizen-services FAQ section">
          <Link href="#id-card">Jump to: ID card renewal</Link>
          <Link href="#tax-return">Jump to: Filing taxes</Link>
          <Link href="#parental-benefits">Jump to: Parental benefits</Link>
        </nav>

        <Accordion allowMultiple>
          <Accordion.Item id="id-card" openOnHashMatch>
            <Accordion.Item.Header title="How do I renew my ID card?" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item id="tax-return" openOnHashMatch>
            <Accordion.Item.Header title="How do I file my income tax return?" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item id="parental-benefits" openOnHashMatch>
            <Accordion.Item.Header title="What parental benefits am I entitled to?" />
            <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

export const SemanticHeadings: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: `
\`headingLevel\` wraps the header trigger in a semantic \`<h1>\`–\`<h6>\`
element per the WAI-ARIA Accordion Pattern. The wrapper uses
\`display: contents\` so it adds *no* visual change — it only contributes
to the document outline that assistive technologies, table-of-contents
generators, and SEO crawlers rely on.

Use it whenever the accordion participates in a heading hierarchy: FAQs,
documentation, policy pages, dashboards with sectioned content — anywhere
the document outline matters for screen-reader navigation, table-of-contents
generators, or SEO. Pick a level that fits the surrounding content
(typically one level deeper than the section's own heading — \`<h2>\`
section → \`<h3>\` accordion items).

Inspect the DOM to confirm: each header is wrapped in a real \`<h3>\`,
but the rendered look matches the surrounding accordion items exactly.
        `,
      },
    },
  },
  render: () => (
    <section>
      <div style={{ marginBottom: 'var(--layout-grid-gutters-16)' }}>
        <Heading element="h2" modifiers="h2">
          Your active prescriptions
        </Heading>
      </div>

      <Accordion allowMultiple>
        <Accordion.Item>
          <Accordion.Item.Header headingLevel={3} title="HJERTEMAGNYL TBL 150MG+21MG N100" />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header
            headingLevel={3}
            title="AMLODIPINE ACTAVIS"
            startDescription={
              <Text element="span" color="tertiary" modifiers="normal">
                Amlodipiin 5mg
              </Text>
            }
          />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Item.Header
            headingLevel={3}
            title="ATORVASTATIN KRKA"
            startDescription={
              <Text element="span" color="tertiary" modifiers="normal">
                Atorvastatiin 20mg
              </Text>
            }
          />
          <Accordion.Item.Content>{contentExample}</Accordion.Item.Content>
        </Accordion.Item>
      </Accordion>
    </section>
  ),
};

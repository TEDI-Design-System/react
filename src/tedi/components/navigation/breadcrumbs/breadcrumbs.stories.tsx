import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Icon } from '../../base/icon/icon';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link } from '../link/link';
import Breadcrumbs, { BreadcrumbsProps } from './breadcrumbs';

// Preset `separator` values that the controls panel can switch between.
// Storybook's `select` control only emits string keys, so we use `mapping`
// to translate each key into the real ReactNode the prop accepts.
const separatorOptions = {
  Chevron: undefined,
  Slash: '/',
  Arrow: <Icon name="arrow_forward" color="inherit" size={16} aria-hidden />,
  Dash: '—',
  Dot: '·',
};

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.48.71?node-id=2409-21798&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/43adad-breadcrumbs" target="_BLANK">Zeroheight ↗</a>
 */
export default {
  title: 'TEDI-Ready/Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    separator: {
      description:
        'Node rendered between crumbs. Pass a string for text separators (e.g. `/` or `›`) or any React node for custom markup. Hidden from assistive technology — screen readers announce only the crumbs themselves.',
      control: { type: 'select' },
      options: Object.keys(separatorOptions),
      mapping: separatorOptions,
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '<Icon name="chevron_right" size={16} color="brand" />' },
      },
    },
  },
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=2409-21799&m=dev',
    },
  },
} as Meta;

type Story = StoryObj<BreadcrumbsProps>;

const Template: StoryFn<BreadcrumbsProps> = (args) => <Breadcrumbs {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <Link href="#">Applications</Link>
        <span aria-current="page">Application nr 506</span>
      </>
    ),
  },
};

export const Long: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <Breadcrumbs>
        <Link href="#">Dashboard</Link>
        <Link href="#">Applications</Link>
        <span aria-current="page">Application nr 506</span>
      </Breadcrumbs>
      <Breadcrumbs>
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <Link href="#">My documents</Link>
        <Link href="#">Application nr 506</Link>
        <span aria-current="page">Restrictions</span>
      </Breadcrumbs>
      <Breadcrumbs>
        <Link href="#">Medications</Link>
        <span aria-current="page">Ibuprofen</span>
      </Breadcrumbs>
    </VerticalSpacing>
  ),
};

export const Short: Story = {
  render: Template,
  args: {
    variant: 'short',
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <span aria-current="page">Current page</span>
      </>
    ),
  },
};

export const CustomAriaLabel: Story = {
  render: Template,
  args: {
    ariaLabel: 'Site path',
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <span aria-current="page">Restrictions</span>
      </>
    ),
  },
};

/**
 * When the trail is long, set `maxItems` to collapse the middle into an
 * ellipsis button. Clicking it opens a dropdown listing the hidden crumbs.
 * `itemsBeforeCollapse` / `itemsAfterCollapse` control how many crumbs stay
 * visible on each side.
 */
export const Condensed: Story = {
  render: Template,
  args: {
    maxItems: 4,
    itemsBeforeCollapse: 1,
    itemsAfterCollapse: 2,
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <Link href="#">Patients</Link>
        <Link href="#">Anna Tamm</Link>
        <Link href="#">Visits</Link>
        <Link href="#">2024-05-12</Link>
        <span aria-current="page">Restrictions</span>
      </>
    ),
  },
};

/**
 * `variant` is breakpoint-aware. Common mobile pattern: short back-link below
 * `md`, full trail from `md` up — resize the viewport to see it switch.
 */
export const ResponsiveVariant: Story = {
  render: Template,
  args: {
    variant: 'short',
    md: { variant: 'long' },
    children: (
      <>
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <Link href="#">My documents</Link>
        <Link href="#">Application nr 506</Link>
        <span aria-current="page">Restrictions</span>
      </>
    ),
  },
};

/**
 * Pass any node as `separator` to replace the chevron — a string, a different
 * icon, or arbitrary markup. The separator is hidden from assistive technology.
 */
export const CustomSeparator: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <Breadcrumbs separator="/">
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <span aria-current="page">Restrictions</span>
      </Breadcrumbs>
      <Breadcrumbs separator={<Icon name="arrow_forward" color="inherit" size={16} aria-hidden />}>
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <span aria-current="page">Restrictions</span>
      </Breadcrumbs>
      <Breadcrumbs separator="—">
        <Link href="#">Dashboard</Link>
        <Link href="#">Documents</Link>
        <span aria-current="page">Restrictions</span>
      </Breadcrumbs>
    </VerticalSpacing>
  ),
};

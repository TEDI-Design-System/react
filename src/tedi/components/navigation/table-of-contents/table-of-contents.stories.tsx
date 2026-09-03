import type { Meta, StoryObj } from '@storybook/react-vite';
import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Tag } from '../../tags/tag/tag';
import { Link } from '../link/link';
import { TableOfContents, TableOfContentsProps } from './table-of-contents';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=8469-72329&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/467bb3-table-of-contents" target="_blank">Zeroheight ↗</a>
 */
const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  subcomponents: {
    'TableOfContents.Item': TableOfContents.Item,
    'TableOfContents.Collapsible': TableOfContents.Collapsible,
  },
  title: 'TEDI-Ready/Components/Navigation/TableOfContents',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=8469-72329&m=dev',
    },
  },
  decorators: [
    (Story, context) => (
      <div style={{ maxWidth: context.parameters.fullWidth ? undefined : 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<TableOfContentsProps>;

const sections = ['Sissejuhatus', 'Taust', 'Meetodid', 'Tulemused', 'Arutelu', 'Kokkuvõte'];

const sectionItems = (lastIcon?: string, separatorBeforeLast = false) =>
  sections.map((label, index) => (
    <TableOfContents.Item
      key={label}
      id={`section-${index + 1}`}
      separator={separatorBeforeLast && index === sections.length - 2}
    >
      <Link
        href={`#section-${index + 1}`}
        underline={false}
        iconLeft={index === sections.length - 1 ? lastIcon : undefined}
        iconStandalone={index === sections.length - 1 && !!lastIcon}
      >
        {label}
      </Link>
    </TableOfContents.Item>
  ));

export const Default: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};

export const Transparent: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" variant="transparent" sticky={false} activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};

export const Headless: Story = {
  render: () => (
    <TableOfContents heading={null} sticky={false} numbered activeId="section-3">
      {sectionItems()}
    </TableOfContents>
  ),
};

/**
 * `bordered` draws a divider between items and a border under the last one, so the
 * list reads as separated rows.
 */
export const Bordered: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3" bordered>
      {sectionItems('description')}
    </TableOfContents>
  ),
};

/**
 * Each `TableOfContents.Item` accepts a `slot` for trailing content shown at the
 * end of its row (right-aligned) — e.g. a result-count `Tag`. It stays out of the
 * link's accessible name.
 */
export const WithSlot: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3">
      {sections.map((label, index) => (
        <TableOfContents.Item
          key={label}
          id={`section-${index + 1}`}
          slot={index === sections.length - 1 ? <Tag color="primary">43 tulemust</Tag> : undefined}
        >
          <Link href={`#section-${index + 1}`} underline={false}>
            {label}
          </Link>
        </TableOfContents.Item>
      ))}
    </TableOfContents>
  ),
};

/**
 * Set `separator` on any `TableOfContents.Item` to draw a divider below it — e.g. to set a summary
 * or "back to top" entry apart from the section list. It can follow any item, not just the last one.
 */
export const WithSeparator: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3">
      {sectionItems('description', true)}
    </TableOfContents>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="section-3">
      <TableOfContents.Item id="section-1">
        <Link href="#section-1" underline={false}>
          Sissejuhatus
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="section-2">
        <Link href="#section-2" underline={false}>
          Taust
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="section-3">
        <Link href="#section-3" underline={false}>
          Meetodid
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="section-6">
        <Link href="#section-6" underline={false} iconLeft="description" iconStandalone>
          Kokkuvõte
        </Link>
      </TableOfContents.Item>
    </TableOfContents>
  ),
};

export const Nested: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="methods-2">
      <TableOfContents.Item id="intro">
        <Link href="#intro" underline={false}>
          Sissejuhatus
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="methods">
        <Link href="#methods" underline={false}>
          Meetodid
        </Link>
        <TableOfContents.Item id="methods-1">
          <Link href="#methods-1" underline={false}>
            Andmete kogumine
          </Link>
        </TableOfContents.Item>
        <TableOfContents.Item id="methods-2">
          <Link href="#methods-2" underline={false}>
            Analüüs
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>
      <TableOfContents.Item id="results">
        <Link href="#results" underline={false}>
          Tulemused
        </Link>
        <TableOfContents.Item id="results-1">
          <Link href="#results-1" underline={false}>
            Joonised
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>
    </TableOfContents>
  ),
};

/**
 * By default every item's sub-items stay visible. Set `collapseInactive` to make the list behave
 * like an accordion: only the branch leading to `activeId` keeps its nested children expanded, and
 * all other branches collapse. Here `activeId="methods-2"`, so only *Meetodid* is expanded.
 */
export const CollapseInactive: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} activeId="methods-2" collapseInactive>
      <TableOfContents.Item id="intro">
        <Link href="#intro" underline={false}>
          Sissejuhatus
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="methods">
        <Link href="#methods" underline={false}>
          Meetodid
        </Link>
        <TableOfContents.Item id="methods-1">
          <Link href="#methods-1" underline={false}>
            Andmete kogumine
          </Link>
        </TableOfContents.Item>
        <TableOfContents.Item id="methods-2">
          <Link href="#methods-2" underline={false}>
            Analüüs
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>
      <TableOfContents.Item id="results">
        <Link href="#results" underline={false}>
          Tulemused
        </Link>
        <TableOfContents.Item id="results-1">
          <Link href="#results-1" underline={false}>
            Joonised
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>
    </TableOfContents>
  ),
};

export const Numbered: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} numbered activeId="methods">
      <TableOfContents.Item id="intro">
        <Link href="#intro" underline={false}>
          Sissejuhatus
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="methods">
        <Link href="#methods" underline={false}>
          Meetodid
        </Link>
        <TableOfContents.Item id="methods-1">
          <Link href="#methods-1" underline={false}>
            Andmete kogumine
          </Link>
        </TableOfContents.Item>
        <TableOfContents.Item id="methods-2">
          <Link href="#methods-2" underline={false}>
            Analüüs
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>
      <TableOfContents.Item id="results">
        <Link href="#results" underline={false}>
          Tulemused
        </Link>
      </TableOfContents.Item>
    </TableOfContents>
  ),
};

export const ItemStates: Story = {
  parameters: { fullWidth: true },
  render: () => {
    const rows = [
      { id: 'default', label: 'Default', linkProps: {} },
      // "Hover" forces the hover state via `isHovered`; "Selected" is the active item (via activeId).
      { id: 'hover', label: 'Hover', linkProps: { isHovered: true } },
      { id: 'selected', label: 'Selected', linkProps: {} },
    ];

    const stateItems = (options?: { icon?: boolean; separator?: boolean }) => {
      const iconProps = options?.icon ? { iconLeft: 'mail', iconStandalone: true } : {};
      return rows.map((row) => (
        <TableOfContents.Item key={row.id} id={row.id} separator={options?.separator}>
          <Link href={`#${row.id}`} underline={false} {...iconProps} {...row.linkProps}>
            {row.label}
          </Link>
        </TableOfContents.Item>
      ));
    };

    const columns: {
      header: string;
      numbered?: boolean;
      bordered?: boolean;
      options?: { icon?: boolean; separator?: boolean };
    }[] = [
      { header: 'Default' },
      { header: 'With number', numbered: true },
      { header: 'With icon', options: { icon: true } },
      { header: 'With separator', options: { separator: true } },
      { header: 'With border', bordered: true },
    ];

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
        {columns.map((column) => (
          <div key={column.header} style={{ flex: '1 1 12rem', minWidth: '11rem' }}>
            <VerticalSpacing size={1}>
              <Text modifiers="bold">{column.header}</Text>
              <TableOfContents
                heading={null}
                ariaLabel={`${column.header} item states`}
                sticky={false}
                numbered={column.numbered}
                bordered={column.bordered}
                activeId="selected"
              >
                {stateItems(column.options)}
              </TableOfContents>
            </VerticalSpacing>
          </div>
        ))}
      </div>
    );
  },
};

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et ' +
  'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ' +
  'ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.';

export const StickyInLayout: Story = {
  parameters: { fullWidth: true },
  render: function StickyInLayout() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState('sec-1');
    const isMobile = isBreakpointBelow(useBreakpoint(), 'md');

    useEffect(() => {
      const container = scrollRef.current;
      if (typeof IntersectionObserver === 'undefined') return undefined;
      if (!isMobile && !container) return undefined;

      const observerRoot = isMobile ? null : container;

      const ids = sections.map((_, index) => `sec-${index + 1}`);
      const visibility = new Map<string, boolean>();
      const atBottom = (): boolean =>
        isMobile
          ? window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
          : !!container && container.scrollTop + container.clientHeight >= container.scrollHeight - 2;

      const pickActive = (): void => {
        if (atBottom()) {
          setActiveId(ids[ids.length - 1]);
          return;
        }

        const active = ids.find((id) => visibility.get(id));
        if (active) setActiveId(active);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting));
          pickActive();
        },
        { root: observerRoot, rootMargin: '0px 0px -55% 0px' }
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      const scroller: HTMLElement | Window = isMobile ? window : (container as HTMLElement);
      scroller.addEventListener('scroll', pickActive, { passive: true });

      return () => {
        observer.disconnect();
        scroller.removeEventListener('scroll', pickActive);
      };
    }, [isMobile]);

    const selectSection = (id: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      if (isMobile) {
        target.scrollIntoView({ block: 'start' });
      } else {
        const root = scrollRef.current;
        if (!root) return;
        const paddingTop = parseFloat(getComputedStyle(root).paddingTop) || 0;
        root.scrollTo({
          top: root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - paddingTop,
        });
      }
      setActiveId(id);
    };

    const items = sections.map((label, index) => (
      <TableOfContents.Item key={label} id={`sec-${index + 1}`}>
        <Link href={`#sec-${index + 1}`} underline={false} onClick={selectSection(`sec-${index + 1}`)}>
          {label}
        </Link>
      </TableOfContents.Item>
    ));

    return (
      <>
        <Row alignItems="start">
          <Col xs={12} md={8}>
            <div
              ref={scrollRef}
              style={isMobile ? { paddingBottom: '5rem' } : { maxHeight: '24rem', overflowY: 'auto' }}
              {...(isMobile ? {} : { tabIndex: 0, role: 'region' as const, 'aria-label': 'Artikli sisu' })}
            >
              <VerticalSpacing size={1.5}>
                {sections.map((label, index) => (
                  <section key={label} id={`sec-${index + 1}`} tabIndex={-1}>
                    <VerticalSpacing size={0.5}>
                      <Heading element="h2" modifiers="h3">
                        {label}
                      </Heading>
                      <Text>{LOREM}</Text>
                      <Text>{LOREM}</Text>
                    </VerticalSpacing>
                  </section>
                ))}
              </VerticalSpacing>
            </div>
          </Col>
          <ShowAt md>
            <Col md={4}>
              <TableOfContents heading="Sisukord" sticky={false} activeId={activeId}>
                {items}
              </TableOfContents>
            </Col>
          </ShowAt>
        </Row>

        <HideAt md>
          <TableOfContents.Collapsible heading="Sisukord" activeId={activeId}>
            {items}
          </TableOfContents.Collapsible>
        </HideAt>
      </>
    );
  },
};

/**
 * On desktop (`md` and up) the
 * table of contents is a sidebar card next to the page content; below `md` it collapses into
 * `TableOfContents.Collapsible` — a bottom bar that opens the list in a bottom-sheet overlay.
 * `ShowAt` / `HideAt` mount only the matching variant, so ids never duplicate. Resize the canvas
 * to switch between the two.
 */
export const Collapsible: Story = {
  parameters: { layout: 'fullscreen', fullWidth: true },
  render: () => {
    const items = [
      <TableOfContents.Item key="intro" id="intro">
        <Link href="#intro" underline={false}>
          Sissejuhatus
        </Link>
      </TableOfContents.Item>,
      <TableOfContents.Item key="methods" id="methods">
        <Link href="#methods" underline={false}>
          Meetodid
        </Link>
        <TableOfContents.Item id="methods-1">
          <Link href="#methods-1" underline={false}>
            Andmete kogumine
          </Link>
        </TableOfContents.Item>
        <TableOfContents.Item id="methods-2">
          <Link href="#methods-2" underline={false}>
            Analüüs
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>,
      <TableOfContents.Item key="results" id="results">
        <Link href="#results" underline={false}>
          Tulemused
        </Link>
        <TableOfContents.Item id="results-1">
          <Link href="#results-1" underline={false}>
            Joonised
          </Link>
        </TableOfContents.Item>
      </TableOfContents.Item>,
      <TableOfContents.Item key="discussion" id="discussion">
        <Link href="#discussion" underline={false}>
          Arutelu
        </Link>
      </TableOfContents.Item>,
      <TableOfContents.Item key="conclusion" id="conclusion">
        <Link href="#conclusion" underline={false} iconStandalone>
          Kokkuvõte
        </Link>
      </TableOfContents.Item>,
    ];

    const intro = (
      <VerticalSpacing size={0.5}>
        <Heading element="h2" modifiers="h1">
          Tervisedeklaratsioon
        </Heading>
        <Text color="secondary">
          Tervisedeklaratsioon koosneb 22 kohustuslikust küsimusest. Alusta või jätka selle koostamisega allpool.
        </Text>
      </VerticalSpacing>
    );

    const placeholder = (extraStyle: CSSProperties) => (
      <div
        style={{
          background: 'var(--general-surface-primary)',
          border: '1px solid var(--general-border-primary)',
          borderRadius: 'var(--card-radius-rounded)',
          ...extraStyle,
        }}
      />
    );

    return (
      <>
        <ShowAt md>
          <div style={{ background: 'var(--general-surface-primary)', padding: '2rem' }}>
            {intro}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 340px',
                gap: '1.5rem',
                alignItems: 'start',
                marginTop: '1.5rem',
              }}
            >
              {placeholder({ minHeight: '35rem' })}
              <TableOfContents heading="Sisukord" sticky={false} activeId="methods">
                {items}
              </TableOfContents>
            </div>
          </div>
        </ShowAt>

        <HideAt md>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              gap: '3px',
              background: 'var(--general-surface-tertiary)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                padding: 'var(--layout-page-spacing-top) var(--layout-page-spacing-x) 0 var(--layout-page-spacing-x)',
              }}
            >
              <VerticalSpacing size={1}>
                <Link href="#" underline={false} iconLeft="arrow_back">
                  Tervisetõendid ja -deklaratsioonid
                </Link>
                {intro}
              </VerticalSpacing>
              {placeholder({ flex: '1 1 auto', marginTop: '1rem' })}
            </div>
            <TableOfContents.Collapsible heading="Sisukord" activeId="methods" sticky={false}>
              {items}
            </TableOfContents.Collapsible>
          </div>
        </HideAt>
      </>
    );
  },
};

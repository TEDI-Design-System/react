import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { LabelProvider } from '../../../providers/label-provider';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link } from '../link/link';
import { TableOfContents, TableOfContentsProps } from './table-of-contents';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=8469-72329&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/467bb3-table-of-contents" target="_blank">Zeroheight ↗</a>
 */
const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  subcomponents: { 'TableOfContents.Item': TableOfContents.Item },
  title: 'TEDI-Ready/Components/Navigation/TableOfContents',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=8469-72329&m=dev',
    },
  },
  decorators: [
    // The examples use Estonian content, so surface the Estonian labels (e.g. the collapsible
    // variant's "Ava" / "Sulge" toggle) instead of the default English ones.
    (Story, context) => (
      <LabelProvider locale="et">
        <div style={{ maxWidth: context.parameters.fullWidth ? undefined : 320 }}>
          <Story />
        </div>
      </LabelProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<TableOfContentsProps>;

const sections = ['Sissejuhatus', 'Taust', 'Meetodid', 'Tulemused', 'Arutelu', 'Kokkuvõte'];

const sectionItems = () =>
  sections.map((label, index) => (
    <TableOfContents.Item key={label} id={`section-${index + 1}`}>
      <Link href={`#section-${index + 1}`} underline={false}>
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
        <Link href="#section-6" underline={false} iconLeft="description">
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
    const states = [
      { label: 'Default', linkProps: {}, active: false },
      { label: 'Hover', linkProps: { isHovered: true }, active: false },
      { label: 'Active', linkProps: { isActive: true }, active: true },
    ];

    const rowStyle = (active: boolean) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--layout-grid-gutters-04)',
      borderLeft: `var(--table-of-contents-active-item-border-width) solid ${
        active ? 'var(--general-border-brand)' : 'transparent'
      }`,
      paddingLeft: 'calc(var(--table-of-contents-padding-level-1) - var(--table-of-contents-active-item-border-width))',
    });

    const numberStyle = (active: boolean) => ({
      minWidth: '1.5rem',
      textAlign: 'right' as const,
      color: active ? 'var(--link-primary-active)' : 'var(--link-primary-default)',
    });

    const link = (linkProps: object, iconLeft?: string) => (
      <Link href="#" underline={false} iconLeft={iconLeft} {...linkProps}>
        Pealkiri
      </Link>
    );

    const columns = [
      { header: 'Default', render: (s: (typeof states)[number]) => link(s.linkProps) },
      {
        header: 'With number',
        render: (s: (typeof states)[number]) => (
          <>
            <span aria-hidden="true" style={numberStyle(s.active)}>
              1.
            </span>
            {link(s.linkProps)}
          </>
        ),
      },
      {
        header: 'With icon',
        render: (s: (typeof states)[number]) => link(s.linkProps, 'mail'),
      },
    ];

    return (
      <Row gutterY={3}>
        {columns.map((column) => (
          <Col key={column.header} xs={12} sm={6} lg={4}>
            <VerticalSpacing size={1}>
              <Text modifiers="bold">{column.header}</Text>
              <VerticalSpacing size={0.5}>
                {states.map((state) => (
                  <div key={state.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ minWidth: '3.5rem' }}>
                      <Text element="span" color="secondary">
                        {state.label}
                      </Text>
                    </div>
                    <span style={rowStyle(state.active)}>{column.render(state)}</span>
                  </div>
                ))}
              </VerticalSpacing>
            </VerticalSpacing>
          </Col>
        ))}
      </Row>
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

    useEffect(() => {
      const root = scrollRef.current;
      if (!root || typeof IntersectionObserver === 'undefined') return undefined;

      const ids = sections.map((_, index) => `sec-${index + 1}`);
      const visibility = new Map<string, boolean>();
      const atBottom = (): boolean => root.scrollTop + root.clientHeight >= root.scrollHeight - 2;

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
        { root, rootMargin: '0px 0px -55% 0px' }
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      root.addEventListener('scroll', pickActive, { passive: true });

      return () => {
        observer.disconnect();
        root.removeEventListener('scroll', pickActive);
      };
    }, []);

    const selectSection = (id: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      const root = scrollRef.current;
      const target = document.getElementById(id);
      if (!root || !target) return;

      const paddingTop = parseFloat(getComputedStyle(root).paddingTop) || 0;
      root.scrollTo({
        top: root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - paddingTop,
      });
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
              style={{
                maxHeight: '24rem',
                overflowY: 'auto',
              }}
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
 * Mobile variant: a bottom bar that opens the list in a bottom-sheet overlay. Same
 * `TableOfContents.Item` children as the card. Uses `sticky={false}` to render inline in the
 * canvas; in an app it's pinned to the bottom of the viewport by default.
 */
export const Collapsible: Story = {
  render: () => (
    <TableOfContents.Collapsible heading="Sisukord" activeId="methods" sticky={false}>
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
      <TableOfContents.Item id="discussion">
        <Link href="#discussion" underline={false}>
          Arutelu
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="summary">
        <Link href="#summary" underline={false}>
          Kokkuvõte
        </Link>
      </TableOfContents.Item>
    </TableOfContents.Collapsible>
  ),
};

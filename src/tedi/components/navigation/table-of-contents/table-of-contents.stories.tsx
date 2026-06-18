import type { Meta, StoryObj } from '@storybook/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Card, CardContent } from '../../cards/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link } from '../link/link';
import { TableOfContents, TableOfContentsProps } from './table-of-contents';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=8469-72329&m=dev" target="_blank">Figma ↗</a>
 */
const meta: Meta<typeof TableOfContents> = {
  component: TableOfContents,
  subcomponents: { 'TableOfContents.Item': TableOfContents.Item },
  title: 'TEDI-Ready/Components/Navigation/TableOfContents',
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=8469-72329&m=dev',
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
    <TableOfContents heading="Sisukord" sticky={false}>
      {sectionItems()}
    </TableOfContents>
  ),
};

/**
 * Nest items by placing `TableOfContents.Item`s inside an `Item` (alongside its
 * link). The branch leading to `activeId` auto-expands; siblings stay collapsed.
 */
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
 * `numbered` renders an ordered list with auto-generated hierarchical numbers
 * (`1.`, `2.`, `2.1`, …) right-aligned before each item.
 */
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

/**
 * `showIcons` turns the list into a multistep-form progress indicator: a check
 * for validated steps, a neutral check for untouched steps, and a warning for
 * invalid ones.
 */
export const WithValidationIcons: Story = {
  render: () => (
    <TableOfContents heading="Sisukord" sticky={false} showIcons activeId="step-3">
      <TableOfContents.Item id="step-1" isValid>
        <Link href="#step-1" underline={false}>
          Isikuandmed
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="step-2" isValid={false}>
        <Link href="#step-2" underline={false}>
          Kontaktandmed
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="step-3">
        <Link href="#step-3" underline={false}>
          Tervisenäitajad
        </Link>
      </TableOfContents.Item>
      <TableOfContents.Item id="step-4">
        <Link href="#step-4" underline={false}>
          Kinnitus
        </Link>
      </TableOfContents.Item>
    </TableOfContents>
  ),
};

export const ItemStates: Story = {
  parameters: { fullWidth: true },
  render: () => {
    const rowStyle = (active: boolean) => ({
      display: 'inline-flex',
      borderLeft: `var(--table-of-contents-active-item-border-width) solid ${
        active ? 'var(--general-border-brand)' : 'transparent'
      }`,
      paddingLeft: 'calc(var(--table-of-contents-padding-level-1) - var(--table-of-contents-active-item-border-width))',
    });

    const states = [
      {
        label: 'Default',
        item: (
          <Link href="#default" underline={false}>
            Heading
          </Link>
        ),
        active: false,
      },
      {
        label: 'Hover',
        item: (
          <Link href="#hover" underline={false} isHovered>
            Heading
          </Link>
        ),
        active: false,
      },
      {
        label: 'Active',
        item: (
          <Link href="#active" underline={false} isActive>
            Heading
          </Link>
        ),
        active: true,
      },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          justifyContent: 'start',
          alignItems: 'center',
          columnGap: '2rem',
          rowGap: '0.75rem',
        }}
      >
        {states.map(({ label, item, active }) => (
          <Fragment key={label}>
            <Text modifiers="bold">{label}</Text>
            <span style={rowStyle(active)}>{item}</span>
          </Fragment>
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

        const active = ids.filter((id) => visibility.get(id)).pop();
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

    return (
      <div
        ref={scrollRef}
        style={{
          maxHeight: '24rem',
          overflowY: 'auto',
          padding: '1rem',
          border: '1px solid var(--general-border-primary)',
          borderRadius: 'var(--card-radius-rounded)',
        }}
      >
        <Row>
          <Col md={8}>
            <VerticalSpacing size={1.5}>
              {sections.map((label, index) => (
                <section key={label} id={`sec-${index + 1}`} tabIndex={-1}>
                  <Card>
                    <CardContent>
                      <VerticalSpacing size={0.5}>
                        <Heading element="h2" modifiers="h3">
                          {label}
                        </Heading>
                        <Text>{LOREM}</Text>
                        <Text>{LOREM}</Text>
                      </VerticalSpacing>
                    </CardContent>
                  </Card>
                </section>
              ))}
            </VerticalSpacing>
          </Col>
          <Col md={4}>
            <TableOfContents heading="Sisukord" activeId={activeId}>
              {sections.map((label, index) => (
                <TableOfContents.Item key={label} id={`sec-${index + 1}`}>
                  <Link href={`#sec-${index + 1}`} underline={false}>
                    {label}
                  </Link>
                </TableOfContents.Item>
              ))}
            </TableOfContents>
          </Col>
        </Row>
      </div>
    );
  },
};

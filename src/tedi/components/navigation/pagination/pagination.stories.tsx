import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Pagination, PaginationProps } from './pagination';

/**
 * Navigation between paginated sets of content. Renders a row of page buttons
 * with optional results label and page-size selector.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=8478-72385&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/35aad8-pagination" target="_BLANK">ZeroHeight ↗</a>
 */
const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'TEDI-Ready/Components/Navigation/Pagination',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=8478-72385&m=dev',
    },
  },
};
export default meta;

type Story = StoryObj<PaginationProps>;

export const Default: Story = {
  args: {
    pageCount: 10,
    defaultPage: 3,
  },
};

export const First: Story = {
  args: {
    pageCount: 10,
    defaultPage: 1,
  },
};

export const Last: Story = {
  args: {
    pageCount: 10,
    defaultPage: 10,
  },
};

export const AllPropertiesShown: Story = {
  render: function AllPropertiesShown() {
    const [page, setPage] = useState(3);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        pageCount={Math.ceil(97 / pageSize)}
        page={page}
        onPageChange={setPage}
        totalItems={97}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setPage(1);
        }}
      />
    );
  },
};

export const WithoutResultsNumber: Story = {
  render: function WithoutResultsNumber() {
    const [page, setPage] = useState(3);
    const [pageSize, setPageSize] = useState(10);
    return (
      <Pagination
        pageCount={Math.ceil(97 / pageSize)}
        page={page}
        onPageChange={setPage}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50, 100]}
        onPageSizeChange={(next) => {
          setPageSize(next);
          setPage(1);
        }}
      />
    );
  },
};

export const WithoutDropdown: Story = {
  args: {
    pageCount: 10,
    defaultPage: 3,
    totalItems: 97,
  },
};

/**
 * Controlled mode — the consumer owns `page` state explicitly.
 */
export const ControlledPage: Story = {
  render: function ControlledPage() {
    const [page, setPage] = useState(3);
    return <Pagination pageCount={10} page={page} onPageChange={setPage} />;
  },
};

/**
 * Small page count — every page number is rendered (no ellipsis).
 */
export const FewPages: Story = {
  args: {
    pageCount: 4,
    defaultPage: 2,
  },
};

/**
 * Large page count — ellipsis collapses the middle pages around the active one.
 */
export const ManyPagesEllipsis: Story = {
  args: {
    pageCount: 50,
    defaultPage: 12,
  },
};

/**
 * Boundary and sibling tuning — keep more neighbours visible around the active
 * page. Useful for dense layouts where users rarely paginate one-at-a-time.
 */
export const WiderSiblings: Story = {
  args: {
    pageCount: 40,
    defaultPage: 20,
    siblingCount: 2,
    boundaryCount: 2,
  },
};

/**
 * `background="transparent"` removes the surface fill and top border. Use it
 * when pagination sits on a non-white container.
 */
export const Transparent: Story = {
  args: {
    pageCount: 10,
    defaultPage: 3,
    totalItems: 97,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    background: 'transparent',
  },
  decorators: [
    (StoryEl) => (
      <div style={{ background: 'var(--general-surface-secondary)', padding: '1rem' }}>
        <StoryEl />
      </div>
    ),
  ],
};

/**
 * Use the per-slot hide toggles to render different parts of the pagination
 * above and below a table. Top row shows results + page-size; bottom row shows
 * only the pager. `borders="both"` adds top **and** bottom separators so the
 * pager stays visually anchored when content sits beneath it.
 */
export const TopBottomSplit: Story = {
  render: function TopBottomSplit() {
    const [page, setPage] = useState(3);
    const [pageSize, setPageSize] = useState(10);
    const sharedProps = {
      pageCount: Math.ceil(97 / pageSize),
      page,
      onPageChange: setPage,
      totalItems: 97,
      pageSize,
      pageSizeOptions: [10, 25, 50, 100],
      onPageSizeChange: (next: number) => {
        setPageSize(next);
        setPage(1);
      },
    };
    return (
      <>
        <Pagination {...sharedProps} hidePager borders="bottom" />
        <div style={{ padding: '1.5rem 0', color: 'var(--general-text-tertiary)', textAlign: 'center' }}>
          — table content goes here —
        </div>
        <Pagination {...sharedProps} hideResults hidePageSize borders="top" />
      </>
    );
  },
};

/**
 * By default the disabled Previous on page 1 (or disabled Next on the last
 * page) drops out of the DOM for a compact look. Set `showPrevNextButtons` to
 * keep both arrows rendered (disabled) at the boundaries so the pager width
 * stays stable as the user navigates. Mirrors Angular's `disableArrowsAtBoundary`.
 */
export const DisabledBoundaryArrows: Story = {
  render: function DisabledBoundaryArrows() {
    const [page, setPage] = useState(1);
    return <Pagination pageCount={5} page={page} onPageChange={setPage} showPrevNextButtons />;
  },
};

/**
 * `showEdgeNavLabels` renders the prev / next arrows as small text links
 * (label + icon, link colour, underline on hover) instead of icon-only circular
 * buttons — useful for desktop-only layouts where the icon-only variant feels
 * too terse. The aria-label stays the same so screen readers aren't
 * double-announced.
 */
export const ArrowsWithLabels: Story = {
  args: {
    pageCount: 8,
    defaultPage: 3,
    showEdgeNavLabels: true,
  },
};

/**
 * Override the default `arrow_back` / `arrow_forward` icons via `previousIcon`
 * and `nextIcon` (any Material icon name) — e.g. chevrons or first/last-page
 * glyphs.
 */
export const CustomArrowIcons: Story = {
  args: {
    pageCount: 10,
    defaultPage: 4,
    previousIcon: 'chevron_left',
    nextIcon: 'chevron_right',
  },
};

/**
 * `arrowVariant="primary"` renders the prev / next arrows as primary small
 * `Button`s with the label text and a leading / trailing arrow icon, for more
 * prominent navigation. Pair with `showPrevNextButtons` to keep the disabled
 * boundary button visible.
 *
 * Every visual prop accepts per-breakpoint overrides via the `sm`/`md`/`lg`/`xl`/`xxl`
 * keys (mobile-first — a bare value is the `xs` baseline). Here the baseline
 * `arrowVariant="default"` shows the compact icon-only circular arrows, while
 * `md={{ arrowVariant: 'primary' }}` swaps to the prominent labelled buttons from
 * `md` up. Resize the viewport (or pick a mobile preset) to see the switch.
 */
export const ArrowsPrimaryVariant: Story = {
  parameters: {
    status: {
      type: 'mobileViewDifference',
    },
  },
  render: function ArrowsPrimaryVariant() {
    const [page, setPage] = useState(3);
    return (
      <Pagination
        pageCount={10}
        page={page}
        onPageChange={setPage}
        arrowVariant="default"
        showPrevNextButtons
        md={{ arrowVariant: 'primary' }}
      />
    );
  },
};

/**
 * `borders` controls the separator around the pagination strip.
 * - `top` (default) — separator above only.
 * - `bottom` — separator below only.
 * - `both` — separators above and below; use when the pager sits between two
 *   content rows.
 * - `none` — borderless, e.g. when an outer container already provides framing.
 */
export const Borders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--general-text-secondary)' }}>
          borders=&quot;top&quot; (default)
        </p>
        <Pagination pageCount={10} defaultPage={3} totalItems={97} pageSize={10} pageSizeOptions={[10, 25, 50]} />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--general-text-secondary)' }}>borders=&quot;bottom&quot;</p>
        <Pagination
          pageCount={10}
          defaultPage={3}
          totalItems={97}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          borders="bottom"
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--general-text-secondary)' }}>borders=&quot;both&quot;</p>
        <Pagination
          pageCount={10}
          defaultPage={3}
          totalItems={97}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          borders="both"
        />
      </div>
      <div>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--general-text-secondary)' }}>borders=&quot;none&quot;</p>
        <Pagination
          pageCount={10}
          defaultPage={3}
          totalItems={97}
          pageSize={10}
          pageSizeOptions={[10, 25, 50]}
          borders="none"
        />
      </div>
    </div>
  ),
};

/**
 * Pass a breakpoint name to `hideResults`, `hidePageSize`, or `hidePager` to
 * hide that slot only below that breakpoint. Here, `hidePageSize="md"` hides
 * the page-size dropdown on screens smaller than `md`. Resize the viewport to
 * see it appear/disappear.
 */
export const ResponsiveVisibility: Story = {
  args: {
    pageCount: 10,
    defaultPage: 3,
    totalItems: 97,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    hidePageSize: 'md',
  },
};

/**
 * Below `md` the pager swaps to a compact `current / total` button that opens
 * a modal page list. Resize the Storybook viewport (or pick a mobile preset)
 * to see it. The modal closes on selection / Escape / backdrop click and
 * returns focus to the trigger.
 */
export const MobilePicker: Story = {
  args: {
    pageCount: 24,
    defaultPage: 7,
    totalItems: 240,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

/**
 * `labels` lets the consumer override any of the built-in / localised strings.
 * `results` accepts any `ReactNode`, so you can drop in inline markup — here a
 * bold count, an em-dashed clamp, and an Estonian unit. `previous` / `next` /
 * `pageSize` swap to Estonian via the same prop.
 */
export const CustomLabels: Story = {
  args: {
    pageCount: 24,
    defaultPage: 3,
    totalItems: 1234,
    pageSize: 50,
    pageSizeOptions: [25, 50, 100],
    labels: {
      results: (count) =>
        count > 999 ? (
          <>
            <strong>1000+</strong> tulemust
          </>
        ) : (
          <>
            <strong>{count}</strong> tulemust
          </>
        ),
      previous: 'Eelmine',
      next: 'Järgmine',
      pageSize: 'Tulemusi lehel',
    },
  },
};

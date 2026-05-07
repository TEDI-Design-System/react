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
      type: 'partiallyTediReady',
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
 * Localised via the `labels` prop. Note: the default labels already come from
 * the LabelProvider (`pagination.*` keys), so changing app locale is enough
 * for most cases — this story only demonstrates per-instance overrides.
 */
export const CustomLabels: Story = {
  args: {
    pageCount: 10,
    defaultPage: 1,
    totalItems: 97,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
    labels: {
      ariaLabel: 'Lehekülgede sirvimine',
      previous: 'Eelmine lehekülg',
      next: 'Järgmine lehekülg',
      pageAriaLabel: (page) => `Mine leheküljele ${page}`,
      currentPageAriaLabel: (page) => `Praegune lehekülg, lehekülg ${page}`,
      results: (count) => `${count} tulemust`,
      pageSize: 'Kuva korraga',
    },
  },
};

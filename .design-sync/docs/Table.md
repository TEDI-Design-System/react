Data table built on TanStack Table. Sub-components: `Table.Toolbar`,
`Table.ColumnsMenu`, `Table.HeaderButton`.

**Live Storybook:** https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-content-table--docs

Variants (see `Table.html`): Default, Sizes, Simple, Merged Cells, Grouped Rows,
Editable Values, Sortable, Filters, Collapsible Rows, Selectable Rows, Clickable Rows,
Striped, Sticky Header, With Empty State, Actions, With Footer, With Columns Menu,
Reorderable Rows, Reorderable Columns, Server Side, Responsive.

## Cells are arbitrary React — including form controls

Every cell renders through `flexRender(columnDef.cell, …)`, so a column's `cell` may
return anything. **Editable rows do not need a hand-built grid of inputs:**

```jsx
const columns = [
  { accessorKey: 'nimi', header: 'Nimi',
    cell: ({ row }) => <EditableTextCell row={row.original} field="nimi" label="Nimi" /> },
];
```

where the cell renders plain text normally and swaps to
`<TextField id={…} label={…} hideLabel value={…} onChange={…} />` (or `Select`,
`DatePicker`, a remove `Button`) for the row being edited. Staying inside real `<td>`s
keeps header association and per-cell labelling a `div` grid loses. See the
`EditableValues` story.

> The `useEditableRows` / `EditableRowsProvider` helpers used by that story are defined
> **in the story file** and are not library exports — do not import them. They are a small
> `useState` row-draft hook; write your own.

## Pagination

```ts
pagination?: true | {
  pageSize?: number;                 // default 10
  pageSizeOptions?: number[] | false; // default [10, 25, 50]; false hides the selector
  paginationProps?: …                 // forwarded to the built-in pager
}
```

```jsx
<Table data={rows} columns={columns} pagination />                       // 10 per page
<Table data={rows} columns={columns} pagination={{ pageSize: 25 }} />
<Table data={rows} columns={columns} pagination={{ pageSizeOptions: false }} />
```

Page state lives on `TableState.pagination`, so it is controllable and persistable like
any other slice.

## Row selection → a bulk-actions bar

`onStateChange` receives the **whole** table state; `rowSelection` is a
`Record<rowId, boolean>` holding only selected ids. Pair it with `getRowId` or the ids
are array indexes that shift when the table sorts.

```jsx
const [rowSelection, setRowSelection] = useState({});
const selectedIds = Object.keys(rowSelection);

<Table
  data={rows}
  columns={columns}
  getRowId={(row) => row.id}            // ← without this, ids are indexes
  enableRowSelection
  state={{ rowSelection }}              // controlled round-trip
  onStateChange={(state) => setRowSelection(state.rowSelection ?? {})}
/>

{selectedIds.length > 0 && (
  <div className="flex align-items-center gap-2">
    <Text>{selectedIds.length} valitud</Text>
    <Button visualType="secondary" onClick={() => archive(selectedIds)}>Arhiveeri</Button>
  </div>
)}
```

`selectionMode="single"` swaps checkboxes for radios and keeps at most one id.

The other `TableState` slices follow the same pattern: `sorting`, `columnFilters`,
`columnVisibility`, `columnOrder`, `expanded`, `pagination`. Any key you leave out of
`state` stays internally managed.

## Gotchas

- **`rowProps` / `columnProps` accept `className` and `style` only** — row event handlers
  are rejected, because Table owns row click and keyboard behaviour. Use `onRowClick`.
- **`activeRowId`** is master-detail anchoring (`aria-current="true"`), distinct from
  checkbox selection and from `:hover`.
- **`expandTrigger="row"`** makes a click anywhere on an expandable row toggle it.
- **Give every column a stable `id`** when using column visibility, reordering or
  persistence.
- **Wide tables need `min-width: 0` on their flex parent**, or the table pushes the page
  layout wider instead of scrolling. See the page-shell guide in README.md.

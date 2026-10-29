/// <reference types="vite/client" />

import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentType, type ReactNode, useEffect, useId, useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../../../../tedi/components/buttons/button/button';
import { Checkbox } from '../../../../tedi/components/form/checkbox/checkbox';
import { TextField } from '../../../../tedi/components/form/textfield/textfield';
import { Toggle } from '../../../../tedi/components/form/toggle/toggle';
import { Col, Row } from '../../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../../tedi/components/layout/vertical-spacing';
import { Alert } from '../../../../tedi/components/notifications/alert/alert';
import { Dropdown } from '../../../../tedi/components/overlays/dropdown/dropdown';
import { CategorySearch } from './category-search';
import styles from './category-search.stories.module.scss';
import storySource from './category-search.stories.tsx?raw';
import type { CategorySearchFilterContext, CategorySearchProps, CategorySearchSize } from './category-search.types';
import { defineCategorySearchCategory } from './define-category-search-category';

// Address example start
const addresses = [
  'Kasevälja tee 127, Rohelise küla, Näidise vald, Harju maakond, 12345',
  'Kasevälja tee 129a, Rohelise küla, Näidise vald, Harju maakond, 12345',
  'Männimetsa põik 42, Päikeseküla, Näidise vald, Tartu maakond, 54321',
];

const addressSearch = defineCategorySearchCategory<string[]>({
  id: 'addresses',
  label: 'Addresses',
  mode: 'search',
  placeholder: 'Search addresses',
  minQueryLength: 3,
  onSearch: async (query) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return addresses.filter((address) => address.toLowerCase().includes(query.trim().toLowerCase()));
  },
  renderResults: ({ result, selectResult }) => (
    <div>
      {result.map((address) => (
        <div key={address}>
          <Button visualType="link" onClick={() => selectResult(address)}>
            {address}
          </Button>
        </div>
      ))}
    </div>
  ),
});

function AddressSearchExample(props: Partial<CategorySearchProps> = {}) {
  const id = useId();
  const [showSearchButton, setShowSearchButton] = useState(true);
  const [extraSmallSearchIcon, setExtraSmallSearchIcon] = useState(false);

  return (
    <div>
      <div style={{ marginBlockEnd: '1rem' }}>
        <Toggle
          id={`${id}-show-search-button`}
          label="Show search button"
          checked={showSearchButton}
          onChange={setShowSearchButton}
        />
        <Toggle
          id={`${id}-extra-small-search-icon`}
          label="Extra small search icon"
          checked={extraSmallSearchIcon}
          onChange={setExtraSmallSearchIcon}
        />
      </div>
      <CategorySearch
        size="default"
        searchBarWidth="30rem"
        textResultsPanelWidth="48rem"
        {...props}
        searchButtonIconSize={extraSmallSearchIcon ? 12 : undefined}
        categories={[{ ...addressSearch, showSearchButton }]}
      />
    </div>
  );
}
// Address example end

// People and cities example start
interface PeopleFilters {
  name: string;
  activeOnly: boolean;
}

interface Person {
  name: string;
  active: boolean;
}

interface OrganisationFilters {
  name: string;
  city: string;
}

interface Organisation {
  name: string;
  city: string;
}

const organisations: Organisation[] = [
  { name: 'Example School', city: 'Tallinn' },
  { name: 'Example Library', city: 'Tartu' },
];

const cities = ['Tallinn', 'Tartu', 'Pärnu'];
const people: Person[] = [
  { name: 'Anna Kask', active: true },
  { name: 'Karl Tamm', active: true },
  { name: 'Mari Saar', active: false },
];

function PeopleFields({ values, onChange, disabled, size }: CategorySearchFilterContext<PeopleFilters>) {
  const id = useId();

  return (
    <>
      <TextField
        id={`${id}-name`}
        label="Name"
        value={values.name}
        size={size}
        disabled={disabled}
        onChange={(name) => onChange({ ...values, name })}
      />
      <Checkbox
        id={`${id}-active`}
        name="activeOnly"
        value="active"
        label="Active only"
        checked={values.activeOnly}
        size={size === 'large' ? 'large' : 'default'}
        disabled={disabled}
        onChange={(_, activeOnly) => onChange({ ...values, activeOnly })}
      />
    </>
  );
}

function OrganisationFields({ values, onChange, disabled, size }: CategorySearchFilterContext<OrganisationFilters>) {
  const id = useId();

  return (
    <>
      <TextField
        id={`${id}-name`}
        label="Name"
        value={values.name}
        size={size}
        disabled={disabled}
        onChange={(name) => onChange({ ...values, name })}
      />
      <TextField
        id={`${id}-city`}
        label="City"
        value={values.city}
        size={size}
        disabled={disabled}
        onChange={(city) => onChange({ ...values, city })}
      />
    </>
  );
}

const citySearch = defineCategorySearchCategory<string[]>({
  id: 'cities',
  label: 'Cities',
  mode: 'search',
  placeholder: 'Search cities',
  onSearch: (query) => cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase())),
  renderResults: ({ result, selectResult }) => (
    <div>
      {result.map((city) => (
        <div key={city}>
          <Button visualType="link" onClick={() => selectResult(city)}>
            {city}
          </Button>
        </div>
      ))}
    </div>
  ),
});

function PeopleAndCitiesSearchExample({
  withValidation = false,
  ...props
}: Partial<CategorySearchProps> & { withValidation?: boolean } = {}) {
  const id = useId();
  const [peopleMessage, setPeopleMessage] = useState<ReactNode>();
  const [organisationMessage, setOrganisationMessage] = useState<ReactNode>();
  const [simulateValidation, setSimulateValidation] = useState(false);
  const [validationPosition, setValidationPosition] = useState(props.validationPosition ?? 'before');
  const [minimizeCounter, setMinimizeCounter] = useState(props.minimizeCounter ?? 0);
  const [fullWidthFilterPanel, setFullWidthFilterPanel] = useState(props.fullWidthFilterPanel ?? false);

  const peopleSearch = defineCategorySearchCategory<PeopleFilters, Person[]>({
    id: 'people',
    label: 'People registered as residents',
    mode: 'category',
    initialFilters: () => ({ name: '', activeOnly: false }),
    renderFilters: (context) => <PeopleFields {...context} />,
    validationMessage: peopleMessage,
    onSearch: async ({ name, activeOnly }, { signal }) => {
      setPeopleMessage(undefined);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (signal.aborted) return [];
      if (simulateValidation) {
        if (!name.trim()) {
          setPeopleMessage(
            <Alert type="danger" onClose={() => setPeopleMessage(undefined)}>
              Enter a name to search for people.
            </Alert>
          );
          return [];
        }
      }
      return people.filter(
        (person) => person.name.toLowerCase().includes(name.trim().toLowerCase()) && (!activeOnly || person.active)
      );
    },
    renderResults: ({ result }) => (
      <div>
        {result.map((person) => (
          <div key={person.name}>
            {person.name} — {person.active ? 'Active' : 'Inactive'}
          </div>
        ))}
      </div>
    ),
  });

  const organisationSearch = defineCategorySearchCategory<OrganisationFilters, Organisation[]>({
    id: 'organisations',
    label: 'Organisations',
    mode: 'category',
    initialFilters: () => ({ name: '', city: '' }),
    renderFilters: (context) => <OrganisationFields {...context} />,
    validationMessage: organisationMessage,
    onSearch: async ({ name, city }, { signal }) => {
      setOrganisationMessage(undefined);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (signal.aborted) return [];
      if (simulateValidation) {
        if (!name.trim()) {
          setOrganisationMessage(
            <Alert type="danger" onClose={() => setOrganisationMessage(undefined)}>
              Enter a name to search for organisations.
            </Alert>
          );
          return [];
        }
      }
      return organisations.filter(
        (organisation) =>
          organisation.name.toLowerCase().includes(name.trim().toLowerCase()) &&
          organisation.city.toLowerCase().includes(city.trim().toLowerCase())
      );
    },
    renderResults: ({ result }) => (
      <div>
        {result.map((organisation) => (
          <div key={organisation.name}>
            {organisation.name} — {organisation.city}
          </div>
        ))}
      </div>
    ),
  });

  return (
    <div>
      <div style={{ marginBlockEnd: '1rem' }}>
        <Button size="small" onClick={() => setMinimizeCounter((counter) => counter + 1)}>
          Minimize all
        </Button>
      </div>
      <div style={{ marginBlockEnd: '1rem' }}>
        <Toggle
          id={`${id}-full-width-filter-panel`}
          label="Full-width filter and results panel"
          checked={fullWidthFilterPanel}
          onChange={setFullWidthFilterPanel}
        />
      </div>
      {withValidation && (
        <div style={{ marginBlockEnd: '1rem' }}>
          <Toggle
            id={`${id}-simulate-validation`}
            label="Simulate validation messages"
            checked={simulateValidation}
            onChange={setSimulateValidation}
          />
          <Toggle
            id={`${id}-validation-position`}
            label="Show messages after filters"
            checked={validationPosition === 'after'}
            onChange={(after) => setValidationPosition(after ? 'after' : 'before')}
          />
        </div>
      )}
      <CategorySearch
        defaultCategoryId="people"
        size="default"
        searchBarWidth="30rem"
        {...props}
        minimizeCounter={minimizeCounter}
        validationPosition={validationPosition}
        fullWidthFilterPanel={fullWidthFilterPanel}
        categories={[citySearch, peopleSearch, organisationSearch]}
      />
    </div>
  );
}

function ValidationSearchExample(props: Partial<CategorySearchProps> = {}) {
  return <PeopleAndCitiesSearchExample {...props} withValidation />;
}
// People and cities example end

// External control example start
function ExternalControlSearchExample(props: Partial<CategorySearchProps> = {}) {
  const id = useId();
  const [categoryId, setCategoryId] = useState('people');
  const [open, setOpen] = useState(false);
  const [hideSearchBar, setHideSearchBar] = useState(false);

  return (
    <VerticalSpacing>
      <Toggle
        id={`${id}-hide-search-bar`}
        label="Hide search bar"
        checked={hideSearchBar}
        onChange={setHideSearchBar}
      />
      <Row gutter={2}>
        <Col width="auto">
          <Dropdown modal={false} placement="bottom-start">
            <Dropdown.Trigger>
              <Button size="small" visualType="secondary" iconRight="arrow_drop_down" disabled={props.disabled}>
                Open search
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {[
                { id: 'people', label: 'People' },
                { id: 'organisations', label: 'Organisations' },
                { id: 'cities', label: 'Cities' },
              ].map(({ id, label }, index) => (
                <Dropdown.Item
                  key={id}
                  index={index}
                  onClick={() => {
                    setCategoryId(id);
                    setOpen(true);
                  }}
                >
                  {label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </Col>
        <Col width="auto">
          <Button size="small" visualType="secondary" disabled={!open} onClick={() => setOpen(false)}>
            Close search
          </Button>
        </Col>
      </Row>
      <PeopleAndCitiesSearchExample
        {...props}
        hideSearchBar={hideSearchBar}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        open={open}
        onOpenChange={setOpen}
      />
    </VerticalSpacing>
  );
}
// External control example end

function exampleSource(name: string, imports: string) {
  const start = `// ${name} example start`;
  const end = `// ${name} example end`;
  const example = storySource.slice(storySource.indexOf(start) + start.length, storySource.indexOf(end)).trim();

  return `${imports}\n\n${example}`;
}

const componentDescription = `
A search bar with live text search and category-specific filter forms. Desktop panels keep the page
interactive; mobile uses a full-screen TEDI Modal.

### Category definitions and callbacks

Provide at least one category with a stable, unique ID. Use \`defineCategorySearchCategory\` to keep
each category's filters and results typed, even when different types share one array.

| Mode | Application provides |
| --- | --- |
| \`search\` | \`onSearch(query, context)\`, \`renderResults({ query, result, selectResult })\`, and optional \`initialQuery\`, \`placeholder\`, \`showSearchButton\` and \`minQueryLength\`. |
| \`category\` | \`initialFilters()\`, \`renderFilters({ values, onChange, disabled, size })\`, \`onSearch(filters, context)\`, and \`renderResults({ filters, result })\`. |

Return fields only from \`renderFilters\`: CategorySearch supplies the form and action buttons.
Apply its \`size\` and \`disabled\` values to your TEDI fields. Call \`onChange\` with a fresh object,
including fresh nested objects when editing them; do not mutate the supplied values.

\`onSearch\` may return a result or a promise. Its second argument contains an \`AbortSignal\` for fetch.
A newer search, selecting a text result, Clear, deleting all text, validation or unmounting cancels that
category's pending request; outdated responses are ignored. Closing and minimizing leave requests running
without reopening the panel.

Arrays are counted automatically. Use \`getResultCount(result)\` for other result shapes.
Pending searches show TEDI Spinner; \`labels.loading\` supplies its screen-reader label.
A successful search with zero results shows TEDI EmptyState with \`labels.noResults\`; initial, loading
and failed states do not. Other results are rendered by the application.

### Text search and saved results

Typing searches immediately once the text category's \`minQueryLength\` is reached (default: 1).
Enter and the optional search button use the same minimum. Length counts the entered text without trimming.
Shortening below the minimum cancels the request and discards results while preserving the typed text and an open mobile modal.
\`showSearchButton: false\` hides only the text-category submit button.
Call \`selectResult(text)\` from a result row to set the input text and close the panel without another search.
Click or tap the input to reopen its complete saved list, including when the input already has focus.
Returning focus alone does not reopen it.

Each category retains its draft, last submitted values and successful results while mounted.
Closing, switching category or changing presentation preserves them. Clear and deleting all text remove
the active text category's query and saved results. Filter Clear resets only that category to its initial
filters. \`initialQuery\`, \`defaultCategoryId\` and \`defaultOpen\` apply only on mount.
Keep category IDs stable while mounted; definitions and callbacks may change.

During a pending search, the category dropdown is disabled; closing and minimizing remain available.
Use \`categoryId\` with \`onCategoryChange\` to control selection. External changes wait until the request
finishes or is cancelled, then the latest supplied ID applies. Changing \`categoryId\` does not open the
panel or submit a search.

Use \`open\` with \`onOpenChange\` to control visibility independently of category selection. Interactions,
the mobile Modal and \`minimizeCounter\` request changes through \`onOpenChange\`; the parent applies \`open\`.
An external menu can set \`categoryId\` and \`open\` together. Opening never submits a search; desktop text
results still need a non-empty query and a pending/completed search or error.

Use \`hideSearchBar\` with an external trigger to omit the standalone controls while keeping those inside the mobile Modal.
It does not change visibility or saved state. Hidden desktop bars leave panels anchored at the component's position.
Filter panels then use the component's width, set with \`searchBarWidth\`; use a length or percentage rather than \`fit-content\`.

Submitting an unchanged filter form shows its saved successful results without another request.
Search runs again after filter edits, after results are cleared, or when retrying a failed request.

Editing filters, including during a pending search, preserves the submitted values paired with saved
results. **Filters edited since searching.** uses object identity, so editing back to the original field
values still leaves the notice until another search. A failed replacement search keeps earlier results.

### Application validation

Supply a TEDI Alert through a filter category's \`validationMessage\`. The application owns the content,
severity and lifetime; CategorySearch reads the latest definition without copying messages into state.
For the selected category, a message cancels its pending request and discards saved results while
preserving entered filters. An open panel shows the form and Alert; a closed panel stays closed.
Dismissing the Alert leaves the form visible because no results remain. Other categories keep their own state.

\`validationPosition\` places the message before or after fields without resetting values. Clear does not
remove application messages. Search remains available for retry: clear the category's previous message at
the start of \`onSearch\`, then validate the submitted filters again. The application decides whether to
supply another message or return matching results; CategorySearch requires no validation response format.
Before setting an asynchronous message, check \`signal.aborted\` so a cancelled request cannot restore it.

### Presentation and controls

\`mobile\` uses TEDI's below-md breakpoint when omitted; \`true\` and \`false\` override it.
The mobile launcher opens without searching. The modal header contains its title and Close control;
its body contains the category dropdown, search bar, then filters or results.
Normal closing restores focus to the search control. Text searches leave focus in place; replacing a
focused filter form with results recovers focus to the panel.

\`searchBarWidth\` sets the whole bar's width, including the category dropdown, within its parent.
The desktop dropdown keeps the width of its widest label without wrapping; the input uses the remaining bar width.

Desktop text results use \`textResultsPanelWidth\`, constrained to available viewport space. Filter panels match the
bar's left action area by default. Set \`fullWidthFilterPanel\` to include the category selector in the
width of filter forms and their results. \`maxPanelHeight\` limits desktop panel height.
\`textResultsPanelWidth\` and \`maxPanelHeight\` accept CSS lengths or pixel numbers; neither changes the full-screen mobile modal.

Every later change to \`minimizeCounter\` requests closing without restoring focus or discarding state.
Its initial and unchanged values do nothing. Pending results and validation leave a minimized panel closed;
the user can reopen normally.

Use \`labels\` for action/status text and \`resultCount\` formatting. \`labels.searchInput\` also names the
mobile modal. The forwarded ref points to the outer div. Story controls for size and presentation keep
the same component mounted.
`;

function CategorySearchExample({
  args,
  Example,
  onSizeChange,
}: {
  args: CategorySearchProps;
  Example: ComponentType<Partial<CategorySearchProps>>;
  onSizeChange: (size: CategorySearchSize) => void;
}) {
  // Secondary Docs examples keep their initial args, so their buttons also need local state.
  const [selectedSize, setSelectedSize] = useState(args.size ?? 'default');
  useEffect(() => {
    setSelectedSize(args.size ?? 'default');
  }, [args.size]);
  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'default', label: 'Default' },
    { value: 'large', label: 'Large' },
  ] as const;

  return (
    <>
      <div className={styles['category-search-story__sizes']} role="group" aria-label="Component size">
        {sizeOptions.map(({ value, label }) => (
          <Button
            key={value}
            size="small"
            visualType={selectedSize === value ? 'primary' : 'secondary'}
            aria-pressed={selectedSize === value}
            onClick={() => {
              setSelectedSize(value);
              onSizeChange(value);
            }}
          >
            {label}
          </Button>
        ))}
      </div>
      <Example {...args} size={selectedSize} />
    </>
  );
}

const meta = {
  title: 'Community/Form/CategorySearch',
  component: CategorySearch,
  tags: ['autodocs'],
  render: function Render(args) {
    const [, updateArgs] = useArgs<CategorySearchProps>();
    return (
      <CategorySearchExample args={args} Example={AddressSearchExample} onSizeChange={(size) => updateArgs({ size })} />
    );
  },
  args: {
    categories: [addressSearch],
    size: 'default',
    searchBarWidth: '30rem',
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst', exclude: ['ref', 'key'] },
    docs: {
      description: {
        component: componentDescription,
      },
    },
  },
  argTypes: {
    categories: {
      control: false,
      type: { name: 'other', value: 'CategorySearchCategory[]', required: true },
      description: 'At least one typed definition with a stable, unique ID.',
      table: { category: 'Required props', type: { summary: 'readonly CategorySearchCategory[]' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'default', 'large'],
      description: 'Control size, also passed to renderFilters.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'default' } },
    },
    searchButtonIconSize: {
      control: false,
      description:
        'Magnifying-glass size, independent of the button and input size. The first example has an Extra small search icon switch: 12 px when on, TEDI default when off.',
      table: {
        category: 'Optional props',
        subcategory: 'Layout',
        type: { summary: 'IconSize' },
        defaultValue: { summary: '18 (small/default), 24 (large)' },
      },
    },
    mobile: {
      control: 'inline-radio',
      options: ['Automatic', 'Mobile', 'Desktop'],
      mapping: { Automatic: undefined, Mobile: true, Desktop: false },
      description: 'Automatic follows the below-md breakpoint; Mobile and Desktop override it.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'Automatic (below md)' } },
    },
    hideSearchBar: {
      control: false,
      description: 'Hide the standalone controls. Try the Hide search bar switch in External control.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'false' } },
    },
    validationPosition: {
      control: false,
      description: 'Place application-provided validation content before or after filter fields.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'before' } },
    },
    categoryId: {
      control: false,
      description: 'Controlled category ID. Changes wait until the pending search finishes or is cancelled.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    onCategoryChange: {
      control: false,
      description: 'Dropdown selection callback. Update categoryId to apply it in controlled use.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    defaultCategoryId: {
      control: false,
      description: 'Initial category ID for uncontrolled use, used only on mounting.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'First category ID' } },
    },
    open: {
      control: false,
      description: 'Controlled visibility. Opening does not submit a search.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    onOpenChange: {
      control: false,
      description:
        'Visibility request callback, including minimizing and mobile Modal closing. Update open in controlled use.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    defaultOpen: {
      control: false,
      description: 'Initial visibility when open is omitted. Desktop text results also need a search.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'false' } },
    },
    minimizeCounter: {
      control: false,
      description: 'Later changes request closing without clearing state or restoring focus.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables category selection, filter fields, searching and clearing. The panel can still be closed.',
      table: { category: 'Optional props', subcategory: 'Interaction', defaultValue: { summary: 'false' } },
    },
    showCountInResultsPanel: {
      control: 'boolean',
      description: 'Show the count above filter results. Does not affect the count in the Show results button.',
      table: { category: 'Optional props', subcategory: 'Text', defaultValue: { summary: 'true' } },
    },
    labels: {
      control: false,
      description: 'Override action labels, status text and the resultCount formatter.',
      table: {
        category: 'Optional props',
        subcategory: 'Text',
        type: { summary: 'Partial<CategorySearchLabels>' },
        defaultValue: { summary: 'English labels' },
      },
    },
    searchBarWidth: {
      control: 'text',
      description: 'Whole search-bar width, including the category dropdown. Use a CSS length such as 480px.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: '100%' } },
    },
    textResultsPanelWidth: {
      control: 'text',
      description: 'Desktop text-results width. Use a CSS length such as 480px in this text control.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: '100%' } },
    },
    fullWidthFilterPanel: {
      control: false,
      description:
        'Use the example switch to make desktop filter forms and results match the full bar, including the dropdown.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'false' } },
    },
    maxPanelHeight: {
      control: 'text',
      description: 'Maximum desktop panel height; longer content scrolls inside it.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'min(32rem, 70dvh)' } },
    },
    id: {
      control: 'text',
      description: 'DOM ID prefix for the component, input and panel. Use unique IDs when rendering several instances.',
      table: {
        category: 'Optional props',
        subcategory: 'Accessibility',
        defaultValue: { summary: 'Generated unique ID' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class on the outer component element.',
      table: { category: 'Optional props', subcategory: 'Layout' },
    },
  },
  decorators: [
    (Story) => (
      <div className={styles['category-search-story']}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategorySearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Search',
  args: {
    textResultsPanelWidth: '48rem',
  },
  play: async ({ canvasElement, args }) => {
    if (args.disabled) return;
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const launcher = canvas.getByRole('searchbox', { name: 'Search' });
    const mobile = launcher.hasAttribute('readonly');
    if (mobile) await userEvent.click(launcher);
    const search = mobile ? within(await page.findByRole('dialog', { name: 'Search' })) : canvas;
    if (mobile) {
      await waitFor(async () => {
        await expect(search.getAllByRole('button', { name: 'Close' })[0]).toHaveFocus();
      });
    }
    await userEvent.type(search.getByRole('searchbox', { name: 'Search' }), 'Kase');
    await waitFor(
      async () => {
        await expect(search.getByRole('button', { name: addresses[0] })).toBeVisible();
        await expect(search.getByRole('button', { name: addresses[1] })).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        type: 'code',
        code: exampleSource(
          'Address',
          `import { useId, useState } from 'react';
import { Button, Toggle } from '@tedi-design-system/react/tedi';
import { CategorySearch, defineCategorySearchCategory, type CategorySearchProps } from '@tedi-design-system/react/community';`
        ),
      },
      description: {
        story:
          'This example requires at least 3 characters. Type Kase to see the spinner for two seconds, then two address results; try No match for the empty state. Select an address and click the input to reopen the full saved list. Show search button tries both input variants.',
      },
    },
  },
};

export const CategoryFilters: Story = {
  name: 'Category search',
  decorators: [
    (Story) => (
      <div style={{ minHeight: '40rem' }}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [, updateArgs] = useArgs<CategorySearchProps>();
    return (
      <CategorySearchExample
        args={args}
        Example={PeopleAndCitiesSearchExample}
        onSizeChange={(size) => updateArgs({ size })}
      />
    );
  },
  args: {
    defaultCategoryId: 'people',
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        type: 'code',
        code: exampleSource(
          'People and cities',
          `import { type ReactNode, useId, useState } from 'react';
import { Alert, Button, Checkbox, TextField, Toggle } from '@tedi-design-system/react/tedi';
import {
  CategorySearch,
  defineCategorySearchCategory,
  type CategorySearchFilterContext,
  type CategorySearchProps,
} from '@tedi-design-system/react/community';`
        ),
      },
      description: {
        story:
          'People and Organisations show the spinner for two seconds before returning matching rows; Cities searches as you type. Try Name Anna or School, leave fields empty for all rows, or enter No match for an empty result. Minimize all hides the panel or mobile modal while retaining values and results.',
      },
    },
  },
};

export const CategoryValidation: Story = {
  ...CategoryFilters,
  name: 'Category search with validation',
  render: function Render(args) {
    const [, updateArgs] = useArgs<CategorySearchProps>();
    return (
      <CategorySearchExample
        args={args}
        Example={ValidationSearchExample}
        onSizeChange={(size) => updateArgs({ size })}
      />
    );
  },
  parameters: {
    docs: {
      ...CategoryFilters.parameters?.docs,
      description: {
        story: `
Simulation starts off for normal results. With **Simulate validation messages** enabled:

1. Leave **Name** empty and submit People or Organisations. The dropdown is disabled during the two-second request.
2. The response shows an Alert and preserves entered filters; previous results are discarded.
3. Enter **Anna** for People or **School** for Organisations and search again. The old message clears and matching rows appear after the delay.

To try independent messages, submit each category with an empty Name, switching only after each response.
The placement switch moves Alerts before or after fields. Dismissing an Alert leaves the form open.
Close or minimize during the delay to check that the response keeps the panel closed.
`,
      },
    },
  },
};

export const ExternalControl: Story = {
  ...CategoryFilters,
  name: 'External control',
  render: function Render(args) {
    const [, updateArgs] = useArgs<CategorySearchProps>();
    return (
      <CategorySearchExample
        args={args}
        Example={ExternalControlSearchExample}
        onSizeChange={(size) => updateArgs({ size })}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        type: 'code',
        code:
          exampleSource(
            'People and cities',
            `import { type ReactNode, useId, useState } from 'react';
import { Alert, Button, Checkbox, Col, Dropdown, Row, TextField, Toggle, VerticalSpacing } from '@tedi-design-system/react/tedi';
import {
  CategorySearch,
  defineCategorySearchCategory,
  type CategorySearchFilterContext,
  type CategorySearchProps,
} from '@tedi-design-system/react/community';`
          ) + exampleSource('External control', ''),
      },
      description: {
        story:
          'Choose People, Organisations or Cities from Open search to select a category and open it. On desktop, choose another menu item while the panel is open. Close search hides it without clearing values or results. Cities needs a search before desktop results appear. Turn on Hide search bar and choose Mobile to open from the external menu while keeping the controls inside the Modal. On mobile, close the Modal before using the external controls again.',
      },
    },
  },
};

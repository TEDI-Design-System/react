/// <reference types="vite/client" />

import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentType, type ReactNode, useEffect, useId, useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../../../../tedi/components/buttons/button/button';
import { Checkbox } from '../../../../tedi/components/form/checkbox/checkbox';
import { TextField } from '../../../../tedi/components/form/textfield/textfield';
import { Toggle } from '../../../../tedi/components/form/toggle/toggle';
import { Alert } from '../../../../tedi/components/notifications/alert/alert';
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
  onSearch: (query) => addresses.filter((address) => address.toLowerCase().includes(query.trim().toLowerCase())),
  renderResults: ({ result, selectResult }) => (
    <div>
      {result.map((address) => (
        <div key={address} style={{ display: 'flex', overflowWrap: 'anywhere' }}>
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

  return (
    <div>
      <div style={{ marginBlockEnd: '1rem' }}>
        <Toggle
          id={`${id}-show-search-button`}
          label="Show search button"
          checked={showSearchButton}
          onChange={setShowSearchButton}
        />
      </div>
      <CategorySearch
        size="default"
        searchBarWidth="30rem"
        textResultsPanelWidth="48rem"
        {...props}
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
        <div key={city} style={{ display: 'flex', overflowWrap: 'anywhere' }}>
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
      if (simulateValidation) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!signal.aborted) {
          setPeopleMessage(
            <Alert type="danger" onClose={() => setPeopleMessage(undefined)}>
              Please review the people search for {name.trim() || 'all people'}.
            </Alert>
          );
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
      if (simulateValidation) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!signal.aborted) {
          setOrganisationMessage(
            <Alert type="danger" onClose={() => setOrganisationMessage(undefined)}>
              Please review the organisation search for {name.trim() || 'all organisations'}.
            </Alert>
          );
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
| \`search\` | \`onSearch(query, context)\`, \`renderResults({ query, result, selectResult })\`, and optional \`initialQuery\`, \`placeholder\` and \`showSearchButton\`. |
| \`category\` | \`initialFilters()\`, \`renderFilters({ values, onChange, disabled, size })\`, \`onSearch(filters, context)\`, and \`renderResults({ filters, result })\`. |

Return fields only from \`renderFilters\`: CategorySearch supplies the form and action buttons.
Apply its \`size\` and \`disabled\` values to your TEDI fields. Call \`onChange\` with a fresh object,
including fresh nested objects when editing them; do not mutate the supplied values.

\`onSearch\` may return a result or a promise. Its second argument contains an \`AbortSignal\` for fetch.
A newer search, selection, Clear, deleting all text or unmounting cancels that category's pending request;
outdated responses are ignored. Closing, minimizing and category switching let requests finish without
reopening the panel or changing the active category.

Arrays are counted automatically. Use \`getResultCount(result)\` for other result shapes.
A successful search with zero results shows TEDI EmptyState with \`labels.noResults\`; initial, loading
and failed states do not. Other results are rendered by the application.

### Text search and saved results

Typing searches immediately. Enter and the optional search button submit explicitly.
\`showSearchButton: false\` hides only the text-category submit button.
Call \`selectResult(text)\` from a result row to set the input text and close the panel without another search.
Click or tap the input to reopen its complete saved list, including when the input already has focus.
Returning focus alone does not reopen it.

Each category retains its draft, last submitted values and successful results while mounted.
Closing, switching category or changing presentation preserves them. Clear and deleting all text remove
the active text category's query and saved results. Filter Clear resets only that category to its initial
filters. \`initialQuery\`, \`defaultCategoryId\` and \`defaultOpen\` apply only on mount.
Keep category IDs stable while mounted; definitions and callbacks may change.

Editing filters, including during a pending search, preserves the submitted values paired with saved
results. **Filters edited since searching.** uses object identity, so editing back to the original field
values still leaves the notice until another search. A failed replacement search keeps earlier results.

### Application validation

Supply a TEDI Alert through a filter category's \`validationMessage\`. The application owns the content,
severity and lifetime; CategorySearch reads the latest definition without copying messages into state.
A message shows that category's filter form with its entered values preserved. Messages never appear
in results, switch categories or reopen a closed panel.

\`validationPosition\` places the message before or after fields. Moving or removing it preserves the form
and values. Clear does not remove application messages. Messages do not block searches or impose a backend
response format. Before setting a message after an asynchronous request, check \`signal.aborted\` so a
cancelled request cannot restore an obsolete message.

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

Every later change to \`minimizeCounter\` hides the panel without restoring focus or discarding state.
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
    mobile: {
      control: 'inline-radio',
      options: ['Automatic', 'Mobile', 'Desktop'],
      mapping: { Automatic: undefined, Mobile: true, Desktop: false },
      description: 'Automatic follows the below-md breakpoint; Mobile and Desktop override it.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'Automatic (below md)' } },
    },
    validationPosition: {
      control: false,
      description: 'Place application-provided validation content before or after filter fields.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'before' } },
    },
    defaultCategoryId: {
      control: false,
      description: 'Initial category ID, used only on mounting.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'First category ID' } },
    },
    defaultOpen: {
      control: false,
      description: 'Initial visibility. Desktop text results also need a search.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'false' } },
    },
    minimizeCounter: {
      control: false,
      description: 'Application-owned counter. Later changes hide the panel without clearing state or restoring focus.',
      table: { category: 'Optional props', subcategory: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables category selection, filter fields, searching and clearing. The panel can still be closed.',
      table: { category: 'Optional props', subcategory: 'Interaction', defaultValue: { summary: 'false' } },
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
    await userEvent.type(search.getByRole('searchbox', { name: 'Search' }), 'Kase');
    await waitFor(async () => {
      await expect(search.getByRole('button', { name: addresses[0] })).toBeVisible();
      await expect(search.getByRole('button', { name: addresses[1] })).toBeVisible();
    });
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
          'Type Kase to find two addresses, or No match for the empty state. Select an address and click the input to reopen the full saved list. Show search button tries both input variants; desktop results may be wider than the bar.',
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
          'People and Organisations return matching rows immediately; Cities searches as you type. Try Name Anna or School, leave fields empty for all rows, or enter No match for an empty result. Minimize all hides the panel while retaining values and results.',
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
        story:
          'Simulation starts off for normal results. Enable Simulate validation messages, submit People, then switch to Organisations before the two-second response. Only People receives its Alert; switch back to see its preserved values. Submit Organisations for an independent message. The placement switch moves Alerts before or after fields. Resubmitting clears only the previous message for that category; dismissing leaves its form open. Minimize during the delay to check that the response keeps the panel closed.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useId, useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../../../../tedi/components/buttons/button/button';
import { Checkbox } from '../../../../tedi/components/form/checkbox/checkbox';
import { TextField } from '../../../../tedi/components/form/textfield/textfield';
import { CategorySearch } from './category-search';
import styles from './category-search.stories.module.scss';
import type { CategorySearchFilterContext, CategorySearchProps, CategorySearchSize } from './category-search.types';
import { defineCategorySearchCategory } from './define-category-search-category';

interface Person {
  name: string;
  active: boolean;
}

const addresses = [
  'Kasevälja tee 127, Rohelise küla, Näidise vald, Harju maakond, 12345',
  'Kasevälja tee 129a, Rohelise küla, Näidise vald, Harju maakond, 12345',
  'Männimetsa põik 42, Päikeseküla, Näidise vald, Tartu maakond, 54321',
];

const cities = ['Tallinn', 'Tartu', 'Pärnu'];
const people: Person[] = [
  { name: 'Anna Kask', active: true },
  { name: 'Karl Tamm', active: true },
  { name: 'Mari Saar', active: false },
];

interface PeopleFilters {
  name: string;
  activeOnly: boolean;
}

function ResultRows({ items, onSelect }: { items: string[]; onSelect?: (item: string) => void }) {
  return (
    <ul className={styles['category-search-story__results']}>
      {items.map((item) => (
        <li key={item}>
          {onSelect ? (
            <Button visualType="link" onClick={() => onSelect(item)}>
              {item}
            </Button>
          ) : (
            item
          )}
        </li>
      ))}
    </ul>
  );
}

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

const addressSearch = defineCategorySearchCategory<string[]>({
  id: 'addresses',
  label: 'Addresses',
  mode: 'search',
  placeholder: 'Search addresses',
  onSearch: (query) => addresses.filter((address) => address.toLowerCase().includes(query.trim().toLowerCase())),
  renderResults: ({ result, selectResult }) => <ResultRows items={result} onSelect={selectResult} />,
});

const citySearch = defineCategorySearchCategory<string[]>({
  id: 'cities',
  label: 'Cities',
  mode: 'search',
  placeholder: 'Search cities',
  onSearch: (query) => cities.filter((city) => city.toLowerCase().includes(query.trim().toLowerCase())),
  renderResults: ({ result, selectResult }) => <ResultRows items={result} onSelect={selectResult} />,
});

const peopleSearch = defineCategorySearchCategory<PeopleFilters, Person[]>({
  id: 'people',
  label: 'People',
  mode: 'category',
  initialFilters: () => ({ name: '', activeOnly: false }),
  renderFilters: (context) => <PeopleFields {...context} />,
  onSearch: async ({ name, activeOnly }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return people.filter(
      (person) => person.name.toLowerCase().includes(name.trim().toLowerCase()) && (!activeOnly || person.active)
    );
  },
  renderResults: ({ result }) => (
    <ResultRows items={result.map((person) => `${person.name} — ${person.active ? 'Active' : 'Inactive'}`)} />
  ),
});

const peopleWithLongLabel = {
  ...peopleSearch,
  id: 'people-long-label',
  label: 'People registered as residents',
};

const searchExampleSource = `import { CategorySearch, defineCategorySearchCategory } from '@tedi-design-system/react/community';
import { Button } from '@tedi-design-system/react/tedi';

// Fictional addresses for this example.
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

  onSearch: (query) => {
    const searchText = query.trim().toLowerCase();
    return addresses.filter((address) => address.toLowerCase().includes(searchText));
  },

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

export function AddressSearchExample() {
  return (
    <div style={{ width: '30rem', maxWidth: '100%' }}>
      <CategorySearch categories={[addressSearch]} size="default" panelWidth="48rem" />
    </div>
  );
}`;

const categorySearchExampleSource = `import { useId } from 'react';

import {
  CategorySearch,
  type CategorySearchFilterContext,
  defineCategorySearchCategory,
} from '@tedi-design-system/react/community';
import { Button, Checkbox, TextField } from '@tedi-design-system/react/tedi';

interface PeopleFilters {
  name: string;
  activeOnly: boolean;
}

interface Person {
  name: string;
  active: boolean;
}

const cities = ['Tallinn', 'Tartu', 'Pärnu'];
const people: Person[] = [
  { name: 'Anna Kask', active: true },
  { name: 'Karl Tamm', active: true },
  { name: 'Mari Saar', active: false },
];

function PeopleFields({ values, onChange, disabled, size }: CategorySearchFilterContext<PeopleFilters>) {
  const fieldId = useId();

  // Replace the filter object on each edit so saved results keep their original inputs.
  return (
    <>
      <TextField
        id={fieldId + '-name'}
        label="Name"
        value={values.name}
        size={size}
        disabled={disabled}
        onChange={(name) => onChange({ ...values, name })}
      />
      <Checkbox
        id={fieldId + '-active'}
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

const citySearch = defineCategorySearchCategory<string[]>({
  id: 'cities',
  label: 'Cities',
  mode: 'search',
  placeholder: 'Search cities',

  onSearch: (query) => {
    const searchText = query.trim().toLowerCase();
    return cities.filter((city) => city.toLowerCase().includes(searchText));
  },

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

const peopleSearch = defineCategorySearchCategory<PeopleFilters, Person[]>({
  id: 'people',
  label: 'People',
  mode: 'category',
  initialFilters: () => ({ name: '', activeOnly: false }),

  renderFilters: (context) => <PeopleFields {...context} />,

  onSearch: async ({ name, activeOnly }) => {
    // Demo delay to make the loading state visible.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const searchText = name.trim().toLowerCase();

    return people.filter((person) => {
      const matchesName = person.name.toLowerCase().includes(searchText);
      const matchesActiveFilter = !activeOnly || person.active;
      return matchesName && matchesActiveFilter;
    });
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

const peopleWithLongLabel = {
  ...peopleSearch,
  id: 'people-long-label',
  label: 'People registered as residents',
};

export function PeopleAndCitiesSearchExample() {
  // Filter panels match the left action area, excluding the category selector.
  // panelWidth changes only text-search panels, such as Cities.
  return (
    <div style={{ width: '30rem', maxWidth: '100%' }}>
      <CategorySearch
        categories={[citySearch, peopleSearch, peopleWithLongLabel]}
        defaultCategoryId="people"
        defaultOpen
        size="default"
      />
    </div>
  );
}`;

const componentDescription = `
A reusable search bar with **live text search** and **category-specific filter forms**.
Results and filters open directly beneath the bar. The page remains interactive:
there is no modal backdrop, focus trap or page scroll lock.
The category menu opens beneath the selector, aligned with its right edge.

### What the application supplies

The required \`categories\` prop contains definitions created with \`defineCategorySearchCategory\`.
Each category has a stable, unique ID, a visible label, a search callback and a result renderer.

| Category mode | Application provides |
| --- | --- |
| \`search\` | \`onSearch(query, context)\`, \`renderResults({ query, result, selectResult })\`, and optional \`initialQuery\` and \`placeholder\`. |
| \`category\` | \`initialFilters()\`, \`renderFilters({ values, onChange, disabled, size })\`, \`onSearch(filters, context)\`, and \`renderResults({ filters, result })\`. |

Use existing TEDI controls for filter fields. Return fields only: CategorySearch supplies the form,
Search, Clear and Close buttons. Replace edited values with a fresh object; never change the supplied
object in place. Create fresh objects for edited nested values too. This keeps saved results tied to
their original inputs. The helper keeps each category's field and result types checked,
even when different categories share one array.

### Live text search and selection

Typing searches the selected text category while focus stays in the input. Enter and the search button
can still submit explicitly. The application renders its own result rows; call \`selectResult(text)\`
when a row is chosen to put that text into the input and close the panel. Selection also cancels pending
work and returns focus to the input. It does not run another search.

Addresses and Cities use TEDI buttons for selectable rows, so they work with a pointer or Tab and Enter.
After closing the panel, select the same category again from the menu to reopen its saved results.

### Sizes

\`size\` accepts \`small\`, \`default\` and \`large\`, matching TEDI Search. It defaults to \`default\`.
The component passes the resolved size to \`renderFilters\`; apply it to the TEDI fields you provide.
The People example applies it to TextField and uses Checkbox's large size only for \`large\`, because
Checkbox supports default and large sizes.

Both examples have Small, Default and Large buttons linked to the Storybook size control.
Changing size keeps the same component mounted, preserving edited values and saved results.

### Remembered values and results

Each category remembers three things: the input you are editing, the input submitted for its last
successful search, and the results of that search. These are kept while CategorySearch stays mounted.

- **Search** saves the query or submitted filters together with the successful result.
- **Edit filters** changes the form while existing results still belong to the submitted values.
- **Close** hides the panel and keeps the values and results.
- **Switch category** restores that category's values and successful results.
- **Clear / Clear filter** restores only the selected category's defaults and removes its saved search.
- **Empty results** are a completed search and can be reopened.
- **Failed replacement searches** show an error and keep the earlier successful result.

When category filters have been edited, the results show **Filters edited since searching.**
For object filters, this checks whether the current filter object is the same object that was submitted.
It does not compare individual fields or nested contents. Editing a field back to its earlier value still
creates another object, so the notice remains. Search again to produce results from the current filters.

Editing while a search is running keeps your latest form values. When that search succeeds, its results
remain paired with the input submitted at the start. The notice stays if you edited those filters while waiting.

A text search has no panel before the first search. Category filters can open immediately.
Removing CategorySearch from the page resets its saved state. Removing a category forgets that category's state;
changing a definition while keeping its ID preserves the existing values.

### Asynchronous searches and focus

\`onSearch\` can return a result directly or a promise. Its second argument contains an \`AbortSignal\`
for fetch requests. A newer search, result selection, Clear, category removal or unmounting cancels the earlier request.
Outdated responses are ignored even when the application callback does not use the signal.

Closing or switching categories does not cancel a pending search. Its result is saved for its own category.
A delayed response never reopens the panel, selects a category or moves focus.
Typing keeps focus in the input. Explicit submission moves focus to the results panel;
Close or Escape inside the panel returns focus to the search control.
Escape outside the component leaves the panel open.

### Result counts and layout

Arrays are counted automatically. Supply \`getResultCount(result)\` for paginated or other result shapes.
A count of zero displays the no-results message. Otherwise the application renders the result rows.

Panels overlay content below the search bar. For text-search categories, \`panelWidth\` sets the result
panel width independently of the bar; it can be wider and shrinks to the available viewport space.
The Search example keeps the bar at 30rem and requests a 48rem panel for long addresses.
Category-filter panels always match the left action area, excluding the category selector;
\`panelWidth\` does not change them.

Keep the bar within the viewport and avoid clipping ancestors. \`maxPanelHeight\` limits panel height,
with scrolling for longer content. Both dimension props accept CSS lengths or numbers in pixels.

### Controlled state and labels

Normally CategorySearch manages the selected category and panel visibility.
To manage them in the application, pass \`categoryId\` with \`onCategoryChange\`, or \`open\` with \`onOpenChange\`,
and apply the requested value. \`defaultCategoryId\` and \`defaultOpen\` only set the initial state.
They do not reset a mounted component.

Use \`labels\` to override the English action and status text. Category labels name the selector,
the search region and the panel. \`labels.searchInput\` names the text input.
The forwarded ref points to the outer div.

### Examples

**Search** types **Kase** when opened, showing two fictional full addresses immediately. The bar stays
30rem wide while the results panel requests 48rem. Long address rows wrap on narrow screens. Choose a row
to put the full address into the input and close the results. Storybook types into the real field in Canvas and Docs.
**Category search** starts with the People filter form and adds Cities to demonstrate remembered searches.
**People registered as residents** demonstrates a longer category label in the right-aligned menu.
It reuses the People fields and data with its own category ID, so its values and results are remembered separately.
People searches simulate a one-second delay so **Searching…** is visible and you can switch categories
or close the panel while a request is pending. City searches remain immediate.
Both examples show plain result rows and use the same component. Neither example calls a backend.
`;

function CategorySearchExample({
  args,
  onSizeChange,
}: {
  args: CategorySearchProps;
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
      <CategorySearch {...args} size={selectedSize} />
    </>
  );
}

const meta = {
  title: 'Community/Form/CategorySearch',
  component: CategorySearch,
  tags: ['autodocs'],
  render: function Render(args) {
    const [, updateArgs] = useArgs<CategorySearchProps>();
    return <CategorySearchExample args={args} onSizeChange={(size) => updateArgs({ size })} />;
  },
  args: {
    categories: [addressSearch],
    size: 'default',
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
      description:
        'Required. Category definitions with unique IDs. Use defineCategorySearchCategory to connect typed fields, search callbacks and result renderers.',
      table: { category: 'Required props', type: { summary: 'readonly CategorySearchCategory[]' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'default', 'large'],
      description:
        'Search bar size, matching TEDI Search. Also passed to renderFilters so application-provided fields can use the same size. The visible size buttons update this control without resetting the component.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: 'default' } },
    },
    categoryId: {
      control: false,
      description:
        'Controlled category ID. Apply onCategoryChange to update it. An unknown ID falls back to the first category.',
      table: {
        category: 'Optional props',
        subcategory: 'State',
        defaultValue: { summary: 'undefined (managed internally)' },
      },
    },
    defaultCategoryId: {
      control: false,
      description: 'Initial category ID, used only on mounting. Ignored when categoryId is supplied.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'First category ID' } },
    },
    onCategoryChange: {
      control: false,
      description: 'Called when a category is selected. In controlled mode, use the requested ID to update categoryId.',
      table: {
        category: 'Optional props',
        subcategory: 'Events',
        type: { summary: '(categoryId: string) => void' },
      },
    },
    open: {
      control: false,
      description:
        'Controlled panel visibility. Apply onOpenChange to update it. Text search still needs a search before it can show a panel.',
      table: {
        category: 'Optional props',
        subcategory: 'State',
        defaultValue: { summary: 'undefined (managed internally)' },
      },
    },
    defaultOpen: {
      control: false,
      description: 'Initial panel visibility, used only on mounting. Text search has no panel until its first search.',
      table: { category: 'Optional props', subcategory: 'State', defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      control: false,
      description:
        'Called when an interaction requests the panel to open or close. In controlled mode, update open with that value.',
      table: {
        category: 'Optional props',
        subcategory: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables category selection, filter fields, searching and clearing. The panel can still be closed.',
      table: { category: 'Optional props', subcategory: 'Interaction', defaultValue: { summary: 'false' } },
    },
    labels: {
      control: false,
      description:
        'Overrides English action labels, status messages and the resultCount formatter. The default edited-filter notice is "Filters edited since searching." Category names come from their definitions.',
      table: {
        category: 'Optional props',
        subcategory: 'Text',
        type: { summary: 'Partial<CategorySearchLabels>' },
        defaultValue: { summary: 'English labels' },
      },
    },
    panelWidth: {
      control: 'text',
      description:
        'Text-search result panel width, independent of the bar and limited by available viewport space. Ignored for category-filter panels, which match the left action area and exclude the category selector. Accepts a CSS length or a number in pixels; in this text control, use 480px rather than 480.',
      table: { category: 'Optional props', subcategory: 'Layout', defaultValue: { summary: '100%' } },
    },
    maxPanelHeight: {
      control: 'text',
      description:
        'Maximum panel height. Accepts a CSS length or a number in pixels. Longer content scrolls inside the panel.',
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
    panelWidth: '48rem',
  },
  play: async ({ canvasElement, args }) => {
    if (args.disabled) return;
    const canvas = within(canvasElement);
    const input = canvas.getByRole('searchbox', { name: 'Search' });
    await userEvent.clear(input);
    await userEvent.type(input, 'Kase');
    await canvas.findByRole('button', { name: addresses[0] });
    await canvas.findByRole('button', { name: addresses[1] });
    await expect(input).toHaveFocus();
  },
  parameters: {
    docs: {
      story: { autoplay: true },
      source: { language: 'tsx', type: 'code', code: searchExampleSource },
      description: {
        story:
          'Starts with Kase, showing two fictional full addresses. The search bar is 30rem wide and the text-results panel requests 48rem so long addresses have more room; rows wrap on narrow screens. Results update as you type. Choose a row to put the full address into the input and close the results. Try Männimetsa or a name with no matches. Close preserves the query and results; select Addresses again to reopen them. Clear removes the saved search. Small, Default and Large change control size without resetting your work.',
      },
    },
  },
};

export const CategoryFilters: Story = {
  name: 'Category search',
  args: {
    categories: [citySearch, peopleSearch, peopleWithLongLabel],
    defaultCategoryId: 'people',
    defaultOpen: true,
  },
  parameters: {
    docs: {
      source: { language: 'tsx', type: 'code', code: categorySearchExampleSource },
      description: {
        story:
          'People starts with Name and Active only filters. Its panel matches the left action area, excluding the category selector. Search takes one second; try editing the filters while it runs. The completed results keep the submitted input, and your edits remain in the form. "Filters edited since searching." also remains when you edit a field back, because each edit creates a new filter object. Cities searches as you type. Open the right-aligned category menu and choose People registered as residents to try a longer label; it uses the same People fields and data with separate saved values and results. Switching categories and Close preserve each category\'s input and results; Clear resets only the selected category. Small, Default and Large resize the controls without resetting them.',
      },
    },
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { OptionContent } from '../../misc/option-content/option-content';
import Separator from '../../misc/separator/separator';
import { SearchAutocomplete, SearchAutocompleteOption } from './components/autocomplete/autocomplete';
import { Search, SearchProps } from './search';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4013b4-search" target="_BLANK">Zeroheight ↗</a>
 *
 * `Search` is the base search input. It has one compound variant, `Search.Autocomplete` - an accessible combobox for typeahead / suggestions (its
 * props are documented below as a subcomponent, and the **Autocomplete: …** stories demonstrate it).
 *
 * Not sure which pattern to reach for? See the **Choosing a pattern** doc for a decision guide between plain `Search`, `Search.Autocomplete`, and `Search` +
 * `Dropdown` (rich results with actions).
 */

const meta: Meta<SearchProps> = {
  component: Search,
  subcomponents: { 'Search.Autocomplete': SearchAutocomplete },
  title: 'TEDI-Ready/Components/Form/Search',
  parameters: {
    a11y: {
      test: 'todo',
    },
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<SearchProps>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];
const sizeArray: SearchProps['size'][] = ['small', 'default', 'large'];

interface TemplateStateProps extends SearchProps {
  array: typeof stateArray;
}

interface TemplateMultipleProps<Type = SearchProps['size']> extends SearchProps {
  array: Type[];
  property: keyof SearchProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, id = 'search', ...textFieldProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => {
        const baseId = `${id}-${property}-${value}`;

        return (
          <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col width={12} sm={2}>
              <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
            </Col>
            <Col width={12} sm={10}>
              <VerticalSpacing>
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-plain`}
                  ariaLabel={`Otsing – ${value} – tavaline`}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-icon`}
                  ariaLabel={`Otsing – ${value} – ikooninupuga`}
                  button={{ icon: 'search', size: value, 'aria-label': 'Otsi' }}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-button`}
                  ariaLabel={`Otsing – ${value} – nupuga`}
                  button={{ iconLeft: 'search', children: 'Otsi', size: value }}
                />
              </VerticalSpacing>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, id = 'search', ...textFieldProps } = args;

  return (
    <VerticalSpacing>
      {array.map((state, index) => {
        const stateId = `${id}-${state.toLowerCase()}`;

        return (
          <Row key={index}>
            <Col lg={2} xs={12} className="flex align-items-center gap-3">
              <Text modifiers="bold">{state}</Text>
            </Col>
            <Col>
              <Search
                {...textFieldProps}
                id={stateId}
                disabled={state === 'Disabled'}
                ariaLabel={`Otsing – ${state}`}
              />
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col lg={2} xs={12} className="flex align-items-center gap-3">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col>
          <Search
            {...textFieldProps}
            id={`${id}-success`}
            ariaLabel="Otsing – Success"
            helper={{ text: 'Tagasiside tekst', type: 'valid' }}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={2} xs={12} className="flex align-items-center gap-3">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col>
          <Search
            {...textFieldProps}
            id={`${id}-error`}
            ariaLabel="Otsing – Error"
            helper={{ text: 'Tagasiside tekst', type: 'error' }}
          />
        </Col>
      </Row>
    </VerticalSpacing>
  );
};

export const Default: Story = {
  args: {
    id: 'search-default',
    label: 'Otsing',
    placeholder: 'Otsi nime või märksõna järgi',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    id: 'search-sizes',
    label: 'Otsing',
    property: 'size',
    array: sizeArray,
  },
  parameters: { a11y: { test: 'error' } },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Otsing',
    id: 'search-states',
  },
  parameters: {
    a11y: { test: 'error' },
    pseudo: {
      hover: '#search-states-hover',
      focus: '#search-states-focus',
      active: '#search-states-active',
    },
  },
};

export const Placeholder: Story = {
  args: {
    id: 'search-placeholder',
    label: 'Otsing',
    placeholder: 'Trüki midagi…',
  },
};

/**
 * With `isClearable`, a clear (×) button appears once the field has a value and empties it on click.
 * Uses `defaultValue` (uncontrolled), so the clear button works on its own.
 */
export const Clearable: Story = {
  args: {
    id: 'search-clearable',
    label: 'Otsing',
    isClearable: true,
    defaultValue: 'Lorem ipsum',
  },
};

/**
 * Clearable field paired with a search button — the clear (×) empties the field; the button runs the search.
 */
export const ClearableWithButton: Story = {
  name: 'Clearable with button',
  args: {
    id: 'search-clearable-button',
    label: 'Otsing',
    isClearable: true,
    defaultValue: 'Lorem ipsum',
    button: { iconLeft: 'search', children: 'Otsi' },
  },
};

export const WithHint: Story = {
  args: {
    id: 'search-with-hint',
    label: 'Otsing',
    helper: { text: 'Vihjetekst' },
  },
};

/**
 * A national-registry person lookup: a matched result (`OptionContent` with a name +
 * code) plus fallback actions and a hint. The result panel is rendered as an inline
 * region **below** the field — not a popup — on purpose.
 *
 * **Why not a `Dropdown` here?** A floating menu is anchored by `aria-haspopup` /
 * `aria-expanded` on its trigger, but those disclosure attributes are only valid on
 * interactive roles (button, combobox…) — never on a search field or a wrapper
 * `<div>`. So anchoring a menu `Dropdown` to a `Search` yields an invalid-ARIA
 * trigger (`aria-expanded` not allowed). And a `combobox` popup may only be a
 * `listbox`, which can't contain buttons. Rendering the result and its actions inline
 * sidesteps both problems: every control — the result and both buttons — is a normal
 * `Tab` stop, fully keyboard-accessible, with no disclosure ARIA to get wrong. Use
 * `Search.Autocomplete` when the popup is a pure list of options.
 */
export const WithResultAndActions: Story = {
  name: 'With result and actions',
  parameters: { a11y: { test: 'error' } },
  render: function WithResultAndActionsExample() {
    const [value, setValue] = useState('4954080254');
    const hasQuery = value.trim().length > 0;

    return (
      <VerticalSpacing size={0.5}>
        <Search id="search-result-actions" label="Otsi" value={value} onChange={setValue} />

        {hasQuery && (
          <Card>
            <Card.Content>
              <VerticalSpacing size={0.5}>
                <Button visualType="link" onClick={() => setValue('Laura Kassisaba')}>
                  <OptionContent>
                    <OptionContent.Label>
                      <Text element="span" modifiers="bold">
                        Laura Kassisaba
                      </Text>
                      <Separator
                        axis="vertical"
                        color="secondary"
                        display="inline"
                        dotSize="small"
                        element="span"
                        spacing={0.5}
                        variant="dot-only"
                      />
                      49504080254
                    </OptionContent.Label>
                  </OptionContent>
                </Button>

                <Separator color="secondary" />

                <Row gutter={2} justifyContent="center">
                  <Col width="auto">
                    <Button visualType="secondary" size="small" onClick={() => setValue('')}>
                      Isik teadmata
                    </Button>
                  </Col>
                  <Col width="auto">
                    <Button visualType="secondary" size="small" onClick={() => setValue('')}>
                      Puudub Eesti isikukood
                    </Button>
                  </Col>
                </Row>

                <Text color="tertiary" modifiers={['small', 'center']} element="p">
                  Rahvastikuregistri andmete päringuks sisesta isikukood täismahus
                </Text>
              </VerticalSpacing>
            </Card.Content>
          </Card>
        )}
      </VerticalSpacing>
    );
  },
};

export const AccessibilityFocused: Story = {
  name: 'Accessibility: No Visible Label',
  args: {
    id: 'search-accessible',
    placeholder: 'Otsi tooteid või teenuseid...',
    ariaLabel: 'Otsi tooteid või teenuseid',
  },
  parameters: {
    docs: {
      description: {
        story: `
Always prefer a native \`<label>\` element for form controls.
If the label must not be visible in the UI, hide it visually using an \`sr-only\` (or equivalent) class rather than removing it. This preserves correct semantics and provides the most reliable experience for screen reader users.
Use \`ariaLabel\` only as a fallback when a real \`<label>\` cannot be rendered. This follows WCAG 2.1 and EN 301 549 9.2.5.3.
          `,
      },
    },
  },
};

const PEOPLE: SearchAutocompleteOption[] = [
  { value: 'mari', label: 'Mari Maasikas', description: 'Tootejuht' },
  { value: 'marelle', label: 'Marelle Mets', description: 'Disainer' },
  { value: 'marjanne', label: 'Marjanne Meri', description: 'Arendaja' },
  { value: 'mart', label: 'Mart Mesi', description: 'Analüütik' },
  { value: 'martin', label: 'Martin Saar', description: 'Arendaja' },
  { value: 'kalle', label: 'Kalle Kask', description: 'Testija' },
  { value: 'kati', label: 'Kati Kuusk', description: 'Tootejuht' },
  { value: 'tonu', label: 'Tõnu Tamm', description: 'Disainer' },
  { value: 'liisa', label: 'Liisa Lepp', description: 'Arendaja' },
  { value: 'jaan', label: 'Jaan Järv', description: 'Analüütik' },
];

const filterPeople = (query: string) =>
  PEOPLE.filter((person) => (person.label as string).toLowerCase().includes(query.trim().toLowerCase()));

const Highlight = ({ text, query }: { text: string; query: string }): JSX.Element => {
  const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <Text element="span" modifiers="bold">
        {text.slice(index, index + query.length)}
      </Text>
      {text.slice(index + query.length)}
    </>
  );
};

/**
 * `Search.Autocomplete` - client-side typeahead. Options are filtered synchronously
 * as the user types; focus stays in the input and the arrow keys move through the
 * listbox.
 */
export const Autocomplete: Story = {
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteExample() {
    const [value, setValue] = useState('');
    const options = value.trim() ? filterPeople(value) : [];

    return (
      <Search.Autocomplete
        id="search-autocomplete-default"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onQueryChange={setValue}
        options={options}
        onSelect={(option) => setValue(option.label as string)}
      />
    );
  },
};

/**
 * Custom option rendering via `renderOption` - here the matched substring is bolded.
 */
export const AutocompleteHighlighting: Story = {
  name: 'Autocomplete: highlighting',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteHighlightExample() {
    const [value, setValue] = useState('');
    const options = value.trim() ? filterPeople(value) : [];

    return (
      <Search.Autocomplete
        id="search-autocomplete-highlight"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onQueryChange={setValue}
        options={options}
        onSelect={(option) => setValue(option.label as string)}
        renderOption={(option, { query }) => (
          <OptionContent>
            <OptionContent.Label>
              <Highlight text={option.label as string} query={query} />
            </OptionContent.Label>
          </OptionContent>
        )}
      />
    );
  },
};

/**
 * Asynchronous suggestions - typing debounces a request that shows the loading row,
 * then the matched results (or the no-results row). Mirrors a server-backed registry
 * lookup.
 */
export const AutocompleteAsync: Story = {
  name: 'Autocomplete: async',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteAsyncExample() {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<SearchAutocompleteOption[]>([]);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleQueryChange = (next: string) => {
      setValue(next);
      clearTimeout(timer.current);

      if (!next.trim()) {
        setLoading(false);
        setOptions([]);
        return;
      }

      setLoading(true);
      timer.current = setTimeout(() => {
        setOptions(filterPeople(next));
        setLoading(false);
      }, 600);
    };

    return (
      <Search.Autocomplete
        id="search-autocomplete-async"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onQueryChange={handleQueryChange}
        options={options}
        loading={loading}
        onSelect={(option) => {
          clearTimeout(timer.current);
          setLoading(false);
          setValue(option.label as string);
        }}
      />
    );
  },
};

/**
 * Disabled options are shown but greyed out and skipped by keyboard navigation and selection.
 */
export const AutocompleteDisabledOptions: Story = {
  name: 'Autocomplete: disabled options',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteDisabledExample() {
    const [value, setValue] = useState('');
    const options = value.trim()
      ? filterPeople(value).map((option, index) => (index % 3 === 0 ? { ...option, disabled: true } : option))
      : [];

    return (
      <VerticalSpacing size={0.5}>
        <Search.Autocomplete
          id="search-autocomplete-disabled"
          label="Otsi"
          placeholder="Hakka nime trükkima…"
          value={value}
          onQueryChange={setValue}
          options={options}
          onSelect={(option) => setValue(option.label as string)}
        />
        <Text color="tertiary" modifiers="small">
          Iga kolmas vaste on keelatud.
        </Text>
      </VerticalSpacing>
    );
  },
};

/**
 * Free-text submit — pressing Enter with no active option fires `onSearch` instead of `onSelect`, so the field doubles as a plain search box.
 */
export const AutocompleteFreeText: Story = {
  name: 'Autocomplete: free-text search',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteFreeTextExample() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState<string>();
    const options = value.trim() ? filterPeople(value) : [];

    return (
      <VerticalSpacing size={0.5}>
        <Search.Autocomplete
          id="search-autocomplete-free-text"
          label="Otsi"
          placeholder="Otsi ja vajuta Enter…"
          value={value}
          onQueryChange={setValue}
          options={options}
          onSelect={(option) => setValue(option.label as string)}
          onSearch={setSubmitted}
        />
        {submitted !== undefined && (
          <Text color="tertiary" modifiers="small">
            Otsisid: „{submitted}”
          </Text>
        )}
      </VerticalSpacing>
    );
  },
};

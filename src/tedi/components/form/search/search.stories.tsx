import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { userEvent, within } from 'storybook/test';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { OptionContent } from '../../misc/option-content/option-content';
import Separator from '../../misc/separator/separator';
import { Search, SearchProps, SearchSuggestion } from './search';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4013b4-search" target="_BLANK">Zeroheight ↗</a>
 *
 * `Search` is the search input. Pass a `suggestions` array to turn it into an accessible combobox for
 * typeahead / suggestions (the **Autocomplete: …** stories demonstrate it); leave `suggestions` unset for a
 * plain search field.
 *
 * Not sure which pattern to reach for? See the
 * <a href="?path=/docs/tedi-ready-components-form-search--documentation">Choosing a pattern</a> doc for a decision
 * guide between plain `Search`, `Search` with `suggestions` (autocomplete), and `Search` + an inline region
 * (rich results with actions).
 */

const meta: Meta<SearchProps> = {
  component: Search,
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
                  ariaLabel={`Search – ${value} – plain`}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-icon`}
                  ariaLabel={`Search – ${value} – icon button`}
                  button={{ icon: 'search', size: value, 'aria-label': 'Otsi' }}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-button`}
                  ariaLabel={`Search – ${value} – button`}
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
                ariaLabel={`Search – ${state}`}
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
            ariaLabel="Search – Success"
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
            ariaLabel="Search – Error"
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
 * A single matched result with fallback actions, shown **live**: the field starts empty and the
 * result panel appears below it as you type (the `play` function types to reveal it). The panel is
 * an inline region **below** the field — not a popup — on purpose.
 *
 * **Why not a `Dropdown` or the `suggestions` combobox here?** A floating menu is anchored by
 * `aria-haspopup` / `aria-expanded` on its trigger, but those disclosure attributes are only
 * valid on interactive roles (button, combobox…) — never on a search field or a wrapper
 * `<div>`. And a `combobox` popup may only contain a `listbox`, which can't hold buttons.
 * Rendering the result and its actions inline sidesteps both problems: every control — the
 * result and both buttons — is a normal `Tab` stop, fully keyboard-accessible, with no
 * disclosure ARIA to get wrong. When the panel is a pure list of options use the `suggestions`
 * combobox, or its `footer` slot (see **Autocomplete: with footer actions**) when those options
 * come with fallback actions.
 */
export const WithResultAndActions: Story = {
  name: 'With result and actions',
  parameters: { a11y: { test: 'error' } },
  play: async ({ canvasElement }) => {
    // Drive the live example: type a code so the result panel is revealed, which is
    // also the state the a11y (axe) check then runs against.
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('searchbox'), '49504080254');
    await canvas.findByText('Laura Kassisaba');
  },
  render: function WithResultAndActionsExample() {
    const [value, setValue] = useState('');
    const hasQuery = value.trim().length > 0;

    return (
      <VerticalSpacing size={0.5}>
        <Search
          id="search-result-actions"
          label="Otsi"
          placeholder="Sisesta isikukood…"
          value={value}
          onChange={setValue}
        />

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

const PEOPLE: SearchSuggestion[] = [
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

/**
 * Pass a `suggestions` array to turn `Search` into an accessible combobox - client-side
 * typeahead. You own the data: filter / fetch in `onChange` and hand back what should be
 * shown. Focus stays in the input, the arrow keys move through the listbox, and the matched
 * substring of each row is bolded automatically.
 */
export const Autocomplete: Story = {
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteExample() {
    const [value, setValue] = useState('');
    const suggestions = value.trim() ? filterPeople(value) : [];

    return (
      <Search
        id="search-autocomplete-default"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
      />
    );
  },
};

/**
 * Custom row markup via `renderSuggestionContent` - full control over each suggestion (here the name is
 * bolded and the role shown inline).
 */
export const AutocompleteCustomRow: Story = {
  name: 'Autocomplete: custom row',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteCustomRowExample() {
    const [value, setValue] = useState('');
    const suggestions = value.trim() ? filterPeople(value) : [];

    return (
      <Search
        id="search-autocomplete-custom-row"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
        renderSuggestionContent={(suggestion) => (
          <OptionContent>
            <OptionContent.Label>
              <Text element="span" modifiers="bold">
                {suggestion.label}
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
              {suggestion.description}
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
    const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleChange = (next: string) => {
      setValue(next);
      clearTimeout(timer.current);

      if (!next.trim()) {
        setLoading(false);
        setSuggestions([]);
        return;
      }

      setLoading(true);
      timer.current = setTimeout(() => {
        setSuggestions(filterPeople(next));
        setLoading(false);
      }, 600);
    };

    return (
      <Search
        id="search-autocomplete-async"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onChange={handleChange}
        suggestions={suggestions}
        loading={loading}
        onSuggestionSelect={(suggestion) => {
          clearTimeout(timer.current);
          setLoading(false);
          setValue(suggestion.label as string);
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
    const suggestions = value.trim()
      ? filterPeople(value).map((suggestion, index) =>
          index % 3 === 0 ? { ...suggestion, disabled: true } : suggestion
        )
      : [];

    return (
      <Search
        id="search-autocomplete-disabled"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
        helper={{ text: 'Iga kolmas vaste on keelatud.' }}
      />
    );
  },
};

/**
 * Free-text submit — pressing Enter with no active suggestion fires `onSearch` instead of
 * `onSuggestionSelect`, so the field doubles as a plain search box.
 */
export const AutocompleteFreeText: Story = {
  name: 'Autocomplete: free-text search',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteFreeTextExample() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState<string>();
    const suggestions = value.trim() ? filterPeople(value) : [];

    return (
      <VerticalSpacing size={0.5}>
        <Search
          id="search-autocomplete-free-text"
          label="Otsi"
          placeholder="Otsi ja vajuta Enter…"
          value={value}
          onChange={setValue}
          suggestions={suggestions}
          onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
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

/**
 * The `footer` slot pins fallback actions below the suggestions — shown whenever the popup is
 * open, including the no-results state (a national-registry lookup is the canonical case).
 * `Tab` from the field moves focus into the footer buttons; `Escape` returns to the field.
 */
export const AutocompleteWithFooter: Story = {
  name: 'Autocomplete: with footer actions',
  parameters: { a11y: { test: 'error' } },
  render: function AutocompleteWithFooterExample() {
    const [value, setValue] = useState('');
    const suggestions = value.trim() ? filterPeople(value) : [];

    return (
      <Search
        id="search-autocomplete-footer"
        label="Otsi"
        placeholder="Hakka nime trükkima…"
        value={value}
        onChange={setValue}
        suggestions={suggestions}
        onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
        footer={
          <>
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
          </>
        }
      />
    );
  },
};

/**
 * With `hideOnScroll`, scrolling the page (or a scrollable ancestor) closes the popup —
 * scrolling the suggestion list itself keeps it open. Type to open the list, then scroll the container.
 */
export const AutocompleteHideOnScroll: Story = {
  name: 'Autocomplete: hide on scroll',
  render: function AutocompleteHideOnScrollExample() {
    const [value, setValue] = useState('');
    const suggestions = value.trim() ? filterPeople(value) : [];

    return (
      <div
        style={{
          maxHeight: '16rem',
          overflowY: 'auto',
          padding: '1rem',
          border: '1px solid var(--card-border-primary)',
          borderRadius: 'var(--form-field-radius)',
        }}
      >
        <VerticalSpacing size={1}>
          <Search
            id="search-autocomplete-hide-on-scroll"
            label="Otsi"
            placeholder="Hakka nime trükkima…"
            value={value}
            onChange={setValue}
            suggestions={suggestions}
            onSuggestionSelect={(suggestion) => setValue(suggestion.label as string)}
            hideOnScroll
          />
          <div style={{ height: '24rem' }} aria-hidden="true" />
        </VerticalSpacing>
      </div>
    );
  },
};

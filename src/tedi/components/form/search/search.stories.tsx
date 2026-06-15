import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Spinner } from '../../loaders/spinner/spinner';
import Separator from '../../misc/separator/separator';
import { Dropdown } from '../../overlays/dropdown/dropdown';
import { DropdownContext, DropdownContextValue } from '../../overlays/dropdown/dropdown-context';
import { DropdownItem } from '../../overlays/dropdown/dropdown-item/dropdown-item';
import { DropdownItemValue } from '../../overlays/dropdown/dropdown-item-value/dropdown-item-value';
import { Search, SearchProps } from './search';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4013b4-search" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<SearchProps> = {
  component: Search,
  title: 'TEDI-Ready/Components/Form/Search',
  parameters: {
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
            <Col width={2}>
              <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
            </Col>
            <Col>
              <VerticalSpacing>
                <Search {...textFieldProps} {...{ [property]: value }} id={`${baseId}-plain`} />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-icon`}
                  button={{ icon: 'search', size: value, 'aria-label': 'Search' }}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-button`}
                  button={{ iconLeft: 'search', children: 'Search', size: value }}
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
    <div className="state-example">
      {array.map((state, index) => {
        const stateId = `${id}-${state.toLowerCase()}`;

        return (
          <Row key={index} className="padding-14-16">
            <Col lg={2} md={12} className="display-flex align-items-center">
              <Text modifiers="bold">{state}</Text>
            </Col>
            <Col lg={10} md={12} className="display-flex align-items-center">
              <Search {...textFieldProps} id={stateId} disabled={state === 'Disabled'} />
            </Col>
          </Row>
        );
      })}

      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <Search {...textFieldProps} id={`${id}-success`} helper={{ text: 'Feedback text', type: 'valid' }} />
        </Col>
      </Row>

      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <Search {...textFieldProps} id={`${id}-error`} helper={{ text: 'Feedback text', type: 'error' }} />
        </Col>
      </Row>
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'search-default',
    label: 'Search',
    placeholder: 'Search by name or keyword',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    id: 'search-sizes',
    label: 'Search',
    property: 'size',
    array: sizeArray,
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Search',
    id: 'search-states',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const Placeholder: Story = {
  args: {
    id: 'search-placeholder',
    label: 'Search',
    placeholder: 'Type something...',
  },
};

export const Clearable: Story = {
  args: {
    id: 'search-clearable',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
  },
};

export const ClearableButton: Story = {
  args: {
    id: 'search-clearable-button',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
    button: { iconLeft: 'search', children: 'Search' },
  },
};

export const WithHint: Story = {
  args: {
    id: 'search-with-hint',
    label: 'Search',
    helper: { text: 'Hint text' },
  },
};

export const Estonian: Story = {
  args: {
    id: 'search-et',
    label: 'Otsing',
    placeholder: 'Otsi tooteid, artikleid või abiinfot...',
    ariaLabel: 'Otsi kogu saidilt',
    button: { iconLeft: 'search', children: 'Otsi' },
  },
};

/**
 * Typeahead — matches rendered in a real `Dropdown` anchored to the field, each
 * row a `DropdownItemValue`. Closed by default; opening is left to the dropdown's
 * own trigger / dismiss handlers (click the field to open, click away or Esc to
 * close). `Search` exposes an imperative ref, so it is wrapped in a `<div>` to
 * give `Dropdown.Trigger` a DOM element to anchor to.
 */
export const WithSuggestions: Story = {
  name: 'With suggestions',
  render: function WithSuggestionsExample() {
    const [value, setValue] = useState('Mar');
    const [open, setOpen] = useState(false);
    const names = ['Mari Maasikas', 'Marelle Mets', 'Marjanne Meri', 'Mart Mesi', 'Martin Saar'];
    const matches = names.filter((name) => name.toLowerCase().includes(value.toLowerCase()));

    return (
      <Dropdown open={open && matches.length > 0} onOpenChange={setOpen} width="trigger">
        <Dropdown.Trigger>
          <div>
            <Search id="search-suggestions" label="Otsi" value={value} onChange={setValue} />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {matches.map((name, i) => (
            <Dropdown.Item key={name} index={i} onClick={() => setValue(name)}>
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

/**
 * A single matched result (`DropdownItemValue` with a name + code) followed by
 * fallback actions and a hint — e.g. a national-registry person lookup. Closed
 * by default; click the field to open.
 */
export const WithResultAndActions: Story = {
  name: 'With result and actions',
  render: function WithResultAndActionsExample() {
    const [value, setValue] = useState('4954080254');
    const [open, setOpen] = useState(false);

    return (
      <Dropdown open={open} onOpenChange={setOpen} width="trigger">
        <Dropdown.Trigger>
          <div>
            <Search id="search-result-actions" label="Otsi" value={value} onChange={setValue} />
          </div>
        </Dropdown.Trigger>

        <Dropdown.Content>
          <Dropdown.Item index={0} closeOnSelect={false}>
            <DropdownItemValue>
              <DropdownItemValue.Label>
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
              </DropdownItemValue.Label>
            </DropdownItemValue>
          </Dropdown.Item>

          <Separator color="secondary" />

          <div style={{ padding: 'var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)' }}>
            <VerticalSpacing size={0.75}>
              <Row gutter={2} justifyContent="center">
                <Col width="auto">
                  <Button visualType="secondary" size="small">
                    Isik teadmata
                  </Button>
                </Col>
                <Col width="auto">
                  <Button visualType="secondary" size="small">
                    Puudub Eesti isikukood
                  </Button>
                </Col>
              </Row>
              <Text color="tertiary" modifiers={['small', 'center']} element="p">
                Rahvastikuregistri andmete päringuks sisesta isikukood täismahus
              </Text>
            </VerticalSpacing>
          </div>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};

// Live "suggest as you type" needs focus to stay in the input. The floating
// `Dropdown` moves focus into the list when it opens (it is a menu, not a
// combobox), which would interrupt typing — so these examples render results in
// an inline region. `DropdownItem` only needs a `DropdownContext`, supplied here
// without the floating overlay, so items keep their padding, hover and `divided`
// separators while focus stays in the field. The surface matches `.tedi-dropdown`.
const LiveResults = ({ children }: { children: React.ReactNode; divided?: boolean }): JSX.Element => (
  <DropdownContext.Provider
    value={
      {
        open: true,
        setOpen: () => undefined,
        refs: {},
        getReferenceProps: () => ({}),
        getFloatingProps: () => ({}),
        getItemProps: (props?: Record<string, unknown>) => props ?? {},
        listItemsRef: { current: [] },
        activeIndex: null,
        setActiveIndex: () => undefined,
        content: null,
        setContent: () => undefined,
        variant: 'default',
      } as unknown as DropdownContextValue
    }
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--dropdown-item-default-background)',
        border: '1px solid var(--card-border-primary)',
        borderRadius: 'var(--form-select-area-radius)',
        boxShadow: '0 1px 5px 0 var(--tedi-alpha-20)',
      }}
    >
      {children}
    </div>
  </DropdownContext.Provider>
);

const StatusRow = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <div
    style={{
      display: 'flex',
      gap: 'var(--dropdown-item-inner-spacing)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)',
    }}
  >
    {children}
  </div>
);

// Bolds the part of the suggestion that matches the current query.
const Highlight = ({ text, query }: { text: string; query: string }): JSX.Element => {
  const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  if (index === -1) {
    return <>{text}</>;
  }

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

const PEOPLE = [
  'Mari Maasikas',
  'Marelle Mets',
  'Marjanne Meri',
  'Mart Mesi',
  'Martin Saar',
  'Kalle Kask',
  'Kati Kuusk',
  'Tõnu Tamm',
  'Liisa Lepp',
  'Jaan Järv',
];

/**
 * Live typeahead — results filter as you type and the matched text is bolded.
 * The panel appears once the field is non-empty and shows a "no results" row
 * when nothing matches. Focus stays in the input (inline region, not the
 * floating menu), so typing is never interrupted.
 */
export const Typeahead: Story = {
  name: 'Typeahead (live filtering)',
  render: function TypeaheadExample() {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const query = value.trim();
    const matches = query ? PEOPLE.filter((name) => name.toLowerCase().includes(query.toLowerCase())) : [];

    const select = (name: string) => {
      setValue(name);
      setOpen(false);
    };

    return (
      <VerticalSpacing size={0.25}>
        <Search
          id="search-typeahead"
          label="Otsi"
          placeholder="Hakka nime trükkima…"
          value={value}
          onChange={(next) => {
            setValue(next);
            setOpen(true);
          }}
        />
        {open && query.length > 0 && (
          <LiveResults divided={matches.length > 0}>
            {matches.length > 0 ? (
              matches.map((name, i) => (
                <DropdownItem key={name} index={i} closeOnSelect={false} onClick={() => select(name)}>
                  <DropdownItemValue>
                    <DropdownItemValue.Label>
                      <Highlight text={name} query={query} />
                    </DropdownItemValue.Label>
                  </DropdownItemValue>
                </DropdownItem>
              ))
            ) : (
              <StatusRow>
                <Text color="tertiary">Tulemusi ei leitud</Text>
              </StatusRow>
            )}
          </LiveResults>
        )}
      </VerticalSpacing>
    );
  },
};

/**
 * Asynchronous suggestions — typing debounces a fake request that shows a spinner
 * while "loading", then the matched results (or an empty state).
 */
export const AsyncSuggestions: Story = {
  name: 'Async suggestions (loading)',
  render: function AsyncSuggestionsExample() {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const timer = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleChange = (next: string) => {
      setValue(next);
      setOpen(true);
      clearTimeout(timer.current);

      if (!next.trim()) {
        setLoading(false);
        setResults([]);
        return;
      }

      setLoading(true);
      timer.current = setTimeout(() => {
        setResults(PEOPLE.filter((name) => name.toLowerCase().includes(next.trim().toLowerCase())));
        setLoading(false);
      }, 600);
    };

    const select = (name: string) => {
      clearTimeout(timer.current);
      setValue(name);
      setLoading(false);
      setOpen(false);
    };

    const query = value.trim();

    return (
      <VerticalSpacing size={0.25}>
        <Search
          id="search-async"
          label="Otsi"
          placeholder="Hakka nime trükkima…"
          value={value}
          onChange={handleChange}
        />
        {open && query.length > 0 && (
          <LiveResults divided={!loading && results.length > 0}>
            {loading ? (
              <StatusRow>
                <Spinner size={16} />
                <Text color="tertiary">Otsin…</Text>
              </StatusRow>
            ) : results.length > 0 ? (
              results.map((name, i) => (
                <DropdownItem key={name} index={i} closeOnSelect={false} onClick={() => select(name)}>
                  <DropdownItemValue>
                    <DropdownItemValue.Label>
                      <Highlight text={name} query={query} />
                    </DropdownItemValue.Label>
                  </DropdownItemValue>
                </DropdownItem>
              ))
            ) : (
              <StatusRow>
                <Text color="tertiary">Tulemusi ei leitud</Text>
              </StatusRow>
            )}
          </LiveResults>
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

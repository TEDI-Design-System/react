import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Alert from '../../notifications/alert/alert';
import FeedbackText from '../feedback-text/feedback-text';
import Radio, { RadioGroup, RadioProps } from '.';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4598-78103&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/93e423-radio" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof Radio> = {
  component: Radio,
  subcomponents: { 'Radio.Group': RadioGroup },
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/Radio',
  argTypes: {
    tooltip: { control: false },
  },
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const Template: StoryFn<RadioProps> = (args) => <Radio {...args} label="Tekst" value="default" />;
const sizesArray: Array<'default' | 'large'> = ['default', 'large'];

const TemplateSizes: StoryFn<RadioProps> = (args) => {
  return (
    <Row>
      <Col lg={6} md={12} className="example-list">
        {sizesArray.map((size, key) => (
          <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col lg={10} md={6} xs={8} className="flex align-items-center">
              <VerticalSpacing>
                <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
                {size === 'large' && (
                  <Alert type="warning">
                    <Text>Applied automatically on mobile screen sizes. </Text>
                    <Text modifiers="bold">Otherwise, prefer using default size.</Text>
                  </Alert>
                )}
              </VerticalSpacing>
            </Col>
            <Col lg={2} md={6} xs={4}>
              <Radio
                {...args}
                size={size}
                id={`radio-size-${size}`}
                label={`${size.charAt(0).toUpperCase() + size.slice(1)} size`}
                hideLabel
              />
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    id: 'default-radio',
    name: 'default-radio',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
};

const stateRows: { label: string; id: string; props?: Partial<RadioProps> }[] = [
  { label: 'Default', id: 'default' },
  { label: 'Hover', id: 'hover', props: { hover: true } },
  { label: 'Active', id: 'active' },
  { label: 'Disabled', id: 'disabled', props: { disabled: true } },
  { label: 'Focus', id: 'focus' },
  { label: 'Error', id: 'invalid', props: { invalid: true, helper: { text: 'Kohustuslik väli', type: 'error' } } },
  { label: 'Mandatory', id: 'required', props: { required: true } },
];

/**
 * Lays a state matrix out on a grid whose columns never wrap into the row labels.
 * Below `md` it restacks to fit a phone: `mobileLayout="rows"` puts each row label on its
 * own line above cells that share the width; `mobileLayout="columns"` splits the matrix into
 * one section per column, for matrices too wide to keep side by side.
 * `desktopGrid` sets a minimum column width, row height and gaps for the desktop layout.
 */
const StateMatrix = ({
  headers,
  rows,
  alignItems = 'start',
  mobileLayout = 'rows',
  desktopGrid,
}: {
  headers: React.ReactNode[];
  rows: { label: string; cells: React.ReactNode[] }[];
  alignItems?: React.CSSProperties['alignItems'];
  mobileLayout?: 'rows' | 'columns';
  desktopGrid?: { columnWidth: string; rowHeight: string; columnGap: string; rowGap: string };
}) => {
  const stacked = isBreakpointBelow(useBreakpoint(), 'md');
  const fixedGrid = stacked ? undefined : desktopGrid;
  const gridStyle = (gridTemplateColumns: string): React.CSSProperties => ({
    display: 'grid',
    gridTemplateColumns,
    gridAutoRows: fixedGrid ? `minmax(${fixedGrid.rowHeight}, auto)` : undefined,
    columnGap: fixedGrid?.columnGap ?? 'var(--layout-grid-gutters-24)',
    rowGap: fixedGrid?.rowGap ?? 'var(--layout-grid-gutters-16)',
    alignItems,
  });
  const labelTrack = fixedGrid ? `minmax(${fixedGrid.columnWidth}, max-content)` : 'max-content';
  const cellTrack = fixedGrid ? `minmax(${fixedGrid.columnWidth}, max-content)` : 'minmax(min-content, max-content)';

  if (stacked && mobileLayout === 'columns') {
    return (
      <VerticalSpacing size={2}>
        {headers.map((header, column) => (
          <VerticalSpacing key={column}>
            <Text modifiers="bold">{header}</Text>
            <div style={gridStyle('max-content minmax(0, 1fr)')}>
              {rows.map(({ label, cells }) => (
                <React.Fragment key={label}>
                  <Text modifiers="bold">{label}</Text>
                  <div>{cells[column]}</div>
                </React.Fragment>
              ))}
            </div>
          </VerticalSpacing>
        ))}
      </VerticalSpacing>
    );
  }

  return (
    <div
      style={gridStyle(
        stacked ? `repeat(${headers.length}, minmax(0, 1fr))` : `${labelTrack} repeat(${headers.length}, ${cellTrack})`
      )}
    >
      {!stacked && <span />}
      {headers.map((header, index) => (
        <Text key={index} modifiers="bold">
          {header}
        </Text>
      ))}
      {rows.map(({ label, cells }) => (
        <React.Fragment key={label}>
          <div style={stacked ? { gridColumn: '1 / -1', marginTop: 'var(--layout-grid-gutters-08)' } : undefined}>
            <Text modifiers="bold">{label}</Text>
          </div>
          {cells.map((cell, index) => (
            <div key={index}>{cell}</div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

/** Gives the States matrix more room between columns and rows on desktop. */
const STATES_DESKTOP_GRID = {
  columnWidth: '10.375rem',
  rowHeight: '2.5rem',
  columnGap: 'var(--layout-grid-gutters-16)',
  rowGap: 'var(--layout-grid-gutters-08)',
};

export const States: StoryFn = () => (
  <StateMatrix
    alignItems="center"
    desktopGrid={STATES_DESKTOP_GRID}
    headers={['Unselected', 'Selected']}
    rows={stateRows.map(({ label, id, props }) => ({
      label,
      cells: [false, true].map((selected) => {
        const radioId = `radio-${id}-${selected ? 'selected' : 'unselected'}`;
        return (
          <Radio
            key={radioId}
            id={radioId}
            label="Tekst"
            name={radioId}
            value="radio"
            defaultChecked={selected}
            {...props}
          />
        );
      }),
    }))}
  />
);

States.parameters = {
  pseudo: {
    active: ['#radio-active-unselected + *', '#radio-active-selected + *'],
    focusVisible: ['#radio-focus-unselected', '#radio-focus-selected'],
  },
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-radio',
    name: 'hidden-label-radio',
    hideLabel: true,
  },
};

export const WithHelper: Story = {
  render: Template,

  args: {
    id: 'extra-content-radio',
    name: 'extra-content-radio',
    helper: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
    },
  },
};

export const WithTooltip: Story = {
  render: (args) => (
    <Row>
      <Col lg={6} md={12}>
        <VerticalSpacing>
          <Radio
            {...args}
            id="radio-short-title-tooltip"
            label="Tekst"
            name="radio-short-title-tooltip"
            value="radio"
          />
          <Radio
            {...args}
            id="radio-short-title-helper-tooltip"
            label="Tekst"
            name="radio-short-title-helper-tooltip"
            value="radio"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
          <Radio
            {...args}
            id="radio-long-title-tooltip-helper"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
            name="radio-long-title-tooltip-helper"
            value="radio"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
        </VerticalSpacing>
      </Col>
    </Row>
  ),

  args: {
    name: 'tooltip-radio',
    tooltip: 'This is a tooltip',
  },
};

export const WithLongTitle: StoryFn = () => {
  return (
    <Row>
      <Col width={12} lg={6}>
        <Radio
          id="radio-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="radio-long-title"
          value="radio"
        />
      </Col>
    </Row>
  );
};

/** Compose radios inside `Radio.Group`, which owns the selection and shared props. */
export const Group: StoryObj = {
  render: () => {
    const [value, setValue] = useState('kartul');
    return (
      <Radio.Group
        label="Tooraine"
        value={value}
        onChange={setValue}
        helper={{ text: 'Tegemist on veidi veidra valikuga kuid vähemalt ühe baaselemendi peab valima' }}
      >
        <Radio value="kartul" label="Kartul" />
        <Radio value="kapsas" label="Kapsas" />
        <Radio value="peet" label="Peet" />
      </Radio.Group>
    );
  },
};

/**
 * In controlled mode the parent owns the selected value. Because it lives outside the radios, it
 * can be changed programmatically — the **Clear selection** button clears the selection, something a
 * user can't do to a radio and an uncontrolled radio can't offer. The current value is shown below.
 */
export const Controlled = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { value: 'email', label: 'E-post' },
    { value: 'sms', label: 'SMS' },
  ];

  return (
    <VerticalSpacing>
      {options.map((option) => (
        <Radio
          key={option.value}
          id={`controlled-${option.value}`}
          label={option.label}
          name="controlled-radio"
          value={option.value}
          checked={selected === option.value}
          onChange={(value) => setSelected(value)}
        />
      ))}
      <Text>Selected: {selected ?? '—'}</Text>
      <Button visualType="secondary" onClick={() => setSelected(null)} disabled={selected === null}>
        Clear selection
      </Button>
    </VerticalSpacing>
  );
};

/** `variant="card"` renders each radio as a card. `cardVariant` sets primary / secondary. */
export const Cards: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="kartul">
        <Radio value="kartul" label="Kartul" />
        <Radio value="peet" label="Peet" />
        <Radio value="kapsas" label="Kapsas" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="kartul">
        <Radio value="kartul" label="Kartul" />
        <Radio value="peet" label="Peet" />
        <Radio value="kapsas" label="Kapsas" />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

export const CardsWithDescription: StoryObj = {
  render: () => {
    const items = [
      {
        value: 'kartul',
        label: 'Kartul',
        description: 'Tärkliserikas mugulköögivili, mida kasutatakse laialt toiduks.',
      },
      {
        value: 'peet',
        label: 'Peet',
        description: 'Magusamaitseline juurvili, mida süüakse nii toorelt kui ka kuumtöödeldult.',
      },
      {
        value: 'kapsas',
        label: 'Kapsas',
        description: 'Lehtköögivili, mille tihedaid lehti kasutatakse mitmesugustes roogades.',
      },
    ];

    const cards = () => (
      <Row className="w-100" gutter={2}>
        {items.map((item) => (
          <Col key={item.value} xs={12} md={4}>
            <Radio value={item.value} label={item.label} description={item.description} className="w-100" />
          </Col>
        ))}
      </Row>
    );
    return (
      <VerticalSpacing size={1.5}>
        <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="kartul">
          {cards()}
        </Radio.Group>
        <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="kartul">
          {cards()}
        </Radio.Group>
      </VerticalSpacing>
    );
  },
};

/**
 * Add a leading `icon` (Material icon name), optionally with a `description`.
 */
export const CardsWithIcons: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" defaultValue="tram">
        <Radio value="tram" label="Trammiga" icon="directions_subway" />
        <Radio value="walk" label="Jalgsi" icon="directions_walk" />
        <Radio value="car" label="Autoga" icon="directions_car" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue="tram">
        <Radio
          value="tram"
          label="Trammiga"
          description="Soovitatud variant, vähendab ummikuid"
          icon="directions_subway"
        />
        <Radio value="walk" label="Jalgsi" description="Soovitatud variant, vähendab ummikuid" icon="directions_walk" />
        <Radio
          value="car"
          label="Autoga"
          description="Kui soovid kiiremini kohale jõuda, tekitab ummikuid"
          icon="directions_car"
        />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

/** `layout="segmented"` joins the cards into one button-group surface (Figma "Grouped"). */
export const CardsSegmented: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Radio.Group label="Primary" variant="card" cardVariant="primary" layout="segmented" defaultValue="peet">
        <Radio value="kartul" label="Kartul" />
        <Radio value="kapsas" label="Kapsas" />
        <Radio value="peet" label="Peet" />
        <Radio value="kaalikas" label="Kaalikas" />
      </Radio.Group>
      <Radio.Group label="Secondary" variant="card" cardVariant="secondary" layout="segmented" defaultValue="kapsas">
        <Radio value="kartul" label="Kartul" />
        <Radio value="kapsas" label="Kapsas" />
        <Radio value="peet" label="Peet" />
        <Radio value="kaalikas" label="Kaalikas" />
      </Radio.Group>
    </VerticalSpacing>
  ),
};

/**
 * Group props are breakpoint-aware (mobile-first). Here it's cards by default and
 * regular radios from `md` up — resize the canvas to see it switch.
 */
export const ResponsiveVariant: StoryObj = {
  render: () => (
    <Radio.Group
      label="Tooraine"
      defaultValue="kartul"
      variant="card"
      cardVariant="secondary"
      md={{ variant: 'default', direction: 'column' }}
    >
      <Radio value="kartul" label="Kartul" />
      <Radio value="peet" label="Peet" />
      <Radio value="kapsas" label="Kapsas" />
    </Radio.Group>
  ),
};

const CARD_STATES: Array<{ state: string; props?: Partial<RadioProps> }> = [
  { state: 'Default' },
  { state: 'Hover' },
  { state: 'Active' },
  { state: 'Focus' },
  { state: 'Disabled', props: { disabled: true } },
];

type CardColumn = 'unselected' | 'borderless' | 'selected' | 'grouped';

const CARD_COLUMNS: Record<'primary' | 'secondary', Array<{ column: CardColumn; title: string }>> = {
  primary: [
    { column: 'unselected', title: 'Unselected' },
    { column: 'borderless', title: 'Unselected borderless' },
    { column: 'selected', title: 'Selected' },
    { column: 'grouped', title: 'Grouped' },
  ],
  secondary: [
    { column: 'unselected', title: 'Unselected' },
    { column: 'selected', title: 'Selected' },
    { column: 'grouped', title: 'Grouped' },
  ],
};

const cardStateId = (cardVariant: string, column: CardColumn, state: string) =>
  `radio-card-${cardVariant}-${column}-${state.toLowerCase()}`;

const cardStatesPseudo = (cardVariant: 'primary' | 'secondary') => {
  const ids = (state: string) =>
    CARD_COLUMNS[cardVariant].map(({ column }) => `#${cardStateId(cardVariant, column, state)}`);
  return { hover: ids('Hover'), active: ids('Active'), focusVisible: ids('Focus') };
};

/**
 * Places the error message under a card group. The cards keep their natural width, while the
 * message may widen the column to stay on one line, and wraps only when the matrix runs out of room.
 */
const CardErrorCell = ({ message, children }: { message: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--layout-grid-gutters-04)' }}>
    <div style={{ width: 'max-content' }}>{children}</div>
    <FeedbackText text={message} type="error" />
  </div>
);

const renderCardCell = (
  cardVariant: 'primary' | 'secondary',
  column: CardColumn,
  state: string,
  props: Partial<RadioProps> = {}
) => {
  const id = cardStateId(cardVariant, column, state);
  const isError = state === 'Error';
  const selected = column === 'selected' || column === 'grouped';
  const bordered = column === 'unselected';

  if (column === 'grouped' || isError) {
    const errorText = selected ? 'Valitud väärtus ei sobi ajavahemikuga' : 'Kohustuslik on valida vähemalt 1 väärtus';
    const group = (
      <Radio.Group
        label={`${column} ${state}`}
        hideLabel
        name={id}
        variant="card"
        cardVariant={cardVariant}
        layout={column === 'grouped' ? 'segmented' : 'separated'}
        direction="row"
        bordered={bordered}
        defaultValue={selected ? 'a' : null}
        invalid={isError}
        disabled={props.disabled}
      >
        <Radio id={isError ? undefined : id} value="a" label="Tekst" />
        <Radio value="b" label="Tekst" />
      </Radio.Group>
    );
    return isError ? <CardErrorCell message={errorText}>{group}</CardErrorCell> : group;
  }

  return (
    <Radio
      variant="card"
      cardVariant={cardVariant}
      bordered={bordered}
      id={id}
      name={id}
      value="radio"
      label="Tekst"
      defaultChecked={selected}
      {...props}
    />
  );
};

const renderCardStates = (cardVariant: 'primary' | 'secondary') => (
  <StateMatrix
    alignItems="center"
    mobileLayout="columns"
    headers={CARD_COLUMNS[cardVariant].map(({ title }) => title)}
    rows={[...CARD_STATES, { state: 'Error', props: undefined }].map(({ state, props }) => ({
      label: state,
      cells: CARD_COLUMNS[cardVariant].map(({ column }) => renderCardCell(cardVariant, column, state, props)),
    }))}
  />
);

export const CardStatesPrimary: StoryObj = {
  parameters: { pseudo: cardStatesPseudo('primary') },
  render: () => renderCardStates('primary'),
};

export const CardStatesSecondary: StoryObj = {
  parameters: { pseudo: cardStatesPseudo('secondary') },
  render: () => renderCardStates('secondary'),
};

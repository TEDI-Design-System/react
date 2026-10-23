import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Alert from '../../notifications/alert/alert';
import FeedbackText from '../feedback-text/feedback-text';
import Checkbox, { CheckboxGroup, CheckboxProps } from '.';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4228-72934&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/796203-checkbox" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  subcomponents: { 'Checkbox.Group': CheckboxGroup },
  title: 'TEDI-Ready/Components/Form/ChoiceGroup/Checkbox',
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
type Story = StoryObj<typeof Checkbox>;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} label="Tekst" value="default" />;
const sizesArray: Array<'default' | 'large'> = ['default', 'large'];

const TemplateSizes: StoryFn<CheckboxProps> = (args) => {
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
              <Checkbox
                {...args}
                size={size}
                id={`checkbox-size-${size}`}
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
    id: 'default-check',
    name: 'default-check',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
};

const stateRows: { label: string; id: string; props?: Partial<CheckboxProps>; unselected?: boolean }[] = [
  { label: 'Default', id: 'default' },
  { label: 'Hover', id: 'hover', props: { hover: true } },
  { label: 'Active', id: 'active' },
  { label: 'Focus', id: 'focus' },
  { label: 'Disabled', id: 'disabled', props: { disabled: true } },
  { label: 'Error', id: 'invalid', props: { invalid: true, helper: { text: 'Kohustuslik väli', type: 'error' } } },
  { label: 'Mandatory', id: 'required', props: { required: true } },
  { label: 'Indeterminate', id: 'indeterminate', props: { indeterminate: true }, unselected: false },
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
    rows={stateRows.map(({ label, id, props, unselected = true }) => ({
      label,
      cells: [
        unselected ? (
          <Checkbox
            id={`check-${id}-unselected`}
            label="Tekst"
            name={`check-${id}-unselected`}
            value="check"
            {...props}
          />
        ) : null,
        <Checkbox
          key="selected"
          id={`check-${id}-selected`}
          label="Tekst"
          name={`check-${id}-selected`}
          value="check"
          defaultChecked
          {...props}
        />,
      ],
    }))}
  />
);

States.parameters = {
  pseudo: {
    active: ['#check-active-unselected + *', '#check-active-selected + *'],
    focusVisible: ['#check-focus-unselected', '#check-focus-selected'],
  },
};

export const HiddenLabel: Story = {
  render: Template,

  args: {
    id: 'hidden-label-check',
    name: 'hidden-label-check',
    hideLabel: true,
  },
};

export const WithHelper: Story = {
  render: Template,

  args: {
    id: 'extra-content-check',
    name: 'extra-content-check',
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
          <Checkbox
            {...args}
            id="check-short-title-tooltip"
            label="Tekst"
            name="check-short-title-tooltip"
            value="check"
          />
          <Checkbox
            {...args}
            id="check-short-title-helper-tooltip"
            label="Tekst"
            name="check-short-title-helper-tooltip"
            value="check"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
          <Checkbox
            {...args}
            id="check-long-title-tooltip-helper"
            label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
            name="check-long-title-tooltip-helper"
            value="check"
            helper={{
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas.',
            }}
          />
        </VerticalSpacing>
      </Col>
    </Row>
  ),

  args: {
    name: 'tooltip-check',
    tooltip: 'This is a tooltip',
  },
};

export const WithLongTitle: StoryFn = () => {
  return (
    <Row>
      <Col lg={6} md={12}>
        <Checkbox
          id="check-long-title"
          label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc."
          name="check-long-title"
          value="check"
        />
      </Col>
    </Row>
  );
};

/** Compose checkboxes inside `Checkbox.Group`, which owns the selected values. */
export const Group: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>(['kartul']);
    return (
      <Checkbox.Group
        label="Tooraine"
        value={values}
        onChange={setValues}
        helper={{ text: 'Tegemist on veidi veidra valikuga kuid vähemalt ühe baaselemendi peab valima' }}
      >
        <Checkbox value="kartul" label="Kartul" />
        <Checkbox value="piim" label="Piim" />
        <Checkbox value="banaanid" label="Banaanid" />
      </Checkbox.Group>
    );
  },
};

/**
 * A `required` group means "at least one must be selected". It's conveyed via the
 * group's accessible name (legend), not native `required` on each box — that would
 * demand every box be ticked, and there's no `aria-required` for a checkbox group.
 */
export const GroupRequired: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <Checkbox.Group label="Tooraine" required value={values} onChange={setValues}>
        <Checkbox value="kartul" label="Kartul" />
        <Checkbox value="piim" label="Piim" />
        <Checkbox value="banaanid" label="Banaanid" />
      </Checkbox.Group>
    );
  },
};

/**
 * An `invalid` group marks the fieldset `aria-invalid` and paints every box in the
 * error state, but does not mark each box `aria-invalid` (no single box's value is
 * wrong). Pair it with an error `helper` so the reason is announced.
 */
export const GroupInvalid: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <Checkbox.Group
        label="Tooraine"
        invalid
        value={values}
        onChange={setValues}
        helper={{ text: 'Vali vähemalt üks', type: 'error' }}
      >
        <Checkbox value="kartul" label="Kartul" />
        <Checkbox value="piim" label="Piim" />
        <Checkbox value="banaanid" label="Banaanid" />
      </Checkbox.Group>
    );
  },
};

/**
 * `indeterminateCheck` adds a "select all" checkbox: checked when all children are
 * selected, indeterminate when some are, unchecked when none — toggling it selects
 * or clears them all.
 */
export const WithSelectAll: StoryObj = {
  render: () => {
    const [values, setValues] = useState<string[]>(['sms']);
    return (
      <Checkbox.Group label="Teavitused" indeterminateCheck value={values} onChange={setValues}>
        <Checkbox value="email" label="E-post" />
        <Checkbox value="sms" label="SMS" />
        <Checkbox value="push" label="Tõuketeavitus" />
      </Checkbox.Group>
    );
  },
};

/**
 * In controlled mode React owns the checked state. Because it lives outside the checkbox, other UI
 * can read and change it — the text below reflects the current value and the button toggles the box
 * from outside the control, which an uncontrolled checkbox can't expose.
 */
export const Controlled = () => {
  const [checked, setChecked] = React.useState<boolean>(true);

  return (
    <VerticalSpacing>
      <Checkbox
        id="controlled-check"
        label="Nõustun tingimustega"
        name="controlled-check"
        value="controlled"
        checked={checked}
        onChange={(value, checked) => setChecked(checked)}
      />
      <Text>Selected: {checked ? 'yes' : 'no'}</Text>
      <Button visualType="secondary" onClick={() => setChecked((prev) => !prev)}>
        Toggle from outside
      </Button>
    </VerticalSpacing>
  );
};

/** `variant="card"` renders each checkbox as a card. `cardVariant` sets primary / secondary. */
export const Cards: StoryObj = {
  render: () => (
    <VerticalSpacing size={1.5}>
      <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['a']}>
        <Checkbox value="a" label="Kartul" />
        <Checkbox value="b" label="Peet" />
        <Checkbox value="c" label="Kapsas" />
      </Checkbox.Group>
      <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['a']}>
        <Checkbox value="a" label="Kartul" />
        <Checkbox value="b" label="Peet" />
        <Checkbox value="c" label="Kapsas" />
      </Checkbox.Group>
    </VerticalSpacing>
  ),
};

export const CardsWithDescription: StoryObj = {
  render: () => {
    const items = [
      { value: 'a', label: 'Kartul', description: 'Tärkliserikas mugulköögivili, mida kasutatakse laialt toiduks.' },
      {
        value: 'b',
        label: 'Peet',
        description: 'Magusamaitseline juurvili, mida süüakse nii toorelt kui ka kuumtöödeldult.',
      },
      {
        value: 'c',
        label: 'Kapsas',
        description: 'Lehtköögivili, mille tihedaid lehti kasutatakse mitmesugustes roogades.',
      },
    ];

    const cards = () => (
      <Row className="w-100" gutter={2}>
        {items.map((item) => (
          <Col key={item.value} xs={12} md={4}>
            <Checkbox value={item.value} label={item.label} description={item.description} className="w-100" />
          </Col>
        ))}
      </Row>
    );
    return (
      <VerticalSpacing size={1.5}>
        <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['a']}>
          {cards()}
        </Checkbox.Group>
        <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['a']}>
          {cards()}
        </Checkbox.Group>
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
      <Checkbox.Group label="Primary" variant="card" cardVariant="primary" defaultValue={['tram']}>
        <Checkbox value="tram" label="Trammiga" icon="directions_subway" />
        <Checkbox value="foot" label="Jalgsi" icon="directions_walk" />
        <Checkbox value="car" label="Autoga" icon="directions_car" />
      </Checkbox.Group>
      <Checkbox.Group label="Secondary" variant="card" cardVariant="secondary" defaultValue={['tram']}>
        <Checkbox
          value="tram"
          label="Trammiga"
          description="Soovitatud variant, vähendab ummikuid"
          icon="directions_subway"
        />
        <Checkbox
          value="foot"
          label="Jalgsi"
          description="Soovitatud variant, vähendab ummikuid"
          icon="directions_walk"
        />
        <Checkbox
          value="car"
          label="Autoga"
          description="Kui soovid kiiremini kohale jõuda, tekitab ummikuid"
          icon="directions_car"
        />
      </Checkbox.Group>
    </VerticalSpacing>
  ),
};

/**
 * Group props are breakpoint-aware (mobile-first). Here it's cards by default and
 * regular checkboxes from `md` up — resize the canvas to see it switch.
 */
export const ResponsiveVariant: StoryObj = {
  render: () => (
    <Checkbox.Group
      label="Tooraine"
      defaultValue={['kartul']}
      variant="card"
      cardVariant="secondary"
      md={{ variant: 'default', direction: 'column' }}
    >
      <Checkbox value="kartul" label="Kartul" />
      <Checkbox value="peet" label="Peet" />
      <Checkbox value="kapsas" label="Kapsas" />
    </Checkbox.Group>
  ),
};

const CARD_STATES: Array<{ state: string; props?: Partial<CheckboxProps> }> = [
  { state: 'Default' },
  { state: 'Hover' },
  { state: 'Active' },
  { state: 'Focus' },
  { state: 'Disabled', props: { disabled: true } },
];

const cardStateId = (cardVariant: string, state: string, selected: boolean) =>
  `card-${cardVariant}-${state.toLowerCase()}-${selected ? 'selected' : 'unselected'}`;

const cardStatesPseudo = (cardVariant: string) => {
  const ids = (state: string) => [true, false].map((selected) => `#${cardStateId(cardVariant, state, selected)}`);
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

const renderCardStates = (cardVariant: 'primary' | 'secondary') => (
  <StateMatrix
    alignItems="center"
    mobileLayout="columns"
    headers={['Unselected', 'Selected']}
    rows={[
      ...CARD_STATES.map(({ state, props }) => ({
        label: state,
        cells: [false, true].map((selected) => (
          <Checkbox
            key={String(selected)}
            variant="card"
            cardVariant={cardVariant}
            id={cardStateId(cardVariant, state, selected)}
            name={cardStateId(cardVariant, state, selected)}
            value="check"
            label="Tekst"
            defaultChecked={selected}
            {...props}
          />
        )),
      })),
      {
        label: 'Error',
        cells: [
          <CardErrorCell key="unselected" message="Kohustuslik on valida vähemalt 1 väärtus">
            <Checkbox.Group
              label="Error unselected"
              hideLabel
              variant="card"
              cardVariant={cardVariant}
              direction="row"
              invalid
            >
              <Checkbox value="a" label="Tekst" />
              <Checkbox value="b" label="Tekst" />
            </Checkbox.Group>
          </CardErrorCell>,
          <CardErrorCell key="selected" message="Kohustuslik on valida vähemalt 2 väärtust">
            <Checkbox.Group
              label="Error selected"
              hideLabel
              variant="card"
              cardVariant={cardVariant}
              direction="row"
              invalid
              defaultValue={['a']}
            >
              <Checkbox value="a" label="Tekst" />
              <Checkbox value="b" label="Tekst" />
            </Checkbox.Group>
          </CardErrorCell>,
        ],
      },
    ]}
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

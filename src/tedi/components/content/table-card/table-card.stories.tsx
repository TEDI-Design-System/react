import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../../buttons/button/button';
import { Field } from '../../form/field/field';
import { Select } from '../../form/select/select';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Dropdown } from '../../overlays/dropdown';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { Card } from '../card/card';
import { Label } from '../label/label';
import { TextGroup } from '../text-group/text-group';
import { TableCard, TableCardProps, TableCardRow } from './table-card';

/**
 * `TableCard` turns a single table row into a stacked card of label / value pairs - the readable mobile counterpart of a `Table`.
 *
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.68.85?node-id=53155-151142&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: 'Tedi-Ready/Content/TableCard',
  parameters: {
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  argTypes: {
    // `ReactNode` props still show in the (type-derived) args table, but their control is
    // disabled: Storybook infers an "object" control that assigns `{}` when clicked, which
    // React can't render as a child ("Objects are not valid as a React child") and crashes
    // the story. They can't be meaningfully authored from a control anyway.
    title: { control: false },
    subtitle: { control: false },
    endSlot: { control: false },
    actions: { control: false },
    children: { control: false },
  },
  decorators: [
    (Story, context) => (
      <div style={{ maxWidth: context.parameters.fullWidth ? undefined : 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<TableCardProps>;

const benefitRows: TableCardRow[] = [
  { label: 'Hüvitise arvutamine', value: 'Tervisekassa ei hüvita' },
  { label: 'Kogus', value: '2 päeva' },
  { label: 'Ühe päeva hüvitis (€)', value: '-' },
  { label: 'Summa (€)', value: '0.00 €', bold: true },
];

export const Default: Story = {
  args: {
    rows: benefitRows,
    summary: { label: 'Ülekande summa', value: '0.00 €' },
    labelSize: 'small',
  },
};

export const SimpleCard: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      <TableCard rows={benefitRows} summary={{ label: 'Ülekande summa', value: '0.00 €' }} labelSize="small" />

      <TableCard
        title="ID kaart"
        titleElement="h4"
        titleModifiers="h4"
        endSlot={<StatusBadge color="success">Kehtib 13.08.2027</StatusBadge>}
        layout="vertical"
        labelSize="small"
        columns={2}
        rows={[
          { label: 'Eesnimi', value: 'Mari' },
          { label: 'Sünniaeg', value: '15.08.1987' },
          { label: 'Perenimi', value: 'Maasikas' },
          { label: 'Isikukood', value: '41234567891' },
          { label: 'Dokumendi number', value: 'AS0000226' },
          { label: 'Sugu', value: 'Naine' },
        ]}
      />

      <TableCard
        title="4. juuli 2026"
        layout="vertical"
        labelSize="small"
        rows={[
          { label: 'Päringu teostaja', value: 'EE4800234675' },
          { label: 'Päringu nimetus', value: 'Inimeste arv kohalikus omavalitsuses' },
          { label: 'Infosüsteem', value: 'Rahvastikuregister' },
        ]}
      />

      <TableCard
        layout="vertical"
        rows={[
          { label: 'Periood', value: '01.02 - 14.01.2024' },
          { label: 'Liik', value: 'Haigusleht' },
          { label: 'Pikkus', value: '14 päeva' },
          { label: 'Hüvitis', value: '120.34 €', bold: true },
          { label: 'Tõendi olek', value: <StatusBadge color="success">Kehtiv</StatusBadge> },
        ]}
      />

      <TableCard
        layout="vertical"
        columns={2}
        rows={[
          { label: 'Periood', value: '01.02 - 14.01.2024', colSpan: 2 },
          { label: 'Liik', value: 'Haigusleht' },
          { label: 'Pikkus', value: '14 päeva' },
          { label: 'Hüvitis', value: '120.34 €', bold: true },
          { label: 'Tõendi olek', value: <StatusBadge color="success">Kehtiv</StatusBadge> },
        ]}
      />
    </VerticalSpacing>
  ),
};

/**
 * Edit-in-place: the same `TableCard` shows read-only rows with a **Muuda** action, and clicking it
 * swaps each row's value for an input and the footer for Katkesta / Salvesta. The row labels stay
 * put and name the inputs (via `Field`'s `aria-label` / `Select`'s `hideLabel`), so the card reads
 * as a form without duplicating labels.
 */
const EditableAppointmentCard = (): JSX.Element => {
  const [editing, setEditing] = useState(false);

  const readRows: TableCardRow[] = [
    { label: 'Kuupäev', value: '22.03.2029 – 29.03.2029' },
    { label: 'Kellaaeg', value: '11:14' },
    { label: 'Kestus', value: '6 min' },
    { label: 'Asukoht', value: 'Tallinn' },
  ];

  const editRows: TableCardRow[] = [
    { label: 'Kuupäev', value: <Field aria-label="Kuupäev" defaultValue="22.03.2029 – 29.03.2029" /> },
    { label: 'Kellaaeg', value: <Field aria-label="Kellaaeg" defaultValue="11:14" /> },
    { label: 'Kestus', value: <Field aria-label="Kestus" defaultValue="6 min" /> },
    {
      label: 'Asukoht',
      value: (
        <div style={{ width: '100%' }}>
          <Select
            id="wa-edit-location"
            label="Asukoht"
            hideLabel
            options={[
              { label: 'Tallinn', value: 'tallinn' },
              { label: 'Tartu', value: 'tartu' },
              { label: 'Pärnu', value: 'parnu' },
            ]}
            defaultValue={{ label: 'Tallinn', value: 'tallinn' }}
          />
        </div>
      ),
    },
  ];

  return (
    <TableCard
      layout="vertical"
      rows={editing ? editRows : readRows}
      actions={
        editing ? (
          <>
            <Button visualType="neutral" fullWidth onClick={() => setEditing(false)}>
              Katkesta
            </Button>
            <Button fullWidth onClick={() => setEditing(false)}>
              Salvesta
            </Button>
          </>
        ) : (
          <Button visualType="neutral" fullWidth iconLeft="edit" onClick={() => setEditing(true)}>
            Muuda
          </Button>
        )
      }
    />
  );
};

/**
 * Cards with a footer `actions` slot — a single action, primary / secondary buttons, icon-only
 * actions, or text actions — plus selectable rows with status badges.
 */
export const WithActions: StoryFn = () => {
  const people = [
    { name: 'Meelis Mägi', vanus: 23, visits: 7, status: <StatusBadge color="warning">Aegumas</StatusBadge> },
    { name: 'Madis Tamm', vanus: 12, visits: 14, status: <StatusBadge color="success">Kehtiv</StatusBadge> },
    { name: 'Kadi Kuusk', vanus: 43, visits: 24, status: <StatusBadge color="success">Kehtiv</StatusBadge> },
  ];
  return (
    <VerticalSpacing size={1}>
      <EditableAppointmentCard />

      <TableCard
        layout="vertical"
        rows={[
          { label: 'Teenus', value: 'Ortopeedia' },
          { label: 'Arst', value: 'Pille Paunküla' },
          { label: 'Maksumus', value: '45.50 €/h' },
          {
            label: 'Asukoht',
            value: (
              <Dropdown>
                <Dropdown.Trigger>
                  <Button visualType="neutral" size="small" iconRight="expand_more">
                    Tallinn
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item index={0}>Tallinn</Dropdown.Item>
                  <Dropdown.Item index={1}>Tartu</Dropdown.Item>
                  <Dropdown.Item index={2}>Pärnu</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            ),
          },
        ]}
      />

      <TableCard
        layout="vertical"
        rows={[
          { label: 'Periood', value: '01.02 - 14.01.2024' },
          { label: 'Liik', value: 'Haigusleht' },
          { label: 'Pikkus', value: '14 päeva' },
          { label: 'Hüvitis', value: '120.34 €', bold: true },
        ]}
        actions={
          <>
            <Button visualType="neutral" icon="edit" showTooltip>
              Muuda
            </Button>
            <Button visualType="neutral" icon="share" showTooltip>
              Jaga
            </Button>
            <Button visualType="neutral" icon="lock" showTooltip>
              Lukusta
            </Button>
            <Button visualType="neutral" icon="more_vert" showTooltip>
              Rohkem
            </Button>
          </>
        }
      />

      {people.map((person) => (
        <TableCard
          key={person.name}
          title={person.name}
          titleModifiers="h6"
          selectable
          layout="horizontal"
          labelAlign="left"
          valueAlign="left"
          rows={[
            { label: 'Vanus', value: String(person.vanus) },
            { label: 'Külastuste arv', value: String(person.visits) },
            { label: 'Tõendi staatus', value: person.status },
          ]}
        />
      ))}

      <TableCard
        layout="vertical"
        rows={[
          { label: 'Periood', value: '01.02 - 14.01.2024' },
          { label: 'Liik', value: 'Haigusleht' },
          { label: 'Pikkus', value: '14 päeva' },
          { label: 'Staatus', value: <StatusBadge color="brand">Ülekanne tehtud</StatusBadge> },
          { label: 'Hüvitis', value: '120.34 €', bold: true },
        ]}
        actions={
          <>
            <Button visualType="neutral" fullWidth>
              Vaata
            </Button>
            <Button visualType="neutral" fullWidth>
              Muuda
            </Button>
            <Button visualType="neutral" fullWidth>
              Rohkem
            </Button>
          </>
        }
      />

      <TableCard
        title="Pass"
        titleElement="h4"
        titleModifiers="h4"
        endSlot={<StatusBadge color="success">Kehtib 13.08.2027</StatusBadge>}
        layout="vertical"
        columns={2}
        rows={[
          { label: 'Eesnimi', value: 'Mari' },
          { label: 'Sünniaeg', value: '15.08.1987' },
          { label: 'Perenimi', value: 'Maasikas' },
          { label: 'Isikukood', value: '41234567891' },
          { label: 'Dokumendi number', value: 'AS0000226' },
          { label: 'Sugu', value: 'Naine' },
        ]}
        actions={
          <>
            <Button visualType="secondary" fullWidth>
              Kuva pilt
            </Button>
            <Button visualType="secondary" fullWidth>
              Tegevused
            </Button>
          </>
        }
      />

      <TableCard
        title={
          <Label as="span" isSmall isBold>
            Eesti Maksu- ja Tolliamet
          </Label>
        }
        endSlot={<StatusBadge color="danger">Täitmata</StatusBadge>}
        layout="vertical"
        rows={[{ label: '', value: 'Käibedeklaratsiooni esitamise tähtaeg on 5 päeva pärast 10.10.2025' }]}
        actions={
          <>
            <Button visualType="neutral" fullWidth iconLeft="share">
              Jaga
            </Button>
            <Button visualType="neutral" fullWidth iconLeft="calendar_today">
              Lisa kalendrisse
            </Button>
          </>
        }
      />
    </VerticalSpacing>
  );
};

WithActions.parameters = {
  a11y: {
    config: {
      rules: [
        { id: 'button-name', enabled: false },
        { id: 'aria-allowed-attr', enabled: false },
        { id: 'color-contrast', enabled: false },
      ],
    },
  },
};

/**
 * Collapsible cards (`collapsible`) — the header toggles the body. Combine with a `subtitle`,
 * a header `endSlot`, an `actions` footer, or multiple `columns`. The toggle is a `CollapseButton`;
 * set `arrowType="secondary"` (as on the "Mari Maasikas" card) for the circular, outlined arrow.
 */
export const IsAccordion: StoryFn = () => {
  const rows: TableCardRow[] = [
    { label: 'Vanus', value: '25' },
    { label: 'Külastuste arv', value: '6' },
    { label: 'Taotluse olek', value: <StatusBadge color="brand">Menetluses</StatusBadge> },
  ];
  return (
    <VerticalSpacing size={1}>
      <TableCard
        title="Hambaarst"
        subtitle="14.04.2026 15:30"
        collapsible
        defaultOpen={false}
        labelSize="small"
        labelAlign="left"
        valueAlign="left"
        rowAlign="center"
        rows={rows}
      />

      <TableCard
        title="Hambaarst"
        subtitle="14.04.2026 15:30"
        collapsible
        defaultOpen={false}
        labelSize="small"
        labelAlign="left"
        valueAlign="left"
        rowAlign="center"
        rows={rows}
        actions={
          <>
            <Button visualType="neutral" fullWidth iconLeft="edit">
              Muuda
            </Button>
            <Button visualType="neutral" fullWidth iconLeft="close">
              Tühista
            </Button>
            <Button visualType="neutral" fullWidth iconLeft="more_vert">
              Rohkem
            </Button>
          </>
        }
      />

      <TableCard
        title="Mari Maasikas"
        endSlot={<StatusBadge color="success">Verifitseeritud</StatusBadge>}
        subtitle="Vanus: 25"
        collapsible
        arrowType="secondary"
        defaultOpen={false}
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        labelSize="small"
        rows={rows}
      />

      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        labelSize="small"
        rows={rows}
        actions={
          <Button visualType="neutral" fullWidth iconLeft="edit">
            Muuda
          </Button>
        }
      />

      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="vertical"
        columns={3}
        labelSize="small"
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
          { label: 'Olek', value: <StatusBadge color="brand">Kehtiv</StatusBadge> },
        ]}
      />
    </VerticalSpacing>
  );
};

/**
 * A collapsible card can hold **child row-groups** — repeated blocks of rows (e.g. one certificate
 * each) shown on a muted background inside the accordion body. `TableCard` renders the header and
 * main rows; pass the child groups as `children` (`Card.Content` + `TextGroup.List`) so they share
 * the same tokens and collapse together.
 */
export const HasChildrenRows: StoryFn = () => {
  const certificates = ['Puukentsefaliidi vaktsiin', 'COVID-19'];
  const validBadge = (
    <StatusBadge color="success" variant="filled-bordered">
      Kehtiv
    </StatusBadge>
  );
  const editButton = (
    <Button visualType="neutral" fullWidth iconLeft="edit">
      Muuda
    </Button>
  );

  return (
    <VerticalSpacing size={1}>
      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        labelWidth="var(--text-group-label-width-sm)"
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
        ]}
        actions={editButton}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <VerticalSpacing size={0.5}>
              <TextGroup.List
                type="horizontal"
                labelAlign="left"
                valueAlign="left"
                labelWidth="var(--text-group-label-width-sm)"
                items={[
                  { label: 'Tõend', value: name },
                  { label: 'Tõendi staatus', value: validBadge },
                ]}
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button visualType="neutral" fullWidth>
                  Vaata
                </Button>
              </div>
            </VerticalSpacing>
          </Card.Content>
        ))}
      </TableCard>

      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        labelWidth="var(--text-group-label-width-sm)"
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
        ]}
        actions={editButton}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <TextGroup.List
              type="horizontal"
              labelAlign="left"
              valueAlign="left"
              labelWidth="var(--text-group-label-width-sm)"
              items={[
                { label: 'Tõend', value: name },
                { label: 'Olek', value: validBadge },
              ]}
            />
          </Card.Content>
        ))}
      </TableCard>

      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="vertical"
        columns={2}
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
        ]}
        actions={editButton}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <TextGroup.List
              type="vertical"
              columns={2}
              rowGap="var(--layout-grid-gutters-16)"
              items={[
                { label: 'Tõend', value: name },
                { label: 'Olek', value: validBadge },
              ]}
            />
          </Card.Content>
        ))}
      </TableCard>
    </VerticalSpacing>
  );
};

/**
 * Uses `md={{ columns: 2 }}` to switch from one column to two at the `md` viewport breakpoint.
 * Labels stay above their values. Resize the preview to see the configured layout change.
 */
export const WithResponsiveLayout: Story = {
  args: {
    title: 'ID kaart',
    titleElement: 'h4',
    titleModifiers: 'h4',
    endSlot: <StatusBadge color="success">Kehtib 13.08.2027</StatusBadge>,
    layout: 'vertical',
    labelSize: 'small',
    columns: 1,
    md: { columns: 2 },
    rows: [
      { label: 'Eesnimi', value: 'Mari' },
      { label: 'Sünniaeg', value: '15.08.1987' },
      { label: 'Perenimi', value: 'Maasikas' },
      { label: 'Isikukood', value: '41234567891' },
      { label: 'Dokumendi number', value: 'AS0000226' },
      { label: 'Sugu', value: 'Naine' },
    ],
  },
};

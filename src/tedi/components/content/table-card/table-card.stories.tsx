import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { DateField } from '../../form/date-field/date-field';
import { Field } from '../../form/field/field';
import { InputGroup } from '../../form/input-group/input-group';
import { Select } from '../../form/select/select';
import { TimeField } from '../../form/time-field/time-field';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { Dropdown } from '../../overlays/dropdown';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { Card } from '../card/card';
import { Label } from '../label/label';
import { Table } from '../table/table';
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

const benefitStatementItems = benefitRows.map((row) => ({
  label: <Label isSmall>{row.label as string}</Label>,
  value: row.bold ? <Text modifiers="bold">{row.value}</Text> : row.value,
}));

export const Default: Story = {
  args: {
    rows: benefitRows,
    summary: { label: 'Ülekande summa', value: '0.00 €' },
    smallLabels: true,
  },
};

export const SimpleCard: Story = {
  render: () => (
    <VerticalSpacing size={1}>
      {/* 1. Financial statement — several benefit blocks joined by dividers with one shared total,
          all right-aligned in a 132px (8.25rem) label column, matching Figma. */}
      <Card padding={0} style={{ overflow: 'hidden' }}>
        {[0, 1, 2, 3].map((block) => (
          <Card.Content key={block} padding={1} hasSeparator>
            <TextGroup.List
              type="horizontal"
              labelAlign="right"
              valueAlign="right"
              labelWidth="8.25rem"
              items={benefitStatementItems}
            />
          </Card.Content>
        ))}
        <Card.Content padding={1} background="tertiary">
          <TextGroup.List
            type="horizontal"
            labelAlign="right"
            valueAlign="right"
            labelWidth="8.25rem"
            items={[{ label: <Label isSmall>Ülekande summa</Label>, value: <Text modifiers="bold">0.00 €</Text> }]}
          />
        </Card.Content>
      </Card>

      <TableCard
        title="ID kaart"
        titleElement="h4"
        titleModifiers="h4"
        status={<StatusBadge color="success">Kehtib 13.08.2027</StatusBadge>}
        layout="vertical"
        smallLabels
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
        smallLabels
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
      <TableCard
        layout="vertical"
        rows={[
          { label: 'Kuupäev', value: '22.03.2029 – 29.03.2029' },
          { label: 'Kellaaeg', value: '11:14' },
          { label: 'Kestus', value: '6 min' },
          { label: 'Asukoht', value: 'Tallinn' },
        ]}
        actions={
          <Button visualType="neutral" fullWidth iconLeft="edit">
            Muuda
          </Button>
        }
      />

      <Card padding={0}>
        <Card.Content padding={1}>
          <TextGroup.List
            type="vertical"
            items={[
              { label: 'Teenus', value: 'Ortopeedia' },
              { label: 'Arst', value: 'Pille Paunküla' },
              { label: 'Maksumus', value: '45.50 €/h' },
            ]}
          />
          <Separator spacing={{ top: 1, bottom: 0.5 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Label isSmall>Asukoht</Label>
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
          </div>
        </Card.Content>
      </Card>

      <Card padding={0}>
        <Card.Content padding={1} hasSeparator>
          <VerticalSpacing size={1}>
            <DateField id="tc-date" label="Kuupäev" mode="single" placeholder="pp.kk.aaaa" />
            <TimeField id="tc-time" label="Kellaaeg" defaultValue="11:15" />
            <InputGroup id="tc-dur" label="Kestus">
              <InputGroup.Input>
                <Field defaultValue="10" />
              </InputGroup.Input>
              <InputGroup.Suffix>min</InputGroup.Suffix>
            </InputGroup>
            <Select
              id="tc-loc"
              label="Asukoht"
              options={[{ label: 'Tallinn', value: 'tallinn' }]}
              defaultValue={{ label: 'Tallinn', value: 'tallinn' }}
            />
          </VerticalSpacing>
        </Card.Content>
        <Card.Content padding={{ vertical: 0.5, horizontal: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button visualType="neutral" fullWidth>
              Katkesta
            </Button>
            <Button fullWidth>Salvesta</Button>
          </div>
        </Card.Content>
      </Card>

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
          selectionLabel={`Vali ${person.name}`}
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
          { label: 'Staatus', value: <StatusBadge color="neutral">Ülekanne tehtud</StatusBadge> },
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
        status={<StatusBadge color="success">Kehtib 13.08.2027</StatusBadge>}
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
        title="Eesti Maksu- ja Tolliamet"
        status={<StatusBadge color="danger">Täitmata</StatusBadge>}
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
      // The form-fields card uses `TimeField`, whose picker-toggle button lacks a name and whose
      // wrapper carries `aria-expanded` without a supporting role. That's a pre-existing issue in
      // the TimeField component (it reproduces in TimeField's own stories), not TableCard — so
      // only these two rules are disabled here, not the whole a11y check.
      rules: [
        { id: 'button-name', enabled: false },
        { id: 'aria-allowed-attr', enabled: false },
      ],
    },
  },
};

/**
 * Collapsible cards (`collapsible`) — the header toggles the body. Combine with a `subtitle`,
 * a header `status`, an `actions` footer, or multiple `columns`.
 */
export const IsAccordion: StoryFn = () => {
  const rows: TableCardRow[] = [
    { label: 'Vanus', value: '25' },
    { label: 'Külastuste arv', value: '6' },
    { label: 'Taotluse olek', value: <StatusBadge color="neutral">Menetluses</StatusBadge> },
  ];
  return (
    <VerticalSpacing size={1}>
      <TableCard title="Hambarst" subtitle="14.04.2026 15:30" collapsible defaultOpen={false} smallLabels rows={rows} />

      <TableCard
        title="Hambarst"
        subtitle="14.04.2026 15:30"
        collapsible
        defaultOpen={false}
        smallLabels
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
        status={<StatusBadge color="success">Verifitseeritud</StatusBadge>}
        subtitle="Vanus: 25"
        collapsible
        defaultOpen={false}
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        smallLabels
        rows={rows}
      />

      <TableCard
        title="Kadri Kaasik"
        collapsible
        layout="horizontal"
        labelAlign="left"
        valueAlign="left"
        smallLabels
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
        smallLabels
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
          { label: 'Olek', value: <StatusBadge color="success">Kehtiv</StatusBadge> },
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
  const kehtiv = <StatusBadge color="success">Kehtiv</StatusBadge>;
  const muuda = (
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
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
        ]}
        actions={muuda}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <VerticalSpacing size={0.5}>
              <TextGroup.List
                type="horizontal"
                labelAlign="left"
                valueAlign="left"
                items={[
                  { label: 'Tõend', value: name },
                  { label: 'Tõendi staatus', value: kehtiv },
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
        rows={[
          { label: 'Vanus', value: '25' },
          { label: 'Külastuste arv', value: '6' },
        ]}
        actions={muuda}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <TextGroup.List
              type="horizontal"
              labelAlign="left"
              valueAlign="left"
              items={[
                { label: 'Tõend', value: name },
                { label: 'Olek', value: kehtiv },
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
        actions={muuda}
      >
        {certificates.map((name) => (
          <Card.Content key={name} padding={1} background="tertiary" hasSeparator>
            <TextGroup.List
              type="vertical"
              columns={2}
              rowGap="var(--layout-grid-gutters-16)"
              items={[
                { label: 'Tõend', value: name },
                { label: 'Olek', value: kehtiv },
              ]}
            />
          </Card.Content>
        ))}
      </TableCard>
    </VerticalSpacing>
  );
};

interface Appointment {
  kuupaev: string;
  kellaaeg: string;
  kestus: string;
  asukoht: string;
}

const appointments: Appointment[] = Array.from({ length: 6 }, () => ({
  kuupaev: '22.03.2029 – 29.03.2029',
  kellaaeg: '11:14',
  kestus: '6 min',
  asukoht: 'Harjumaa',
}));

const muudaButton = (
  <Button visualType="neutral" size="small" iconLeft="edit">
    Muuda
  </Button>
);

const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    id: 'kuupaev',
    header: 'Kuupäev',
    accessorKey: 'kuupaev',
    cell: ({ row }) => <span style={{ whiteSpace: 'nowrap' }}>{row.original.kuupaev}</span>,
  },
  { id: 'kellaaeg', header: 'Kellaaeg', accessorKey: 'kellaaeg' },
  { id: 'kestus', header: 'Kestus', accessorKey: 'kestus' },
  { id: 'asukoht', header: 'Asukoht', accessorKey: 'asukoht' },
  { id: 'actions', header: '', size: 1, cell: () => muudaButton },
];

/**
 * When there's no room to switch to cards, a `Table` can instead **scroll**. The first column can
 * stay pinned during horizontal scroll (`stickyFirstColumn`), and the header can stay pinned during
 * vertical scroll (`stickyHeader` + `maxHeight`). This is the desktop-friendly alternative to
 * `TableCard` — see the `Responsive` story for switching between the two.
 */
export const Scrollable: StoryFn = () => (
  <VerticalSpacing size={2}>
    <div style={{ maxWidth: 480 }}>
      <Table<Appointment> id="tc-scroll-plain" data={appointments} columns={appointmentColumns} />
    </div>

    <div style={{ maxWidth: 560 }}>
      <Table<Appointment>
        id="tc-scroll-sticky-col"
        data={appointments}
        columns={appointmentColumns}
        stickyFirstColumn
      />
    </div>

    <Table<Appointment>
      id="tc-scroll-sticky-header"
      data={appointments}
      columns={appointmentColumns}
      stickyHeader
      maxHeight={240}
    />
  </VerticalSpacing>
);
Scrollable.parameters = { fullWidth: true, layout: 'padded' };

/**
 * The core use case: one dataset, two presentations. On `md` and wider it renders a `Table`; below
 * `md` each row becomes a `TableCard`. Resize the viewport (or use the toolbar's viewport control)
 * to see it switch.
 */
export const Responsive: StoryFn = () => {
  const belowMd = isBreakpointBelow(useBreakpoint(), 'md');

  if (belowMd) {
    return (
      <VerticalSpacing size={1}>
        {appointments.map((appointment, index) => (
          <TableCard
            key={index}
            layout="vertical"
            rows={[
              { label: 'Kuupäev', value: appointment.kuupaev },
              { label: 'Kellaaeg', value: appointment.kellaaeg },
              { label: 'Kestus', value: appointment.kestus },
              { label: 'Asukoht', value: appointment.asukoht },
            ]}
            actions={muudaButton}
          />
        ))}
      </VerticalSpacing>
    );
  }

  return <Table<Appointment> id="tc-responsive" data={appointments} columns={appointmentColumns} />;
};
Responsive.parameters = { fullWidth: true, layout: 'padded' };

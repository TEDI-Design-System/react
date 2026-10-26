import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useState } from 'react';

import {
  getPrimaryComponentProps,
  getSubcomponentProps,
  subcomponentArgTypes,
} from '../../../../../.storybook/subcomponent-controls';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Accordion } from '../../content/accordion/accordion';
import { TextGroup } from '../../content/text-group/text-group';
import { Checkbox } from '../../form/checkbox/checkbox';
import { ChoiceGroup } from '../../form/choice-group/choice-group';
import { DateField } from '../../form/date-field/date-field';
import { Search } from '../../form/search/search';
import { TextField } from '../../form/textfield/textfield';
import { TimeField } from '../../form/time-field/time-field';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { Tag } from '../../tags/tag/tag';
import { SheetContentProps } from './components/sheet-content/sheet-content';
import { SheetFooterProps } from './components/sheet-footer/sheet-footer';
import { SheetHeaderProps } from './components/sheet-header/sheet-header';
import { Sheet, SheetProps } from './sheet';

const FIGMA_URL = 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.102.102?node-id=65376-125297&m=dev';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.102.102?node-id=65376-125297&m=dev" target="_blank">Figma ↗</a>
 */
const meta: Meta<typeof Sheet> = {
  component: Sheet,
  subcomponents: {
    'Sheet.Trigger': Sheet.Trigger,
    'Sheet.Content': Sheet.Content,
    'Sheet.Header': Sheet.Header,
    'Sheet.Body': Sheet.Body,
    'Sheet.Footer': Sheet.Footer,
    'Sheet.Closer': Sheet.Closer,
  },
  title: 'TEDI-Ready/Components/Overlay/Sheet',
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// Dropdown-style rows without Dropdown's menu context.
const exampleRowStyles = `
  .sheet-example-row {
    display: flex;
    gap: var(--layout-grid-gutters-08);
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--dropdown-item-padding-y) var(--tedi-sheet-padding-x);
    font: inherit;
    color: var(--dropdown-item-default-text);
    text-align: left;
    cursor: pointer;
    background: none;
    border: none;
  }

  .sheet-example-row:hover {
    color: var(--dropdown-item-hover-text);
    background: var(--dropdown-item-hover-background);
  }

  .sheet-example-row--bleed {
    width: calc(100% + 2 * var(--tedi-sheet-padding-x));
    margin-inline: calc(-1 * var(--tedi-sheet-padding-x));
  }
`;

const SheetSection = ({ children }: { children: ReactNode }): JSX.Element => (
  <div style={{ padding: 'var(--tedi-sheet-padding-x)' }}>{children}</div>
);

const moreActions = (
  <Button visualType="secondary" icon="more_vert">
    Rohkem valikuid
  </Button>
);

const ApplyFooter = ({ more = false }: { more?: boolean }): JSX.Element => (
  <Sheet.Footer fullWidth right={more ? moreActions : undefined}>
    <Sheet.Closer>
      <Button visualType="secondary">Tühista</Button>
    </Sheet.Closer>
    <Button>Rakenda</Button>
  </Sheet.Footer>
);

type TriggerVariant = 'primary' | 'secondary' | 'neutral';

interface TriggerSpec {
  label?: string;
  icon?: string;
  visualType?: TriggerVariant;
}

const labeledTrigger = (
  caption: string,
  content: JSX.Element,
  trigger: TriggerSpec = {},
  sheetProps: Partial<SheetProps> = {}
) => {
  const { label = 'Seaded', icon = 'tune', visualType = 'secondary' } = trigger;
  return (
    <VerticalSpacing size={0.25} key={caption}>
      <Text modifiers="small" color="secondary">
        {caption}
      </Text>
      {/* Keep Floating UI's focus guards outside VerticalSpacing's child layout. */}
      <div>
        <Sheet {...sheetProps}>
          <Sheet.Trigger>
            <Button visualType={visualType} iconLeft={icon}>
              {label}
            </Button>
          </Sheet.Trigger>
          {content}
        </Sheet>
      </div>
    </VerticalSpacing>
  );
};

interface Example extends TriggerSpec {
  caption: string;
  content: JSX.Element;
  sheetProps?: Partial<SheetProps>;
}

const ExampleRow = ({ children }: { children: ReactNode }): JSX.Element => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '1rem' }}>{children}</div>
);

const exampleRow = (examples: Example[]) => (
  <ExampleRow>
    {examples.map((ex) =>
      labeledTrigger(
        ex.caption,
        ex.content,
        { label: ex.label, icon: ex.icon, visualType: ex.visualType },
        ex.sheetProps
      )
    )}
  </ExampleRow>
);

const exampleGroup = (label: string, examples: Example[]) => (
  <div key={label}>
    <VerticalSpacing size={0.75}>
      {(examples.length > 1 || examples.some((example) => example.caption !== label)) && (
        <div>
          <Text modifiers="bold">{label}</Text>
        </div>
      )}
      {exampleRow(examples)}
    </VerticalSpacing>
  </div>
);

const settingsBody = (idPrefix: string) => (
  <VerticalSpacing size={0.5}>
    <Checkbox
      id={`${idPrefix}-lengths`}
      name={`${idPrefix}-lengths`}
      value="lengths"
      label="Näita pikkusi"
      defaultChecked
    />
    <Checkbox id={`${idPrefix}-angles`} name={`${idPrefix}-angles`} value="angles" label="Näita nurki" />
  </VerticalSpacing>
);

const notificationsBody = (
  <VerticalSpacing size={0.75}>
    <TextGroup type="vertical" label="Täna, 09:12" value="Teie taotlus on menetlusse võetud" />
    <TextGroup type="vertical" label="Eile, 16:40" value="Uus dokument on allkirjastamiseks valmis" />
  </VerticalSpacing>
);

const filterChoices = (idPrefix: string) => (
  <>
    <SheetSection>
      <ChoiceGroup
        id={`${idPrefix}-status`}
        name={`${idPrefix}-status`}
        label="Kirjade olek"
        hideLabel
        inputType="radio"
        defaultValue="all"
        items={[
          { id: `${idPrefix}-status-all`, label: 'Kõik', value: 'all' },
          { id: `${idPrefix}-status-unread`, label: 'Ainult lugemata', value: 'unread' },
        ]}
      />
    </SheetSection>
    <Separator spacing={0} />
    <SheetSection>
      <ChoiceGroup
        id={`${idPrefix}-sort`}
        name={`${idPrefix}-sort`}
        label="Järjestus"
        hideLabel
        inputType="radio"
        defaultValue="unread-top"
        items={[
          { id: `${idPrefix}-sort-unread`, label: 'Lugemata kõige üleval', value: 'unread-top' },
          { id: `${idPrefix}-sort-date`, label: 'Kuupäeva järgi', value: 'date' },
        ]}
      />
    </SheetSection>
  </>
);

const dateTimeBody = (idPrefix: string) => (
  <VerticalSpacing size={1}>
    <DateField id={`${idPrefix}-date`} label="Kuupäev" />
    <TimeField id={`${idPrefix}-time`} label="Aeg" />
    <Checkbox id={`${idPrefix}-reminder`} name={`${idPrefix}-reminder`} value="reminder" label="Lisa meeldetuletus" />
  </VerticalSpacing>
);

const headerExample = (idPrefix: string, header: JSX.Element, contentProps: Partial<SheetContentProps> = {}) => (
  <Sheet.Content {...contentProps}>
    {header}
    <Sheet.Body>{settingsBody(idPrefix)}</Sheet.Body>
  </Sheet.Content>
);

const notificationsExample = (header: JSX.Element) => (
  <Sheet.Content>
    {header}
    <Sheet.Body>{notificationsBody}</Sheet.Body>
  </Sheet.Content>
);

const ALL_SENDERS = [
  'SK ID Solutions AS',
  'Politsei- ja Piirivalveamet',
  'Sihtasutus Kutsekoda',
  'Siseministeerium',
  'Riigi Infosüsteemide Amet',
];

const SENDER_GROUPS = [
  { title: 'Maksu- ja Tolliamet', senders: ['Maksu- ja Tolliamet', 'Maksu- ja Tolliamet registrid', 'Tolliosakond'] },
  { title: 'Tartu Maakohus', senders: ['Tartu Maakohus registriosakond', 'Tartu Maakohus kinnistusosakond'] },
];

const SENDERS = [...ALL_SENDERS, ...SENDER_GROUPS.flatMap((group) => group.senders)];

interface SenderSelectionProps {
  idPrefix: string;
  selected: string[];
  onChange: (selected: string[]) => void;
}

const SenderSelection = ({ idPrefix, selected, onChange }: SenderSelectionProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const matches = (label: string) => label.toLowerCase().includes(query.trim().toLowerCase());
  const visibleSenders = ALL_SENDERS.filter(matches);
  const visibleGroups = SENDER_GROUPS.map((group) => ({
    ...group,
    senders: group.senders.filter((sender) => matches(group.title) || matches(sender)),
  })).filter((group) => group.senders.length > 0);

  const senderCheckbox = (sender: string) => (
    <Checkbox
      key={sender}
      id={`${idPrefix}-${SENDERS.indexOf(sender)}`}
      name={`${idPrefix}-senders`}
      value={sender}
      label={sender}
      checked={selected.includes(sender)}
      onChange={(_, checked) =>
        onChange(checked ? [...selected, sender] : selected.filter((value) => value !== sender))
      }
    />
  );

  return (
    <VerticalSpacing size={1}>
      <Search
        id={`${idPrefix}-search`}
        label="Otsi saatjat"
        hideLabel
        placeholder="Otsi"
        value={query}
        onChange={setQuery}
      />
      <Checkbox
        id={`${idPrefix}-all`}
        name={`${idPrefix}-all`}
        value="all"
        label="Kõik saatjad"
        checked={selected.length === SENDERS.length}
        indeterminate={selected.length > 0 && selected.length < SENDERS.length}
        onChange={(_, checked) => onChange(checked ? SENDERS : [])}
      />
      <Separator spacing={0} />
      {visibleSenders.length > 0 && <VerticalSpacing size={0.5}>{visibleSenders.map(senderCheckbox)}</VerticalSpacing>}
      {visibleGroups.length > 0 && (
        <Accordion>
          {visibleGroups.map((group) => (
            <Accordion.Item
              key={group.title}
              defaultExpanded={group.title === 'Tartu Maakohus'}
              expanded={query.trim() ? true : undefined}
            >
              <Accordion.Item.Header
                showExpandLabel={false}
                title={group.title}
                afterTitle={<Tag color="primary">{group.senders.length}</Tag>}
                expandActionPosition="end"
              />
              <Accordion.Item.Content>
                <VerticalSpacing size={0.5}>{group.senders.map(senderCheckbox)}</VerticalSpacing>
              </Accordion.Item.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      {visibleSenders.length === 0 && visibleGroups.length === 0 && <Text>Saatjaid ei leitud.</Text>}
    </VerticalSpacing>
  );
};

/** Navigate between filters and sender selection without losing either form's values. */
function ContentNavigationSheet(): JSX.Element {
  const [step, setStep] = useState<'filters' | 'senders'>('filters');
  const [selected, setSelected] = useState(ALL_SENDERS.slice(0, 2));

  return (
    <Sheet
      onToggle={(open) => {
        if (open) setStep('filters');
      }}
    >
      <style>{exampleRowStyles}</style>
      <Sheet.Trigger>
        <Button visualType="neutral" iconLeft="tune">
          Filtreeri
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header
          title={step === 'filters' ? 'Filtreerimine' : 'Saatja'}
          variant="default"
          left={
            step === 'senders' ? (
              <Button visualType="neutral" size="small" icon="arrow_back" onClick={() => setStep('filters')}>
                Tagasi
              </Button>
            ) : undefined
          }
        />
        <Sheet.Body padding="none">
          <div hidden={step !== 'filters'}>
            <SheetSection>
              <button
                type="button"
                onClick={() => setStep('senders')}
                className="sheet-example-row sheet-example-row--bleed"
              >
                <Text>Saatja</Text>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {selected.length > 0 && <Tag color="primary">{selected.length}</Tag>}
                  <Icon name="arrow_forward" color="brand" />
                </span>
              </button>
            </SheetSection>
            <Separator spacing={0} />
            {filterChoices('sheet-filter')}
          </div>
          <div hidden={step !== 'senders'}>
            <SheetSection>
              <SenderSelection idPrefix="sheet-filter-senders" selected={selected} onChange={setSelected} />
            </SheetSection>
          </div>
        </Sheet.Body>
        {step === 'filters' ? (
          <ApplyFooter />
        ) : (
          <Sheet.Footer fullWidth>
            <Button visualType="secondary" onClick={() => setStep('filters')}>
              Tagasi
            </Button>
            <Button onClick={() => setStep('filters')}>Rakenda</Button>
          </Sheet.Footer>
        )}
      </Sheet.Content>
    </Sheet>
  );
}

const dockedSheetProps: Partial<SheetProps> = { closeOnBackdropClick: false };
const dockedContentProps: Partial<SheetContentProps> = { showOverlay: false, trapFocus: false, lockScroll: false };

const MAP_LAYERS = ['Hübriidkaart', 'Reljeef', 'Katastriüksused', 'Kitsendused', 'Aadressandmed'];

export const Default: StoryObj = {
  argTypes: {
    ...subcomponentArgTypes(Sheet.Content, {
      category: 'Sheet.Content',
      prefix: 'content',
      exclude: ['children', 'initialFocus', 'aria-labelledby', 'aria-label', 'snapPoints', 'defaultSnapPoint'],
    }),
    ...subcomponentArgTypes(Sheet.Header, {
      category: 'Sheet.Header',
      prefix: 'header',
      include: ['title', 'variant', 'centerTitle', 'collapsible', 'closeButton'],
    }),
    ...subcomponentArgTypes(Sheet.Footer, {
      category: 'Sheet.Footer',
      prefix: 'footer',
      include: ['align', 'fullWidth'],
    }),
  },
  args: {
    header__title: 'Filtreerimine',
    header__variant: 'default',
    footer__fullWidth: true,
  },
  render: (args: Record<string, unknown>) => (
    <Sheet {...getPrimaryComponentProps<SheetProps>(args)}>
      <Sheet.Trigger>
        <Button visualType="neutral" iconLeft="tune">
          Filtreeri
        </Button>
      </Sheet.Trigger>
      <Sheet.Content {...getSubcomponentProps<SheetContentProps>(args, 'content')}>
        <Sheet.Header {...getSubcomponentProps<SheetHeaderProps>(args, 'header')} />
        <Sheet.Body padding="none">{filterChoices('sheet-default')}</Sheet.Body>
        <Sheet.Footer {...getSubcomponentProps<SheetFooterProps>(args, 'footer')} right={moreActions}>
          <Sheet.Closer>
            <Button visualType="secondary">Tühista</Button>
          </Sheet.Closer>
          <Button>Rakenda</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};

export const ActionsSlot: Story = {
  name: 'Actions slot',
  render: () =>
    exampleRow([
      {
        caption: 'With footer',
        content: (
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody('sheet-actions-footer')}</Sheet.Body>
            <ApplyFooter more />
          </Sheet.Content>
        ),
      },
      {
        caption: 'Without footer',
        label: 'Loe lähemalt',
        icon: 'menu_book',
        content: (
          <Sheet.Content>
            <Sheet.Header title="Loe lähemalt" variant="default" />
            <Sheet.Body>
              <Text>
                Orav ehk harilik orav ehk punaorav on oravlaste sugukonda kuuluv näriline. See on ainus Eestis
                pärismaisena elav orava perekonna liik. Orava karvastiku värvus varieerub ka Eesti ulatuses: Saaremaal
                on see valdavalt hallikam, mandril punakam.
              </Text>
            </Sheet.Body>
          </Sheet.Content>
        ),
      },
    ]),
};

/** Corner radius also supports breakpoint overrides. */
export const CornerRadius: Story = {
  name: 'Corner radius',
  render: () =>
    exampleRow([
      ...(
        [
          ['24px', 'default'],
          ['4px', 'card'],
          ['0px', 'none'],
        ] as const
      ).map(([caption, radius]) => ({
        caption,
        content: (
          <Sheet.Content radius={radius}>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody(`sheet-radius-${radius}`)}</Sheet.Body>
          </Sheet.Content>
        ),
      })),
      {
        caption: '0px → 4px from md',
        content: (
          <Sheet.Content radius="none" md={{ radius: 'card' }}>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody('sheet-radius-responsive')}</Sheet.Body>
          </Sheet.Content>
        ),
      },
    ]),
};

export const HeaderVariant: Story = {
  name: 'Header variant',
  render: () =>
    exampleRow([
      {
        caption: 'Default',
        content: (
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody('sheet-variant-default')}</Sheet.Body>
          </Sheet.Content>
        ),
      },
      {
        caption: 'Brand',
        visualType: 'primary',
        content: (
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="brand" />
            <Sheet.Body>{settingsBody('sheet-variant-brand')}</Sheet.Body>
          </Sheet.Content>
        ),
      },
    ]),
};

export const HeaderType: Story = {
  name: 'Header type',
  render: () => (
    <VerticalSpacing size={2}>
      {exampleGroup('Default', [
        {
          caption: 'Default',
          content: headerExample('sheet-type-default', <Sheet.Header title="Seaded" variant="default" />),
        },
      ])}
      {exampleGroup('Collapsible', [
        {
          caption: 'Heading left',
          content: headerExample(
            'sheet-type-collapsible',
            <Sheet.Header title="Seaded" variant="default" collapsible />
          ),
        },
        {
          caption: 'Heading center',
          content: headerExample(
            'sheet-type-collapsible-center',
            <Sheet.Header title="Seaded" variant="default" centerTitle collapsible />
          ),
        },
      ])}
      {exampleGroup('Heading center', [
        {
          caption: 'Heading center',
          content: headerExample('sheet-type-center', <Sheet.Header title="Seaded" variant="default" centerTitle />),
        },
      ])}
      {exampleGroup('Without closing button', [
        {
          caption: 'Heading left',
          content: headerExample(
            'sheet-type-no-close',
            <Sheet.Header title="Seaded" variant="default" closeButton={false} />
          ),
        },
        {
          caption: 'Heading center',
          content: headerExample(
            'sheet-type-no-close-center',
            <Sheet.Header title="Seaded" variant="default" centerTitle closeButton={false} />
          ),
        },
      ])}
      {exampleGroup('Without handle', [
        {
          caption: 'Heading left',
          content: headerExample('sheet-type-no-handle', <Sheet.Header title="Seaded" variant="default" />, {
            showHandle: false,
          }),
        },
        {
          caption: 'Heading center',
          content: headerExample(
            'sheet-type-no-handle-center',
            <Sheet.Header title="Seaded" variant="default" centerTitle />,
            { showHandle: false }
          ),
        },
      ])}
      {exampleGroup('With custom button', [
        {
          caption: 'Secondary closing button',
          content: headerExample(
            'sheet-type-custom-close',
            <Sheet.Header
              title="Seaded"
              variant="default"
              centerTitle
              closeButton={false}
              actions={
                <Sheet.Closer>
                  <Button visualType="secondary" icon="close">
                    Sulge
                  </Button>
                </Sheet.Closer>
              }
            />
          ),
        },
      ])}
      {exampleGroup('With slot', [
        {
          caption: 'Right slot',
          label: 'Teated',
          icon: 'notifications',
          content: notificationsExample(
            <Sheet.Header title="Teated" variant="default" right={<Tag color="primary">2 uut teadet</Tag>} />
          ),
        },
        {
          caption: 'Left slot',
          label: 'Teated',
          icon: 'notifications',
          content: notificationsExample(
            <Sheet.Header title="Teated" variant="default" left={<Tag color="primary">2</Tag>} />
          ),
        },
        {
          caption: 'Left and right slots',
          label: 'Teated',
          icon: 'notifications',
          content: notificationsExample(
            <Sheet.Header
              title="Teated"
              variant="default"
              centerTitle
              left={
                <Sheet.Closer>
                  <Button visualType="neutral" size="small" icon="arrow_back">
                    Tagasi
                  </Button>
                </Sheet.Closer>
              }
              right={<Tag color="primary">2</Tag>}
            />
          ),
        },
      ])}
    </VerticalSpacing>
  ),
};

/**
 * `Sheet.Content`'s `padding` sets the sheet-wide padding scale - header, body and
 * footer tighten together: `default` or `small`. For edge-to-edge body content,
 * reach for `Sheet.Body padding="none"` instead.
 */
export const Padding: Story = {
  render: () => (
    <ExampleRow>
      {(['default', 'small'] as const).map((padding) =>
        labeledTrigger(
          `padding="${padding}"`,
          <Sheet.Content padding={padding}>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody(`sheet-padding-${padding}`)}</Sheet.Body>
            <ApplyFooter more />
          </Sheet.Content>
        )
      )}
    </ExampleRow>
  ),
};

/** `align` places the actions; `fullWidth` stretches them, with or without `right`. */
export const FooterAlignment: Story = {
  name: 'Footer alignment',
  render: () => (
    <ExampleRow>
      {(['left', 'center', 'right'] as const).map((align) =>
        labeledTrigger(
          `align="${align}"`,
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody(`sheet-footer-${align}`)}</Sheet.Body>
            <Sheet.Footer align={align}>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Rakenda</Button>
            </Sheet.Footer>
          </Sheet.Content>
        )
      )}
      {labeledTrigger(
        'fullWidth',
        <Sheet.Content>
          <Sheet.Header title="Seaded" variant="default" />
          <Sheet.Body>{settingsBody('sheet-footer-full')}</Sheet.Body>
          <ApplyFooter />
        </Sheet.Content>
      )}
      {labeledTrigger(
        'fullWidth + right',
        <Sheet.Content>
          <Sheet.Header title="Seaded" variant="default" />
          <Sheet.Body>{settingsBody('sheet-footer-full-right')}</Sheet.Body>
          <ApplyFooter more />
        </Sheet.Content>
      )}
    </ExampleRow>
  ),
};

/**
 * The sheet can collapse to just its header while the page remains interactive.
 *
 * - Enable `collapsible` on `Sheet.Header`.
 * - Set `showOverlay`, `trapFocus` and `lockScroll` to `false` on `Sheet.Content`.
 * - Set `closeOnBackdropClick` to `false` on `Sheet` so clicks outside don't close it.
 */
export const DockedPeek: Story = {
  name: 'Docked peek',
  render: () => (
    <Sheet {...dockedSheetProps}>
      <Sheet.Trigger>
        <Button iconLeft="calendar_month">Vali aeg</Button>
      </Sheet.Trigger>
      <Sheet.Content {...dockedContentProps}>
        <Sheet.Header title="Vali aeg" variant="brand" collapsible />
        <Sheet.Body>{dateTimeBody('sheet-docked')}</Sheet.Body>
        <ApplyFooter />
      </Sheet.Content>
    </Sheet>
  ),
};

/**
 * Set `snapPoints={[0.4, 0.9]}` on `Sheet.Content` to let the sheet settle at 40% or 90% of the viewport height.
 *
 * - Drag the handle and release to snap to the nearest height.
 * - Drag far enough below the lowest point to close the sheet.
 * - Collapse the sheet to show only its header; expanding restores the previous snap point.
 */
export const SnapPoints: Story = {
  name: 'Snap points',
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button iconLeft="layers">Kihid</Button>
      </Sheet.Trigger>
      <Sheet.Content snapPoints={[0.4, 0.9]}>
        <Sheet.Header title="Kihid" variant="default" collapsible />
        <Sheet.Body>
          <VerticalSpacing size={0.5}>
            {MAP_LAYERS.concat(MAP_LAYERS).map((layer, i) => (
              <Checkbox key={i} id={`snap-layer-${i}`} name={`snap-layer-${i}`} value={layer} label={layer} />
            ))}
          </VerticalSpacing>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  ),
};

/**
 * `keepMounted` keeps the panel in the DOM (hidden) while closed, so its content and state
 * persist. Type into the field, close the sheet, then reopen - the value is retained.
 */
export const KeepMounted: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button iconLeft="edit_note">Märkmed</Button>
      </Sheet.Trigger>
      <Sheet.Content keepMounted>
        <Sheet.Header title="Märkmed" variant="default" />
        <Sheet.Body>
          <TextField id="sheet-persisted-note" label="Märkus" placeholder="Kirjuta midagi…" />
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  ),
};

/** The parent owns visibility via `open` + `onToggle`. */
export const Controlled: Story = {
  render: function ControlledSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ava seaded</Button>
        <Sheet open={open} onToggle={setOpen}>
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{settingsBody('sheet-controlled')}</Sheet.Body>
            <Sheet.Footer fullWidth>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button onClick={() => setOpen(false)}>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
      </>
    );
  },
};

/**
 * `collapsed` + `onCollapsedChange` let the page collapse or expand the sheet
 * from outside - e.g. collapse it while the user draws on the map, then pop it back open once the
 * drawing is confirmed. Collapsing only hides the body, so the form keeps its values; closing removes it.
 */
export const ControlledCollapse: Story = {
  name: 'Controlled collapse',
  render: function ControlledCollapse() {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    return (
      <VerticalSpacing size={1}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button
            visualType="neutral"
            iconLeft="edit"
            onClick={() => {
              setOpen(true);
              setCollapsed(true);
            }}
          >
            Alusta joonistamist
          </Button>
          <Button visualType="neutral" iconLeft="check" onClick={() => setCollapsed(false)} disabled={!open}>
            Kinnita joonis
          </Button>
        </div>
        <Sheet
          open={open}
          onToggle={setOpen}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          {...dockedSheetProps}
        >
          <Sheet.Content {...dockedContentProps}>
            <Sheet.Header title="Uus ala" variant="brand" collapsible />
            <Sheet.Body>
              <TextField id="sheet-controlled-collapse-name" label="Ala nimi" />
            </Sheet.Body>
            <Sheet.Footer fullWidth>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
      </VerticalSpacing>
    );
  },
};

/**
 * Open **Saatja**, change the selection, then return with **Tagasi**. Both views stay mounted
 * so their form values are preserved when navigating between them.
 */
export const ContentNavigation: Story = {
  name: 'Content navigation',
  render: () => <ContentNavigationSheet />,
};

/**
 * `maxHeight` limits the sheet height. The body scrolls while the header and footer remain visible.
 */
export const ScrollableContent: Story = {
  name: 'Scrollable content',
  render: function ScrollableContent() {
    const fields = [
      'Eesnimi',
      'Perekonnanimi',
      'E-post',
      'Telefon',
      'Aadress',
      'Sihtnumber',
      'Linn',
      'Maakond',
      'Lisainfo',
    ];

    return (
      <Sheet>
        <Sheet.Trigger>
          <Button iconLeft="edit">Ava vorm</Button>
        </Sheet.Trigger>
        <Sheet.Content maxHeight="32rem">
          <Sheet.Header title="Andmete sisestamine" variant="default" />
          <Sheet.Body>
            <VerticalSpacing size={1}>
              {fields.map((label, index) => (
                <TextField key={label} id={`sheet-scroll-field-${index}`} label={label} />
              ))}
            </VerticalSpacing>
          </Sheet.Body>
          <ApplyFooter />
        </Sheet.Content>
      </Sheet>
    );
  },
};

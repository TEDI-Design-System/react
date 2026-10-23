import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { TextGroup } from '../../content/text-group/text-group';
import { Filter, FilterGroup } from '../../filter/filter';
import { Checkbox } from '../../form/checkbox/checkbox';
import { ChoiceGroup } from '../../form/choice-group/choice-group';
import { DateField } from '../../form/date-field/date-field';
import { NumberField } from '../../form/number-field/number-field';
import { Radio } from '../../form/radio/radio';
import { Search } from '../../form/search/search';
import { ISelectOption, Select } from '../../form/select/select';
import { TextField } from '../../form/textfield/textfield';
import { TimeField } from '../../form/time-field/time-field';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { Tabs } from '../../navigation/tabs/tabs';
import { Tag } from '../../tags/tag/tag';
import { Sheet } from './sheet';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.75.90?node-id=58104-185971&m=dev" target="_blank">Figma ↗</a>
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
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.75.90?node-id=58104-185971&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

const measurementTypes = [
  { id: 'sheet-measure-type-length', label: 'Mõõda joone pikkust', value: 'length' },
  { id: 'sheet-measure-type-area', label: 'Mõõda pindala', value: 'area' },
  { id: 'sheet-measure-type-radius', label: 'Mõõda ringina', value: 'radius' },
];

const MeasurementSheetContent = (): JSX.Element => (
  <>
    <Sheet.Body>
      <VerticalSpacing size={1}>
        <FilterGroup>
          <Filter text="Tasapinnaliselt" variant="secondary" defaultSelected />
          <Filter text="Ruumiliselt" variant="secondary" />
        </FilterGroup>
        <Separator spacing={0} />
        <ChoiceGroup
          id="sheet-measure-type"
          name="sheet-measure-type"
          label="Mõõtmisviis"
          hideLabel
          inputType="radio"
          variant="card"
          color="secondary"
          showIndicator
          defaultValue="length"
          items={measurementTypes}
        />
        <Separator spacing={0} />
        <VerticalSpacing size={0.5}>
          <Checkbox
            id="sheet-measure-show-lengths"
            name="show-lengths"
            value="lengths"
            label="Näita pikkusi"
            defaultChecked
          />
          <Checkbox id="sheet-measure-show-angles" name="show-angles" value="angles" label="Näita nurki" />
        </VerticalSpacing>
        <Separator spacing={0} />
        <VerticalSpacing size={0.5}>
          <div>
            <Text modifiers="small" color="secondary">
              Joone kogupikkus
            </Text>
            <Text modifiers="bold">345,234 km</Text>
          </div>
          <div>
            <Text modifiers="small" color="secondary">
              Viimane jooksev lõik
            </Text>
            <Text modifiers="bold">34,23 km</Text>
          </div>
        </VerticalSpacing>
      </VerticalSpacing>
    </Sheet.Body>
    <Sheet.Footer
      right={
        <Button visualType="neutral" icon="more_vert">
          Rohkem valikuid
        </Button>
      }
    >
      <Sheet.Closer>
        <Button visualType="secondary">Tühista</Button>
      </Sheet.Closer>
      <Button>Rakenda</Button>
    </Sheet.Footer>
  </>
);

const profileDetails = [
  { label: 'Eesnimi', value: 'Tiina' },
  { label: 'Sünniaeg', value: '15.08.1987' },
  { label: 'Perekonnanimi', value: 'Tamm' },
  { label: 'Isikukood', value: '41234567891' },
  { label: 'Dokumendi number', value: 'AS0000226' },
  { label: 'Sugu', value: 'Naine' },
];

const ProfileSheetContent = (): JSX.Element => (
  <Sheet.Body>
    <VerticalSpacing size={1}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <img
          src="sheet-profile.jpg"
          alt="Tiina Tamm"
          width={150}
          height={150}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <Button visualType="secondary" size="small">
          Vaheta pilt
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1rem' }}>
        {profileDetails.map((detail) => (
          <TextGroup key={detail.label} type="vertical" label={detail.label} value={detail.value} />
        ))}
      </div>
    </VerticalSpacing>
  </Sheet.Body>
);

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <Sheet.Trigger>
        <Button iconLeft="person">Ava profiil</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Profiil" variant="default" />
        <ProfileSheetContent />
      </Sheet.Content>
    </Sheet>
  ),
};

export const Measurement: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button iconLeft="straighten">Ava mõõtmine</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Mõõtmine" variant="brand" />
        <MeasurementSheetContent />
      </Sheet.Content>
    </Sheet>
  ),
};

const FILTER_SENDERS = [
  { id: 'mari-maasikas', label: 'Mari Maasikas' },
  { id: 'mait-muru', label: 'Mait Muru' },
  { id: 'kadri-kaasik', label: 'Kadri Kaasik' },
  { id: 'lenna-laasik', label: 'Lenna Laasik' },
  { id: 'jaan-jogi', label: 'Jaan Jõgi' },
  { id: 'kati-kask', label: 'Kati Kask' },
  { id: 'arvo-aru', label: 'Arvo Aru' },
  { id: 'tiina-tamm', label: 'Tiina Tamm' },
  { id: 'kristjan-koppel', label: 'Kristjan Koppel' },
];

// Selectable rows styled like `Dropdown.Item` (which needs a surrounding `Dropdown`, so it can't be
// reused inside a sheet directly). `--bleed` stretches a row over the body padding to the sheet edges.
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

export const HeaderNotCollapsible: Story = {
  name: 'Header is not collapsible',
  render: function HeaderNotCollapsible() {
    const [step, setStep] = useState<'filters' | 'senders'>('filters');
    const [senders, setSenders] = useState<string[]>(['mari-maasikas', 'tiina-tamm']);
    const [query, setQuery] = useState('');

    const visibleSenders = FILTER_SENDERS.filter((sender) =>
      sender.label.toLowerCase().includes(query.trim().toLowerCase())
    );

    const toggleSender = (id: string) =>
      setSenders((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

    return (
      // Reopen always starts on the filter step; the current step is kept during the close animation.
      <Sheet
        onToggle={(open) => {
          if (open) setStep('filters');
        }}
      >
        <style>{exampleRowStyles}</style>
        <Sheet.Trigger>
          <Button visualType="neutral" iconLeft="tune">
            Ava filtrid
          </Button>
        </Sheet.Trigger>
        <Sheet.Content>
          {/* The header stays "Filtreeri" across both steps; back navigation lives in the footer. */}
          <Sheet.Header title="Filtreeri" variant="default" />
          {step === 'filters' ? (
            <>
              <Sheet.Body>
                <VerticalSpacing size={1}>
                  {/* The whole "Saatja" row is the clickable target (per Figma); it drills into the
                      sender-selection step. Styled as a dropdown item that bleeds to the sheet edges. */}
                  <button
                    type="button"
                    onClick={() => setStep('senders')}
                    className="sheet-example-row sheet-example-row--bleed"
                  >
                    <Text>Saatja</Text>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {senders.length > 0 && <Tag color="primary">{senders.length}</Tag>}
                      <Icon name="arrow_forward" color="brand" />
                    </span>
                  </button>
                  <Separator spacing={0} />
                  <ChoiceGroup
                    id="sheet-default-status"
                    name="sheet-default-status"
                    label="Kirjade olek"
                    hideLabel
                    inputType="radio"
                    defaultValue="all"
                    items={[
                      { id: 'sheet-default-status-all', label: 'Kõik', value: 'all' },
                      { id: 'sheet-default-status-unread', label: 'Ainult lugemata', value: 'unread' },
                    ]}
                  />
                  <Separator spacing={0} />
                  <ChoiceGroup
                    id="sheet-default-sort"
                    name="sheet-default-sort"
                    label="Järjestus"
                    hideLabel
                    inputType="radio"
                    defaultValue="unread-top"
                    items={[
                      { id: 'sheet-default-sort-unread', label: 'Lugemata kõige üleval', value: 'unread-top' },
                      { id: 'sheet-default-sort-date', label: 'Kuupäeva järgi', value: 'date' },
                    ]}
                  />
                </VerticalSpacing>
              </Sheet.Body>
              <Sheet.Footer
                right={
                  <Button visualType="neutral" icon="more_vert">
                    Rohkem valikuid
                  </Button>
                }
              >
                <Sheet.Closer>
                  <Button visualType="secondary">Tühista</Button>
                </Sheet.Closer>
                <Button>Rakenda</Button>
              </Sheet.Footer>
            </>
          ) : (
            <>
              <Sheet.Body padding="none">
                <div style={{ padding: '1rem' }}>
                  <Search id="filter-senders-search" label="Saatja" value={query} onChange={setQuery} />
                </div>
                {visibleSenders.map((sender, index) => {
                  const isSelected = senders.includes(sender.id);
                  return (
                    <Fragment key={sender.id}>
                      {index > 0 && <Separator spacing={0} />}
                      {/* Plain selectable name row - a check marks the chosen senders. */}
                      <button
                        type="button"
                        onClick={() => toggleSender(sender.id)}
                        aria-pressed={isSelected}
                        className="sheet-example-row"
                      >
                        <Text>{sender.label}</Text>
                        {isSelected && <Icon name="check" color="brand" />}
                      </button>
                    </Fragment>
                  );
                })}
              </Sheet.Body>
              <Sheet.Footer align="center">
                <Button visualType="link" iconLeft="arrow_back" onClick={() => setStep('filters')}>
                  Tagasi
                </Button>
              </Sheet.Footer>
            </>
          )}
        </Sheet.Content>
      </Sheet>
    );
  },
};

export const Collapsible: Story = {
  name: 'Header is collapsible',
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button visualType="neutral" iconLeft="calendar_month">
          Vali aeg
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Vali aeg" variant="brand" collapsible />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <DateField id="sheet-collapsible-date" label="Kuupäev" />
            <TimeField id="sheet-collapsible-time" label="Aeg" />
            <Checkbox id="sheet-collapsible-reminder" name="reminder" value="reminder" label="Lisa meeldetuletus" />
          </VerticalSpacing>
        </Sheet.Body>
        <Sheet.Footer
          right={
            <Button visualType="neutral" icon="more_vert">
              Rohkem valikuid
            </Button>
          }
        >
          <Sheet.Closer>
            <Button visualType="secondary">Tühista</Button>
          </Sheet.Closer>
          <Button>Rakenda</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  ),
};

export const WithoutActionButtons: Story = {
  name: 'Without actions buttons',
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava seaded</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Seaded" variant="default" />
        <Sheet.Body>
          <VerticalSpacing size={0.5}>
            <Checkbox
              id="sheet-show-lengths"
              name="show-lengths"
              value="lengths"
              label="Näita pikkusi"
              defaultChecked
            />
            <Separator spacing={0} />
            <Checkbox id="sheet-show-angles" name="show-angles" value="angles" label="Näita nurki" />
          </VerticalSpacing>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  ),
};

type HeaderTriggerVariant = 'primary' | 'secondary' | 'neutral';

interface TriggerSpec {
  /** Button text - hints at what the sheet opens (the buttons are absent from Figma, so invented). */
  label?: string;
  /** Leading Material icon on the trigger button. */
  icon?: string;
  visualType?: HeaderTriggerVariant;
}

/**
 * A sheet trigger with the demoed example / functionality named in a caption above the button. The
 * trigger buttons are absent from Figma, so they carry an invented, content-hinting Estonian label +
 * icon while the caption documents the demo - the same label-above pattern is reused across the
 * gallery stories below.
 */
const labeledTrigger = (caption: string, content: JSX.Element, trigger: TriggerSpec = {}) => {
  const { label = 'Ava seaded', icon = 'tune', visualType = 'secondary' } = trigger;
  return (
    <VerticalSpacing size={0.25} key={caption}>
      <Text modifiers="small" color="secondary">
        {caption}
      </Text>
      <Sheet>
        <Sheet.Trigger>
          <Button visualType={visualType} iconLeft={icon}>
            {label}
          </Button>
        </Sheet.Trigger>
        {content}
      </Sheet>
    </VerticalSpacing>
  );
};

interface HeaderExample extends TriggerSpec {
  caption: string;
  content: JSX.Element;
}

/**
 * One labelled "example list" panel: a bordered card with a shared trigger-button style, so each
 * subgroup reads as a distinct segment rather than one flat wall of identical buttons. Pass a
 * per-example `visualType` to override the group default.
 */
const exampleGroup = (label: string, visualType: HeaderTriggerVariant, examples: HeaderExample[]) => (
  <VerticalSpacing size={0.5} key={label}>
    <Text modifiers="bold">{label}</Text>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '0.5rem',
        padding: '1rem',
        border: '1px solid var(--general-border-primary)',
        borderRadius: '0.5rem',
      }}
    >
      {examples.map((ex) =>
        labeledTrigger(ex.caption, ex.content, {
          label: ex.label,
          icon: ex.icon,
          visualType: ex.visualType ?? visualType,
        })
      )}
    </div>
  </VerticalSpacing>
);

// Each header variant uses the same map-layer example so its trigger, title and body agree.
const headerBody = (
  <VerticalSpacing size={0.5}>
    <Checkbox id="sheet-body-hybrid" name="sheet-body-hybrid" value="hybrid" label="Hübriidkaart" defaultChecked />
    <Separator spacing={0} />
    <Checkbox id="sheet-body-relief" name="sheet-body-relief" value="relief" label="Reljeef" />
    <Separator spacing={0} />
    <Checkbox id="sheet-body-cadastre" name="sheet-body-cadastre" value="cadastre" label="Katastriüksused" />
  </VerticalSpacing>
);

// Leading (`left`) and trailing (`right`) header content, matching the Figma header's left / right slots.
const leadingIconHeader = (
  <Sheet.Content>
    <Sheet.Header title="Kaardikihid" variant="default" left={<Icon name="layers" color="brand" />} />
    <Sheet.Body>{headerBody}</Sheet.Body>
  </Sheet.Content>
);

const leadingIconAndCountHeader = (
  <Sheet.Content>
    <Sheet.Header
      title="Kaardikihid"
      variant="default"
      centerTitle
      left={<Icon name="layers" color="brand" />}
      right={<Tag color="primary">3</Tag>}
    />
    <Sheet.Body>{headerBody}</Sheet.Body>
  </Sheet.Content>
);

export const Header: Story = {
  render: () => (
    <VerticalSpacing size={1.5}>
      {exampleGroup('Variant', 'secondary', [
        {
          caption: 'Primary',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        {
          caption: 'Brand',
          label: 'Kaardikihid',
          icon: 'layers',
          visualType: 'primary',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="brand" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
      ])}
      {exampleGroup('Type', 'primary', [
        {
          caption: 'Default',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        {
          caption: 'Collapsible',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" collapsible />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
      ])}
      {exampleGroup('Title', 'secondary', [
        {
          caption: 'Title center',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" centerTitle />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
      ])}
      {exampleGroup('Closing button', 'neutral', [
        {
          caption: 'Without closing button',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" centerTitle closeButton={false} />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        {
          caption: 'Different closing button',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header
                title="Kaardikihid"
                variant="default"
                centerTitle
                closeButton={false}
                right={
                  <Sheet.Closer>
                    <Button visualType="secondary" icon="close">
                      Sulge
                    </Button>
                  </Sheet.Closer>
                }
              />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
      ])}
      {exampleGroup('Actions & slots', 'secondary', [
        {
          caption: 'Extra action',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header
                title="Kaardikihid"
                variant="default"
                collapsible
                actions={
                  <Button visualType="neutral" size="small" icon="fullscreen">
                    Täisekraan
                  </Button>
                }
              />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        {
          caption: 'Right slot',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content>
              <Sheet.Header title="Kaardikihid" variant="default" right={<Tag color="primary">3</Tag>} />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        { caption: 'Left slot', label: 'Kaardikihid', icon: 'layers', content: leadingIconHeader },
        { caption: 'Left and right slots', label: 'Kaardikihid', icon: 'layers', content: leadingIconAndCountHeader },
      ])}
      {exampleGroup('Handle', 'neutral', [
        {
          caption: 'With handle',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content showHandle>
              <Sheet.Header title="Kaardikihid" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
        {
          caption: 'Without handle',
          label: 'Kaardikihid',
          icon: 'layers',
          content: (
            <Sheet.Content showHandle={false}>
              <Sheet.Header title="Kaardikihid" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          ),
        },
      ])}
    </VerticalSpacing>
  ),
};

export const FooterActions: Story = {
  render: () => {
    const alignments = ['left', 'center', 'right'] as const;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.5rem' }}>
        {alignments.map((align) =>
          labeledTrigger(
            `align="${align}"`,
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
              <Sheet.Footer align={align}>
                <Sheet.Closer>
                  <Button visualType="secondary">Tühista</Button>
                </Sheet.Closer>
                <Button>Salvesta</Button>
              </Sheet.Footer>
            </Sheet.Content>,
            { label: 'Vaate seaded', icon: 'tune' }
          )
        )}
        {labeledTrigger(
          'fullWidth',
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{headerBody}</Sheet.Body>
            <Sheet.Footer fullWidth>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>,
          { label: 'Vaate seaded', icon: 'tune' }
        )}
        {labeledTrigger(
          'split (right)',
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{headerBody}</Sheet.Body>
            <Sheet.Footer
              right={
                <Button visualType="neutral" icon="more_vert">
                  Rohkem valikuid
                </Button>
              }
            >
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>,
          { label: 'Vaate seaded', icon: 'tune' }
        )}
      </div>
    );
  },
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.5rem' }}>
      {(['default', 'card', 'none'] as const).map((radius) =>
        labeledTrigger(
          `radius="${radius}"`,
          <Sheet.Content radius={radius}>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{headerBody}</Sheet.Body>
          </Sheet.Content>,
          { label: 'Kaardi stiil', icon: 'map' }
        )
      )}
      {labeledTrigger(
        'none → card @ md',
        <Sheet.Content radius="none" md={{ radius: 'card' }}>
          <Sheet.Header title="Seaded" variant="default" />
          <Sheet.Body>{headerBody}</Sheet.Body>
        </Sheet.Content>,
        { label: 'Kaardi stiil', icon: 'map' }
      )}
    </div>
  ),
};

/**
 * **Padding.** `Sheet.Content`'s `padding` sets the sheet-wide padding scale - header, body and
 * footer tighten together: `default` (1rem) or `small` (0.5rem). For edge-to-edge body content,
 * reach for `Sheet.Body padding="none"` instead.
 */
export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '0.5rem' }}>
      {(['default', 'small'] as const).map((padding) =>
        labeledTrigger(
          `padding="${padding}"`,
          <Sheet.Content padding={padding}>
            <Sheet.Header title="Seaded" variant="default" right={<Tag color="primary">2</Tag>} />
            <Sheet.Body>{headerBody}</Sheet.Body>
            <Sheet.Footer>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>,
          { label: 'Vaate seaded', icon: 'tune' }
        )
      )}
    </div>
  ),
};

export const EdgeToEdge: Story = {
  name: 'Edge-to-edge body',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Sheet key="actions">
        <Sheet.Trigger>
          <Button visualType="secondary">Tegevused</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Tegevused" variant="default" />
          <Sheet.Body padding="none">
            {/* Edge-to-edge action list: full-width neutral buttons, left-aligned (icon + label) so
                the rows read like menu items. Neutral buttons have no horizontal padding, so add the
                sheet's standard 1rem inset to keep the content off the edge. */}
            {[
              { icon: 'download', label: 'Laadi alla' },
              { icon: 'share', label: 'Jaga' },
              { icon: 'delete', label: 'Kustuta' },
            ].map((action, index) => (
              <Fragment key={action.label}>
                {index > 0 && <Separator spacing={0} />}
                <Sheet.Closer>
                  <Button
                    visualType="neutral"
                    fullWidth
                    iconLeft={action.icon}
                    style={{ justifyContent: 'flex-start', paddingLeft: '1rem', paddingRight: '1rem' }}
                  >
                    {action.label}
                  </Button>
                </Sheet.Closer>
              </Fragment>
            ))}
          </Sheet.Body>
        </Sheet.Content>
      </Sheet>

      <Sheet key="tabs">
        <Sheet.Trigger>
          <Button visualType="secondary">Kaardikihtide rühmad</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Kaardikihtide rühmad" variant="default" />
          <Sheet.Body padding="none">
            <Tabs defaultValue="sheet-tab-terrain">
              <Tabs.List aria-label="Kaardikihtide rühmad">
                <Tabs.Trigger id="sheet-tab-terrain">Maastik</Tabs.Trigger>
                <Tabs.Trigger id="sheet-tab-other">Muu</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content id="sheet-tab-terrain">
                <div style={{ padding: '1rem' }}>
                  <VerticalSpacing size={0.5}>
                    <Checkbox
                      id="layer-hybrid"
                      name="layer-hybrid"
                      value="hybrid"
                      label="Hübriidkaart"
                      defaultChecked
                    />
                    <Checkbox id="layer-relief" name="layer-relief" value="relief" label="Reljeef" />
                    <Checkbox id="layer-cadastre" name="layer-cadastre" value="cadastre" label="Katastriüksused" />
                  </VerticalSpacing>
                </div>
              </Tabs.Content>
              <Tabs.Content id="sheet-tab-other">
                <div style={{ padding: '1rem' }}>
                  <VerticalSpacing size={0.5}>
                    <Checkbox id="layer-address" name="layer-address" value="address" label="Aadressandmed" />
                    <Checkbox id="layer-limits" name="layer-limits" value="limits" label="Kitsendused" />
                  </VerticalSpacing>
                </div>
              </Tabs.Content>
            </Tabs>
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Closer>
              <Button visualType="secondary">Tühista</Button>
            </Sheet.Closer>
            <Button>Rakenda</Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>

      <LayerListSheet key="teemakaart" />
    </div>
  ),
};

interface LayerOption {
  id: string;
  label: string;
  description?: string;
}

const NATURE_LAYERS: LayerOption[] = [
  {
    id: 'maainfo',
    label: 'Maainfo',
    description:
      'Maainfo kaardirakenduse temaatiline andmekihtide kogum, mis pakub teavet maaomandi, maakasutuse ja maaparanduse kohta.',
  },
  { id: 'geo-400k', label: '1:400 000 geoloogiline kaart' },
  { id: 'geo-50k', label: '1:50 000 geoloogiline kaart' },
  { id: 'karuputk', label: 'Karuputk' },
  {
    id: 'kaitsealad',
    label: 'Kaitsealad',
    description: 'Kaitsealade piirid ja vööndid koos kaitsekorra kirjeldusega.',
  },
  { id: 'jahikaart', label: 'Jahikaart' },
  { id: 'looduskaitse', label: 'Looduskaitse' },
];

/**
 * A searchable, single-select layer list: edge-to-edge rows with a radio + label, an expandable
 * **Loe lisaks** description per row and the selected row highlighted. Used in `Edge-to-edge body`.
 */
function LayerListSheet(): JSX.Element {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('maainfo');
  const [expanded, setExpanded] = useState<string | null>('kaitsealad');

  const visible = NATURE_LAYERS.filter((layer) => layer.label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <Sheet>
      <Sheet.Trigger>
        <Button visualType="secondary">Teemakaart</Button>
      </Sheet.Trigger>
      {/* minHeight keeps the sheet from collapsing as the search narrows the result list - the dev
          opts into a stable height instead of the sheet shrinking to its content. */}
      <Sheet.Content minHeight="60dvh">
        <Sheet.Header title="Teemakaart" variant="default" />
        <Sheet.Body padding="none">
          <div style={{ padding: '1rem' }}>
            <Search
              id="teemakaart-search"
              label="Otsi kihti"
              hideLabel
              placeholder="Otsi"
              value={query}
              onChange={setQuery}
            />
          </div>
          <div style={{ padding: '0 1rem 0.5rem' }}>
            <Text element="p" modifiers={['small', 'bold']} color="secondary">
              LOODUS JA LOOMAD
            </Text>
          </div>
          {visible.map((layer, index) => {
            const isExpanded = expanded === layer.id;
            return (
              <Fragment key={layer.id}>
                {index > 0 && <Separator spacing={0} />}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.5rem 1rem',
                    background: selected === layer.id ? 'var(--general-surface-brand-tertiary)' : undefined,
                  }}
                >
                  <Radio
                    id={`teemakaart-${layer.id}`}
                    name="teemakaart-layer"
                    value={layer.id}
                    label={layer.label}
                    checked={selected === layer.id}
                    onChange={(value) => setSelected(String(value))}
                  />
                  {layer.description && (
                    <Button
                      visualType="link"
                      iconRight={isExpanded ? 'expand_less' : 'expand_more'}
                      onClick={() => setExpanded(isExpanded ? null : layer.id)}
                    >
                      {isExpanded ? 'Sulge' : 'Loe lisaks'}
                    </Button>
                  )}
                </div>
                {isExpanded && layer.description && (
                  // Top padding so the expanded detail isn't cramped against the row that toggles it.
                  <div style={{ padding: '0.5rem 1rem 1rem' }}>
                    <Text element="p" modifiers="small" color="secondary">
                      {layer.description}
                    </Text>
                  </div>
                )}
              </Fragment>
            );
          })}
        </Sheet.Body>
        <Sheet.Footer
          right={
            <Button visualType="neutral" icon="more_vert">
              Rohkem valikuid
            </Button>
          }
        >
          <Sheet.Closer>
            <Button visualType="secondary">Tühista</Button>
          </Sheet.Closer>
          <Button>Rakenda</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  );
}

const MAP_LAYERS = ['Hübriidkaart', 'Reljeef', 'Katastriüksused', 'Kitsendused', 'Aadressandmed'];

/** Controlled open state - the parent owns visibility via `open` + `onToggle`. */
export const Controlled: Story = {
  render: function ControlledSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ava juhitav paan</Button>
        <Sheet open={open} onToggle={setOpen}>
          <Sheet.Content>
            <Sheet.Header title="Juhitav" variant="default" />
            <Sheet.Body>
              <Text>Paani avatust juhib vanemkomponent `open` / `onToggle` kaudu.</Text>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button onClick={() => setOpen(false)}>Sulge</Button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
      </>
    );
  },
};

/**
 * **Snap points.** `snapPoints={[0.4, 0.9]}` lets the bottom sheet rest at 40% or 90% of the
 * viewport. Drag the handle to move between them - releasing snaps to the nearest, and dragging
 * below the lowest point dismisses. Collapsing the header shrinks the sheet to its header; expanding
 * returns it to the snap point it was at.
 */
export const SnapPoints: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava kihid</Button>
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
 * **`keepMounted`.** The panel stays in the DOM (hidden) while closed, so its content and state
 * persist. Type into the field, close the sheet, then reopen - the value is retained.
 */
export const KeepMounted: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava märkmed</Button>
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

/**
 * **Docked peek.** With `showOverlay`, `trapFocus` and `lockScroll` off (plus
 * `closeOnBackdropClick={false}`), a `collapsible` sheet stays docked as a header peek while the page
 * behind stays fully usable and clicks don't dismiss it (a non-modal sheet).
 */
export const DockedPeek: Story = {
  name: 'Docked peek',
  render: function DockedPeek() {
    return (
      <VerticalSpacing size={1}>
        <Sheet closeOnBackdropClick={false}>
          <Sheet.Trigger>
            <Button>Ava kihid</Button>
          </Sheet.Trigger>
          <Sheet.Content showOverlay={false} trapFocus={false} lockScroll={false}>
            <Sheet.Header title="Kihid" variant="brand" collapsible />
            <Sheet.Body>
              <VerticalSpacing size={0.5}>
                <Checkbox id="np-hybrid" name="np-hybrid" value="hybrid" label="Hübriidkaart" defaultChecked />
                <Checkbox id="np-relief" name="np-relief" value="relief" label="Reljeef" />
                <Checkbox id="np-cadastre" name="np-cadastre" value="cadastre" label="Katastriüksused" />
              </VerticalSpacing>
            </Sheet.Body>
          </Sheet.Content>
        </Sheet>
      </VerticalSpacing>
    );
  },
};

/**
 * **Controlled collapse.** `collapsed` + `onCollapsedChange` let the page collapse or expand the sheet
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
          closeOnBackdropClick={false}
        >
          <Sheet.Content showOverlay={false} trapFocus={false} lockScroll={false}>
            <Sheet.Header title="Uus ala" variant="brand" collapsible />
            <Sheet.Body>
              <TextField id="sheet-controlled-collapse-name" label="Ala nimi" />
            </Sheet.Body>
            <Sheet.Footer>
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

const FOREST_TYPES: ISelectOption[] = [
  { value: 'commercial', label: 'Majandusmets' },
  { value: 'protected', label: 'Kaitsemets' },
];
const SPECIES: ISelectOption[] = [
  { value: 'pine', label: 'Mänd' },
  { value: 'spruce', label: 'Kuusk' },
  { value: 'birch', label: 'Kask' },
];
const USES: ISelectOption[] = [
  { value: 'thinning', label: 'Harvendusraie' },
  { value: 'clear', label: 'Lageraie' },
];
const PLACES: ISelectOption[] = [
  { value: 'tartu', label: 'Tartumaa' },
  { value: 'harju', label: 'Harjumaa' },
];

/**
 * A larger desktop layout: a table-style input view inside the sheet. `maxHeight` caps the panel, so
 * the body scrolls once enough **Lisa rida** rows are added instead of the sheet growing without
 * bound. The header carries an extra neutral icon-only action between collapse and close, and the footer
 * groups the **Kopeeri** and **Lisa rida** links together with the **Tühista** / **Salvesta** actions.
 */
export const DesktopTable: Story = {
  name: 'Desktop table input',
  render: function DesktopTable() {
    const [rows, setRows] = useState([0, 1, 2, 3]);
    const columnStyle = { display: 'grid', gridTemplateColumns: 'repeat(8, minmax(6rem, 1fr))', gap: '0.5rem' };

    return (
      <Sheet>
        <Sheet.Trigger>
          <Button>Ava metsateatised</Button>
        </Sheet.Trigger>
        {/* maxHeight caps the panel so the table body scrolls once more rows are added. */}
        <Sheet.Content radius="none" maxHeight="32rem">
          <Sheet.Header
            title="Minu üksuste metsateatised"
            variant="default"
            collapsible
            actions={
              <Button visualType="neutral" size="small" icon="drag_handle">
                Muuda suurust
              </Button>
            }
          />
          <Sheet.Body>
            <VerticalSpacing size={0.75}>
              {rows.map((row) => (
                <div key={row} style={columnStyle}>
                  <Select id={`mt-type-${row}`} label="Metsa tüüp" options={FOREST_TYPES} placeholder="Vali" />
                  <Select id={`mt-species-${row}`} label="Puuliik" options={SPECIES} placeholder="Vali" />
                  <NumberField id={`mt-age-${row}`} label="Vanus" defaultValue={1} min={0} />
                  <TextField id={`mt-area-${row}`} label="Pindala" />
                  <NumberField id={`mt-height-${row}`} label="Kõrgus" defaultValue={1} min={0} />
                  <NumberField id={`mt-density-${row}`} label="Tihedus" defaultValue={1} min={0} />
                  <Select id={`mt-use-${row}`} label="Kasutus" options={USES} placeholder="Vali" />
                  <Select id={`mt-place-${row}`} label="Koht" options={PLACES} placeholder="Vali" />
                </div>
              ))}
            </VerticalSpacing>
          </Sheet.Body>
          <Sheet.Footer align="right">
            <Button visualType="neutral" iconLeft="content_copy">
              Kopeeri
            </Button>
            <Button
              visualType="neutral"
              iconLeft="add"
              onClick={() => setRows((prev) => [...prev, prev.length ? Math.max(...prev) + 1 : 0])}
            >
              Lisa rida
            </Button>
            <Sheet.Closer>
              <Button visualType="secondary">Tühista</Button>
            </Sheet.Closer>
            <Button>Salvesta</Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
  },
};

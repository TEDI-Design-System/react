import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
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
        <Separator spacing={0} />
        <VerticalSpacing size={0.75}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button visualType="secondary" iconLeft="edit">
              Muuda
            </Button>
            <Button visualType="secondary" iconLeft="delete">
              Kustuta ükshaaval
            </Button>
          </div>
        </VerticalSpacing>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Button visualType="link" iconLeft="undo">
            Võta tagasi
          </Button>
          <Button visualType="link" iconRight="redo">
            Võta edasi
          </Button>
        </div>
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

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <Sheet.Trigger>
        <Button>Ava mõõtmine</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Mõõtmine" variant="brand" />
        <MeasurementSheetContent />
      </Sheet.Content>
    </Sheet>
  ),
};

export const HeaderNotCollapsible: Story = {
  name: 'Header is not collapsible',
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava filtrid</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Filtreerimine" variant="default" />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <Text>Saatja</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag color="primary">2</Tag>
                <Button visualType="neutral" icon="arrow_forward">
                  Vali saatja
                </Button>
              </div>
            </div>
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
      </Sheet.Content>
    </Sheet>
  ),
};

export const Collapsible: Story = {
  name: 'Header is collapsible',
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava mõõtmine</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Mõõtmine" variant="brand" collapsible />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <DateField id="sheet-collapsible-date" label="Kuupäev" />
            <TimeField id="sheet-collapsible-time" label="Aeg" />
            <Checkbox id="sheet-collapsible-shadows" name="shadows" value="shadows" label="Hoonete varjud" />
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
            <Checkbox id="sheet-show-angles" name="show-angles" value="angles" label="Näita nurki" />
          </VerticalSpacing>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  ),
};

const headerExample = (trigger: string, content: JSX.Element) => (
  <Sheet key={trigger}>
    <Sheet.Trigger>
      <Button visualType="secondary">{trigger}</Button>
    </Sheet.Trigger>
    {content}
  </Sheet>
);

const headerBody = <Text>Kaardikihtide ja mõõtühikute seaded.</Text>;

export const Header: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Variant</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {headerExample(
            'Primary',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Brand',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="brand" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Type</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {headerExample(
            'Default',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Collapsible',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" collapsible />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Title center',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" centerTitle />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Without closing button',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" centerTitle closeButton={false} />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Different closing button',
            <Sheet.Content>
              <Sheet.Header
                title="Seaded"
                variant="default"
                centerTitle
                closeButton={false}
                slot={
                  <Sheet.Closer>
                    <Button visualType="secondary" icon="close">
                      Sulge
                    </Button>
                  </Sheet.Closer>
                }
              />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Extra action',
            <Sheet.Content>
              <Sheet.Header
                title="Seaded"
                variant="default"
                collapsible
                slot={
                  <Button visualType="neutral" icon="fullscreen">
                    Täisekraan
                  </Button>
                }
              />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'With slot',
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" slot={<Tag color="primary">2</Tag>} />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'With handle',
            <Sheet.Content showHandle>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
          {headerExample(
            'Without handle',
            <Sheet.Content showHandle={false}>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
            </Sheet.Content>
          )}
        </div>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};

export const FooterActions: Story = {
  render: () => {
    const alignments = ['left', 'center', 'right'] as const;
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {alignments.map((align) => (
          <Sheet key={align}>
            <Sheet.Trigger>
              <Button visualType="secondary">align=&quot;{align}&quot;</Button>
            </Sheet.Trigger>
            <Sheet.Content>
              <Sheet.Header title="Seaded" variant="default" />
              <Sheet.Body>{headerBody}</Sheet.Body>
              <Sheet.Footer align={align}>
                <Sheet.Closer>
                  <Button visualType="secondary">Tühista</Button>
                </Sheet.Closer>
                <Button>Salvesta</Button>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>
        ))}
        <Sheet key="full-width">
          <Sheet.Trigger>
            <Button visualType="secondary">fullWidth</Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{headerBody}</Sheet.Body>
            <Sheet.Footer fullWidth>
              <Sheet.Closer>
                <Button visualType="secondary">Tühista</Button>
              </Sheet.Closer>
              <Button>Salvesta</Button>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>
        <Sheet key="split">
          <Sheet.Trigger>
            <Button visualType="secondary">split (right)</Button>
          </Sheet.Trigger>
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
          </Sheet.Content>
        </Sheet>
      </div>
    );
  },
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {(['default', 'card', 'none'] as const).map((radius) => (
        <Sheet key={radius}>
          <Sheet.Trigger>
            <Button visualType="secondary">radius=&quot;{radius}&quot;</Button>
          </Sheet.Trigger>
          <Sheet.Content radius={radius}>
            <Sheet.Header title="Seaded" variant="default" />
            <Sheet.Body>{headerBody}</Sheet.Body>
          </Sheet.Content>
        </Sheet>
      ))}
      <Sheet key="responsive">
        <Sheet.Trigger>
          <Button visualType="secondary">none → card @ md</Button>
        </Sheet.Trigger>
        <Sheet.Content radius="none" md={{ radius: 'card' }}>
          <Sheet.Header title="Seaded" variant="default" />
          <Sheet.Body>{headerBody}</Sheet.Body>
        </Sheet.Content>
      </Sheet>
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
            <Sheet.Closer>
              <Button visualType="neutral" fullWidth iconLeft="download">
                Laadi alla
              </Button>
            </Sheet.Closer>
            <Separator spacing={0} />
            <Sheet.Closer>
              <Button visualType="neutral" fullWidth iconLeft="share">
                Jaga
              </Button>
            </Sheet.Closer>
            <Separator spacing={0} />
            <Sheet.Closer>
              <Button visualType="neutral" fullWidth iconLeft="delete">
                Kustuta
              </Button>
            </Sheet.Closer>
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
      <Sheet.Content>
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
                  <div style={{ padding: '0 1rem 1rem' }}>
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
 * below the lowest point dismisses.
 */
export const SnapPoints: Story = {
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava kihid</Button>
      </Sheet.Trigger>
      <Sheet.Content snapPoints={[0.4, 0.9]}>
        <Sheet.Header title="Kihid" variant="default" />
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
 * **Non-modal peek.** `showOverlay`, `trapFocus` and `lockScroll` off (plus
 * `closeOnBackdropClick={false}`) keep a `collapsible` sheet docked as a header peek while the page
 * behind stays usable and clicks don't dismiss it.
 */
export const NonModalPeek: Story = {
  render: function NonModalPeek() {
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
 * A larger desktop layout: a table-style input view inside the sheet. The header carries an extra
 * fullscreen action alongside collapse / close, and the footer splits an **Lisa rida** link on the
 * start edge from the grouped **Tühista** / **Salvesta** actions on the end.
 */
export const DesktopTable: Story = {
  name: 'Desktop table input',
  render: function DesktopTable() {
    const [rows, setRows] = useState([0, 1, 2]);
    const columnStyle = { display: 'grid', gridTemplateColumns: 'repeat(8, minmax(6rem, 1fr))', gap: '0.5rem' };

    return (
      <Sheet>
        <Sheet.Trigger>
          <Button>Ava metsateatised</Button>
        </Sheet.Trigger>
        <Sheet.Content radius="none">
          <Sheet.Header
            title="Minu üksuste metsateatised"
            variant="default"
            collapsible
            slot={
              <Button visualType="neutral" icon="fullscreen">
                Täisekraan
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
          <Sheet.Footer
            right={
              <>
                <Sheet.Closer>
                  <Button visualType="secondary">Tühista</Button>
                </Sheet.Closer>
                <Button>Salvesta</Button>
              </>
            }
          >
            <Button
              visualType="link"
              iconLeft="add"
              onClick={() => setRows((prev) => [...prev, prev.length ? Math.max(...prev) + 1 : 0])}
            >
              Lisa rida
            </Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    );
  },
};

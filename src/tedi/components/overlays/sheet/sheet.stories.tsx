import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Checkbox } from '../../form/checkbox/checkbox';
import { ChoiceGroup } from '../../form/choice-group/choice-group';
import { DateField } from '../../form/date-field/date-field';
import { Search } from '../../form/search/search';
import { TextField } from '../../form/textfield/textfield';
import { TimeField } from '../../form/time-field/time-field';
import { Toggle } from '../../form/toggle/toggle';
import { VerticalSpacing } from '../../layout/vertical-spacing';
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

const demoBody = (
  <VerticalSpacing size={0.5}>
    <Text>Hinnatsoon</Text>
    <Text>EUREF-EST97</Text>
    <Text>UTM 34N võrk</Text>
  </VerticalSpacing>
);

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <Sheet.Trigger>
        <Button>Ava filtrid</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Filtreerimine" variant="default" />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <Text modifiers="bold">Saatja</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Tag color="primary">2</Tag>
                <Button visualType="neutral" icon="arrow_forward" aria-label="Vali saatja" />
              </div>
            </div>
            <ChoiceGroup
              id="sheet-filter-status"
              name="sheet-filter-status"
              label="Kirjade olek"
              hideLabel
              inputType="radio"
              defaultValue="all"
              items={[
                { label: 'Kõik', value: 'all' },
                { label: 'Ainult lugemata', value: 'unread' },
              ]}
            />
            <ChoiceGroup
              id="sheet-filter-sort"
              name="sheet-filter-sort"
              label="Järjestus"
              hideLabel
              inputType="radio"
              defaultValue="unread-top"
              items={[
                { label: 'Lugemata kõige üleval', value: 'unread-top' },
                { label: 'Kuupäeva järgi', value: 'date' },
              ]}
            />
          </VerticalSpacing>
        </Sheet.Body>
        <Sheet.Footer right={<Button visualType="neutral" icon="more_vert" aria-label="Rohkem valikuid" />}>
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
  render: () => (
    <Sheet>
      <Sheet.Trigger>
        <Button>Ava mõõtmine</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header title="Mõõtmine" variant="brand" collapsible />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <DateField id="sheet-measure-date" label="Kuupäev" />
            <TimeField id="sheet-measure-time" label="Aeg" />
            <Checkbox id="sheet-measure-shadows" name="shadows" value="shadows" label="Hoonete varjud" />
          </VerticalSpacing>
        </Sheet.Body>
        <Sheet.Footer right={<Button visualType="neutral" icon="more_vert" aria-label="Rohkem valikuid" />}>
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

const headerExample = (trigger: string, header: JSX.Element) => (
  <Sheet key={trigger}>
    <Sheet.Trigger>
      <Button visualType="secondary">{trigger}</Button>
    </Sheet.Trigger>
    <Sheet.Content>
      {header}
      <Sheet.Body>{demoBody}</Sheet.Body>
    </Sheet.Content>
  </Sheet>
);

export const Header: Story = {
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Variant</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {headerExample('Primary', <Sheet.Header title="Seaded" variant="default" />)}
          {headerExample('Brand', <Sheet.Header title="Seaded" variant="brand" />)}
        </div>
      </VerticalSpacing>

      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Type</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {headerExample('Default', <Sheet.Header title="Seaded" variant="default" />)}
          {headerExample('Collapsible', <Sheet.Header title="Seaded" variant="default" collapsible />)}
          {headerExample('Title center', <Sheet.Header title="Seaded" variant="default" centerTitle />)}
          {headerExample(
            'Without closing button',
            <Sheet.Header title="Seaded" variant="default" centerTitle closeButton={false} />
          )}
          {headerExample(
            'Different closing button',
            <Sheet.Header
              title="Seaded"
              variant="default"
              centerTitle
              closeButton={false}
              slot={
                <Sheet.Closer>
                  <Button visualType="neutral" icon="close" aria-label="Sulge" />
                </Sheet.Closer>
              }
            />
          )}
          {headerExample(
            'With slot',
            <Sheet.Header title="Seaded" variant="default" slot={<Tag color="primary">2</Tag>} />
          )}
          {headerExample('With handle', <Sheet.Header title="Seaded" variant="default" />)}
        </div>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};

/** Controlled open state — the parent owns visibility via `open` + `onToggle`. */
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
 * viewport. Drag the handle to move between them — releasing snaps to the nearest, and dragging
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
            {Array.from({ length: 20 }, (_, i) => (
              <Text key={i}>Kaardikiht {i + 1}</Text>
            ))}
          </VerticalSpacing>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  ),
};

/**
 * **`keepMounted`.** The panel stays in the DOM (hidden) while closed, so its content and state
 * persist. Type into the field, close the sheet, then reopen — the value is retained.
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

const MAP_LAYERS = ['Hübriidkaart', 'Reljeef', 'Katastriüksused', 'Kitsendused', 'Aadressandmed'];

const SearchableLayersSheet = () => {
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState<string[]>(['Hübriidkaart']);

  const visibleLayers = MAP_LAYERS.filter((layer) => layer.toLowerCase().includes(query.trim().toLowerCase()));

  const toggleLayer = (layer: string, isChecked: boolean) =>
    setChecked((prev) => (isChecked ? [...prev, layer] : prev.filter((item) => item !== layer)));

  return (
    <Sheet>
      <Sheet.Trigger>
        <Button visualType="secondary">Kihid</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header
          title="Kihid"
          variant="default"
          slot={checked.length > 0 ? <Tag color="primary">{checked.length}</Tag> : undefined}
        />
        <Sheet.Body>
          <VerticalSpacing size={1}>
            <Search
              id="sheet-layer-search"
              label="Otsi kihti"
              hideLabel
              placeholder="Otsi kihti…"
              value={query}
              onChange={setQuery}
            />
            {visibleLayers.length > 0 ? (
              <VerticalSpacing size={0.5}>
                {visibleLayers.map((layer) => {
                  const index = MAP_LAYERS.indexOf(layer);
                  return (
                    <Checkbox
                      key={layer}
                      id={`sheet-kiht-${index}`}
                      name={`sheet-kiht-${index}`}
                      value={layer}
                      label={layer}
                      checked={checked.includes(layer)}
                      onChange={(_, isChecked) => toggleLayer(layer, isChecked)}
                    />
                  );
                })}
              </VerticalSpacing>
            ) : (
              <Text color="secondary">Otsingule vastavaid kihte ei leitud.</Text>
            )}
          </VerticalSpacing>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  );
};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Sheet key="tabs">
        <Sheet.Trigger>
          <Button visualType="secondary">Teemakaart</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Teemakaart" variant="default" />
          <Sheet.Body>
            <Tabs defaultValue="sheet-tab-terrain">
              <Tabs.List aria-label="Kaardikihtide rühmad">
                <Tabs.Trigger id="sheet-tab-terrain">Maastik</Tabs.Trigger>
                <Tabs.Trigger id="sheet-tab-other">Muu näitab</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content id="sheet-tab-terrain">
                <VerticalSpacing size={0.5}>
                  <Checkbox id="layer-hybrid" name="layer-hybrid" value="hybrid" label="Hübriidkaart" defaultChecked />
                  <Checkbox id="layer-relief" name="layer-relief" value="relief" label="Reljeef" />
                  <Checkbox id="layer-cadastre" name="layer-cadastre" value="cadastre" label="Katastriüksused" />
                </VerticalSpacing>
              </Tabs.Content>
              <Tabs.Content id="sheet-tab-other">
                <VerticalSpacing size={0.5}>
                  <Checkbox id="layer-address" name="layer-address" value="address" label="Aadressandmed" />
                  <Checkbox id="layer-limits" name="layer-limits" value="limits" label="Kitsendused" />
                </VerticalSpacing>
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

      <SearchableLayersSheet key="search" />

      <Sheet key="toggles">
        <Sheet.Trigger>
          <Button visualType="secondary">Seaded</Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header title="Seaded" variant="brand" />
          <Sheet.Body>
            <VerticalSpacing size={1}>
              <Toggle id="sheet-setting-lengths" label="Näita pikkusi" labelPosition="left" defaultChecked />
              <Toggle id="sheet-setting-angles" label="Näita nurki" labelPosition="left" />
              <Toggle id="sheet-setting-shadows" label="Hoonete varjud" labelPosition="left" />
            </VerticalSpacing>
          </Sheet.Body>
        </Sheet.Content>
      </Sheet>
    </div>
  ),
};

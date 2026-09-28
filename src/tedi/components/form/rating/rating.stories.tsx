import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { Card, CardContent } from '../../content/card';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { ChoiceGroup } from '../choice-group/choice-group';
import { ChoiceGroupValue } from '../choice-group/choice-group.types';
import { Textarea } from '../textarea/textarea';
import { Rating, RatingType } from './rating';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.76.92?node-id=15548-139124&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof Rating> = {
  component: Rating,
  title: 'TEDI-Ready/Components/Form/Rating',
  args: {
    label: 'Hinnang',
    type: 'star',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.76.92?node-id=15548-139124&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

const STAR_LABELS = [
  'Ei jäänud üldse rahule',
  'Ei jäänud rahule',
  'Osaliselt rahul',
  'Jäin rahule',
  'Jäin väga rahule',
];

const ICON_LABELS = ['Väga halb', 'Halb', 'Keskmine', 'Hea', 'Väga hea'];
const NUMBER_LABELS = Array.from({ length: 10 }, (_, index) =>
  index === 0 ? 'Väga halb' : index === 9 ? 'Suurepärane' : ''
);

const rowLabel = (value: number, max: number): string => (value === 0 ? 'No rating' : `${value} of ${max}`);

const ScaleShowcase = ({
  type,
  max,
  itemLabels,
}: {
  type: RatingType;
  max: number;
  itemLabels?: string[];
}): JSX.Element => (
  <VerticalSpacing size={1}>
    {Array.from({ length: max + 1 }, (_, value) => (
      <div key={value} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
        <div style={{ width: '5rem', flexShrink: 0 }}>
          <Text modifiers="bold">{rowLabel(value, max)}</Text>
        </div>
        <Rating type={type} count={max} defaultValue={value} itemLabels={itemLabels} label={rowLabel(value, max)} />
      </div>
    ))}
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
      <div style={{ width: '5rem', flexShrink: 0 }}>
        <Text modifiers="bold">Read only</Text>
      </div>
      <Rating type={type} count={max} readOnly value={3.5} ratingsCount={271} label={`${type} read-only rating`} />
    </div>
  </VerticalSpacing>
);

export const Default: Story = {
  render: (args) => <Rating {...args} />,
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: '#rating-hover label', focusVisible: '#rating-focus input' },
  },
  render: () => {
    const rows: { label: string; id?: string; props: Partial<Parameters<typeof Rating>[0]> }[] = [
      { label: 'Not selected', props: { defaultValue: 0 } },
      { label: 'Selected', props: { defaultValue: 1 } },
      { label: 'Hover', id: 'rating-hover', props: { defaultValue: 1 } },
      { label: 'Disabled', props: { defaultValue: 1, disabled: true } },
      { label: 'Focus', id: 'rating-focus', props: { defaultValue: 0 } },
    ];

    return (
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th />
            {(['star', 'number', 'icon'] as const).map((type) => (
              <th key={type} style={{ padding: '0.5rem 1.5rem', textAlign: 'left' }}>
                <Text modifiers="bold">{type[0].toUpperCase() + type.slice(1)}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} id={row.id}>
              <th style={{ padding: '0.5rem 1.5rem 0.5rem 0', textAlign: 'left' }}>
                <Text modifiers="bold">{row.label}</Text>
              </th>
              {(['star', 'number', 'icon'] as const).map((type) => (
                <td key={type} style={{ padding: '0.5rem 1.5rem' }}>
                  <Rating
                    {...row.props}
                    type={type}
                    count={1}
                    icons={type === 'icon' ? ['sentiment_satisfied'] : undefined}
                    label={`${type} ${row.label}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export const Stars: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ScaleShowcase type="star" max={5} itemLabels={STAR_LABELS} />,
};

export const Numbers: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ScaleShowcase type="number" max={10} itemLabels={NUMBER_LABELS} />,
};

export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ScaleShowcase type="icon" max={5} itemLabels={ICON_LABELS} />,
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(2);
    return (
      <VerticalSpacing size={1}>
        <Rating {...args} type="star" value={value} onChange={setValue} itemLabels={STAR_LABELS} label="Hinnang" />
        <span>Valitud: {value || '—'}</span>
      </VerticalSpacing>
    );
  },
};

/**
 * The read-only `scale` variant renders the whole star scale with the boundary star filled to the
 * fraction (e.g. `3,5` → three full, one half, one empty), followed by the summary text. Use it to
 * show an aggregate rating inline; the default `summary` variant shows a single star instead.
 */
export const ReadOnlyScale: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VerticalSpacing size={1}>
      {[4.8, 3.5, 2.5, 1.2].map((value) => (
        <Rating
          key={value}
          type="star"
          readOnly
          readOnlyVariant="scale"
          value={value}
          ratingsCount={271}
          label="Teenuse hinnang"
        />
      ))}
    </VerticalSpacing>
  ),
};

/**
 * Swap glyphs via `icons`:
 * - `type="icon"` takes an array (one per item) for a single-highlight scale — here a weather scale.
 * - `type="star"` takes a single string to change the cumulative glyph (e.g. a pointier `star` or a
 *   `favorite` heart), keeping the fill and hover/focus behaviour.
 *
 * Pair with `itemLabels` for accessible names / captions.
 */
export const CustomIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VerticalSpacing size={1}>
      <Rating
        type="icon"
        icons={['thunderstorm', 'rainy', 'cloud', 'partly_cloudy_day', 'sunny']}
        itemLabels={['Väga halb', 'Halb', 'Keskmine', 'Hea', 'Väga hea']}
        defaultValue={4}
        label="Ilmahinnang"
      />
      <Rating type="star" icons="star" defaultValue={3} itemLabels={STAR_LABELS} label="Pointier star" />
      <Rating type="star" icons="favorite" defaultValue={4} label="Favourite" />
    </VerticalSpacing>
  ),
};

const REASON_ITEMS = [
  { id: 'reason-error', value: 'error', label: 'Näen veateadet' },
  { id: 'reason-wrong', value: 'wrong', label: 'Andmed on valed' },
  { id: 'reason-missing', value: 'missing', label: 'Andmed puuduvad' },
  { id: 'reason-no-right', value: 'no-right', label: 'Õigus puudub' },
  { id: 'reason-not-found', value: 'not-found', label: 'Ei leidnud, mida otsisin' },
  { id: 'reason-complex', value: 'complex', label: 'Keeruline' },
  { id: 'reason-other', value: 'other', label: 'Muu põhjus' },
];

const centered = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--layout-grid-gutters-08)',
} as const;

export const FeedbackFormExample: Story = {
  parameters: {
    controls: { disable: true },
    layout: 'padded',
  },
  render: () => {
    const [rating, setRating] = useState(1);
    const [reasons, setReasons] = useState<ChoiceGroupValue>(['error']);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
      <Card>
        <CardContent>
          {submitted ? (
            <div style={centered}>
              <Heading element="h2" modifiers="h5">
                Aitäh!
              </Heading>
              <Text color="secondary">Sinu tagasiside aitab portaali paremaks muuta.</Text>
            </div>
          ) : (
            <VerticalSpacing size={1.5}>
              <div style={centered}>
                <Heading element="h2" modifiers="h5">
                  Kuidas jäid rahule teenuse kasutamisega?
                </Heading>
                <Rating
                  label="Kuidas jäid rahule teenuse kasutamisega?"
                  value={rating}
                  onChange={setRating}
                  itemLabels={STAR_LABELS}
                />
              </div>

              {rating > 0 && (
                <>
                  <div style={centered}>
                    <Heading element="h3" modifiers="h5">
                      Mis mõjutas Sinu vastust?
                    </Heading>
                    <Text color="secondary">Vali sobivad märksõnad</Text>
                  </div>
                  <ChoiceGroup
                    id="feedback-reasons"
                    name="feedback-reasons"
                    label="Mis mõjutas Sinu vastust?"
                    hideLabel
                    inputType="checkbox"
                    variant="card"
                    color="secondary"
                    showIndicator
                    value={reasons}
                    onChange={setReasons}
                    items={REASON_ITEMS}
                    rowProps={{ justifyContent: 'center' }}
                  />

                  <Textarea
                    id="feedback-comment"
                    label="Soovi korral lisa täpsustus"
                    characterLimit={500}
                    value={comment}
                    onChange={setComment}
                    helper={{
                      text: 'Me ei vasta selle vormi kaudu saadetud tagasisidele. Palun ära lisa siia isiklikku teavet.',
                    }}
                  />

                  <div style={centered}>
                    <Button onClick={() => setSubmitted(true)}>Saada tagasiside</Button>
                  </div>
                </>
              )}
            </VerticalSpacing>
          )}
        </CardContent>
      </Card>
    );
  },
};
